//	Script by Vital (Vitaly Pavlovich Ulyanov)
/* Some Plugin SDK classes for GTA: San Andreas. Thanks to:
    - GTA community for research;
    - DK22Pac for Plugin SDK [https://github.com/DK22Pac/plugin-sdk];
    - Seemann and wmysterio for help.
*/

export class CVector {
    protected static pointers: int[] = [];
    protected _x: float;
    protected _y: float;
    protected _z: float;
    type: "static" | "dynamic";
    pointer: int;

    constructor(coordsOrPointer: [float, float, float] | int = [0, 0, 0]) {
        if (typeof coordsOrPointer === "number") {
            this.type = "static";
            this.pointer = coordsOrPointer;
        } else {
            this.type = "dynamic";
            this.pointer = undefined;
        }
        this.set(coordsOrPointer);
    }

    static AssignPointers(vectors: CVector[]) {
        let dynVecs: CVector[] = vectors.filter((v) => v.type === "dynamic");
        for (let i = 0; i < dynVecs.length; i++) {
            CVector.pointers[i] ??= Memory.Allocate(12);
            dynVecs[i].pointer = CVector.pointers[i];
            Memory.WriteFloat(dynVecs[i].pointer, dynVecs[i].x, false);
            Memory.WriteFloat(dynVecs[i].pointer + 4, dynVecs[i].y, false);
            Memory.WriteFloat(dynVecs[i].pointer + 8, dynVecs[i].z, false);
        }
    }
    static GetNumOfPointers(): int {
        return CVector.pointers.length;
    }

    get x(): float {
        if (this.type === "static")
            this._x = Memory.ReadFloat(this.pointer, false);
        return this._x;
    }
    get y(): float {
        if (this.type === "static")
            this._y = Memory.ReadFloat(this.pointer + 4, false);
        return this._y;
    }
    get z(): float {
        if (this.type === "static")
            this._z = Memory.ReadFloat(this.pointer + 8, false);
        return this._z;
    }
    set x(value: float) {
        if (this.type === "static")
            Memory.WriteFloat(this.pointer, value, false);
        this._x = value;
    }
    set y(value: float) {
        if (this.type === "static")
            Memory.WriteFloat(this.pointer + 4, value, false);
        this._y = value;
    }
    set z(value: float) {
        if (this.type === "static")
            Memory.WriteFloat(this.pointer + 8, value, false);
        this._z = value;
    }
    get magnitude(): float {
        return Memory.CallMethodReturnFloat(0x4082c0, this.pointer, 0, 0);
    }
    get magnitude2D(): float {
        return Memory.CallMethodReturnFloat(0x406d50, this.pointer, 0, 0);
    }

    get(): [float, float, float] {
        return [this.x, this.y, this.z];
    }
    set(newPos: [float, float, float] | CVector | int) {
        if (newPos instanceof CVector) {
            this.x = newPos.x;
            this.y = newPos.y;
            this.z = newPos.z;
        } else if (typeof newPos === "number") {
            this.x = Memory.ReadFloat(newPos, false);
            this.y = Memory.ReadFloat(newPos + 4, false);
            this.z = Memory.ReadFloat(newPos + 8, false);
        } else {
            this.x = newPos[0];
            this.y = newPos[1];
            this.z = newPos[2];
        }
    }
    normalise() {
        Memory.CallMethod(0x59c910, this.pointer, 0, 0);
        return this;
    }
    normaliseAndGetMagnitude(): float {
        return Memory.CallMethodReturnFloat(0x59c970, this.pointer, 0, 0);
    }
    copy(): CVector {
        return new CVector([this.x, this.y, this.z]);
    }
    /** += */ add(other: CVector) {
        CVector.AssignPointers([other]);
        Memory.CallMethod(0x411a00, this.pointer, 1, 0, other.pointer);
        return this;
    }
    /** -= */ sub(other: CVector) {
        CVector.AssignPointers([other]);
        Memory.CallMethod(0x406d70, this.pointer, 1, 0, other.pointer);
        return this;
    }
    /** *= */ mul(multiplier: float) {
        this.x *= multiplier;
        this.y *= multiplier;
        this.z *= multiplier;
        return this;
    }
    /** /= */ div(divisor: float) {
        this.x /= divisor;
        this.y /= divisor;
        this.z /= divisor;
        return this;
    }
    toString() {
        return `${this.x.toFixed(2)} ${this.y.toFixed(2)} ${this.z.toFixed(2)}`;
    }
}
