// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import { projectiles } from "./Structs/Projectile";
import { CoronaType, FlareType, WeaponType } from "./vc_enums.mts";
import { PLAYER } from "./vc_funcs.mts";

while (true) {
    wait(0);

    if (!PLAYER.isPlaying()) continue;

    projectiles.forEach((p) => {
        if (p.inUse && p.weaponType === WeaponType.Rocket) {
            Fx.DrawCorona(
                ...p.position,
                0,
                CoronaType.Reflect,
                FlareType.Headlights,
                250,
                100,
                100,
            );
        }
    });
}
