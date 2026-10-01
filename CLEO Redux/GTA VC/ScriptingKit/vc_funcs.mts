// Functions by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import {
    AnimationGroupId,
    AnimationId,
    Button,
    CameraMode,
    DamageDirection,
    MoveState,
    PedPiece,
    WeaponType,
} from "./vc_enums.mts";

// Exported constants
export const PLAYER: Player = new Player(0);
export const PLAYER_CHAR: Char = PLAYER.getChar();
export const PLAYER_POINTER: int = Memory.GetPedPointer(PLAYER_CHAR);
export const THIS_PAD: int = Memory.Fn.Cdecl(0x4ab060)(0);

// Internal constants
const PED_FLAGS_OFFSET: int = 0x150;
const PED_CLUMP_OFFSET: int = 0x4c;
const PED_VELOCITY_OFFSET: int = 0x070;
const PED_STATUS_OFFSET: int = 0x244;
const PED_MOVE_STATE_OFFSET: int = 0x24c;

const GAME_CAMERA: int = 0x7e4688;
const CAM_MODE: int = 0x7e481c;
const CAM_ROTATION_X: int = 0x7e48cc;
const CAM_ROTATION_Y: int = 0x7e48bc;

const SCREEN_WIDTH: int = 0x9b48d8 + 0xc;
const SCREEN_HEIGHT: int = 0x9b48d8 + 0x10;

const CAM_SOURCE_BUFFER: int = Memory.Allocate(12);
const CAM_TARGET_BUFFER: int = Memory.Allocate(12);
const POINT1_BUFFER: int = Memory.Allocate(12);
const POINT2_BUFFER: int = Memory.Allocate(12);

const DISABLE_PLAYER_CONTROLS: int = THIS_PAD + 240;

// Exported functions
/**
 * Returns a random integer number in the specified range
 */
