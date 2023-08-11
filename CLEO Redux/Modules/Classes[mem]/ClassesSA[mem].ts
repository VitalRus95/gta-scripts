//	Script by Vital (Vitaly Pavlovich Ulyanov)
/* Some Plugin SDK classes for GTA: San Andreas. Thanks to:
    - GTA community for research;
    - DK22Pac for Plugin SDK [https://github.com/DK22Pac/plugin-sdk];
    - Seemann and wmysterio for help.
*/

//#region Useful functions
export function isNumInRange(value: number, min: number, max: number) {
    return value >= min && value <= max;
}

export function clamp(value: number, min: number, max: number) {
    return value > max ? max : value < min ? min : value;
}

export function getWindowResolution() {
    return {
        width: Memory.ReadI32(0xc17040 + 4, false),
        height: Memory.ReadI32(0xc17040 + 8, false),
    };
}

export function convertToGameScreenPos(x: float, y: float) {
    let res = getWindowResolution();
    return {
        x: (x / res.width) * 640,
        y: (y / res.height) * 448,
    };
}
//#endregion

//#region Basic classes
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

export class CEntity extends CPlaceable {
    constructor(pointer: int) {
        super(pointer);
    }
    get modelIndex(): int {
        return Memory.ReadI16(this.pointer + 0x22, false);
    }
}

export class CPhysical extends CEntity {
    moveSpeed: CVector;
    turnSpeed: CVector;
    frictionMoveSpeed: CVector;
    frictionTurnSpeed: CVector;
    force: CVector;
    torque: CVector;
    centreOfMass: CVector;
    lastCollisionDirection: CVector;
    lastCollisionPosition: CVector;

    constructor(pointer: int) {
        super(pointer);
        this.moveSpeed = new CVector(this.pointer + 0x44);
        this.turnSpeed = new CVector(this.pointer + 0x50);
        this.frictionMoveSpeed = new CVector(this.pointer + 0x5c);
        this.frictionTurnSpeed = new CVector(this.pointer + 0x68);
        this.force = new CVector(this.pointer + 0x74);
        this.torque = new CVector(this.pointer + 0x80);
        this.centreOfMass = new CVector(this.pointer + 0xa4);
        this.lastCollisionDirection = new CVector(this.pointer + 0xe0);
        this.lastCollisionPosition = new CVector(this.pointer + 0xec);
    }
    get damageIntensity(): float {
        return Memory.ReadFloat(this.pointer + 0xd8, false);
    }
    set damageIntensity(value: float) {
        Memory.WriteFloat(this.pointer + 0xd8, value, false);
    }

    get movingSpeed(): float {
        return Memory.ReadFloat(this.pointer + 0xd4, false);
    }
    get contactSurfaceBrightness(): float {
        return Memory.ReadFloat(this.pointer + 0x12c, false);
    }
    get dynamicLighting(): float {
        return Memory.ReadFloat(this.pointer + 0x130, false);
    }
}

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

//#region Game classes
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

export class CPed extends CPhysical {
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

    get targetedPed(): CPed {
        let pedPointer: int = Memory.ReadI32(this.pointer + 0x79c, false);
        if (pedPointer !== 0) {
            return new CPed(pedPointer);
        }
    }
    /** 1 - game, 2 - script */
    get createdBy(): int {
        return Memory.ReadU8(this.pointer + 0x484, false);
    }
    get contactEntity(): CEntity {
        let entityPointer: int = Memory.ReadI32(this.pointer + 0x584, false);
        if (entityPointer !== 0) {
            return new CEntity(entityPointer);
        }
    }
    get vehicle(): CVehicle {
        let vehiclePointer: int = Memory.ReadI32(this.pointer + 0x58c, false);
        if (vehiclePointer !== 0) {
            return new CVehicle(vehiclePointer);
        }
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
    toString() {
        return `Pointer: ${this.pointer}. Handle: ${+this.handle}.`;
    }
}

export class CPickups {
    static DoCollectableEffects(entity: CEntity) {
        Memory.CallFunction(0x455e20, 1, 1, entity.pointer);
    }
    static DoMineEffects(entity: CEntity) {
        Memory.CallFunction(0x4560e0, 1, 1, entity.pointer);
    }
    static DoMoneyEffects(entity: CEntity) {
        Memory.CallFunction(0x454e80, 1, 1, entity.pointer);
    }
    static DoPickUpEffects(entity: CEntity) {
        Memory.CallFunction(0x455720, 1, 1, entity.pointer);
    }
    static ModelForWeapon(weaponType: int): int {
        return Memory.CallFunctionReturn(0x454ac0, 1, 1, weaponType);
    }
    static WeaponForModel(modelIndex: int) {
        return Memory.CallFunctionReturn(0x454ae0, 1, 1, modelIndex);
    }
    static PickedUpHorseShoe() {
        Memory.CallFunction(0x455390, 0, 0);
    }
    static PickedUpOyster() {
        Memory.CallFunction(0x4552d0, 0, 0);
    }
}

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
}

export class CRenderer {
    /** Heading range `±3.14`. */
    static cameraPosition: CVector = new CVector(0xb76870);
    static GetCameraHeading(): float {
        return Memory.ReadFloat(0xb7684c, false);
    }
    static GetInTheSky(): boolean {
        return Memory.ReadU8(0xb76851, false) !== 0;
    }
}

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

export class CVehicle extends CPhysical {
    handle: Car;

    constructor(carOrPointer: Car | int) {
        if (carOrPointer instanceof Car) {
            super(Memory.GetVehiclePointer(carOrPointer));
            this.handle = carOrPointer;
            this.pointer = Memory.GetVehiclePointer(carOrPointer);
        } else {
            super(carOrPointer);
            this.handle = Memory.GetVehicleRef(carOrPointer);
            this.pointer = carOrPointer;
        }
    }
}
//#endregion
