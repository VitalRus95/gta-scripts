// Script by Vital (Vitaly Pavlovich Ulyanov)
// Thanks to Birds for helping to fix a bug with `isPlayerCrouching` function
// GTA: Vice City v1.0 required
import { Button, PadId } from "../ScriptingKit/vc_enums.mts";
import { isCharCrouching, PLAYER, PLAYER_POINTER } from "../ScriptingKit/vc_funcs.mts";

while (true) {
    wait(0);

    if (!PLAYER.isPlaying()) continue;
    if (PLAYER.isInAnyCar()) continue;
    if (!PLAYER.canStartMission()) continue;
    if (!isCharCrouching(PLAYER_POINTER)) continue;
    if (!isMovementButtonPressed()) continue;

    Pad.EmulateButtonPressWithSensitivity(Button.LeftShock, 255);
}

function isMovementButtonPressed(): boolean {
    return (
        Pad.IsButtonPressed(PadId.Pad1, Button.DpadUp) ||
        Pad.IsButtonPressed(PadId.Pad1, Button.DpadDown) ||
        Pad.IsButtonPressed(PadId.Pad1, Button.DpadLeft) ||
        Pad.IsButtonPressed(PadId.Pad1, Button.DpadRight)
    );
}
