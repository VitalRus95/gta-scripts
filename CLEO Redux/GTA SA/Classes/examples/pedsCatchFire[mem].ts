//	Script by Vital (Vitaly Pavlovich Ulyanov)

import { fires } from "./Classes/CFire";
import { CWorld } from "./Classes/CWorld";

const plr: Player = new Player(0);

while (true) {
    wait(100);

    if (!plr.isPlaying()) continue;
    fires.forEach((f) => {
        if (
            f.doesExist() &&
            !f.isCreatedByScript() &&
            Math.RandomIntInRange(0, 10) === 0
        ) {
            CWorld.SetPedsOnFire(f.pos, 0.5);
        }
    });
}
