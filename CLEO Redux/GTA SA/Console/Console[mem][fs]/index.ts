//  Script by Vital (Vitaly Pavlovich Ulyanov)
import { CHANGE_VALUE, plr, plc } from "./sharedConstants";
import { AltMenu } from "../altMenu[mem]";
import {
    Button,
    ButtonGxt,
    Font,
    KeyCode,
    PadId,
    ScriptSound,
    SwitchType,
    WeaponType,
} from "../sa_enums";
import { appearanceMenu } from "./menus/appearance";
import { applyCamOffset, offsetMenu } from "./menus/camOffset";
import { carColMenu } from "./menus/carCols";
import { carMenu } from "./menus/cars";
import { cheatsMenu } from "./menus/cheats";
import { configsMenu } from "./menus/configs";
import { gangZoneMenu } from "./menus/gangZone";
import { helpMenu } from "./menus/help";
import { playerImmunitiesMenu } from "./menus/playerImmunities";
import { playerStatsMenu } from "./menus/playerStats";
import { vehicleImmunitiesMenu } from "./menus/vehicleImmunities";
import { weaponMenu } from "./menus/weapons";
import { weatherMenu } from "./menus/weather";

// Interfaces
interface Vec3 {
    x: float;
    y: float;
    z: float;
}

// Classes
class Matrix {
    entityPointer: int;
    matrixPointer: int;

    constructor(entityPointer: int) {
        this.entityPointer = entityPointer;
        this.matrixPointer = Memory.ReadU32(this.entityPointer + 0x14, false);
    }

    private readVector(pointer: int): Vec3 {
        return {
            x: Memory.ReadFloat(pointer, false),
            y: Memory.ReadFloat(pointer + 4, false),
            z: Memory.ReadFloat(pointer + 8, false),
        };
    }

    private invertVector(vector: Vec3): Vec3 {
        return {
            x: vector.x * -1,
            y: vector.y * -1,
            z: vector.z * -1,
        };
    }

    getRight(): Vec3 {
        return this.readVector(this.matrixPointer);
    }

    getForward(): Vec3 {
        return this.readVector(this.matrixPointer + 0x10);
    }

    getUp(): Vec3 {
        return this.readVector(this.matrixPointer + 0x20);
    }

    getPos(): Vec3 {
        return this.readVector(this.matrixPointer + 0x30);
    }

    getLeft(): Vec3 {
        return this.invertVector(this.getRight());
    }

    getBackward(): Vec3 {
        return this.invertVector(this.getForward());
    }

    getDown(): Vec3 {
        return this.invertVector(this.getUp());
    }
}

// Enumerations
export enum Proofs {
    Bullet = 0b00000100,
    Fire = 0b00001000,
    Explosion = 0b10000000,
    Collision = 0b00010000,
    Melee = 0b00100000,
}

// Constants
const plp: int = Memory.GetPedPointer(plc);
const THIS_PAD: int = Memory.CallFunctionReturn(0x53fb70, 1, 1, 0);
const CPLAYER: int = 0xb7cd98;
const MAX_LENGTH: int = 50;
const LAST_CHAR: int = 0x969110;
const CURSOR: string = "~>~~r~~h~~h~~h~";
const NUM_PAD_BUTTONS: { id: int; char: string }[] = [
    { id: KeyCode.NumPad0, char: "0" },
    { id: KeyCode.NumPad1, char: "1" },
    { id: KeyCode.NumPad2, char: "2" },
    { id: KeyCode.NumPad3, char: "3" },
    { id: KeyCode.NumPad4, char: "4" },
    { id: KeyCode.NumPad5, char: "5" },
    { id: KeyCode.NumPad6, char: "6" },
    { id: KeyCode.NumPad7, char: "7" },
    { id: KeyCode.NumPad8, char: "8" },
    { id: KeyCode.NumPad9, char: "9" },
    { id: KeyCode.Subtract, char: "-" },
    { id: KeyCode.Decimal, char: "." },
];

// Variables
export let playerProofs: int = 0; // Thanks to wmysterio for help with proofs resetting 'bug'
export let carProofs: int = 0;
export let camOffset = {
    offsetX: 0,
    offsetY: 0,
    offsetZ: 0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
};

let toggle: boolean = false;
let cursorPos: int = 0;
let command: string = "";
let cmdHistory: string[] = [];
let historyIndex: int = 0;
let output: string =
    "~s~Console by ~y~Vital~s~. Type ~g~~h~HELP ~s~for more information. Press ~y~Enter ~s~for list of commands.";
