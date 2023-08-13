//	Script by Vital (Vitaly Pavlovich Ulyanov)
/* Some Plugin SDK classes for GTA: San Andreas. Thanks to:
    - GTA community for research;
    - DK22Pac for Plugin SDK [https://github.com/DK22Pac/plugin-sdk];
    - Seemann and wmysterio for help.
*/

export class CGame {
    static GetMissionPackId(): int {
        return Memory.ReadU8(0xb72910, false);
    }
    static CanSeeOutsideFromCurrArea(): boolean {
        return Memory.Fn.StdcallU8(0x53c4a0)() !== 0;
    }
    static CanSeeWaterFromCurrArea(): boolean {
        return Memory.Fn.StdcallU8(0x53c4b0)() !== 0;
    }
}
