//  Script by Vital (Vitaly Pavlovich Ulyanov)
import { Button, PadId, ScriptSound, WeaponType } from "../sa_enums";
import { AltMenu } from "../altMenu[mem]";

enum Texts {
    TITLE = "Extended controls",
    STATE = "State: ",
    STATE_DESCR = "Enable or disable this feature",
    OFF = "~r~~h~OFF",
    ON = "~g~~h~ON",

    TOGGLE_AIM = "Toggle aim~s~: ",
    TOGGLE_WALK = "Toggle walk~s~: ",
    TOGGLE_SPRINT = "Toggle sprint~s~: ",
    TURN_WITH_CAMERA = "Turn player with camera: ",
    AIM_ON_SHOOT = "Aim while shooting: ",
    CAMERA_DRIVEBY = "Camera-dependent drive-by: ",
    DRIVEBY_FREE_AIM = "Free aiming during drivey-by: ",
    ALT_MOUSE_STEERING_ITEM = "~>~ Alternative mouse steering",
    ALT_MOUSE_STEERING_TITLE = "Alternative mouse steering",
    INVERT_Y = "Invert Y axis: ",
    KEEP_CAM_BEHIND_CAR = "Camera lock: ",

    TOGGLE_AIM_DESCR = "Press ~y~~k~~PED_LOCK_TARGET~ ~s~to toggle aiming",
    TOGGLE_WALK_DESCR = "Press ~y~~k~~SNEAK_ABOUT~ ~s~to toggle walking",
    TOGGLE_SPRINT_DESCR = "Press ~y~~k~~PED_SPRINT~ ~s~to toggle sprinting",
    TURN_WITH_CAMERA_DESCR = "The player always faces the camera's direction",
    AIM_ON_SHOOT_DESCR = "Shooting enables aiming",
    CAMERA_DRIVEBY_DESCR = "Drive-by direction matches camera direction",
    DRIVEBY_FREE_AIM_DESCR = "Enable free aiming when shooting from vehicles",
    ALT_MOUSE_STEERING_DESCR = "Press ~y~~k~~VEHICLE_MOUSELOOK~ ~s~to toggle alternative mouse steering in vehicles",
    INVERT_Y_DESCR = "Invert mouse Y axis during mouse steering",
    KEEP_CAM_BEHIND_CAR_DESCR = "Lock the camera behind the vehicle while driving",
}

const CAM_FORWARD = Memory.ReadU32(0xb6f028 + 0x14, false) + 0x10;
const plr: Player = new Player(0);
const plc: Char = plr.getChar();
const plp: int = Memory.GetPedPointer(plc);

let AIM = {
    address: 0xb73464,
    size: 2,
    state: loadSetting("toggle_aim") ?? false,
    onShoot: loadSetting("aim_on_shoot") ?? false,
    toggle: false,
};
let WALK = {
    address: 0xb73482,
    size: 2,
    state: loadSetting("toggle_walk") ?? false,
    toggle: false,
};
let SPRINT = {
    address: 0xb73478,
    size: 2,
    state: loadSetting("toggle_sprint") ?? false,
    toggle: false,
};
let VEHICLE = {
    camDriveBy: loadSetting("driveby_camera") ?? false,
    freeAim: loadSetting("driveby_free_aim") ?? false,
    freeAimAddress: 0x969179,
};
let MOUSE = {
    address: 0xb73484,
    size: 2,
    state: loadSetting("alt_mouse_steering") ?? false,
    invertY: loadSetting("alt_mouse_steering_invert_y") ?? true,
    camLock: loadSetting("alt_mouse_steering_cam_lock") ?? true,
    toggle: loadSetting("alt_mouse_steering") ?? false,
    steering: 0xc1cc02,
    flying: 0xc1cc03,
    normalY: 0xba6745,
};
let turnWithCam = loadSetting("turn_with_cam") ?? false;

// Both flags cannot be true at the same time
if (VEHICLE.camDriveBy === true && VEHICLE.freeAim === true) {
    VEHICLE.camDriveBy = false;
    VEHICLE.freeAim = false;
}

