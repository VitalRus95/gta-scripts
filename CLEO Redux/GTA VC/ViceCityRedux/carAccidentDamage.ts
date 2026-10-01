// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import { DamageDirection, PedPiece, VehicleModel, WeaponType } from "../ScriptingKit/vc_enums.mts";
import { PLAYER, PLAYER_POINTER, inflictPedDamage } from "../ScriptingKit/vc_funcs.mts";

const COLLISION_POWER: int = 0x104;

while (true) {
    wait(0);

    if (!PLAYER.isPlaying()) continue;
    if (!PLAYER.isInAnyCar()) continue;
    if (PLAYER.isOnAnyBike()) continue;
    if (PLAYER.isInAnyBoat()) continue;
    if (PLAYER.isInFlyingVehicle()) continue;
    if (PLAYER.isInModel(VehicleModel.Rhino)) continue;

    let carPointer: int = Memory.GetVehiclePointer(PLAYER.storeCarIsInNoSave());
    let damage: float = Memory.ReadFloat(carPointer + COLLISION_POWER, false);

    if (damage > 210) {
        inflictPedDamage(
            PLAYER_POINTER,
            0,
            WeaponType.RammedByCar,
            damage * 0.03,
            PedPiece.Torso,
            DamageDirection.Front,
        );
    }
}
