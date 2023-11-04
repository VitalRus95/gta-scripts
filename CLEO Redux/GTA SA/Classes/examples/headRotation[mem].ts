//	Script by Vital (Vitaly Pavlovich Ulyanov)

import { CCamera } from "./Classes/CCamera";
import { CPlayerPed } from "./Classes/CPlayerPed";

const plr: Player = new Player(0);
const CPlayer: CPlayerPed = new CPlayerPed(0);
const plc: Char = plr.getChar();

while (true) {
    wait(0);

    if (!plr.isPlaying() || !plr.canStartMission() || plr.isTargetingAnything())
        continue;

    let pos = CCamera.Find3rdPersonCamTargetVector(10, CPlayer.pos).pos;
    Task.LookAtCoord(plc, pos.x, pos.y, pos.z, 1000);
}
