// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import { AnimationGroupId, AnimationId } from "./vc_enums.mts";
import {
    isPlayerJumping,
    isJumpJustDown,
    getPlayerVelocity,
    setPlayerVelocity,
    blendCharAnimation,
    getPlayerClump,
} from "./vc_funcs.mts";

const plr: Player = new Player(0);

while (true) {
    wait(0);

    if (!plr.isPlaying()) continue;
    if (plr.isInAnyCar()) continue;
    if (!isPlayerJumping()) continue;
    if (isJumpJustDown()) {
        let velocity = getPlayerVelocity();

        if (velocity.z > -0.1) {
            setPlayerVelocity(
                velocity.x * 0.6,
                velocity.y * 0.6,
                Math.max(0.16, velocity.z + 0.07),
            );
            blendCharAnimation(
                getPlayerClump(),
                AnimationGroupId.Std,
                AnimationId.StdEvadeStep,
                4,
            );

            while (isPlayerJumping()) {
                wait(0);
            }
        }
    }
}