let overlay: { red: int; green: int; blue: int; alpha: int } = {
    red: 0,
    green: 0,
    blue: 0,
    alpha: 0,
};
let allProofs = [
    Proofs.Bullet,
    Proofs.Fire,
    Proofs.Explosion,
    Proofs.Collision,
    Proofs.Melee,
];
let sphereRadius: float = 2.0;
let freeCamMult: float = 1.0;
let freeCamInfo: boolean = true;
let freeCam: boolean = false;
let camMatrix: Matrix = new Matrix(0xb6f028);
let toolsMenu: AltMenu = getToolsMenu();
let frameDelta: float;

// List of commands
let cmdList: { name: string; template?: string; action: Function }[] = [
    {
        // Help
        name: "HELP",
        action: function (): boolean {
            wait(0);
            while (helpMenu.isDisplayed()) {
                wait(0);
            }
            clearInput();
            return true;
        },
    },
    {
        // Cheats
        name: "CHEATS",
        action: function (): boolean {
            wait(0);
            while (cheatsMenu.isDisplayed()) {
                wait(0);
            }
            clearInput();
            return true;
        },
    },
    {
        // Configurations
        name: "CONFIGURATIONS",
        action: function (): boolean {
            wait(0);
            while (configsMenu.isDisplayed()) {
                wait(0);
            }
            clearInput();
            return true;
        },
    },
    {
        // Scripting tools
        name: "SCRIPTING TOOLS",
        action: function (): boolean {
            wait(0);
            while (toolsMenu.isDisplayed()) {
                wait(0);
            }
            clearInput();
            return true;
        },
    },
    {
        // Free camera
        name: "FREE CAM",
        action: function (): boolean {
            Text.PrintHelpString(
                `~y~${ButtonGxt.Jump}~s~ - toggle help.~n~~y~${ButtonGxt.EnterExit}~s~ - exit.`,
            );
            Memory.WriteU8(plp + 0x598, 1, false);
            if (freeCamInfo) updateFreeCamInfo();
            let camPos = camMatrix.getPos();
            Camera.SetVectorMove(
                camPos.x,
                camPos.y,
                camPos.z,
                camPos.x,
                camPos.y,
                camPos.z,
                100,
                false,
            );
            freeCam = true;
            toggle = false;
            return true;
        },
    },
    {
        // Health
        name: "HEALTH ",
        template: "HEALTH ~y~int",
        action: function (): boolean {
            let health = command.match(/[\d-]+/);
            if (health) {
                plc.setHealth(+health[0]);
                return true;
            }
            return false;
        },
    },
    {
        // Armour
        name: "ARMOUR ",
        template: "ARMOUR ~y~int 0-100",
        action: function (): boolean {
            let armour = command.match(/\d+/);
            if (armour && +armour[0] > -1 && +armour[0] < 101) {
                plc.addArmor(+armour[0] + plc.getArmor() * -1);
                return true;
            }
            return false;
        },
    },
    {
        // Player's immunities
        name: "PLAYER IMMUNITIES",
        action: function (): boolean {
            wait(0);
            while (playerImmunitiesMenu.isDisplayed()) {
                wait(0);
            }
            clearInput();
            return true;
        },
    },
    {
        // God mode
        name: "GOD ",
        template: "GOD ~y~bool",
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                if (+state[0] === 1) {
                    allProofs.forEach((p) => {
                        playerProofs |= p;
                        carProofs |= p;
                    });
                } else {
                    allProofs.forEach((p) => {
                        playerProofs &= ~p;
                        carProofs &= ~p;
                    });
                }
                return true;
            }
            return false;
        },
    },
    {
        // Never tired
        name: "NEVER TIRED ",
        template: "NEVER TIRED ~y~bool",
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                plr.setNeverGetsTired(+state[0] === 1);
                return true;
            }
            return false;
        },
    },
    {
        // Don't fall from bikes
        name: "STAY ON BIKE ",
        template: "STAY ON BIKE ~y~bool",
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                plc.setCanBeKnockedOffBike(+state === 1);
                return true;
            }
            return false;
        },
    },
    {
        // Appearance
        name: "APPEARANCE",
        action: function (): boolean {
            if (plc.isInAnyCar()) return false;

            wait(0);
            while (appearanceMenu.isDisplayed()) {
                wait(0);
            }
            Camera.Restore();
            clearInput();
            return true;
        },
    },
    {
        // Player statistics
        name: "PLAYER STATISTICS",
        action: function (): boolean {
            wait(0);
            while (playerStatsMenu.isDisplayed()) {
                wait(0);
            }
            clearInput();
            return true;
        },
    },
    {
        // Position
        name: "POS ",
        template: "POS ~y~float(3)",
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
            } else {
                let { x, y, z } = plc.getCoordinates();
                output =
                    command = `POS ${x.toFixed(2)} ${y.toFixed(2)} ${z.toFixed(2)}`;
                cursorPos = command.length;
                return true;
            }
            return false;
        },
    },
    {
        // Teleport to map waypoint
        name: "TO MAP TARGET",
        action: function (): boolean {
            let waypoint = World.GetTargetCoords();
            if (waypoint) {
                Streaming.RequestCollision(waypoint.x, waypoint.y);
                Streaming.LoadScene(waypoint.x, waypoint.y, waypoint.z);
                plc.setCoordinates(waypoint.x, waypoint.y, -100);
                return true;
            } else {
                Text.PrintStringNow("~r~~h~Map target not found!", 2000);
            }
            return false;
        },
    },
    {
        // Heading
        name: "HEADING ",
        template: "HEADING ~y~float 0-360",
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
        },
    },
    {
        // Interior
        name: "INTERIOR ",
        template: "INTERIOR ~y~int 0-18",
        action: function (): boolean {
            let interior = command.match(/\d+/);
            if (interior && +interior[0] > -1 && +interior[0] < 19) {
                Streaming.SetAreaVisible(+interior[0]);
                plc.setAreaVisible(+interior[0]);
                if (plc.isInAnyCar())
                    plc.storeCarIsInNoSave().setAreaVisible(+interior[0]);
                return true;
            } else {
                output = command = `INTERIOR ${Streaming.GetAreaVisible()}`;
                cursorPos = command.length;
            }
            return false;
        },
    },
    {
        // Wanted level
        name: "WANTED ",
        template: "WANTED ~y~int 0-6",
        action: function (): boolean {
            let wanted = command.match(/\d+/);
            if (wanted && +wanted[0] > -1 && +wanted[0] < 7) {
                plr.alterWantedLevel(+wanted[0]);
                return true;
            }
            return false;
        },
    },
    {
        // Maximum wanted level
        name: "MAX WANTED ",
        template: "MAX WANTED ~y~int 0-6",
        action: function (): boolean {
            let maxWanted = command.match(/\d+/);
            if (maxWanted && +maxWanted[0] > -1 && +maxWanted[0] < 7) {
                Game.SetMaxWantedLevel(+maxWanted[0]);
                return true;
            }
            return false;
        },
    },
    {
        // Sensitivity to crime
        name: "SENSITIVITY TO CRIME ",
        template: "SENSITIVITY TO CRIME ~y~float",
        action: function (): boolean {
            let sens = command.match(/[\d.]+/);
            if (sens) {
                Game.SetWantedMultiplier(+sens[0]);
                return true;
            }
            return false;
        },
    },
    {
        // Ignored by police
        name: "IGNORED BY POLICE ",
        template: "IGNORED BY POLICE ~y~bool",
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                Game.SetPoliceIgnorePlayer(plr, +state[0] === 1);
                return true;
            }
            return false;
        },
    },
    {
        // Ignored by pedestrians
        name: "IGNORED BY PEDESTRIANS ",
        template: "IGNORED BY PEDESTRIANS ~y~bool",
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                Game.SetEveryoneIgnorePlayer(plr, +state[0] === 1);
                return true;
            }
            return false;
        },
    },
    {
        // Add money
        name: "ADD MONEY ",
        template: "ADD MONEY ~y~int",
        action: function (): boolean {
            let money = command.match(/[\d-]+/);
            if (money) {
                plr.addScore(+money[0]);
                return true;
            }
            return false;
        },
    },
    {
        // Set money
        name: "SET MONEY ",
        template: "SET MONEY ~y~int",
        action: function (): boolean {
            let money = command.match(/[\d-]+/);
            if (money) {
                plr.addScore(+money[0] + plr.storeScore() * -1);
                return true;
            }
            return false;
        },
    },
    {
        // Weapon
        name: "WEAPON",
        action: function (): boolean {
            wait(0);
            Camera.AttachToChar(
                plc,
                1.45,
                2.05,
                0.8,
                0,
                0,
                0,
                0,
                SwitchType.JumpCut,
            );
            while (weaponMenu.isDisplayed()) {
                wait(0);
            }
            Camera.Restore();
            clearInput();
            return true;
        },
    },
    {
        // Ammo for current weapon
        name: "AMMO ",
        template: "AMMO ~y~int",
        action: function (): boolean {
            let ammo = command.match(/[\d-]+/);
            if (ammo) {
                let weapon = plc.getCurrentWeapon();
                plc.setAmmo(weapon, +ammo[0]);
                return true;
            }
            return false;
        },
    },
    {
        // Remove current weapon
        name: "REMOVE CURRENT WEAPON",
        action: function (): boolean {
            if (!plc.isCurrentWeapon(WeaponType.Unarmed)) {
                plc.removeWeapon(plc.getCurrentWeapon());
                return true;
            }
            return false;
        },
    },
    {
        // Jetpack
        name: "JETPACK",
        action: function (): boolean {
            if (!plc.isInAnyCar() && !plr.isUsingJetpack()) {
                Task.Jetpack(plc);
                return true;
            }
            return false;
        },
    },
    {
        // Time of day
        name: "TIME ",
        template: "TIME ~y~hours: int 0-23 minutes: int 0-59",
        action: function (): boolean {
            let time = command.match(/\d+/g);
            if (time && +time[0] > -1 && +time[0] < 24) {
                Clock.SetTimeOfDay(
                    +time[0],
                    time[1] && +time[1] > -1 && +time[1] < 60 ? +time[1] : 0,
                );
                return true;
            }
            return false;
        },
    },
    {
        // Weather
        name: "WEATHER",
        action: function (): boolean {
            wait(0);
            while (weatherMenu.isDisplayed()) {
                wait(0);
            }
            clearInput();
            return true;
        },
    },
    {
        // Gravity
        name: "GRAVITY ",
        template: "GRAVITY ~y~float",
        action: function (): boolean {
            let gravity = command.match(/[\d.-]+/);
            if (gravity) {
                Memory.WriteFloat(0x863984, +gravity[0], false);
                return true;
            }
            output = command = "GRAVITY 0.008";
            return false;
        },
    },
    {
        // Game speed
        name: "SPEED ",
        template: "SPEED ~y~float",
        action: function (): boolean {
            let speed = command.match(/[\d.-]+/);
            if (speed) {
                Clock.SetTimeScale(+speed[0]);
                return true;
            }
            return false;
        },
    },
    {
        // Vehicle spawner
        name: "SPAWN CAR",
        action: function (): boolean {
            wait(0);
            while (carMenu.isDisplayed()) {
                wait(0);
            }
            Camera.Restore();
            clearInput();
            return true;
        },
    },
    {
        // Vehicle's colours
        name: "CAR COLOUR",
        action: function (): boolean {
            if (!plc.isInAnyCar()) return false;

            wait(0);
            while (carColMenu.isDisplayed()) {
                wait(0);
            }
            clearInput();
            return true;
        },
    },
    {
        // Fix vehicle
        name: "FIX CAR",
        action: function (): boolean {
            if (plc.isInAnyCar()) {
                plc.storeCarIsInNoSave().fix();
                return true;
            }
            return false;
        },
    },
    {
        // Put car back on wheels
        name: "UNFLIP CAR",
        action: function (): boolean {
            if (plc.isInAnyCar()) {
                let vehicle = plc.storeCarIsInNoSave();
                let { x, y, z } = vehicle.getCoordinates();
                vehicle.setCoordinates(x, y, z);
                return true;
            }
            return false;
        },
    },
    {
        // Vehicle's health
        name: "CAR HEALTH ",
        template: "CAR HEALTH ~y~int",
        action: function (): boolean {
            if (plc.isInAnyCar()) {
                let health = command.match(/[\d-]+/);
                if (health) {
                    plc.storeCarIsInNoSave().setHealth(+health[0]);
                    return true;
                }
            }
            return false;
        },
    },
    {
        // Vehicle's immunities
        name: "CAR IMMUNITIES",
        action: function (): boolean {
            wait(0);
            while (vehicleImmunitiesMenu.isDisplayed()) {
                wait(0);
            }
            clearInput();
            return true;
        },
    },
    {
        // Bulletproof tyres
        name: "TYRES BULLETPROOF ",
        template: "TYRES BULLETPROOF ~y~bool",
        action: function (): boolean {
            if (plc.isInAnyCar()) {
                let state = command.match(/[01]/);
                if (state) {
                    plc.storeCarIsInNoSave().setCanBurstTires(+state[0] === 0);
                    return true;
                }
            }
            return false;
        },
    },
    {
        // Bulletproof petrol tank
        name: "PETROL TANK BULLETPROOF ",
        template: "PETROL TANK BULLETPROOF ~y~bool",
        action: function (): boolean {
            if (plc.isInAnyCar()) {
                let state = command.match(/[01]/);
                if (state) {
                    plc.storeCarIsInNoSave().setPetrolTankWeakpoint(
                        +state[0] === 0,
                    );
                    return true;
                }
            }
            return false;
        },
    },
    {
        // Heavy car
        name: "CAR HEAVY ",
        template: "CAR HEAVY ~y~bool",
        action: function (): boolean {
            if (plc.isInAnyCar()) {
                let state = command.match(/[01]/);
                if (state) {
                    plc.storeCarIsInNoSave().setHeavy(+state[0] === 1);
                    return true;
                }
            }
            return false;
        },
    },
    {
        // Car hydraulics
        name: "CAR HYDRAULICS ",
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
        },
    },
    {
        // Heli winch
        name: "HELI WINCH ",
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
        },
    },
    {
        // Clear area
        name: "CLEAR AREA ",
        template: "CLEAR AREA ~y~radius: float",
        action: function (): boolean {
            let radius = command.match(/[\d.]+/);
            if (radius) {
                let { x, y, z } = plc.getCoordinates();
                World.ClearArea(x, y, z, +radius[0], true);
                return true;
            }
            return false;
        },
    },
    {
        // Pedestrians density
        name: "PED DENSITY ",
        template: "PED DENSITY ~y~float",
        action: function (): boolean {
            let density = command.match(/[\d.]+/);
            if (density) {
                World.SetPedDensityMultiplier(+density[0]);
                return true;
            }
            return false;
        },
    },
    {
        // Car density
        name: "CAR DENSITY ",
        template: "CAR DENSITY ~y~float",
        action: function (): boolean {
            let density = command.match(/[\d.]+/);
            if (density) {
                World.SetCarDensityMultiplier(+density[0]);
                return true;
            }
            return false;
        },
    },
    {
        // Burglary houses
        name: "BURGLARY HOUSES ",
        template: "BURGLARY HOUSES ~y~bool",
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                Game.EnableBurglaryHouses(+state[0] === 1);
                return true;
            }
            return false;
        },
    },
    {
        // Aircraft carrier defence
        name: "AIRCRAFT CARRIER DEFENCE ",
        template: "AIRCRAFT CARRIER DEFENCE ~y~bool",
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                Game.SetAircraftCarrierSamSite(+state[0] === 1);
                return true;
            }
            return false;
        },
    },
    {
        // Military base defence
        name: "MILITARY BASE DEFENCE ",
        template: "MILITARY BASE DEFENCE ~y~bool",
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                Game.SetArea51SamSite(+state[0] === 1);
                return true;
            }
            return false;
        },
    },
    {
        // Disable military zones
        name: "DISABLE MILITARY ZONES WANTED LEVEL ",
        template: "DISABLE MILITARY ZONES WANTED LEVEL ~y~bool",
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                Zone.SetDisableMilitaryZones(+state[0] === 1);
                return true;
            }
            return false;
        },
    },
    {
        // Gang war
        name: "GANG WAR ",
        template: "GANG WAR ~y~bool",
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                Game.SetGangWarsActive(+state[0] === 1);
                return true;
            }
            return false;
        },
    },
    {
        // Gang zone
        name: "GANG ZONE",
        action: function (): boolean {
            wait(0);
            while (gangZoneMenu.isDisplayed()) {
                wait(0);
            }
            clearInput();
            return true;
        },
    },
    {
        // Death penalties
        name: "DEATH PENALTIES ",
        template: "DEATH PENALTIES ~y~bool",
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                Game.SwitchDeathPenalties(+state[0] === 1);
                return true;
            }
            return false;
        },
    },
    {
        // Arrest penalties
        name: "ARREST PENALTIES ",
        template: "ARREST PENALTIES ~y~bool",
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                Game.SwitchArrestPenalties(+state[0] === 1);
                return true;
            }
            return false;
        },
    },
    {
        // Free respray
        name: "FREE RESPRAY ",
        template: "FREE RESPRAY ~y~bool",
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                Game.SetFreeResprays(+state[0] === 1);
                return true;
            }
            return false;
        },
    },
    {
        // Disable respray
        name: "DISABLE RESPRAY ",
        template: "DISABLE RESPRAY ~y~bool",
        action: function (): boolean {
            let state = command.match(/[01]/);
            if (state) {
                Game.SetNoResprays(+state[0] === 1);
                return true;
            }
            return false;
        },
    },
    {
        // Colour overlay
        name: "OVERLAY ",
        template: "OVERLAY ~y~red green blue: int(3) 0-255 alpha: int 0-240",
        action: function (): boolean {
            let colour = command.match(/[\d]+/g);
            if (colour && colour.length === 4) {
                overlay.red = +colour[0];
                overlay.green = +colour[1];
                overlay.blue = +colour[2];
                overlay.alpha = +colour[3];

                for (let col in overlay) {
                    let max = col !== "alpha" ? 255 : 240;
                    overlay[col] =
                        overlay[col] > max
                            ? max
                            : overlay[col] < 0
                              ? 0
                              : overlay[col];
                }
                return true;
            } else if (command.trimEnd() === "OVERLAY") {
                overlay.red = Math.floor(Math.random() * 256);
                overlay.green = Math.floor(Math.random() * 256);
                overlay.blue = Math.floor(Math.random() * 256);
                overlay.alpha = Math.floor(Math.random() * 201);
                output = command = `OVERLAY ${overlay.red} ${overlay.green} ${
                    overlay.blue
                } ${overlay.alpha}`;
                return true;
            }
            return false;
        },
    },
];

