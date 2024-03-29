//	Script by Vital (Vitaly Pavlovich Ulyanov)

import { CCamera } from "./Classes/CCamera";
import { clamp } from "./Classes/Functions";

const plr: Player = new Player(0);

while (true) {
    wait(0);

    if (!plr.isPlaying()) continue;
    if (!CCamera.Using1stPersonWeaponMode() && CCamera.forward.z > 0) {
        CCamera.fov = clamp(70 + CCamera.forward.z * 45, 70, 100);
        Camera.PersistFov(true);
    } else Camera.PersistFov(false);
}
