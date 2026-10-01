// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import { AnimationGroupId, AnimationId, Button } from "../ScriptingKit/vc_enums.mts";
import {
    isCharJumping,
    getCharVelocity,
    setCharVelocity,
    blendCharAnimation,
    getCharClump,
    isButtonJustDown,
    PLAYER,
    PLAYER_POINTER,
} from "../ScriptingKit/vc_funcs.mts";

while (true) {
    wait(0);

    if (!PLAYER.isPlaying()) continue;
    if (PLAYER.isInAnyCar()) continue;
    if (!isCharJumping(PLAYER_POINTER)) continue;
    if (isButtonJustDown(Button.Square)) {
        let velocity = getCharVelocity(PLAYER_POINTER);

        if (velocity.z > -0.1) {
            setCharVelocity(
                PLAYER_POINTER,
                velocity.x * 0.6,
                velocity.y * 0.6,
                Math.max(0.16, velocity.z + 0.07),
            );
            blendCharAnimation(
                getCharClump(PLAYER_POINTER),
                AnimationGroupId.Std,
                AnimationId.StdEvadeStep,
                4,
            );

            while (isCharJumping(PLAYER_POINTER)) {
                wait(0);
            }
        }
    }
}
