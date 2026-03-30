// Script by Vital (Vitaly Pavlovich Ulyanov)

export class Explosion {
    pointer: int;

    constructor(pointer: int) {
        this.pointer = pointer;
    }

    get type(): int {
        return Memory.Read(this.pointer + 0, 4, false);
    }
    set type(value: int) {
        Memory.Write(this.pointer + 0, 4, value, false);
    }

    get position(): [float, float, float] {
        return [
            Memory.ReadFloat(this.pointer + 4, false),
            Memory.ReadFloat(this.pointer + 4 + 4, false),
            Memory.ReadFloat(this.pointer + 4 + 8, false),
        ];
    }
    set position(value: [float, float, float]) {
        Memory.WriteFloat(this.pointer + 4, value[0], false);
        Memory.WriteFloat(this.pointer + 4 + 4, value[1], false);
        Memory.WriteFloat(this.pointer + 4 + 8, value[2], false);
    }

    get radius(): float {
        return Memory.ReadFloat(this.pointer + 16, false);
    }
    set radius(value: float) {
        Memory.WriteFloat(this.pointer + 16, value, false);
    }

    get propagationRate(): float {
        return Memory.ReadFloat(this.pointer + 20, false);
    }
    set propagationRate(value: float) {
        Memory.WriteFloat(this.pointer + 20, value, false);
    }

    get creatorEntity(): int {
        return Memory.Read(this.pointer + 24, 4, false);
    }
    set creatorEntity(value: int) {
        Memory.Write(this.pointer + 24, 4, value, false);
    }

    get victimEntity(): int {
        return Memory.Read(this.pointer + 28, 4, false);
    }
    set victimEntity(value: int) {
        Memory.Write(this.pointer + 28, 4, value, false);
    }

    get stopTime(): int {
        return Memory.Read(this.pointer + 32, 4, false);
    }
    set stopTime(value: int) {
        Memory.Write(this.pointer + 32, 4, value, false);
    }

    get iteration(): int {
        return Memory.Read(this.pointer + 36, 1, false);
    }
    set iteration(value: int) {
        Memory.Write(this.pointer + 36, 1, value, false);
    }

    get activeCounter(): int {
        return Memory.Read(this.pointer + 37, 1, false);
    }
    set activeCounter(value: int) {
        Memory.Write(this.pointer + 37, 1, value, false);
    }

    get isBoat(): boolean {
        return Memory.Read(this.pointer + 38, 1, false) !== 0;
    }
    set isBoat(value: boolean) {
        Memory.Write(this.pointer + 38, 1, +value, false);
    }

    get makeSound(): boolean {
        return Memory.Read(this.pointer + 39, 1, false) !== 0;
    }
    set makeSound(value: boolean) {
        Memory.Write(this.pointer + 39, 1, +value, false);
    }

    get startTime(): int {
        return Memory.Read(this.pointer + 40, 4, false);
    }
    set startTime(value: int) {
        Memory.Write(this.pointer + 40, 4, value, false);
    }

    get particlesExpireTime(): int {
        return Memory.Read(this.pointer + 44, 4, false);
    }
    set particlesExpireTime(value: int) {
        Memory.Write(this.pointer + 44, 4, value, false);
    }

    get power(): float {
        return Memory.ReadFloat(this.pointer + 48, false);
    }
    set power(value: float) {
        Memory.WriteFloat(this.pointer + 48, value, false);
    }

    get zShift(): float {
        return Memory.ReadFloat(this.pointer + 52, false);
    }
    set zShift(value: float) {
        Memory.WriteFloat(this.pointer + 52, value, false);
    }
}

export const explosions: Explosion[] = new Array<Explosion>(0x30)
    .fill(undefined)
    .map((e, i) => new Explosion(0x780c88 + 0x38 * i));
