//	Script by Vital (Vitaly Pavlovich Ulyanov)
/* Some Plugin SDK classes for GTA: San Andreas. Thanks to:
    - GTA community for research;
    - DK22Pac for Plugin SDK [https://github.com/DK22Pac/plugin-sdk];
    - Seemann and wmysterio for help.
*/

import { CVector } from "./CVector";

export class CCamera {
    private static thirdPersonOutCamera: CVector = new CVector(
        Memory.Allocate(12)
    );
    private static thirdPersonOutPoint: CVector = new CVector(
        Memory.Allocate(12)
    );
    static pointer: int = 0xb6f028;
    static fixedModeVector = new CVector(this.pointer + 0x860);
    static fixedModeSource = new CVector(this.pointer + 0x86c);
    static matrixPointer = Memory.ReadI32(this.pointer + 0x14, false);
    static right = new CVector(this.matrixPointer);
    static forward = new CVector(this.matrixPointer + 0x10);
    static up = new CVector(this.matrixPointer + 0x20);
    static pos = new CVector(this.matrixPointer + 0x30);

    static get fov(): float {
        return Memory.ReadFloat(CCamera.pointer + 0xcb8, false);
    }
    static set fov(value: float) {
        Memory.WriteFloat(CCamera.pointer + 0xcb8, value, false);
    }

    static GetFadingDirection(): int {
        return Memory.CallMethodReturn(0x50adf0, this.pointer, 0, 0);
    }
    static Find3rdPersonCamTargetVector(distance: float, source: CVector) {
        // Big thanks to Seemann for reminding about `Memory.FromFloat`.
        Memory.CallMethod(
            0x514970,
            this.pointer,
            6,
            0,
            Memory.FromFloat(distance),
            Memory.FromFloat(source.x),
            Memory.FromFloat(source.y),
            Memory.FromFloat(source.z),
            this.thirdPersonOutCamera.pointer,
            this.thirdPersonOutPoint.pointer
        );
        return {
            camera: this.thirdPersonOutCamera,
            pos: this.thirdPersonOutPoint,
        };
    }
    /** Seems to get a cutscene's duration, as the value doesn't update every frame. */
    static GetCutsceneFinishTime(): int {
        return Memory.CallMethodReturn(0x50ad90, this.pointer, 0, 0);
    }
    static GetFading(): boolean {
        return Memory.Fn.ThiscallU8(0x50ade0, this.pointer)() !== 0;
    }
    static Using1stPersonWeaponMode(): boolean {
        return Memory.Fn.ThiscallU8(0x50bff0, this.pointer)() !== 0;
    }
}
