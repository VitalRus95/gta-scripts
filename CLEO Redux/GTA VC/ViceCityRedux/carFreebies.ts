// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import { VehicleModel, WeaponSlot, WeaponType } from "../ScriptingKit/vc_enums.mts";
import {
    giveDelayedWeapon,
    PLAYER,
    PLAYER_CHAR,
    PLAYER_POINTER,
    randomArrayItem,
    randomInt,
} from "../ScriptingKit/vc_funcs.mts";

// NOP original freebies handling
Memory.Write(0x5b8a14, 0x5b8c30 - 0x5b8a14, 0x90, true); // CVehicle::SetDriver
Memory.Write(0x5b892d, 0x5b89de - 0x5b892d, 0x90, true); // CVehicle::RemoveDriver

const FREEBIES_OFFSET: int = 505;

while (true) {
    wait(0);

    if (!PLAYER.isPlaying()) continue;
    if (!PLAYER.isInAnyCar()) continue;

    let car = PLAYER.storeCarIsInNoSave();
    let carPointer = Memory.GetVehiclePointer(car);
    let freebies = getFreebiesState(carPointer);

    if (!freebies) continue;

    switch (car.getModel()) {
        case VehicleModel.Ambulance:
            if (!PLAYER.isHealthGreater(99)) {
                PLAYER.setHealth(PLAYER.getHealth() + 20);
                setFreebiesState(carPointer, false);
            }
            break;
        case VehicleModel.Taxi:
        case VehicleModel.Cabbie:
        case VehicleModel.KaufmanCab:
        case VehicleModel.Coach:
            PLAYER.addScore(randomInt(15, 51));
            setFreebiesState(carPointer, false);
            break;
        case VehicleModel.ZebraCab:
            PLAYER.addScore(randomInt(50, 151));
            setFreebiesState(carPointer, false);
            break;
        case VehicleModel.Securicar:
            PLAYER.addScore(randomInt(0, 4) * 100);
            setFreebiesState(carPointer, false);
            break;
        case VehicleModel.Police:
            addAmmo(8, WeaponSlot.Shotgun, WeaponType.Shotgun);
            setFreebiesState(carPointer, false);
            break;
        case VehicleModel.Enforcer:
            if (PLAYER_CHAR.getArmor() < 100) {
                PLAYER.addArmour(50);
                setFreebiesState(carPointer, false);
            }
            break;
        case VehicleModel.FBI_Rancher:
        case VehicleModel.FBI_Washington:
            addAmmo(15, WeaponSlot.SMG, WeaponType.Mp5);
            setFreebiesState(carPointer, false);
            break;
        case VehicleModel.Cheetah2:
            addAmmo(15, WeaponSlot.SMG, WeaponType.Uzi);
            setFreebiesState(carPointer, false);
            break;
        case VehicleModel.BarracksOL:
        case VehicleModel.Predator:
            addAmmo(15, WeaponSlot.AssaultRifle, WeaponType.M4);
            setFreebiesState(carPointer, false);
            break;
        case VehicleModel.Patriot:
            addAmmo(12, WeaponSlot.Handgun, WeaponType.Python);
            setFreebiesState(carPointer, false);
            break;
        case VehicleModel.PoliceMaverick:
            if (isSlotFree(WeaponSlot.Throwable)) {
                giveDelayedWeapon(PLAYER_POINTER, WeaponType.Teargas, 5);
                setFreebiesState(carPointer, false);
            }
            break;
        case VehicleModel.VCN_Maverick:
            addAmmo(10, WeaponSlot.Other, WeaponType.Camera);
            setFreebiesState(carPointer, false);
            break;
        case VehicleModel.Caddy:
            if (isSlotFree(WeaponSlot.Melee)) {
                giveDelayedWeapon(PLAYER_POINTER, WeaponType.GolfClub, 1);
                setFreebiesState(carPointer, false);
            }
            break;
        case VehicleModel.Walton:
        case VehicleModel.SpandExpress:
            if (isSlotFree(WeaponSlot.Melee)) {
                giveDelayedWeapon(
                    PLAYER_POINTER,
                    randomArrayItem([WeaponType.Screwdriver, WeaponType.Knife, WeaponType.Hammer]),
                    1,
                );
                setFreebiesState(carPointer, false);
            }
            break;
        case VehicleModel.CubanHermes:
            if (isSlotFree(WeaponSlot.Melee)) {
                giveDelayedWeapon(PLAYER_POINTER, WeaponType.Machete, 1);
                setFreebiesState(carPointer, false);
            }
            break;
        case VehicleModel.Voodoo:
            if (isSlotFree(WeaponSlot.Melee)) {
                giveDelayedWeapon(PLAYER_POINTER, WeaponType.BaseballBat, 1);
                setFreebiesState(carPointer, false);
            }
            break;
        default:
            PLAYER.addScore(randomInt(0, 16));
            setFreebiesState(carPointer, false);
            break;
    }
}

function getFreebiesState(carPointer: int): boolean {
    return (Memory.ReadU8(carPointer + FREEBIES_OFFSET, false) & 0b10000000) !== 0;
}

function setFreebiesState(carPointer: int, state: boolean) {
    let freebies = Memory.ReadU8(carPointer + FREEBIES_OFFSET, false);

    Memory.WriteU8(carPointer + FREEBIES_OFFSET, (freebies &= 0b01111111), false);
}

/**
 * Gives the player ammo for the specified weapon slot, optionally with the specified weapon
 */
function addAmmo(ammo: int, slot: WeaponSlot, weapon: WeaponType) {
    let ownedWeapon = PLAYER_CHAR.getWeaponInSlot(slot).weaponType;
    giveDelayedWeapon(PLAYER_POINTER, ownedWeapon || weapon, ammo);
}

/**
 * Returns true if the player's specified weapon slot is free
 */
function isSlotFree(slot: WeaponSlot): boolean {
    return PLAYER_CHAR.getWeaponInSlot(slot).weaponType === 0;
}
