//  Script by Vital (Vitaly Pavlovich Ulyanov)
import data from "../../data/vehicles.ide";
import { configsInfo } from "./configs";
import { AltMenu, Item } from "../altMenu[mem]";
import { Font, KeyCode, ScriptSound, RadioChannel, SwitchType, CarLock, Button, PadId, WeaponType, BodyPart, Align, TimerDirection } from '../sa_enums';

// Enumerations
enum Proofs {
    Bullet = 0b00000100,
    Fire = 0b00001000,
    Explosion = 0b10000000,
    Collision = 0b00010000,
    Melee = 0b00100000
}

// Constants
const plr: Player = new Player(0);
const plc: Char = plr.getChar();
const plp: int = Memory.GetPedPointer(plc);
const CPLAYER: int = 0xB7CD98;
const ON: string = '~g~~h~ON';
const OFF: string = '~r~~h~OFF';
const CHANGE_VALUE: string = 'Use ~y~~k~~GO_LEFT~~s~/~y~~k~~GO_RIGHT~ ~s~to change the value, hold ~y~~k~~PED_SPRINT~ ~s~to speed up.';
const MAX_LENGTH: int = 50;
const LAST_CHAR: int = 0x969110;
const CURSOR: string = '~>~~r~~h~~h~~h~';
const NUM_PAD_BUTTONS: { id: int, char: string }[]= [
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
let cursorPos: int = 0;
let command: string = '';
let cmdHistory: string[] = [];
let historyIndex: int = 0;
let output: string = '~s~Console by ~y~Vital~s~. Type ~g~~h~HELP ~s~for more information. Press ~y~Enter ~s~for list of commands.';
let playerProofs: int = 0; // Thanks to wmysterio for help with proofs resetting 'bug'
let carProofs: int = 0;
let overlay: { red: int, green: int, blue: int, alpha: int} = {
    red: 0, green: 0, blue: 0, alpha: 0
};
let allProofs = [Proofs.Bullet, Proofs.Fire, Proofs.Explosion, Proofs.Collision, Proofs.Melee];
let camOffset = {
    offsetX: 0, offsetY: 0, offsetZ: 0,
    rotationX: 0, rotationY: 0, rotationZ: 0
};
let sphereRadius: float = 2.0;

// Menus
let helpMenu: AltMenu = getHelpMenu();
let cheatsMenu: AltMenu = getCheatsMenu();
let configsMenu: AltMenu = getConfigsMenu();
let toolsMenu: AltMenu = getToolsMenu();
let appearanceMenu: AltMenu = getAppearanceMenu();
let carMenu: AltMenu = getCarMenu();
let carColMenu: AltMenu = getCarColMenu();
let weaponMenu: AltMenu = getWeaponMenu();
let weatherMenu: AltMenu = getWeatherMenu();
let playerImmunitiesMenu: AltMenu = getPlayerImmunitiesMenu();
let vehicleImmunitiesMenu: AltMenu = getVehicleImmunitiesMenu();
let playerStatsMenu: AltMenu = getPlayerStatsMenu();
let gangZoneMenu: AltMenu = getGangZoneMenu();

// List of commands
let cmdList: { name: string, template?: string, action: Function }[] = [
    {   // Help
        name: 'HELP',
        action: function (): boolean {
            wait(0);
            while (helpMenu.isDisplayed()) {
                wait(0);
            }
            clearInput();
            return true;
        }
    },
    {   // Cheats
        name: 'CHEATS',
        action: function (): boolean {
            wait(0);
            while (cheatsMenu.isDisplayed()) {
                wait(0);
            }
            clearInput();
            return true;
        }
    },
    {   // Configurations
        name: 'CONFIGURATIONS',
        action: function (): boolean {
            wait(0);
            while (configsMenu.isDisplayed()) {
                wait(0);
            }
            clearInput();
            return true;
        }
    },
    {   // Scripting tools
        name: 'SCRIPTING TOOLS',
        action: function (): boolean {
            wait(0);
            while (toolsMenu.isDisplayed()) {
                wait(0);
            }
            clearInput();
            return true;
        }
    },
    {   // Health
        name: 'HEALTH ',
        template: 'HEALTH ~y~int',
        action: function (): boolean {
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
        template: 'ARMOUR ~y~int 0-100',
        action: function (): boolean {
            let armour = command.match(/\d+/);
            if (armour && +armour[0] > -1 && +armour[0] < 101) {
                plc.addArmor(+armour[0] + plc.getArmor() * -1);
                return true;
            }
            return false;
        }
    },
    {   // Player's immunities
        name: 'PLAYER IMMUNITIES',
        action: function(): boolean {
            wait(0);
            while (playerImmunitiesMenu.isDisplayed()) {
                wait(0);
            }
            clearInput();
            return true;
        }
    },
    {   // God mode
        name: 'GOD ',
        template: 'GOD ~y~bool',
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                if (+state[0] === 1) {
                    allProofs.forEach(p => {
                        playerProofs |= p;
                        carProofs |= p;
                    });
                } else {
                    allProofs.forEach(p => {
                        playerProofs &= ~p;
                        carProofs &= ~p;
                    });
                }
                return true;
            }
            return false;
        }
    },
    {   // Never tired
        name: 'NEVER TIRED ',
        template: 'NEVER TIRED ~y~bool',
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                plr.setNeverGetsTired(+state[0] === 1);
                return true;
            }
            return false;
        }
    },
    {   // Don't fall from bikes
        name: 'STAY ON BIKE ',
        template: 'STAY ON BIKE ~y~bool',
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                plc.setCanBeKnockedOffBike(+state === 1);
                return true;
            }
            return false;
        }
    },
    {   // Appearance
        name: 'APPEARANCE',
        action: function (): boolean {
            if (plc.isInAnyCar()) return false;

            wait(0);
            while (appearanceMenu.isDisplayed()) {
                wait(0);
            }
            Camera.Restore();
            clearInput();
            return true;
        }
    },
    {   // Player statistics
        name: 'PLAYER STATISTICS',
        action: function (): boolean {
            wait(0);
            while (playerStatsMenu.isDisplayed()) {
                wait(0);
            }
            clearInput();
            return true;
        }
    },
    {   // Position
        name: 'POS ',
        template: 'POS ~y~float(3)',
        action: function (): boolean {
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
                output = command = `POS ${pos.x.toFixed(2)} ${pos.y.toFixed(2)} ${pos.z.toFixed(2)}`;
                return true;
            }
            return false;
        }
    },
    {   // Teleport to map waypoint
        name: 'TO MAP TARGET',
        action: function (): boolean {
            let waypoint = World.GetTargetCoords();
            if (waypoint) {
                Streaming.RequestCollision(waypoint.x, waypoint.y);
                Streaming.LoadScene(waypoint.x, waypoint.y, waypoint.z);
                plc.setCoordinates(waypoint.x, waypoint.y, -100);
                return true;
            } else {
                Text.PrintStringNow('~r~~h~Map target not found!', 2000);
            }
            return false;
        }
    },
    {   // Heading
        name: 'HEADING ',
        template: 'HEADING ~y~float 0-360',
        action: function (): boolean {
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
        template: 'INTERIOR ~y~int 0-18',
        action: function (): boolean {
            let interior = command.match(/\d+/);
            if (interior && +interior[0] > -1 && +interior[0] < 19) {
                Streaming.SetAreaVisible(+interior[0]);
                plc.setAreaVisible(+interior[0]);
                if (plc.isInAnyCar()) plc.storeCarIsInNoSave().setAreaVisible(+interior[0]);
                return true;
            }
            return false;
        }
    },
    {   // Wanted level
        name: 'WANTED ',
        template: 'WANTED ~y~int 0-6',
        action: function (): boolean {
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
        template: 'MAX WANTED ~y~int 0-6',
        action: function (): boolean {
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
        action: function (): boolean {
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
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                Game.SetPoliceIgnorePlayer(plr, +state[0] === 1);
                return true;
            }
            return false;
        }
    },
    {   // Ignored by pedestrians
        name: 'IGNORED BY PEDESTRIANS ',
        template: 'IGNORED BY PEDESTRIANS ~y~bool',
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                Game.SetEveryoneIgnorePlayer(plr, +state[0] === 1);
                return true;
            }
            return false;
        }
    },
    {   // Add money
        name: 'ADD MONEY ',
        template: 'ADD MONEY ~y~int',
        action: function (): boolean {
            let money = command.match(/[\d-]+/);
            if (money) {
                plr.addScore(+money[0]);
                return true;
            }
            return false;
        }
    },
    {   // Set money
        name: 'SET MONEY ',
        template: 'SET MONEY ~y~int',
        action: function (): boolean {
            let money = command.match(/[\d-]+/);
            if (money) {
                plr.addScore(+money[0] + plr.storeScore() * -1);
                return true;
            }
            return false;
        }
    },
    {   // Weapon
        name: 'WEAPON',
        action: function (): boolean {
            wait(0);
            Camera.AttachToChar(plc, 1.45, 2.05, 0.8, 0, 0, 0, 0, SwitchType.JumpCut);
            while (weaponMenu.isDisplayed()) {
                wait(0);
            }
            Camera.Restore();
            clearInput();
            return true;
        }
    },
    {   // Ammo for current weapon
        name: 'AMMO ',
        template: 'AMMO ~y~int',
        action: function(): boolean {
            let ammo = command.match(/[\d-]+/);
            if (ammo) {
                let weapon = plc.getCurrentWeapon();
                plc.setAmmo(weapon, +ammo[0]);
                return true;
            }
            return false;
        }
    },
    {   // Remove current weapon
        name: 'REMOVE CURRENT WEAPON',
        action: function (): boolean {
            if (!plc.isCurrentWeapon(WeaponType.Unarmed)) {
                plc.removeWeapon(plc.getCurrentWeapon());
                return true;
            }
            return false;
        }
    },
    {   // Jetpack
        name: 'JETPACK',
        action: function (): boolean {
            if (!plc.isInAnyCar() && !plr.isUsingJetpack()) {
                Task.Jetpack(plc);
                return true;
            }
            return false;
        }
    },
    {   // Time of day
        name: 'TIME ',
        template: 'TIME ~y~hours: int 0-23 minutes: int 0-59',
        action: function (): boolean {
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
        name: 'WEATHER',
        action: function (): boolean {
            wait(0);
            while (weatherMenu.isDisplayed()) {
                wait(0);
            }
            clearInput();
            return false;
        }
    },
    {   // Gravity
        name: 'GRAVITY ',
        template: 'GRAVITY ~y~float',
        action: function(): boolean {
            let gravity = command.match(/[\d.-]+/);
            if (gravity) {
                Memory.WriteFloat(0x863984, +gravity[0], false);
                return true;
            }
            output = command = 'GRAVITY 0.008';
            return false;
        }
    },
    {   // Game speed
        name: 'SPEED ',
        template: 'SPEED ~y~float',
        action: function (): boolean {
            let speed = command.match(/[\d.-]+/);
            if (speed) {
                Clock.SetTimeScale(+speed[0]);
                return true;
            }
            return false;
        }
    },
    {   // Vehicle spawner
        name: 'SPAWN CAR',
        action: function (): boolean {
            wait(0);
            while (carMenu.isDisplayed()) {
                wait(0);
            }
            Camera.Restore();
            clearInput();
            return true;
        }
    },
    {   // Vehicle's colours
        name: 'CAR COLOUR',
        action: function (): boolean {
            if (!plc.isInAnyCar()) return false;

            wait(0);
            while (carColMenu.isDisplayed()) {
                wait(0);
            }
            clearInput();
            return true;
        }
    },
    {   // Fix vehicle
        name: 'FIX CAR',
        action: function (): boolean {
            if (plc.isInAnyCar()) {
                plc.storeCarIsInNoSave().fix();
                return true;
            }
            return false;
        }
    },
    {   // Put car back on wheels
        name: 'UNFLIP CAR',
        action: function (): boolean {
            if (plc.isInAnyCar()) {
                let vehicle = plc.storeCarIsInNoSave();
                let pos = vehicle.getCoordinates();
                vehicle.setCoordinates(pos.x, pos.y, pos.z);
                return true;
            }
            return false;
        }
    },
    {   // Vehicle's health
        name: 'CAR HEALTH ',
        template: 'CAR HEALTH ~y~int',
        action: function (): boolean {
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
    {   // Vehicle's immunities
        name: 'CAR IMMUNITIES',
        action: function(): boolean {
            wait(0);
            while (vehicleImmunitiesMenu.isDisplayed()) {
                wait(0);
            }
            clearInput();
            return true;
        }
    },
    {   // Bulletproof tyres
        name: 'TYRES BULLETPROOF ',
        template: 'TYRES BULLETPROOF ~y~bool',
        action: function (): boolean {
            if (plc.isInAnyCar()) {
                let state = command.match(/[01]/);
                if (state) {
                    plc.storeCarIsInNoSave().setCanBurstTires(+state[0] === 0);
                    return true;
                }
            }
            return false;
        }
    },
    {   // Bulletproof petrol tank
        name: 'PETROL TANK BULLETPROOF ',
        template: 'PETROL TANK BULLETPROOF ~y~bool',
        action: function (): boolean {
            if (plc.isInAnyCar()) {
                let state = command.match(/[01]/);
                if (state) {
                    plc.storeCarIsInNoSave().setPetrolTankWeakpoint(+state[0] === 0);
                    return true;
                }
            }
            return false;
        }
    },
    {   // Heavy car
        name: 'CAR HEAVY ',
        template: 'CAR HEAVY ~y~bool',
        action: function (): boolean {
            if (plc.isInAnyCar()) {
                let state = command.match(/[01]/);
                if (state) {
                    plc.storeCarIsInNoSave().setHeavy(+state[0] === 1);
                    return true;
                }
            }
            return false;
        }
    },
    {   // Car hydraulics
        name: 'CAR HYDRAULICS ',
        template: `CAR HYDRAULICS ~y~bool`,
        action: function (): boolean {
            if (plc.isInAnyCar()) {
                let vehicle = plc.storeCarIsInNoSave();
                let state = command.match(/[01]/);
                if (state) {
                    vehicle.setHydraulics(+state[0] === 1);
                    return true;
                }
            }
            return false;
        }
    },
    {   // Heli winch
        name: 'HELI WINCH ',
        template: `HELI WINCH ~y~bool`,
        action: function (): boolean {
            if (plc.isInAnyHeli()) {
                let vehicle = new Heli(+plc.storeCarIsInNoSave());
                let state = command.match(/[01]/);
                if (state) {
                    vehicle.attachWinch(+state[0] === 1);
                    return true;
                }
            }
            return false;
        }
    },
    {   // Clear area
        name: 'CLEAR AREA ',
        template: 'CLEAR AREA ~y~radius: float',
        action: function (): boolean {
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
        action: function (): boolean {
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
        action: function (): boolean {
            let density = command.match(/[\d.]+/);
            if (density) {
                World.SetCarDensityMultiplier(+density[0]);
                return true;
            }
            return false;
        }
    },
    {   // Burglary houses
        name: 'BURGLARY HOUSES ',
        template: 'BURGLARY HOUSES ~y~bool',
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                Game.EnableBurglaryHouses(+state[0] === 1);
                return true;
            }
            return false;
        }
    },
    {   // Aircraft carrier defence
        name: 'AIRCRAFT CARRIER DEFENCE ',
        template: 'AIRCRAFT CARRIER DEFENCE ~y~bool',
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                Game.SetAircraftCarrierSamSite(+state[0] === 1);
                return true;
            }
            return false;
        }
    },
    {   // Military base defence
        name: 'MILITARY BASE DEFENCE ',
        template: 'MILITARY BASE DEFENCE ~y~bool',
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                Game.SetArea51SamSite(+state[0] === 1);
                return true;
            }
            return false;
        }
    },
    {   // Disable military zones
        name: 'DISABLE MILITARY ZONES WANTED LEVEL ',
        template: 'DISABLE MILITARY ZONES WANTED LEVEL ~y~bool',
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                Zone.SetDisableMilitaryZones(+state[0] === 1);
                return true;
            }
            return false;
        }
    },
    {   // Gang war
        name: 'GANG WAR ',
        template: 'GANG WAR ~y~bool',
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                Game.SetGangWarsActive(+state[0] === 1);
                return true;
            }
            return false;
        }
    },
    {   // Gang zone
        name: 'GANG ZONE',
        action: function (): boolean {
            wait(0);
            while (gangZoneMenu.isDisplayed()) {
                wait(0);
            }
            clearInput();
            return true;
        }
    },
    {   // Death penalties
        name: 'DEATH PENALTIES ',
        template: 'DEATH PENALTIES ~y~bool',
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                Game.SwitchDeathPenalties(+state[0] === 1);
                return true;
            }
            return false;
        }
    },
    {   // Arrest penalties
        name: 'ARREST PENALTIES ',
        template: 'ARREST PENALTIES ~y~bool',
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                Game.SwitchArrestPenalties(+state[0] === 1);
                return true;
            }
            return false;
        }
    },
    {   // Free respray
        name: 'FREE RESPRAY ',
        template: 'FREE RESPRAY ~y~bool',
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                Game.SetFreeResprays(+state[0] === 1);
                return true;
            }
            return false;
        }
    },
    {   // Disable respray
        name: 'DISABLE RESPRAY ',
        template: 'DISABLE RESPRAY ~y~bool',
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                Game.SetNoResprays(+state[0] === 1);
                return true;
            }
            return false;
        }
    },
    {   // Colour overlay
        name: 'OVERLAY ',
        template: 'OVERLAY ~y~red green blue: int(3) 0-255 alpha: int 0-240',
        action: function (): boolean {
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
                output = command = `OVERLAY ${
                    overlay.red
                } ${
                    overlay.green
                } ${
                    overlay.blue
                } ${
                    overlay.alpha
                }`;
                return true;
            }
            return false;
        }
    }
];

