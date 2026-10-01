// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import { Counter } from "../ScriptingKit/drawVC.mts";
import { PLAYER, getTimeStep } from "../ScriptingKit/vc_funcs.mts";

let showDuration: int = 0;
let change: int = 0;
let text: string = "";
let moneyCounter: Counter = new Counter(undefined);

while (true) {
    let oldMoney: int = PLAYER.storeScore();
    wait(0);
    let newMoney: int = PLAYER.storeScore();

    // Money value has changed, prepare to display
    if (newMoney !== oldMoney) {
        change += newMoney - oldMoney;
        moneyCounter.colour = change > 0 ? [0, 207, 133, 255] : [255, 150, 225, 255];
        text = `$${change}`;
        showDuration = 5;
    }

    // Manage the counter
    if (showDuration > 0) {
        showDuration -= getTimeStep() / 50;

        if (showDuration > 0) {
            if (!Camera.IsInWidescreenMode()) {
                moneyCounter.draw(14, text);
            }
        } else {
            change = 0;
        }
    }
}
