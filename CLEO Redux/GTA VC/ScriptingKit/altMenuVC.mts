// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
// Thanks to: SpitFire, Seemann
import { Button, Font, KeyCode, PadId, ScriptSound } from "./vc_enums.mts";
import {
    getScreenSize,
    PLAYER,
    circularClamp,
    isButtonJustDown,
    isMouseWheelUp,
    isMouseWheelDown,
} from "./vc_funcs.mts";

Memory.Write(0x5599c2, 5, 0x90, true); // NOP zone names
Memory.Write(0x559e8e, 5, 0x90, true); // NOP vehicle names
Memory.Write(0x5446f2, 5, 0x90, true); // NOP custom shadow in credits
Memory.WriteU8(0x544703 + 1, 255, true); // Change blue colour in credits

// Fix drawn text's shadow disappearance (CFont::SetDropShadowPosition)
Memory.WriteU8(0x55b11c, 2, true); // When subtitles are displayed
Memory.WriteU8(0x55b5a5, 2, true); // When help text is displayed
Memory.WriteU8(0x5522d3, 2, true); // Change shadow in CFont::InitPerFrame

// Constants
const FAST_SCROLL_DELAY = 99;
const SLOW_SCROLL_DELAY = 499;
const PAGE_SCROLL_DELAY = 349;
const HUD_ENABLED: int = 0x86963a;

// Types
type Alignment = "LEFT" | "CENTRE" | "RIGHT";

// Interfaces
export interface Item {
    /** Menu item's name's string or GXT/FXT key (should start with #). */
    name?: string | Function;
    /** Menu item's description's string or GXT/FXT key (should start with #). */
    description?: string | Function;
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
    /** Item counter's font: Bank [0], Standard [1], Heading [2], Japanese [3] */
    counterFont?: int;
    /** Item counter's font size */
    counterFontSize?: { width: float; height: float };
    /** Item counter's position (X and Y in [0;1] range) */
    counterPos?: { x: float; y: float };
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
    itemsFontSize?: { width: float; height: float };
    /** Function called when accept button is being pressed */
    itemsHold?: Function;
    /** Items' position (X and Y in [0;1] range) */
    itemsPos?: { x: float; y: float };
    /** Selected item's colour in RGBA */
    selectedColour?: [int, int, int, int];
    /** Display item counter */
    showCounter?: boolean;
    /** Title's alignment */
    titleAlignment?: Alignment;
    /** Title's colour in RGBA */
    titleColour?: [int, int, int, int];
    /** Title's font: Gothic [0], Subtitles [1], Menu [2], Pricedown [3] */
    titleFont?: int;
    /** Title's font size */
    titleFontSize?: { width: float; height: float };
    /** Title's position (X and Y in [0;1] range) */
    titlePos?: { x: float; y: float };
}

// Menu class
export class AltMenu {
    private active: boolean;
    title: string | Function;
    selection: int;
    items: Item[];
    defaults: Defaults;