while (true) {
    wait(0);

    if (!plr.isPlaying()) continue;
    if (Pad.IsKeyPressed(KeyCode.Oem3)) { // ~ (`)
        toggle = !toggle;
        plr.setControl(!toggle);
        clearInput();

        while (Pad.IsKeyPressed(KeyCode.Oem3)) {
            if (toggle) drawConsole(); else drawOverlay();
            wait(0);
        }
    }
    // Execute always
    setProofs();
    drawOverlay();

    // Execute only with open console
    if (!toggle) continue;
    processInputControls();
    getInput();
    lockPlayer();
    drawConsole();
}

function processInputControls() {
    // Home [move cursor to start]
    if (Pad.IsKeyPressed(KeyCode.Home) && cursorPos !== 0) {
        Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundPartMissionComplete);
        cursorPos = 0;
        return;
    }

    // End [move cursor to end]
    if (Pad.IsKeyPressed(KeyCode.End) && cursorPos !== command.length) {
        Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundPartMissionComplete);
        cursorPos = command.length;
        return;
    }

    // Right [move cursor left]
    if (Pad.IsKeyPressed(KeyCode.Right)
        && cursorPos < command.length
        && TIMERA > (Pad.IsKeyPressed(KeyCode.Shift) ? 19 : 119)
    ) {
        Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundRestaurantTrayCollision);
        moveCursor(1);
        TIMERA = 0;
        return;
    }

    // Left [move cursor right]
    if (Pad.IsKeyPressed(KeyCode.Left)
        && cursorPos > 0
        && TIMERA > (Pad.IsKeyPressed(KeyCode.Shift) ? 19 : 119)
    ) {
        Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundRestaurantTrayCollision);
        moveCursor(-1);
        TIMERA = 0;
        return;
    }

    // Up [previous command from history]
    if (Pad.IsKeyPressed(KeyCode.Up)
        && cmdHistory.length > 0
        && TIMERA > 199
    ) {
        if (command !== '') {
            historyIndex = ringClamp(0, historyIndex - 1, cmdHistory.length - 1);
        }
        Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundPedCollapse);
        command = cmdHistory[historyIndex];
        output = `${command} ~s~(${historyIndex + 1}/${cmdHistory.length})`;
        cursorPos = cmdHistory[historyIndex].length;
        TIMERA = 0;
    }

    // Down [next command from history]
    if (Pad.IsKeyPressed(KeyCode.Down)
        && cmdHistory.length > 0
        && TIMERA > 199
    ) {
        if (command !== '') {
            historyIndex = ringClamp(0, historyIndex + 1, cmdHistory.length - 1);
        }
        Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundPedCollapse);
        command = cmdHistory[historyIndex];
        output = `${command} ~s~(${historyIndex + 1}/${cmdHistory.length})`;
        cursorPos = cmdHistory[historyIndex].length;
        TIMERA = 0;
    }

    // Left Control [clear the console]
    if (Pad.IsKeyPressed(KeyCode.LeftControl) && command.length !== 0) {
        Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundShopBuyDenied);
        command = output = '';
        cursorPos = 0;
        return;
    }

    // Backspace [delete previous character]
    if (Pad.IsKeyPressed(KeyCode.Back)
        && command.length > 0
        && cursorPos > 0
        && TIMERA > (Pad.IsKeyPressed(KeyCode.Shift) ? 29 : 119)
    ) {
        Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundBaseballBatHitPed);
        output = command = command.substring(0, cursorPos - 1)
            + command.substring(cursorPos);
        moveCursor(-1);
        TIMERA = 0;        
    }

    // Delete [delete next character]
    if (Pad.IsKeyPressed(KeyCode.Delete)
        && command.length > 0
        && cursorPos < command.length
        && TIMERA > (Pad.IsKeyPressed(KeyCode.Shift) ? 29 : 119)
    ) {
        Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundBaseballBatHitPed);
        output = command = command.substring(0, cursorPos)
            + command.substring(cursorPos + 1);
        TIMERA = 0;
    }

    // Enter [run command]
    if (Pad.IsKeyPressed(KeyCode.Return)) {
        while (Pad.IsKeyPressed(KeyCode.Return)) {
            drawConsole();
            drawOverlay();
            wait(0);
        }
        // If the command is not found, start search
        if (!runCommand()) searchCommands();
    }

    // Tab [autocompletion]
    if (Pad.IsKeyPressed(KeyCode.Tab)) {
        while (Pad.IsKeyPressed(KeyCode.Tab)) {
            drawConsole();
            drawOverlay();
            wait(0);
        }

        let results = cmdList.filter(
            c => c.name.startsWith(command.substring(0, cursorPos))
        );
        if (results && results.length === 1) {
            command = results[0].name;
            cursorPos = results[0].name.length;
            output = results[0]?.template ?? results[0].name;
        } else {
            searchCommands();
        }
    }

    // NumPad buttons
    for (const button of NUM_PAD_BUTTONS) {
        if (Pad.IsKeyPressed(button.id)) {
            addCharacter(button.char);

            while (Pad.IsKeyPressed(button.id)) {
                drawConsole();
                drawOverlay();
                wait(0);
            }
        }
    }
}

