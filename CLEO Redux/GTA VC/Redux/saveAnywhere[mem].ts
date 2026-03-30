// Script by Vital (Vitaly Pavlovich Ulyanov)
import { PLAYER } from "./vc_funcs.mts";
import { KeyCode } from "./vc_enums.mts";

while (true) {
    wait(0);

    if (
        PLAYER.isPlaying() &&
        !PLAYER.isInAnyCar() &&
        !ONMISSION &&
        Pad.IsKeyPressed(KeyCode.F4)
    ) {
        Game.ActivateSaveMenu();

        while (Pad.IsKeyPressed(KeyCode.F4)) wait(0);
    }
}