    /**
     * Create a new custom menu.
     * @param title Title's string or GXT/FXT key (should start with #).
     * @param items Array of menu items.
     * @param defaults Object for overriding default settings
     */
    constructor(title: string | Function, items: Item[], defaults?: Defaults) {
        this.active = false;
        this.title = title;
        this.selection = 0;
        this.items = items;
        this.defaults = {
            addHelp: defaults?.addHelp ?? false,
            counterAlignment: defaults?.counterAlignment ?? "LEFT",
            counterColour: defaults?.counterColour ?? [97, 194, 247, 255],
            counterFont: defaults?.counterFont ?? Font.Bank,
            counterFontSize: defaults?.counterFontSize ?? {
                width: 0.7,
                height: 2.1,
            },
            counterPos: defaults?.counterPos ?? {
                x: 0.01,
                y: 0.48,
            },
            disableControls: defaults?.disableControls ?? true,
            disableHud: defaults?.disableHud ?? false,
            disableSounds: defaults?.disableSounds ?? false,
            exitOnDeathArrest: defaults?.exitOnDeathArrest ?? true,
            itemsAlignment: defaults?.itemsAlignment ?? "LEFT",
            itemsClick: defaults?.itemsClick,
            itemsColour: defaults?.itemsColour ?? [255, 150, 225, 255],
            itemsDisplay: defaults?.itemsDisplay,
            itemsEnter: defaults?.itemsEnter,
            itemsExit: defaults?.itemsExit,
            itemsFont: defaults?.itemsFont ?? Font.Heading,
            itemsFontSize: defaults?.itemsFontSize ?? {
                width: 0.63,
                height: 1.89,
            },
            itemsHold: defaults?.itemsHold,
            itemsPos: defaults?.itemsPos ?? {
                x: 0.01,
                y: 0.2,
            },
            selectedColour: defaults?.selectedColour ?? [255, 255, 175, 255],
            showCounter: defaults?.showCounter ?? false,
            titleAlignment: defaults?.titleAlignment ?? "LEFT",
            titleColour: defaults?.titleColour ?? [0, 207, 133, 255],
            titleFont: defaults?.titleFont ?? Font.Bank,
            titleFontSize: defaults?.titleFontSize ?? {
                width: 1.4,
                height: 4.2,
            },
            titlePos: defaults?.titlePos ?? {
                x: 0.01,
                y: 0.1,
            },
        };

        if (this.defaults.addHelp) {
            this.items.unshift({
                name: "- Menu help -",
                description:
                    "Press ~k~~PED_SPRINT~~h~ (~k~~VEHICLE_HORN~ in a vehicle) ~y~/~h~~k~~PED_FIREWEAPON~ to learn how to use the menu",
                click: function () {
                    wait(0);
                    while (help.isDisplayed()) {
                        wait(0);
                    }
                },
            });
        }
    }

    private disableControls() {
        if (this.defaults.disableControls && PLAYER.canStartMission()) {
            PLAYER.setControl(false);
        }
    }

    private disableHud() {
        if (this.defaults.disableHud) {
            displayHud(false);
        }
    }

    private shouldExit() {
        if (
            isButtonJustDown(Button.Triangle) ||
            (this.defaults.exitOnDeathArrest && !PLAYER.isPlaying())
        ) {
            this.active = false;
            this.playSound(ScriptSound.SoundAmmunationBuyWeaponDenied);
            while (Pad.IsButtonPressed(PadId.Pad1, Button.Triangle)) {
                wait(0);
            }
            if (this.defaults.disableControls) PLAYER.setControl(true);
            if (this.defaults.disableHud) displayHud(true);
            return true;
        }
    }

    private getText(str: string | Function): string {
        return str instanceof Function ? str() : str;
    }

    private printString(str: string | Function) {
        let text = this.getText(str);

        if (text.startsWith("#")) {
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
            case "CENTRE":
                Text.SetCenter(true);
                break;
            case "RIGHT":
                Text.SetRightJustify(true);
                break;
            default:
                Text.SetCenter(false);
                Text.SetRightJustify(false);
                break;
        }
    }

    private getItemsSection(): { start: number; end: number } {
        if (this.selection < 3) {
            return {
                start: 0,
                end: 5,
            };
        }
        if (this.selection > this.items.length - 4) {
            return {
                start: this.items.length - 5,
                end: this.items.length,
            };
        }
        return {
            start: this.selection - 2,
            end: this.selection + 3,
        };
    }

