// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import { Explosion, explosions } from "./Structs/Explosion";
import {
    CoronaType,
    ExplosionType,
    FlareType,
    VehicleModel,
    WeaponType,
} from "./vc_enums.mts";
import {
    find3rdPersonCamTargetVector,
    PLAYER,
    PLAYER_CHAR,
} from "./vc_funcs.mts";

// Reduce Molotov explosion's camera shake
Memory.WriteFloat(0x69d050, 0.05, false);

while (true) {
    wait(0);

    if (!PLAYER.isPlaying()) continue;

    explosions.forEach((e) => {
        // Check if the explosion exists
        if (e.iteration > 0) {
            visualEffects(e);
            fieryExplosion(e);
            firePropagation(e);
        }
        flamethrowerFire();
    });
}

function visualEffects(e: Explosion) {
    if (e.iteration < 90) {
        let pos: [float, float, float] = [
            e.position[0],
            e.position[1],
            e.position[2] + 0.5,
        ];
        Fx.DrawWeaponshopCorona(
            ...pos,
            0,
            CoronaType.Star,
            FlareType.Headlights,
            200,
            100,
            0,
        );
    }
}

function fieryExplosion(e: Explosion) {
    if (e.iteration > 1) return;
    if (
        PLAYER_CHAR.isInModel(VehicleModel.Rhino) &&
        PLAYER_CHAR.locateInCar3D(...e.position, 35, 35, 35, false)
    )
        // Fire after each explosion makes tank driving too hard
        return;

    let heightDifference = Math.abs(
        e.position[2] - World.GetGroundZFor3DCoord(...e.position),
    );

    if (
        heightDifference < 5 &&
        (e.type === ExplosionType.Car ||
            e.type === ExplosionType.CarQuick ||
            e.type === ExplosionType.Heli ||
            e.type === ExplosionType.Heli2 ||
            e.type === ExplosionType.Rocket ||
            e.type === ExplosionType.TankGrenade)
    ) {
        Fx.AddExplosionNoSound(...e.position, ExplosionType.Molotov);
    }
}

function firePropagation(e: Explosion) {
    if (
        e.type === ExplosionType.Molotov &&
        e.iteration > 80 &&
        e.iteration < 84
    ) {
        if (Math.random() > 0.25) return;
        let x = e.position[0] + (Math.random() * 10 - 5);
        let y = e.position[1] + (Math.random() * 10 - 5);
        let z = World.GetGroundZFor3DCoord(x, y, e.position[2]);

        if (Math.abs(z - e.position[2]) < 4) {
            Fx.AddExplosionNoSound(x, y, z, ExplosionType.Molotov);
        }
    }
}

function flamethrowerFire() {
    if (
        PLAYER.isCurrentWeapon(WeaponType.Flamethrower) &&
        PLAYER.isShooting()
    ) {
        if (TIMERA > 999) {
            let { x, y, z } = find3rdPersonCamTargetVector(
                10,
                PLAYER.getCoordinates(),
            );
            let groundZ: float = World.GetGroundZFor3DCoord(x, y, z);
            if (Math.abs(groundZ - z) < 9) {
                Fx.AddExplosionNoSound(x, y, groundZ, ExplosionType.Molotov);
                TIMERA = 0;
            }
        }
    } else if (TIMERA > 0) {
        TIMERA--;
    }
}
