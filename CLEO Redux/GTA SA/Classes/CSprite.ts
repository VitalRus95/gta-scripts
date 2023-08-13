//	Script by Vital (Vitaly Pavlovich Ulyanov)
/* Some Plugin SDK classes for GTA: San Andreas. Thanks to:
    - GTA community for research;
    - DK22Pac for Plugin SDK [https://github.com/DK22Pac/plugin-sdk];
    - Seemann and wmysterio for help.
*/

import { CVector } from "./CVector";

export class CSprite {
    protected static screenPos: CVector = new CVector(Memory.Allocate(12));
    protected static allocatedMemory: int = Memory.Allocate(8);
    protected static widthPointer: int = this.allocatedMemory;
    protected static heightPointer: int = this.allocatedMemory + 4;

    static CalcScreenCoors(
        pos: CVector,
        checkMaxVisible: boolean,
        checkMinVisible: boolean
    ) {
        CVector.AssignPointers([pos]);
        Memory.CallFunctionReturn(
            0x70ce30,
            6,
            6,
            pos.pointer,
            this.screenPos.pointer,
            this.widthPointer,
            this.heightPointer,
            +checkMaxVisible,
            +checkMinVisible
        );
        return {
            x: this.screenPos.x,
            y: this.screenPos.y,
            width: Memory.ReadFloat(this.widthPointer, false),
            height: Memory.ReadFloat(this.heightPointer, false),
        };
    }
}
