// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import {
    clamp,
    getCameraMode,
    getCameraRotation,
    PLAYER,
} from "./vc_funcs.mts";
import { CameraMode } from "./vc_enums.mts";

// Thanks to Miran for a safer approach to change FOV value in memory
const FOV_PLAYER: int = 0x47beb1;
const FOV_VEHICLE: int = 0x47ff28;
const DEFAULT_FOV: float = 70;
const MAX_FLYING_FOV: float = 80;
const MAX_VEHICLE_FOV: float = 85;
const MAX_FOV: float = 95;
const STEP: float = (MAX_FOV - DEFAULT_FOV) / 0.785;

// Try to fix disappearing water on the edges of the screen
// Thanks to Fix and ThirteenAG
Memory.WriteFloat(0x69cd7c, 10000, true);
Memory.WriteFloat(0x69cd80, 10000, true);

while (true) {
    wait(0);

    if (!PLAYER.isPlaying()) continue;
    if (!isMouseAndKeyboardUsed()) continue;
    if (isIn1stPersonWeaponMode()) continue;

    if (PLAYER.isInAnyCar()) {
        processCarFov();
    } else {
        processPlayerFov();
    }
}

function isMouseAndKeyboardUsed(): boolean {
    return Memory.ReadU8(0xa10b4c, false) !== 0;
}

function isIn1stPersonWeaponMode(): boolean {
    switch (getCameraMode()) {
        case CameraMode.Sniper:
        case CameraMode.RocketLauncher:
        case CameraMode.M16FirstPerson:
        case CameraMode.HelicannonFirstPerson:
        case CameraMode.Camera:
            return true;
        default:
            return false;
    }
}

function processCarFov() {
    let veh: Car = PLAYER.storeCarIsInNoSave();
    let speed: float = veh.getSpeed();
    let newFov: float = clamp(
        DEFAULT_FOV,
        DEFAULT_FOV + speed * 0.55,
        PLAYER.isInFlyingVehicle() ? MAX_FLYING_FOV : MAX_VEHICLE_FOV,
    );
    Memory.WriteFloat(FOV_VEHICLE, newFov, true);
}

function processPlayerFov() {
    let camY = getCameraRotation().y;
    if (camY > 0) {
        let newFov: float = clamp(
            DEFAULT_FOV,
            DEFAULT_FOV + camY * STEP,
            MAX_FOV,
        );
        Memory.WriteFloat(FOV_PLAYER, newFov, true);
    } else {
        Memory.WriteFloat(FOV_PLAYER, DEFAULT_FOV, true);
    }
}
