//	Script by Vital (Vitaly Pavlovich Ulyanov)
/* Some Plugin SDK classes for GTA: San Andreas. Thanks to:
    - GTA community for research;
    - DK22Pac for Plugin SDK [https://github.com/DK22Pac/plugin-sdk];
    - Seemann and wmysterio for help.
*/

import { CEntity } from "./CEntity";
import { CVector } from "./CVector";

export class CFire {
    static gFireManager: int = 0xb71f80;
    static start: int = 0xb71f80;
    static size: int = 0x28;
    static max: int = 0x3c;
    pointer: int;
    pos: CVector;

    constructor(pointer: int) {
        this.pointer = pointer;
        this.pos = new CVector(this.pointer + 0x4);
    }

    static GetNumOfNonScriptFires(): int {
        return Memory.Fn.ThiscallU32(0x538f10, this.gFireManager)();
    }
    static FindNearestFire(
        position: CVector,
        notBeingExtinguished: boolean,
        notScript: boolean
    ): CFire {
        let firePointer: int = Memory.Fn.ThiscallI32(
            0x538f40,
            this.gFireManager
        )(position.pointer, +notBeingExtinguished, +notScript);
        return firePointer ? new CFire(firePointer) : undefined;
    }
    /** Starts returning `false` at 55 fires out of 60 maximum. */
    static PlentyFiresAvailable(): boolean {
        return Memory.Fn.ThiscallU8(0x539340, this.gFireManager)() !== 0;
    }
    static ExtinguishPointWithWater(
        point: CVector,
        range: float,
        strength: float
    ): boolean {
        return (
            Memory.Fn.ThiscallU8(0x5394c0, this.gFireManager)(
                point.pointer,
                Memory.FromFloat(range),
                Memory.FromFloat(strength)
            ) !== 0
        );
    }
    static GetNextFreeFire(allowDeletingOldFire: boolean): CFire {
        let firePointer: int = Memory.Fn.ThiscallI32(
            0x539e50,
            this.gFireManager
        )(+allowDeletingOldFire);
        return firePointer ? new CFire(firePointer) : undefined;
    }
    static CreateInPoint(
        point: CVector,
        creator: CEntity,
        burnTime: int,
        numGenerations: int
    ): CFire {
        return new CFire(
            Memory.Fn.ThiscallI32(0x539f00, this.gFireManager)(
                Memory.FromFloat(point.x),
                Memory.FromFloat(point.y),
                Memory.FromFloat(point.z),
                Memory.FromFloat(1),
                1,
                creator?.pointer,
                burnTime,
                numGenerations,
                1
            )
        );
    }
    static CreateOnEntity(
        target: CEntity,
        creator: CEntity,
        burnTime: int,
        numGenerations: int
    ) {
        return new CFire(
            Memory.Fn.ThiscallI32(0x53a050, this.gFireManager)(
                target.pointer,
                creator?.pointer,
                Memory.FromFloat(1),
                1,
                burnTime,
                numGenerations
            )
        );
    }

    get entityOnFire(): CEntity {
        let pointer: int = Memory.ReadI32(this.pointer + 0x10, false);
        if (pointer !== 0) return new CEntity(pointer);
    }
    set entityOnFire(entity: CEntity) {
        Memory.WriteI32(this.pointer + 0x10, entity.pointer, false);
    }

    get scriptReferenceIndex(): int {
        return Memory.ReadI16(this.pointer + 0x2, false);
    }
    set scriptReferenceIndex(value: int) {
        Memory.WriteI16(this.pointer + 0x2, value, false);
    }

    get entityStartedFire(): CEntity {
        let pointer: int = Memory.ReadI32(this.pointer + 0x14, false);
        if (pointer !== 0) return new CEntity(pointer);
    }
    set entityStartedFire(entity: CEntity) {
        Memory.WriteI32(this.pointer + 0x14, entity.pointer, false);
    }

    get timeToBurn(): int {
        return Memory.ReadU32(this.pointer + 0x18, false);
    }
    set timeToBurn(value: int) {
        Memory.WriteU32(this.pointer + 0x18, value, false);
    }

    get strength(): float {
        return Memory.ReadFloat(this.pointer + 0x1c, false);
    }
    set strength(value: float) {
        Memory.WriteFloat(this.pointer + 0x1c, value, false);
    }

    get numGenerationsAllowed(): int {
        return Memory.ReadU8(this.pointer + 0x20, false);
    }
    set numGenerationsAllowed(value: int) {
        Memory.WriteU8(this.pointer + 0x20, value, false);
    }

    get removalDist(): int {
        return Memory.ReadU8(this.pointer + 0x21, false);
    }
    set removalDist(value: int) {
        Memory.WriteU8(this.pointer + 0x21, value, false);
    }

    doesExist(): boolean {
        return (Memory.ReadU8(this.pointer, false) & 0b00000001) !== 0;
    }
    isCreatedByScript(): boolean {
        return (Memory.ReadU8(this.pointer, false) & 0b00000010) !== 0;
    }
    isBeingExtinguished(): boolean {
        return (Memory.ReadU8(this.pointer, false) & 0b00001000) !== 0;
    }
}

export let fires: CFire[] = new Array<CFire>(60)
    .fill(undefined)
    .map((v, i) => new CFire(CFire.start + CFire.size * i));
