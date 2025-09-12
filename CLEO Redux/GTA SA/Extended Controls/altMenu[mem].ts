//  Script by Vital (Vitaly Pavlovich Ulyanov)
import { Button, Font, KeyCode, PadId, ScriptSound } from './sa_enums';

// Constants
const FAST_SCROLL_DELAY = 69;
const PAGE_SCROLL_DELAY = 89;
const plr: Player = new Player(0);
const plc: Char = plr.getChar();
const thisPad: int = Memory.CallFunctionReturn(0x53FB70, 1, 1, 0);

// Types
type Alignment = 'LEFT'|'CENTRE'|'RIGHT';

// Interfaces
export interface Item {
    /** Menu item's name's string or GXT/FXT key (should start with #). */
    name?: string|Function;
    /** Menu item's description's string or GXT/FXT key (should start with #). */
    description?: string|Function;
    /** Function called when accept button is clicked */
    click?: Function;
    /** Function called when accept button is being pressed */
    hold?: Function;
    /** Function called before displaying current item */
    enter?: Function;
    /** Function called while displaying current item */
    display?: Function;
    /** Function called after displaying current item */
    exit?: Function;
}

interface Defaults {
    /** Adds general information about the menu module. */
    addHelp?: boolean;
    /** Item counter's alignment */
    counterAlignment?: Alignment;
    /** Item counter's colour in RGBA */
    counterColour?: [int, int, int, int];
    /** Item counter's font: Gothic [0], Subtitles [1], Menu [2], Pricedown [3] */
    counterFont?: int;
    /** Item counter's font size */
    counterFontSize?: { width: float, height: float };
    /** Item counter's outline colour in RGBA */
    counterOutlineColour?: [int, int, int, int];
    /** Item counter's position (X and Y in [0;1] range) */
    counterPos?: { x: float, y: float };
    /** Turn player's controls off while displaying the menu */
    disableControls?: boolean;
    /** Disable HUD while the menu is shown */
    disableHud?: boolean;
    /** Disable standard menu sounds */
    disableSounds?: boolean;
    /** Exit the menu on player's death or arrest */
    exitOnDeathArrest?: boolean;
    /** Items' alignment */
    itemsAlignment?: Alignment;
    /** Function called when accept button is clicked */
    itemsClick?: Function;
    /** Items' colour in RGBA */
    itemsColour?: [int, int, int, int];
    /** Function called while displaying current option */
    itemsDisplay?: Function;
    /** Function called before displaying current option */
    itemsEnter?: Function;
    /** Function called after displaying current option */
    itemsExit?: Function;
    /** Items' font: Gothic [0], Subtitles [1], Menu [2], Pricedown [3] */
    itemsFont?: int;
    /** Items' font size */
    itemsFontSize?: { width: float, height: float };
    /** Function called when accept button is being pressed */
    itemsHold?: Function;
    /** Items' position (X and Y in [0;1] range) */
    itemsPos?: { x: float, y: float };
    /** Items' shadow colour in RGBA */
    itemsShadowColour?: [int, int, int, int];
    /** Selected item's background colour in RGBA */
    selectedBackgroundColour?: [int, int, int, int];
    /** Selected item's colour in RGBA */
    selectedColour?: [int, int, int, int];
    /** Selected item's outline colour in RGBA */
    selectedOutlineColour?: [int, int, int, int];
    /** Display item counter */
    showCounter?: boolean;
    /** Title's alignment */
    titleAlignment?: Alignment;
    /** Title's colour in RGBA */
    titleColour?: [int, int, int, int];
    /** Title's font: Gothic [0], Subtitles [1], Menu [2], Pricedown [3] */
    titleFont?: int;
    /** Title's font size */
    titleFontSize?: { width: float, height: float };
    /** Title's outline colour in RGBA */
    titleOutlineColour?: [int, int, int, int];
    /** Title's position (X and Y in [0;1] range) */
    titlePos?: { x: float, y: float };
}

