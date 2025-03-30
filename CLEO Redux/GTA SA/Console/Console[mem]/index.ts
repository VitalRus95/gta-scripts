//  Script by Vital (Vitaly Pavlovich Ulyanov)
/* 
    A command line for GTA: San Andreas with a full-fledged 
    list of commands, hints, autocompletion, and search. 
    Turn on and off with ~
*/
import { Button, CarLock, FileMode, KeyCode, PadId, ScriptSound, TextStyle } from '../sa_enums';
import data from '../../data/vehicles.ide';
import { configsInfo } from './configs';

// Enumerations
enum Proofs {
    Bullet = 0b00000100,
    Fire = 0b00001000,
    Explosion = 0b10000000,
    Collision = 0b00010000,
    Melee = 0b00100000
}

// Constants
const version: string = '0.75';
const plr: Player = new Player(0);
const plc: Char = plr.getChar();
const plp: int = Memory.GetPedPointer(plc);
const lastChar: number = 0x969110;
const cursor: string = '~r~~h~\'~s~';
const vehicles: {
    description: string,
    func: Function
}[] = data.cars.filter(
    v => v && Text.GetStringWidthWithNumber(v[5], 0) && v[3] !== 'train'
).map(
    v => ({
        description: '#' + v[5],
        func: function () {
            let model = +v[0];
            Streaming.RequestModel(model);
            Streaming.LoadAllModelsNow();

            let offsetY = Streaming.GetModelDimensions(model).rightTopFrontY + 5;
            let pos = plc.getOffsetInWorldCoords(0, offsetY, 0.5);

            World.ClearArea(pos.x, pos.y, pos.z, 10, true);
            Car.Create(model, pos.x, pos.y, pos.z)
                .setHeading(plc.getHeading() + 90)
                .lockDoors(CarLock.Unlocked)
                .markAsNoLongerNeeded();
            Streaming.MarkModelAsNoLongerNeeded(model);
        }
    })
).sort(
    (a, b) => a.description.localeCompare(b.description)
);
const configs: {
    name: string,
    description: string,
    func: Function
}[] = configsInfo.map(config => ({
    name: config.name,
    description: config.description,
    func: function () {
        let lastInput = command;
        config.commands.forEach(c => {
            command = c;
            for (let cmd of cmdList) {
                if (command.startsWith(cmd.name) && cmd.func()) {
                    cmd.lastState = command;
                    return;
                }
            }
        });
        command = lastInput;
    }
}));
const numPadButtons: {
    id: int,
    char: string
}[]= [
    { id: KeyCode.NumPad0, char: '0' },
    { id: KeyCode.NumPad1, char: '1' },
    { id: KeyCode.NumPad2, char: '2' },
    { id: KeyCode.NumPad3, char: '3' },
    { id: KeyCode.NumPad4, char: '4' },
    { id: KeyCode.NumPad5, char: '5' },
    { id: KeyCode.NumPad6, char: '6' },
    { id: KeyCode.NumPad7, char: '7' },
    { id: KeyCode.NumPad8, char: '8' },
    { id: KeyCode.NumPad9, char: '9' },
    { id: KeyCode.Subtract, char: '-' },
    { id: KeyCode.Decimal, char: '.' },
];

