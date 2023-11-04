//	Script by Vital (Vitaly Pavlovich Ulyanov)
/* Some Plugin SDK classes for GTA: San Andreas. Thanks to:
    - GTA community for research;
    - DK22Pac for Plugin SDK [https://github.com/DK22Pac/plugin-sdk];
    - Seemann and wmysterio for help.
*/

import { CPed } from "./CPed";

export class CPlayerPed extends CPed {
    protected playerData: int;
    protected playerInfo: int;

    constructor(playerId: int) {
        super(new Player(playerId).getChar());
        this.pointer = Memory.GetPedPointer(this.handle);
        this.playerData = Memory.ReadI32(this.pointer + 0x480, false);
        this.playerInfo = Memory.CallMethodReturn(0x609ff0, this.pointer, 0, 0);
    }

    //#region Properties' getters and setters
    get sprintDuration(): float {
        return Memory.ReadFloat(this.playerData + 0x18, false);
    }
    set sprintDuration(value: float) {
        Memory.WriteFloat(this.playerData + 0x18, value, false);
    }

    get sprintEnergy(): float {
        return Memory.ReadFloat(this.playerData + 0x1c, false);
    }
    set sprintEnergy(value: float) {
        Memory.WriteFloat(this.playerData + 0x1c, value, false);
    }

    get breath(): float {
        return Memory.ReadFloat(this.playerData + 0x44, false);
    }
    set breath(value: float) {
        Memory.WriteFloat(this.playerData + 0x44, value, false);
    }

    get sprintDisabled(): boolean {
        return Memory.ReadU8(this.playerData + 0x84, false) !== 0;
    }
    set sprintDisabled(value: boolean) {
        Memory.WriteU8(this.playerData + 0x84, +value, false);
    }

    get wetnessPercent(): int {
        return Memory.ReadU8(this.playerData + 0x8c, false);
    }
    set wetnessPercent(value: int) {
        Memory.WriteU8(this.playerData + 0x8c, +value, false);
    }

    get waterCoverPercent(): int {
        return Memory.ReadU8(this.playerData + 0x8e, false);
    }
    get waterHeight(): float {
        return Memory.ReadFloat(this.playerData + 0x90, false);
    }

    get money(): int {
        return Memory.ReadI32(this.playerInfo + 0xb8, false);
    }
    set money(value: int) {
        Memory.WriteI32(this.playerInfo + 0xb8, value, false);
    }

    get displayedMoney(): int {
        return Memory.ReadI32(this.playerInfo + 0xbc, false);
    }
    set displayedMoney(value: int) {
        Memory.WriteI32(this.playerInfo + 0xbc, value, false);
    }

    get maxHealth(): int {
        return Memory.ReadU8(this.playerInfo + 0x14f, true);
    }
    //#endregion

    getCrosshairRadiusOnScreen(): float {
        return Memory.CallMethodReturnFloat(0x609cd0, this.pointer, 0, 0);
    }
    doesWeaponLockOnTargetExist(): boolean {
        return Memory.Fn.ThiscallU8(0x60dc50, this.pointer)() !== 0;
    }
    findPedToAttack(): CPed {
        let pedPointer: int = Memory.Fn.ThiscallI32(0x60c5f0, this.pointer)();
        return pedPointer ? new CPed(pedPointer) : undefined;
    }
}
