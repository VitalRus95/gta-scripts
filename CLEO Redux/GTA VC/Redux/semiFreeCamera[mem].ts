// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import { Button, PadId } from "./vc_enums.mts";
import { PLAYER } from "./vc_funcs.mts";

// Constants
const ROTATION_CURRENT: int = 0x47cdf8;
const ROTATION_DESTINATION: int = 0x47ce04;
const ROT_CUR_DEFAULT: int[] = [0xd9, 0x90, 0x74, 0x03, 0x00, 0x00];
const ROT_DEST_DEFAULT: int[] = [0xd9, 0x90, 0x78, 0x03, 0x00, 0x00];
const UPDATE_RW: int = 0x47ce26;

Memory.Write(UPDATE_RW, 5, 0x90, true); // NOP UpdateRW

while (true) {
    wait(0);

    if (!PLAYER.isPlaying()) continue;

    if (
        PLAYER.isStopped() &&
        !Pad.IsButtonPressed(PadId.Pad1, Button.Square) && // Jump
        !Pad.IsButtonPressed(PadId.Pad1, Button.Circle) // Attack
    ) {
        Memory.Write(ROTATION_CURRENT, 6, 0x90, true);
        Memory.Write(ROTATION_DESTINATION, 6, 0x90, true);
    } else {
        // Change the heading immediately when jumping
        if (Pad.IsButtonPressed(PadId.Pad1, Button.Square)) {
            ROT_CUR_DEFAULT.forEach((a, i) => {
                Memory.Write(ROTATION_CURRENT + i, 1, a, true);
            });
        }
        ROT_DEST_DEFAULT.forEach((a, i) => {
            Memory.Write(ROTATION_DESTINATION + i, 1, a, true);
        });
    }
}
