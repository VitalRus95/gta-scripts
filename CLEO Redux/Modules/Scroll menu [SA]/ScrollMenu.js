//	Module by Vital (Vitaly Pavlovich Ulyanov). Thanks for help to Seemann.
/// <reference path="../.config/sa.d.ts"/>

export const AlignType = {
    'Left': 0,
    'Centre': 1,
    'Right': 2
};

export const MenuSounds = {
    'ShopBuy': 1054,
    'ShopBuyDenied': 1055,
    'Race321': 1056,
    'RaceGo': 1057,
    'PartMissionComplete': 1058,
    'MenuScroll': 1083,
    'MenuBack': 1084,
    'MenuUnavailable': 1085,
    'Punch': 1130,
    'GunCollision': 1131,
    'Camera': 1132,
    'CarMod': 1133,
    'BaseballBatHit': 1135,
    'Pickup': 1150,
    'Collapse': 1163
};

export class RGBA {
    /**
     * Creates an RGBA colour (range 0-255).
     * @param {int} r Red
     * @param {int} g Green
     * @param {int} b Blue
     * @param {int} a Alpha
     */
    constructor(r = 0, g = 0, b = 0, a = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}

var player = new Player(0),
    headerColour = new RGBA(135, 255, 135);

/**
 * @typedef {Object} Style
 * @property {int} font Font
 * @property {float} scaling Text scaling
 * @property {RGBA} colour Colour
 * @property {AlignType} alignment Alignment
 * @property {boolean} shadow Whether to draw the shadow
 * @property {boolean} background Whether to draw the background
 * @property {RGBA} outlineOrShadowColour Outline colour
 * @property {int} outlineOrShadowWidth Outline/shadow width
 * @property {float} width Width
 * @property {float} height Height
 * @property {RGBA} selectedColour Text colour if this option is selected
 * @property {RGBA} selectedOutlineColour Outline/Shadow colour if this option is selected
 * @property {boolean} selectedBackground Whether to draw the background if this option is selected
 */
/** @type Style */
var idealStyle = {
    font: (HOST == "sa") ? 3 : 0,
    scaling: 0.85,
    colour: new RGBA(255, 255, 255),
    alignment: AlignType.Centre,
    shadow: false,
    background: false,
    outlineOrShadowColour: new RGBA(),
    outlineOrShadowWidth: 1,
    width: 0.45,
    height: 1.8,
    selectedColour: new RGBA(255, 65, 35),
    selectedOutlineColour: new RGBA(),
    selectedBackground: false
}
/**
 * @typedef {Object}
 * @type {Object.<string, Style>}
 */
export const DefaultStyles = {
    'Gothic': {font: 0, scaling: 1.15},
    'Subtitles': {font: 1},
    'Menu': {font: 2, scaling: 0.8},
    'Pricedown': {font: 3, scaling: 0.85},
    'GothicHeader': {font: 0, scaling: 1.4, colour: headerColour, background: true},
    'SubtitlesHeader': {font: 1, scaling: 1.3, colour: headerColour, background: true},
    'MenuHeader': {font: 2, scaling: 0.9, colour: headerColour, background: true},
    'PricedownHeader': {font: 3, scaling: 1.1, colour: headerColour, background: true}
};

/**
 * Scroll Menu module by Vital (Vitaly Pavlovich Ulyanov). Thanks for help to Seemann.
 */
export class ScrollMenu {
    /**
     * @typedef {Object} Option Scroll Menu option
     * @property {string|Function} name GXT entry (obligatory)
     * @property {Style} style Text style
     * @property {Function} func Function to call when this option is selected
     * @property {any[]} args Array of arguments for the callback function
     * @property {any} caller Caller of the function (i.e. `this`)
     * @property {any[]} displayedValues Values to display in the text instead of `~1~` keyword (max 2)
     */
    /**
     * Creates a custom menu.
     * @param {Option[]} options Scroll Menu options
     * @param {Style} menuStyle This menu's default style
     */
    constructor (options = [], menuStyle = idealStyle) {
        this.options = options;
        this.options.forEach(o => {
            o.style = {...idealStyle, ...menuStyle, ...o.style};
        });
        this.selection = 0;
    }

