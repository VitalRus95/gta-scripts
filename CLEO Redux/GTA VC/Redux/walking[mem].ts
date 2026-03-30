// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import { Button, KeyCode, PadId } from "./vc_enums.mts";

// Constants
const plr: Player = new Player(0);
const BUTTONS: Button[] = [
    Button.DpadUp,
    Button.DpadLeft,
    Button.DpadRight,
    Button.DpadDown,
];

// Variables
let walk: boolean = false;
let speed: int = 255;

while (true) {
    wait(0);

    if (!plr.isPlaying()) continue;

    if (plr.isOnFoot() && Pad.IsKeyPressed(KeyCode.LeftMenu)) {
        while (Pad.IsKeyPressed(KeyCode.LeftMenu)) {
            wait(0);
        }
        walk = !walk;
        if (walk) speed = 255; // Reset walking speed
    }

    if (walk && plr.isOnFoot()) {
        if (Pad.IsButtonPressed(PadId.Pad1, Button.Cross)) walk = false;
        if (speed > 128) speed -= 4;
        BUTTONS.forEach((b) => {
            // Skip buggy going backward animation if mouse & keyboard are used
            if (b === Button.DpadDown && isMouseAndKeyboardUsed()) return;

            if (Pad.IsButtonPressed(PadId.Pad1, b)) {
                Pad.EmulateButtonPressWithSensitivity(b, speed);
            }
        });
    }
}

function isMouseAndKeyboardUsed(): boolean {
    return Memory.ReadU8(0xa10b4c, false) !== 0;
}
