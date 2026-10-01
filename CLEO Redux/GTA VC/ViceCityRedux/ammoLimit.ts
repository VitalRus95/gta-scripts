// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import { WeaponType } from "../ScriptingKit/vc_enums.mts";
import { isControlOff, PLAYER } from "../ScriptingKit/vc_funcs.mts";

const AMMO_R: int = 0x5588c1 + 1;
const AMMO_G: int = 0x5588bc + 1;
const AMMO_B: int = 0x5588b7 + 1;
const LIMITS: { id: WeaponType; limit: int }[] = [
    { id: WeaponType.Teargas, limit: 25 },
    { id: WeaponType.Molotov, limit: 25 },
    { id: WeaponType.Grenade, limit: 25 },
    { id: WeaponType.DetonatorGrenade, limit: 25 },
    { id: WeaponType.Pistol, limit: 238 },
    { id: WeaponType.Python, limit: 120 },
    { id: WeaponType.Shotgun, limit: 85 },
    { id: WeaponType.Stubby, limit: 80 },
    { id: WeaponType.Spas12, limit: 77 },
    { id: WeaponType.Tec9, limit: 250 },
    { id: WeaponType.SilencedIngram, limit: 240 },
    { id: WeaponType.Uzi, limit: 240 },
    { id: WeaponType.Mp5, limit: 240 },
    { id: WeaponType.Ruger, limit: 210 },
    { id: WeaponType.M4, limit: 210 },
    { id: WeaponType.M60, limit: 500 },
    { id: WeaponType.Flamethrower, limit: 3000 },
    { id: WeaponType.RocketLauncher, limit: 40 },
    { id: WeaponType.Minigun, limit: 1000 },
    { id: WeaponType.Sniper, limit: 60 },
    { id: WeaponType.Laserscope, limit: 56 },
    { id: WeaponType.Camera, limit: 100 },
];

while (true) {
    wait(0);

    if (!PLAYER.isPlaying()) continue;
    if (!PLAYER.canStartMission()) continue;

    for (let l of LIMITS) {
        if (!PLAYER.isCurrentWeapon(l.id)) continue;

        let ammo = PLAYER.getAmmoInWeapon(l.id);
        if (ammo >= l.limit) {
            if (isControlOff()) {
                // So far my only fix of wasting money in Ammu-Nations
                PLAYER.setAmmo(l.id, 99999);
            } else if (ammo > l.limit) {
                PLAYER.setAmmo(l.id, l.limit);
            }
            setAmmoColour(255, 255, 180);
        } else {
            setAmmoColour(255, 150, 225);
        }
        break;
    }
}

function setAmmoColour(red: int, green: int, blue: int) {
    Memory.WriteU8(AMMO_R, red, true);
    Memory.WriteU8(AMMO_G, green, true);
    Memory.WriteU8(AMMO_B, blue, true);
}
