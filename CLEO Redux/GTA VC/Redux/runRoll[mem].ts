// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import {
    blendCharAnimation,
    getPlayerClump,
    getPlayerMoveState,
    isDuckJustDown,
    isMouseAndKeyboardUsed,
    PLAYER,
} from "./vc_funcs.mts";
import {
    AnimationGroupId,
    AnimationId,
    Button,
    MoveState,
    PadId,
} from "./vc_enums.mts";

while (true) {
    wait(0);

    if (!PLAYER.isPlaying()) continue;
    if (PLAYER.isInAnyCar()) continue;
    if (!PLAYER.canStartMission()) continue;
    if (PLAYER.isStopped()) continue;
    if (!isPlayerRunning()) continue;
    if (isDuckJustDown()) {
        Pad.EmulateButtonPressWithSensitivity(Button.LeftShock, 0);
        blendCharAnimation(
            getPlayerClump(),
            AnimationGroupId.Std,
            AnimationId.StdFallCollapse,
            4,
        );
    }
}

function isPlayerRunning(): boolean {
    if (isMouseAndKeyboardUsed()) {
        // Return false if forward is not pressed or backward is pressed
        if (!Pad.IsButtonPressed(PadId.Pad1, Button.DpadUp)) return false;
        if (Pad.IsButtonPressed(PadId.Pad1, Button.DpadDown)) return false;
    }
    return (
        getPlayerMoveState() === MoveState.Still ||
        getPlayerMoveState() === MoveState.Run ||
        getPlayerMoveState() === MoveState.Sprint
    );
}
