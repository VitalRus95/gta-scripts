// Functions by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import {
    AnimationGroupId,
    AnimationId,
    CameraMode,
    MoveState,
} from "./vc_enums.mts";

// Exported constants
export const PLAYER: Player = new Player(0);
export const PLAYER_CHAR: Char = PLAYER.getChar();
export const PLAYER_POINTER: int = Memory.GetPedPointer(PLAYER_CHAR);

// Internal constants
const PLAYER_FLAGS_OFFSET: int = PLAYER_POINTER + 0x150;
const PLAYER_CLUMP_OFFSET: int = PLAYER_POINTER + 0x4c;
const PLAYER_VELOCITY_OFFSET: int = PLAYER_POINTER + 0x070;
const PLAYER_STATUS_OFFSET: int = PLAYER_POINTER + 0x244;
const PLAYER_MOVE_STATE_OFFSET: int = PLAYER_POINTER + 0x24c;

const THIS_PAD: int = Memory.Fn.Cdecl(0x4ab060)(0);

const CAM_MODE: int = 0x7e481c;
const CAM_X: int = 0x7e48cc;
const CAM_Y: int = 0x7e48bc;

const SCREEN_WIDTH: int = 0x9b48d8 + 0xc;
const SCREEN_HEIGHT: int = 0x9b48d8 + 0x10;

const CAM_SOURCE_BUFFER: int = Memory.Allocate(12);
const CAM_TARGET_BUFFER: int = Memory.Allocate(12);
const POINT1_BUFFER: int = Memory.Allocate(12);
const POINT2_BUFFER: int = Memory.Allocate(12);

// Exported constants
export function clamp(min: number, value: number, max: number): number {
    return value > max ? max : value < min ? min : value;
}

export function isMouseAndKeyboardUsed(): boolean {
    return Memory.ReadU8(0xa10b4c, false) !== 0;
}

export function isPlayerCrouching(): boolean {
    return (Memory.ReadU8(PLAYER_FLAGS_OFFSET, false) & 0b00001000) !== 0;
}

export function isPlayerJumping(): boolean {
    return Memory.ReadI32(PLAYER_STATUS_OFFSET, false) === 0x29;
}

export function isDuckJustDown(): boolean {
    return Memory.Fn.ThiscallU8(0x4aa430, THIS_PAD)() !== 0;
}

export function isJumpJustDown(): boolean {
    return Memory.Fn.ThiscallU8(0x4aa400, THIS_PAD)() !== 0;
}

export function isExitVehicleJustDown(): boolean {
    return Memory.Fn.ThiscallU8(0x4aa870, THIS_PAD)() !== 0;
}

export function isCycleCameraJustDown(): boolean {
    return Memory.Fn.ThiscallU8(0x4aa630, THIS_PAD)() !== 0;
}

export function getPlayerClump(): int {
    return Memory.ReadI32(PLAYER_CLUMP_OFFSET, false);
}

export function getPlayerMoveState(): MoveState {
    return Memory.ReadU32(PLAYER_MOVE_STATE_OFFSET, false);
}

export function blendCharAnimation(
    clump: int,
    animGroupId: AnimationGroupId,
    animId: AnimationId,
    blend: float,
) {
    Memory.Fn.Cdecl(0x405640)(
        clump,
        animGroupId,
        animId,
        Memory.FromFloat(blend),
    );
}

export function getPlayerVelocity(): { x: float; y: float; z: float } {
    return {
        x: Memory.ReadFloat(PLAYER_VELOCITY_OFFSET, false),
        y: Memory.ReadFloat(PLAYER_VELOCITY_OFFSET + 4, false),
        z: Memory.ReadFloat(PLAYER_VELOCITY_OFFSET + 8, false),
    };
}

export function setPlayerVelocity(x: float = 0, y: float = 0, z: float = 0) {
    Memory.WriteFloat(PLAYER_VELOCITY_OFFSET, x, false);
    Memory.WriteFloat(PLAYER_VELOCITY_OFFSET + 4, y, false);
    Memory.WriteFloat(PLAYER_VELOCITY_OFFSET + 8, z, false);
}

export function getCameraMode(): CameraMode {
    return Memory.ReadU32(CAM_MODE, false);
}

export function getCameraRotation(): { x: float; y: float } {
    return {
        x: Memory.ReadFloat(CAM_X, false),
        y: Memory.ReadFloat(CAM_Y, false),
    };
}

export function setCameraRotation(x: float, y: float) {
    Memory.WriteFloat(CAM_X, x, false);
    Memory.WriteFloat(CAM_Y, y, false);
}

export function getTimeStep(): float {
    return Memory.ReadFloat(0x975424, false);
}

export function getScreenSize(): { x: int; y: int } {
    return {
        x: Memory.ReadI32(SCREEN_WIDTH, false),
        y: Memory.ReadI32(SCREEN_HEIGHT, false),
    };
}

export function getMouseInput(): { x: float; y: float } {
    return {
        x: Memory.ReadFloat(0x936910, false),
        y: Memory.ReadFloat(0x936914, false),
    };
}

export function find3rdPersonCamTargetVector(
    distance: float,
    position: {
        x: float;
        y: float;
        z: float;
    },
): { x: float; y: float; z: float } {
    Memory.Fn.Thiscall(0x46f890, 0x7e4688)(
        Memory.FromFloat(distance),
        Memory.FromFloat(position.x),
        Memory.FromFloat(position.y),
        Memory.FromFloat(position.z),
        CAM_SOURCE_BUFFER,
        CAM_TARGET_BUFFER,
    );
    return {
        x: Memory.ReadFloat(CAM_TARGET_BUFFER, false),
        y: Memory.ReadFloat(CAM_TARGET_BUFFER + 4, false),
        z: Memory.ReadFloat(CAM_TARGET_BUFFER + 8, false),
    };
}

export function isLineOfSightClear(
    point1: { x: float; y: float; z: float },
    point2: { x: float; y: float; z: float },
    checkBuildings: boolean,
    checkVehicles: boolean,
    checkPeds: boolean,
    checkObjects: boolean,
    checkDummies: boolean,
    ignoreSeeThrough: boolean,
    ignoreSomeObjects: boolean,
): boolean {
    Memory.WriteFloat(POINT1_BUFFER, point1.x, false);
    Memory.WriteFloat(POINT1_BUFFER, point1.y, false);
    Memory.WriteFloat(POINT1_BUFFER, point1.z, false);

    Memory.WriteFloat(POINT2_BUFFER, point2.x, false);
    Memory.WriteFloat(POINT2_BUFFER, point2.y, false);
    Memory.WriteFloat(POINT2_BUFFER, point2.z, false);

    return (
        Memory.Fn.Cdecl(0x4da560)(
            POINT1_BUFFER,
            POINT2_BUFFER,
            +checkBuildings,
            +checkVehicles,
            +checkPeds,
            +checkObjects,
            +checkDummies,
            +ignoreSeeThrough,
            +ignoreSomeObjects,
        ) !== 0
    );
}
