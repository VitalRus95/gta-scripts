//  Script by Vital (Vitaly Pavlovich Ulyanov)
import { Button, PadId, ScriptSound, TextStyle } from './sa_enums';

// Constants
const plr: Player = new Player(0);
const plc: Char = plr.getChar();
const slowScroll: int = 329;
const fastScroll: int = 119;

// Interfaces
interface Option {
    /** Option's name. Should start with # to display GXT entry. */
    name?: string|Function,
    /** Option's description. Should start with # to display GXT entry. */
    description?: string|Function,
    /** Function called before displaying this option */
    before?: Function,
    /** Function called while displaying this option */
    during?: Function,
    /** Function called when choosing this option */
    confirm?: Function
    /** Function called after displaying this option */
    after?: Function
}

interface Defaults {
    /** Adds general information about the menu module. */
    addHelp?: boolean;
    /** Disable HUD while the menu is shown */
    disableHud?: boolean;
    /** Disable standard menu sounds */
    disableSounds?: boolean;
    /** Turn player's controls off while displaying the menu */
    disableControls?: boolean,
    /** Exit the menu on player's death or arrest */
    exitOnDeathArrest?: boolean,
    /** Exit the menu on pressing enter car button */
    exitOnEnterCarButton?: boolean;
    /** Function called before displaying current option */
    before?: Function,
    /** Function called while displaying current option */
    during?: Function,
    /** Function called when choosing current option */
    confirm?: Function
    /** Function called after displaying current option */
    after?: Function
}

// Menu class
export class SimpleMenu {
    private opened: boolean = false;
    title: string|Function;
    index: int = 0;
    options: Option[];
    defaults?: Defaults;

    constructor (title: string|Function, options: Option[], defaults?: Defaults) {
        this.title = title;
        this.options = options;
        if (defaults) {
            this.defaults = defaults;
            if (defaults.addHelp) {
                this.options.unshift({
                    name: '~p~Menu help',
                    description: 'Press ~y~~k~~PED_SPRINT~~s~/~y~~k~~PED_FIREWEAPON~~s~ to learn how to use the menu',
                    confirm: function () {
                        while (help.show()) {
                            wait(0);
                        }
                    }
                });
            }
        }
    }

    private disableControls() {
        if (this?.defaults?.disableControls && plr.isControlOn()) {
            plr.setControl(false);
        }
    }