function getInput() {
    let input = Memory.ReadU8(LAST_CHAR, false);
    if (input === 0) return;
    else if (command.length >= MAX_LENGTH) {
        clearInput();
        return;
    }
    addCharacter(String.fromCharCode(input));
}

function clearInput() {
    Memory.WriteU8(LAST_CHAR, 0, false);
}

function moveCursor(distance: int) {
    cursorPos = clamp(0, cursorPos + distance, command.length);
}

function addCharacter(char: string) {
    if (command.length >= MAX_LENGTH) return;
    output = command = command.substring(0, cursorPos)
        + char.toUpperCase()
        + command.substring(cursorPos);
    moveCursor(1);
    clearInput();
    Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundAmmunationGunCollision);
}

function lockPlayer() {
    plr.setControl(false);
    Memory.WriteU16(0xB73472, 0, false); // Disable changing camera view
}

function searchCommands() {
    Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundRouletteNoCash);
    let results = cmdList.filter(
        c => c.name.includes(command)
    ).map(
        c => ({
            name: c.name.trimEnd(),
            description: c?.template,
            click: function () {
                if (c.template) {
                    // Command has parameters
                    command = c.name;
                    output = c?.template ?? c.name;
                    cursorPos = c.name.length;
                } else {
                    // Command does not have parameters
                    runCommand(c.name);
                }
            }
        })
    );

    if (results.length === 0) {
        Text.PrintStringNow('~r~~h~Nothing found!', 3000);
        return;
    }

    let search = new AltMenu('Console search', results, {
        showCounter: true
    });
    output = command = '';
    while (search.isDisplayed() && command.length === 0) {
        wait(0);
    }
    clearInput();
}

function runCommand(input: string = command): boolean {
    let oldCmd = command;

    for (const cmd of cmdList) {
        if (input.startsWith(cmd.name.trimEnd())) {
            // Set command equal to input if running externally
            command = input;
            // Run command's action
            if (cmd.action()) {
                // Valid input
                Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundShopBuy);

                // Add new command to history (max 10 unique commands)
                if (!cmdHistory.includes(command.trimEnd())) {
                    if (cmdHistory.length > 9) cmdHistory.splice(0, 1);
                    cmdHistory.push(cmd.name.endsWith(' ') ? command : cmd.name);
                    historyIndex = 0; // Reset commands' history index
                }
            } else {
                // Invalid input
                Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundShopBuyDenied);
            }
            // Revert command if running externally
            if (input !== oldCmd) command = oldCmd;
            return true;
        }
    }
    return false;
}

function drawConsole() {
    FxtStore.insert('CONSOLE', `${
        output.substring(0, cursorPos)
        + CURSOR
        + output.substring(cursorPos)
    }~s~`, true);

    Text.UseCommands(true);
    Text.SetFont(Font.Menu);
    Text.SetColor(190, 255, 190, 255);
    Text.SetDropshadow(1, 0, 0, 0, 255);
    Text.SetScale(0.3, 1.8);
    Text.SetWrapX(640);
    Hud.DrawRect(320, 436, 641, 24, 0, 0, 0, 200);
    Text.Display(12, 428, 'CONSOLE');
    Text.UseCommands(false);
}

function drawOverlay() {
    if (overlay.alpha > 0) {
        Text.UseCommands(true);
        Hud.DrawRect(
            320, 224, 641, 449,
            overlay.red, overlay.green, overlay.blue, overlay.alpha
        );
        Text.UseCommands(false);
    }
}

function clamp(min: number, value: number, max: number): number {
    return value < min
        ? min
        : value > max
            ? max
            : value;
}

function ringClamp(min: number, value: number, max: number): number {
    return value < min
        ? max
        : value > max
            ? min
            : value;
}

function setProofs() {
    if (playerProofs !== 0) {
        Memory.WriteU8(plp + 0x42, playerProofs, false);
    }
    if (plc.isInAnyCar() && carProofs !== 0) {
        Memory.WriteU8(
            Memory.GetVehiclePointer(plc.storeCarIsInNoSave()) + 0x42,
            carProofs, false
        );
    }
}

function getLeftRight(): number {
    let offset = Pad.GetPositionOfAnalogueSticks(0).leftStickX;
    if (offset === 0) return 0;
    if (TIMERA > (Pad.IsButtonPressed(PadId.Pad1, Button.Cross) ? 0 : 199)) {
        TIMERA = 0;
        return offset > 0 ? 1 : -1;
    }
    return 0;
}

function isBitSet(variable: number, mask: number): boolean {
    return (variable & mask) !== 0;
}

// Scripting tools
function camOffsetMenu(): AltMenu {
    function camOffsetString(): string {
        return `~y~Offset~s~: ${
            camOffset.offsetX.toFixed(2)
        } ${
            camOffset.offsetY.toFixed(2)
        } ${
            camOffset.offsetZ.toFixed(2)
        }~n~~y~Rotation~s~: ${
            camOffset.rotationX.toFixed(2)
        } ${
            camOffset.rotationY.toFixed(2)
        } ${
            camOffset.rotationZ.toFixed(2)
        }`;
    }

    let menu: AltMenu = new AltMenu(
        'Camera offset', [
            {   // Help
                name: 'Help',
                description: CHANGE_VALUE
            },
            {   // Offset X
                name: 'Offset ~y~X',
                description: camOffsetString,
                display: function () {
                    let change = getLeftRight();
                    if (change === 0) return;
                    camOffset.offsetX += change * 0.02;
                    applyCamOffset();
                }
            },
            {   // Offset Y
                name: 'Offset ~y~Y',
                description: camOffsetString,
                display: function () {
                    let change = getLeftRight();
                    if (change === 0) return;
                    camOffset.offsetY += change * 0.02;
                    applyCamOffset();
                }
            },
            {   // Offset Z
                name: 'Offset ~y~Z',
                description: camOffsetString,
                display: function () {
                    let change = getLeftRight();
                    if (change === 0) return;
                    camOffset.offsetZ += change * 0.02;
                    applyCamOffset();
                }
            },
            {   // Rotation X
                name: 'Rotation ~y~X',
                description: camOffsetString,
                display: function () {
                    let change = getLeftRight();
                    if (change === 0) return;
                    camOffset.rotationX += change * 0.02;
                    applyCamOffset();
                }
            },
            {   // Rotation Y
                name: 'Rotation ~y~Y',
                description: camOffsetString,
                display: function () {
                    let change = getLeftRight();
                    if (change === 0) return;
                    camOffset.rotationY += change * 0.02;
                    applyCamOffset();
                }
            },
            {   // Rotation Z
                name: 'Rotation ~y~Z',
                description: camOffsetString,
                display: function () {
                    let change = getLeftRight();
                    if (change === 0) return;
                    camOffset.rotationZ += change * 0.02;
                    applyCamOffset();
                }
            }
        ], {
            addHelp: false
        }
    );

    return menu;
}

function applyCamOffset() {
    Camera.AttachToChar(
        plc,
        camOffset.offsetX, camOffset.offsetY, camOffset.offsetZ,
        camOffset.rotationX, camOffset.rotationY, camOffset.rotationZ,
        0, SwitchType.JumpCut
    );
}

// Create menus
function getToolsMenu(): AltMenu {
    let offsetMenu: AltMenu = camOffsetMenu();

    let menu: AltMenu = new AltMenu(
        'Scripting tools', [
            {   // Camera offset
                name: 'Camera offset',
                description: 'Calculate offsets for ~y~Camera.AttachToChar~s~ command',
                click: function () {
                    wait(0);
                    applyCamOffset();
                    while (offsetMenu.isDisplayed()) {
                        wait(0);
                    }
                    Camera.Restore();
                }
            },
            {   // Sphere radius
                name: 'Sphere radius',
                description: function () {
                    return `~y~Radius~s~: ${sphereRadius.toFixed(1)}.~n~${CHANGE_VALUE}`;
                },
                display: function () {
                    let change = getLeftRight();
                    if (!Pad.IsButtonPressed(PadId.Pad1, Button.LeftStickX)) {
                        let pos = plc.getCoordinates();
                        Sphere.Draw(pos.x, pos.y, pos.z, sphereRadius);
                        return;
                    } else {
                        sphereRadius = clamp(0.5, sphereRadius + change * 0.1, 100);
                    }
                }
            },
        ], {
            selectedBackgroundColour: [200, 250, 255, 90],
            showCounter: true,
            titleColour: [200, 250, 255, 230]
        }
    );

    return menu;
}

function getHelpMenu(): AltMenu {
    let menu: AltMenu = new AltMenu(
        'Console help', [
            {
                name: '~y~Buttons~s~: Enter',
                description: 'Run current command'
            },
            {
                name: '~y~Buttons~s~: ~<~/~>~',
                description: 'Move the cursor (~>~) left/right'
            },
            {
                name: '~y~Buttons~s~: ~u~/~d~',
                description: 'Cycle through command history'
            },
            {
                name: '~y~Buttons~s~: Shift',
                description: 'Speed up input actions (cursor movement, symbol deletion, etc.)'
            },
            {
                name: '~y~Buttons~s~: Home/End',
                description: 'Move the cursor to the beginning/end of the input'
            },
            {
                name: '~y~Buttons~s~: Backspace',
                description: 'Delete one symbol ~y~before~s~ the cursor'
            },
            {
                name: '~y~Buttons~s~: Delete',
                description: 'Delete one symbol ~y~after~s~ the cursor'
            },
            {
                name: '~y~Buttons~s~: Left Control (~r~~h~Ctrl~s~)',
                description: 'Clear the input'
            },
            {
                name: '~y~Buttons~s~: Insert',
                description: 'Insert the last used command'
            },
            {
                name: '~y~Buttons~s~: Tab',
                description: 'Autocompletion based on the text ~y~before~s~ the cursor'
            },
            {
                name: '~p~~h~Data types~s~: ~s~int',
                description: 'Integer numbers: ~y~51, 108, 359,~s~ et cetera'
            },
            {
                name: '~p~~h~Data types~s~: ~s~float',
                description: 'Floating-point numbers: ~y~1.7, 13.34, 2475.5,~s~ et cetera'
            },
            {
                name: '~p~~h~Data types~s~: ~s~string',
                description: 'Text values: ~y~Hello, world~s~ et cetera'
            },
            {
                name: '~p~~h~Data types~s~: ~s~bool',
                description: 'Boolean values: ~y~0 (OFF)~s~/~y~1 (ON)'
            },
            {
                name: 'Author: ~r~~h~Vital~s~ (Vitaly Ulyanov)',
                description: 'https://github.com/~y~VitalRus95'
            },
            {
                name: 'Thanks to ~b~~h~~h~Seemann',
                description: 'For help and ~r~~h~CLEO Redux~s~.~n~https://github.com/~y~x87'
            },
            {
                name: 'Thanks to ~b~~h~~h~wmysterio',
                description: 'For help.~n~https://github.com/~y~wmysterio'
            }
        ], {
            showCounter: true
        }
    );

    return menu;
}

