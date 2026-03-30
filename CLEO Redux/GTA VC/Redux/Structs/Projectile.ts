// Script by Vital (Vitaly Pavlovich Ulyanov)

export class Projectile {
    pointer: int;

    constructor(pointer: int) {
        this.pointer = pointer;
    }

    get weaponType(): int {
        return Memory.Read(this.pointer + 0, 4, false);
    }
    set weaponType(value: int) {
        Memory.Write(this.pointer + 0, 4, value, false);
    }

    get source(): int {
        return Memory.Read(this.pointer + 4, 4, false);
    }
    set source(value: int) {
        Memory.Write(this.pointer + 4, 4, value, false);
    }

    get explosionTime(): int {
        return Memory.Read(this.pointer + 8, 4, false);
    }
    set explosionTime(value: int) {
        Memory.Write(this.pointer + 8, 4, value, false);
    }

    get inUse(): boolean {
        return Memory.Read(this.pointer + 12, 1, false) !== 0;
    }
    set inUse(value: boolean) {
        Memory.Write(this.pointer + 12, 1, +value, false);
    }

    get position(): [float, float, float] {
        return [
            Memory.ReadFloat(this.pointer + 16, false),
            Memory.ReadFloat(this.pointer + 16 + 4, false),
            Memory.ReadFloat(this.pointer + 16 + 8, false),
        ];
    }
    set position(value: [float, float, float]) {
        Memory.WriteFloat(this.pointer + 16, value[0], false);
        Memory.WriteFloat(this.pointer + 16 + 4, value[1], false);
        Memory.WriteFloat(this.pointer + 16 + 8, value[2], false);
    }
}

export const projectiles: Projectile[] = new Array<Projectile>(0x20)
    .fill(undefined)
    .map((p, i) => new Projectile(0x7db888 + 0x1c * i));