// Variables
let toggle: boolean = false;
let exitSubMenu: boolean = false;
let lastCmd: string = '';
let command: string = 'HELP';
let output: string = 'HELP';
let cursorPos: int = command.length;
let index: int = 0;
let helpIndex: int = 0;
let carIndex: int = 0;
let configIndex: int = 0;
let playerProofs: int = 0; // Thanks to wmysterio for help with proofs resetting 'bug'
let carProofs: int = 0;
let overlay: { red: int, green: int, blue: int, alpha: int} = {
    red: 0, green: 0, blue: 0, alpha: 0
};
let cmdList: {
    name: string,
    template: string,
    func: Function,
    lastState?: string // Set to `null` to prevent overwriting by user
}[] = [
    {   // Help
        name: 'HELP',
        template: 'HELP',
        func: function (): boolean {
            helpIndex = subMenu([
                {
                    name: '~r~~h~Submenu controls',
                    description: 'Use ~u~ and ~d~ to scroll menu items, ~y~~k~~VEHICLE_ENTER_EXIT~~s~ to exit'
                },
                {
                    name: 'Information: ~s~version',
                    description: 'Script version: ~y~' + version,
                },
                {
                    name: 'Information: ~s~commands',
                    description: 'Total number of commands: ~y~' + cmdList.length
                },
                {
                    name: 'Buttons: ~s~~u~/~d~',
                    description: 'Cycle commands'
                },
                {
                    name: 'Buttons: ~s~Enter',
                    description: 'Run current command'
                },
                {
                    name: 'Buttons: ~s~~<~/~>~',
                    description: 'Move the cursor (~r~~h~\'~s~) left/right'
                },
                {
                    name: 'Buttons: ~s~Shift',
                    description: 'Speed up input actions (cursor movement, symbol deletion, etc.)'
                },
                {
                    name: 'Buttons: ~s~Home~s~/~s~End',
                    description: 'Move the cursor to the beginning/end of the input'
                },
                {
                    name: 'Buttons: ~s~Backspace',
                    description: 'Delete one symbol ~y~before~s~ the cursor'
                },
                {
                    name: 'Buttons: ~s~Delete',
                    description: 'Delete one symbol ~y~after~s~ the cursor'
                },
                {
                    name: 'Buttons: ~s~ Left Control (~r~~h~Ctrl~s~)',
                    description: 'Clear the input'
                },
                {
                    name: 'Buttons: ~s~Insert',
                    description: 'Insert the last used command'
                },
                {
                    name: 'Buttons: ~s~Tab',
                    description: 'Search a command based on the text before the cursor'
                },
                {
                    name: 'Data types: ~s~int',
                    description: 'Integer numbers: ~y~51, 108, 359,~s~ et cetera'
                },
                {
                    name: 'Data types: ~s~float',
                    description: 'Floating-point numbers: ~y~1.7, 13.34, 2475.5,~s~ et cetera'
                },
                {
                    name: 'Data types: ~s~string',
                    description: 'Text values: ~y~Hello, world~s~ et cetera'
                },
                {
                    name: 'Data types: ~s~bool',
                    description: 'Boolean values: ~y~0 (OFF)~s~/~y~1 (ON)'
                },
                {
                    name: 'Author~n~~r~~h~Vital~s~ (Vitaly Ulyanov)',
                    description: 'github.com/~y~VitalRus95'
                },
                {
                    name: 'Thanks to~n~~b~~h~Seemann~s~ for ~y~CLEO Redux',
                    description: 'github.com/~y~x87'
                },
                {
                    name: 'Thanks to~n~~b~~h~wmysterio~s~ for help',
                    description: 'github.com/~y~wmysterio'
                }
            ], helpIndex, '~y~How to use the console?');
            return true;
        },
        lastState: null
    },
    {   // Search
        name: 'SEARCH ',
        template: 'SEARCH ~y~string',
        func: function (): boolean {
            let selected: boolean = false;
            let query = command.substring(7);
            let foundItems = cmdList.filter(c => c.name.includes(query) && c.name !== 'SEARCH ');

            if (foundItems.length > 0) {
                subMenu(
                    foundItems.map(
                        i => ({
                            name: i.name.trimEnd(),
                            func: function () {
                                command = i?.lastState ? i.lastState : i.name;
                                output = i?.lastState ? i.lastState : i.template;
                                cursorPos = command.length;
                                index = cmdList.indexOf(i);
                                exitSubMenu = true;
                                selected = true;
                            }
                        })
                    ).sort(
                        (a, b) => a.name.localeCompare(b.name)
                    ),
                    undefined,
                    '~g~~h~Search results: ~s~' + foundItems.length
                );
                if (selected) {
                    Text.PrintBigString('~y~Command selected!', 2000, TextStyle.MiddleSmaller);
                } 
                return true;
            } else {
                Text.PrintBigString('~r~~h~Nothing found!', 2000, TextStyle.MiddleSmaller);
                return true;
            }
        },
        lastState: null
    },
    {   // Configurations
        name: 'CONFIGURATIONS',
        template: 'CONFIGURATIONS',
        func: function (): boolean {
            configIndex = subMenu(configs, configIndex, '~r~~h~Configurations');
            return true;
        },
        lastState: null
    },
    {   // Health
        name: 'HEALTH ',
        template: 'HEALTH ~y~int',
        func: function (): boolean {
            let health = command.match(/[\d-]+/);
            if (health) {
                plc.setHealth(+health[0]);
                return true;
            }
            return false;
        }
    },
    {   // Armour
        name: 'ARMOUR ',
        template: 'ARMOUR ~y~int [0;100]',
        func: function (): boolean {
            let armour = command.match(/\d+/);
            if (armour && +armour[0] > -1 && +armour[0] < 101) {
                plc.addArmor(+armour[0] + plc.getArmor() * -1);
                return true;
            }
            return false;
        }
    },
    {   // Bulletproof
        name: 'BULLETPROOF ',
        template: 'BULLETPROOF ~y~bool',
        func: function (): boolean { return switchProofsBit(true, Proofs.Bullet); }
    },
    {   // Fireproof
        name: 'FIREPROOF ',
        template: 'FIREPROOF ~y~bool',
        func: function (): boolean { return switchProofsBit(true, Proofs.Fire); }
    },
    {   // Explosionproof
        name: 'EXPLOSIONPROOF ',
        template: 'EXPLOSIONPROOF ~y~bool',
        func: function (): boolean { return switchProofsBit(true, Proofs.Explosion); }
    },
    {   // Collisionproof
        name: 'COLLISIONPROOF ',
        template: 'COLLISIONPROOF ~y~bool',
        func: function (): boolean { return switchProofsBit(true, Proofs.Collision); }
    },
    {   // Meleeproof
        name: 'MELEEPROOF ',
        template: 'MELEEPROOF ~y~bool',
        func: function (): boolean { return switchProofsBit(true, Proofs.Melee); }
    },
    {   // Never tired
        name: 'NEVER TIRED ',
        template: 'NEVER TIRED ~y~bool',
        func: function (): boolean {
            let neverTired = command.match(/[01]/);
            if (neverTired) {
                plr.setNeverGetsTired(+neverTired[0] === 1);
                return true;
            }
            return false;
        }
    },
    {   // Position
        name: 'POS ',
        template: 'POS ~y~float[3]',
        func: function (): boolean {
            let pos = command.match(/[\d.-]+/g);
            if (pos && pos.length === 3) {
                Streaming.RequestCollision(+pos[0], +pos[1]);
                Streaming.LoadScene(+pos[0], +pos[1], +pos[2]);
                if (+pos[2] > -100) {
                    plc.setCoordinatesNoOffset(+pos[0], +pos[1], +pos[2]);
                } else {
                    plc.setCoordinates(+pos[0], +pos[1], -100);
                }
                Camera.SetBehindPlayer();
                return true;
            } else if (command.trimEnd() === 'POS') {
                let pos = plc.getCoordinates();
                command = `POS ${pos.x.toFixed(2)} ${pos.y.toFixed(2)} ${pos.z.toFixed(2)}`;
                output = command;
                return true;
            }
            return false;
        }
    },
    {   // Teleport to map waypoint
        name: 'TO MAP TARGET',
        template: 'TO MAP TARGET',
        func: function (): boolean {
            let waypoint = World.GetTargetCoords();
            if (waypoint) {
                Streaming.RequestCollision(waypoint.x, waypoint.y);
                Streaming.LoadScene(waypoint.x, waypoint.y, waypoint.z);
                plc.setCoordinates(waypoint.x, waypoint.y, -100);
                return true;
            } else {
                Text.PrintBigString('~r~~h~Map target not found!', 2000, TextStyle.MiddleSmaller);
            }
            return false;
        },
        lastState: null
    },
    {   // Heading
        name: 'HEADING ',
        template: 'HEADING ~y~float [0;360]',
        func: function (): boolean {
            let heading = command.match(/[\d.]+/);
            if (heading && +heading[0] >= 0 && +heading[0] <= 360) {
                if (!plc.isInAnyCar()) {
                    plc.setHeading(+heading[0]);
                } else {
                    plc.storeCarIsInNoSave().setHeading(+heading[0]);
                }
                Camera.SetBehindPlayer();
                return true;
            }
            return false;
        }
    },
    {   // Interior
        name: 'INTERIOR ',
        template: 'INTERIOR ~y~int [0;18]',
        func: function (): boolean {
            let interior = command.match(/\d+/);
            if (interior && +interior[0] > -1 && +interior[0] < 19) {
                Streaming.SetAreaVisible(+interior[0]);
                if (plc.isInAnyCar()) plc.storeCarIsInNoSave().setAreaVisible(+interior[0]);
                return true;
            }
            return false;
        }
    },
    {   // Wanted level
        name: 'WANTED ',
        template: 'WANTED ~y~int [0;6]',
        func: function (): boolean {
            let wanted = command.match(/\d+/);
            if (wanted && +wanted[0] > -1 && +wanted[0] < 7) {
                plr.alterWantedLevel(+wanted[0]);
                return true;
            }
            return false;
        }
    },
    {   // Maximum wanted level
        name: 'MAX WANTED ',
        template: 'MAX WANTED ~y~int [0;6]',
        func: function (): boolean {
            let maxWanted = command.match(/\d+/);
            if (maxWanted && +maxWanted[0] > -1 && +maxWanted[0] < 7) {
                Game.SetMaxWantedLevel(+maxWanted[0]);
                return true;
            }
            return false;
        }
    },
    {   // Sensitivity to crime
        name: 'SENSITIVITY TO CRIME ',
        template: 'SENSITIVITY TO CRIME ~y~float',
        func: function (): boolean {
            let sens = command.match(/[\d.]+/);
            if (sens) {
                Game.SetWantedMultiplier(+sens[0]);
                return true;
            }
            return false;
        }
    },
    {   // Ignored by police
        name: 'IGNORED BY POLICE ',
        template: 'IGNORED BY POLICE ~y~bool',
        func: function (): boolean {
            let flag = command.match(/[01]/);
            if (flag) {
                Game.SetPoliceIgnorePlayer(plr, +flag[0] === 1);
                return true;
            }
            return false;
        }
    },
    {   // Ignored by pedestrians
        name: 'IGNORED BY PEDESTRIANS ',
        template: 'IGNORED BY PEDESTRIANS ~y~bool',
        func: function (): boolean {
            let flag = command.match(/[01]/);
            if (flag) {
                Game.SetEveryoneIgnorePlayer(plr, +flag[0] === 1);
                return true;
            }
            return false;
        }
    },
    {   // Add money
        name: 'ADD MONEY ',
        template: 'ADD MONEY ~y~int',
        func: function (): boolean {
            let money = command.match(/[\d-]+/);
            if (money) {
                plr.addScore(+money[0]);
                return true;
            }
            return false;
        }
    },
    {   // Money
        name: 'SET MONEY ',
        template: 'SET MONEY ~y~int',
        func: function (): boolean {
            let money = command.match(/[\d-]+/);
            if (money) {
                plr.addScore(+money[0] + plr.storeScore() * -1);
                return true;
            }
            return false;
        }
    },
    {   // Weapon & ammo
        name: 'WEAPON ',
        template: 'WEAPON ~y~~n~weapon: int [1;18]+[22;46]~n~ammo: int',
        func: function (): boolean {
            let weapon = command.match(/\d+/g);
            if (weapon
                && +weapon[0] > 0
                && +weapon[0] < 46
                && +weapon[0] !== 19
                && +weapon[0] !== 20
                && +weapon[0] !== 21
            ) {
                let model = Weapon.GetModel(+weapon[0]);
                Streaming.RequestModel(model);
                Streaming.LoadAllModelsNow();
                plc.giveWeapon(+weapon[0], weapon[1] ? +weapon[1] : 1);
                Streaming.MarkModelAsNoLongerNeeded(model);
                return true;
            }
            return false;
        }
    },
    {   // Ammo for current weapon
        name: 'AMMO ',
        template: 'AMMO ~y~int [0;]',
        func: function(): boolean {
            let ammo = command.match(/\d+/);
            if (ammo && +ammo[0] > -1) {
                let weapon = plc.getCurrentWeapon();
                plc.setAmmo(weapon, +ammo[0]);
                return true;
            }
            return false;
        }
    },
    {   // Jetpack
        name: 'JETPACK',
        template: 'JETPACK',
        func: function (): boolean {
            if (!plc.isInAnyCar() && !plr.isUsingJetpack()) {
                Task.Jetpack(plc);
                return true;
            }
            return false;
        }
    },
    {   // Time of day
        name: 'TIME ',
        template: 'TIME ~y~~n~hours: int [0;23]~n~minutes: int [0;59]',
        func: function (): boolean {
            let time = command.match(/\d+/g);
            if (time && +time[0] > -1 && +time[0] < 24) {
                Clock.SetTimeOfDay(
                    +time[0],
                    (time[1] && +time[1] > -1 && +time[1] < 60)
                        ? +time[1]
                        : 0
                );
                return true;
            }
            return false;
        }
    },
    {   // Weather
        name: 'WEATHER ',
        template: 'WEATHER ~y~int [1;22]',
        func: function (): boolean {
            let weatherId = command.match(/\d+/);
            if (weatherId && +weatherId[0] > 0 && +weatherId[0] < 23) {
                Weather.ForceNow(+weatherId[0]);
                return true;
            }
            return false;
        }
    },
    {   // Game speed
        name: 'SPEED ',
        template: 'SPEED ~y~float',
        func: function (): boolean {
            let speed = command.match(/[\d.-]+/);
            if (speed) {
                Clock.SetTimeScale(+speed[0]);
                return true;
            }
            return false;
        }
    },
    {   // Vehicle spawner
        name: 'CAR SPAWN',
        template: 'CAR SPAWN',
        func: function (): boolean {
            carIndex = subMenu(vehicles, carIndex);
            return true;
        },
        lastState: null
    },
    {   // Fix vehicle
        name: 'FIX',
        template: 'FIX ~y~current vehicle',
        func: function (): boolean {
            if (plc.isInAnyCar()) {
                plc.storeCarIsInNoSave().fix();
                return true;
            }
            return false;
        },
        lastState: null
    },
    {   // Put car back on wheels
        name: 'UNFLIP',
        template: 'UNFLIP ~y~current vehicle',
        func: function (): boolean {
            if (plc.isInAnyCar()) {
                let vehicle = plc.storeCarIsInNoSave();
                let pos = vehicle.getCoordinates();
                vehicle.setCoordinates(pos.x, pos.y, pos.z);
                return true;
            }
            return false;
        },
        lastState: null
    },
    {   // Car health
        name: 'CAR HEALTH ',
        template: 'CAR HEALTH ~y~int',
        func: function (): boolean {
            if (plc.isInAnyCar()) {
                let health = command.match(/[\d-]+/);
                if (health) {
                    plc.storeCarIsInNoSave().setHealth(+health[0]);
                    return true;
                }
            }
            return false;
        }
    },
    {   // Bulletproof car
        name: 'CAR BULLETPROOF ',
        template: 'CAR BULLETPROOF ~y~bool',
        func: function (): boolean { return switchProofsBit(false, Proofs.Bullet); }
    },
    {   // Fireproof car
        name: 'CAR FIREPROOF ',
        template: 'CAR FIREPROOF ~y~bool',
        func: function (): boolean { return switchProofsBit(false, Proofs.Fire); }
    },
    {   // Explosionproof car
        name: 'CAR EXPLOSIONPROOF ',
        template: 'CAR EXPLOSIONPROOF ~y~bool',
        func: function (): boolean { return switchProofsBit(false, Proofs.Explosion); }
    },
    {   // Collisionproof car
        name: 'CAR COLLISIONPROOF ',
        template: 'CAR COLLISIONPROOF ~y~bool',
        func: function (): boolean { return switchProofsBit(false, Proofs.Collision); }
    },
    {   // Meleeproof car
        name: 'CAR MELEEPROOF ',
        template: 'CAR MELEEPROOF ~y~bool',
        func: function (): boolean { return switchProofsBit(false, Proofs.Melee); }
    },
    {   // Bulletproof tyres
        name: 'TYRES BULLETPROOF ',
        template: 'TYRES BULLETPROOF ~y~bool',
        func: function (): boolean {
            if (plc.isInAnyCar()) {
                let flag = command.match(/[01]/);
                if (flag) {
                    plc.storeCarIsInNoSave().setCanBurstTires(+flag[0] === 0);
                    return true;
                }
            }
            return false;
        }
    },
    {   // Bulletproof petrol tank
        name: 'PETROL TANK BULLETPROOF ',
        template: 'PETROL TANK BULLETPROOF ~y~bool',
        func: function (): boolean {
            if (plc.isInAnyCar()) {
                let flag = command.match(/[01]/);
                if (flag) {
                    plc.storeCarIsInNoSave().setPetrolTankWeakpoint(+flag[0] === 0);
                    return true;
                }
            }
            return false;
        }
    },
    {   // Heavy car
        name: 'CAR HEAVY ',
        template: 'CAR HEAVY ~y~bool',
        func: function (): boolean {
            if (plc.isInAnyCar()) {
                let flag = command.match(/[01]/);
                if (flag) {
                    plc.storeCarIsInNoSave().setHeavy(+flag[0] === 1);
                    return true;
                }
            }
            return false;
        }
    },
    {   // Car hydraulics
        name: 'CAR HYDRAULICS ',
        template: `CAR HYDRAULICS ~y~bool`,
        func: function (): boolean {
            if (plc.isInAnyCar()) {
                let vehicle = plc.storeCarIsInNoSave();
                let flag = command.match(/[01]/);
                if (flag) {
                    vehicle.setHydraulics(+flag[0] === 1);
                    return true;
                }
            }
            return false;
        }
    },
    {   // Heli winch
        name: 'HELI WINCH ',
        template: `HELI WINCH ~y~bool`,
        func: function (): boolean {
            if (plc.isInAnyHeli()) {
                let vehicle = new Heli(+plc.storeCarIsInNoSave());
                let flag = command.match(/[01]/);
                if (flag) {
                    vehicle.attachWinch(+flag[0] === 1);
                    return true;
                }
            }
            return false;
        }
    },
    {   // Clear area
        name: 'CLEAR AREA ',
        template: 'CLEAR AREA ~y~radius: float',
        func: function (): boolean {
            let radius = command.match(/[\d.]+/);
            if (radius) {
                let pos = plc.getCoordinates();
                World.ClearArea(pos.x, pos.y, pos.z, +radius[0], true);
                return true;
            }
            return false;
        }
    },
    {   // Pedestrians density
        name: 'PED DENSITY ',
        template: 'PED DENSITY ~y~float',
        func: function (): boolean {
            let density = command.match(/[\d.]+/);
            if (density) {
                World.SetPedDensityMultiplier(+density[0]);
                return true;
            }
            return false;
        }
    },
    {   // Car density
        name: 'CAR DENSITY ',
        template: 'CAR DENSITY ~y~float',
        func: function (): boolean {
            let density = command.match(/[\d.]+/);
            if (density) {
                World.SetCarDensityMultiplier(+density[0]);
                return true;
            }
            return false;
        }
    },
    {   // Burglary houses
        name: 'BURLGARY HOUSES ',
        template: 'BURLGARY HOUSES ~y~bool',
        func: function (): boolean {
            let flag = command.match(/[01]/);
            if (flag) {
                Game.EnableBurglaryHouses(+flag[0] === 1);
                return true;
            }
            return false;
        }
    },
    {   // Aircraft carrier defence
        name: 'AIRCRAFT CARRIER DEFENCE ',
        template: 'AIRCRAFT CARRIER DEFENCE ~y~bool',
        func: function (): boolean {
            let flag = command.match(/[01]/);
            if (flag) {
                Game.SetAircraftCarrierSamSite(+flag[0] === 1);
                return true;
            }
            return false;
        }
    },
    {   // Military base defence
        name: 'MILITARY BASE DEFENCE ',
        template: 'MILITARY BASE DEFENCE ~y~bool',
        func: function (): boolean {
            let flag = command.match(/[01]/);
            if (flag) {
                Game.SetArea51SamSite(+flag[0] === 1);
                return true;
            }
            return false;
        }
    },
    {   // Disable military zones
        name: 'DISABLE MILITARY ZONES WANTED LEVEL ',
        template: 'DISABLE MILITARY ZONES WANTED LEVEL ~y~bool',
        func: function (): boolean {
            let flag = command.match(/[01]/);
            if (flag) {
                Zone.SetDisableMilitaryZones(+flag[0] === 1);
                return true;
            }
            return false;
        }
    },
    {   // Gang war
        name: 'GANG WAR ',
        template: 'GANG WAR ~y~bool',
        func: function (): boolean {
            let flag = command.match(/[01]/);
            if (flag) {
                Game.SetGangWarsActive(+flag[0] === 1);
                return true;
            }
            return false;
        }
    },
    {   // Death penalties
        name: 'DEATH PENALTIES ',
        template: 'DEATH PENALTIES ~y~bool',
        func: function (): boolean {
            let flag = command.match(/[01]/);
            if (flag) {
                Game.SwitchDeathPenalties(+flag[0] === 1);
                return true;
            }
            return false;
        }
    },
    {   // Arrest penalties
        name: 'ARREST PENALTIES ',
        template: 'ARREST PENALTIES ~y~bool',
        func: function (): boolean {
            let flag = command.match(/[01]/);
            if (flag) {
                Game.SwitchArrestPenalties(+flag[0] === 1);
                return true;
            }
            return false;
        }
    },
    {   // Free respray
        name: 'FREE RESPRAY ',
        template: 'FREE RESPRAY ~y~bool',
        func: function (): boolean {
            let flag = command.match(/[01]/);
            if (flag) {
                Game.SetFreeResprays(+flag[0] === 1);
                return true;
            }
            return false;
        }
    },
    {   // Disable respray
        name: 'DISABLE RESPRAY ',
        template: 'DISABLE RESPRAY ~y~bool',
        func: function (): boolean {
            let flag = command.match(/[01]/);
            if (flag) {
                Game.SetNoResprays(+flag[0] === 1);
                return true;
            }
            return false;
        }
    },
    {   // Colour overlay
        name: 'OVERLAY ',
        template: 'OVERLAY ~r~~n~red ~g~green ~b~blue~y~: int[3] [0;255]~n~alpha: int [0;240] (0 - disable)',
        func: function (): boolean {
            let colour = command.match(/[\d]+/g);
            if (colour && colour.length === 4) {
                overlay.red = +colour[0];
                overlay.green = +colour[1];
                overlay.blue = +colour[2];
                overlay.alpha = +colour[3];

                for (let col in overlay) {
                    let max = col !== 'alpha' ? 255 : 240;
                    overlay[col] = overlay[col] > max
                        ? max
                        : overlay[col] < 0
                            ? 0
                            : overlay[col];
                }
                return true;
            } else if (command.trimEnd() === 'OVERLAY') {
                overlay.red = Math.floor(Math.random() * 256);
                overlay.green = Math.floor(Math.random() * 256);
                overlay.blue = Math.floor(Math.random() * 256);
                overlay.alpha = Math.floor(Math.random() * 201);
                command = `OVERLAY ${
                    overlay.red
                } ${
                    overlay.green
                } ${
                    overlay.blue
                } ${
                    overlay.alpha
                }`;
                output = command;
                return true;
            }
            return false;
        }
    }
];

