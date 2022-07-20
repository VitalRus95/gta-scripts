/// <reference path="../.config/sa.d.ts"/>
//	Script by Vital (Vitaly Pavlovich Ulyanov)

import { Font, ImGuiCond, KeyCode, WeaponType } from "../.config/enums";
import { ReHud } from "./texts";

var plr = new Player(0),
    plc = plr.getChar(),
    active = false;

var showAmmoFor = [
    WeaponType.Ak47,
    WeaponType.Camera,
    WeaponType.DesertEagle,
    WeaponType.Extinguisher,
    WeaponType.Flamethrower,
    WeaponType.Grenade,
    WeaponType.M4,
    WeaponType.MicroUzi,
    WeaponType.Minigun,
    WeaponType.Molotov,
    WeaponType.Mp5,
    WeaponType.Pistol,
    WeaponType.PistolSilenced,
    WeaponType.Rifle,
    WeaponType.RocketLauncher,
    WeaponType.RocketLauncherHs,
    WeaponType.Sawnoff,
    WeaponType.Satchel,
    WeaponType.Shotgun,
    WeaponType.Sniper,
    WeaponType.Spas12,
    WeaponType.SprayCan,
    WeaponType.Teargas,
    WeaponType.Tec9
];

const Addresses = {
    'HudMode': {adr: 0xBA6769, size: 1},
    'Widescreen': {adr: 0xB6F065, size: 1},
    'HudScript': {adr: 0xA444A0, size: 1},
    'Oxygen': {adr: 0xB7CDE0, size: 4}
};

const AlignType = {
    'Left': 0,
    'Centre': 1,
    'Right': 2
};

const StandardGXT = {
    'Time': 'TIME',
    'Time_0': 'TIME_0',
    'Var': 'BJ_0',
    'Money': 'DOLLAR'
};

class RGBA {
    /**
     * Creates an RGBA colour (range 0-255).
     * @param {int} r Red
     * @param {int} g Green
     * @param {int} b Blue
     * @param {int} a Alpha
     */
    constructor(r, g, b, a = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}

class HSV {
    /**
     * Creates an HSV colour.
     * @param {int} h Hue (0-360)
     * @param {int} s Saturation (0-100)
     * @param {int} v Value (0-100)
     */
    constructor(h, s, v) {
        this.h = h;
        this.s = s;
        this.v = v;
    }

    /**
     * Transforms HSV colour to RGB.
     * @returns RGBA colour
     */
    toRGB() {
        const percToValue = 255/100;
        var Hi = parseInt(((this.h/60) % 6).toString()),
            Vmin = ((100 - this.s) * this.v)/100,
            a = (this.v - Vmin) * ((this.h % 60)/60),
            Vinc = Vmin + a,
            Vdec = this.v - a;

        switch (Hi) {
            case 0:
                return new RGBA(this.v * percToValue, Vinc * percToValue, Vmin * percToValue);
            case 1:
                return new RGBA(Vdec * percToValue, this.v * percToValue, Vmin * percToValue);
            case 2:
                return new RGBA(Vmin * percToValue, this.v * percToValue, Vinc * percToValue);
            case 3:
                return new RGBA(Vmin * percToValue, Vdec * percToValue, this.v *percToValue);
            case 4:
                return new RGBA(Vinc * percToValue, Vmin * percToValue, this.v * percToValue);
            case 5:
                return new RGBA(this.v * percToValue, Vmin * percToValue, Vdec * percToValue);
            default:
                return new RGBA(255, 255, 255);
        }
    }
}

class VarTextDraw {
    /**
     * A text with a variable or two to draw on screen.
     * @param {string} gxt GXT string
     * @param {AlignType} alignment Type of alignment
     */
    constructor(gxt, alignment) {
        this.gxt = gxt;
        this.alignment = alignment;
    }