    private processScroll() {
        // Previous item
        if (
            isMouseWheelUp() ||
            isButtonJustDown(Button.DpadLeft) ||
            (Pad.IsButtonPressed(PadId.Pad1, Button.DpadLeft) &&
                TIMERA > SLOW_SCROLL_DELAY) ||
            (Pad.IsButtonPressed(
                PadId.Pad1,
                PLAYER.isInAnyCar() ? Button.Cross : Button.DpadUp,
            ) &&
                TIMERA > FAST_SCROLL_DELAY)
        ) {
            TIMERA = 0;
            this.changeSelection(-1);
            return;
        }

        // Next item
        if (
            isMouseWheelDown() ||
            isButtonJustDown(Button.DpadRight) ||
            (Pad.IsButtonPressed(PadId.Pad1, Button.DpadRight) &&
                TIMERA > SLOW_SCROLL_DELAY) ||
            (Pad.IsButtonPressed(
                PadId.Pad1,
                PLAYER.isInAnyCar() ? Button.Square : Button.DpadDown,
            ) &&
                TIMERA > FAST_SCROLL_DELAY)
        ) {
            TIMERA = 0;
            this.changeSelection(1);
            return;
        }

        // Previous page
        if (Pad.IsKeyPressed(KeyCode.Prior) && TIMERA > PAGE_SCROLL_DELAY) {
            this.changeSelection(-5);
            TIMERA = 0;
            return;
        }

        // Next page
        if (Pad.IsKeyPressed(KeyCode.Next) && TIMERA > PAGE_SCROLL_DELAY) {
            this.changeSelection(5);
            TIMERA = 0;
            return;
        }

        // First item
        if (Pad.IsKeyPressed(KeyCode.Home) && this.selection !== 0) {
            this.setSelection(0);
            return;
        }

        // Last item
        if (
            Pad.IsKeyPressed(KeyCode.End) &&
            this.selection !== this.items.length - 1
        ) {
            this.setSelection(this.items.length - 1);
            return;
        }

        // Middle of the menu
        if (
            Pad.IsKeyPressed(KeyCode.Insert) &&
            this.items.length > 2 &&
            this.selection !== Math.ceil(this.items.length / 2) - 1
        ) {
            this.setSelection(Math.ceil(this.items.length / 2) - 1);
            return;
        }
    }

    private processSelection(item: Item) {
        if (
            isButtonJustDown(Button.Circle) ||
            isButtonJustDown(
                PLAYER.isInAnyCar() ? Button.LeftShock : Button.Cross,
            )
        ) {
            if (item.click) {
                this.playSound(ScriptSound.SoundAmmunationBuyWeapon);
                item.click();
            } else if (this.defaults.itemsClick) {
                this.playSound(ScriptSound.SoundAmmunationBuyWeapon);
                this.defaults.itemsClick();
            }
        } else if (
            Pad.IsButtonPressed(PadId.Pad1, Button.Circle) ||
            Pad.IsButtonPressed(PadId.Pad1, Button.Cross)
        ) {
            if (item.hold) {
                item.hold();
            } else if (this.defaults.itemsHold) {
                this.defaults.itemsHold();
            }
        }
    }

