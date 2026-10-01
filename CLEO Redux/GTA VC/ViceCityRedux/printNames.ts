// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import { DrawnText, QueuedText, TextQueue } from "../ScriptingKit/drawVC.mts";
import { Font } from "../ScriptingKit/vc_enums.mts";
import { isAnyTextOnScreen, isControlOff, PLAYER } from "../ScriptingKit/vc_funcs.mts";

const ZONES: string[] = [
    "JUNKY",
    "A_PORT",
    "BEACH1",
    "BEACH2",
    "BEACH3",
    "DOCKS",
    "DTOWN",
    "GOLFC",
    "HAITI",
    "HAVANA",
    "PORNI",
    "STARI",
];

let lastZoneName: string = undefined;
let lastCarModel: int = undefined;

let zoneText: QueuedText = {
    text: new DrawnText(undefined, {
        alignment: "right",
        colour: [45, 155, 90, 255],
        font: Font.Bank,
        scaleMultiplier: 1.8,
    }),
    position: [610, 325],
    startSec: 0,
    endSec: 5,
};
let carText: QueuedText = {
    text: new DrawnText(Text.GetLabelString("FEC_ONF"), {
        alignment: "right",
        colour: [97, 194, 247, 255],
        font: Font.Bank,
        scaleMultiplier: 1.8,
    }),
    position: [610, 355],
    startSec: 0,
    endSec: 5,
};

let zoneTextQueue: TextQueue = new TextQueue([zoneText]);
let carTextQueue: TextQueue = new TextQueue([carText]);

while (true) {
    wait(0);

    if (!PLAYER.isPlaying()) continue;

    // Vehicle names
    if (PLAYER.isInAnyCar()) {
        if (!lastCarModel || !PLAYER.isInModel(lastCarModel)) {
            let veh = PLAYER.storeCarIsInNoSave();
            let model = veh.getModel();
            let name = Streaming.GetNameOfVehicleModel(model);

            carText.text.text = Text.GetLabelString(name);
            carTextQueue.restart();
            lastCarModel = model;
        }
    } else if (lastCarModel) {
        lastCarModel = undefined;
    }

    // Zone names
    if (
        !lastZoneName ||
        !PLAYER.isInZone(lastZoneName) ||
        (PLAYER.isInZone("JUNKY") && lastZoneName === "A_PORT")
    ) {
        for (let z of ZONES) {
            if (PLAYER.isInZone(z) && lastZoneName !== z) {
                zoneText.text.text = Text.GetLabelString(z);
                zoneTextQueue.restart();
                lastZoneName = z;
                break;
            }
        }
    }

    // Process both text queues
    if (
        !isControlOff() &&
        !isAnyTextOnScreen() &&
        !Camera.GetFadingStatus() &&
        !Camera.IsInWidescreenMode()
    ) {
        zoneTextQueue.process();
        carTextQueue.process();
    }
}