while (true) {
    wait(0);

    if (!plr.isPlaying()) continue;
    if (Pad.IsKeyPressed(KeyCode.Oem3)) {
        // ~ (`)
        toggle = !toggle;
        if (!freeCam) {
            plr.setControl(!toggle);
        } else {
            if (toggle) resetOutput();
            else if (freeCamInfo) updateFreeCamInfo();
        }
        clearInput();

        while (Pad.IsKeyPressed(KeyCode.Oem3)) {
            if (toggle) drawConsole();
            else drawOverlay();
            wait(0);
        }
    }

    // Calculate frame delta (usually 1.66)
    frameDelta = Memory.ReadFloat(0xb7cb5c, false);

    // Execute always
    setProofs();
    freeCamera();
    drawOverlay();

    // Execute only with open console
    if (!toggle) continue;
    getInput();
    lockPlayer();
    drawConsole();
    processInputControls();
}

// Functions
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
    if (
        Pad.IsKeyPressed(KeyCode.Right) &&
        cursorPos < command.length &&
        TIMERA > (Pad.IsKeyPressed(KeyCode.Shift) ? 19 : 119)
    ) {
        Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundRestaurantTrayCollision);
        moveCursor(1);
        TIMERA = 0;
        return;
    }

    // Left [move cursor right]
    if (
        Pad.IsKeyPressed(KeyCode.Left) &&
        cursorPos > 0 &&
        TIMERA > (Pad.IsKeyPressed(KeyCode.Shift) ? 19 : 119)
    ) {
        Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundRestaurantTrayCollision);
        moveCursor(-1);
        TIMERA = 0;
        return;
    }

    // Up [previous command from history]
    if (Pad.IsKeyPressed(KeyCode.Up) && cmdHistory.length > 0 && TIMERA > 199) {
        if (command !== "") {
            historyIndex = ringClamp(
                0,
                historyIndex - 1,
                cmdHistory.length - 1,
            );
        }
        Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundPedCollapse);
        command = cmdHistory[historyIndex];
        output = `${command} ~s~(${historyIndex + 1}/${cmdHistory.length})`;
        cursorPos = cmdHistory[historyIndex].length;
        TIMERA = 0;
    }

    // Down [next command from history]
    if (
        Pad.IsKeyPressed(KeyCode.Down) &&
        cmdHistory.length > 0 &&
        TIMERA > 199
    ) {
        if (command !== "") {
            historyIndex = ringClamp(
                0,
                historyIndex + 1,
                cmdHistory.length - 1,
            );
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
        command = output = "";
        cursorPos = 0;
        return;
    }

    // Backspace [delete previous character]
    if (
        Pad.IsKeyPressed(KeyCode.Back) &&
        command.length > 0 &&
        cursorPos > 0 &&
        TIMERA > (Pad.IsKeyPressed(KeyCode.Shift) ? 29 : 119)
    ) {
        Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundBaseballBatHitPed);
        output = command =
            command.substring(0, cursorPos - 1) + command.substring(cursorPos);
        moveCursor(-1);
        TIMERA = 0;
    }

    // Delete [delete next character]
    if (
        Pad.IsKeyPressed(KeyCode.Delete) &&
        command.length > 0 &&
        cursorPos < command.length &&
        TIMERA > (Pad.IsKeyPressed(KeyCode.Shift) ? 29 : 119)
    ) {
        Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundBaseballBatHitPed);
        output = command =
            command.substring(0, cursorPos) + command.substring(cursorPos + 1);
        TIMERA = 0;
    }

    // Enter [run command]
    if (Pad.IsKeyPressed(KeyCode.Return)) {
        while (Pad.IsKeyPressed(KeyCode.Return)) {
            wait(0);
            drawConsole();
            drawOverlay();
        }
        // If the command is not found, start search
        if (!runCommand()) searchCommands();
    }

    // Tab [autocompletion]
    if (Pad.IsKeyPressed(KeyCode.Tab)) {
        while (Pad.IsKeyPressed(KeyCode.Tab)) {
            wait(0);
            drawConsole();
            drawOverlay();
        }

        let results = cmdList.filter((c) =>
            c.name.startsWith(command.substring(0, cursorPos)),
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
                wait(0);
                drawConsole();
                drawOverlay();
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

function resetOutput() {
    output = command;
}

function moveCursor(distance: int) {
    cursorPos = clamp(0, cursorPos + distance, command.length);
}

function addCharacter(char: string) {
    if (command.length >= MAX_LENGTH) return;
    output = command =
        command.substring(0, cursorPos) +
        char.toUpperCase() +
        command.substring(cursorPos);
    moveCursor(1);
    clearInput();
    Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundAmmunationGunCollision);
}

function lockPlayer() {
    if (!freeCam) plr.setControl(false);
    Memory.WriteU16(0xb73472, 0, false); // Disable changing camera view
}

function searchCommands() {
    Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundRouletteNoCash);
    let results = cmdList
        .filter((c) => c.name.includes(command))
        .map((c) => ({
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
            },
        }));

    if (results.length === 0) {
        Text.PrintStringNow("~r~~h~Nothing found!", 3000);
        return;
    }

    let search = new AltMenu("Console search", results, {
        showCounter: true,
    });
    output = command = "";
    while (search.isDisplayed() && command.length === 0) {
        wait(0);
    }
    clearInput();
}

