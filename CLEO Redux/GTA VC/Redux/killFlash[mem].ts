// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import { getTimeStep, getScreenSize, clamp } from "./vc_funcs.mts";

const KILLS: int = 0x978794; // PeopleKilledByPlayer

while (true) {
    let killsOld: int = Memory.ReadI32(KILLS, false);
    wait(0);
    let killsNew: int = Memory.ReadI32(KILLS, false);

    if (killsNew > killsOld) {
        let alpha: float = 0;

        while (alpha < 64) {
            alpha += getTimeStep() * 4.5;
            drawOverlay(alpha);
            wait(0);
        }

        while (alpha > 0) {
            alpha -= getTimeStep() * 4.5;
            drawOverlay(alpha);
            wait(0);
        }
    }
}

function drawOverlay(alpha: float) {
    let scr = getScreenSize();

    Text.UseCommands(true);
    Hud.DrawRect(
        scr.x / 2,
        scr.y / 2,
        scr.x,
        scr.y,
        128,
        128,
        128,
        clamp(0, Math.floor(alpha), 255),
    );
    Text.UseCommands(false);
}
