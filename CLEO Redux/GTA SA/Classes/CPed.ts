//	Script by Vital (Vitaly Pavlovich Ulyanov)
/* Some Plugin SDK classes for GTA: San Andreas. Thanks to:
    - GTA community for research;
    - DK22Pac for Plugin SDK [https://github.com/DK22Pac/plugin-sdk];
    - Seemann and wmysterio for help.
*/

import { CEntity } from "./CEntity";
import { CFire } from "./CFire";
import { CPhysical } from "./CPhysical";
import { CVector } from "./CVector";
import { CVehicle } from "./CVehicle";
import { PedBones } from "./ePedBones";

export class CPed extends CPhysical {
    protected static bonePos: CVector = new CVector(Memory.Allocate(12));
    handle: Char;

    constructor(pedOrPointer: Char | int) {
        if (pedOrPointer instanceof Char) {
            super(Memory.GetPedPointer(pedOrPointer));
            this.handle = pedOrPointer;
            this.pointer = Memory.GetPedPointer(pedOrPointer);
        } else {
            super(pedOrPointer);
            this.handle = Memory.GetPedRef(pedOrPointer);
            this.pointer = pedOrPointer;
        }
    }
    static GetAllPeds(): CPed[] {
        // Thanks to Seemann and his scm module: https://github.com/x87/scm.ts/blob/main/scm.ts
        let peds: CPed[] = [];
        let base: int = Memory.ReadI32(0xb74490, false);
        let entities: int = Memory.ReadU32(base + 0, false);
        let byteMap: int = Memory.ReadU32(base + 4, false);
        let poolSize: int = Memory.ReadI32(base + 8, false);

        for (let i = 0; i < poolSize; i++) {
            let isFree = Memory.ReadU8(byteMap + i, false) & 0x80;
            if (!isFree) {
                peds.push(new CPed(entities + i * 0x7c4));
            }
        }
        return peds;
    }

    //#region Properties' getters and setters
    get currentWeapon(): int {
        return this.handle.getCurrentWeapon();
    }
    set currentWeapon(value: int) {
        this.handle.setCurrentWeapon(value);
    }

    get currentWeaponModel(): int {
        return Memory.ReadI32(this.pointer + 0x740, false);
    }
    set currentWeaponModel(value: int) {
        Memory.CallMethod(0x5e5ed0, this.pointer, 1, 0, value);
    }

    /** Slot range `[0;12]`. */
    get currentWeaponSlot(): int {
        return Memory.ReadU8(this.pointer + 0x718, false);
    }
    set currentWeaponSlot(value: int) {
        Memory.CallMethod(0x5e61f0, this.pointer, 1, 0, value);
    }

    /** Headings range `[-3.14;3.14]`. */
    get targetHeading(): float {
        return Memory.ReadFloat(this.pointer + 0x55c, false);
    }
    set targetHeading(value: float) {
        Memory.WriteFloat(this.pointer + 0x55c, value, false);
    }

    get currentHeading(): float {
        return Memory.ReadFloat(this.pointer + 0x558, false);
    }
    set currentHeading(value: float) {
        Memory.WriteFloat(this.pointer + 0x558, value, false);
    }

    get health(): float {
        return Memory.ReadFloat(this.pointer + 0x540, false);
    }
    set health(value: float) {
        Memory.WriteFloat(this.pointer + 0x540, value, false);
    }

    get maxHealth(): float {
        return Memory.ReadFloat(this.pointer + 0x544, false);
    }
    set maxHealth(value: float) {
        Memory.WriteFloat(this.pointer + 0x544, value, false);
    }

    get rotationSpeed(): float {
        return Memory.ReadFloat(this.pointer + 0x560, false);
    }
    set rotationSpeed(value: float) {
        Memory.WriteFloat(this.pointer + 0x560, value, false);
    }

    get fire(): CFire {
        let firePointer: int = Memory.ReadI32(this.pointer + 0x730, false);
        return firePointer ? new CFire(firePointer) : undefined;
    }
    set fire(fire: CFire) {
        Memory.WriteI32(this.pointer + 0x730, fire.pointer, false);
    }

    get targetedPed(): CPed {
        let pedPointer: int = Memory.ReadI32(this.pointer + 0x79c, false);
        return pedPointer ? new CPed(pedPointer) : undefined;
    }
    /** 1 - game, 2 - script */
    get createdBy(): int {
        return Memory.ReadU8(this.pointer + 0x484, false);
    }
    get contactEntity(): CEntity {
        let entityPointer: int = Memory.ReadI32(this.pointer + 0x584, false);
        return entityPointer ? new CEntity(entityPointer) : undefined;
    }
    get vehicle(): CVehicle {
        let vehiclePointer: int = Memory.ReadI32(this.pointer + 0x58c, false);
        return vehiclePointer ? new CVehicle(vehiclePointer) : undefined;
    }

    set modelIndex(value: int) {
        Memory.CallMethod(0x5e4880, this.pointer, 1, 0, value);
    }
    //#endregion

    pedCanPickUpPickUp(): boolean {
        return Memory.Fn.ThiscallU8(0x455560, this.pointer)() !== 0;
    }
    createDeadPedMoney() {
        Memory.CallMethod(0x4590f0, this.pointer, 0, 0);
        return this;
    }
    createDeadPedWeaponPickups() {
        Memory.CallMethod(0x4591d0, this.pointer, 0, 0);
        return this;
    }
    isPlayer(): boolean {
        return Memory.Fn.ThiscallU8(0x5df8f0, this.pointer)() !== 0;
    }
    setPedState(state: int) {
        Memory.CallMethod(0x5e4500, this.pointer, 1, 0, state);
        return this;
    }
    canRunAndFireWithWeapon(): boolean {
        return Memory.Fn.ThiscallU8(0x5e88e0, this.pointer)() !== 0;
    }
    giveDelayedWeapon(weaponType: int, ammo: int) {
        Memory.CallMethod(0x5e89b0, this.pointer, 2, 0, weaponType, ammo);
        return this;
    }
    /** The only working ped node (bone) seems to be 2 (head). */
    removeBodyPart(pedNode: int, direction: int) {
        Memory.CallMethod(0x5f0140, this.pointer, 2, 0, pedNode, direction);
        return this;
    }
    isAlive(): boolean {
        return Memory.Fn.ThiscallU8(0x5e0170, this.pointer)() !== 0;
    }
    getWalkAnimSpeed(): float {
        return Memory.CallMethodReturnFloat(0x5e04b0, this.pointer, 0, 0);
    }
    getBonePosition(boneId: int | PedBones, isDynamic: boolean): CVector {
        Memory.Fn.Thiscall(0x5e4280, this.pointer)(
            CPed.bonePos.pointer,
            boneId,
            +isDynamic
        );
        return CPed.bonePos;
    }
    getWeaponSkill(): int {
        return Memory.Fn.ThiscallU8(0x5e6580, this.pointer)();
    }
    toString() {
        return `Pointer: ${this.pointer}. Handle: ${+this.handle}.`;
    }
}