// Menu class
export class AltMenu {
    private active: boolean;
    title: string|Function;
    selection: int;
    items: Item[];
    defaults: Defaults;

    /**
     * Create a new custom menu.
     * @param title Title's string or GXT/FXT key (should start with #).
     * @param items Array of menu items.
     * @param defaults Object for overriding default settings
     */
    constructor (title: string|Function, items: Item[], defaults?: Defaults) {
        this.active = false;
        this.title = title;
        this.selection = 0;
        this.items = items;
        this.defaults = {
            addHelp: defaults?.addHelp ?? true,
            counterAlignment: defaults?.counterAlignment ?? 'LEFT',
            counterColour: defaults?.counterColour ?? [210, 210, 210, 210],
            counterFont: defaults?.counterFont ?? Font.Subtitles,
            counterFontSize: defaults?.counterFontSize ?? {width: 0.37, height: 1.8},
            counterPos: defaults?.counterPos ?? {x: 0.06, y: 0.7},
            counterOutlineColour: defaults?.counterOutlineColour ?? [0, 0, 0, 180],
            disableControls: defaults?.disableControls ?? true,
            disableHud: defaults?.disableHud ?? false,
            disableSounds: defaults?.disableSounds ?? false,
            exitOnDeathArrest: defaults?.exitOnDeathArrest ?? true,
            itemsAlignment: defaults?.itemsAlignment ?? 'LEFT',
            itemsClick: defaults?.itemsClick,
            itemsColour: defaults?.itemsColour ?? [230, 230, 230, 210],
            itemsDisplay: defaults?.itemsDisplay,
            itemsEnter: defaults?.itemsEnter,
            itemsExit: defaults?.itemsExit,
            itemsFont: defaults?.itemsFont ?? Font.Menu,
            itemsFontSize: defaults?.itemsFontSize ?? {width: 0.35, height: 1.9},
            itemsHold: defaults?.itemsHold,
            itemsPos: defaults?.itemsPos ?? {x: 0.06, y: 0.41},
            itemsShadowColour: defaults?.itemsShadowColour ?? [0, 0, 0, 180],
            selectedBackgroundColour: defaults?.selectedBackgroundColour ?? [127, 127, 127, 110],
            selectedColour: defaults?.selectedColour ?? [255, 255, 255, 230],
            selectedOutlineColour: defaults?.selectedOutlineColour ?? [0, 0, 0, 170],
            showCounter: defaults?.showCounter ?? false,
            titleAlignment: defaults?.titleAlignment ?? 'LEFT',
            titleColour: defaults?.titleColour ?? [172, 200, 241, 230],
            titleFont: defaults?.titleFont ?? Font.Menu,
            titleFontSize: defaults?.titleFontSize ?? {width: 0.46, height: 2.5},
            titleOutlineColour: defaults?.titleOutlineColour ?? [0, 0, 0, 170],
            titlePos: defaults?.titlePos ?? {x: 0.06, y: 0.34},
        };

        if (this.defaults.addHelp) {
            this.items.unshift({
                name: '~>~ Menu help',
                description: 'Press ~y~~k~~PED_SPRINT~~s~/~y~~k~~PED_FIREWEAPON~~s~ to learn how to use the menu',
                click: function () {
                    wait(0);
                    while (help.isDisplayed()) {
                        wait(0);
                    }
                }
            });
        }
    }

    private disableControls() {
        if (this.defaults.disableControls && plr.isControlOn()) {
            plr.setControl(false);
        }
    }

    private disableHud() {
        if (this.defaults.disableHud) {
            Hud.SwitchWidescreen(true);
            Game.AllowPauseInWidescreen(true);
        }
    }

    private shouldExit() {
        if (enterCarJustPressed()
            || (this.defaults.exitOnDeathArrest && !plr.isPlaying())
        ) {
            wait(0);
            this.active = false;
            this.playSound(ScriptSound.SoundShopBuyDenied);
            if (this.defaults.disableControls) plr.setControl(true);
            if (this.defaults.disableHud) Hud.SwitchWidescreen(false);
            return true;
        }
    }