function getCheatsMenu(): AltMenu {
    const cheats: { name: string, address: int }[] = [
        { name: 'AGGRESSIVE DRIVERS', address: 0x96914F },
        { name: 'ALL CARS HAVE NITRO', address: 0x969165 },
        { name: 'ALL GREEN LIGHTS', address: 0x96914E },
        { name: 'ALL TAXIS HAVE NITRO', address: 0x96918B },
        { name: 'BLACK TRAFFIC', address: 0x969151 },
        { name: 'BOATS CAN FLY', address: 0x969153 },
        { name: 'CARS CAN DRIVE ON WATER', address: 0x969152 },
        { name: 'CARS CAN FLY', address: 0x969160 },
        { name: 'CARS FLOAT AWAY WHEN HIT', address: 0x969166 },
        { name: 'DECREASED TRAFFIC', address: 0x96917A },
        { name: 'EVERYONE IS ARMED', address: 0x969140 },
        { name: 'FASTER CLOCK', address: 0x96913B },
        { name: 'FULL WEAPON AIMING WHILE DRIVING', address: 0x969179 },
        { name: 'GANGS CONTROL THE STREETS', address: 0x96915B },
        { name: 'HUGE BUNNY HOP', address: 0x969161 },
        { name: 'INFINITE AMMO', address: 0x969178 },
        { name: 'INFINITE OXYGEN', address: 0x96916E },
        { name: 'MEGA JUMP', address: 0x96916C },
        { name: 'MEGA PUNCH', address: 0x969173 },
        { name: 'NEVER GET HUNGRY', address: 0x969174 },
        { name: 'MAX SEX APPEAL', address: 0x969180 },
        { name: 'PEDS ATTACK EACH OTHER', address: 0x96913E },
        { name: 'PEDS\' RIOT', address: 0x969175 },
        { name: 'PERFECT HANDLING', address: 0x96914C },
        { name: 'PINK TRAFFIC', address: 0x969150 },
        { name: 'RECRUIT ANYONE (9MM)', address: 0x96917C },
        { name: 'RECRUIT ANYONE (AK47)', address: 0x96917D },
        { name: 'RECRUIT ANYONE (ROCKETS)', address: 0x96917E },
        { name: 'STOP GAME CLOCK', address: 0x969168 },
        { name: 'TANK MODE', address: 0x969164 },
        { name: 'TRAFFIC IS CHEAP CARS', address: 0x96915E },
        { name: 'TRAFFIC IS FAST CARS', address: 0x96915F },
        { name: 'WHEELS ONLY (INVISIBLE CARS)', address: 0x96914B },
    ];

    let menu: AltMenu = new AltMenu(
        'Cheats', cheats.map(c => ({
            name: function () {
                return `${c.name}: ${
                    Memory.ReadU8(c.address, false) !== 0 ? ON : OFF
                }`
            },
            click: function () {
                Memory.WriteU8(
                    c.address,
                    +!(Memory.ReadU8(c.address, false) !== 0),
                    false
                );
            }
        })), {
            selectedBackgroundColour: [255, 70, 150, 90],
            showCounter: true,
            titleColour: [255, 70, 150, 230]
        }
    );

    return menu;
}

function getConfigsMenu(): AltMenu {
    let menu: AltMenu = new AltMenu(
        'Configurations', configsInfo.map(c => ({
            name: c.name,
            description: c.description,
            click: function () {
                c.commands.forEach(i => runCommand(i));
                Text.PrintHelpString('Configuration applied!');
            }
        })), {
            selectedBackgroundColour: [130, 110, 205, 90],
            showCounter: true,
            titleColour: [130, 110, 205, 230]
        }
    );

    return menu;
}

