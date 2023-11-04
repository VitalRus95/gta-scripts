//	Script by Vital (Vitaly Pavlovich Ulyanov)

import { CPad } from "./Classes/CPad";
import { CPlayerPed } from "./Classes/CPlayerPed";
import { eWeaponState } from "./Classes/CWeapon";

const plr: Player = new Player(0);
const CPlayer: CPlayerPed = new CPlayerPed(0);

Memory.Write(0x60b4fa, 6, 0x90, false); // Disable automatic reloading on weapon switch

while (true) {
    wait(0);

    if (!plr.isPlaying()) continue;

    let currentWeapon = CPlayer.weapons[CPlayer.currentWeaponSlot];
    if (
        CPad.CollectPickupJustDown() && // Action button
        CPlayer.currentWeaponSlot > 1 && // Pistols
        CPlayer.currentWeaponSlot < 6 && // Automatic rifles
        currentWeapon.state !== eWeaponState.RELOADING
    ) {
        currentWeapon.state = eWeaponState.RELOADING;
    }
}
