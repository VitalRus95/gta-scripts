//  Script by Vital (Vitaly Pavlovich Ulyanov)
import { ScriptSound, TextStyle } from '../sa_enums';
import { missions } from "./missions";

const help: string = '~y~~<~/~>~~s~ - select mission.~n~~y~~k~~PED_SPRINT~~s~ - launch selected.~n~~y~~k~~VEHICLE_ENTER_EXIT~~s~ - exit.';
const plr: Player = new Player(0);
const plc: Char = plr.getChar();

let index: int = 0;
let phones: { x: float, y: float, z: float, heading: float }[] = [
    { x: 1806.73, y: -1599.95, z: 13.55, heading: 42.53 },
    { x: 2166.39, y: -1155.77, z: 24.86, heading: 90.63},
    { x: 2259.22, y: -1211.68, z: 23.97, heading: 359.20 },
    { x: 2069.47, y: -1766.63, z: 13.56, heading: 91.20 },
    { x: 1711.31, y: -1605.57, z: 13.55, heading: 177.84 },
    { x: 1723.08, y: -1720.38, z: 13.54, heading: 88.48 },
    { x: 378.60, y: -1717.95, z: 23.20, heading: 269.64 },
    { x: 278.09, y: -1630.62, z: 33.31, heading: 259.08 },
    { x: 296.70, y: -1573.77, z: 33.46, heading: 350.05 },
    { x: 303.08, y: -1592.84, z: 32.85, heading: 169.93 },
    { x: 356.79, y: -1364.44, z: 14.48, heading: 116.09 },
    { x: 637.99, y: -1227.55, z: 18.14, heading: 177.93 },
    { x: 2278.79, y: 2524.95, z: 10.82, heading: 268.49 },
    { x: -1661.24, y: 1397.78, z: 7.17, heading: 45.01 },
    { x: -2419.32, y: 717.74, z: 35.17, heading: 358.39 },
    { x: -1965.18, y: 162.39, z: 27.69, heading: 359.79 }
];

// plc.setCoordinates(1806.73, -1599.95, 13.55); // Teleport for quick testing

while (true) {
    wait(0);

    if (!plr.isPlaying() || ONMISSION) continue;

    phones.forEach(p => {
        if (!plc.locateAnyMeans3D(p.x, p.y, p.z, 25, 25, 25, false)) {
            return;
        }
        if (plc.locateStoppedOnFoot3D(p.x, p.y, p.z, 1, 1, 1, true)) {
            plc.hideWeaponForScriptedCutscene(true);
            plc.setCoordinatesNoOffset(p.x, p.y, p.z);
            plc.setHeading(p.heading);
            Camera.AttachToChar(plc, -2, -2, 0, 0, 0, 0, 0, 2);
            Pad.SetPlayerEnterCarButton(plr, false);
            Text.PrintHelpString(help);
            Hud.SwitchWidescreen(true);
            plr.setControl(false);

            while (true) {
                wait(0);

                Text.PrintBigString(missions[index].title, 0, TextStyle.MiddleSmaller);
                Text.PrintNow(missions[index].location, 0, 1);

                if (!plr.isPlaying() || Pad.IsButtonPressed(0, 15)) {
                    break;
                } else if (Pad.GetPositionOfAnalogueSticks(0).leftStickX < 0 && TIMERA > 300) {
                    TIMERA = 0;
                    Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundAmmunationGunCollision);
                    index = ringClamp(0, index - 1, missions.length - 1);
                } else if (Pad.GetPositionOfAnalogueSticks(0).leftStickX > 0 && TIMERA > 300) {
                    TIMERA = 0;
                    Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundAmmunationGunCollision);
                    index = ringClamp(0, index + 1, missions.length - 1);
                } else if (Pad.IsButtonPressed(0, 16)) {
                    Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundShopBuy);
                    Text.PrintBigString(missions[index].title, 3000, TextStyle.BottomRight);
                    CLEO.runScript(missions[index].path);
                    break;
                }

                if (Streaming.HasAnimationLoaded('PED') && !plc.isPlayingAnim('phone_talk')) {
                    Task.PlayAnim(plc, 'phone_talk', 'PED', 4, true, false, false, false, 5000);
                }
            }

            Camera.Restore();
            Hud.SwitchWidescreen(false);
            plr.setControl(true);
            plc.hideWeaponForScriptedCutscene(false);
            plc.clearTasks();

            while (Pad.IsButtonPressed(0, 15)) {
                wait(0);
            }
            Pad.SetPlayerEnterCarButton(plr, true);

            while (plc.locateOnFoot3D(p.x, p.y, p.z, 1.5, 1.5, 1.5, false)) {
                wait(0);
            }
        }
    });
}

function ringClamp(min: int|float, value: int|float, max: int|float) {
    return (value > max) ? 0 : (value < min) ? max : value;
}