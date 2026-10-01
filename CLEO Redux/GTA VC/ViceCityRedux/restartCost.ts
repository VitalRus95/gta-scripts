// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import { PLAYER } from "../ScriptingKit/vc_funcs.mts";

Memory.Write(0x42bc73, 6, 0x90, true); // NOP taking money when wasted
Memory.Write(0x42c060, 6, 0x90, true); // NOP taking money when busted

while (true) {
    wait(0);

    // Wait until death/arrest
    if (PLAYER.isPlaying()) continue;

    // Manage money taken from the player. Ranges:
    // - wasted: [$300 - 60% - $10000]
    // - busted: [$1000 - 60%]
    let money: int = PLAYER.isDead()
        ? Math.max(300, Math.min(Math.ceil(PLAYER.storeScore() * 0.6), 10000))
        : Math.max(1000, Math.ceil(PLAYER.storeScore() * PLAYER.storeWantedLevel() * 0.1));

    // Wait until respawn
    while (!PLAYER.isPlaying()) {
        wait(0);
    }

    PLAYER.addScore(Math.min(money, PLAYER.storeScore()) * -1);
}