function getAppearanceMenu(): AltMenu {
    interface ClothesItem {
        name: string,
        model: string,
        texture: string
    }
    interface Part {
        id: int,
        name: string,
        items: ClothesItem[],
        menu?: AltMenu,
        clearBodyPart?: int[],
        camOffset: [float, float, float],
        camRotation: [float, float, float]
    }
    
    // Clothes
    let torso: Part = {
        id: 0,
        name: '#TORSO',
        items: [
            { name: 'VESTA', model: 'vest', texture: 'vestblack' },
            { name: 'VESTWH', model: 'vest', texture: 'vest' },
            { name: 'TSRTHS1', model: 'tshirt2', texture: 'tshirt2horiz' },
            { name: 'TSHIRTC', model: 'tshirt', texture: 'tshirtwhite' },
            { name: 'LOVETS1', model: 'tshirt', texture: 'tshirtilovels' },
            { name: 'TSHIRTA', model: 'tshirt', texture: 'tshirtblunts' },
            { name: 'SHIRTBB', model: 'shirtb', texture: 'shirtbplaid' },
            { name: 'CHEKSH1', model: 'shirtb', texture: 'shirtbcheck' },
            { name: 'FIELDA', model: 'field', texture: 'field' },
            { name: 'ERSTSH1', model: 'tshirt', texture: 'tshirterisyell' },
            { name: 'ERISTS2', model: 'tshirt', texture: 'tshirterisorn' },
            { name: 'TRAKER1', model: 'trackytop1', texture: 'trackytop2eris' },
            { name: 'BASJCT2', model: 'bbjack', texture: 'bbjackrim' },
            { name: 'BASJCT3', model: 'bbjack', texture: 'bballjackrstar' },
            { name: 'BASKA', model: 'baskball', texture: 'baskballdrib' },
            { name: 'BASKC', model: 'baskball', texture: 'baskballrim' },
            { name: 'TSHRT69', model: 'tshirt', texture: 'sixtyniners' },
            { name: 'BANDITS', model: 'baseball', texture: 'bandits' },
            { name: 'PROSHRD', model: 'tshirt', texture: 'tshirtprored' },
            { name: 'PROTSH1', model: 'tshirt', texture: 'tshirtproblk' },
            { name: 'TRAKPR1', model: 'trackytop1', texture: 'trackytop1pro' },
            { name: 'HCKYTOP', model: 'sweat', texture: 'hockeytop' },
            { name: 'BBJERY1', model: 'sleevt', texture: 'bbjersey' },
            { name: 'SHELSUT', model: 'trackytop1', texture: 'shellsuit' },
            { name: 'HEATSH1', model: 'tshirt', texture: 'tshirtheatwht' },
            { name: 'TSHRBO1', model: 'tshirt', texture: 'tshirtbobomonk' },
            { name: 'TSHRBO2', model: 'tshirt', texture: 'tshirtbobored' },
            { name: 'TSRTBA1', model: 'tshirt', texture: 'tshirtbase5' },
            { name: 'TSRTSB1', model: 'tshirt', texture: 'tshirtsuburb' },
            { name: 'HODMRC1', model: 'hoodya', texture: 'hoodyamerc' },
            { name: 'HODBSE1', model: 'hoodya', texture: 'hoodyabase5' },
            { name: 'HODRST1', model: 'hoodya', texture: 'hoodyarockstar' },
            { name: 'WCOATA', model: 'wcoat', texture: 'wcoatblue' },
            { name: 'COACHA', model: 'coach', texture: 'coach' },
            { name: 'COACHB', model: 'coach', texture: 'coachsemi' },
            { name: 'RSTRSWE', model: 'sweat', texture: 'sweatrstar' },
            { name: 'HOODB', model: 'hoodyA', texture: 'hoodyAblue' },
            { name: 'HOODBL', model: 'hoodyA', texture: 'hoodyAblack' },
            { name: 'HOODG', model: 'hoodyA', texture: 'hoodyAgreen' },
            { name: 'SLEVB1', model: 'sleevt', texture: 'sleevtbrown' },
            { name: 'BSHIRT', model: 'shirta', texture: 'shirtablue' },
            { name: 'YSHIRT', model: 'shirta', texture: 'shirtayellow' },
            { name: 'GSHIRT', model: 'shirta', texture: 'shirtagrey' },
            { name: 'SHTBG1', model: 'shirtb', texture: 'shirtbgang' },
            { name: 'TSHZIP1', model: 'tshirt', texture: 'tshirtzipcrm' },
            { name: 'TSHZIP2', model: 'tshirt', texture: 'tshirtzipgry' },
            { name: 'DENJCK1', model: 'denim', texture: 'denimfade' },
            { name: 'BOWLSH1', model: 'hawaii', texture: 'bowling' },
            { name: 'HODJCK1', model: 'hoodjack', texture: 'hoodjackbeige' },
            { name: 'BASKB', model: 'baskball', texture: 'baskballloc' },
            { name: 'TSHIRTB', model: 'tshirt', texture: 'tshirtlocgrey' },
            { name: 'TSHRTMG', model: 'tshirt', texture: 'tshirtmaddgrey' },
            { name: 'TSRTMGN', model: 'tshirt', texture: 'tshirtmaddgrn' },
            { name: 'SUT1GRY', model: 'suit1', texture: 'suit1grey' },
            { name: 'SUT1BLK', model: 'suit1', texture: 'suit1blk' },
            { name: 'BIKERJ', model: 'leather', texture: 'leather' },
            { name: 'PAINT1', model: 'painter', texture: 'painter' },
            { name: 'HAWAI1', model: 'hawaii', texture: 'hawaiiwht' },
            { name: 'HAWAI2', model: 'hawaii', texture: 'hawaiired' },
            { name: 'SPRJCT', model: 'trackytop1', texture: 'sportjack' },
            { name: 'SUIT1', model: 'suit1', texture: 'suit1red' },
            { name: 'SUIT2', model: 'suit1', texture: 'suit1blue' },
            { name: 'SUIT3', model: 'suit1', texture: 'suit1yellow' },
            { name: 'SUT2GRN', model: 'suit2', texture: 'suit2grn' },
            { name: 'TUXEDO', model: 'suit2', texture: 'tuxedo' },
            { name: 'SUITGNG', model: 'suit1', texture: 'suit1gang' },
            { name: 'LETTER', model: 'sleevt', texture: 'letter' },
            { name: 'REMCLT', model: undefined, texture: undefined },
        ],
        camOffset: [-0.35, 1.7, 0.85],
        camRotation: [0, 0, 0.4]
    };
    let legs: Part = {
        id: 2,
        name: '#LEGS',
        items: [
            { name: 'WORKA', model: 'worktr', texture: 'worktrcamogrn' },
            { name: 'WORKB', model: 'worktr', texture: 'worktrcamogry' },
            { name: 'WORKC', model: 'worktr', texture: 'worktrgrey' },
            { name: 'WORKD', model: 'worktr', texture: 'worktrkhaki' },
            { name: 'TRABOTA', model: 'tracktr', texture: 'tracktr' },
            { name: 'TRAKERI', model: 'tracktr', texture: 'tracktreris' },
            { name: 'JEANSBL', model: 'jeans', texture: 'jeansdenim' },
            { name: 'BOXBLK', model: 'legs', texture: 'legsblack' },
            { name: 'BOXHRT', model: 'legs', texture: 'legsheart' },
            { name: 'BEITROS', model: 'chinosb', texture: 'biegetr' },
            { name: 'TRACKT1', model: 'tracktr', texture: 'tracktrpro' },
            { name: 'TRACKT2', model: 'tracktr', texture: 'tracktrwhstr' },
            { name: 'TRACKT3', model: 'tracktr', texture: 'tracktrblue' },
            { name: 'TRACKT4', model: 'tracktr', texture: 'tracktrgang' },
            { name: 'BOXSRT1', model: 'boxingshort', texture: 'bbshortwht' },
            { name: 'BOXSRT2', model: 'boxingshort', texture: 'boxshort' },
            { name: 'BOXSRT3', model: 'boxingshort', texture: 'bbshortred' },
            { name: 'SHELBOT', model: 'tracktr', texture: 'shellsuittr' },
            { name: 'SHORT1', model: 'shorts', texture: 'shortsgrey' },
            { name: 'SHORT2', model: 'shorts', texture: 'shortskhaki' },
            { name: 'CHONG1', model: 'chonger', texture: 'chongergrey' },
            { name: 'CHONG2', model: 'chonger', texture: 'chongergang' },
            { name: 'CHONG3', model: 'chonger', texture: 'chongerred' },
            { name: 'CHONG4', model: 'chonger', texture: 'chongerblue' },
            { name: 'SHORT3', model: 'shorts', texture: 'shortsgang' },
            { name: 'DENIM1', model: 'jeans', texture: 'denimsgang' },
            { name: 'DENIM2', model: 'jeans', texture: 'denimsred' },
            { name: 'CHINBIE', model: 'chinosb', texture: 'chinosbiege' },
            { name: 'CHINOK', model: 'chinosb', texture: 'chinoskhaki' },
            { name: 'CUTCHI', model: 'shorts', texture: 'cutoffchinos' },
            { name: 'CHINO3', model: 'chinosb', texture: 'chinosblack' },
            { name: 'CHINO4', model: 'chinosb', texture: 'chinosblue' },
            { name: 'LEATHA', model: 'leathertr', texture: 'leathertr' },
            { name: 'LEATHB', model: 'leathertr', texture: 'leathertrchaps' },
            { name: 'SUTR1GR', model: 'suit1tr', texture: 'suit1trgrey' },
            { name: 'SUTR1BL', model: 'suit1tr', texture: 'suit1trblk' },
            { name: 'CUTDENM', model: 'shorts', texture: 'cutoffdenims' },
            { name: 'SUITTR1', model: 'suit1tr', texture: 'suit1trred' },
            { name: 'SUITTR2', model: 'suit1tr', texture: 'suit1trblue' },
            { name: 'SUITTR3', model: 'suit1tr', texture: 'suit1tryellow' },
            { name: 'SUTR1GN', model: 'suit1tr', texture: 'suit1trgreen' },
            { name: 'SUTRGNG', model: 'suit1tr', texture: 'suit1trgang' },
            { name: 'LEGS', model: 'legs', texture: 'player_legs' },
        ],
        camOffset: [0.45, 1.95, 0.2],
        camRotation: [-0.05, 0, -0.2]
    };
    let shoes: Part = {
        id: 3,
        name: '#FEET',
        items: [
            { name: 'COWBOT2', model: 'biker', texture: 'cowboyboot2' },
            { name: 'BASKBO1', model: 'bask1', texture: 'bask2semi' },
            { name: 'BASKBO2', model: 'bask1', texture: 'bask1eris' },
            { name: 'SNKBGAN', model: 'sneaker', texture: 'sneakerbincgang' },
            { name: 'SNKBBLU', model: 'sneaker', texture: 'sneakerbincblu' },
            { name: 'SNKBBLK', model: 'sneaker', texture: 'sneakerbincblk' },
            { name: 'SANDIL1', model: 'flipflop', texture: 'sandal' },
            { name: 'SANDIL2', model: 'flipflop', texture: 'sandalsock' },
            { name: 'SANDIL3', model: 'flipflop', texture: 'flipflop' },
            { name: 'HITOP', model: 'bask1', texture: 'hitop' },
            { name: 'CHUBLK', model: 'conv', texture: 'convproblk' },
            { name: 'CONBLUE', model: 'conv', texture: 'convproblu' },
            { name: 'CONGREN', model: 'conv', texture: 'convprogrn' },
            { name: 'PROTRA1', model: 'sneaker', texture: 'sneakerprored' },
            { name: 'PROTRA2', model: 'sneaker', texture: 'sneakerproblu' },
            { name: 'PROTRA3', model: 'sneaker', texture: 'sneakerprowht' },
            { name: 'PROWHT1', model: 'bask1', texture: 'bask1prowht' },
            { name: 'PROBLK1', model: 'bask1', texture: 'bask1problk' },
            { name: 'BOXSHO1', model: 'biker', texture: 'boxingshoe' },
            { name: 'COHEAT1', model: 'conv', texture: 'convheatblk' },
            { name: 'COHEAT2', model: 'conv', texture: 'convheatred' },
            { name: 'COHEAT3', model: 'conv', texture: 'convheatorn' },
            { name: 'SNHEAT1', model: 'sneaker', texture: 'sneakerheatwht' },
            { name: 'SNHEAT2', model: 'sneaker', texture: 'sneakerheatgry' },
            { name: 'SNHEAT3', model: 'sneaker', texture: 'sneakerheatblk' },
            { name: 'BSHEAT1', model: 'bask1', texture: 'bask2heatwht' },
            { name: 'BSHEAT2', model: 'bask1', texture: 'bask2heatband' },
            { name: 'TIMBER1', model: 'bask1', texture: 'timbergrey' },
            { name: 'TIMBER2', model: 'bask1', texture: 'timberred' },
            { name: 'TIMBER3', model: 'bask1', texture: 'timberfawn' },
            { name: 'TIMBER4', model: 'bask1', texture: 'timberhike' },
            { name: 'COWBOY', model: 'biker', texture: 'cowboyboot' },
            { name: 'BIKEBOT', model: 'biker', texture: 'biker' },
            { name: 'SNAKESN', model: 'biker', texture: 'snakeskin' },
            { name: 'SHOEDR1', model: 'shoe', texture: 'shoedressblk' },
            { name: 'SHOEDR2', model: 'shoe', texture: 'shoedressbrn' },
            { name: 'SHOEDR3', model: 'shoe', texture: 'shoespatz' },
            { name: 'REMCLT', model: 'feet', texture: 'foot' },
        ],
        camOffset: [-0.25, 1.2, -0.25],
        camRotation: [0, -0.15, -0.9]
    };
    let chains: Part = {
        id: 13,
        name: '#CHAINS',
        items: [
            { name: 'DOGTAG', model: 'neck', texture: 'dogtag' },
            { name: 'NECKAFR', model: 'neck', texture: 'neckafrica' },
            { name: 'STOPWAT', model: 'neck', texture: 'stopwatch' },
            { name: 'NECKSNT', model: 'neck', texture: 'necksaints' },
            { name: 'NECKHA', model: 'neck', texture: 'neckhash' },
            { name: 'NECKCU1', model: 'neck2', texture: 'necksilver' },
            { name: 'NECKCU2', model: 'neck2', texture: 'neckgold' },
            { name: 'NECKRP1', model: 'neck2', texture: 'neckropes' },
            { name: 'NECKRP2', model: 'neck2', texture: 'neckropeg' },
            { name: 'NECKLS', model: 'neck', texture: 'neckls' },
            { name: 'NECKDL', model: 'neck', texture: 'neckdollar' },
            { name: 'NECKCR', model: 'neck', texture: 'neckcross' },
            { name: 'REMCLT', model: undefined, texture: undefined },
        ],
        camOffset: [0.1, 0.75, 0.35],
        camRotation: [0, 0.15, 0.4]
    };
    let watches: Part = {
        id: 14,
        name: '#WATCHES',
        items: [
            { name: 'WATCH7', model: 'watch', texture: 'watchpink' },
            { name: 'WATCH8', model: 'watch', texture: 'watchyellow' },
            { name: 'WATCH3', model: 'watch', texture: 'watchpro' },
            { name: 'WATCH4', model: 'watch', texture: 'watchpro2' },
            { name: 'WATCH9', model: 'watch', texture: 'watchsub1' },
            { name: 'WATCH10', model: 'watch', texture: 'watchsub2' },
            { name: 'WATCH11', model: 'watch', texture: 'watchzip1' },
            { name: 'WATCH12', model: 'watch', texture: 'watchzip2' },
            { name: 'WATCH2', model: 'watch', texture: 'watchgno' },
            { name: 'WATCH5', model: 'watch', texture: 'watchgno2' },
            { name: 'WATCH1', model: 'watch', texture: 'watchcro' },
            { name: 'WATCH6', model: 'watch', texture: 'watchcro2' },
            { name: 'REMCLT', model: undefined, texture: undefined },
        ],
        camOffset: [-0.65, 0.25, 0.10],
        camRotation: [0.05, -0.10, -0.15]
    };
    let glasses: Part = {
        id: 15,
        name: '#SHADES',
        items: [
            { name: 'GROUCH1', model: 'grouchos', texture: 'groucho' },
            { name: 'ZORRO', model: 'zorromask', texture: 'zorro' },
            { name: 'EYEPCH', model: 'eyepatch', texture: 'eyepatch' },
            { name: 'GLASS1', model: 'glasses01', texture: 'glasses01' },
            { name: 'GLASS4', model: 'glasses04', texture: 'glasses04' },
            { name: 'BANDA15', model: 'bandmask', texture: 'bandred3' },
            { name: 'BANDA16', model: 'bandmask', texture: 'bandblue3' },
            { name: 'BANDA17', model: 'bandmask', texture: 'bandgang3' },
            { name: 'BANDA18', model: 'bandmask', texture: 'bandblack3' },
            { name: 'GLASS5', model: 'glasses01', texture: 'glasses01dark' },
            { name: 'GLASS6', model: 'glasses04', texture: 'glasses04dark' },
            { name: 'GLASS3', model: 'glasses03', texture: 'glasses03' },
            { name: 'GLASS8', model: 'glasses03', texture: 'glasses03red' },
            { name: 'GLASS9', model: 'glasses03', texture: 'glasses03blue' },
            { name: 'GLASS7', model: 'glasses03', texture: 'glasses03dark' },
            { name: 'GLASS10', model: 'glasses03', texture: 'glasses05dark' },
            { name: 'GLASS11', model: 'glasses03', texture: 'glasses05' },
            { name: 'REMCLT', model: undefined, texture: undefined },
        ],
        camOffset: [0.1, 0.6, 0.6],
        camRotation: [0, 0.1, 0.7]
    };
    let hats: Part = {
        id: 16,
        name: '#HATS',
        items: [
            { name: 'BANDAN7', model: 'bandana', texture: 'bandred' },
            { name: 'BANDAN8', model: 'bandana', texture: 'bandblue' },
            { name: 'BANDAN9', model: 'bandana', texture: 'bandgang' },
            { name: 'BANDA10', model: 'bandana', texture: 'bandblack' },
            { name: 'BANDA11', model: 'bandknots', texture: 'bandred2' },
            { name: 'BANDA12', model: 'bandknots', texture: 'bandblue2' },
            { name: 'BANDA13', model: 'bandknots', texture: 'bandblack2' },
            { name: 'BANDA14', model: 'bandknots', texture: 'bandgang2' },
            { name: 'CAP25', model: 'capknit', texture: 'capknitgrn' },
            { name: 'CAP26', model: 'captruck', texture: 'captruck' },
            { name: 'CAP28', model: 'cowboy', texture: 'cowboy' },
            { name: 'CAP29', model: 'cowboy', texture: 'hattiger' },
            { name: 'CAP27', model: 'helmet', texture: 'helmet' },
            { name: 'CAP30', model: 'moto', texture: 'moto' },
            { name: 'CAP15', model: 'boxingcap', texture: 'boxingcap' },
            { name: 'CAP16', model: 'hockeymask', texture: 'hockey' },
            { name: 'CAP31', model: 'cap', texture: 'capgang' },
            { name: 'CAP32', model: 'capback', texture: 'capgangback' },
            { name: 'CAP33', model: 'capside', texture: 'capgangside' },
            { name: 'CAP34', model: 'capovereye', texture: 'capgangover' },
            { name: 'CAP35', model: 'caprimup', texture: 'capgangup' },
            { name: 'CAP56', model: 'bikerhelmet', texture: 'bikerhelmet' },
            { name: 'CAP36', model: 'cap', texture: 'capred' },
            { name: 'CAP37', model: 'capback', texture: 'capredback' },
            { name: 'CAP38', model: 'capside', texture: 'capredside' },
            { name: 'CAP39', model: 'capovereye', texture: 'capredover' },
            { name: 'CAP40', model: 'caprimup', texture: 'capredup' },
            { name: 'CAP41', model: 'cap', texture: 'capblue' },
            { name: 'CAP42', model: 'capback', texture: 'capblueback' },
            { name: 'CAP43', model: 'capside', texture: 'capblueside' },
            { name: 'CAP44', model: 'capovereye', texture: 'capblueover' },
            { name: 'CAP45', model: 'caprimup', texture: 'capblueup' },
            { name: 'CAP57', model: 'skullycap', texture: 'skullyblk' },
            { name: 'CAP58', model: 'skullycap', texture: 'skullygrn' },
            { name: 'MANCBLK', model: 'hatmanc', texture: 'hatmancblk' },
            { name: 'MANCPLD', model: 'hatmanc', texture: 'hatmancplaid' },
            { name: 'CAP46', model: 'cap', texture: 'capzip' },
            { name: 'CAP47', model: 'capback', texture: 'capzipback' },
            { name: 'CAP48', model: 'capside', texture: 'capzipside' },
            { name: 'CAP49', model: 'capovereye', texture: 'capzipover' },
            { name: 'CAP50', model: 'caprimup', texture: 'capzipup' },
            { name: 'CAP17', model: 'beret', texture: 'beretred' },
            { name: 'CAP18', model: 'beret', texture: 'beretblk' },
            { name: 'CAP51', model: 'cap', texture: 'capblk' },
            { name: 'CAP52', model: 'capback', texture: 'capblkback' },
            { name: 'CAP53', model: 'capside', texture: 'capblkside' },
            { name: 'CAP54', model: 'capovereye', texture: 'capblkover' },
            { name: 'CAP55', model: 'caprimup', texture: 'capblkup' },
            { name: 'TRIBY1', model: 'trilby', texture: 'trilbydrk' },
            { name: 'TRIBY2', model: 'trilby', texture: 'trilbylght' },
            { name: 'BOWLER1', model: 'bowler', texture: 'bowler' },
            { name: 'BOWLER2', model: 'bowler', texture: 'bowlerred' },
            { name: 'BOWLER3', model: 'bowler', texture: 'bowlerblue' },
            { name: 'BOWLER4', model: 'bowler', texture: 'bowleryellow' },
            { name: 'BOATHA1', model: 'boater', texture: 'boater' },
            { name: 'BOWLER5', model: 'bowler', texture: 'bowlergang' },
            { name: 'BOATHA2', model: 'boater', texture: 'boaterblk' },
            { name: 'REMCLT', model: undefined, texture: undefined },
        ],
        camOffset: [-0.25, 0.75, 0.8],
        camRotation: [0, 0.1, 0.7]
    };
    let special: Part = {
        id: 17,
        name: '#SHOP7',
        items: [
            { name: 'GIMP', model: 'gimpleg', texture: 'gimpleg' },
            { name: 'VALETU', model: 'valet', texture: 'valet' },
            { name: 'COUNTRY', model: 'countrytr', texture: 'countrytr' },
            { name: 'CROUP', model: 'valet', texture: 'croupier' },
            { name: 'POLICE', model: 'policetr', texture: 'policetr' },
            { name: 'BALACLA', model: 'balaclava', texture: 'balaclava' },
            { name: 'PIMPSUT', model: 'pimptr', texture: 'pimptr' },
            { name: 'RDRIVER', model: 'garagetr', texture: 'garageleg' },
            { name: 'PAMEDIC', model: 'medictr', texture: 'medictr' },
            { name: 'REMCLT', model: undefined, texture: undefined },
        ],
        camOffset: [-0.5, 3.3, 0.9],
        camRotation: [0, 0, 0.3]
    };
    
    // Haircuts
    let haircut: Part = {
        id: 1,
        name: '#HAIRSTY',
        items: [
            { name: 'HEAD', model: 'head', texture: 'player_face' },
            { name: 'BLHAIR', model: 'head', texture: 'hairblond' },
            { name: 'REDHAIR', model: 'head', texture: 'hairred' },
            { name: 'BLUHAIR', model: 'head', texture: 'hairblue' },
            { name: 'GRNHAIR', model: 'head', texture: 'hairgreen' },
            { name: 'PNKHAIR', model: 'head', texture: 'hairpink' },
            { name: 'BALD', model: 'head', texture: 'bald' },
            { name: 'BLADBEA', model: 'head', texture: 'baldbeard' },
            { name: 'BALDTSH', model: 'head', texture: 'baldtash' },
            { name: 'BALDGOT', model: 'head', texture: 'baldgoatee' },
            { name: 'HIGHFAD', model: 'head', texture: 'highfade' },
            { name: 'AFROHI', model: 'highafro', texture: 'highafro' },
            { name: 'WEDGE', model: 'wedge', texture: 'wedge' },
            { name: 'SLOPE', model: 'slope', texture: 'slope' },
            { name: 'JHERI', model: 'jheri', texture: 'jhericurl' },
            { name: 'CORNROW', model: 'cornrows', texture: 'cornrows' },
            { name: 'CORNRO2', model: 'cornrows', texture: 'cornrowsb' },
            { name: 'TRAMLIN', model: 'tramline', texture: 'tramline' },
            { name: 'GROOVE', model: 'groovecut', texture: 'groovecut' },
            { name: 'MOHAWK', model: 'mohawk', texture: 'mohawk' },
            { name: 'MOHAWKB', model: 'mohawk', texture: 'mohawkblond' },
            { name: 'MOHAWKP', model: 'mohawk', texture: 'mohawkpink' },
            { name: 'MOHAKBE', model: 'mohawk', texture: 'mohawkbeard' },
            { name: 'AFRO', model: 'afro', texture: 'afro' },
            { name: 'AFROT', model: 'afro', texture: 'afrotash' },
            { name: 'AFROB', model: 'afro', texture: 'afrobeard' },
            { name: 'AFROBL', model: 'afro', texture: 'afroblond' },
            { name: 'AFROFL', model: 'flattop', texture: 'flattop' },
            { name: 'ELVISHA', model: 'elvishair', texture: 'elvishair' },
            { name: 'BEARD', model: 'head', texture: 'beard' },
            { name: 'TASH', model: 'head', texture: 'tash' },
            { name: 'GOATEE', model: 'head', texture: 'goatee' },
            { name: 'AFROGOT', model: 'afro', texture: 'afrogoatee' },
        ],
        clearBodyPart: [16, 17],
        camOffset: [-0.3, 0.75, 0.75],
        camRotation: [0.10, -0.20, 0.75]
    };
    
    // Tattoos
    let leftUpperArm: Part = {
        id: 4,
        name: '#LARMTP',
        items: [
            { name: '4WEED', model: '4WEED', texture: '4weed' },
            { name: '4RIP', model: '4RIP', texture: '4rip' },
            { name: '4SPIDER', model: '4SPIDER', texture: '4spider' },
            { name: 'REMCLT', model: undefined, texture: undefined },
        ],
        clearBodyPart: [0, 17],
        camOffset: [-0.75, 0.05, 0.5],
        camRotation: [0, -0.05, 0.45]
    };
    let leftLowerArm: Part = {
        id: 5,
        name: '#LARMLW',
        items: [
            { name: '5GUN', model: '5GUN', texture: '5gun' },
            { name: '5CROSS', model: '5CROSS', texture: '5cross' },
            { name: '5CROSS2', model: '5CROSS2', texture: '5cross2' },
            { name: '5CROSS3', model: '5CROSS3', texture: '5cross3' },
            { name: 'REMCLT', model: undefined, texture: undefined },
        ],
        clearBodyPart: [0, 17],
        camOffset: [-0.85, 0.1, 0.35],
        camRotation: [0, 0, 0]
    };
    let rightUpperArm: Part = {
        id: 6,
        name: '#RARMTP',
        items: [
            { name: '6AZTEC', model: '6AZTEC', texture: '6aztec' },
            { name: '6CROWN', model: '6CROWN', texture: '6crown' },
            { name: '6CLOWN', model: '6CLOWN', texture: '6clown' },
            { name: '6AFRICA', model: '6AFRICA', texture: '6africa' },
            { name: 'REMCLT', model: undefined, texture: undefined },
        ],
        clearBodyPart: [0, 17],
        camOffset: [0.75, 0.05, 0.5],
        camRotation: [0, -0.05, 0.45]
    };
    let rightLowerArm: Part = {
        id: 7,
        name: '#RARMLW',
        items: [
            { name: '7CROSS', model: '7CROSS', texture: '7cross' },
            { name: '7CROSS2', model: '7CROSS2', texture: '7cross2' },
            { name: '7CROSS3', model: '7CROSS3', texture: '7cross3' },
            { name: '7MARY', model: '7MARY', texture: '7mary' },
            { name: 'REMCLT', model: undefined, texture: undefined },
        ],
        clearBodyPart: [0, 17],
        camOffset: [0.85, 0.1, 0.35],
        camRotation: [0, 0, 0]
    };
    let leftChest: Part = {
        id: 9,
        name: '#LCHEST',
        items: [
            { name: '9CROWN', model: '9CROWN', texture: '9crown' },
            { name: '9GUN', model: '9GUN', texture: '9gun' },
            { name: '9GUN2', model: '9GUN2', texture: '9gun2' },
            { name: '9HOMBY', model: '9HOMBY', texture: '9homeboy' },
            { name: '9BULLT', model: '9BULLT', texture: '9bullet' },
            { name: '9RASTA', model: '9RASTA', texture: '9rasta' },
            { name: 'REMCLT', model: undefined, texture: undefined },
        ],
        clearBodyPart: [0, 17],
        camOffset: [-0.15, 0.75, 0.5],
        camRotation: [-0.05, 0, 0.5]
    };
    let rightChest: Part = {
        id: 10,
        name: '#RCHEST',
        items: [
            { name: '10LS', model: '10LS', texture: '10ls' },
            { name: '10LS2', model: '10LS2', texture: '10ls2' },
            { name: '10LS3', model: '10LS3', texture: '10ls3' },
            { name: '10LS4', model: '10LS4', texture: '10ls4' },
            { name: '10LS5', model: '10LS5', texture: '10ls5' },
            { name: '10OG', model: '10OG', texture: '10og' },
            { name: '10WEED', model: '10WEED', texture: '10weed' },
            { name: 'REMCLT', model: undefined, texture: undefined },
        ],
        clearBodyPart: [0, 17],
        camOffset: [0.15, 0.75, 0.5],
        camRotation: [0.05, 0, 0.5]
    };
    let stomach: Part = {
        id: 11,
        name: '#BELLY',
        items: [
            { name: '11GROVE', model: '11GROVE', texture: '11grove' },
            { name: '11GROV2', model: '11GROV2', texture: '11grove2' },
            { name: '11GROV3', model: '11GROV3', texture: '11grove3' },
            { name: '11DICE', model: '11DICE', texture: '11dice' },
            { name: '11DICE2', model: '11DICE2', texture: '11dice2' },
            { name: '11JAIL', model: '11JAIL', texture: '11jail' },
            { name: '11GGIFT', model: '11GGIFT', texture: '11godsgift' },
            { name: 'REMCLT', model: undefined, texture: undefined },
        ],
        clearBodyPart: [0, 17],
        camOffset: [0, 0.75, 0.25],
        camRotation: [0, 0, 0.3]
    };
    let back: Part = {
        id: 8,
        name: '#BACK',
        items: [
            { name: '8SA', model: '8SA', texture: '8sa' },
            { name: '8SA2', model: '8SA2', texture: '8sa2' },
            { name: '8SA3', model: '8SA3', texture: '8sa3' },
            { name: '8WESTSD', model: '8WESTSD', texture: '8westside' },
            { name: '8SANTOS', model: '8SANTOS', texture: '8santos' },
            { name: '8POKER', model: '8POKER', texture: '8poker' },
            { name: '8GUN', model: '8GUN', texture: '8gun' },
            { name: 'REMCLT', model: undefined, texture: undefined },
        ],
        clearBodyPart: [0, 17],
        camOffset: [0, -0.75, 0.6],
        camRotation: [0, 0, 0.5]
    };
    let lowerBack: Part = {
        id: 12,
        name: '#LBACK',
        items: [
            { name: '12ANGEL', model: '12ANGEL', texture: '12angels' },
            { name: '12MAYBR', model: '12MAYBR', texture: '12mayabird' },
            { name: '12DAGER', model: '12DAGER', texture: '12dagger' },
            { name: '12BNDIT', model: '12BNDIT', texture: '12bandit' },
            { name: '12CROSS', model: '12CROSS', texture: '12cross7' },
            { name: '12MYFAC', model: '12MYFAC', texture: '12mayaface' },
            { name: 'REMCLT', model: undefined, texture: undefined },
        ],
        clearBodyPart: [0, 17],
        camOffset: [0, -0.75, 0.25],
        camRotation: [0, 0, 0.3]
    };
    
    let body: Part[] = [
        torso, legs, shoes, chains, watches, glasses,
        hats, special, haircut, leftUpperArm, leftLowerArm, rightUpperArm,
        rightLowerArm, leftChest, rightChest, stomach, back, lowerBack
    ];
    
    // Generate body parts' menus
    body.forEach(p => {
        p.menu = new AltMenu(p.name, p.items.map(i => ({
            name: `#${i.name}`,
            enter: function () {
                if (i.model !== undefined && i.texture !== undefined) {
                    plr.giveClothesOutsideShop(i.texture, i.model, p.id);
                } else {
                    plr.giveClothes(0, 0, p.id);
                }
                plr.buildModel();
            }
        })), {
            disableHud: true,
            selectedBackgroundColour: [0, 0, 90, 127],
            showCounter: true,
        });
    });
    
    // General menu
    let menu: AltMenu = new AltMenu('Appearance', body.map(p => ({
        name: p.name,
        enter: function () {
            Camera.AttachToChar(plc, ...p.camOffset, ...p.camRotation, 0, 2);
        },
        click: function () {
            if (p.clearBodyPart) {
                p.clearBodyPart.forEach(p => plr.giveClothes(0, 0, p));
                plr.buildModel();
            }
            while (p.menu.isDisplayed()) {
                wait(0);
            }
        }
    })), {
        selectedBackgroundColour: [0, 70, 0, 150],
        showCounter: true
    });

    return menu;
}