let altMouseSteeringMenu: AltMenu = new AltMenu(
    Texts.ALT_MOUSE_STEERING_TITLE,
    [
        {
            // Turn ON/OFF
            name: function () {
                return `${Texts.STATE}${MOUSE.state ? Texts.ON : Texts.OFF}`;
            },
            description: Texts.STATE_DESCR,
            click: function () {
                MOUSE.state = !MOUSE.state;
                saveSetting("alt_mouse_steering", +MOUSE.state);
            },
        },
        {
            // Invert mouse Y
            name: function () {
                return `${Texts.INVERT_Y}${MOUSE.invertY ? Texts.ON : Texts.OFF}`;
            },
            description: Texts.INVERT_Y_DESCR,
            click: function () {
                MOUSE.invertY = !MOUSE.invertY;
                saveSetting("alt_mouse_steering_invert_y", +MOUSE.invertY);
            },
        },
        {
            // Keep camera behind
            name: function () {
                return `${Texts.KEEP_CAM_BEHIND_CAR}${MOUSE.camLock ? Texts.ON : Texts.OFF}`;
            },
            description: Texts.KEEP_CAM_BEHIND_CAR_DESCR,
            click: function () {
                MOUSE.camLock = !MOUSE.camLock;
                saveSetting("alt_mouse_steering_cam_lock", +MOUSE.camLock);
            },
        },
    ],
    {
        addHelp: false,
    },
);

let menu: AltMenu = new AltMenu(Texts.TITLE, [
    {
        // Alternative mouse steering
        name: Texts.ALT_MOUSE_STEERING_ITEM,
        description: Texts.ALT_MOUSE_STEERING_DESCR,
        click: function () {
            wait(0); // Skip one frame to avoid clicking submenu's options
            while (altMouseSteeringMenu.isDisplayed()) {
                wait(0);
            }
        },
    },
    {
        // Toggle aim
        name: function () {
            return `${Texts.TOGGLE_AIM}${AIM.state ? Texts.ON : Texts.OFF}`;
        },
        description: Texts.TOGGLE_AIM_DESCR,
        click: function () {
            AIM.state = !AIM.state;
            saveSetting("toggle_aim", +AIM.state);
        },
    },
    {
        // Toggle walk
        name: function () {
            return `${Texts.TOGGLE_WALK}${WALK.state ? Texts.ON : Texts.OFF}`;
        },
        description: Texts.TOGGLE_WALK_DESCR,
        click: function () {
            WALK.state = !WALK.state;
            saveSetting("toggle_walk", +WALK.state);
        },
    },
    {
        // Toggle sprint
        name: function () {
            return `${Texts.TOGGLE_SPRINT}${SPRINT.state ? Texts.ON : Texts.OFF}`;
        },
        description: Texts.TOGGLE_SPRINT_DESCR,
        click: function () {
            SPRINT.state = !SPRINT.state;
            saveSetting("toggle_sprint", +SPRINT.state);
        },
    },
    {
        // Turn with camera
        name: function () {
            return `${Texts.TURN_WITH_CAMERA}${turnWithCam ? Texts.ON : Texts.OFF}`;
        },
        description: Texts.TURN_WITH_CAMERA_DESCR,
        click: function () {
            turnWithCam = !turnWithCam;
            saveSetting("turn_with_cam", +turnWithCam);
        },
    },
    {
        // Aim on shooting
        name: function () {
            return `${Texts.AIM_ON_SHOOT}${AIM.onShoot ? Texts.ON : Texts.OFF}`;
        },
        description: Texts.AIM_ON_SHOOT_DESCR,
        click: function () {
            AIM.onShoot = !AIM.onShoot;
            saveSetting("aim_on_shoot", +AIM.onShoot);
        },
    },
    {
        // Camera-dependent drive-by
        name: function () {
            return `${Texts.CAMERA_DRIVEBY}${VEHICLE.camDriveBy ? Texts.ON : Texts.OFF}`;
        },
        description: Texts.CAMERA_DRIVEBY_DESCR,
        click: function () {
            VEHICLE.camDriveBy = !VEHICLE.camDriveBy;
            VEHICLE.freeAim = false;
            saveSetting("driveby_camera", +VEHICLE.camDriveBy);
            saveSetting("driveby_free_aim", +VEHICLE.freeAim);
        },
    },
    {
        // Free aim during drive-by
        name: function () {
            return `${Texts.DRIVEBY_FREE_AIM}${VEHICLE.freeAim ? Texts.ON : Texts.OFF}`;
        },
        description: Texts.DRIVEBY_FREE_AIM_DESCR,
        click: function () {
            VEHICLE.freeAim = !VEHICLE.freeAim;
            VEHICLE.camDriveBy = false;
            saveSetting("driveby_free_aim", +VEHICLE.freeAim);
            saveSetting("driveby_camera", +VEHICLE.camDriveBy);
        },
    },
    {
        // Author
        name: "Author: ~r~~h~Vital~s~ (Vitaly Ulyanov)",
        description: "https://github.com/~y~VitalRus95",
    },
]);