    /**
     * @typedef {Object} DrawSettings
     * @property {int} x X coordinate
     * @property {int} y Y coordinate
     * @property {boolean} hideHud Whether to hide the HUD
     * @property {boolean} playerLock Whether to lock the player
     * @property {int|MenuSounds} scrollSound Menu scroll sound
     * @property {int|MenuSounds} confirmSound Menu confirm sound
     * @property {int|MenuSounds} exitSound Menu exit sound
     */
    /** @type DrawSettings */
    idealSettings = {
        x: 320,
        y: 224,
        hideHud: false,
        playerLock: true,
        scrollSound: MenuSounds.GunCollision,
        confirmSound: MenuSounds.ShopBuy,
        exitSound: MenuSounds.MenuBack
    };
    /**
     * Draws the menu.
     * @param {DrawSettings} settings
     * @returns Drawing status
     */
    draw(settings = this.idealSettings) {
        settings = {...this.idealSettings, ...settings};

        //#region Exit
        if (!player.isPlaying() || Pad.IsButtonPressed(0, 15) || Pad.IsButtonPressed(0, 6)) {
            Sound.AddOneOffSound(0, 0, 0, funcOrValue(settings.exitSound));
            while (Pad.IsButtonPressed(0, 15) || Pad.IsButtonPressed(0, 6)) {
                wait(0);
            }
            Hud.SwitchWidescreen(false);
            player.setControl(true);
            return false;
        }
        //#endregion

        //#region HUD & player control
        Hud.SwitchWidescreen(funcOrValue(settings.hideHud));
        player.setControl(!funcOrValue(settings.playerLock));
        //#endregion

        //#region Scrolling
        var oldSelection = this.selection,
            scrollSpeed = (Pad.IsButtonPressed(0, 1) && !Pad.IsButtonPressed(0, 5) && !Pad.IsButtonPressed(0, 7)) ? 249 : 79;

        if ((Pad.IsButtonPressed(0, 7) || Pad.GetState(0, 1) > 0) && TIMERA > scrollSpeed) {
            this.selection = clamp(this.selection + 1, 0, this.options.length - 1);
        } else if ((Pad.IsButtonPressed(0, 5) || Pad.GetState(0, 1) < 0) && TIMERA > scrollSpeed) {
            this.selection = clamp(this.selection - 1, 0, this.options.length - 1);
        } else if (Pad.IsKeyDown(0x22)) { // Page down button (+5)
            this.selection = clamp(this.selection + 5, 0, this.options.length - 1);
        } else if (Pad.IsKeyDown(0x21)) { // Page up button (-5)
            this.selection = clamp(this.selection - 5, 0, this.options.length - 1);
        } else if (Pad.IsKeyDown(0x24)) { // Home button (last)
            this.selection = 0;
        } else if (Pad.IsKeyDown(0x23)) { // End button (first)
            this.selection = this.options.length - 1;
        }

        if (this.selection != oldSelection) {
            Sound.AddOneOffSound(0, 0, 0, funcOrValue(settings.scrollSound));
            TIMERA = 0;
        }
        //#endregion

        //#region Selection
        var selectSpeed = (Pad.IsButtonPressed(0, 16) && !Pad.IsButtonPressed(0, 17)) ? 399 : 199;
        if ((Pad.IsButtonPressed(0, 16) || Pad.IsButtonPressed(0, 17)) && TIMERB > selectSpeed) {
            if (this.options[this.selection].func) {
                TIMERB = 0;
                Sound.AddOneOffSound(0, 0, 0, funcOrValue(settings.confirmSound));
                this.options[this.selection].func.apply(
                    this.options[this.selection].caller ?? undefined,
                    this.options[this.selection].args ?? undefined);
            }
        }
        //#endregion

        //#region Drawing
        var x = funcOrValue(settings.x),
            y = funcOrValue(settings.y);

        var iMin, iMax;

        // Always show 5 elements if there are more than 5 in total
        if (this.selection < 3) { // [2] is the middle position index
            iMin = 0;
            iMax = 5;
        } else if ((this.options.length - this.selection) < 3) {
            iMin = this.options.length - 5;
            iMax = this.options.length;
        } else {
            iMin = this.selection - 2;
            iMax = this.selection + 3;
        }

        for (var i = iMin; i < iMax; i++) {
            const curOption = this.options[i];

            if (curOption) {
                Text.UseCommands(true);

                //#region Apply style
                const curStyle = curOption.style;

                // Font
                Text.SetFont(funcOrValue(curStyle.font));

                // Alignment
                switch (funcOrValue(curStyle.alignment)) {
                    case AlignType.Right:
                        Text.SetRightJustify(true);
                        break;
                    case AlignType.Centre:
                        Text.SetCenter(true);
                    default:
                        break;
                }

                // Shadow or outline
                var tempCol = (i == this.selection) ? funcOrValue(curStyle.selectedOutlineColour) : funcOrValue(curStyle.outlineOrShadowColour);

                if (funcOrValue(curStyle.shadow)) {
                    Text.SetDropshadow(
                        funcOrValue(curStyle.outlineOrShadowWidth),
                        tempCol.r,
                        tempCol.g,
                        tempCol.b,
                        tempCol.a
                    );
                } else {
                    Text.SetEdge(
                        funcOrValue(curStyle.outlineOrShadowWidth),
                        tempCol.r,
                        tempCol.g,
                        tempCol.b,
                        tempCol.a
                    );
                }

                // Colour and scale depending on being selected
                var textW = funcOrValue(curStyle.width) * funcOrValue(curStyle.scaling),
                    textH = funcOrValue(curStyle.height) * funcOrValue(curStyle.scaling);

                var textScale = 1;
                if (i == this.selection) { // Item is selected
                    textScale = 1.1;
                    var tempCol = funcOrValue( // Allow to retain selected option colour
                        curStyle.selectedColour ? curStyle.selectedColour : curStyle.colour
                    );
                    Text.SetColor(
                        tempCol.r,
                        tempCol.g,
                        tempCol.b,
                        tempCol.a,
                    );
                    Text.SetScale(textW * textScale, textH * textScale);
                    Text.SetBackground(funcOrValue(curStyle.selectedBackground));
                } else {
                    tempCol = funcOrValue(curStyle.colour);
                    Text.SetColor(tempCol.r, tempCol.g, tempCol.b, tempCol.a);
                    Text.SetScale(textW, textH);
                }

                // Background
                if (funcOrValue(curStyle.background)) {
                    Text.SetBackground(true);
                }
                Text.SetWrapX(640);
                //#endregion

                //#region Display text
                if (curOption.displayedValues) {
                    if (curOption.displayedValues.length < 2) {
                        Text.DisplayWithNumber(x, y,
                            funcOrValue(curOption.name),
                            funcOrValue(curOption.displayedValues[0])
                        );
                    } else {
                        Text.DisplayWith2Numbers(x, y,
                            funcOrValue(curOption.name),
                            funcOrValue(curOption.displayedValues[0]),
                            funcOrValue(curOption.displayedValues[1])
                        );
                    }
                } else {
                    Text.Display(x, y,
                        funcOrValue(curOption.name)
                    );
                }
                //#endregion

                Text.UseCommands(false);
                y += textH * textScale * 15;
            }
        }
        //#endregion
        return true;
    }
};

function clamp(value, min, max) {
    return (value < min) ? min : (value > max) ? max : value;
}

/**
 * Determines if the given variable is a function, returning its result if true and its value if false.
 * @param {Function|any} variable Variable
 * @param {any} caller Caller of the function
 * @param {any[]} args Function arguments
 * @returns The value of the variable or the result of the function
 */
function funcOrValue(variable, caller = undefined, args = undefined) {
    return (typeof variable == 'function') ? variable.apply(caller, args) : variable;
}