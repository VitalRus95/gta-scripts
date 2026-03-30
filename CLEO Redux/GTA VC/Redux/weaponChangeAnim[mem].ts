// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import { AnimationGroupId, AnimationId } from "./vc_enums.mts";
import {
    isPlayerCrouching,
    blendCharAnimation,
    getPlayerClump,
} from "./vc_funcs.mts";

const plr: Player = new Player(0);

while (true) {
    let oldWeapon = plr.getCurrentWeapon();
    wait(0);
    let newWeapon = plr.getCurrentWeapon();

    if (oldWeapon === newWeapon) continue;
    if (!plr.isPlaying()) continue;
    if (!plr.canStartMission()) continue;
    if (plr.isInAnyCar()) continue;
    if (isPlayerCrouching()) continue;

    blendCharAnimation(
        getPlayerClump(),
        AnimationGroupId.Std,
        AnimationId.StdPartialpunch,
        2.5,
    );
}
