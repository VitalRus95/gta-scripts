//	Script by Vital (Vitaly Pavlovich Ulyanov)
/* Some Plugin SDK classes for GTA: San Andreas. Thanks to:
    - GTA community for research;
    - DK22Pac for Plugin SDK [https://github.com/DK22Pac/plugin-sdk];
    - Seemann and wmysterio for help.
*/

import { CVector } from "./CVector";

export class CPlaceable {
    protected matrixPointer: int;
    pointer: int;
    right: CVector;
    forward: CVector;
    up: CVector;
    pos: CVector;

    constructor(pointer: int) {
        this.pointer = pointer;
        this.matrixPointer = Memory.ReadI32(this.pointer + 0x14, false);
        this.right = new CVector(this.matrixPointer);
        this.forward = new CVector(this.matrixPointer + 0x10);
        this.up = new CVector(this.matrixPointer + 0x20);
        this.pos = new CVector(this.matrixPointer + 0x30);
    }
    toString() {
        return `${this.pointer}`;
    }
}