function getCarMenu(): AltMenu {
    const CAR_MODEL: int = 0;
    const CAR_TYPE: int = 3;
    const CAR_NAME: int = 5;

    let options: Item[] = data.cars.sort(
        (a, b) => Text.GetLabelString(a[CAR_NAME]).localeCompare(Text.GetLabelString(b[CAR_NAME]))
    ).filter(
        c => c && Text.GetStringWidthWithNumber(c[CAR_NAME], 0) && c[CAR_TYPE] !== 'train'
    ).map(
        c => ({
            name: `#${c[CAR_NAME]}`,
            enter: function () {
                spawnVehicle(+c[CAR_MODEL], false);
            },
            click: function () {
                spawnVehicle(+c[CAR_MODEL], true);
            }
        })
    );

    let menu: AltMenu = new AltMenu('Quick car spawner', options, {
        disableHud: true,
        counterAlignment: 'CENTRE',
        counterPos: { x: 0.5, y: 0.1 },
        itemsPos: { x: 0.03, y: 0.7 },
        selectedBackgroundColour: [210, 210, 70, 100],
        showCounter: true,
        titleColour: [210, 210, 70, 230],
        titleAlignment: 'CENTRE',
        titleFont: Font.Gothic,
        titleFontSize: { height: 2.7, width: 0.7 },
        titlePos: { x: 0.5, y: 0.03 }
    });

    return menu;

    function spawnVehicle(modelId: int, warpInto: boolean) {
        Streaming.RequestModel(modelId);
        Streaming.LoadAllModelsNow();

        let size = Streaming.GetModelDimensions(modelId);
        let pos = plc.getOffsetInWorldCoords(0, size.rightTopFrontX + 6, 0.5);

        World.ClearArea(pos.x, pos.y, pos.z, 50, true);
        let veh = Car.Create(modelId, pos.x, pos.y, pos.z);
        veh.setHeading(plc.getHeading() + 90);
        veh.lockDoors(CarLock.Unlocked);

        let camPoint = veh.getOffsetInWorldCoords(
            size.leftBottomBackX * 1.5 - 3,
            size.rightTopFrontY + 6,
            size.rightTopFrontZ * 1.1
        );
        Camera.SetFixedPosition(
            camPoint.x, camPoint.y, camPoint.z, 0, 0, 0
        );
        Camera.PointAtPoint(
            pos.x, pos.y, pos.z, SwitchType.JumpCut
        );

        if (warpInto) {
            if (plc.isInAnyCar()) {
                let current = plc.storeCarIsInNoSave();
                plc.warpFromCarToCoord(pos.x, pos.y, pos.z)
                current.delete();
            }
            plc.warpIntoCar(veh);
            Camera.RestoreJumpcut();
            Audio.SetRadioChannel(RadioChannel.None);
        }

        veh.markAsNoLongerNeeded();
        Streaming.MarkModelAsNoLongerNeeded(modelId);
    }
}