fillDevelopersFile();

while (true) {
    wait(0);

    if (!plr.isPlaying()) continue;
    if (!toggle) {
        setProofs();
        drawOverlay();
    }

    // Toggle the console: ~ (`)
    if (Pad.IsKeyPressed(KeyCode.Oem3)) {
        Memory.WriteU8(lastChar, 0, false);
        toggle = !toggle;

        if (toggle) {
            Text.PrintBigString('Console by ~y~Vital', 2000, TextStyle.MiddleSmaller);
            plr.setControl(false);
            updateOutputString();
        } else {
            Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundAmmunationBuyWeaponDenied);            
            Text.ClearHelp();
            FxtStore.delete('CONSOLE');
            // This crap turns all immunities off. Thanks to wmysterio for noticing it.
            plr.setControl(true);
        }

        while (Pad.IsKeyPressed(KeyCode.Oem3)) {
            if (toggle) drawConsole(); else drawOverlay();
            wait(0);
        }
    }

    // Main loop
    if (!toggle) continue;
    if (plr.isControlOn()) plr.setControl(false);

    Memory.WriteU16(0xB73472, 0, false); // Disable changing camera view
    drawConsole();

    // Update the command string on input
    if (Memory.ReadU8(lastChar, false) !== 0) {
        getInput();
    }

    // Process NumPad buttons
    for (let button of numPadButtons) {
        processActionButton(button.id, function () {
            if (command.length < 50) {
                command = command.substring(0, cursorPos)
                    + button.char
                    + command.substring(cursorPos);
                output = command;
                cursorPos++;
                clampCursor();
                updateOutputString();
                Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundAmmunationGunCollision);
            }
        }, { func: drawConsole });
    }

    // Insert current command's template if it's found
    processActionButton(KeyCode.Tab, function () {
        command = command.substring(0, cursorPos).trim();
        autocompletion();
    }, { func: drawConsole });

    // Run the command
    processActionButton(KeyCode.Return, function () {
        runCommand();
    }, { func: drawConsole });

    // Delete the character to the left of the cursor
    processActionButton(KeyCode.Back, function () {
        deletePreviousChar();
    }, { timer: 100, func: drawConsole });

    // Delete the character to the right of the cursor
    processActionButton(KeyCode.Delete, function () {
        deleteNextChar();
    }, { timer: 100, func: drawConsole });

    // Clear the whole input
    processActionButton(KeyCode.LeftControl, function () {
        Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundRouletteRemoveCash);
        cursorPos = 0;
        command = '';
        output = '';
        updateOutputString();
    }, { func:drawConsole });

    // Select previous command
    processActionButton(KeyCode.Down, function () {
        clampMenuIndex(-1);
    }, { timer: 250, func: drawConsole });

    // Select next command
    processActionButton(KeyCode.Up, function () {
        clampMenuIndex(1);
    }, { timer: 250, func: drawConsole });

    // Move the cursor left
    processActionButton(KeyCode.Left, function () {
        if (cursorPos > 0) {
            Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundRestaurantTrayCollision);
            clampCursor(-1);
        }
    }, { timer: 100, func: drawConsole });

    // Move the cursor right
    processActionButton(KeyCode.Right, function () {
        if (cursorPos < command.length) {
            Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundRestaurantTrayCollision);
            clampCursor(1);
        }
    }, { timer: 100, func: drawConsole });

    // Put the cursor at the beginning of the input
    processActionButton(KeyCode.Home, function () {
        if (cursorPos > 0) {
            Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundCheckpointAmber);
            cursorPos = 0;
        }
        updateOutputString();
    }, { func:drawConsole });

    // Put the cursor at the end of the input
    processActionButton(KeyCode.End, function () {
        if (cursorPos < command.length) {
            Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundCheckpointGreen);
            cursorPos = command.length;
        }
        updateOutputString();
    }, { func:drawConsole });

    // Restore last command
    processActionButton(KeyCode.Insert, function () {
        if (lastCmd && command !== lastCmd) {
            Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundCheckpointRed);
            cursorPos = lastCmd.length;
            command = lastCmd;
            output = command;
        }
        updateOutputString();
    }, { func:drawConsole });
}


