// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import { Button, KeyCode, PadId, ScriptSound, TextStyle } from "./vc_enums.mts";
import {
    isButtonJustDown,
    isMouseWheelDown,
    isMouseWheelUp,
    PLAYER,
    circularClamp,
} from "./vc_funcs.mts";

// Constants
const FAST_SCROLL_DELAY = 99;
const SLOW_SCROLL_DELAY = 499;

// Interfaces
export interface Item {
    /** Menu item's name's string or GXT/FXT key (should start with #). */
    name?: string | Function;
    /** Menu item's description's string or GXT/FXT key (should start with #). */
    description?: string | Function;
    /** Function called when confirm button is pressed */
    click?: Function;
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
    /** Turn player's controls off while displaying the menu */
    disableControls?: boolean;
    /** Disable HUD while the menu is shown */
    disableHud?: boolean;
    /** Disable standard menu sounds */
    disableSounds?: boolean;
    /** Exit the menu on player's death or arrest */
    exitOnDeathArrest?: boolean;
    /** Function called when confirm button is pressed */
    itemsClick?: Function;
    /** Function called while displaying current option */
    itemsDisplay?: Function;
    /** Function called before displaying current option */
    itemsEnter?: Function;
    /** Function called after displaying current option */
    itemsExit?: Function;
    /** Display item counter */
    showCounter?: boolean;
}

// Menu class
export class SimpleMenu {
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
            disableControls: defaults?.disableControls ?? true,
            disableHud: defaults?.disableHud ?? false,
            disableSounds: defaults?.disableSounds ?? false,
            exitOnDeathArrest: defaults?.exitOnDeathArrest ?? true,
            itemsClick: defaults?.itemsClick,
            itemsDisplay: defaults?.itemsDisplay,
            itemsEnter: defaults?.itemsEnter,
            itemsExit: defaults?.itemsExit,
            showCounter: defaults?.showCounter ?? false,
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
            Text.ClearHelp();
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

        this.playSound(ScriptSound.SoundRaceStartGo);
    }

    /**
     * Changes the menu's current item by a given amount.
     * @param change Number added to current menu index
     */
    private changeSelection(change: int) {
        if (this.items[this.selection].exit) {
            this.items[this.selection].exit();
        } else if (this.defaults.itemsExit) {
            this.defaults.itemsExit();
        }

        this.selection = circularClamp(
            0,
            this.selection + change,
            this.items.length - 1,
        );

        if (this.items[this.selection].enter) {
            this.items[this.selection].enter();
        } else if (this.defaults.itemsEnter) {
            this.defaults.itemsEnter();
        }

        this.playSound(ScriptSound.SoundBoxDestroyed2);
    }

    private processScroll() {
        // Previous item
        if (
            isButtonJustDown(Button.DpadLeft) ||
            isButtonJustDown(
                PLAYER.isInAnyCar() ? Button.Square : Button.DpadDown,
            ) ||
            isMouseWheelUp() ||
            (Pad.IsButtonPressed(PadId.Pad1, Button.DpadLeft) &&
                TIMERA > SLOW_SCROLL_DELAY) ||
            (Pad.IsButtonPressed(
                PadId.Pad1,
                PLAYER.isInAnyCar() ? Button.Square : Button.DpadDown,
            ) &&
                TIMERA > FAST_SCROLL_DELAY)
        ) {
            TIMERA = 0;
            this.changeSelection(-1);
            return;
        }

        // Next item
        if (
            isButtonJustDown(Button.DpadRight) ||
            isButtonJustDown(
                PLAYER.isInAnyCar() ? Button.Cross : Button.DpadUp,
            ) ||
            isMouseWheelDown() ||
            (Pad.IsButtonPressed(PadId.Pad1, Button.DpadRight) &&
                TIMERA > SLOW_SCROLL_DELAY) ||
            (Pad.IsButtonPressed(
                PadId.Pad1,
                PLAYER.isInAnyCar() ? Button.Cross : Button.DpadUp,
            ) &&
                TIMERA > FAST_SCROLL_DELAY)
        ) {
            TIMERA = 0;
            this.changeSelection(1);
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
            TIMERA = 0;
            if (item.click) {
                this.playSound(ScriptSound.SoundAmmunationBuyWeapon);
                item.click();
            } else if (this.defaults.itemsClick) {
                this.playSound(ScriptSound.SoundAmmunationBuyWeapon);
                this.defaults.itemsClick();
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

        this.processSelection(this.items[this.selection]);
        this.drawTitle();
        this.drawItems();
        this.drawCounter();

        return true;
    }

    drawTitle() {
        let text = this.getText(this.title);

        if (text.startsWith("#")) {
            text = text.slice(1);
        } else {
            FxtStore.insert("SMP@HDR", text, true);
            text = "SMP@HDR";
        }

        Text.PrintBig(text, 0, TextStyle.MiddleSmaller);
    }

    drawItems() {
        let item = this.items[this.selection];
        let text = this.getText(item.name) ?? "FEC_QUE";

        if (text.startsWith("#")) {
            text = text.slice(1);
        } else {
            FxtStore.insert("SMP@ITX", text, true);
            text = "SMP@ITX";
        }

        this.printItemDescription(item);
        this.processDisplayEvent(item);
        Text.PrintBig(text, 0, TextStyle.MiddleSmallerHigher);
    }

    drawCounter() {
        if (!this.defaults.showCounter) return;

        FxtStore.insert(
            "SMP@CNT",
            `~h~- ${this.selection + 1} ~y~/~h~${this.items.length} -`,
            true,
        );

        Text.PrintHelpForever("SMP@CNT");
    }
}

function displayHud(state: boolean) {
    Hud.DisplayRadar(state);
    Memory.WriteU8(0x86963a, +state, false);
}

const help: SimpleMenu = new SimpleMenu(
    "Menu help",
    [
        {
            name: "Next item (on foot)",
            description:
                "Mouse wheel down ~y~/~h~~k~~GO_RIGHT~ ~y~/~h~~k~~GO_FORWARD~ (faster)",
        },
        {
            name: "Next item (in vehicle)",
            description:
                "Mouse wheel down ~y~/~h~~k~~GO_RIGHT~ ~y~/~h~~k~~VEHICLE_ACCELERATE~ (faster)",
        },
        {
            name: "Previous item (on foot)",
            description:
                "Mouse wheel up ~y~/~h~~k~~GO_LEFT~ ~y~/~h~~k~~GO_BACK~ (faster)",
        },
        {
            name: "Previous item (in vehicle)",
            description:
                "Mouse wheel up ~y~/~h~~k~~GO_LEFT~ ~y~/~h~~k~~VEHICLE_BRAKE~ (faster)",
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
            name: "Author: ~r~Vital~s~ (Vitaly Ulyanov)",
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