    /**
     * Draw the text.
     * @param {Array} variables Variables to show (2 max)
     * @param {float} x X screen coordinate
     * @param {float} y Y screen coordinate
     * @param {RGBA} colour Text colour
     * @param {RGBA} outlineColour Outline colour
     * @param {int} outlineWidth Ouline width
     * @param {int} font Font
     * @param {float} width Width
     * @param {float} height Height
     */
    draw(variables, x, y, colour, outlineColour = Colours.Black, outlineWidth = defOutlineWidth, font = defFont, width = defWidth, height = defHeight) {
        switch (this.alignment) {
            case AlignType.Right:
                Text.SetRightJustify(true);
                break;
            case AlignType.Centre:
                Text.SetCenter(true);
                break;
            default:
                break;
        }
        Text.SetColor(colour.r, colour.g, colour.b, colour.a);
        if (defShadow) {
            Text.SetDropshadow(outlineWidth, outlineColour.r, outlineColour.g, outlineColour.b, outlineColour.a);
        } else {
            Text.SetEdge(outlineWidth, outlineColour.r, outlineColour.g, outlineColour.b, outlineColour.a);
        }
        Text.SetFont(font);
        Text.SetScale(width * defMult, height * defMult);
        switch (variables.length) {
            case 1:
                Text.DisplayWithNumber(x, y, this.gxt, variables[0]);
                break;
            case 2:
                Text.DisplayWith2Numbers(x, y, this.gxt, variables[0], variables[1]);
                break;
            default:
                Text.Display(x, y, this.gxt);
                break;
        }
    }
}

class BarDraw {
    /**
     * Creates a HUD bar.
     * @param {RGBA} barFgColour Foreground colour
     * @param {RGBA} barBgColour Background colour
     * @param {RGBA} barMiddleColour Optional middle colour
     */
    constructor(barFgColour = new RGBA(255, 255, 255, defBarFgTransparency), barBgColour = new RGBA(0, 0, 0, defBarBgTransparency), useMiddle = false, middleColour = new RGBA(50, 50, 50, defBarBgTransparency)) {
        this.fgR = barFgColour.r;
        this.fgG = barFgColour.g;
        this.fgB = barFgColour.b;
        this.bgR = barBgColour.r;
        this.bgG = barBgColour.g;
        this.bgB = barBgColour.b;
        this.midR = middleColour.r;
        this.midG = middleColour.g;
        this.midB = middleColour.b;
        this.useMiddle = useMiddle;
    }