    private getText(str: string|Function): string {
        return str instanceof Function ? str() : str;
    }

    private printString(str: string|Function) {
        let text = this.getText(str);

        if (text.startsWith('#')) {
            Text.PrintNow(text.slice(1), 0, 1);
        } else {
            Text.PrintStringNow(text, 0);
        }
    }

    private printItemDescription(item: Item) {
        if (!item.description) return;
        this.printString(item.description);
    }

    private alignText(alignment: Alignment) {
        switch (alignment) {
            case 'CENTRE':
                Text.SetCenter(true);
                break;
            case 'RIGHT':
                Text.SetRightJustify(true);
                break
            default:
                Text.SetCenter(false);
                Text.SetRightJustify(false);
                break;
        }
    }

    private getItemsSection(): { start: number, end: number } {
        if (this.selection < 3) {
            return {
                start: 0,
                end: 5
            };
        }
        if (this.selection > this.items.length - 4) {
            return {
                start: this.items.length - 5,
                end: this.items.length
            };
        }
        return {
            start: this.selection - 2,
            end: this.selection + 3
        };
    }

    private processScroll() {
        // Previous item
        if (previousWeaponJustPressed()
            || (Pad.GetPositionOfAnalogueSticks(PadId.Pad1).leftStickY < 0
                && TIMERA > FAST_SCROLL_DELAY)
        ) {
            this.changeSelection(-1);
            TIMERA = 0;
            return;
        }
        
        // Next item
        if (nextWeaponJustPressed()
            || (Pad.GetPositionOfAnalogueSticks(PadId.Pad1).leftStickY > 0
                && TIMERA > FAST_SCROLL_DELAY)
        ) {
            this.changeSelection(1);
            TIMERA = 0;
            return;
        }
        
        // Previous page
        if (Pad.IsKeyPressed(KeyCode.Prior)
            && TIMERA > PAGE_SCROLL_DELAY
        ) {
            this.changeSelection(-5);
            TIMERA = 0;
            return;
        }

        // Next page
        if (Pad.IsKeyPressed(KeyCode.Next)
            && TIMERA > PAGE_SCROLL_DELAY
        ) {
            this.changeSelection(5);
            TIMERA = 0;
            return;
        }

        // First item
        if (Pad.IsKeyPressed(KeyCode.Home)
            && this.selection !== 0
        ) {
            this.setSelection(0);
            return;
        }

        // Last item
        if (Pad.IsKeyPressed(KeyCode.End)
            && this.selection !== this.items.length - 1
        ) {
            this.setSelection(this.items.length - 1);
            return;
        }

        // Middle of the menu
        if (Pad.IsKeyPressed(KeyCode.Insert)
            && this.items.length > 2
            && this.selection !== Math.ceil(this.items.length / 2) - 1
        ) {
            this.setSelection(Math.ceil(this.items.length / 2) - 1);
            return;
        }
    }

    /**
     * Sets the menu's current item.
     * @param value New selection index
     */
    private setSelection(value: int) {
        if (this.items[this.selection].exit) {
            this.items[this.selection].exit();
        } else if (this.defaults.itemsExit) {
            this.defaults.itemsExit();
        }

        this.selection = value;

        if (this.items[this.selection].enter) {
            this.items[this.selection].enter();
        } else if (this.defaults.itemsEnter) {
            this.defaults.itemsEnter();
        }

        this.playSound(ScriptSound.SoundRouletteNoCash);
    }