Memory.WriteU16(0x522423, 0x9090, true); // Prevent camera from resetting while free aiming in cars.
// Taken from `Use Weapons While Driving (Remake)` script by ThirteenAG, Junior_Djjr, Zacthe_nerd.

while (true) {
    wait(0);

    if (!plr.isPlaying()) continue;
    if (Pad.TestCheat("CONTR")) {
        Camera.SetDarknessEffect(true, 127);
        while (menu.isDisplayed()) {
            wait(0);
        }
        Camera.SetDarknessEffect(false, 0);
    }
    if (AIM.state) toggleAim();
    if (WALK.state) toggleWalk();
    if (SPRINT.state) toggleSprint();
    if (AIM.onShoot) aimWhileShooting();
    if (turnWithCam) turnPlayerWithCamera();

    if (VEHICLE.camDriveBy) vehicleCameraDriveBy();
    if (VEHICLE.freeAim) vehicleFreeAim();
    if (MOUSE.state) alternativeMouseStering();
}

function saveSetting(setting: string, value: int) {
    IniFile.WriteInt(value, "./settings.ini", "SETTINGS", setting);
}

function loadSetting(setting: string): boolean {
    return IniFile.ReadInt("./settings.ini", "SETTINGS", setting) === 1;
}

function isButtonPressed(address: int, size: int): boolean {
    let compare = size === 1 ? 128 : 255; // Size is either 1 or 2 bytes

    if (Memory.Read(address, size, false) === compare) {
        while (Memory.Read(address, size, false) === compare) {
            wait(0);
        }
        return true;
    }
    return false;
}

function isButtonJustPressed(address: int, size: int): boolean {
    let compare = size === 1 ? 128 : 255; // Size is either 1 or 2 bytes

    if (
        Memory.Read(address, size, false) === compare &&
        Memory.Read(address + 0x30, size, false) === 0
    ) {
        return true;
    }
    return false;
}

function emulateButton(address: int, size: int) {
    let value = size === 1 ? 128 : 255;
    Memory.Write(address, size, value, false);
}

function toggleAim() {
    if (!plr.isControlOn()) return;
    if (plc.isInAnyCar()) return;
    if (
        Pad.IsButtonPressed(PadId.Pad1, Button.LeftShoulder2) && // Previous weapon
        !plr.isUsingJetpack()
    )
        return;
    if (
        Pad.IsButtonPressed(PadId.Pad1, Button.RightShoulder2) && // Next weapon
        !plr.isUsingJetpack()
    )
        return;
    if (
        Pad.IsButtonPressed(PadId.Pad1, Button.Cross) && // Sprint
        !plc.isCurrentWeapon(WeaponType.Camera) &&
        !plc.isCurrentWeapon(WeaponType.Sniper) &&
        !plc.isCurrentWeapon(WeaponType.RocketLauncher) &&
        !plc.isCurrentWeapon(WeaponType.RocketLauncherHs) &&
        !plr.isUsingJetpack()
    ) {
        AIM.toggle = false;
    }
    if (isButtonPressed(AIM.address, AIM.size)) {
        AIM.toggle = !AIM.toggle;
    }
    if (!AIM.toggle) return;

    emulateButton(AIM.address, AIM.size);
}

function toggleWalk() {
    if (!plr.isControlOn()) return;
    if (plc.isInAnyCar()) return;
    if (Pad.IsButtonPressed(PadId.Pad1, Button.Cross)) return; // Sprint
    if (isButtonPressed(WALK.address, WALK.size)) {
        WALK.toggle = !WALK.toggle;
    }
    if (!WALK.toggle) return;

    emulateButton(WALK.address, WALK.size);
}

function toggleSprint() {
    if (!plr.isControlOn()) return;
    if (plc.isInAnyCar()) return;
    if (
        plc.isStopped() ||
        Pad.IsButtonPressed(PadId.Pad1, Button.RightShoulder1)
    ) {
        SPRINT.toggle = false;
        return;
    }
    if (isButtonPressed(SPRINT.address, SPRINT.size)) {
        SPRINT.toggle = !SPRINT.toggle;
    }
    if (!SPRINT.toggle) return;

    emulateButton(SPRINT.address, SPRINT.size);
}

function turnPlayerWithCamera() {
    if (!plr.isControlOn()) return;
    if (plc.isInAnyCar()) return;
    if (!plc.isStopped()) return;
    if (!plr.canStartMission()) return;
    if (Pad.IsButtonPressed(PadId.Pad1, Button.Rightshock)) return;

    let camRotation = Memory.ReadFloat(0xb7684c, false);
    Memory.WriteFloat(plp + 0x55c, camRotation, false);
}

