// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import { KeyCode, ScriptSound } from "./vc_enums.mts";
import { PLAYER } from "./vc_funcs.mts";

const HUD_ENABLED: int = 0x86963a;

let hidden: boolean = false;

while (true) {
    wait(0);

    if (!PLAYER.isPlaying()) continue;
    if (Pad.IsKeyPressed(KeyCode.OemPlus)) {
        Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundAmmunationBuyWeapon);
        hidden = !hidden;
        displayHud(!hidden);

        while (Pad.IsKeyPressed(KeyCode.OemPlus)) {
            wait(0);
        }
    }
    if (hidden) displayHud(false);
}

function displayHud(state: boolean) {
    Hud.DisplayRadar(state);
    Memory.WriteU8(HUD_ENABLED, +state, false);
}