    /**
     * Changes the menu's current item by a given amount.
     * @param value Number added to current menu index
     */
    private changeSelection(value: int) {
        if (this.items[this.selection].exit) {
            this.items[this.selection].exit();
        } else if (this.defaults.itemsExit) {
            this.defaults.itemsExit();
        }

        this.selection = ringClamp(
            0, this.selection + value, this.items.length - 1
        );

        if (this.items[this.selection].enter) {
            this.items[this.selection].enter();
        } else if (this.defaults.itemsEnter) {
            this.defaults.itemsEnter();
        }

        this.playSound(ScriptSound.SoundRestaurantTrayCollision);
    }

    private processCurrentItemEvents(item: Item) {
        if (item.display) {
            item.display();
        } else if (this.defaults.itemsDisplay) {
            this.defaults.itemsDisplay();
        }

        if (attackJustPressed() || sprintJustPressed()) {
            if (item.click) {
                this.playSound(ScriptSound.SoundShopBuy);
                item.click();
            } else if (this.defaults.itemsClick) {
                this.playSound(ScriptSound.SoundShopBuy);
                this.defaults.itemsClick();
            }
        } else if (Pad.IsButtonPressed(PadId.Pad1, Button.Circle)
            || Pad.IsButtonPressed(PadId.Pad1, Button.Cross)
        ) {
            if (item.hold) {
                item.hold();
            } else if (this.defaults.itemsHold) {
                this.defaults.itemsHold();
            }
        }
    }

    private playSound(soundId: int) {
        if (this.defaults.disableSounds) return;
        Sound.AddOneOffSound(0, 0, 0, soundId);
    }

    /**
     * Tries to show the menu and returns whether it is shown
     */
    isDisplayed(): boolean {
        if (this.shouldExit()) return false;
        if (this.items.length === 0) return false;
        if (!this.active) {
            if (this.items[this.selection].enter) {
                this.items[this.selection].enter();
            }
            this.active = true;
        }

        this.disableControls();
        this.disableHud();
        this.processScroll();

        Text.UseCommands(true);
        this.drawTitle();
        this.drawItems();
        this.drawCounter();
        Text.UseCommands(false);

        return true;
    }

    drawTitle() {
        let text = this.getText(this.title);

        if (text.startsWith('#')) {
            text = text.slice(1);
        } else {
            FxtStore.insert('ALT@HDR', text, true);
            text = 'ALT@HDR';
        }

        this.alignText(this.defaults.titleAlignment);
        Text.SetColor(...this.defaults.titleColour);
        Text.SetEdge(1, ...this.defaults.titleOutlineColour);
        Text.SetFont(this.defaults.titleFont);
        Text.SetScale(
            this.defaults.titleFontSize.width,
            this.defaults.titleFontSize.height
        );
        Text.SetWrapX(640);
        Text.Display(
            this.defaults.titlePos.x * 640,
            this.defaults.titlePos.y * 448,
            text
        );
    }

    drawItems() {
        let section = this.getItemsSection();
        let row = 0; // [0;4]

        for (let i = section.start; i < section.end; i++) {
            if (!this.items[i]) continue;
            let item = this.items[i];
            let x = this.defaults.itemsPos.x * 640;
            let y = this.defaults.itemsPos.y * 448 
                + row * this.defaults.itemsFontSize.height * 13.1;

            let text = this.getText(item.name) ?? 'FEC_QUE';

            if (text.startsWith('#')) {
                text = text.slice(1);
            } else {
                let key = `ALT@TX${row}`;
                FxtStore.insert(key, text, true);
                text = key;
            }

            if (this.selection === i) {
                // Selected item
                this.printItemDescription(item);
                this.processCurrentItemEvents(item);

                Hud.DrawRect(
                    320, y + this.defaults.itemsFontSize.height * 5.2,
                    640, this.defaults.itemsFontSize.height * 12,
                    ...this.defaults.selectedBackgroundColour
                );
                Text.SetColor(...this.defaults.selectedColour);
                Text.SetEdge(1, ...this.defaults.selectedOutlineColour);
            } else {
                // Non-selected item
                Text.SetColor(...this.defaults.itemsColour);
                Text.SetDropshadow(1, ...this.defaults.itemsShadowColour);
            }

            this.alignText(this.defaults.itemsAlignment);
            Text.SetFont(this.defaults.itemsFont);
            Text.SetScale(
                this.defaults.itemsFontSize.width,
                this.defaults.itemsFontSize.height
            );
            Text.SetWrapX(640);
            Text.Display(x, y, text);

            row++;
        }
    }