function fillDevelopersFile() {
    let forDevs: File = File.Open('CLEO/Console[mem][fs]/ForDevelopers.txt', FileMode.WriteText);

    forDevs.writeString('--- Commands ---\n')
    cmdList.forEach((c, i) => {
        forDevs.writeString(`${(i + 1).toString().padStart(2, '0')}. ${c.template}\n`);
    });

    forDevs.close();
}

function updateOutputString() {
    FxtStore.insert('CONSOLE', `~p~>~s~ ${
        output.substring(0, cursorPos)
        + cursor
        + output.substring(cursorPos)
    }~s~`);
    // Without this stupid ~s~ deleting the last character to the right doesn't update the output
}

function drawConsole() {
    if (!Text.IsThisHelpMessageBeingDisplayed('CONSOLE')) {
        Text.PrintHelpForever('CONSOLE');
    }
    drawOverlay();
}

function drawOverlay() {
    if (overlay.alpha > 0) {
        Text.UseCommands(true);
        Hud.DrawRect(
            320, 224, 640, 448,
            overlay.red, overlay.green, overlay.blue, overlay.alpha
        );
        Text.UseCommands(false);
    }
}

function processActionButton(button: KeyCode, func: Function, options?: {
    timer?: int,
    func?: Function
}) {
    if (Pad.IsKeyPressed(button)) {
        func();

        if (options.timer) {
            if (Pad.IsKeyPressed(KeyCode.Shift) && options.timer > 32) {
                options.timer = 32;
            }
            TIMERA = 0;

            while (TIMERA < options.timer && Pad.IsKeyPressed(button)) {
                wait(0);
                if (options.func) options.func();
            }
        } else {
            while (Pad.IsKeyPressed(button)) {
                wait(0);
                if (options.func) options.func();
            }
        }
    }
}

