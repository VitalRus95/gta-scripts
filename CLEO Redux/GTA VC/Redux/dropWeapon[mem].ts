// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
// Hold Action button to drop your current weapon.
// It will disappear after 30 seconds.
import {
    AnimationGroupId,
    AnimationId,
    Button,
    PadId,
    PickupType,
    ScriptSound,
    WeaponType,
} from "./vc_enums.mts";
import {
    blendCharAnimation,
    getPlayerClump,
    PLAYER,
    PLAYER_CHAR,
    PLAYER_POINTER,
} from "./vc_funcs.mts";

while (true) {
    wait(0);

    if (!PLAYER.isPlaying()) continue;
    if (PLAYER.isInAnyCar()) continue;
    if (PLAYER.isCurrentWeapon(WeaponType.Unarmed)) continue;
    if (
        !PLAYER.isStopped() ||
        !Pad.IsButtonPressed(PadId.Pad1, Button.LeftShoulder1)
    ) {
        TIMERA = 0;
        continue;
    }
    if (TIMERA < 700) {
        if (TIMERA < 300) continue;
        blendCharAnimation(
            getPlayerClump(),
            AnimationGroupId.Std,
            AnimationId.StdThrowUnder,
            4,
        );
        continue;
    }

    let weapon: int = PLAYER.getCurrentWeapon();
    let model: int = Weapon.GetModel(weapon);
    let ammo: int = PLAYER.getAmmoInWeapon(weapon);
    let target = PLAYER_CHAR.getOffsetInWorldCoords(0, 1.7, 0);
    let groundZ: float = World.GetGroundZFor3DCoord(
        target.x,
        target.y,
        target.z + 1,
    );
    let heightDifference: float = Math.abs(target.z - groundZ);

    if (heightDifference > 4) {
        Text.PrintStringNow("~r~Cannot drop the weapon here!", 2000);
        continue;
    }

    if (!Streaming.HasModelLoaded(model)) {
        Streaming.RequestModel(model);
        Streaming.LoadAllModelsNow();
    }

    Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundAmmunationBuyWeaponDenied);
    Pickup.CreateWithAmmo(
        model,
        PickupType.OnceTimeout,
        ammo,
        target.x,
        target.y,
        groundZ + 1,
    );
    removeWeaponModel();
    weaponShutdown();
    setCurrentWeaponSlot(0);

    while (Pad.IsButtonPressed(PadId.Pad1, Button.LeftShoulder1)) {
        wait(0);
    }
    TIMERA = 0;
}

function removeWeaponModel() {
    Memory.Fn.Thiscall(0x4ffd80, PLAYER_POINTER)(-1);
}

function weaponShutdown() {
    let slot = Memory.ReadU8(PLAYER_POINTER + 0x504);
    let weapon = PLAYER_POINTER + 0x408 + slot * 0x18;
    Memory.Fn.Thiscall(0x5d4c90, weapon)();
}

function setCurrentWeaponSlot(slot: int) {
    Memory.WriteU8(PLAYER_POINTER + 0x504, slot, false);
}
