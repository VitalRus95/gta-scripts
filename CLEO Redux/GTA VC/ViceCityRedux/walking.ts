// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import { Button, CameraMode, KeyCode, PadId } from "../ScriptingKit/vc_enums.mts";
import { clamp, getCameraMode, getTimeStep, PLAYER } from "../ScriptingKit/vc_funcs.mts";

// Constants
const BUTTONS: Button[] = [Button.DpadUp, Button.DpadLeft, Button.DpadRight, Button.DpadDown];

// Variables
let walk: boolean = false;
let speed: int = 255;

while (true) {
    wait(0);

    if (!PLAYER.isPlaying()) continue;

    if (PLAYER.isOnFoot() && Pad.IsKeyPressed(KeyCode.LeftMenu)) {
        while (Pad.IsKeyPressed(KeyCode.LeftMenu)) {
            wait(0);
        }
        walk = !walk;
        if (walk) speed = 255; // Reset walking speed
    }

    if (walk && PLAYER.isOnFoot()) {
        if (Pad.IsButtonPressed(PadId.Pad1, Button.Cross)) walk = false;
        if (speed > 128) {
            speed = clamp(128, Math.round(speed - getTimeStep() * 3), 255);
        }
        BUTTONS.forEach((b) => {
            // Skip buggy going backward animation if mouse & keyboard are used
            if (
                b === Button.DpadDown &&
                isMouseAndKeyboardUsed() &&
                getCameraMode() === CameraMode.FollowPed
            )
                return;

            if (Pad.IsButtonPressed(PadId.Pad1, b)) {
                Pad.EmulateButtonPressWithSensitivity(b, speed);
            }
        });
    }
}

function isMouseAndKeyboardUsed(): boolean {
    return Memory.ReadU8(0xa10b4c, false) !== 0;
}
