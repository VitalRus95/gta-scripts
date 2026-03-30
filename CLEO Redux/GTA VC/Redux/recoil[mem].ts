// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import { WeaponType } from "./vc_enums.mts";
import { getCameraRotation, PLAYER, setCameraRotation } from "./vc_funcs.mts";

const PLAYER_FLAGS: int = Memory.GetPedPointer(PLAYER.getChar()) + 0x150;

while (true) {
    wait(0);

    if (!PLAYER.isPlaying()) continue;
    if (!PLAYER.isShooting()) continue;

    switch (PLAYER.getCurrentWeapon()) {
        case WeaponType.Pistol:
            camRecoil(
                15,
                getRandomFloat(-0.006, 0.006),
                getRandomFloat(-0.006, 0.006),
            );
            break;
        case WeaponType.Mp5:
        case WeaponType.Uzi:
            camRecoil(
                17,
                getRandomFloat(-0.007, 0.007),
                getRandomFloat(-0.007, 0.007),
            );
            break;
        case WeaponType.SilencedIngram:
        case WeaponType.Tec9:
            camRecoil(
                20,
                getRandomFloat(-0.008, 0.008),
                getRandomFloat(-0.008, 0.008),
            );
            break;
        case WeaponType.M4:
        case WeaponType.Ruger:
            camRecoil(
                30,
                getRandomFloat(-0.009, 0.009),
                getRandomFloat(-0.009, 0.009),
            );
            break;
        case WeaponType.Python:
        case WeaponType.Shotgun:
        case WeaponType.Spas12:
        case WeaponType.Stubby:
            camRecoil(
                45,
                getRandomFloat(-0.012, 0.012),
                getRandomFloat(-0.008, 0.02),
            );
            break;
        case WeaponType.M60:
        case WeaponType.Minigun:
            camRecoil(
                55,
                getRandomFloat(-0.02, 0.02),
                getRandomFloat(-0.02, 0.02),
            );
            break;
        default:
            break;
    }
}

function getRandomFloat(min: number, max: number) {
    return Math.random() * (max * 2) + min;
}

function isPlayerCrouching(): boolean {
    return (Memory.ReadU8(PLAYER_FLAGS, false) & 0b00001000) !== 0;
}

function camRecoil(shakeIntensity: int, x: float, y: float) {
    if (isPlayerCrouching()) {
        x *= 0.5;
        y *= 0.5;
    }
    Camera.Shake(shakeIntensity);
    let rotation = getCameraRotation();
    setCameraRotation(rotation.x + x, rotation.y + y);
}