export function runCommand(input: string = command): boolean {
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
                    cmdHistory.push(
                        cmd.name.endsWith(" ") ? command : cmd.name,
                    );
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
    FxtStore.insert(
        "CONSOLE",
        `${
            output.substring(0, cursorPos) +
            (toggle ? CURSOR : "") +
            output.substring(cursorPos)
        }~s~`,
        true,
    );

    Text.UseCommands(true);
    Text.SetFont(Font.Menu);
    Text.SetColor(190, 255, 190, 255);
    Text.SetDropshadow(1, 0, 0, 0, 255);
    Text.SetScale(0.3, 1.8);
    Text.SetWrapX(640);
    Hud.DrawRect(320, 436, 641, 24, 0, 0, 0, 200);
    Text.Display(12, 428, "CONSOLE");
    Text.UseCommands(false);
}

function drawOverlay() {
    if (overlay.alpha > 0) {
        Text.UseCommands(true);
        Hud.DrawRect(
            320,
            224,
            641,
            449,
            overlay.red,
            overlay.green,
            overlay.blue,
            overlay.alpha,
        );
        Text.UseCommands(false);
    }
}

function updateFreeCamInfo() {
    let camPos = camMatrix.getPos();
    let camFwd = camMatrix.getForward();

    const speed: string = `~y~${freeCamMult.toFixed(1)}~s~`;
    const pos: string = [camPos.x, camPos.y, camPos.z]
        .map((v) => v.toFixed(2))
        .join(" ");
    const target: string = [camFwd.x, camFwd.y, camFwd.z]
        .map((v) => v.toFixed(2))
        .join(" ");

    output = `~s~SPEED: ~y~${speed}~s~. POSITION: ~y~${pos}~s~. TARGET: ~y~${target}~s~.`;
}

