// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import { clamp, PLAYER, PLAYER_POINTER, workOutPolicePresence } from "../ScriptingKit/vc_funcs.mts";

const CWANTED: int = Memory.ReadI32(PLAYER_POINTER + 0x5f4, false);
const STAR_R: int = 0x5590c9 + 1;
const STAR_G: int = 0x5590c4 + 1;
const STAR_B: int = 0x5590bf + 1;
const DELAYS: int[] = [
    999, // 0 stars
    599, // 1 star
    449, // 2 stars
    349, // 3 stars
    249, // 4 stars
    149, // 5 stars
    99, // 6 stars
];

while (true) {
    wait(DELAYS[clamp(0, PLAYER.storeWantedLevel(), 6)]);

    if (!PLAYER.isPlaying()) continue;

    // Reset wanted star colour
    Memory.WriteU8(STAR_R, 97, true);
    Memory.WriteU8(STAR_G, 194, true);
    Memory.WriteU8(STAR_B, 247, true);

    // Get current chaos level
    let chaos: int = Memory.ReadI32(CWANTED, false);

    if (chaos > 179) {
        let pos = PLAYER.getCoordinates();
        let cops: int = workOutPolicePresence(pos.x, pos.y, pos.z, 30);

        // No cops nearby
        if (cops === 0) {
            // Change wanted star colour
            Memory.WriteU8(STAR_R, 127, true);
            Memory.WriteU8(STAR_G, 127, true);
            Memory.WriteU8(STAR_B, 127, true);

            // Lower the chaos
            Memory.WriteI32(CWANTED, chaos - 1, false);
            updateWantedLevel();
        }
    }
}

function updateWantedLevel() {
    Memory.Fn.Thiscall(0x4d2110, CWANTED)();
}