    private clampIndex(change: int = 0) {
        let overflow: boolean = false;

        if (this.options[this.index].after) {
            this.options[this.index].after();
        } else if (this.defaults.after) {
            this.defaults.after();
        }

        this.index += change;
        if (this.index > this.options.length - 1) {
            this.index = 0;
            overflow = true;
        } else if (this.index < 0) {
            this.index = this.options.length - 1;
            overflow = true;
        }

        if (this.options[this.index].before) {
            this.options[this.index].before();
        } else if (this.defaults.before) {
            this.defaults.before();
        }

        if (!this.defaults.disableSounds) {
            if (overflow) {
                Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundPartMissionComplete);
            } else {
                Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundRestaurantTrayCollision);
            }
        }
    }

    private mustExit(): boolean {
        if ((this?.defaults?.exitOnEnterCarButton
            && (Pad.IsButtonPressed(PadId.Pad1, Button.Triangle)
                || Pad.IsButtonPressed(PadId.Pad1, Button.RightShoulder1))
        ) || (this?.defaults?.exitOnDeathArrest
            && !plr.isPlaying()
        )) {
            if (!this.defaults.disableSounds) {
                Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundShopBuyDenied);
            }
            while (Pad.IsButtonPressed(PadId.Pad1, Button.Triangle)
                || Pad.IsButtonPressed(PadId.Pad1, Button.RightShoulder1)
            ) {
                wait(0);
            }
            if (this.defaults.disableHud) {
                Hud.SwitchWidescreen(false);
            }
            if (this?.defaults?.disableControls) {
                plr.setControl(true);
            }
            this.opened = false;
            return true;
        }
        return false;
    }

    private nextOption() {
        if ((
            Pad.IsButtonPressed(PadId.Pad1, Button.RightShoulder2)
            && TIMERA > fastScroll
        ) || (
            Pad.GetPositionOfAnalogueSticks(PadId.Pad1).leftStickY < 0
            && TIMERA > slowScroll
        )) {
            TIMERA = 0;
            this.clampIndex(1);
        }
    }

    private previousOption() {
        if ((
            Pad.IsButtonPressed(PadId.Pad1, Button.LeftShoulder2)
            && TIMERA > fastScroll
        ) || (
            Pad.GetPositionOfAnalogueSticks(PadId.Pad1).leftStickY > 0
            && TIMERA > slowScroll
        )) {
            TIMERA = 0;
            this.clampIndex(-1);
        }
    }

    private confirmChoice() {
        if ((this.options[this.index].confirm || this.defaults.confirm)
            && (Pad.IsButtonPressed(PadId.Pad1, Button.Cross)
                || Pad.IsButtonPressed(PadId.Pad1, Button.Circle)
        )) {
            while (Pad.IsButtonPressed(PadId.Pad1, Button.Cross)
                || Pad.IsButtonPressed(PadId.Pad1, Button.Circle)
            ) {
                this.displayCurrentOption();
                wait(0);
            }

            if (!this.defaults.disableSounds) {
                Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundShopBuy);
            }

            if (this.options[this.index].confirm) {
                this.options[this.index].confirm();
            } else {
                this.defaults.confirm();
            }
        }
    }

    displayCurrentOption() {
        let title: string = this.title instanceof Function
            ? this.title() : this.title;
        let option: string = this.options[this.index].name
            ? this.options[this.index].name instanceof Function
                ? this.options[this.index].name()
                : this.options[this.index].name
            : undefined;
        let description: string = this.options[this.index].description
            ? this.options[this.index].description instanceof Function
                ? this.options[this.index].description()
                : this.options[this.index].description
            : undefined;
        
        if (title.startsWith('#')) {
            Text.PrintBig(title.substring(1), 0, TextStyle.MiddleSmallerHigher);
        } else {
            Text.PrintBigString(title, 0, TextStyle.MiddleSmallerHigher);
        }

        if (option) {
            if (option.startsWith('#')) {
                Text.PrintBig(option.substring(1), 0, TextStyle.MiddleSmaller);
            } else {
                Text.PrintBigString(option, 0, TextStyle.MiddleSmaller);
            }
        }
        
        if (description) {
            if (description.startsWith('#')) {
                Text.PrintNow(description.substring(1), 0, 1);
            } else {
                Text.PrintStringNow(description, 0);
            }
        }

        if (this.options[this.index].during) {
            this.options[this.index].during();
        } else if (this.defaults.during) {
            this.defaults.during();
        }
    }

    /** Shows the menu and returns whether it is displayed */
    show(): boolean {
        if (!this.opened) {
            this.opened = true;
            if (this.options[this.index].before) {
                this.options[this.index].before();
            }
            if (this.defaults.disableHud) {
                Hud.SwitchWidescreen(true);
                Game.AllowPauseInWidescreen(true);
            }
        }
        if (this.mustExit()) return false;
        this.disableControls();

        this.nextOption();
        this.previousOption();
        this.confirmChoice();
        this.displayCurrentOption();

        return true;
    }
}

const help: SimpleMenu = new SimpleMenu('~s~Menu help', [
    {
        name: 'Next item',
        description: '~k~~GO_FORWARD~~r~/~s~~k~~PED_CYCLE_WEAPON_RIGHT~'
    },
    {
        name: 'Previous item',
        description: '~k~~GO_BACK~~r~/~s~~k~~PED_CYCLE_WEAPON_LEFT~'
    },
    {
        name: 'Select item',
        description: '~k~~PED_SPRINT~~r~/~s~~k~~PED_FIREWEAPON~'
    },
    {
        name: 'Exit menu',
        description: '~k~~VEHICLE_ENTER_EXIT~~r~/~s~~k~~PED_LOCK_TARGET~'
    },
    {
        name: 'Author~n~~r~~h~Vital~s~ (Vitaly Ulyanov)',
        description: 'https://github.com/~y~VitalRus95'
    },
], {
    disableControls: true,
    exitOnDeathArrest: true,
    exitOnEnterCarButton: true
});