function freeCamera() {
    if (!freeCam) return;
    if (!toggle && enterCarJustPressed()) {
        // Exit
        let pos = camMatrix.getPos();

        Memory.WriteU8(plp + 0x598, 0, false);
        plr.setControl(true);
        plc.setCoordinates(
            pos.x,
            pos.y,
            World.GetGroundZFor3DCoord(pos.x, pos.y, pos.z),
        );
        Camera.PersistPos(false);
        Camera.SetBehindPlayer();
        resetOutput();

        freeCam = false;
        return;
    }

    // Toggle help
    if (jumpJustPressed()) {
        freeCamInfo = !freeCamInfo;
        if (!freeCamInfo) resetOutput();
        else updateFreeCamInfo();
    }

    let camPos = camMatrix.getPos();
    let changeX = Pad.GetPositionOfAnalogueSticks(0).leftStickX;
    let changeY = Pad.GetPositionOfAnalogueSticks(0).leftStickY;

    plc.setCoordinates(camPos.x, camPos.y, -90);
    Camera.PersistPos(true);

    // Movement speed
    if (
        Pad.IsButtonPressed(PadId.Pad1, Button.RightShoulder2) &&
        TIMERA > 149
    ) {
        freeCamMult = clamp(0.1, freeCamMult + 0.1, 5);
        updateFreeCamInfo();
        TIMERA = 0;
    }
    if (Pad.IsButtonPressed(PadId.Pad1, Button.LeftShoulder2) && TIMERA > 149) {
        freeCamMult = clamp(0.1, freeCamMult - 0.1, 5);
        updateFreeCamInfo();
        TIMERA = 0;
    }

    // Camera speed boost while holding `Sprint` button
    let boost = Pad.IsButtonPressed(PadId.Pad1, Button.Cross) ? 3 : 1;

    // Add camera left/right vector
    if (changeX !== 0) {
        let added: Vec3 =
            changeX < 0 ? camMatrix.getRight() : camMatrix.getLeft();

        camPos.x += added.x * freeCamMult * boost * 0.45;
        camPos.y += added.y * freeCamMult * boost * 0.45;
        camPos.z += added.z * freeCamMult * boost * 0.45;
    }

    // Add camera forward/backward vector
    if (changeY !== 0) {
        let added: Vec3 =
            changeY < 0 ? camMatrix.getForward() : camMatrix.getBackward();

        camPos.x += added.x * freeCamMult * boost;
        camPos.y += added.y * freeCamMult * boost;
        camPos.z += added.z * freeCamMult * boost;
    }

    // Move camera
    if (!toggle && (changeX !== 0 || changeY !== 0)) {
        // Update camera position
        Camera.SetVectorMove(
            camPos.x,
            camPos.y,
            camPos.z,
            camPos.x,
            camPos.y,
            camPos.z,
            100,
            false,
        );
        // Update player's heading
        let forward = camMatrix.getForward();
        plc.setHeading(Math.GetHeadingFromVector2D(forward.x, forward.y));
    }

    // Update and draw info
    if (freeCamInfo && !toggle) {
        if (
            changeX !== 0 ||
            changeY !== 0 ||
            Mouse.GetMovement().deltaX !== 0 ||
            Mouse.GetMovement().deltaY !== 0
        ) {
            updateFreeCamInfo();
        }
        Text.PrintStringNow(
            `~y~${ButtonGxt.NextWeapon}~s~/~y~${ButtonGxt.PreviousWeapon}~s~ - change speed.~n~~y~${ButtonGxt.Sprint}~s~ - speed up. ~y~${ButtonGxt.EnterExit}~s~ - exit.`,
            0,
        );
        drawConsole();
    }
}

