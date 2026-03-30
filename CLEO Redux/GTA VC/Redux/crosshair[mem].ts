// Script by Vital (Vitaly Pavlovich Ulyanov)
// Thanks to Fix for help with memory stuff!
// GTA: Vice City v1.0 required
import { isMouseAndKeyboardUsed, PLAYER } from "./vc_funcs.mts";
import { Button, PadId, WeaponType } from "./vc_enums.mts";

const BIG_CROSSHAIR_ALPHA: int = 0x557643 + 1; // Ruger, M4, M60
const SMALL_CROSSHAIR_ALPHA: int = 0x557727 + 1; // Other weapons

let aimMode: boolean = false;

// NOP 3 conditions to get rid of M4, M60, and Ruger 1st person mode
Memory.Write(0x5349d8, 3, 0x90, true); // M4 check
Memory.Write(0x5349dd, 3, 0x90, true); // Ruger check
Memory.Write(0x5349e2, 3, 0x90, true); // M60 check

// Big crosshair's red, green, and blue channels
Memory.WriteU8(0x557652 + 1, 255, true);
Memory.WriteU8(0x55764d + 1, 200, true);
Memory.WriteU8(0x557648 + 1, 205, true);

// Small crosshair's red, green, and blue channels
Memory.WriteU8(0x557736 + 1, 200, true);
Memory.WriteU8(0x557731 + 1, 205, true);
Memory.WriteU8(0x55772c + 1, 255, true);

while (true) {
    wait(0);

    // Default values: hide the crosshair
    Memory.WriteU8(BIG_CROSSHAIR_ALPHA, 0, true);
    Memory.WriteU8(SMALL_CROSSHAIR_ALPHA, 0, true);

    // Crosshair processing conditions
    if (!PLAYER.isPlaying()) continue;
    if (PLAYER.isInAnyCar()) continue;
    if (!PLAYER.canStartMission()) continue;
    if (!isMouseAndKeyboardUsed()) continue;

    // Toggle aiming mode
    if (isRightMouseButtonJustDown() && !isFirstPersonWeapon()) {
        aimMode = !aimMode;
    }

    // Process crosshair alpha changes
    if (Pad.IsButtonPressed(PadId.Pad1, Button.Circle)) {
        // Attack button
        Memory.WriteU8(BIG_CROSSHAIR_ALPHA, 255, true);
        Memory.WriteU8(SMALL_CROSSHAIR_ALPHA, 255, true);
    } else if (aimMode) {
        // Aim button
        Memory.WriteU8(BIG_CROSSHAIR_ALPHA, 127, true);
        Memory.WriteU8(SMALL_CROSSHAIR_ALPHA, 127, true);
    }
}

function isRightMouseButtonJustDown(): boolean {
    // New state ON + old state OFF
    return Memory.ReadU8(0x94d789) !== 0 && Memory.ReadU8(0x936909) === 0;
}

function isFirstPersonWeapon(): boolean {
    switch (PLAYER.getCurrentWeapon()) {
        case WeaponType.Camera:
        case WeaponType.Laserscope:
        case WeaponType.RocketLauncher:
        case WeaponType.Sniper:
            return true;
        default:
            return false;
    }
}
