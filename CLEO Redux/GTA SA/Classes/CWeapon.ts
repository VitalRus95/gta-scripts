//	Script by Vital (Vitaly Pavlovich Ulyanov)
/* Some Plugin SDK classes for GTA: San Andreas. Thanks to:
    - GTA community for research;
    - DK22Pac for Plugin SDK [https://github.com/DK22Pac/plugin-sdk];
    - Seemann and wmysterio for help.
*/

export enum eWeaponState {
    READY,
    FIRING,
    RELOADING,
    OUT_OF_AMMO,
    MELEE_MADECONTACT,
}

export class CWeapon {
    pointer: int;

    constructor(pointer) {
        this.pointer = pointer;
    }

    get type(): int {
        return Memory.ReadI32(this.pointer, false);
    }

    get state(): int {
        return Memory.ReadI32(this.pointer + 4, false);
    }
    set state(value: int) {
        Memory.WriteI32(this.pointer + 4, value, false);
    }

    get ammoInClip(): int {
        return Memory.ReadI32(this.pointer + 8, false);
    }
    set ammoInClip(value: int) {
        Memory.WriteI32(this.pointer + 8, value, false);
    }

    get totalAmmo(): int {
        return Memory.ReadI32(this.pointer + 0x0c, false);
    }
    set totalAmmo(value: int) {
        Memory.WriteI32(this.pointer + 0x0c, value, false);
    }

    get shotTimer(): int {
        return Memory.ReadI32(this.pointer + 0x10, false);
    }
    set shotTimer(value: int) {
        Memory.WriteI32(this.pointer + 0x10, value, false);
    }
}