export function clamp(min: number, value: number, max: number): number {
    return value < min ? min : value > max ? max : value;
}

function ringClamp(min: number, value: number, max: number): number {
    return value < min ? max : value > max ? min : value;
}

function setProofs() {
    if (playerProofs !== 0) {
        Memory.WriteU8(plp + 0x42, playerProofs, false);
    }
    if (plc.isInAnyCar() && carProofs !== 0) {
        Memory.WriteU8(
            Memory.GetVehiclePointer(plc.storeCarIsInNoSave()) + 0x42,
            carProofs,
            false,
        );
    }
}

export function getLeftRight(): number {
    let offset = Pad.GetPositionOfAnalogueSticks(0).leftStickX;
    if (offset === 0) return 0;
    if (TIMERA > (Pad.IsButtonPressed(PadId.Pad1, Button.Cross) ? 0 : 199)) {
        TIMERA = 0;
        return offset > 0 ? 1 : -1;
    }
    return 0;
}

function jumpJustPressed(): boolean {
    return Memory.Fn.ThiscallU8(0x53ef20, THIS_PAD)() !== 0;
}

function enterCarJustPressed(): boolean {
    return Memory.Fn.ThiscallU8(0x53ef40, THIS_PAD)() !== 0;
}

export function isBitSet(variable: number, mask: number): boolean {
    return (variable & mask) !== 0;
}

export function setImmunity(player: boolean, immunity: Proofs, state: boolean) {
    if (state) {
        // Enable
        if (player) playerProofs |= immunity;
        else carProofs |= immunity;
    } else {
        // Disable
        if (player) playerProofs &= ~immunity;
        else carProofs &= ~immunity;
    }
}

// Scripting tools
function getToolsMenu(): AltMenu {
    let menu: AltMenu = new AltMenu(
        "Scripting tools",
        [
            {
                // Camera offset
                name: "Camera offset",
                description:
                    "Calculate offsets for ~y~Camera.AttachToChar~s~ command",
                click: function () {
                    wait(0);
                    applyCamOffset();
                    while (offsetMenu.isDisplayed()) {
                        wait(0);
                    }
                    Camera.Restore();
                },
            },
            {
                // Sphere radius
                name: "Sphere radius",
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
                        sphereRadius = clamp(
                            0.5,
                            sphereRadius + change * 0.1,
                            100,
                        );
                    }
                },
            },
        ],
        {
            selectedBackgroundColour: [200, 250, 255, 90],
            showCounter: true,
            titleColour: [200, 250, 255, 230],
        },
    );

    return menu;
}
