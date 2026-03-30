// Script by Vital (Vitaly Pavlovich Ulyanov)
import { PLAYER } from "./vc_funcs.mts";

while (true) {
    let healthOld: int = PLAYER.getHealth();
    wait(0);
    let healthNew: int = PLAYER.getHealth();

    if (healthOld !== healthNew) {
        TIMERA = -4000;
    } else {
        if (healthNew > 0 && healthNew < 50 && TIMERA > 999) {
            PLAYER.setHealth(healthNew + 1);
            TIMERA = 0;
        }
    }
}