function getCarColMenu(): AltMenu {
    const colours: { name: string, slot: int }[] = [
        { name: '1ST COLOUR', slot: 1 },
        { name: '2ND COLOUR', slot: 2 },
        { name: '3RD COLOUR', slot: 3 },
        { name: '4TH COLOUR', slot: 4 },
    ];

    let menu: AltMenu = new AltMenu(
        'Vehicle\'s colours', colours.map(c => ({
            name: c.name,
            click: function () {
                if (!plc.isInAnyCar()) return;

                let grid = MenuGrid.Create(
                    'CARM1', 640 * 0.017, 448 * 0.55, 19, 8, true, true, Align.Left
                );

                grid.changeCarColor(
                    plc.storeCarIsInNoSave(),
                    c.slot,
                    grid.getItemSelected()
                );

                while (plc.isInAnyCar() && !Pad.IsButtonPressed(PadId.Pad1, Button.Triangle)) {
                    let oldColour = grid.getItemSelected();
                    wait(0);
                    let newColour = grid.getItemSelected();

                    if (newColour !== oldColour) {
                        grid.changeCarColor(
                            plc.storeCarIsInNoSave(),
                            c.slot,
                            newColour
                        );
                    }
                }

                grid.delete();
            }
        })), {
            disableHud: true,
            selectedBackgroundColour: [127, 127, 0, 127],
            titleColour: [185, 185, 0, 230]
        }
    );

    return menu;
}

function getWeaponMenu(): AltMenu {
    const weapons: { name: string, id: int, ammo: int }[] = [
        { name: 'BRASS KNUCKLES', id: 1, ammo: 1 },
        { name: 'GOLF CLUB', id: 2, ammo: 1 },
        { name: 'NIGHT STICK', id: 3, ammo: 1 },
        { name: 'KNIFE', id: 4, ammo: 1 },
        { name: 'BASEBALL BAT', id: 5, ammo: 1 },
        { name: 'SHOVEL', id: 6, ammo: 1 },
        { name: 'POOL CUE', id: 7, ammo: 1 },
        { name: 'KATANA', id: 8, ammo: 1 },
        { name: 'CHAINSAW', id: 9, ammo: 1 },
        { name: 'PURPLE DILDO', id: 10, ammo: 1 },
        { name: 'WHITE DILDO', id: 11, ammo: 1 },
        { name: 'LONG WHITE DILDO', id: 12, ammo: 1 },
        { name: 'WHITE DILDO 2', id: 13, ammo: 1 },
        { name: 'FLOWERS', id: 14, ammo: 1 },
        { name: 'CANE', id: 15, ammo: 1 },
        { name: 'GRENADES', id: 16, ammo: 8 },
        { name: 'TEAR GAS', id: 17, ammo: 8 },
        { name: 'MOLOTOVS', id: 18, ammo: 8 },
        { name: 'PISTOL', id: 22, ammo: 17 },
        { name: 'SILENCED PISTOL', id: 23, ammo: 17 },
        { name: 'DESERT EAGLE', id: 24, ammo: 14 },
        { name: 'SHOTGUN', id: 25, ammo: 10 },
        { name: 'SAWN-OFF SHOTGUN', id: 26, ammo: 10 },
        { name: 'COMBAT SHOTGUN', id: 27, ammo: 14 },
        { name: 'MICRO UZI', id: 28, ammo: 50 },
        { name: 'MP5', id: 29, ammo: 30 },
        { name: 'AK47', id: 30, ammo: 30 },
        { name: 'M4', id: 31, ammo: 50 },
        { name: 'TEC9', id: 32, ammo: 50 },
        { name: 'RIFLE', id: 33, ammo: 10 },
        { name: 'SNIPER RIFLE', id: 34, ammo: 10 },
        { name: 'ROCKET LAUNCHER', id: 35, ammo: 8 },
        { name: 'HEAT SEEKING ROCKET LAUNCHER', id: 36, ammo: 8 },
        { name: 'FLAMETHROWER', id: 37, ammo: 250 },
        { name: 'MINIGUN', id: 38, ammo: 250 },
        { name: 'SACHEL CHARGES', id: 39, ammo: 8 },
        { name: 'DETONATOR', id: 40, ammo: 1 },
        { name: 'SPRAY PAINT', id: 41, ammo: 250 },
        { name: 'FIRE EXTINGUISHER', id: 42, ammo: 250 },
        { name: 'CAMERA', id: 43, ammo: 5 },
        { name: 'NIGHT VISION GOGGLES', id: 44, ammo: 1 },
        { name: 'THERMAL GOGGLES', id: 45, ammo: 1 },
        { name: 'PARACHUTE', id: 46, ammo: 1 },
    ];

    let menu: AltMenu = new AltMenu(
        'Weapons', weapons.map(w => ({
            name: w.name,
            enter: function () {
                TIMERA = 0;
            },
            hold: function () {
                if (TIMERA < 250) return;
                TIMERA = 0;
                let model: int = Weapon.GetModel(w.id);
                Streaming.RequestModel(model);
                Streaming.LoadAllModelsNow();
                plc.giveWeapon(w.id, w.ammo);
                Streaming.MarkModelAsNoLongerNeeded(model);
                Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundShopBuy);
            }
        })), {
            selectedBackgroundColour: [255, 127, 127, 155],
            showCounter: true,
            titleColour: [255, 127, 127, 230],
        }
    );

    return menu;
}