function aimWhileShooting() {
    if (!plr.isControlOn()) return;
    if (plc.isInAnyCar()) return;
    if (Pad.IsButtonPressed(PadId.Pad1, Button.RightShoulder1)) return;
    if (!Pad.IsButtonPressed(PadId.Pad1, Button.Circle)) return;
    if ([0, 1, 8, 10, 11].includes(Weapon.GetSlot(plc.getCurrentWeapon())))
        return;
    // Fists, melee, throwable, gifts, parachute/goggles

    emulateButton(AIM.address, AIM.size);
}

function vehicleCameraDriveBy() {
    if (!plr.isControlOn()) return;
    if (!plc.isInAnyCar()) return;
    if (plc.isInAnyHeli()) return;
    if (plc.isInAnyPlane()) return;
    if (plc.isInAnyTrain()) return;
    if (!Pad.IsButtonPressed(PadId.Pad1, Button.LeftShoulder1)) return;
    if (Pad.IsButtonPressed(PadId.Pad1, Button.LeftShoulder2)) return; // Look left
    if (Pad.IsButtonPressed(PadId.Pad1, Button.RightShoulder2)) return; // Look right

    let vehPointer = Memory.GetVehiclePointer(plc.storeCarIsInNoSave());
    let vehRightPointer = Memory.ReadU32(vehPointer + 0x14, false);
    let camForward = {
        x: Memory.ReadFloat(CAM_FORWARD, false),
        y: Memory.ReadFloat(CAM_FORWARD + 4, false),
        z: Memory.ReadFloat(CAM_FORWARD + 8, false),
    };
    let vehRight = {
        x: Memory.ReadFloat(vehRightPointer, false),
        y: Memory.ReadFloat(vehRightPointer + 4, false),
        z: Memory.ReadFloat(vehRightPointer + 8, false),
    };
    let dotProduct =
        camForward.x * vehRight.x +
        camForward.y * vehRight.y +
        camForward.z * vehRight.z;

    if (dotProduct < -0.7) {
        emulateButton(0xb73462, 2); // Look left
    } else if (dotProduct > 0.7) {
        emulateButton(0xb73466, 2); // Look right
    }
}

function vehicleFreeAim() {
    if (!plr.isControlOn()) return;
    if (!plc.isInAnyCar()) return;
    if (plc.isInAnyHeli()) return;
    if (plc.isInAnyPlane()) return;
    if (plc.isInAnyTrain()) return;
    if (Pad.IsButtonPressed(PadId.Pad1, Button.LeftShoulder1)) {
        if (Memory.ReadU8(VEHICLE.freeAimAddress, false) === 0) {
            Memory.WriteU8(VEHICLE.freeAimAddress, 1, false);
        }
    } else {
        if (Memory.ReadU8(VEHICLE.freeAimAddress, false) === 1) {
            Memory.WriteU8(VEHICLE.freeAimAddress, 0, false);
            plc.clearTasks();
        }
    }
}

function alternativeMouseStering() {
    Memory.WriteU8(
        MOUSE.normalY,
        MOUSE.invertY && MOUSE.toggle && plc.isInAnyCar() && plr.isControlOn()
            ? 0
            : 1,
        false,
    );
    if (!plr.isControlOn()) return;
    if (!plc.isInAnyCar()) return;
    if (isButtonJustPressed(MOUSE.address, MOUSE.size)) {
        MOUSE.toggle = !MOUSE.toggle;
        Memory.WriteU8(MOUSE.steering, +MOUSE.toggle, false);
        Memory.WriteU8(MOUSE.flying, +MOUSE.toggle, false);
        Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundShopBuyDenied);
    }
    if (!MOUSE.toggle) return;

    let offset = Mouse.GetMovement();

    if (offset.deltaX !== 0 || offset.deltaY !== 0) {
        Memory.WriteU8(MOUSE.steering, 1, false);
        Memory.WriteU8(MOUSE.flying, 1, false);
    } else {
        Memory.WriteU8(MOUSE.steering, 0, false);
        Memory.WriteU8(MOUSE.flying, 0, false);
    }

    if (
        MOUSE.camLock &&
        Pad.IsButtonPressed(PadId.Pad1, Button.Cross) && // Accelerate
        !Pad.IsButtonPressed(PadId.Pad1, Button.Square) // Brake/reverse
    ) {
        Camera.SetBehindPlayer();
    }
}
