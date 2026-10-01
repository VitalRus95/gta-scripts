// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import {
    blendCharAnimation,
    getCameraMode,
    getCharClump,
    getCharMoveState,
    isButtonJustDown,
    isMouseAndKeyboardUsed,
    PLAYER,
    PLAYER_POINTER,
} from "../ScriptingKit/vc_funcs.mts";
import {
    AnimationGroupId,
    AnimationId,
    Button,
    CameraMode,
    MoveState,
    PadId,
} from "../ScriptingKit/vc_enums.mts";

while (true) {
    wait(0);

    if (!PLAYER.isPlaying()) continue;
    if (PLAYER.isInAnyCar()) continue;
    if (!PLAYER.canStartMission()) continue;
    if (PLAYER.isStopped()) continue;
    if (!isPlayerRunning()) continue;
    if (isButtonJustDown(Button.LeftShock)) {
        blendCharAnimation(
            getCharClump(PLAYER_POINTER),
            AnimationGroupId.Std,
            AnimationId.StdFallCollapse,
            4,
        );

        TIMERA = 0;
        while (TIMERA < 800) {
            // Disable crouch and enter vehicle buttons while rolling
            Pad.EmulateButtonPressWithSensitivity(Button.LeftShock, 0);
            Pad.EmulateButtonPressWithSensitivity(Button.Triangle, 0);
            wait(0);
        }
    }
}

function isPlayerRunning(): boolean {
    if (isMouseAndKeyboardUsed() && getCameraMode() === CameraMode.FollowPed) {
        // Return false if forward is not pressed or backward is pressed
        if (!Pad.IsButtonPressed(PadId.Pad1, Button.DpadUp)) return false;
        if (Pad.IsButtonPressed(PadId.Pad1, Button.DpadDown)) return false;
    }
    return (
        getCharMoveState(PLAYER_POINTER) === MoveState.Still ||
        getCharMoveState(PLAYER_POINTER) === MoveState.Run ||
        getCharMoveState(PLAYER_POINTER) === MoveState.Sprint
    );
}