export function randomInt(min: int, max: int): int {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Returns a random float number in the specified range
 */
export function randomFloat(min: float, max: float): float {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random item of the specified array.
 */
export function randomArrayItem(array: any[]): any {
    return array[randomInt(0, array.length)];
}

/**
 * Limits the value strictly to the range between `min` and `max`
 */
export function clamp(min: number, value: number, max: number): number {
    return value > max ? max : value < min ? min : value;
}

/**
 * Limits the value, allowing it to 'restart' at `min` or `max` on overflow
 */
export function circularClamp(min: number, value: number, max: number): number {
    return value > max ? min : value < min ? max : value;
}

/**
 * Checks if mouse and keyboard (standard) control setup is used
 */
export function isMouseAndKeyboardUsed(): boolean {
    return Memory.ReadU8(0xa10b4c, false) !== 0;
}

/**
 * Checks if the specified character is crouching
 */
export function isCharCrouching(pedPointer: int): boolean {
    return (
        (Memory.ReadU8(pedPointer + PED_FLAGS_OFFSET, false) & 0b00010000) !== 0
    );
}

/**
 * Checks if the specified character is jumping
 */
export function isCharJumping(pedPointer: int): boolean {
    return Memory.ReadI32(pedPointer + PED_STATUS_OFFSET, false) === 0x29;
}

/**
 * Checks if the player's control is disabled
 */
export function isControlOff(): boolean {
    return Memory.ReadU16(DISABLE_PLAYER_CONTROLS, false) !== 0;
}

/**
 * Checks if right mouse button was just pressed
 */
export function isRightMouseButtonJustDown(): boolean {
    // Old state OFF and new state ON
    return Memory.ReadU8(0x936909) === 0 && Memory.ReadU8(0x94d789) !== 0;
}

/**
 * Checks if mouse wheel was just scrolled up
 */
export function isMouseWheelUp(): boolean {
    return Memory.ReadU8(0x94d78b, false) !== 0;
}

/**
 * Checks if mouse wheel was just scrolled down
 */
export function isMouseWheelDown(): boolean {
    return Memory.ReadU8(0x94d78c, false) !== 0;
}

/**
 * Checks if an in-game button was just pressed
 */
export function isButtonJustDown(button: Button): boolean {
    let newState: int = THIS_PAD + button * 2;
    let oldState: int = newState + 0x2a;

    return (
        Memory.ReadI16(newState, false) !== 0 &&
        Memory.ReadI16(oldState, false) === 0
    );
}

/**
 * Checks if an in-game button was just released
 */
export function isButtonJustUp(button: Button): boolean {
    let newState: int = THIS_PAD + button * 2;
    let oldState: int = newState + 0x2a;

    return (
        Memory.ReadI16(oldState, false) !== 0 &&
        Memory.ReadI16(newState, false) === 0
    );
}

/**
 * Gets the clump of the specified character
 */
export function getCharClump(pedPointer: int): int {
    return Memory.ReadI32(pedPointer + PED_CLUMP_OFFSET, false);
}

/**
 * Gets current move state of the specified character
 */
export function getCharMoveState(pedPointer: int): MoveState {
    return Memory.ReadU32(pedPointer + PED_MOVE_STATE_OFFSET, false);
}

/**
 * Plays the specified animation using the specified character clump
 */
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

/**
 * Gets the specified character's velocity
 */
export function getCharVelocity(pedPointer: int): {
    x: float;
    y: float;
    z: float;
} {
    return {
        x: Memory.ReadFloat(pedPointer + PED_VELOCITY_OFFSET, false),
        y: Memory.ReadFloat(pedPointer + PED_VELOCITY_OFFSET + 4, false),
        z: Memory.ReadFloat(pedPointer + PED_VELOCITY_OFFSET + 8, false),
    };
}

/**
 * Sets the specified character's velocity
 */
export function setCharVelocity(
    pedPointer: int,
    x: float = 0,
    y: float = 0,
    z: float = 0,
) {
    Memory.WriteFloat(pedPointer + PED_VELOCITY_OFFSET, x, false);
    Memory.WriteFloat(pedPointer + PED_VELOCITY_OFFSET + 4, y, false);
    Memory.WriteFloat(pedPointer + PED_VELOCITY_OFFSET + 8, z, false);
}

/**
 * Gets current camera mode
 */
export function getCameraMode(): CameraMode {
    return Memory.ReadU32(CAM_MODE, false);
}

/**
 * Gets camera X and Y rotation around the player
 */
export function getCameraRotation(): { x: float; y: float } {
    return {
        x: Memory.ReadFloat(CAM_ROTATION_X, false),
        y: Memory.ReadFloat(CAM_ROTATION_Y, false),
    };
}

/**
 * Sets camera X and Y rotation around the player
 */
export function setCameraRotation(x: float, y: float) {
    Memory.WriteFloat(CAM_ROTATION_X, x, false);
    Memory.WriteFloat(CAM_ROTATION_Y, y, false);
}

/**
 * Checks if the player is using a weapon's first person mode
 */
export function isIn1stPersonWeaponMode(): boolean {
    switch (getCameraMode()) {
        case CameraMode.Sniper:
        case CameraMode.RocketLauncher:
        case CameraMode.M16FirstPerson:
        case CameraMode.HelicannonFirstPerson:
        case CameraMode.Camera:
            return true;
        default:
            return false;
    }
}

/**
 * Returns time step value
 */
export function getTimeStep(): float {
    return Memory.ReadFloat(0x975424, false);
}

/**
 * Returns time step value in seconds
 */
export function getTimeStepInSeconds(): float {
    return getTimeStep() / 50;
}

/**
 * Returns frame counter value
 */
export function getFrameCounter(): int {
    return Memory.ReadU32(0xa0d898, false);
}

/**
 * Returns current size of the game window
 */
export function getScreenSize(): { x: int; y: int } {
    return {
        x: Memory.ReadI32(SCREEN_WIDTH, false),
        y: Memory.ReadI32(SCREEN_HEIGHT, false),
    };
}

/**
 * Returns mouse X and Y movement
 */
export function getMouseMovement(): { x: float; y: float } {
    return {
        x: Memory.ReadFloat(0x936910, false),
        y: Memory.ReadFloat(0x936914, false),
    };
}

/**
 * Finds the target coordinates of the camera
 */
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

/**
 * Checks if there are no obstacles between two points
 */
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

/**
 * Finds the number of police officers in the specified location
 */
export function workOutPolicePresence(
    x: float,
    y: float,
    z: float,
    radius: float,
): int {
    return Memory.Fn.Cdecl(0x4d1b00)(
        Memory.FromFloat(x),
        Memory.FromFloat(y),
        Memory.FromFloat(z),
        Memory.FromFloat(radius),
    );
}

/**
 * Checks if subtitles or a big text is currently displayed on screen
 */
export function isAnyTextOnScreen(): boolean {
    // !m_Message[0] && BigMessageInUse[1] == 0.0f && BigMessageInUse[2] == 0.0f
    return Memory.ReadU16(0x814f28) !== 0 || Memory.ReadFloat(0x93825c) !== 0;
    // Memory.ReadI32(0x938260) !== 0
}

/**
 * Deals damage to the specified character
 */
export function inflictPedDamage(
    pedPointer: int,
    damagingEntityPointer: int,
    weapon: WeaponType,
    damage: float,
    bodyPart: PedPiece,
    direction: DamageDirection,
) {
    Memory.Fn.Thiscall(0x525b20, pedPointer)(
        damagingEntityPointer,
        weapon,
        Memory.FromFloat(damage),
        bodyPart,
        direction,
    );
}

/**
 * Gives the specified weapon to the specified character without the need to manually load the model and without automatic weapon switching
 */
export function giveDelayedWeapon(
    pedPointer: int,
    weapon: WeaponType,
    ammo: int,
) {
    Memory.Fn.Thiscall(0x4ffc30, pedPointer)(weapon, ammo);
}