    private processDisplayEvent(item: Item) {
        if (item.display) {
            item.display();
        } else if (this.defaults.itemsDisplay) {
            this.defaults.itemsDisplay();
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

        this.playSound(ScriptSound.SoundAmmunationBuyWeaponDenied);
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

        this.selection = circularClamp(
            0,
            this.selection + value,
            this.items.length - 1,
        );

        if (this.items[this.selection].enter) {
            this.items[this.selection].enter();
        } else if (this.defaults.itemsEnter) {
            this.defaults.itemsEnter();
        }

        this.playSound(ScriptSound.SoundBoxDestroyed2);
    }

    private playSound(soundId: int) {
        if (this.defaults.disableSounds) return;
        let pos = PLAYER.getCoordinates();
        Sound.AddOneOffSound(pos.x, pos.y, pos.z, soundId);
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
        this.processSelection(this.items[this.selection]);
        this.drawTitle();
        this.drawItems();
        this.drawCounter();
        Text.UseCommands(false);

        return true;
    }

    drawTitle() {
        let text = this.getText(this.title);

        if (text.startsWith("#")) {
            text = text.slice(1);
        } else {
            FxtStore.insert("ALT@HDR", text, true);
            text = "ALT@HDR";
        }

        this.alignText(this.defaults.titleAlignment);
        Text.SetColor(...this.defaults.titleColour);
        Text.SetFont(this.defaults.titleFont);
        Text.SetScale(
            this.defaults.titleFontSize.width,
            this.defaults.titleFontSize.height,
        );
        Text.SetWrapX(640);
        Text.Display(
            this.defaults.titlePos.x * 640,
            this.defaults.titlePos.y * 448,
            text,
        );
    }

    drawItems() {
        let section = this.getItemsSection();
        let row = 0; // [0;4]

        for (let i = section.start; i < section.end; i++) {
            if (!this.items[i]) continue;
            let item = this.items[i];
            let x = this.defaults.itemsPos.x * 640;
            let y =
                this.defaults.itemsPos.y * 448 +
                row * this.defaults.itemsFontSize.height * 13.1;

            let text = this.getText(item.name) ?? "FEC_QUE";

            if (text.startsWith("#")) {
                text = text.slice(1);
            } else {
                let key = `ALT@TX${row}`;
                FxtStore.insert(key, text, true);
                text = key;
            }

            if (this.selection === i) {
                // Selected item
                this.printItemDescription(item);
                this.processDisplayEvent(item);
                Text.SetColor(...this.defaults.selectedColour);
            } else {
                // Non-selected item
                Text.SetColor(...this.defaults.itemsColour);
            }

            this.alignText(this.defaults.itemsAlignment);
            Text.SetFont(this.defaults.itemsFont);
            Text.SetScale(
                this.defaults.itemsFontSize.width,
                this.defaults.itemsFontSize.height,
            );
            Text.SetWrapX(getScreenSize().x);
            Text.Display(x, y, text);

            row++;
        }
    }

    drawCounter() {
        if (!this.defaults.showCounter) return;

        FxtStore.insert(
            "ALT@CNT",
            `- ${this.selection + 1} (${this.items.length}) -`,
            true,
        );
        this.alignText(this.defaults.counterAlignment);
        Text.SetColor(...this.defaults.counterColour);
        Text.SetFont(this.defaults.counterFont);
        Text.SetScale(
            this.defaults.counterFontSize.width,
            this.defaults.counterFontSize.height,
        );
        Text.SetWrapX(640);
        Text.Display(
            this.defaults.counterPos.x * 640,
            this.defaults.counterPos.y * 448,
            "ALT@CNT",
        );
    }
}

function displayHud(state: boolean) {
    Hud.DisplayRadar(state);
    Memory.WriteU8(HUD_ENABLED, +state, false);
}

const help: AltMenu = new AltMenu(
    "Menu help",
    [
        {
            name: "Next item (on foot)",
            description:
                "Mouse wheel down ~y~/~h~~k~~GO_RIGHT~ ~y~/~h~~k~~GO_BACK~ (faster)",
        },
        {
            name: "Next item (in vehicle)",
            description:
                "Mouse wheel down ~y~/~h~~k~~GO_RIGHT~ ~y~/~h~~k~~VEHICLE_BRAKE~ (faster)",
        },
        {
            name: "Previous item (on foot)",
            description:
                "Mouse wheel up ~y~/~h~~k~~GO_LEFT~ ~y~/~h~~k~~GO_FORWARD~ (faster)",
        },
        {
            name: "Previous item (in vehicle)",
            description:
                "Mouse wheel up ~y~/~h~~k~~GO_LEFT~ ~y~/~h~~k~~VEHICLE_ACCELERATE~ (faster)",
        },
        {
            name: "Select item (on foot)",
            description: "~k~~PED_SPRINT~ ~y~/~h~~k~~PED_FIREWEAPON~",
        },
        {
            name: "Select item (in vehicle)",
            description: "~k~~VEHICLE_HORN~ ~y~/~h~~k~~PED_FIREWEAPON~",
        },
        {
            name: "Exit menu",
            description: "~k~~VEHICLE_ENTER_EXIT~",
        },
        {
            name: "Next page",
            description: "Page Down",
        },
        {
            name: "Previous page",
            description: "Page Up",
        },
        {
            name: "First item",
            description: "Home",
        },
        {
            name: "Last item",
            description: "End",
        },
        {
            name: "Middle of the menu",
            description: "Insert",
        },
        {
            name: "Author: ~t~Vital (Vitaly Ulyanov)",
            description: "https://github.com/~y~VitalRus95",
            click: function () {
                Audio.PlayMissionPassedTune(1);
            },
        },
    ],
    {
        showCounter: true,
    },
);