    /**
     * Draws a HUD bar on the screen.
     * @param {float} x X screen coordinate
     * @param {float} y Y screen coordinate
     * @param {any} value Value to depict
     * @param {any} maxValue Maximum of the value
     */
    draw(x, y, value, maxValue) {
        // Font affects the bar's width
        switch (defFont) {
            case Font.Gothic:
                var maxWidth = 81;
                break;
            case Font.Menu:
                var maxWidth = 117;
                break;
            default:
                var maxWidth = 90;
                break;
        }

        var proportion = (value * maxWidth) / maxValue,
            newValue = (proportion < maxWidth) ? proportion : maxWidth,
            bgX = x - (maxWidth / 2) * defMult,
            bgY = y,
            fgX = x - (newValue / 2) * defMult,
            fgY = y,
            bgW = defShadow ? maxWidth * defMult : (maxWidth + 3) * defMult,
            bgH = defShadow ? defBarHeight * defMult : (defBarHeight + 3) * defMult,
            fgW = newValue * defMult,
            fgH = defBarHeight * defMult,
            bgR = this.bgR,
            bgG = this.bgG,
            bgB = this.bgB,
            fgR = this.fgR,
            fgG = this.fgG,
            fgB = this.fgB;

        if (defShadow) {
            bgX += 1 * defMult;
            bgY += 1 * defMult;
        }

        // Background
        Hud.DrawRect(bgX, bgY, bgW, bgH, bgR, bgG, bgB, defBarBgTransparency);

        // Middle
        if (this.useMiddle) {
            var midX = bgX,
                midY = bgY,
                midW = maxWidth * defMult,
                midH = fgH,
                midR = this.midR,
                midG = this.midG,
                midB = this.midB;

            Hud.DrawRect(midX, midY, midW, midH, midR, midG, midB, defBarMdTransparency);
        }

        // Foreground
        Hud.DrawRect(fgX, fgY, fgW, fgH, fgR, fgG, fgB, defBarFgTransparency);

        // Separator
        if (defBarSeparator && newValue > 1 && newValue < maxWidth) {
            var sepX = fgX - fgW / 2,
                sepY = fgY,
                sepW = 1 * defMult,
                sepH = fgH,
                sepR = defBarSeparatorColour.r,
                sepG = defBarSeparatorColour.g,
                sepB = defBarSeparatorColour.b,
                sepA = defBarSeparatorColour.a;

            Hud.DrawRect(sepX, sepY, sepW, sepH, sepR, sepG, sepB, sepA);
        }
    }
}

const Colours = {
    Health: new RGBA(255, 0, 0),
    HealthDim: new RGBA(150, 0, 0),
    Armour: new RGBA(180, 180, 180),
    ArmourDim: new RGBA(110, 110, 110),
    Money: new RGBA(72, 140, 62),
    Debt: new RGBA(150, 55, 125),
    Oxygen: new RGBA(178, 212, 255),
    OxygenDim: new RGBA(108, 130, 153),
    White: new RGBA(255, 255, 255),
    Black: new RGBA(0, 0, 0)
};

const HudElements = {
    Health: new VarTextDraw(StandardGXT.Var, AlignType.Right),
    Armour: new VarTextDraw(StandardGXT.Var, AlignType.Right),
    Money: new VarTextDraw(StandardGXT.Money, AlignType.Right),
    Time: new VarTextDraw(StandardGXT.Time, AlignType.Centre),
    Time_0: new VarTextDraw(StandardGXT.Time_0, AlignType.Centre),
    TimeAlt: new VarTextDraw(StandardGXT.Var, AlignType.Centre),
    WantedLevel: [
        new VarTextDraw(StandardGXT.Var, AlignType.Centre),
        new VarTextDraw('REHWL1', AlignType.Centre),
        new VarTextDraw('REHWL2', AlignType.Centre),
        new VarTextDraw('REHWL3', AlignType.Centre),
        new VarTextDraw('REHWL4', AlignType.Centre),
        new VarTextDraw('REHWL5', AlignType.Centre),
        new VarTextDraw('REHWL6', AlignType.Centre),
    ],
    Speedometer: new VarTextDraw(StandardGXT.Var, AlignType.Centre),
    Oxygen: new VarTextDraw(StandardGXT.Var, AlignType.Right),
    Ammo: new VarTextDraw(StandardGXT.Var, AlignType.Right),
    AmmoClip: new VarTextDraw(StandardGXT.Var, AlignType.Right),
    AmmoIcon: new VarTextDraw('REHAMM', AlignType.Right)
};

const HudBars = {
    Health: new BarDraw(Colours.Health, Colours.Black, true, Colours.HealthDim),
    Armour: new BarDraw(Colours.Armour, Colours.Black, true, Colours.ArmourDim),
    Oxygen: new BarDraw(Colours.Oxygen, Colours.Black, true, Colours.OxygenDim)
};

// Default settings
var defWidth = 0.45,
    defHeight = 1.8,
    defYOffset = 21,
    defXOffset = 12,
    defFont = 3,
    defOutlineWidth = 1,
    defBarBgTransparency = 175,
    defBarFgTransparency = 225,
    defBarMdTransparency = 225,
    defBarYOffset = 10,
    defBarHeight = 4,
    defBarSeparatorColour = new RGBA(0, 0, 0, 255),
    defShadow = false,
    defMult = 10,
    defClock = true,
    defHrsInCentre = true,
    defStars = true,
    defBars = false,
    defBarSeparator = true;

// Math constants (thanks to Alexander Lukhnovich for help with trigonometry)
const hrsToRad = Math.PI * 1/12, // 360° / 24 hours
      minToRad = Math.PI * 1/30, // 360° / 60 minutes
      deg90ToRad = Math.PI * 0.5;

//#region Load settings
var defFont = IniFile.ReadInt('./rehud.ini', 'SETTINGS', 'Font'),
    defOutlineWidth = IniFile.ReadInt('./rehud.ini', 'SETTINGS', 'OutlineWidth'),
    defShadow = IniFile.ReadInt('./rehud.ini', 'SETTINGS', 'Shadow'),
    defMult = IniFile.ReadInt('./rehud.ini', 'SETTINGS', 'Size') / 10,
    defClock = IniFile.ReadInt('./rehud.ini', 'SETTINGS', 'Clock'),
    defHrsInCentre = IniFile.ReadInt('./rehud.ini', 'SETTINGS', 'HrsCentre'),
    defStars = IniFile.ReadInt('./rehud.ini', 'SETTINGS', 'WantedStars'),
    defBars = IniFile.ReadInt('./rehud.ini', 'SETTINGS', 'UseBars'),
    defBarFgTransparency = IniFile.ReadInt('./rehud.ini', 'SETTINGS', 'BarFgAlpha'),
    defBarBgTransparency = IniFile.ReadInt('./rehud.ini', 'SETTINGS', 'BarBgAlpha'),
    defBarMdTransparency = IniFile.ReadInt('./rehud.ini', 'SETTINGS', 'BarMdAlpha'),
    defBarSeparator = IniFile.ReadInt('./rehud.ini', 'SETTINGS', 'BarSeparator');

defBarSeparatorColour.r = IniFile.ReadInt('./rehud.ini', 'SETTINGS', 'BarSepR');
defBarSeparatorColour.g = IniFile.ReadInt('./rehud.ini', 'SETTINGS', 'BarSepG');
defBarSeparatorColour.b = IniFile.ReadInt('./rehud.ini', 'SETTINGS', 'BarSepB');
defBarSeparatorColour.a = IniFile.ReadInt('./rehud.ini', 'SETTINGS', 'BarSepA');
//#endregion

// Fix radar
const radarWidth = 0x866B78,
      radarHeight = 0x866B74;
Memory.WriteFloat(radarWidth, Memory.ReadFloat(radarHeight, false), false);

while (true) {
    wait(0);

    var turnedOn = !Memory.ReadU8(Addresses.HudMode.adr, 0);

    //#region Settings window
    if (Pad.TestCheat('HUD')) {
        active = !active;
    }

    ImGui.BeginFrame('NEWHUD');
    ImGui.SetCursorVisible(active);
    if (active) {
        ImGui.SetNextWindowPos(0, 0, ImGuiCond.Once);
        ImGui.SetNextWindowSize(400, 400, ImGuiCond.Once);
        active = ImGui.Begin('ReHUD', active, false, false, false, true);

        if (IsGuiButtonPressed(ReHud.Save)) {
            IniFile.WriteInt(defFont, './rehud.ini', 'SETTINGS', 'Font');
            IniFile.WriteInt(defOutlineWidth, './rehud.ini', 'SETTINGS', 'OutlineWidth');
            IniFile.WriteInt(defShadow, './rehud.ini', 'SETTINGS', 'Shadow');
            IniFile.WriteInt(defMult * 10, './rehud.ini', 'SETTINGS', 'Size');
            IniFile.WriteInt(defClock, './rehud.ini', 'SETTINGS', 'Clock');
            IniFile.WriteInt(defHrsInCentre, './rehud.ini', 'SETTINGS', 'HrsCentre');
            IniFile.WriteInt(defStars, './rehud.ini', 'SETTINGS', 'WantedStars');
            IniFile.WriteInt(defBars, './rehud.ini', 'SETTINGS', 'UseBars');
            IniFile.WriteInt(defBarFgTransparency, './rehud.ini', 'SETTINGS', 'BarFgAlpha');
            IniFile.WriteInt(defBarBgTransparency, './rehud.ini', 'SETTINGS', 'BarBgAlpha');
            IniFile.WriteInt(defBarMdTransparency, './rehud.ini', 'SETTINGS', 'BarMdAlpha');
            IniFile.WriteInt(defBarSeparator, './rehud.ini', 'SETTINGS', 'BarSeparator');
            IniFile.WriteInt(defBarSeparatorColour.r, './rehud.ini', 'SETTINGS', 'BarSepR');
            IniFile.WriteInt(defBarSeparatorColour.g, './rehud.ini', 'SETTINGS', 'BarSepG');
            IniFile.WriteInt(defBarSeparatorColour.b, './rehud.ini', 'SETTINGS', 'BarSepB');
            IniFile.WriteInt(defBarSeparatorColour.a, './rehud.ini', 'SETTINGS', 'BarSepA');
            Sound.AddOneOffSound(.0, .0, .0, 1052);
        }
        ImGui.Separator();

        turnedOn = ImGui.Checkbox(ReHud.TurnON, turnedOn);
        Memory.WriteU8(Addresses.HudMode.adr, (turnedOn) ? 0 : 1, false);
        ImGui.Separator();

        defBars = ImGui.Checkbox(ReHud.UseBars, defBars);
        if (defBars) {
            ImGui.SameLine();
            defBarSeparator = ImGui.Checkbox(ReHud.UseSeparator, defBarSeparator);

            if (ImGui.CollapsingHeader(ReHud.BarSettings)) {
                defBarBgTransparency = ImGui.SliderInt(ReHud.BgAlpha, defBarBgTransparency, 35, 255);
                defBarMdTransparency = ImGui.SliderInt(ReHud.MdAlpha, defBarMdTransparency, 35, 255);
                defBarFgTransparency = ImGui.SliderInt(ReHud.FgAlpha, defBarFgTransparency, 35, 255);

                if (defBarSeparator) {
                    var sepColour = ImGui.ColorPicker(ReHud.SepColour);
                    if (IsGuiButtonPressed(ReHud.ApplySepCol)) {
                        defBarSeparatorColour.r = sepColour.red * 255;
                        defBarSeparatorColour.g = sepColour.green * 255;
                        defBarSeparatorColour.b = sepColour.blue * 255;
                        defBarSeparatorColour.a = sepColour.alpha * 255;
                    }
                }
            }
        }
        ImGui.Separator();

        if (ImGui.CollapsingHeader(ReHud.Font)) {
            defFont = ImGui.RadioButton(ReHud.Gothic, defFont, 0);
            defFont = ImGui.RadioButton(ReHud.Subtitles, defFont, 1);
            defFont = ImGui.RadioButton(ReHud.Menu, defFont, 2);
            defFont = ImGui.RadioButton(ReHud.Pricedown, defFont, 3);
        }
        ImGui.Separator();

        defShadow = ImGui.Checkbox(ReHud.Shadow, defShadow);
        ImGui.Separator();

        defClock = ImGui.Checkbox(ReHud.DefClock, defClock);
        if (!defClock) {
            ImGui.SameLine();
            defHrsInCentre = ImGui.Checkbox(ReHud.HrsCentre, defHrsInCentre);
        }
        ImGui.Separator();

        defStars = ImGui.Checkbox(ReHud.WantedStars, defStars);
        ImGui.Separator();

        var defMult = ImGui.SliderInt(ReHud.Scale, defMult * 10, 5, 20) / 10;
        ImGui.Separator();

        if (defShadow) {
            defOutlineWidth = ImGui.SliderInt(ReHud.ShadowSize, defOutlineWidth, 0, 5);
        } else {
            defOutlineWidth = ImGui.SliderInt(ReHud.OutlineSize, defOutlineWidth, 0, 5);
        }
        ImGui.Separator();

        if (ImGui.CollapsingHeader(ReHud.About)) {
                ImGui.Bullet();
                ImGui.SameLine();
            ImGui.TextWrapped(ReHud.Authors);
                ImGui.Bullet();
                ImGui.SameLine();
            ImGui.TextWrapped(ReHud.Help);
                ImGui.Bullet();
                ImGui.SameLine();
            ImGui.TextWrapped(ReHud.Ideas);
        }
        ImGui.End();
    }
    ImGui.EndFrame();
    //#endregion

    //#region Draw HUD
    if (plr.isPlaying() && !Camera.GetFadingStatus()
        && Memory.ReadU8(Addresses.HudMode.adr, false) == 0
        && Memory.ReadU8(Addresses.Widescreen.adr, false) == 0
        && Memory.ReadU8(Addresses.HudScript.adr, false) == 1) {
        Text.UseCommands(true);

        //#region Right side
        var money = plr.storeScore(),
            health = plc.getHealth(),
            armour = plc.getArmor(),
            checkInWater = (plc.isSwimming() || (plc.isInAnyCar() && plc.storeCarIsInNoSave().isInWater()));

        var initialX = 630,
            initialY = 7;

        //#region Money
        if (money != 0) {
            var moneyColour = (money > 0) ? Colours.Money : Colours.Debt;
            HudElements.Money.draw([money], initialX, initialY, moneyColour);
            if (defBars) {
                initialY += defBarYOffset * 2.3 * defMult;
            } else {
                initialY += defYOffset * defMult;
            }
        } else if (defBars && (health < 176 || armour > 0 || checkInWater)) {
            initialY += 7 * defMult;
        }
        //#endregion

        var nextLine = false; // Numeric health, armour and oxygen are on the same line, so we need to know when to switch to the next line for drawing other values

        //#region Health
        if (health < 176) {
            if (defBars) {
                HudBars.Health.draw(initialX, initialY, health, 175);
                initialY += defBarYOffset * defMult;
            } else {
                HudElements.Health.draw([health], initialX, initialY, Colours.Health);
                var textWidth = Text.GetStringWidthWithNumber(StandardGXT.Var, health);
                initialX -= textWidth * defMult + defXOffset * defMult;
            }
            nextLine = true;
        }
        //#endregion

        //#region Armour
        if (armour > 0) {
            if (defBars) {
                HudBars.Armour.draw(initialX, initialY, armour, 100);
                initialY += defBarYOffset * defMult;
            } else {
                HudElements.Armour.draw([armour], initialX, initialY, Colours.Armour);
                var textWidth = Text.GetStringWidthWithNumber(StandardGXT.Var, armour);
                initialX -= textWidth * defMult + defXOffset * defMult;
            }
            nextLine = true;
        }
        //#endregion

        //#region Oxygen
        if (plc.isSwimming() || (plc.isInAnyCar() && plc.storeCarIsInNoSave().isInWater())) {
            var oxygen = Memory.ReadFloat(Addresses.Oxygen.adr, Addresses.Oxygen.size, 0);
            oxygen = (100 * oxygen) / 2650; // 2650 max
            if (oxygen < 100) {
                if (defBars) {
                    HudBars.Oxygen.draw(initialX, initialY, oxygen, 100);
                    initialY += defBarYOffset * defMult;
                } else {
                    HudElements.Oxygen.draw([(oxygen <= 100) ? oxygen : 100], initialX, initialY, Colours.Oxygen);
                }
                nextLine = true;
            }
        }
        //#endregion

        //#region Ammo
        initialX = 630;
        if (nextLine && !defBars) {
            initialY += defYOffset * defMult * 1.3;
        }

        var weapon = plc.getCurrentWeapon();
        if (showAmmoFor.includes(weapon)) {
            var plrPtr = Memory.GetPedPointer(plc),
                wpnSlot = Memory.Read(plrPtr + 0x718, 1, 0) * 28,
                cWeapon = plrPtr + 0x5A0 + wpnSlot,
                ammoInClip = Memory.ReadI32(cWeapon + 8, 0),
                ammoLeft = Memory.ReadI32(cWeapon + 12, 0) - ammoInClip,
                smallerTextScale = 0.8;

            // Draw icon
            var col = new HSV(0, timerSin(3000, 40, true) + 40, 85).toRGB(),
                iconWidth = (ammoLeft < 10000) ? defWidth : defWidth * smallerTextScale,
                iconHeight = (ammoLeft < 10000) ? defHeight : defHeight * smallerTextScale;

            HudElements.AmmoIcon.draw([], initialX, initialY, col, Colours.Black, defOutlineWidth, Font.Pricedown, iconWidth, iconHeight);
            initialX -= 20 * defMult;

            // Draw ammo left
            if (ammoLeft < 10000) {
                var col = new RGBA(255, 255, 150 + timerSin(5000, 105, true));
                HudElements.Ammo.draw([ammoLeft], initialX, initialY, col);
                initialX = 630; // Reset X
                initialY += defYOffset * defMult * 0.85;
            }

            // Draw ammo in clip
            var col = new RGBA(255, 255, 150 + timerCos(5000, 105, true));
            HudElements.AmmoClip.draw([ammoInClip], initialX, initialY, col, Colours.Black, defOutlineWidth, defFont, defWidth * smallerTextScale, defHeight * smallerTextScale);
        }
        //#endregion
        //#endregion

        //#region Centre
        var initialX = 320,
            initialY = 7;

        //#region Clock (standard)
        var time = Clock.GetTimeOfDay(),
            col = new HSV(timerSin(60000, 360, true), 40, 100).toRGB();
        if (defClock) {
            if (time.minutes < 10) {
                HudElements.Time_0.draw([time.hours, time.minutes], initialX, initialY, col);
            } else {
                HudElements.Time.draw([time.hours, time.minutes], initialX, initialY, col);
            }
            initialY += defYOffset * defMult * 1.45;
        }
        //#endregion

        //#region Wanted level
        var wantedLevel = plr.storeWantedLevel();
        if (wantedLevel > 0) {
            var cSin = timerSin(1000, 210, true),
                cCos = timerCos(1000, 210, true);
            var col = new RGBA(cSin, 0, cCos),
                outCol = new RGBA(cCos, cCos, cCos);
            if (defStars) {
                HudElements.WantedLevel[wantedLevel].draw([], initialX + timerCos(1000, 1), initialY, col, outCol, defOutlineWidth, Font.Gothic);
            } else {
                HudElements.WantedLevel[0].draw([wantedLevel], initialX + timerCos(1000, 1), initialY, col, outCol);
            }
        }
        //#endregion
        //#endregion

        //#region Left side
        var initialX = 37 * defMult,
            initialY = 25 * defMult;

        //#region Clock (alternative)
        if (!defClock && !Text.IsHelpMessageBeingDisplayed()) {
            var col = new HSV(timerSin(60000, 360, true), 60, 100).toRGB(),
                smallerTextScale = 0.8;

            if (defHrsInCentre) {
                HudElements.TimeAlt.draw([time.hours], initialX, initialY, Colours.White);
                HudElements.TimeAlt.draw([time.minutes],
                initialX + Math.cos(time.minutes * minToRad - deg90ToRad) * 22 * defMult,
                initialY + Math.sin(time.minutes * minToRad - deg90ToRad) * 20 * defMult,
                col, Colours.Black, defOutlineWidth, defFont, defWidth * smallerTextScale, defHeight * smallerTextScale);
            } else {
                HudElements.TimeAlt.draw([time.minutes], initialX, initialY, col);
                HudElements.TimeAlt.draw([time.hours],
                initialX + Math.cos(time.hours * hrsToRad - deg90ToRad) * 22 * defMult,
                initialY + Math.sin(time.hours * hrsToRad - deg90ToRad) * 20 * defMult,
                Colours.White, Colours.Black, defOutlineWidth, defFont, defWidth * smallerTextScale, defHeight * smallerTextScale);
            }
        }
        //#endregion

        //#region Speedometer
        if (plc.isInAnyCar()) {
            var speed = plc.storeCarIsInNoSave().getSpeed(),
                col = new HSV(timerSin(3000, 70, true), 50, 100).toRGB();
            HudElements.Speedometer.draw([speed], 25.5, 310, col);
        }
        //#endregion
        //#endregion
    }
    //#endregion
}

/**
 * Calculates and returns the sine of ingame timer and multiplies by a given value.
 * @param {int} period Time period of function
 * @param {number} maxValue Maximum return value
 * @param {boolean} isAbsolute Make the value absolute
 * @returns Sine of ingame timer multiplied by maximum value
 */
function timerSin(period, maxValue, isAbsolute = false) {
    // Thanks to Alexander Lukhnovich for help with trigonometry
    var tSin = Math.sin((TIMERA / (period * 4)) * Math.PI * 2) * maxValue;
    return isAbsolute ? Math.abs(tSin) : tSin;
}

/**
 * Calculates and returns the cosine of ingame timer and multiplies by a given value.
 * @param {int} period Time period of function
 * @param {number} maxValue Maximum return value
 * @param {boolean} isAbsolute Make the value absolute
 * @returns Cosine of ingame timer multiplied by maximum value
 */
 function timerCos(period, maxValue, isAbsolute = false) {
    // Thanks to Alexander Lukhnovich for help with trigonometry
    var tCos = Math.cos((TIMERA / (period * 4)) * Math.PI * 2) * maxValue;
    return isAbsolute ? Math.abs(tCos) : tCos;
}

/**
 * Creates an ImGui button and returns its status.
 * @param {string} buttonText ImGui button name
 * @param {int} itemsNum The number of items on the line
 * @returns result of pressing the button
 */
 function IsGuiButtonPressed(buttonText, itemsNum = 1) {
    return ImGui.Button(buttonText, ImGui.GetScalingSize('ReHudScaling', itemsNum, false).x, 30.0);
}