// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import { AnimationGroupId, AnimationId, CameraMode } from "../ScriptingKit/vc_enums.mts";
import {
    isCharCrouching,
    blendCharAnimation,
    getCharClump,
    PLAYER,
    PLAYER_POINTER,
    getCameraMode,
} from "../ScriptingKit/vc_funcs.mts";

while (true) {
    let oldWeapon = PLAYER.getCurrentWeapon();
    wait(0);
    let newWeapon = PLAYER.getCurrentWeapon();

    if (oldWeapon === newWeapon) continue;
    if (!PLAYER.isPlaying()) continue;
    if (!PLAYER.canStartMission()) continue;
    if (PLAYER.isInAnyCar()) continue;
    if (isCharCrouching(PLAYER_POINTER)) continue;
    if (getCameraMode() !== CameraMode.FollowPed) continue;

    blendCharAnimation(
        getCharClump(PLAYER_POINTER),
        AnimationGroupId.Std,
        AnimationId.StdPartialpunch,
        2.5,
    );
}
