// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import { PLAYER, getScreenSize } from "./vc_funcs.mts";

while (true) {
    wait(0);

    if (!PLAYER.isPlaying()) continue;

    let scr = getScreenSize();
    let top = getSkyTopColour();
    let bot = getSkyBottomColour();

    Text.UseCommands(true);
    Hud.DrawRect(
        scr.x / 2,
        scr.y / 2,
        scr.x,
        scr.y,
        getMean(top.r, bot.r),
        getMean(top.g, bot.g),
        getMean(top.b, bot.b),
        18,
    );
    Text.UseCommands(false);
}

function getSkyTopColour(): { r: int; g: int; b: int } {
    return {
        r: Memory.ReadI32(0xa0ce98, false),
        g: Memory.ReadI32(0xa0fd70, false),
        b: Memory.ReadI32(0x978d1c, false),
    };
}

function getSkyBottomColour(): { r: int; g: int; b: int } {
    return {
        r: Memory.ReadI32(0xa0d958, false),
        g: Memory.ReadI32(0x97f208, false),
        b: Memory.ReadI32(0x9b6df4, false),
    };
}

function getMean(a: number, b: number): number {
    return (a + b) / 2;
}
