//	Script by Vital (Vitaly Pavlovich Ulyanov)
/* Some Plugin SDK classes for GTA: San Andreas. Thanks to:
    - GTA community for research;
    - DK22Pac for Plugin SDK [https://github.com/DK22Pac/plugin-sdk];
    - Seemann and wmysterio for help.
*/

export class CPad {
    static thisPad: int = Memory.CallFunctionReturn(0x53fb70, 1, 1, 0);
    static playerPointer: int = Memory.GetPedPointer(new Player(0).getChar());

    static AccelerateJustDown(): boolean {
        return Memory.Fn.ThiscallU8(0x540440, this.thisPad)() !== 0;
    }
    static CarGunJustDown(): boolean {
        return Memory.Fn.ThiscallU8(0x53ffe0, this.thisPad)() !== 0;
    }
    static CircleJustDown(): boolean {
        return Memory.Fn.ThiscallU8(0x53ef60, this.thisPad)() !== 0;
    }
    static CollectPickupJustDown(): boolean {
        return Memory.Fn.ThiscallU8(0x540a70, this.thisPad)() !== 0;
    }
    static ConversationNoJustDown(): boolean {
        return Memory.Fn.ThiscallU8(0x541200, this.thisPad)() !== 0;
    }
    static ConversationYesJustDown(): boolean {
        return Memory.Fn.ThiscallU8(0x5411d0, this.thisPad)() !== 0;
    }
    static CrossJustDown(): boolean {
        return Memory.Fn.ThiscallU8(0x4d59e0, this.thisPad)() !== 0;
    }
    static CycleCameraModeJustDown(): boolean {
        return Memory.Fn.ThiscallU8(0x540530, this.thisPad)() !== 0;
    }
    static CycleWeaponLeftJustDown(): boolean {
        return Memory.Fn.ThiscallU8(0x540610, this.thisPad)() !== 0;
    }
    static CycleWeaponRightJustDown(): boolean {
        return Memory.Fn.ThiscallU8(0x540640, this.thisPad)() !== 0;
    }
    static DuckJustDown(): boolean {
        return Memory.Fn.ThiscallU8(0x540720, this.thisPad)() !== 0;
    }
    static ExitVehicleJustDown(): boolean {
        return Memory.Fn.ThiscallU8(0x540120, this.thisPad)() !== 0;
    }
    static GroupControlBackJustDown(): boolean {
        return Memory.Fn.ThiscallU8(0x541260, this.thisPad)() !== 0;
    }
    static GroupControlForwardJustDown(): boolean {
        return Memory.Fn.ThiscallU8(0x541230, this.thisPad)() !== 0;
    }
    static HornJustDown(): boolean {
        return Memory.Fn.ThiscallU8(0x53ff30, this.thisPad)() !== 0;
    }
    static JumpJustDown(): boolean {
        return Memory.Fn.ThiscallU8(0x540770, this.thisPad)() !== 0;
    }
    static LeftShoulder1JustDown(): boolean {
        return Memory.Fn.ThiscallU8(0x53edc0, this.thisPad)() !== 0;
    }
    static LeftShoulder2JustDown(): boolean {
        return Memory.Fn.ThiscallU8(0x53ede0, this.thisPad)() !== 0;
    }
    static NextStationJustUp(): boolean {
        return Memory.Fn.ThiscallU8(0x5405b0, this.thisPad)() !== 0;
    }
    static PreviousStationJustUp(): boolean {
        return Memory.Fn.ThiscallU8(0x5405e0, this.thisPad)() !== 0;
    }
    static RightShoulder1JustDown(): boolean {
        return Memory.Fn.ThiscallU8(0x53ee20, this.thisPad)() !== 0;
    }
    static SetDrunkInputDelay(delay: int) {
        Memory.CallMethod(0x53f910, this.thisPad, 1, 0, delay);
    }
    static ShiftTargetLeftJustDown(): boolean {
        return Memory.Fn.ThiscallU8(0x540850, this.thisPad)() !== 0;
    }
    static ShiftTargetRightJustDown(): boolean {
        return Memory.Fn.ThiscallU8(0x540880, this.thisPad)() !== 0;
    }
    static SprintJustDown(): boolean {
        return Memory.Fn.ThiscallU8(0x5407f0, this.thisPad)() !== 0;
    }
    static SquareJustDown(): boolean {
        return Memory.Fn.ThiscallU8(0x53ef20, this.thisPad)() !== 0;
    }
    static TargetJustDown(): boolean {
        // also works with brake in cars
        return Memory.Fn.ThiscallU8(0x5406b0, this.thisPad)() !== 0;
    }
    static TriangleJustDown(): boolean {
        return Memory.Fn.ThiscallU8(0x53ef40, this.thisPad)() !== 0;
    }
    static WeaponJustDown(): boolean {
        return (
            Memory.Fn.ThiscallU8(0x540250, this.thisPad)(this.playerPointer) !==
            0
        );
    }
}