function getWeatherMenu(): AltMenu {
    const weather: Item[] = [
        { name: '~p~~h~LS~s~ EXTRASUNNY', id: 0 },
        { name: '~p~~h~LS~s~ SUNNY', id: 1 },
        { name: '~p~~h~LS~s~ EXTRASUNNY SMOG', id: 2 },
        { name: '~p~~h~LS~s~ SUNNY SMOG', id: 3 },
        { name: '~p~~h~LS~s~ CLOUDY', id: 4 },
        { name: '~b~~h~~h~SF~s~ SUNNY', id: 5 },
        { name: '~b~~h~~h~SF~s~ EXTRASUNNY', id: 6 },
        { name: '~b~~h~~h~SF~s~ CLOUDY', id: 7 },
        { name: '~b~~h~~h~SF~s~ RAINY', id: 8 },
        { name: '~b~~h~~h~SF~s~ FOGGY', id: 9 },
        { name: '~y~LV~s~ SUNNY', id: 10 },
        { name: '~y~LV~s~ EXTRASUNNY', id: 11 },
        { name: '~y~LV~s~ CLOUDY', id: 12 },
        { name: '~g~~h~COUNTRYSIDE~s~ EXTRASUNNY', id: 13 },
        { name: '~g~~h~COUNTRYSIDE~s~ SUNNY', id: 14 },
        { name: '~g~~h~COUNTRYSIDE~s~ CLOUDY', id: 15 },
        { name: '~g~~h~COUNTRYSIDE~s~ RAINY', id: 16 },
        { name: '~r~~h~~h~DESERT~s~ EXTRASUNNY', id: 17 },
        { name: '~r~~h~~h~DESERT~s~ SUNNY', id: 18 },
        { name: '~r~~h~~h~DESERT~s~ SANDSTORM', id: 19 },
        { name: 'UNDERWATER', id: 20 },
        { name: 'EXTRACOLOURS 1', id: 21 },
        { name: 'EXTRACOLOURS 2', id: 22 }
    ].map(w => ({
        name: w.name,
        enter: function () {
            Weather.ForceNow(w.id);
        }
    }));

    weather.unshift({
        name: 'Reset',
        enter: function () {
            Weather.SetToAppropriateTypeNow();
        }
    });

    let menu: AltMenu = new AltMenu(
        'Weather', weather, {
            disableHud: true,
            counterPos: { x: 0.03, y: 0.89 },
            itemsPos: { x: 0.03, y: 0.6 },
            selectedBackgroundColour: [255, 190, 120, 127],
            showCounter: true,
            titleColour: [255, 190, 120, 230],
            titlePos: { x: 0.03, y: 0.53 }
        }
    );

    return menu;
}

function getPlayerImmunitiesMenu(): AltMenu {
    let menu: AltMenu = new AltMenu(
        'Player\'s immunities', [
            {   // Bullet
                name: function () {
                    return `Bullet: ${
                        isBitSet(playerProofs, Proofs.Bullet) ? ON : OFF
                    }`;
                },
                click: function () {
                    if (!isBitSet(playerProofs, Proofs.Bullet)) {
                        playerProofs |= Proofs.Bullet;
                    } else {
                        playerProofs &= ~Proofs.Bullet;
                    }
                }
            },
            {   // Fire
                name: function () {
                    return `Fire: ${
                        isBitSet(playerProofs, Proofs.Fire) ? ON : OFF
                    }`;
                },
                click: function () {
                    if (!isBitSet(playerProofs, Proofs.Fire)) {
                        playerProofs |= Proofs.Fire;
                    } else {
                        playerProofs &= ~Proofs.Fire;
                    }
                }
            },
            {   // Explosion
                name: function () {
                    return `Explosion: ${
                        isBitSet(playerProofs, Proofs.Explosion) ? ON : OFF
                    }`;
                },
                click: function () {
                    if (!isBitSet(playerProofs, Proofs.Explosion)) {
                        playerProofs |= Proofs.Explosion;
                    } else {
                        playerProofs &= ~Proofs.Explosion;
                    }
                }
            },
            {   // Collision
                name: function () {
                    return `Collision: ${
                        isBitSet(playerProofs, Proofs.Collision) ? ON : OFF
                    }`;
                },
                click: function () {
                    if (!isBitSet(playerProofs, Proofs.Collision)) {
                        playerProofs |= Proofs.Collision;
                    } else {
                        playerProofs &= ~Proofs.Collision;
                    }
                }
            },
            {   // Melee
                name: function () {
                    return `Melee: ${
                        isBitSet(playerProofs, Proofs.Melee) ? ON : OFF
                    }`;
                },
                click: function () {
                    if (!isBitSet(playerProofs, Proofs.Melee)) {
                        playerProofs |= Proofs.Melee;
                    } else {
                        playerProofs &= ~Proofs.Melee;
                    }
                }
            }
        ], {
            selectedBackgroundColour: [155, 255, 165, 90],
            titleColour: [155, 255, 165, 230],
        }
    );

    return menu;
}

function getVehicleImmunitiesMenu(): AltMenu {
    let menu: AltMenu = new AltMenu(
        'Vehicle\'s immunities', [
            {   // Bullet
                name: function () {
                    return `Bullet: ${
                        isBitSet(carProofs, Proofs.Bullet) ? ON : OFF
                    }`;
                },
                click: function () {
                    if (!isBitSet(carProofs, Proofs.Bullet)) {
                        carProofs |= Proofs.Bullet;
                    } else {
                        carProofs &= ~Proofs.Bullet;
                    }
                }
            },
            {   // Fire
                name: function () {
                    return `Fire: ${
                        isBitSet(carProofs, Proofs.Fire) ? ON : OFF
                    }`;
                },
                click: function () {
                    if (!isBitSet(carProofs, Proofs.Fire)) {
                        carProofs |= Proofs.Fire;
                    } else {
                        carProofs &= ~Proofs.Fire;
                    }
                }
            },
            {   // Explosion
                name: function () {
                    return `Explosion: ${
                        isBitSet(carProofs, Proofs.Explosion) ? ON : OFF
                    }`;
                },
                click: function () {
                    if (!isBitSet(carProofs, Proofs.Explosion)) {
                        carProofs |= Proofs.Explosion;
                    } else {
                        carProofs &= ~Proofs.Explosion;
                    }
                }
            },
            {   // Collision
                name: function () {
                    return `Collision: ${
                        isBitSet(carProofs, Proofs.Collision) ? ON : OFF
                    }`;
                },
                click: function () {
                    if (!isBitSet(carProofs, Proofs.Collision)) {
                        carProofs |= Proofs.Collision;
                    } else {
                        carProofs &= ~Proofs.Collision;
                    }
                }
            },
            {   // Melee
                name: function () {
                    return `Melee: ${
                        isBitSet(carProofs, Proofs.Melee) ? ON : OFF
                    }`;
                },
                click: function () {
                    if (!isBitSet(carProofs, Proofs.Melee)) {
                        carProofs |= Proofs.Melee;
                    } else {
                        carProofs &= ~Proofs.Melee;
                    }
                }
            }
        ], {
            selectedBackgroundColour: [145, 250, 255, 90],
            titleColour: [145, 250, 255, 230],
        }
    );

    return menu;
}

function getPlayerStatsMenu(): AltMenu {
    const stats: { name: string, id: int }[] = [
        { name: 'Fat', id: 21 },
        { name: 'Stamina', id: 22 },
        { name: 'Muscle', id: 23 },
        { name: 'Max Health', id: 24 },
        { name: 'Respect', id: 68 },
        { name: 'Girlfriend respect', id: 65 },
        { name: 'Clothes respect', id: 66 },
        { name: 'Fitness respect', id: 67 },
        { name: 'Respect Mission', id: 224 },
        { name: 'Respect Mission Total', id: 228 },
        { name: 'Total respect', id: 64 },
        { name: 'Pistol Skill', id: 69 },
        { name: 'Silenced Pistol Skill', id: 70 },
        { name: 'Desert Eagle Skill', id: 71 },
        { name: 'Shotgun Skill', id: 72 },
        { name: 'Sawn-Off Shotgun Skill', id: 73 },
        { name: 'Combat Shotgun Skill', id: 74 },
        { name: 'Machine Pistol Skill', id: 75 },
        { name: 'SMG Skill', id: 76 },
        { name: 'AK-47 Skill', id: 77 },
        { name: 'M4 Skill', id: 78 },
        { name: 'Rifle Skill', id: 79 },
        { name: 'Appearance', id: 80 },
        { name: 'Gambling', id: 81 },
        { name: 'Driving skill', id: 160 },
        { name: 'Armor', id: 164 },
        { name: 'Energy', id: 165 },
        { name: 'Flying skill', id: 223 },
        { name: 'Lung capacity', id: 225 },
        { name: 'Bike skill', id: 229 },
        { name: 'Cycling skill', id: 230 },
        { name: 'Luck', id: 233 },
    ];

    let menu: AltMenu = new AltMenu(
        'Player\'s statistics', stats.map(s => ({
            name: function () {
                return `${s.name}: ~y~${
                    s.id < 82 ? Stat.GetFloat(s.id).toFixed(0) : Stat.GetInt(s.id)
                }`;
            },
            description: CHANGE_VALUE,
            display: function () {
                let change = getLeftRight();
                if (change === 0) return;
                if (s.id < 82) {
                    Stat.SetFloat(
                        s.id,
                        clamp(0, Stat.GetFloat(s.id) + change * 5, 1000)
                    );
                } else {
                    Stat.SetInt(
                        s.id,
                        clamp(0, Stat.GetInt(s.id) + change * 5, 1000)
                    );
                }
                plr.buildModel();
            }
        })), {
            selectedBackgroundColour: [170, 145, 180, 90],
            titleColour: [170, 145, 180, 230]
        }
    );

    return menu;
}

function getGangZoneMenu(): AltMenu {
    const gangs: { name: string, id: int }[] = [
        { name: 'BALLAS', id: 0 },
        { name: 'GROVE', id: 1 },
        { name: 'VAGOS', id: 2 },
        { name: 'RIFA', id: 3 },
        { name: 'DA NANG BOYS', id: 4 },
        { name: 'MAFIA', id: 5 },
        { name: 'TRIAD', id: 6 },
        { name: 'AZTECAS', id: 7 },
        { name: 'GANG 9', id: 8 },
        { name: 'GANG 10', id: 9 },
    ];

    let menu: AltMenu = new AltMenu('Gang zone', gangs.map(g => ({
        name: function () {
            let pos = plc.getCoordinates();
            let currentZone = Zone.GetName(pos.x, pos.y, pos.z);
            return `${g.name}: ~y~${Zone.GetGangStrength(currentZone, g.id)}`;
        },
        description: CHANGE_VALUE,
        display: function () {
            let change = getLeftRight();
            if (change === 0) return;
            let pos = plc.getCoordinates();
            let currentZone = Zone.GetName(pos.x, pos.y, pos.z);
            Zone.SetGangStrength(
                currentZone,
                g.id,
                clamp(0, Zone.GetGangStrength(currentZone, g.id) + change, 100)
            );
        }
    })), {
        selectedBackgroundColour: [0, 80, 0, 120],
        showCounter: true,
        titleColour: [220, 0, 220, 230]
    });

    return menu;
}