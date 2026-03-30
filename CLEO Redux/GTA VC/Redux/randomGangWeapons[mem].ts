import { WeaponType, GangType } from "./vc_enums.mts";
import { PLAYER } from "./vc_funcs.mts";

// Script by Vital (Vitaly Pavlovich Ulyanov)
const gangs: int[] = [
    GangType.Biker,
    GangType.Cuban,
    GangType.Diaz,
    GangType.Haitian,
    GangType.Player,
    GangType.Security,
    GangType.Street,
];
const melee: int[] = [
    WeaponType.BaseballBat,
    WeaponType.BrassKnuckles,
    WeaponType.Cleaver,
    WeaponType.Hammer,
    WeaponType.Katana,
    WeaponType.Knife,
    WeaponType.Machete,
    WeaponType.Screwdriver,
];
const guns: int[] = [
    WeaponType.M4,
    WeaponType.Mp5,
    WeaponType.Pistol,
    WeaponType.Python,
    WeaponType.Ruger,
    WeaponType.Shotgun,
    WeaponType.SilencedIngram,
    WeaponType.Stubby,
    WeaponType.Tec9,
    WeaponType.Uzi,
];
const armyWeapons: int[] = [
    WeaponType.M4,
    WeaponType.Mp5,
    WeaponType.Pistol,
    WeaponType.Shotgun,
    WeaponType.Stubby,
    WeaponType.Uzi,
];

while (true) {
    wait(Math.RandomIntInRange(20, 41) * 1000); // [20; 40] seconds

    gangs.forEach((gang) => {
        if (gang === GangType.Street && isInArmyZone()) {
            Gang.SetWeapons(
                gang,
                getRandomArrayItem(armyWeapons),
                getRandomArrayItem(armyWeapons),
            );
        } else {
            Gang.SetWeapons(
                gang,
                getRandomArrayItem(Math.random() > 0.5 ? melee : guns),
                getRandomArrayItem(guns),
            );
        }
    });
}

function isInArmyZone(): boolean {
    return PLAYER.isInInfoZone("AIRPORT") || PLAYER.isInInfoZone("ARMYBAS");
}

function getRandomArrayItem(array: any[]): any {
    return array[Math.floor(Math.random() * array.length)];
}