function subMenu(items: {
    name?: string,
    description?: string,
    func?: Function
}[], subMenuIndex?: int, name?: string): int {
    let i = subMenuIndex ? subMenuIndex : 0;

    const drawMenuItem = () => {
        if (name) {
            if (name.startsWith('#')) {
                Text.PrintBig(name.substring(1), 0, TextStyle.MiddleSmallerHigher);
            } else {
                Text.PrintBigString(name, 0, TextStyle.MiddleSmallerHigher);
            }
        }

        if (items[i].name) {
            if (items[i].name.startsWith('#')) {
                Text.PrintBig(items[i].name.substring(1), 0, TextStyle.MiddleSmaller);
            } else {
                Text.PrintBigString(items[i].name, 0, TextStyle.MiddleSmaller);
            }
        }

        if (items[i].description) {
            if (items[i].description.startsWith('#')) {
                Text.PrintNow(items[i].description.substring(1), 0, 1);
            } else {
                Text.PrintStringNow(items[i].description, 0);
            }
        }
    };

    while (plr.isPlaying() && Pad.IsKeyPressed(KeyCode.Return)) {
        drawMenuItem();
        wait(0);
    }

    Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundAmmunationBuyWeapon);

    while (plr.isPlaying()
        && !Pad.IsButtonPressed(PadId.Pad1, Button.Triangle)
        && exitSubMenu === false
    ) {
        drawMenuItem();

        processActionButton(KeyCode.Down, function () {
            i--;
            if (i < 0) {
                Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundPartMissionComplete);
                i = items.length - 1;
            } else {
                Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundRestaurantTrayCollision);
            }
        }, { timer: 200, func: drawMenuItem });

        processActionButton(KeyCode.Up, function () {
            i++;
            if (i >= items.length) {
                Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundPartMissionComplete);
                i = 0;
            } else {
                Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundRestaurantTrayCollision);
            }
        }, { timer: 200, func: drawMenuItem });

        processActionButton(KeyCode.Return, function () {
            if (items[i].func) {
                if (items[i].func()) {
                    Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundAmmunationBuyWeapon);
                } else {
                    Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundAmmunationBuyWeaponDenied);
                }
            }
        }, { func: drawMenuItem });

        wait(0);
    }

    Memory.WriteU8(lastChar, 0, false);
    exitSubMenu = false;
    return i;
}