    drawCounter() {
        if (!this.defaults.showCounter) return;

        FxtStore.insert(
            'ALT@CNT',
            `- ${this.selection + 1}/${this.items.length} -`,
            true
        );
        this.alignText(this.defaults.counterAlignment);
        Text.SetColor(...this.defaults.counterColour);
        Text.SetEdge(1, ...this.defaults.counterOutlineColour);
        Text.SetFont(this.defaults.counterFont);
        Text.SetScale(
            this.defaults.counterFontSize.width,
            this.defaults.counterFontSize.height
        );
        Text.SetWrapX(640);
        Text.Display(
            this.defaults.counterPos.x * 640,
            this.defaults.counterPos.y * 448,
            'ALT@CNT'
        );
    }
}

function attackJustPressed(): boolean {
    return Memory.Fn.ThiscallU8(0x53EF60, thisPad)() !== 0;
}

function sprintJustPressed(): boolean {
    return Memory.Fn.ThiscallU8(0x4D59E0, thisPad)() !== 0;
}

function enterCarJustPressed(): boolean {
    return Memory.Fn.ThiscallU8(0x53EF40, thisPad)() !== 0;
}

function previousWeaponJustPressed(): boolean {
    return (Memory.ReadU16(thisPad + 0xA, false) !== 0
        && Memory.ReadU16(thisPad + 0x3A, false) === 0);
}

function nextWeaponJustPressed(): boolean {
    return (Memory.ReadU16(thisPad + 0xE, false) !== 0
        && Memory.ReadU16(thisPad + 0x3E, false) === 0);
}

function clamp(min: number, value: number, max: number): number {
    return value > max
        ? max
        : value < min
            ? min
            : value;
}

function ringClamp(min: number, value: number, max: number): number {
    return value > max
        ? min
        : value < min
            ? max
            : value;
}

function isNumberInRange(min: number, value: number, max: number): boolean {
    return (value >= min || value <= max);
}

const help: AltMenu = new AltMenu(
    'Menu help',
    [
        {
            name: 'Next item',
            description: '~k~~PED_CYCLE_WEAPON_RIGHT~~r~/~s~~k~~GO_BACK~ (faster)'
        },
        {
            name: 'Previous item',
            description: '~k~~PED_CYCLE_WEAPON_LEFT~~r~/~s~~k~~GO_FORWARD~ (faster)'
        },
        {
            name: 'Activate item',
            description: '~k~~PED_SPRINT~~r~/~s~~k~~PED_FIREWEAPON~'
        },
        {
            name: 'Exit menu',
            description: '~k~~VEHICLE_ENTER_EXIT~'
        },
        {
            name: 'Next page',
            description: 'Page Down'
        },
        {
            name: 'Previous page',
            description: 'Page Up'
        },
        {
            name: 'First item',
            description: 'Home'
        },
        {
            name: 'Last item',
            description: 'End'
        },
        {
            name: 'Middle of the menu',
            description: 'Insert'
        },
        {
            name: 'Author: ~r~~h~Vital~s~ (Vitaly Ulyanov)',
            description: 'https://github.com/~y~VitalRus95',
            click: function () {
                if (plc.isTalking()) return;

                let phrases = [
                    43200, 20209, 20230, 21425, 9021, 8631, 41201, 19061,
                    37483, 14038, 39800, 30400, 21645, 9019, 44601, 13206
                ];
                let i = Math.floor(Math.random() * phrases.length);
                plc.setSayScript(phrases[i], true, true, false);
            }
        }
    ], {
        addHelp: false
    }
);