function clampMenuIndex(change: int) {
    index += change;

    if (index >= cmdList.length) {
        Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundPartMissionComplete);
        index = 0;
    } else if (index < 0) {
        Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundPartMissionComplete);
        index = cmdList.length - 1;
    } else {
        Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundCeilingVentLand);
    }

    if (cmdList[index].lastState) {
        command = cmdList[index].lastState;
        output = command;
    } else {
        command = cmdList[index].name;
        output = cmdList[index].template;
    }
    cursorPos = command.length;
    updateOutputString();
}

function clampCursor(change?: int) {
    if (change) cursorPos += change;

    if (cursorPos > command.length) {
        cursorPos = command.length;
    } else if (cursorPos < 0) {
        cursorPos = 0;
    }

    updateOutputString();
}

function runCommand() {
    for (let cmd of cmdList) {
        if (command.startsWith(cmd.name.trimEnd())) {
            if (cmd.func()) {
                Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundAmmunationBuyWeapon);
                if (cmd.lastState !== null) cmd.lastState = command;
                lastCmd = cmd.lastState !== null ? command : cmd.name;
                updateOutputString();
            } else {
                Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundAmmunationBuyWeaponDenied);
                if (output !== cmd.template) Text.PrintStringNow(cmd.template, 3000);
            }
            index = cmdList.indexOf(cmd);
            return;
        }
    }
    Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundAmmunationBuyWeaponDenied);
    Text.PrintBigString('~r~~h~Command not found, try searching!', 2000, TextStyle.MiddleSmaller);
    command = 'SEARCH ' + command;
    output = command;
    cursorPos = output.length;
    updateOutputString();
}

function getInput() {
    if (command.length < 50) {
        command = command.substring(0, cursorPos)
            + String.fromCharCode(Memory.ReadU8(lastChar, false)).toUpperCase()
            + command.substring(cursorPos);

        output = command;
        cursorPos++;
        clampCursor();
        Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundAmmunationGunCollision);
    }
    Memory.WriteU8(lastChar, 0, false);
    updateOutputString();
}

function deletePreviousChar() {
    if (command.length === 0 || cursorPos === 0) return;

    command = command.substring(0, cursorPos - 1) + command.substring(cursorPos);
    output = command;
    cursorPos--;
    clampCursor();
    Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundBaseballBatHitPed);
    updateOutputString();
}

function deleteNextChar() {
    if (command.length === 0 || cursorPos >= command.length) return;

    command = command.substring(0, cursorPos) + command.substring(cursorPos + 1);
    output = command;
    clampCursor();
    Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundBaseballBatHitPed);
    updateOutputString();
}

function autocompletion() {
    let hits = cmdList.filter(c => c.name.startsWith(command));
    if (hits && hits.length === 1) {
        command = hits[0].name;
        cursorPos = hits[0].name.length;
        output = hits[0].template;
        index = cmdList.indexOf(hits[0]);
    } else if (!command.startsWith('SEARCH')) {
        command = 'SEARCH ' + command;
        cursorPos = command.length;
        output = command;
        runCommand();
    }
    updateOutputString();
}

function switchProofsBit(isOnFoot: boolean, bitmask: Proofs): boolean {
    let flag = command.match(/[01]/);
    if (flag) {
        if (isOnFoot) {
            playerProofs = +flag[0] === 1
                ? playerProofs |= bitmask
                : playerProofs &= ~bitmask;
        } else {
            carProofs = +flag[0] === 1
                ? carProofs |= bitmask
                : carProofs &= ~bitmask;
        }
        return true;
    }
    return false;
}

function setProofs() {
    Memory.WriteU8(plp + 0x42, playerProofs, false);
    if (plc.isInAnyCar()) {
        Memory.WriteU8(
            Memory.GetVehiclePointer(plc.storeCarIsInNoSave()) + 0x42,
            carProofs, false
        );
    }
}