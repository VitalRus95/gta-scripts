// Sanny Builder Library v0.253
/// <reference no-default-lib="true"/>
/// <reference lib="es2020" />
/** Integer value */
type int = number & { _int: never };
/** Floating-point value */
type float = number & { _float: never };
/** Vector3 type */
type Vector3 = { x: float, y: float, z: float };

/** Pauses the script execution for the specified amount of time in milliseconds */
declare function wait(delay: int): void;
/** Displays a black text box with custom text. Not available on an `unknown` host */
declare function showTextBox(text: string): void;
/** Prints values to the cleo_redux.log */
declare function log(...values: Array<string | int | float>): void;
/** Executes the opcode with the given arguments */
declare function op<T>(op: int, ...args: any[]): T;
/** Executes the command by name with the given arguments */
declare function native<T>(name: string, ...args: any[]): T;
/** Terminates the script and optionally writes a reason to the log file */
declare function exit(reason?: string): void;

/** Current host name */
declare const HOST: "re3" | "reVC" | "gta3" | "vc" | "sa" | "gta3_unreal" | "vc_unreal" | "sa_unreal" | "unknown";
/** Is player on a mission flag. Not available on an `unknown` host */
declare var ONMISSION: boolean;
/** Self-incrementing timer #1 */
declare var TIMERA: int;
/** Self-incrementing timer #2 */
declare var TIMERB: int;
/** Current file's directory */
declare const __dirname: string;
/** Current file's path */
declare const __filename: string;

declare interface Version {
  readonly major: string;
  readonly minor: string;
  readonly patch: string;
  readonly pre: string;
  readonly build: string;
  toString(): string;
}
interface CLEO {
  readonly version: Version;
  readonly apiVersion: Version;
  debug: {
    trace(flag: boolean): void;
  };
}

declare const CLEO: CLEO;
interface FxtStore {
  /**
   * Inserts new text content in the script's fxt storage overwriting the previous content and shadowing static fxt with the same key
   * @param key GXT key that can be used in text commands (7 characters max)
   * @param value text content
   */
  insert(key: string, value: string): void;
  /**
   * Removes the text content associated with the key in the local fxt storage
   * @param key GXT key
   */
  delete(key: string): void;
}

declare const FxtStore: FxtStore;
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Attractor */
declare class Attractor {
    constructor(handle: number);
    /** Adds a ped attractor
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_ATTRACTOR */
    static Add(x: float, y: float, z: float, angle: float, _p5: float, sequence: Sequence): Attractor;
    addPedTypeAsUser(pedType: int): Attractor;
    clear(): void;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Audio */
interface Audio {
    /** Sets the loaded audio to play at the vehicle's location
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_MISSION_AUDIO_TO_CAR */
    AttachMissionAudioToCar(slotId: int, handle: Car): void;
    /** Sets the loaded audio to play at the char's location
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_MISSION_AUDIO_TO_CHAR */
    AttachMissionAudioToChar(slotId: int, handle: Char): void;
    /** Sets the loaded audio to play at the object's location
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_MISSION_AUDIO_TO_OBJECT */
    AttachMissionAudioToObject(slotId: int, handle: ScriptObject): void;
    /** Unloads the mission audio (03CF), freeing game memory
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_MISSION_AUDIO */
    ClearMissionAudio(slotId: int): void;
    GetBeatProximity(_p1: int): {
        _p2: int;
        _p3: int;
        _p4: int;
    };
    GetBeatTrackStatus(): int;
    /** Returns the current radio station that is being played
    *
    * https://library.sannybuilder.com/#/sa?q=GET_RADIO_CHANNEL */
    GetRadioChannel(): int;
    /** Gets the radio volume set in the game options
    *
    * https://library.sannybuilder.com/#/sa?q=GET_AUDIO_RADIO_VOLUME */
    GetRadioVolume(): float;
    /** Gets the SFX volume set in the game options
    *
    * https://library.sannybuilder.com/#/sa?q=GET_AUDIO_SFX_VOLUME */
    GetSfxVolume(): float;
    /** Returns true if the audio (03CF) is no longer playing
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_MISSION_AUDIO_FINISHED */
    HasMissionAudioFinished(slotId: int): boolean;
    /** Returns true if the mission audio has loaded (03CF)
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_MISSION_AUDIO_LOADED */
    HasMissionAudioLoaded(slotId: int): boolean;
    /** Loads the file from the audio directory
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_MISSION_AUDIO */
    LoadMissionAudio(slotId: int, audioId: int): void;
    /** Sets whether the loaded soundtrack is paused
    *
    * https://library.sannybuilder.com/#/sa?q=PAUSE_CURRENT_BEAT_TRACK */
    PauseCurrentBeatTrack(state: boolean): void;
    PlayBeatTrack(): void;
    /** Plays the loaded sound (03CF)
    *
    * https://library.sannybuilder.com/#/sa?q=PLAY_MISSION_AUDIO */
    PlayMissionAudio(slotId: int): void;
    /** Plays an audio file with the specified ID from the Audio directory
    *
    * https://library.sannybuilder.com/#/sa?q=PLAY_MISSION_PASSED_TUNE */
    PlayMissionPassedTune(soundId: int): void;
    PreloadBeatTrack(trackId: int): void;
    /** Plays the audio event at the car's position
    *
    * https://library.sannybuilder.com/#/sa?q=REPORT_MISSION_AUDIO_EVENT_AT_CAR */
    ReportMissionAudioEventAtCar(handle: Car, soundId: int): void;
    ReportMissionAudioEventAtChar(handle: Char, soundId: int): void;
    ReportMissionAudioEventAtObject(handle: ScriptObject, soundId: int): void;
    ReportMissionAudioEventAtPosition(x: float, y: float, z: float, soundId: int): void;
    /** Sets the location of the mission audio (03CF) where it can be heard
    *
    * https://library.sannybuilder.com/#/sa?q=SET_MISSION_AUDIO_POSITION */
    SetMissionAudioPosition(slotId: int, x: float, y: float, z: float): void;
    /** Sets whether sounds should fade along with the screen
    *
    * https://library.sannybuilder.com/#/sa?q=SET_MUSIC_DOES_FADE */
    SetMusicDoesFade(state: boolean): void;
    /** Sets the current radio station that is playing, if the player is in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=SET_RADIO_CHANNEL */
    SetRadioChannel(channel: int): void;
    /** Sets the radio station of the vehicle the player is currently in to the favourite station, retrieved from the stats (ID 326)
    *
    * https://library.sannybuilder.com/#/sa?q=SET_RADIO_TO_PLAYERS_FAVOURITE_STATION */
    SetRadioToPlayersFavouriteStation(): void;
    StopBeatTrack(): void;
}
declare var Audio: Audio
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/AudioStream */
declare class AudioStream {
    constructor(handle: number);
    static Load(audioFileName: string): AudioStream | undefined;
    /** Gets the audio stream length in seconds
    *
    * https://library.sannybuilder.com/#/sa?q=GET_AUDIO_STREAM_LENGTH */
    getLength(): int;
    getState(): int;
    getVolume(): float;
    remove(): void;
    setLooped(state: boolean): AudioStream;
    setState(state: int): AudioStream;
    setVolume(volume: float): AudioStream;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Blip */
declare class Blip {
    constructor(handle: number);
    /** Adds a blip and a marker to the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_BLIP_FOR_CAR */
    static AddForCar(vehicle: Car): Blip;
    /** Adds a blip with properties to the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_BLIP_FOR_CAR_OLD */
    static AddForCarOld(vehicle: Car, color: int, display: int): Blip;
    /** Adds a blip and a marker to the character
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_BLIP_FOR_CHAR */
    static AddForChar(char: Char): Blip;
    /** Adds a blip to the location
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_BLIP_FOR_COORD */
    static AddForCoord(x: float, y: float, z: float): Blip;
    /** Adds a blip with properties at the location
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_BLIP_FOR_COORD_OLD */
    static AddForCoordOld(x: float, y: float, z: float, colour: int, display: int): Blip;
    /** Adds a blip and a marker to the character (identical to 0187)
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_BLIP_FOR_DEAD_CHAR */
    static AddForDeadChar(char: Char): Blip;
    /** Adds a blip and a marker to the object
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_BLIP_FOR_OBJECT */
    static AddForObject(object: ScriptObject): Blip;
    /** Adds a blip and a marker to the pickup
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_BLIP_FOR_PICKUP */
    static AddForPickup(pickup: Pickup): Blip;
    /** Creates a blip indicating the searchlights position on the radar
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_BLIP_FOR_SEARCHLIGHT */
    static AddForSearchlight(searchlight: Searchlight): Blip;
    /** Adds a contact sprite blip for the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_SHORT_RANGE_SPRITE_BLIP_FOR_CONTACT_POINT */
    static AddShortRangeSpriteForContactPoint(x: float, y: float, z: float, sprite: int): Blip;
    /** Adds a sprite blip for the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_SHORT_RANGE_SPRITE_BLIP_FOR_COORD */
    static AddShortRangeSpriteForCoord(x: float, y: float, z: float, sprite: int): Blip;
    /** Adds a sprite blip to the contact point
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_SPRITE_BLIP_FOR_CONTACT_POINT */
    static AddSpriteForContactPoint(x: float, y: float, z: float, sprite: int): Blip;
    /** Adds a sprite blip to the location
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_SPRITE_BLIP_FOR_COORD */
    static AddSpriteForCoord(x: float, y: float, z: float, sprite: int): Blip;
    /** Returns true if the handle is a valid blip handle
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_BLIP_EXIST */
    static DoesExist(handle: int): boolean;
    /** Sets the blip's color
    *
    * https://library.sannybuilder.com/#/sa?q=CHANGE_BLIP_COLOUR */
    changeColor(color: int): Blip;
    /** Changes the display of the specified blip
    *
    * https://library.sannybuilder.com/#/sa?q=CHANGE_BLIP_DISPLAY */
    changeDisplay(display: int): Blip;
    /** Sets the blip's size
    *
    * https://library.sannybuilder.com/#/sa?q=CHANGE_BLIP_SCALE */
    changeScale(size: int): Blip;
    /** Removes the blip
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_BLIP */
    remove(): void;
    /** Sets whether the tracking blip will remain regardless of the entities existance
    *
    * https://library.sannybuilder.com/#/sa?q=SET_BLIP_ALWAYS_DISPLAY_ON_ZOOMED_RADAR */
    setAlwaysDisplayOnZoomedRadar(state: boolean): Blip;
    setAsFriendly(state: boolean): Blip;
    /** Works similar to 0165, except this command does not work on tracking blips, has different colors and does not support direct RGBA setting
    *
    * https://library.sannybuilder.com/#/sa?q=SET_COORD_BLIP_APPEARANCE */
    setCoordAppearance(color: int): Blip;
    /** Assigns the blip to the specified entrance/exit marker
    *
    * https://library.sannybuilder.com/#/sa?q=SET_BLIP_ENTRY_EXIT */
    setEntryExit(x: float, y: float, radius: float): Blip;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Camera */
interface Camera {
    /** Makes the camera remain behind the player when in any garage
    *
    * https://library.sannybuilder.com/#/sa?q=ALLOW_FIXED_CAMERA_COLLISION */
    AllowFixedCollision(state: boolean): void;
    /** Keeps the camera relative to the actor with the specified offset
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_CAMERA_TO_CHAR */
    AttachToChar(handle: Char, xOffset: float, yOffset: float, zOffset: float, xRotation: float, yRotation: float, zRotation: float, tilt: float, switchStyle: int): void;
    /** Puts the camera on the character like with 067C
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_CAMERA_TO_CHAR_LOOK_AT_CHAR */
    AttachToCharLookAtChar(handle: Char, xOffset: float, yOffset: float, zOffset: float, char: Char, tilt: float, switchStyle: int): void;
    AttachToCharLookAtVehicle(char: Char, xOffset: float, yOffset: float, zOffset: float, vehicle: Car, tilt: float, switchStyle: int): void;
    /** Keeps the camera relative to the car with the specified offset
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_CAMERA_TO_VEHICLE */
    AttachToVehicle(handle: Car, xOffset: float, yOffset: float, zOffset: float, xRotation: float, yRotation: float, zRotation: float, tilt: float, switchStyle: int): void;
    /** Attaches the camera to the vehicle and points it at the specified character
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_CAMERA_TO_VEHICLE_LOOK_AT_CHAR */
    AttachToVehicleLookAtChar(handle: Char, xOffset: float, yOffset: float, zOffset: float, char: Char, tilt: float, switchStyle: int): void;
    /** Puts the camera on the vehicle like in 0679
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_CAMERA_TO_VEHICLE_LOOK_AT_VEHICLE */
    AttachToVehicleLookAtVehicle(handle: Car, xOffset: float, yOffset: float, zOffset: float, vehicle: Car, tilt: float, switchStyle: int): void;
    /** Bumps the camera in the specified direction as if it had collided
    *
    * https://library.sannybuilder.com/#/sa?q=DO_CAMERA_BUMP */
    DoBump(xOffset: float, yOffset: float): void;
    /** Fades the screen for the specified time
    *
    * https://library.sannybuilder.com/#/sa?q=DO_FADE */
    DoFade(time: int, direction: int): void;
    /** Stores the cameras coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=GET_ACTIVE_CAMERA_COORDINATES */
    GetActiveCoordinates(): {
        x: float;
        y: float;
        z: float;
    };
    /** Gets the coordinates the camera is pointing to
    *
    * https://library.sannybuilder.com/#/sa?q=GET_ACTIVE_CAMERA_POINT_AT */
    GetActivePointAt(): {
        x: float;
        y: float;
        z: float;
    };
    /** Returns the debug camera position
    *
    * https://library.sannybuilder.com/#/sa?q=GET_DEBUG_CAMERA_COORDINATES */
    GetDebugCoordinates(): {
        x: float;
        y: float;
        z: float;
    };
    /** Stores the location the debug camera is pointing to
    *
    * https://library.sannybuilder.com/#/sa?q=GET_DEBUG_CAMERA_POINT_AT */
    GetDebugPointAt(): {
        x: float;
        y: float;
        z: float;
    };
    /** Returns true if the screen is fading (016A)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_FADING_STATUS */
    GetFadingStatus(): boolean;
    /** Returns the cameras field of view
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAMERA_FOV */
    GetFov(): float;
    /** Gets the players chosen camera mode of the current vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PLAYER_IN_CAR_CAMERA_MODE */
    GetPlayerInCarMode(): int;
    /** Returns true if any part of the radius of the specified point is visible on screen
    *
    * https://library.sannybuilder.com/#/sa?q=IS_POINT_ON_SCREEN */
    IsPointOnScreen(x: float, y: float, z: float, radius: float): boolean;
    /** Returns true if the camera is moving in position
    *
    * https://library.sannybuilder.com/#/sa?q=CAMERA_IS_VECTOR_MOVE_RUNNING */
    IsVectorMoveRunning(): boolean;
    /** Returns true if the camera is moving in angle
    *
    * https://library.sannybuilder.com/#/sa?q=CAMERA_IS_VECTOR_TRACK_RUNNING */
    IsVectorTrackRunning(): boolean;
    /** Locks the zoom level after the camera has finished zooming
    *
    * https://library.sannybuilder.com/#/sa?q=CAMERA_PERSIST_FOV */
    PersistFov(state: boolean): void;
    /** Locks the cameras position
    *
    * https://library.sannybuilder.com/#/sa?q=CAMERA_PERSIST_POS */
    PersistPos(state: boolean): void;
    /** Locks the camera target point in position after propagating
    *
    * https://library.sannybuilder.com/#/sa?q=CAMERA_PERSIST_TRACK */
    PersistTrack(state: boolean): void;
    /** Attaches the camera to the specified vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=POINT_CAMERA_AT_CAR */
    PointAtCar(vehicle: Car, mode: int, switchStyle: int): void;
    /** Attaches the camera to the specified character
    *
    * https://library.sannybuilder.com/#/sa?q=POINT_CAMERA_AT_CHAR */
    PointAtChar(char: Char, mode: int, switchStyle: int): void;
    /** Points the camera at the specified location and applies the position set by 0159
    *
    * https://library.sannybuilder.com/#/sa?q=POINT_CAMERA_AT_POINT */
    PointAtPoint(x: float, y: float, z: float, switchStyle: int): void;
    /** Stops the camera propagating, interpolating, shaking and zooming
    *
    * https://library.sannybuilder.com/#/sa?q=CAMERA_RESET_NEW_SCRIPTABLES */
    ResetNewScriptables(): void;
    /** Resets any changes made with 09EF
    *
    * https://library.sannybuilder.com/#/sa?q=RESET_VEHICLE_CAMERA_TWEAK */
    ResetVehicleTweak(): void;
    /** Restores the camera to its usual position
    *
    * https://library.sannybuilder.com/#/sa?q=RESTORE_CAMERA */
    Restore(): void;
    /** Restores the camera, putting it back behind the player
    *
    * https://library.sannybuilder.com/#/sa?q=RESTORE_CAMERA_JUMPCUT */
    RestoreJumpcut(): void;
    /** Puts the camera behind the player
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAMERA_BEHIND_PLAYER */
    SetBehindPlayer(): void;
    /** Locks the camera on cinematic vehicle mode
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CINEMA_CAMERA */
    SetCinema(state: boolean): void;
    /** Darkens the game
    *
    * https://library.sannybuilder.com/#/sa?q=SET_DARKNESS_EFFECT */
    SetDarknessEffect(enable: boolean, pitchBlack: int): void;
    /** Sets the RGB color of the fade command (016A)
    *
    * https://library.sannybuilder.com/#/sa?q=SET_FADING_COLOUR */
    SetFadingColor(r: int, g: int, b: int): void;
    /** Enables vehicle bumper view for the camera
    *
    * https://library.sannybuilder.com/#/sa?q=SET_FIRST_PERSON_IN_CAR_CAMERA_MODE */
    SetFirstPersonInCarMode(state: boolean): void;
    /** Sets the camera's position and rotation
    *
    * https://library.sannybuilder.com/#/sa?q=SET_FIXED_CAMERA_POSITION */
    SetFixedPosition(x: float, y: float, z: float, xRotation: float, yRotation: float, zRotation: float): void;
    /** Puts the camera in front of the specified character
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAMERA_IN_FRONT_OF_CHAR */
    SetInFrontOfChar(handle: Char): void;
    /** Puts the camera in front of the player, pointing towards the player
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAMERA_IN_FRONT_OF_PLAYER */
    SetInFrontOfPlayer(): void;
    /** Sets how long the camera transition will last
    *
    * https://library.sannybuilder.com/#/sa?q=SET_INTERPOLATION_PARAMETERS */
    SetInterpolationParameters(_p1: float, time: int): void;
    /** Sets the cameras zoom factors
    *
    * https://library.sannybuilder.com/#/sa?q=CAMERA_SET_LERP_FOV */
    SetLerpFov(from: float, to: float, time: int, ease: boolean): void;
    /** Sets the near clip
    *
    * https://library.sannybuilder.com/#/sa?q=SET_NEAR_CLIP */
    SetNearClip(value: float): void;
    /** Puts the camera in first-person mode if the player is holding a weapon with a first-person shooting mode (such as a sniper rifle or camera)
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PHOTO_CAMERA_EFFECT */
    SetPhotoEffect(state: boolean): void;
    /** Changes the camera mode on the current vehicle, just like when the user presses the 'change view' key
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_IN_CAR_CAMERA_MODE */
    SetPlayerInCarMode(mode: int): void;
    /** Sets the position of the camera to an offset of the targeted entity
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAMERA_POSITION_UNFIXED */
    SetPositionUnfixed(xOffset: float, yOffset: float): void;
    /** Jiggles the camera in a variety of different ways
    *
    * https://library.sannybuilder.com/#/sa?q=CAMERA_SET_SHAKE_SIMULATION_SIMPLE */
    SetShakeSimulationSimple(type: int, timeInMs: float, intensity: float): void;
    /** Enables the cooperative camera mode
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TWO_PLAYER_CAMERA_MODE */
    SetTwoPlayerMode(state: boolean): void;
    /** Puts the camera at the position of the first passed coordinates and moves it to the second passed coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=CAMERA_SET_VECTOR_MOVE */
    SetVectorMove(fromX: float, fromY: float, fromZ: float, toX: float, toY: float, toZ: float, time: int, ease: boolean): void;
    /** Makes the camera point at the first coordinates and then rotate to point at the second coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=CAMERA_SET_VECTOR_TRACK */
    SetVectorTrack(fromX: float, fromY: float, fromZ: float, toX: float, toY: float, toZ: float, time: int, ease: boolean): void;
    /** Sets the position the camera automatically moves to while driving a vehicle of the specified type
    *
    * https://library.sannybuilder.com/#/sa?q=SET_VEHICLE_CAMERA_TWEAK */
    SetVehicleTweak(modelId: int, distance: float, altitude: float, angle: float): void;
    /** Sets how far behind the camera is from the player
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAMERA_ZOOM */
    SetZoom(zoom: int): void;
    /** Shakes the camera with the given intensity
    *
    * https://library.sannybuilder.com/#/sa?q=SHAKE_CAM */
    Shake(intensity: int): void;
}
declare var Camera: Camera
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Car */
declare class Car {
    constructor(handle: number);
    /** Creates a vehicle at the specified location, with the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_CAR */
    static Create(modelId: int, x: float, y: float, z: float): Car;
    /** Sets the town ID of the license plate which is created on the specified model, affecting which texture is chosen for the plate
    *
    * https://library.sannybuilder.com/#/sa?q=CUSTOM_PLATE_DESIGN_FOR_NEXT_CAR */
    static CustomPlateDesignForNextCar(modelId: int, townId: int): void;
    /** Sets the numberplate of the next car to be spawned with the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=CUSTOM_PLATE_FOR_NEXT_CAR */
    static CustomPlateForNextCar(modelId: int, plateText: string): void;
    /** Returns true if the handle is a valid vehicle handle
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_VEHICLE_EXIST */
    static DoesExist(handle: int): boolean;
    /** Returns true if the handle is an invalid vehicle handle or the vehicle has been destroyed (wrecked)
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_DEAD */
    static IsDead(handle: int): boolean;
    static RestoreModState(): void;
    /** Sets the variation of the next car to be created
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_MODEL_COMPONENTS */
    static SetModelComponents(_unused: int, component1: int, component2: int): void;
    static StoreModState(): void;
    /** Adds a new mod with the model to the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_VEHICLE_MOD */
    addMod(modelId: int): int;
    addToRotationVelocity(x: float, y: float, z: float): Car;
    /** Activates upside-down car check for the car
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_UPSIDEDOWN_CAR_CHECK */
    addUpsidedownCheck(): Car;
    applyForce(xOffset: float, yOffset: float, zOffset: float, xRotation: float, yRotation: float, zRotation: float): Car;
    /** Arms the vehicle with a bomb of the given type (In SA, this command only supports the mobile version)
    *
    * https://library.sannybuilder.com/#/sa?q=ARM_CAR_WITH_BOMB */
    armWithBomb(bombType: int): Car;
    attachToCar(handle: Car, xOffset: float, yOffset: float, zOffset: float, xRotation: float, yRotation: float, zRotation: float): Car;
    /** Attaches the car to object with offset and rotation
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_CAR_TO_OBJECT */
    attachToObject(handle: ScriptObject, xOffset: float, yOffset: float, zOffset: float, xRotation: float, yRotation: float, zRotation: float): Car;
    /** Deflates the car's tire
    *
    * https://library.sannybuilder.com/#/sa?q=BURST_CAR_TYRE */
    burstTire(tireId: int): Car;
    /** Sets whether the player can target this vehicle with a heatseeking rocket launcher
    *
    * https://library.sannybuilder.com/#/sa?q=VEHICLE_CAN_BE_TARGETED_BY_HS_MISSILE */
    canBeTargetedByHsMissile(state: boolean): Car;
    /** Sets the car's primary and secondary colors
    *
    * https://library.sannybuilder.com/#/sa?q=CHANGE_CAR_COLOUR */
    changeColor(primaryColor: int, secondaryColor: int): Car;
    /** Changes vehicle control from playback to AI driven
    *
    * https://library.sannybuilder.com/#/sa?q=CHANGE_PLAYBACK_TO_USE_AI */
    changePlaybackToUseAi(): Car;
    /** Clears the car's last damage entity
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_CAR_LAST_DAMAGE_ENTITY */
    clearLastDamageEntity(): Car;
    /** Clears the vehicle's last weapon damage (see 031E)
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_CAR_LAST_WEAPON_DAMAGE */
    clearLastWeaponDamage(): Car;
    cleoSetEngineOn(state: boolean): Car;
    /** Closes all car doors, hoods and boots
    *
    * https://library.sannybuilder.com/#/sa?q=CLOSE_ALL_CAR_DOORS */
    closeAllDoors(): Car;
    /** Sets the car's door angle and latch state
    *
    * https://library.sannybuilder.com/#/sa?q=CONTROL_CAR_DOOR */
    controlDoor(door: int, latch: int, angle: float): Car;
    controlHydraulics(_p2: float, _p3: float, _p4: float, _p5: float): Car;
    /** Sets the angle of a vehicle's extra
    *
    * https://library.sannybuilder.com/#/sa?q=CONTROL_MOVABLE_VEHICLE_PART */
    controlMovablePart(range: float): Car;
    /** Damages a component on the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=DAMAGE_CAR_DOOR */
    damageDoor(door: int): Car;
    /** Damages a panel on the car
    *
    * https://library.sannybuilder.com/#/sa?q=DAMAGE_CAR_PANEL */
    damagePanel(panelId: int): Car;
    /** Removes the vehicle from the game
    *
    * https://library.sannybuilder.com/#/sa?q=DELETE_CAR */
    delete(): void;
    detach(x: float, y: float, z: float, collisionDetection: boolean): Car;
    /** Returns true if the car has hydraulics installed
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_CAR_HAVE_HYDRAULICS */
    doesHaveHydraulics(): boolean;
    /** Returns true if the car has car stuck check enabled
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_CAR_HAVE_STUCK_CAR_CHECK */
    doesHaveStuckCarCheck(): boolean;
    /** Sets whether characters in combat will choose to use the vehicle as cover from gunfire
    *
    * https://library.sannybuilder.com/#/sa?q=VEHICLE_DOES_PROVIDE_COVER */
    doesProvideCover(state: boolean): Car;
    /** Makes the vehicle explode
    *
    * https://library.sannybuilder.com/#/sa?q=EXPLODE_CAR */
    explode(): Car;
    /** Makes the vehicle explode without affecting its surroundings
    *
    * https://library.sannybuilder.com/#/sa?q=EXPLODE_CAR_IN_CUTSCENE */
    explodeInCutscene(): Car;
    /** Causes the vehicle to explode, without damage to surrounding entities
    *
    * https://library.sannybuilder.com/#/sa?q=EXPLODE_CAR_IN_CUTSCENE_SHAKE_AND_BITS */
    explodeInCutsceneShakeAndBits(shake: boolean, effect: boolean, sound: boolean): Car;
    /** Restores the vehicle to full health and removes the damage
    *
    * https://library.sannybuilder.com/#/sa?q=FIX_CAR */
    fix(): Car;
    /** Repairs the car door
    *
    * https://library.sannybuilder.com/#/sa?q=FIX_CAR_DOOR */
    fixDoor(door: int): Car;
    fixPanel(panelId: int): Car;
    /** Repairs a car's tire
    *
    * https://library.sannybuilder.com/#/sa?q=FIX_CAR_TYRE */
    fixTire(typeId: int): Car;
    /** Sets an override for the car's lights
    *
    * https://library.sannybuilder.com/#/sa?q=FORCE_CAR_LIGHTS */
    forceLights(lightMode: int): Car;
    /** Locks the vehicle's position
    *
    * https://library.sannybuilder.com/#/sa?q=FREEZE_CAR_POSITION */
    freezePosition(state: boolean): Car;
    /** Makes the car maintain its position
    *
    * https://library.sannybuilder.com/#/sa?q=FREEZE_CAR_POSITION_AND_DONT_LOAD_COLLISION */
    freezePositionAndDontLoadCollision(state: boolean): Car;
    /** Returns the status of the car's alarm
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_ALARM */
    getAlarm(): int;
    /** Returns a model id available for the vehicle's mod slot, or -1 otherwise
    *
    * https://library.sannybuilder.com/#/sa?q=GET_AVAILABLE_VEHICLE_MOD */
    getAvailableMod(slotId: int): int;
    /** Returns a handle of the vehicle preventing this car from getting to its destination
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_BLOCKING_CAR */
    getBlockingCar(): Car;
    /** Returns the handle of a character sitting in the specified car seat
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_IN_CAR_PASSENGER_SEAT */
    getCharInPassengerSeat(seatIndex: int): Char;
    /** Returns the vehicle's class as defined in vehicles
    *
    * https://library.sannybuilder.com/#/sa?q=GET_VEHICLE_CLASS */
    getClass(): int;
    /** Gets the car's primary and secondary colors
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_COLOURS */
    getColors(): {
        primaryColour: int;
        secondaryColour: int;
    };
    /** Returns the vehicle's coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_COORDINATES */
    getCoordinates(): {
        x: float;
        y: float;
        z: float;
    };
    /** Returns the current gear of the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_CURRENT_GEAR */
    getCurrentGear(): int;
    /** Returns the model of the component installed on the specified slot of the vehicle, or -1 otherwise
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CURRENT_CAR_MOD */
    getCurrentMod(slot: int): int;
    /** Gets the car's paintjob
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CURRENT_VEHICLE_PAINTJOB */
    getCurrentPaintjob(): int;
    /** Gets the specified car doors angle, relative to the hinge
    *
    * https://library.sannybuilder.com/#/sa?q=GET_DOOR_ANGLE_RATIO */
    getDoorAngleRatio(door: int): float;
    /** Returns the door lock mode of the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_DOOR_LOCK_STATUS */
    getDoorLockStatus(): int;
    /** Returns the car's driver handle
    *
    * https://library.sannybuilder.com/#/sa?q=GET_DRIVER_OF_CAR */
    getDriver(): Char;
    /** Gets extended var value for this car. Returns false if not initialized (0E17)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_EXTENDED_CAR_VAR */
    getExtendedCarVar(identifier: string, varNumber: int): int | undefined;
    /** Returns the car extra colors (0A11)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_EXTRA_CAR_COLOURS */
    getExtraColors(): {
        color1: int;
        color2: int;
    };
    /** Returns the X coord of the vehicle's angle
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_FORWARD_X */
    getForwardX(): float;
    /** Returns the Y coord of the vehicle's angle
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_FORWARD_Y */
    getForwardY(): float;
    /** Returns the vehicle's heading (z-angle)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_HEADING */
    getHeading(): float;
    /** Returns the vehicle's health
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_HEALTH */
    getHealth(): int;
    /** Returns the vehicle's mass
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_MASS */
    getMass(mass: float): Car;
    /** Returns the maximum number of passengers that could sit in the car
    *
    * https://library.sannybuilder.com/#/sa?q=GET_MAXIMUM_NUMBER_OF_PASSENGERS */
    getMaximumNumberOfPassengers(): int;
    /** Returns the car's model id
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_MODEL */
    getModel(): int;
    /** Returns the value of the specified car model
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_MODEL_VALUE */
    getModelValue(): int;
    /** Sets the angle of a vehicle's extra
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_MOVING_COMPONENT_OFFSET */
    getMovingComponentOffset(): float;
    /** Gets the number of possible paintjobs that can be applied to the car
    *
    * https://library.sannybuilder.com/#/sa?q=GET_NUM_AVAILABLE_PAINTJOBS */
    getNumAvailablePaintjobs(): int;
    getNumColors(): int;
    /** Gets the total number of gears of the vehicle and stores it to the variable
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_NUMBER_OF_GEARS */
    getNumberOfGears(): int;
    /** Returns the number of passengers sitting in the car
    *
    * https://library.sannybuilder.com/#/sa?q=GET_NUMBER_OF_PASSENGERS */
    getNumberOfPassengers(): int;
    /** Returns the coordinates of an offset of the vehicle's position, depending on the vehicle's rotation
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OFFSET_FROM_CAR_IN_WORLD_COORDS */
    getOffsetInWorldCoords(xOffset: float, yOffset: float, zOffset: float): {
        x: float;
        y: float;
        z: float;
    };
    /** Returns the X Angle of the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_PITCH */
    getPitch(): float;
    /** Gets the quaternion values of the car
    *
    * https://library.sannybuilder.com/#/sa?q=GET_VEHICLE_QUATERNION */
    getQuaternion(): {
        x: float;
        y: float;
        z: float;
        w: float;
    };
    /** Returns the Y Angle of the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_ROLL */
    getRoll(): float;
    /** Gets the car's speed
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_SPEED */
    getSpeed(): float;
    getSpeedVector(x: float, y: boolean, z: boolean): Car;
    /** Returns vehicle subclass, useful to check if vehicle is motorbike, bicycle, trailer etc
    *
    * https://library.sannybuilder.com/#/sa?q=GET_VEHICLE_SUBCLASS */
    getSubclass(): int;
    /** Gets the car's vertical angle
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_UPRIGHT_VALUE */
    getUprightValue(): float;
    /** Gets car damage by weapon last frame. Char can be invalid, and returns false if no damage last frame
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_WEAPON_DAMAGE_LAST_FRAME */
    getWeaponDamageLastFrame(char: Char, weaponType: int, intensity: float): boolean;
    /** Makes the car have one nitro
    *
    * https://library.sannybuilder.com/#/sa?q=GIVE_NON_PLAYER_CAR_NITRO */
    giveNonPlayerNitro(): Car;
    /** Sets the car's paintjob
    *
    * https://library.sannybuilder.com/#/sa?q=GIVE_VEHICLE_PAINTJOB */
    givePaintjob(paintjobId: int): Car;
    /** Makes the AI drive to the specified location by any means
    *
    * https://library.sannybuilder.com/#/sa?q=CAR_GOTO_COORDINATES */
    gotoCoordinates(x: float, y: float, z: float): Car;
    /** Makes the AI drive to the specified location obeying the traffic rules
    *
    * https://library.sannybuilder.com/#/sa?q=CAR_GOTO_COORDINATES_ACCURATE */
    gotoCoordinatesAccurate(x: float, y: float, z: float): Car;
    /** Makes the AI drive to the destination as fast as possible, trying to overtake other vehicles
    *
    * https://library.sannybuilder.com/#/sa?q=CAR_GOTO_COORDINATES_RACING */
    gotoCoordinatesRacing(x: float, y: float, z: float): Car;
    /** Returns true if the vehicle has been damaged by another specified vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CAR_BEEN_DAMAGED_BY_CAR */
    hasBeenDamagedByCar(other: Car): boolean;
    /** Returns true if the car has been damaged by the specified actor
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CAR_BEEN_DAMAGED_BY_CHAR */
    hasBeenDamagedByChar(handle: Char): boolean;
    /** Returns true if the vehicle has been hit by the specified weapon
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CAR_BEEN_DAMAGED_BY_WEAPON */
    hasBeenDamagedByWeapon(weaponType: int): boolean;
    /** Returns true if the vehicle was resprayed in the last frame
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CAR_BEEN_RESPRAYED */
    hasBeenResprayed(): boolean;
    /** Sets whether a ped driven vehicle's handling is affected by the 'perfect handling' cheat
    *
    * https://library.sannybuilder.com/#/sa?q=IMPROVE_CAR_BY_CHEATING */
    improveByCheating(state: boolean): Car;
    /** Inits additional variables for this car. Identifier can be "AUTO" for unique ID based on script pointer
    *
    * https://library.sannybuilder.com/#/sa?q=INIT_EXTENDED_CAR_VARS */
    initExtendedVars(identifier: string, totalVars: int): boolean;
    isAttached(): boolean;
    /** Returns true if the specified vehicle has the 'is big' flag set in vehicles
    *
    * https://library.sannybuilder.com/#/sa?q=IS_BIG_VEHICLE */
    isBig(): boolean;
    /** Returns true if the specified vehicle part is visibly damaged
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_DOOR_DAMAGED */
    isDoorDamaged(door: int): boolean;
    isDoorFullyOpen(door: int): boolean;
    isEmergencyServices(): boolean;
    isEngineOn(): boolean;
    /** Returns true if the car's health is over the specified value
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_HEALTH_GREATER */
    isHealthGreater(health: int): boolean;
    /** Returns true if the vehicle is in the air
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_IN_AIR_PROPER */
    isInAirProper(): boolean;
    /** Returns true if the vehicle is located within the specified 2D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_IN_AREA_2D */
    isInArea2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, drawSphere: boolean): boolean;
    /** Returns true if the vehicle is located within the specified 3D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_IN_AREA_3D */
    isInArea3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, drawSphere: boolean): boolean;
    /** Returns true if the vehicle is submerged in water
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_IN_WATER */
    isInWater(): boolean;
    /** Returns true if the vehicle is a low rider
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_LOW_RIDER */
    isLowRider(): boolean;
    /** Returns true if the vehicle has the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_MODEL */
    isModel(modelId: int): boolean;
    /** Returns true if all the vehicle's wheels are touching the ground
    *
    * https://library.sannybuilder.com/#/sa?q=IS_VEHICLE_ON_ALL_WHEELS */
    isOnAllWheels(): boolean;
    /** Returns true if the car is burning
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_ON_FIRE */
    isOnFire(): boolean;
    /** Returns true if the car is visible
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_ON_SCREEN */
    isOnScreen(): boolean;
    /** Returns true if the specified car seat is empty
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_PASSENGER_SEAT_FREE */
    isPassengerSeatFree(seatIndex: int): boolean;
    /** Returns true if the car is assigned to a path
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYBACK_GOING_ON_FOR_CAR */
    isPlaybackGoingOn(): boolean;
    /** Returns true if the specified vehicle is controlled by script
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_SCRIPT_CONTROLLED */
    isScriptControlled(): boolean;
    isSirenOn(): boolean;
    /** Returns true if the vehicle is not moving
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_STOPPED */
    isStopped(): boolean;
    isStoppedInArea2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, drawSphere: boolean): boolean;
    isStoppedInArea3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, drawSphere: boolean): boolean;
    /** Returns true if the vehicle is a street racer
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_STREET_RACER */
    isStreetRacer(): boolean;
    /** Returns true if the car has been upside down for more than 2 seconds (requires 0190)
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_STUCK_ON_ROOF */
    isStuckOnRoof(): boolean;
    /** Returns true if a given tire on the car is deflated
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_TYRE_BURST */
    isTireBurst(tireId: int): boolean;
    /** Returns true if the car is touching the other car
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_TOUCHING_CAR */
    isTouchingCar(handle: Car): boolean;
    /** Returns true if the vehicle is in contact with the object
    *
    * https://library.sannybuilder.com/#/sa?q=IS_VEHICLE_TOUCHING_OBJECT */
    isTouchingObject(handle: ScriptObject): boolean;
    /** Returns true if the vehicle is in the normal position (upright)
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_UPRIGHT */
    isUpright(): boolean;
    /** Returns true if the car is upside down
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_UPSIDEDOWN */
    isUpsidedown(): boolean;
    /** Returns true if any of the car components is visibly damaged or lost
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_VISIBLY_DAMAGED */
    isVisiblyDamaged(): boolean;
    isWaitingForWorldCollision(): boolean;
    locate2D(x: float, y: float, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    locate3D(x: float, y: float, z: float, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    locateStopped2D(x: float, y: float, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the car is stopped in the radius of the specified point
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_STOPPED_CAR_3D */
    locateStopped3D(x: float, y: float, z: float, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Sets the locked status of the car's doors
    *
    * https://library.sannybuilder.com/#/sa?q=LOCK_CAR_DOORS */
    lockDoors(lockStatus: int): Car;
    /** Marks the car as being part of a convoy, which seems to follow a path set by 0994
    *
    * https://library.sannybuilder.com/#/sa?q=MARK_CAR_AS_CONVOY_CAR */
    markAsConvoyCar(state: boolean): Car;
    /** Marks the vehicle as script controlled
    *
    * https://library.sannybuilder.com/#/sa?q=MARK_CAR_AS_NEEDED */
    markAsNeeded(): Car;
    /** Allows the vehicle to be deleted by the game if necessary, and also removes it from the mission cleanup list, if applicable
    *
    * https://library.sannybuilder.com/#/sa?q=MARK_CAR_AS_NO_LONGER_NEEDED */
    markAsNoLongerNeeded(): Car;
    /** Opens the specified car door
    *
    * https://library.sannybuilder.com/#/sa?q=OPEN_CAR_DOOR */
    openDoor(door: int): Car;
    /** Sets the angle of a car door
    *
    * https://library.sannybuilder.com/#/sa?q=OPEN_CAR_DOOR_A_BIT */
    openDoorABit(door: int, value: float): Car;
    /** Freezes the car on its path
    *
    * https://library.sannybuilder.com/#/sa?q=PAUSE_PLAYBACK_RECORDED_CAR */
    pausePlaybackRecorded(): Car;
    /** Opens the car's trunk and keeps it open
    *
    * https://library.sannybuilder.com/#/sa?q=POP_CAR_BOOT */
    popBoot(): Car;
    /** Removes the specified car door component from the car
    *
    * https://library.sannybuilder.com/#/sa?q=POP_CAR_DOOR */
    popDoor(door: int, visibility: boolean): Car;
    popPanel(panelId: int, visibility: boolean): Car;
    /** Makes a passenger in the vehicle speak from an ambient speech ID, if one exists for the character
    *
    * https://library.sannybuilder.com/#/sa?q=RANDOM_PASSENGER_SAY */
    randomPassengerSay(speechId: int): Car;
    /** Removes the vehicle's mod with the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_VEHICLE_MOD */
    removeMod(modelId: int): Car;
    /** Deactivates upside-down car check (0190) for the car
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_UPSIDEDOWN_CAR_CHECK */
    removeUpsidedownCheck(): Car;
    /** This resets all the hydraulics on the car, making it "sit"
    *
    * https://library.sannybuilder.com/#/sa?q=RESET_VEHICLE_HYDRAULICS */
    resetHydraulics(): Car;
    /** Sets the vehicle to use its secondary guns
    *
    * https://library.sannybuilder.com/#/sa?q=SELECT_WEAPONS_FOR_VEHICLE */
    selectWeapons(_p2: int): Car;
    /** Sets the air resistance for the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=SET_VEHICLE_AIR_RESISTANCE_MULTIPLIER */
    setAirResistanceMultiplier(multiplier: float): Car;
    /** Sets the status of the car's alarm
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_ALARM */
    setAlarm(status: int): Car;
    setAlwaysCreateSkids(state: boolean): Car;
    setAreaVisible(interiorId: int): Car;
    /** Sets the script as the owner of the vehicle and adds it to the mission cleanup list
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_AS_MISSION_CAR */
    setAsMissionCar(): Car;
    /** Sets whether the vehicle will avoid paths between levels (0426)
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_AVOID_LEVEL_TRANSITIONS */
    setAvoidLevelTransitions(state: boolean): Car;
    /** Sets whether the car receives damage
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_CAN_BE_DAMAGED */
    setCanBeDamaged(state: boolean): Car;
    /** Sets whether the vehicle can be targeted
    *
    * https://library.sannybuilder.com/#/sa?q=SET_VEHICLE_CAN_BE_TARGETED */
    setCanBeTargeted(state: boolean): Car;
    /** Sets whether the vehicle can be visibly damaged
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_CAN_BE_VISIBLY_DAMAGED */
    setCanBeVisiblyDamaged(state: boolean): Car;
    /** Sets whether the car's tires can be deflated
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAN_BURST_CAR_TYRES */
    setCanBurstTires(state: boolean): Car;
    /** Sets whether the vehicle will drive the wrong way on roads
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_CAN_GO_AGAINST_TRAFFIC */
    setCanGoAgainstTraffic(state: boolean): Car;
    /** Enables or disables the ability to Pay'n'Spray the car
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAN_RESPRAY_CAR */
    setCanRespray(state: boolean): Car;
    setCollision(state: boolean): Car;
    /** Puts the vehicle at the specified location
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_COORDINATES */
    setCoordinates(x: float, y: float, z: float): Car;
    /** Sets the vehicle coordinates without applying offsets to account for the height of the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_COORDINATES_NO_OFFSET */
    setCoordinatesNoOffset(x: float, y: float, z: float): Car;
    /** Sets the vehicle's max speed
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_CRUISE_SPEED */
    setCruiseSpeed(maxSpeed: float): Car;
    /** Sets the dirt level of the car
    *
    * https://library.sannybuilder.com/#/sa?q=SET_VEHICLE_DIRT_LEVEL */
    setDirtLevel(level: float): Car;
    /** Sets the behavior of the vehicle's AI driver
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_DRIVING_STYLE */
    setDrivingStyle(drivingStyle: int): Car;
    /** Sets whether the car's engine is broken
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_ENGINE_BROKEN */
    setEngineBroken(state: boolean): Car;
    /** Sets whether the vehicle's engine is turned on or off
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_ENGINE_ON */
    setEngineOn(state: boolean): Car;
    /** Makes the vehicle stay in front of the other, keeping parallel
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_ESCORT_CAR_FRONT */
    setEscortCarFront(handle: Car): Car;
    /** Makes the vehicle stay on the other vehicle's left side, keeping parallel
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_ESCORT_CAR_LEFT */
    setEscortCarLeft(handle: Car): Car;
    /** Makes the vehicle stay behind the other car, keeping parallel
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_ESCORT_CAR_REAR */
    setEscortCarRear(handle: Car): Car;
    /** Makes the vehicle stay by the right side of the other vehicle, keeping parallel
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_ESCORT_CAR_RIGHT */
    setEscortCarRight(handle: Car): Car;
    /** Sets extended var value for this car. Requires initialization (0E17), otherwise returns false
    *
    * https://library.sannybuilder.com/#/sa?q=SET_EXTENDED_CAR_VAR */
    setExtendedVar(identifier: string, varNumber: int): boolean;
    /** Sets the car extra colors
    *
    * https://library.sannybuilder.com/#/sa?q=SET_EXTRA_CAR_COLOURS */
    setExtraColors(color1: int, color2: int): Car;
    setFollowCar(handle: Car, radius: float): Car;
    /** Sets the speed of the car
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_FORWARD_SPEED */
    setForwardSpeed(forwardSpeed: float): Car;
    /** Sets whether the player can receive items from this vehicle, such as shotgun ammo from a police car and cash from a taxi
    *
    * https://library.sannybuilder.com/#/sa?q=SET_FREEBIES_IN_VEHICLE */
    setFreebies(state: boolean): Car;
    /** Sets the vehicle's heading (z-angle)
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_HEADING */
    setHeading(heading: float): Car;
    /** Sets the vehicle's health
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_HEALTH */
    setHealth(health: int): Car;
    /** Sets whether the car is heavy
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_HEAVY */
    setHeavy(state: boolean): Car;
    /** Enables hydraulic suspension on the car
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_HYDRAULICS */
    setHydraulics(state: boolean): Car;
    /** Sets the car's mission to idle (MISSION_NONE), stopping any driving activity
    *
    * https://library.sannybuilder.com/#/sa?q=CAR_SET_IDLE */
    setIdle(): Car;
    setIsConsideredByPlayer(state: boolean): Car;
    /** Sets whether the vehicle's lights are on
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_LIGHTS_ON */
    setLightsOn(state: boolean): Car;
    setLoadCollisionFlag(state: boolean): Car;
    /** Sets the mission of the vehicle's AI driver
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_MISSION */
    setMission(carMission: int): Car;
    /** Makes a vehicle immune to everything except the player
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_ONLY_DAMAGED_BY_PLAYER */
    setOnlyDamagedByPlayer(state: boolean): Car;
    /** Sets whether the car can be blown up by shooting at the petrol tank
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PETROL_TANK_WEAKPOINT */
    setPetrolTankWeakpoint(state: boolean): Car;
    /** Sets the playback speed of the car playing a car recording
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYBACK_SPEED */
    setPlaybackSpeed(speed: float): Car;
    /** Sets the vehicle's immunities
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_PROOFS */
    setProofs(bulletProof: boolean, fireProof: boolean, explosionProof: boolean, collisionProof: boolean, meleeProof: boolean): Car;
    /** Sets the rotation of a vehicle using quaternion values
    *
    * https://library.sannybuilder.com/#/sa?q=SET_VEHICLE_QUATERNION */
    setQuaternion(x: float, y: float, z: float, w: float): Car;
    /** Sets the car on a specific route
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_RANDOM_ROUTE_SEED */
    setRandomRouteSeed(routeSeed: int): Car;
    /** Sets the Y Angle of the vehicle to the specified value
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_ROLL */
    setRoll(yAngle: float): Car;
    setRotationVelocity(x: float, y: float, z: float): Car;
    /** Sets the car's status
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_STATUS */
    setStatus(status: int): Car;
    setStayInFastLane(state: boolean): Car;
    setStayInSlowLane(state: boolean): Car;
    /** Sets the minimum distance for the AI driver to start ignoring car paths and go straight to the target
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_STRAIGHT_LINE_DISTANCE */
    setStraightLineDistance(distance: int): Car;
    /** Defines whether the car is more resistant to collisions than normal
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_STRONG */
    setStrong(state: boolean): Car;
    /** Sets whether the taxi's roof light is on
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TAXI_LIGHTS */
    setTaxiLights(state: boolean): Car;
    /** Makes the AI driver perform the action in the vehicle for the specified period of time
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_TEMP_ACTION */
    setTempAction(actionId: int, timeInMs: int): Car;
    /** Sets the alpha transparency of a distant vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=SET_VEHICLE_TO_FADE_IN */
    setToFadeIn(alpha: int): Car;
    /** Overrides the default vehicle traction value of 1.0
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_TRACTION */
    setTraction(traction: float): Car;
    /** Disables the car from exploding when it is upside down, as long as the player is not in the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=SET_UPSIDEDOWN_CAR_NOT_DAMAGED */
    setUpsidedownNotDamaged(state: boolean): Car;
    /** Sets whether the vehicle is visible or not
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_VISIBLE */
    setVisible(state: boolean): Car;
    /** Makes the vehicle watertight, meaning characters inside will not be harmed if the vehicle is submerged in water
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_WATERTIGHT */
    setWatertight(state: boolean): Car;
    /** Advances the recorded car playback by the specified amount
    *
    * https://library.sannybuilder.com/#/sa?q=SKIP_IN_PLAYBACK_RECORDED_CAR */
    skipInPlaybackRecorded(amount: float): Car;
    skipToEndAndStopPlaybackRecorded(): Car;
    /** Assigns a car to a path
    *
    * https://library.sannybuilder.com/#/sa?q=START_PLAYBACK_RECORDED_CAR */
    startPlaybackRecorded(path: int): Car;
    /** Starts looped playback of a recorded car path
    *
    * https://library.sannybuilder.com/#/sa?q=START_PLAYBACK_RECORDED_CAR_LOOPED */
    startPlaybackRecordedLooped(pathId: int): Car;
    /** Starts the playback of a recorded car with driver AI enabled
    *
    * https://library.sannybuilder.com/#/sa?q=START_PLAYBACK_RECORDED_CAR_USING_AI */
    startPlaybackRecordedUsingAi(pathId: int): Car;
    /** Stops car from following path
    *
    * https://library.sannybuilder.com/#/sa?q=STOP_PLAYBACK_RECORDED_CAR */
    stopPlaybackRecorded(): Car;
    /** Sets whether the car's alarm can be activated
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_CAR_SIREN */
    switchSiren(state: boolean): Car;
    /** Makes all passengers of the car leave it
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_EVERYONE_LEAVE_CAR */
    taskEveryoneLeave(): Car;
    /** Sets the car's heading so that it is facing the 2D coordinate
    *
    * https://library.sannybuilder.com/#/sa?q=TURN_CAR_TO_FACE_COORD */
    turnToFaceCoord(x: float, y: float): Car;
    /** Unfreezes the vehicle on its path
    *
    * https://library.sannybuilder.com/#/sa?q=UNPAUSE_PLAYBACK_RECORDED_CAR */
    unpausePlaybackRecorded(): Car;
    /** Clears any current tasks the vehicle has and makes it drive around aimlessly
    *
    * https://library.sannybuilder.com/#/sa?q=CAR_WANDER_RANDOMLY */
    wanderRandomly(): Car;
    /** Sets whether the vehicle can be picked up using the magnocrane
    *
    * https://library.sannybuilder.com/#/sa?q=WINCH_CAN_PICK_VEHICLE_UP */
    winchCanPickUp(state: boolean): Car;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/CarGenerator */
declare class CarGenerator {
    constructor(handle: number);
    /** Initializes a parked car generator
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_CAR_GENERATOR */
    static Create(x: float, y: float, z: float, heading: float, modelId: int, primaryColor: int, secondaryColor: int, forceSpawn: boolean, alarmChance: int, doorLockChance: int, minDelay: int, maxDelay: int): CarGenerator;
    /** Creates a parked car generator with a number plate
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_CAR_GENERATOR_WITH_PLATE */
    static CreateWithPlate(x: float, y: float, z: float, heading: float, modelId: int, primaryColor: int, secondaryColor: int, forceSpawn: boolean, alarmChance: int, doorLockChance: int, minDelay: int, maxDelay: int, plateName: string): CarGenerator;
    /** Resets the disabled car model list for car generators
    *
    * https://library.sannybuilder.com/#/sa?q=DONT_SUPPRESS_ANY_CAR_MODELS */
    static DontSuppressAnyCarModels(): void;
    /** Allows the specified car model to spawn for car generators
    *
    * https://library.sannybuilder.com/#/sa?q=DONT_SUPPRESS_CAR_MODEL */
    static DontSuppressCarModel(modelId: int): void;
    /** Prevents the specified car model from spawning for car generators
    *
    * https://library.sannybuilder.com/#/sa?q=SUPPRESS_CAR_MODEL */
    static SuppressCarModel(model: int): void;
    /** Sets whether the player will not receive a wanted level when entering a vehicle from this generator when the police is around
    *
    * https://library.sannybuilder.com/#/sa?q=SET_HAS_BEEN_OWNED_FOR_CAR_GENERATOR */
    setHasBeenOwned(state: boolean): CarGenerator;
    setNoSave(): CarGenerator;
    /** Specifies the number of times the car generator spawns a car (101 - infinite)
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_CAR_GENERATOR */
    switch(amount: int): CarGenerator;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/CardDecks */
interface CardDecks {
    /** Returns a random number between 1 and 52, inclusive
    *
    * https://library.sannybuilder.com/#/sa?q=FETCH_NEXT_CARD */
    FetchNextCard(): int;
    Shuffle(type: int): void;
}
declare var CardDecks: CardDecks
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Char */
declare class Char {
    constructor(handle: number);
    /** Creates a character at the specified location, with the specified model and pedtype
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_CHAR */
    static Create(pedType: int, modelId: int, x: float, y: float, z: float): Char;
    /** Creates a character with the specified model in the passenger seat of the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_CHAR_AS_PASSENGER */
    static CreateAsPassenger(vehicle: Car, pedType: int, modelId: int, seatId: int): Char;
    static CreateAtAttractor(pedType: int, modelId: int, taskId: int, attractor: Attractor): Char;
    /** Creates a character in the driver's seat of the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_CHAR_INSIDE_CAR */
    static CreateInsideCar(vehicle: Car, pedType: int, modelId: int): Char;
    /** Creates a character with a randomised model and pedtype at the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_RANDOM_CHAR */
    static CreateRandom(x: float, y: float, z: float): Char;
    /** Creates a driver in the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_RANDOM_CHAR_AS_DRIVER */
    static CreateRandomAsDriver(vehicle: Car): Char;
    /** Creates a random character in the passenger seat of the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_RANDOM_CHAR_AS_PASSENGER */
    static CreateRandomAsPassenger(vehicle: Car, seatId: int): Char;
    /** Creates a character descending from a rope
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_SWAT_ROPE */
    static CreateSwatRope(pedType: int, modelId: int, x: float, y: float, z: float): Char;
    /** Returns true if the handle is a valid character handle
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_CHAR_EXIST */
    static DoesExist(handle: int): boolean;
    /** Returns true if the handle is an invalid character handle or the character is dead (wasted)
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_DEAD */
    static IsDead(handle: int): boolean;
    /** Sets how the character chooses to go to their destination in the next task without a parameter specifying this
    *
    * https://library.sannybuilder.com/#/sa?q=SET_NEXT_DESIRED_MOVE_STATE */
    static SetNextDesiredMoveState(moveState: int): void;
    /** Adds the specified amount of ammo to the character's weapon, if the character has the weapon
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_AMMO_TO_CHAR */
    addAmmo(weaponType: int, ammo: int): Char;
    /** Increases the character's armor by the specified value to the maximum of 100.0
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_ARMOUR_TO_CHAR */
    addArmor(amount: int): Char;
    attachToBike(vehicle: Car, xOffset: float, yOffset: float, zOffset: float, position: int, _p7: float, _p8: float, weaponType: int): Char;
    /** Puts character into a turret on the vehicle, allowing them to shoot
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_CHAR_TO_CAR */
    attachToCar(vehicle: Car, xOffset: float, yOffset: float, zOffset: float, position: int, angleLimit: float, weaponType: int): Char;
    /** Attaches the character to the specified object, in turret mode
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_CHAR_TO_OBJECT */
    attachToObject(handle: ScriptObject, xOffset: float, yOffset: float, zOffset: float, orientation: int, angleLimit: float, weaponType: int): Char;
    /** Returns true if the character sees a dead body of the given type
    *
    * https://library.sannybuilder.com/#/sa?q=CAN_CHAR_SEE_DEAD_CHAR */
    canSeeDeadChar(pedType: int): boolean;
    clearAllRelationships(relationshipType: int): Char;
    clearLastDamageEntity(): Char;
    /** Clears the character's last weapon damage (see 031D)
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_CHAR_LAST_WEAPON_DAMAGE */
    clearLastWeaponDamage(): Char;
    /** Clears the actor's look task, making them stop looking at whatever they were assigned to look at
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_LOOK_AT */
    clearLookAt(): Char;
    clearRelationship(relationshipType: int, toPedType: int): Char;
    /** Clears the char's task, making them quit whatever they were doing
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_CHAR_TASKS */
    clearTasks(): Char;
    /** Clears all the characters tasks immediately, resetting the character to an idle state
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_CHAR_TASKS_IMMEDIATELY */
    clearTasksImmediately(): Char;
    /** Decreases the characters health
    *
    * https://library.sannybuilder.com/#/sa?q=DAMAGE_CHAR */
    damage(amount: int, damageArmour: boolean): Char;
    /** Removes the character from the game and mission cleanup list, freeing game memory
    *
    * https://library.sannybuilder.com/#/sa?q=DELETE_CHAR */
    delete(): void;
    /** Takes the character out of turret mode (0464)
    *
    * https://library.sannybuilder.com/#/sa?q=DETACH_CHAR_FROM_CAR */
    detachFromCar(): Char;
    /** Prevents any character speech from playing
    *
    * https://library.sannybuilder.com/#/sa?q=DISABLE_CHAR_SPEECH */
    disableSpeech(stopNow: boolean): Char;
    /** Removes the character from the mission cleanup list, preventing it from being deleted when the mission ends
    *
    * https://library.sannybuilder.com/#/sa?q=DONT_REMOVE_CHAR */
    dontRemove(): Char;
    dropObject(state: boolean): Char;
    dropSecondObject(state: boolean): Char;
    /** Enables pain audio if it was disabled using 094E
    *
    * https://library.sannybuilder.com/#/sa?q=ENABLE_CHAR_SPEECH */
    enableSpeech(): Char;
    /** Dismembers the character
    *
    * https://library.sannybuilder.com/#/sa?q=EXPLODE_CHAR_HEAD */
    explodeHead(): Char;
    fixGroundBrightnessAndFadeIn(fixGround: boolean, fixBrightness: boolean, fadeIn: boolean): Char;
    /** Sets whether the character's position remains unchanged
    *
    * https://library.sannybuilder.com/#/sa?q=FREEZE_CHAR_POSITION */
    freezePosition(state: boolean): Char;
    freezePositionAndDontLoadCollision(state: boolean): Char;
    /** Gets the amount of ammo in the specified weapon of the character
    *
    * https://library.sannybuilder.com/#/sa?q=GET_AMMO_IN_CHAR_WEAPON */
    getAmmoInWeapon(weaponType: int): int;
    /** Returns the progress of the animation on the actor, ranging from 0
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_ANIM_CURRENT_TIME */
    getAnimCurrentTime(animationName: string): int;
    /** Returns a float of the length of the animation in milliseconds
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_ANIM_TOTAL_TIME */
    getAnimTotalTime(animationName: string): int;
    /** Returns the interior ID that the character is in
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_AREA_VISIBLE */
    getAreaVisible(): int;
    /** Returns the character's armor amount
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_ARMOUR */
    getArmor(): int;
    /** Stores a handle for the vehicle the character is in or entering
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_CHAR_IS_USING */
    getCarIsUsing(): Car;
    /** Returns the character's coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_COORDINATES */
    getCoordinates(): {
        x: float;
        y: float;
        z: float;
    };
    getCoordinatesOfDied(): {
        x: float;
        y: float;
        z: float;
    };
    /** Returns the type of weapon that the character is currently holding
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CURRENT_CHAR_WEAPON */
    getCurrentWeapon(): int;
    /** Gets extended var value for this char. Returns false if not initialized (0E14)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_EXTENDED_CHAR_VAR */
    getExtendedVar(identifier: string, varNumber: int): int | undefined;
    /** Returns the character's heading (z-angle)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_HEADING */
    getHeading(): float;
    /** Returns the character's health
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_HEALTH */
    getHealth(): int;
    /** Returns the actor's distance from ground
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_HEIGHT_ABOVE_GROUND */
    getHeightAboveGround(): float;
    /** Gets the characters active ped event
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_HIGHEST_PRIORITY_EVENT */
    getHighestPriorityEvent(): int;
    /** Returns the character's maximum health (08AF)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_MAX_HEALTH */
    getMaxHealth(): float;
    /** Returns the characters model
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_MODEL */
    getModel(modelId: int): Char;
    /** Gets the name of the characters interior
    *
    * https://library.sannybuilder.com/#/sa?q=GET_NAME_OF_ENTRY_EXIT_CHAR_USED */
    getNameOfEntryExitUsed(): string;
    /** Returns the number of members which are in a group of the character (01DE)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_NUMBER_OF_FOLLOWERS */
    getNumberOfFollowers(): int;
    /** Returns the coordinates of the character, with an offset
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OFFSET_FROM_CHAR_IN_WORLD_COORDS */
    getOffsetInWorldCoords(xOffset: float, yOffset: float, zOffset: float): {
        x: float;
        y: float;
        z: float;
    };
    /** Gets the ped type of the character
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PED_TYPE */
    getPedType(): int;
    /** Returns the coordinates and heading of the entry (enex) marker the character used to get to the current interior
    *
    * https://library.sannybuilder.com/#/sa?q=GET_POSITION_OF_ENTRY_EXIT_CHAR_USED */
    getPositionOfEntryExitCharUsed(): {
        x: float;
        y: float;
        z: float;
        heading: float;
    };
    /** Returns the status of the specified script task of the character
    *
    * https://library.sannybuilder.com/#/sa?q=GET_SCRIPT_TASK_STATUS */
    getScriptTaskStatus(taskId: int): int;
    /** Gets the characters task sequence progress, as started by 0618
    *
    * https://library.sannybuilder.com/#/sa?q=GET_SEQUENCE_PROGRESS */
    getSequenceProgress(): int;
    getSequenceProgressRecursive(): {
        _p2: int;
        _p3: int;
    };
    /** Returns the actor's movement speed
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_SPEED */
    getSpeed(): float;
    getSwimState(): int;
    /** Gets the characters velocity
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_VELOCITY */
    getVelocity(): {
        x: float;
        y: float;
        z: float;
    };
    /** Returns the weapon type, ammo and model from the specified slot
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_WEAPON_IN_SLOT */
    getWeaponInSlot(weaponSlotId: int): {
        weaponType: int;
        weaponAmmo: int;
        weaponModel: int;
    };
    /** Sets the specified characters fighting style and moves
    *
    * https://library.sannybuilder.com/#/sa?q=GIVE_MELEE_ATTACK_TO_CHAR */
    giveMeleeAttack(fightStyle: int, moveId: int): Char;
    /** Gives the character the weapon with the specified amount of ammo
    *
    * https://library.sannybuilder.com/#/sa?q=GIVE_WEAPON_TO_CHAR */
    giveWeapon(weaponType: int, ammo: int): Char;
    /** Returns true if the character has been arrested
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CHAR_BEEN_ARRESTED */
    hasBeenArrested(): boolean;
    /** Returns true if the actor has been hurt by the specified vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CHAR_BEEN_DAMAGED_BY_CAR */
    hasBeenDamagedByCar(handle: Car): boolean;
    /** Returns true if the character has been hurt by the other character
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CHAR_BEEN_DAMAGED_BY_CHAR */
    hasBeenDamagedByChar(handle: Char): boolean;
    /** Returns true if the character has been hit by the specified weapon
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CHAR_BEEN_DAMAGED_BY_WEAPON */
    hasBeenDamagedByWeapon(weaponType: int): boolean;
    /** Returns true if the character has been photographed
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CHAR_BEEN_PHOTOGRAPHED */
    hasBeenPhotographed(): boolean;
    /** Returns true if the character has the specified weapon
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CHAR_GOT_WEAPON */
    hasGotWeapon(weaponType: int): boolean;
    /** Returns true if the character can see the target character
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CHAR_SPOTTED_CHAR */
    hasSpottedChar(target: Char): boolean;
    /** Returns true if the character can see the other character in front of them
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CHAR_SPOTTED_CHAR_IN_FRONT */
    hasSpottedCharInFront(handle: Char): boolean;
    /** Hides all of the specified actor's weapons
    *
    * https://library.sannybuilder.com/#/sa?q=HIDE_CHAR_WEAPON_FOR_SCRIPTED_CUTSCENE */
    hideWeaponForScriptedCutscene(state: boolean): Char;
    ignoreHeightDifferenceFollowingNodes(state: boolean): Char;
    /** Inits additional variables for this char. Identifier can be "AUTO" for unique ID based on script pointer
    *
    * https://library.sannybuilder.com/#/sa?q=INIT_EXTENDED_CHAR_VARS */
    initExtendedVars(identifier: string, totalVars: int): boolean;
    isAtScriptedAttractor(handle: Attractor): boolean;
    /** Returns true if the actor is turreted on any vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_ATTACHED_TO_ANY_CAR */
    isAttachedToAnyCar(): boolean;
    /** Returns true if the character is holding the given type of weapon
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CURRENT_CHAR_WEAPON */
    isCurrentWeapon(weaponType: int): boolean;
    /** Returns true if the specified character is crouching
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_DUCKING */
    isDucking(): boolean;
    /** Returns true if the character is entering a car, but is not in the car
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_GETTING_IN_TO_A_CAR */
    isGettingInToACar(): boolean;
    /** Returns true if the character is the leader of the specified group
    *
    * https://library.sannybuilder.com/#/sa?q=IS_GROUP_LEADER */
    isGroupLeader(handle: Group): boolean;
    /** Returns true if the character is a member of the specified group
    *
    * https://library.sannybuilder.com/#/sa?q=IS_GROUP_MEMBER */
    isGroupMember(handle: Group): boolean;
    /** Returns true if the character has had its head shot off
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_HEAD_MISSING */
    isHeadMissing(): boolean;
    /** Returns true if the character's health is over the specified value
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_HEALTH_GREATER */
    isHealthGreater(health: int): boolean;
    /** Returns true if the actor is lifting the specified object
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_HOLDING_OBJECT */
    isHoldingObject(handle: ScriptObject): boolean;
    /** Returns true if the character is in the air
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_AIR */
    isInAir(): boolean;
    /** Checks if the character is within the angled 2D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_ANGLED_AREA_2D */
    isInAngledArea2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, angle: float, drawSphere: boolean): boolean;
    /** Checks if the character is within the angled 3D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_ANGLED_AREA_3D */
    isInAngledArea3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, angle: float, drawSphere: boolean): boolean;
    /** Checks if the character is in a car which is within the angled 2D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_ANGLED_AREA_IN_CAR_2D */
    isInAngledAreaInCar2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, angle: float, drawSphere: boolean): boolean;
    isInAngledAreaInCar3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, angle: float, drawSphere: boolean): boolean;
    /** Checks if the character is within the angled 2D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_ANGLED_AREA_ON_FOOT_2D */
    isInAngledAreaOnFoot2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, angle: float, drawSphere: boolean): boolean;
    /** Checks if the character is within the angled 3D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_ANGLED_AREA_ON_FOOT_3D */
    isInAngledAreaOnFoot3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, angle: float, drawSphere: boolean): boolean;
    /** Returns true if the character is driving a boat
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_ANY_BOAT */
    isInAnyBoat(): boolean;
    /** Returns true if the character has a vehicle, even if they are not actually sat inside it (opening and closing the door)
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_ANY_CAR */
    isInAnyCar(): boolean;
    /** Returns true if the character is flying a helicopter
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_ANY_HELI */
    isInAnyHeli(): boolean;
    /** Returns true if the character is in a plane
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_ANY_PLANE */
    isInAnyPlane(): boolean;
    /** Returns true if the character is driving a police vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_ANY_POLICE_VEHICLE */
    isInAnyPoliceVehicle(): boolean;
    /** Returns the handle for the searchlight that's targeting the character
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_ANY_SEARCHLIGHT */
    isInAnySearchlight(): Searchlight | undefined;
    /** Returns true if the specified character is in a train
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_ANY_TRAIN */
    isInAnyTrain(): boolean;
    /** Returns true if the character is within the specified 2D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_AREA_2D */
    isInArea2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the specified 3D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_AREA_3D */
    isInArea3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the specified 2D area in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_AREA_IN_CAR_2D */
    isInAreaInCar2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the specified 3D area in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_AREA_IN_CAR_3D */
    isInAreaInCar3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the specified 2D area on foot
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_AREA_ON_FOOT_2D */
    isInAreaOnFoot2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the specified 3D area on foot
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_AREA_ON_FOOT_3D */
    isInAreaOnFoot3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, drawSphere: boolean): boolean;
    /** Returns true if the character is in the specified vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_CAR */
    isInCar(vehicle: Car): boolean;
    /** Returns true if the character is in a flying vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_FLYING_VEHICLE */
    isInFlyingVehicle(): boolean;
    /** Returns true if the character is driving a vehicle with the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_MODEL */
    isInModel(modelId: int): boolean;
    /** Returns true if the character is driving a taxi
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_TAXI */
    isInTaxi(): boolean;
    /** Returns true if the character is in water
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_WATER */
    isInWater(): boolean;
    /** Returns true if the character is in the specified map zone
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_ZONE */
    isInZone(zone: string): boolean;
    /** Returns true if the character is male
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_MALE */
    isMale(): boolean;
    /** Returns true if the character's model ID is equivalent to the model ID passed
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_MODEL */
    isModel(modelId: int): boolean;
    /** Returns true if any characters are within range of the character
    *
    * https://library.sannybuilder.com/#/sa?q=ARE_ANY_CHARS_NEAR_CHAR */
    isNearAnyChars(radius: float): boolean;
    /** Returns true if the character is riding a bike
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_ON_ANY_BIKE */
    isOnAnyBike(): boolean;
    /** Returns true if the character is on foot, and not occupying a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_ON_FOOT */
    isOnFoot(): boolean;
    /** Returns true if the character is visible
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_ON_SCREEN */
    isOnScreen(): boolean;
    /** Returns true if character is performing the specified animation
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_PLAYING_ANIM */
    isPlayingAnim(animationName: string): boolean;
    /** Returns true if the character is responding to the specified ped event
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_RESPONDING_TO_EVENT */
    isRespondingToEvent(eventId: int): boolean;
    /** Returns true if the specified character is controlled by script
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_SCRIPT_CONTROLLED */
    isScriptControlled(): boolean;
    /** Returns true if the character is firing a weapon
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_SHOOTING */
    isShooting(): boolean;
    /** Returns true if the character fired a weapon within the specified 2D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_SHOOTING_IN_AREA */
    isShootingInArea(leftBottomX: float, leftBottomY: float, topRightX: float, topRightY: float, drawSphere: boolean): boolean;
    /** Returns true if the character is sitting in any vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_SITTING_IN_ANY_CAR */
    isSittingInAnyCar(): boolean;
    /** Returns true if the character is sitting in the specified vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_SITTING_IN_CAR */
    isSittingInCar(vehicle: Car): boolean;
    /** Returns true if the character is not moving
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_STOPPED */
    isStopped(): boolean;
    /** Checks if the character is within the angled 2D area and is motionless
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_STOPPED_IN_ANGLED_AREA_2D */
    isStoppedInAngledArea2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, angle: float, drawSphere: boolean): boolean;
    isStoppedInAngledArea3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, angle: float, drawSphere: boolean): boolean;
    /** Checks if the character is in a motionless car within the angled 2D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_STOPPED_IN_ANGLED_AREA_IN_CAR_2D */
    isStoppedInAngledAreaInCar2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, angle: float, drawSphere: boolean): boolean;
    isStoppedInAngledAreaInCar3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, angle: float, drawSphere: boolean): boolean;
    /** Checks if the character is within the angled 2D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_STOPPED_IN_ANGLED_AREA_ON_FOOT_2D */
    isStoppedInAngledAreaOnFoot2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, angle: float, drawSphere: boolean): boolean;
    isStoppedInAngledAreaOnFoot3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, angle: float, drawSphere: boolean): boolean;
    /** Returns true if the character stopped within the specified 2D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_STOPPED_IN_AREA_2D */
    isStoppedInArea2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, drawSphere: boolean): boolean;
    /** Returns true if the character stopped within the specified 3D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_STOPPED_IN_AREA_3D */
    isStoppedInArea3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, drawSphere: boolean): boolean;
    /** Returns true if the character stopped within the specified 2D area in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_STOPPED_IN_AREA_IN_CAR_2D */
    isStoppedInAreaInCar2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, drawSphere: boolean): boolean;
    /** Returns true if the character stopped within the specified 3D area in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_STOPPED_IN_AREA_IN_CAR_3D */
    isStoppedInAreaInCar3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, drawSphere: boolean): boolean;
    /** Returns true if the character stopped within the specified 2D area on foot
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_STOPPED_IN_AREA_ON_FOOT_2D */
    isStoppedInAreaOnFoot2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, drawSphere: boolean): boolean;
    /** Returns true if the character stopped within the specified 3D area on foot
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_STOPPED_IN_AREA_ON_FOOT_3D */
    isStoppedInAreaOnFoot3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, drawSphere: boolean): boolean;
    /** Returns true if the actor is stuck under a car
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_STUCK_UNDER_CAR */
    isStuckUnderCar(): boolean;
    isSwimming(): boolean;
    /** Returns true if the character is playing any speech
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_TALKING */
    isTalking(): boolean;
    /** Returns true if the character is touching the other character
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_TOUCHING_CHAR */
    isTouchingChar(handle: Char): boolean;
    /** Returns true if the character is colliding with the specified object
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_TOUCHING_OBJECT */
    isTouchingObject(object: ScriptObject): boolean;
    /** Returns true if the character is colliding with the specified object on foot
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_TOUCHING_OBJECT_ON_FOOT */
    isTouchingObjectOnFoot(object: ScriptObject): boolean;
    /** Returns true if the character is colliding with a car
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_TOUCHING_VEHICLE */
    isTouchingVehicle(handle: Car): boolean;
    /** Returns true if the character is using a map attractor
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_USING_MAP_ATTRACTOR */
    isUsingMapAttractor(): boolean;
    isWaitingForWorldCollision(): boolean;
    listenToPlayerGroupCommands(state: boolean): Char;
    /** Returns true if the character is within the 2D radius of the coordinates point
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ANY_MEANS_2D */
    locateAnyMeans2D(x: float, y: float, xRadius: float, yRadius: float, drawSphere: Sphere): boolean;
    /** Returns true if the character is within the 3D radius of the coordinates point
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ANY_MEANS_3D */
    locateAnyMeans3D(x: float, y: float, z: float, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 2D radius of the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ANY_MEANS_CAR_2D */
    locateAnyMeansCar2D(vehicle: Car, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 3D radius of the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ANY_MEANS_CAR_3D */
    locateAnyMeansCar3D(vehicle: Car, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 2D radius of the other character
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ANY_MEANS_CHAR_2D */
    locateAnyMeansChar2D(target: Char, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 3D radius of the other character
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ANY_MEANS_CHAR_3D */
    locateAnyMeansChar3D(target: Char, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 2D radius of the object
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ANY_MEANS_OBJECT_2D */
    locateAnyMeansObject2D(object: ScriptObject, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 3D radius of the object
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ANY_MEANS_OBJECT_3D */
    locateAnyMeansObject3D(object: ScriptObject, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 2D radius of the coordinates point in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_IN_CAR_2D */
    locateInCar2D(x: float, y: float, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 3D radius of the coordinates point in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_IN_CAR_3D */
    locateInCar3D(x: float, y: float, z: float, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 2D radius of the vehicle in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_IN_CAR_CAR_2D */
    locateInCarCar2D(handle: Car, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 3D radius of the vehicle in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_IN_CAR_CAR_3D */
    locateInCarCar3D(vehicle: Car, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 2D radius of the other character in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_IN_CAR_CHAR_2D */
    locateInCarChar2D(otherChar: Char, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 3D radius of the other character in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_IN_CAR_CHAR_3D */
    locateInCarChar3D(target: Char, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 2D radius of the object in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_IN_CAR_OBJECT_2D */
    locateInCarObject2D(object: ScriptObject, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 3D radius of the object in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_IN_CAR_OBJECT_3D */
    locateInCarObject3D(object: ScriptObject, xRadius: float, yRadius: float, zRadius: float, drawSphere: int): boolean;
    /** Returns true if the character is within the 2D radius of the coordinates point on foot
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ON_FOOT_2D */
    locateOnFoot2D(x: float, y: float, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 3D radius of the coordinates point on foot
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ON_FOOT_3D */
    locateOnFoot3D(x: float, y: float, z: float, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 2D radius of the vehicle on foot
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ON_FOOT_CAR_2D */
    locateOnFootCar2D(vehicle: Car, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 3D radius of the vehicle on foot
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ON_FOOT_CAR_3D */
    locateOnFootCar3D(vehicle: Car, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 2D radius of the other character on foot
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ON_FOOT_CHAR_2D */
    locateOnFootChar2D(target: Char, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 3D radius of the other character on foot
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ON_FOOT_CHAR_3D */
    locateOnFootChar3D(target: Char, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 2D radius of the object on foot
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ON_FOOT_OBJECT_2D */
    locateOnFootObject2D(object: ScriptObject, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 3D radius of the object on foot
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ON_FOOT_OBJECT_3D */
    locateOnFootObject3D(object: ScriptObject, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character stopped within the 2D radius of the coordinates point
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_STOPPED_CHAR_ANY_MEANS_2D */
    locateStoppedAnyMeans2D(x: float, y: float, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character stopped within the 3D radius of the coordinates point
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_STOPPED_CHAR_ANY_MEANS_3D */
    locateStoppedAnyMeans3D(x: float, y: float, z: float, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character stopped within the 2D radius of the coordinates point in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_STOPPED_CHAR_IN_CAR_2D */
    locateStoppedInCar2D(x: float, y: float, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character stopped within the 3D radius of the coordinates point in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_STOPPED_CHAR_IN_CAR_3D */
    locateStoppedInCar3D(x: float, y: float, z: float, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character stopped within the 2D radius of the coordinates point on foot
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_STOPPED_CHAR_ON_FOOT_2D */
    locateStoppedOnFoot2D(x: float, y: float, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character stopped within the 3D radius of the coordinates point on foot
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_STOPPED_CHAR_ON_FOOT_3D */
    locateStoppedOnFoot3D(x: float, y: float, z: float, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Marks the character as script controlled
    *
    * https://library.sannybuilder.com/#/sa?q=MARK_CHAR_AS_NEEDED */
    markAsNeeded(): Char;
    /** Allows the character to be deleted by the game if necessary, and also removes them from the mission cleanup list, if applicable
    *
    * https://library.sannybuilder.com/#/sa?q=MARK_CHAR_AS_NO_LONGER_NEEDED */
    markAsNoLongerNeeded(): Char;
    /** Assigns the character to the specified action sequence
    *
    * https://library.sannybuilder.com/#/sa?q=PERFORM_SEQUENCE_TASK */
    performSequence(sequence: Sequence): Char;
    performSequenceFromProgress(sequence: Sequence, _p3: int, _p4: int): Char;
    /** Removes the characters weapons
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_ALL_CHAR_WEAPONS */
    removeAllWeapons(): Char;
    /** Removes the character with a fade, freeing game memory
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_CHAR_ELEGANTLY */
    removeElegantly(): Char;
    /** Removes the character from the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_CHAR_FROM_CAR_MAINTAIN_POSITION */
    removeFromCarMaintainPosition(handle: Car): Char;
    /** Removes the character from their current group
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_CHAR_FROM_GROUP */
    removeFromGroup(): Char;
    /** Removes the weapon from the character
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_WEAPON_FROM_CHAR */
    removeWeapon(weaponType: int): Char;
    /** Affects how often the character will hit the target when attacking with a weapon
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_ACCURACY */
    setAccuracy(accuracy: int): Char;
    /** Sets whether the character can crouch
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_ALLOWED_TO_DUCK */
    setAllowedToDuck(state: boolean): Char;
    /** Sets the amount of ammo the character has in the specified weapon
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_AMMO */
    setAmmo(weaponType: int, ammo: int): Char;
    /** Sets how far through the animation the character is, with 1
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_ANIM_CURRENT_TIME */
    setAnimCurrentTime(animationName: string, time: float): Char;
    /** Sets the animation group for the character
    *
    * https://library.sannybuilder.com/#/sa?q=SET_ANIM_GROUP_FOR_CHAR */
    setAnimGroup(animGroup: int): Char;
    /** Sets whether the animation is playing
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_ANIM_PLAYING_FLAG */
    setAnimPlayingFlag(animationName: string, flag: boolean): Char;
    /** Makes an actor perform an animation at the specified speed
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_ANIM_SPEED */
    setAnimSpeed(animName: string, animSpeed: float): Char;
    /** Sets the interior that the char is in
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_AREA_VISIBLE */
    setAreaVisible(interiorId: int): Char;
    /** Makes a character bleed
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_BLEEDING */
    setBleeding(state: boolean): Char;
    /** Specifies that the character should only use upper-body damage animations, meaning they can still run if shot in the legs etc
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_BULLETPROOF_VEST */
    setBulletproofVest(state: boolean): Char;
    /** Sets whether the character always stays on bike in collisions
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_CAN_BE_KNOCKED_OFF_BIKE */
    setCanBeKnockedOffBike(stayOnBike: boolean): Char;
    /** Makes the character immune to a damage while in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_CAN_BE_SHOT_IN_VEHICLE */
    setCanBeShotInVehicle(state: boolean): Char;
    /** Locks the character while in a car
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_CANT_BE_DRAGGED_OUT */
    setCantBeDraggedOut(state: boolean): Char;
    /** Sets whether collision detection is enabled for the character
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_COLLISION */
    setCollision(state: boolean): Char;
    /** Puts the character at the specified location
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_COORDINATES */
    setCoordinates(x: float, y: float, z: float): Char;
    /** Sets the character's coordinates without warping the rest of their group
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_COORDINATES_DONT_WARP_GANG */
    setCoordinatesDontWarpGang(x: float, y: float, z: float): Char;
    /** This command is a combination of 0972 and 08C7
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_COORDINATES_DONT_WARP_GANG_NO_OFFSET */
    setCoordinatesDontWarpGangNoOffset(x: float, y: float, z: float): Char;
    /** Puts the characters at the coordinates by the center of body instead of the feet
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_COORDINATES_NO_OFFSET */
    setCoordinatesNoOffset(x: float, y: float, z: float): Char;
    /** Sets the character's currently held weapon
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CURRENT_CHAR_WEAPON */
    setCurrentWeapon(weaponType: int): Char;
    /** Prevents pickups, which are created when this character dies, from disappearing until picked up by the player
    *
    * https://library.sannybuilder.com/#/sa?q=SET_DEATH_WEAPONS_PERSIST */
    setDeathWeaponsPersist(state: boolean): Char;
    /** Sets the decision maker for the character
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_DECISION_MAKER */
    setDecisionMaker(maskOrHandle: DecisionMakerChar): Char;
    /** Sets whether the character will drop any of their weapons when they die
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_DROPS_WEAPONS_WHEN_DEAD */
    setDropsWeaponsWhenDead(state: boolean): Char;
    /** Controls whether the character can drown in water
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_DROWNS_IN_WATER */
    setDrownsInWater(state: boolean): Char;
    setDruggedUp(state: boolean): Char;
    /** Sets extended var value for this char. Requires initialization (0E14), otherwise returns false
    *
    * https://library.sannybuilder.com/#/sa?q=SET_EXTENDED_CHAR_VAR */
    setExtendedVar(identifier: string, varNumber: int, value: int): boolean;
    /** Sets the range within which the char responds to events
    *
    * https://library.sannybuilder.com/#/sa?q=SET_FOLLOW_NODE_THRESHOLD_DISTANCE */
    setFollowNodeThresholdDistance(range: float): Char;
    /** Makes a character remain in the car upon death
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_FORCE_DIE_IN_CAR */
    setForceDieInCar(state: boolean): Char;
    /** Controls whether the character will try to exit an upside-down car until it is on fire
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_GET_OUT_UPSIDE_DOWN_CAR */
    setGetOutUpsideDownCar(state: boolean): Char;
    /** Locates the entry/exit marker in the specified radius of the specified coordinates and links it to the character, also setting the appropriate interior ID for the character and setting the appropriate sky color if the character is player-controlled
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_HAS_USED_ENTRY_EXIT */
    setHasUsedEntryExit(x: float, y: float, radius: float): Char;
    /** Sets the character's heading (z-angle)
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_HEADING */
    setHeading(heading: float): Char;
    /** Sets the heading limit for a character attached to an object or vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=SET_HEADING_LIMIT_FOR_ATTACHED_CHAR */
    setHeadingLimitForAttached(orientation: int, headingLimit: float): Char;
    /** Sets the character's health
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_HEALTH */
    setHealth(health: int): Char;
    setIgnoreDamageAnims(_: boolean): Char;
    setInformRespectedFriends(radius: float, _p3: int): Char;
    /** Sets whether the character is a psychotic killer or not
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_IS_CHRIS_CRIMINAL */
    setIsChrisCriminal(state: boolean): Char;
    /** Causes the auto aim to be more likely to target the specified actor than actors without this flag
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_IS_TARGET_PRIORITY */
    setIsTargetPriority(state: boolean): Char;
    /** Sets whether the character should keep their tasks after mission cleanup (basically cleanup will be skipped for this character)
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_KEEP_TASK */
    setKeepTask(state: boolean): Char;
    /** Sets whether the character shouldn't chase their victim far (to attempt a melee attack or get in weapon range)
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_KINDA_STAY_IN_SAME_PLACE */
    setKindaStayInSamePlace(state: boolean): Char;
    setLoadCollisionFlag(state: boolean): Char;
    /** Sets the characters max health
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_MAX_HEALTH */
    setMaxHealth(maxHealth: int): Char;
    /** Sets the character's cash sum, setting how much cash they will drop when dead
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_MONEY */
    setMoney(amount: int): Char;
    /** Prevents the character from leaving their group
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_NEVER_LEAVES_GROUP */
    setNeverLeavesGroup(state: boolean): Char;
    /** Sets whether the character won't be targeted by the autoaim system
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_NEVER_TARGETED */
    setNeverTargeted(state: boolean): Char;
    /** Makes a character immune to everything except the player
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_ONLY_DAMAGED_BY_PLAYER */
    setOnlyDamagedByPlayer(state: boolean): Char;
    /** Sets the character's immunities
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_PROOFS */
    setProofs(bulletProof: boolean, fireProof: boolean, explosionProof: boolean, collisionProof: boolean, meleeProof: boolean): Char;
    setRelationship(relationshipType: int, pedType: int): Char;
    /** Sets the characters rotation
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_ROTATION */
    setRotation(x: float, y: float, z: float): Char;
    /** Works similar to 05C1, but returns which phrase was spoken and is not run as a task
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_SAY_CONTEXT */
    setSayContext(speech: int): int;
    setSayContextImportant(_p2: int, _p3: boolean, _p4: boolean, _p5: boolean): int;
    setSayScript(_p2: int, _p3: boolean, _p4: boolean, _p5: boolean): Char;
    /** Sets this char as controlled by player two
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_SECOND_PLAYER */
    setSecondPlayer(enableCamera: boolean, separateCars: boolean): Char;
    /** Sets the characters melee accuracy
    *
    * https://library.sannybuilder.com/#/sa?q=SET_SENSE_RANGE */
    setSenseRange(meleeAccuracy: float): Char;
    /** Sets the attack rate of the actor
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_SHOOT_RATE */
    setShootRate(rate: int): Char;
    /** Sets whether the character signals after killing
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_SIGNAL_AFTER_KILL */
    setSignalAfterKill(state: boolean): Char;
    /** Makes the character stay in the vehicle when it is jacked (characters let themselves get "kidnapped")
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_STAY_IN_CAR_WHEN_JACKED */
    setStayInCarWhenJacked(state: boolean): Char;
    /** Makes the character maintain their position when attacked
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_STAY_IN_SAME_PLACE */
    setStayInSamePlace(state: boolean): Char;
    /** Sets whether the specified character is immune to headshots
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_SUFFERS_CRITICAL_HITS */
    setSuffersCriticalHits(state: boolean): Char;
    /** Sets the speed that the character swims at, changing their swimming animation speed
    *
    * https://library.sannybuilder.com/#/sa?q=SET_SWIM_SPEED */
    setSwimSpeed(speed: float): Char;
    setUsesUpperbodyDamageAnimsOnly(state: boolean): Char;
    /** Sets the characters velocity
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_VELOCITY */
    setVelocity(x: float, y: float, z: float): Char;
    /** Sets whether the character is visible or not
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_VISIBLE */
    setVisible(state: boolean): Char;
    /** Sets whether police should chase the character
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_WANTED_BY_POLICE */
    setWantedByPolice(state: boolean): Char;
    /** Sets the characters weapon accuracy
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_WEAPON_SKILL */
    setWeaponSkill(skillId: int): Char;
    /** Sets the character's ability to talk
    *
    * https://library.sannybuilder.com/#/sa?q=SHUT_CHAR_UP */
    shutUp(state: boolean): Char;
    /** Works similar to 0489, but mutes more things, including ambient speeches (needs confirming)
    *
    * https://library.sannybuilder.com/#/sa?q=SHUT_CHAR_UP_FOR_SCRIPTED_SPEECH */
    shutUpForScriptedSpeech(state: boolean): Char;
    /** Makes a character move their mouth as if they were talking
    *
    * https://library.sannybuilder.com/#/sa?q=START_CHAR_FACIAL_TALK */
    startFacialTalk(duration: int): Char;
    /** Stops the character moving their mouth as if they were talking
    *
    * https://library.sannybuilder.com/#/sa?q=STOP_CHAR_FACIAL_TALK */
    stopFacialTalk(): Char;
    /** Returns the vehicle the character is attached to
    *
    * https://library.sannybuilder.com/#/sa?q=STORE_CAR_CHAR_IS_ATTACHED_TO_NO_SAVE */
    storeCarIsAttachedToNoSave(): Car;
    /** Returns the current vehicle of the character and adds it to the mission cleanup list
    *
    * https://library.sannybuilder.com/#/sa?q=STORE_CAR_CHAR_IS_IN */
    storeCarIsIn(): Car;
    /** Returns the character's vehicle handle without marking it as used by the script, therefore allowing it to be deleted by the game at any time
    *
    * https://library.sannybuilder.com/#/sa?q=STORE_CAR_CHAR_IS_IN_NO_SAVE */
    storeCarIsInNoSave(): Car;
    /** Stores the handles of a ped and vehicle being closest to the char or -1 otherwise
    *
    * https://library.sannybuilder.com/#/sa?q=STORE_CLOSEST_ENTITIES */
    storeClosestEntities(): {
        charHandle: Char;
        carHandle: Car;
    };
    /** Pulls the character out of their car and places at the location
    *
    * https://library.sannybuilder.com/#/sa?q=WARP_CHAR_FROM_CAR_TO_COORD */
    warpFromCarToCoord(x: float, y: float, z: float): Char;
    /** Puts the character in the specified vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=WARP_CHAR_INTO_CAR */
    warpIntoCar(vehicle: Car): Char;
    /** Puts the character into a vehicle's passenger seat
    *
    * https://library.sannybuilder.com/#/sa?q=WARP_CHAR_INTO_CAR_AS_PASSENGER */
    warpIntoCarAsPassenger(handle: Car, seatId: int): Char;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Checkpoint */
declare class Checkpoint {
    constructor(handle: number);
    static Create(type: int, x: float, y: float, z: float, pointX: float, pointY: float, pointZ: float, radius: float): Checkpoint;
    delete(): void;
    setCoords(x: float, y: float, z: float): Checkpoint;
    setHeading(heading: float): Checkpoint;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/CleoBlip */
declare class CleoBlip {
    constructor(handle: number);
    /** Creates a blip that don't saves, supports any texture, alpha and don't hits the blip limit
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_CLEO_BLIP */
    static Add(rwTextureOrRadarSprite: int, x: float, y: float, short: boolean, red: int, green: int, blue: int, alpha: int): CleoBlip;
    remove(): CleoBlip;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Clipboard */
interface Clipboard {
    ReadData(memory: int, size: int): void;
    WriteData(memory: int, size: int): void;
}
declare var Clipboard: Clipboard
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Clock */
interface Clock {
    /** Returns the in-game day of the month and month of the year
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CURRENT_DATE */
    GetCurrentDate(): {
        day: int;
        month: int;
    };
    /** Returns an integer representation of the in-game day of the week
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CURRENT_DAY_OF_WEEK */
    GetCurrentDayOfWeek(): int;
    /** Returns the time passed in milliseconds since the game started
    *
    * https://library.sannybuilder.com/#/sa?q=GET_GAME_TIMER */
    GetGameTimer(): int;
    /** Returns the number of minutes left until the clock matches the time specified
    *
    * https://library.sannybuilder.com/#/sa?q=GET_MINUTES_TO_TIME_OF_DAY */
    GetMinutesToTimeOfDay(hours: int, minutes: int): int;
    /** Returns the number of hours and minutes passed since midnight
    *
    * https://library.sannybuilder.com/#/sa?q=GET_TIME_OF_DAY */
    GetTimeOfDay(): {
        hours: int;
        minutes: int;
    };
    /** Restores the game time to the time when it was saved with 0253
    *
    * https://library.sannybuilder.com/#/sa?q=RESTORE_CLOCK */
    Restore(): void;
    /** Sets the current in-game time
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TIME_OF_DAY */
    SetTimeOfDay(hours: int, minutes: int): void;
    /** Progresses the game to the next day
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TIME_ONE_DAY_FORWARD */
    SetTimeOneDayForward(): void;
    /** Sets the game to run at the specified speed
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TIME_SCALE */
    SetTimeScale(scale: float): void;
    /** Saves the current time in game
    *
    * https://library.sannybuilder.com/#/sa?q=STORE_CLOCK */
    Store(): void;
}
declare var Clock: Clock
/** Class ColPoint
 * 
 * https://library.sannybuilder.com/#/sa/classes/ColPoint */
interface ColPoint {
    GetCoordinates(colPoint: int): {
        x: float;
        y: float;
        z: float;
    };
}
declare var ColPoint: ColPoint
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Conversation */
interface Conversation {
    ClearForChar(handle: Char): void;
    /** Pauses the scripted conversation assigned to the specified character
    *
    * https://library.sannybuilder.com/#/sa?q=ENABLE_CONVERSATION */
    Enable(handle: Char, state: boolean): void;
    /** Begins a script-controlled conversation
    *
    * https://library.sannybuilder.com/#/sa?q=FINISH_SETTING_UP_CONVERSATION */
    FinishSettingUp(): void;
    FinishSettingUpNoSubtitles(): void;
    /** Returns true if the conversation is at the specified node
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CONVERSATION_AT_NODE */
    IsAtNode(handle: Char, speech: string): boolean;
    /** Returns true if there is a conversation going on between the character and the player and both the character and the player are able to communicate with one another
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_IN_POSITION_FOR_CONVERSATION */
    IsPlayerInPosition(handle: Char): boolean;
    /** Sets the script audio ID (see 03CF) for the specified conversation response node
    *
    * https://library.sannybuilder.com/#/sa?q=SET_UP_CONVERSATION_END_NODE_WITH_SCRIPTED_SPEECH */
    SetUpEndNodeWithScriptedSpeech(speech: string, speechSoundId: int): void;
    /** Sets the speech ID for the specified conversation response node
    *
    * https://library.sannybuilder.com/#/sa?q=SET_UP_CONVERSATION_END_NODE_WITH_SPEECH */
    SetUpEndNodeWithSpeech(speech: string, speechSoundId: int): void;
    /** Adds a new line to the scripted conversation
    *
    * https://library.sannybuilder.com/#/sa?q=SET_UP_CONVERSATION_NODE_WITH_SCRIPTED_SPEECH */
    SetUpNodeWithScriptedSpeech(question: string, positiveAnswer: string, negativeAnswer: string, questionSoundId: int, positiveAnswerSoundId: int, negativeAnswerSoundId: int): void;
    /** Specifies the dialogue GXT's and audio ID's
    *
    * https://library.sannybuilder.com/#/sa?q=SET_UP_CONVERSATION_NODE_WITH_SPEECH */
    SetUpNodeWithSpeech(question: string, positiveAnswer: string, negativeAnswer: string, questionSoundId: int, positiveAnswerSoundId: int, negativeAnswerSoundId: int): void;
    /** Starts a conversation between the character and the player and clears the conversation lines
    *
    * https://library.sannybuilder.com/#/sa?q=START_SETTING_UP_CONVERSATION */
    StartSettingUp(handle: Char): void;
}
declare var Conversation: Conversation
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Crane */
interface Crane {
    /** Enables/disables individual crane controls
    *
    * https://library.sannybuilder.com/#/sa?q=ENABLE_CRANE_CONTROLS */
    EnableControls(up: boolean, down: boolean, release: boolean): void;
    /** Puts the player in the San Fierro building site crane
    *
    * https://library.sannybuilder.com/#/sa?q=PLAYER_ENTERED_BUILDINGSITE_CRANE */
    PlayerEnteredBuildingsiteCrane(): void;
    /** Puts the player in the San Fierro dock crane
    *
    * https://library.sannybuilder.com/#/sa?q=PLAYER_ENTERED_DOCK_CRANE */
    PlayerEnteredDockCrane(): void;
    /** Puts the player in the crane at the building site in Las Venturras
    *
    * https://library.sannybuilder.com/#/sa?q=PLAYER_ENTERED_LAS_VEGAS_CRANE */
    PlayerEnteredLasVegasCrane(): void;
    /** Puts the player in the crane at the quarry near Las Venturras
    *
    * https://library.sannybuilder.com/#/sa?q=PLAYER_ENTERED_QUARRY_CRANE */
    PlayerEnteredQuarryCrane(): void;
    /** Removes the player from the current crane
    *
    * https://library.sannybuilder.com/#/sa?q=PLAYER_LEFT_CRANE */
    PlayerLeftCrane(): void;
}
declare var Crane: Crane
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Credits */
interface Credits {
    /** Returns true if the credits have finished
    *
    * https://library.sannybuilder.com/#/sa?q=ARE_CREDITS_FINISHED */
    AreFinished(): boolean;
    /** Makes the credits scroll up the screen
    *
    * https://library.sannybuilder.com/#/sa?q=START_CREDITS */
    Start(): void;
    /** Stops the credits text from showing
    *
    * https://library.sannybuilder.com/#/sa?q=STOP_CREDITS */
    Stop(): void;
}
declare var Credits: Credits
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Cutscene */
interface Cutscene {
    AppendToNext(_p1: string, _p2: string): void;
    /** Ends the current cutscene, freeing game memory
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_CUTSCENE */
    Clear(): void;
    /** Stores the offset of the currently loaded cutscene
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CUTSCENE_OFFSET */
    GetOffset(): {
        xOffset: float;
        yOffset: float;
        zOffset: float;
    };
    /** Returns the time in milliseconds passed since the cutscene has started (02E7)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CUTSCENE_TIME */
    GetTime(): int;
    /** Returns true if the cutscene has finished
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CUTSCENE_FINISHED */
    HasFinished(): boolean;
    /** Returns true if the cutscene has finished loading
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CUTSCENE_LOADED */
    HasLoaded(): boolean;
    /** Returns true if a cutscene is active (02E7)
    *
    * https://library.sannybuilder.com/#/sa?q=IS_ON_CUTSCENE */
    IsOn(): boolean;
    /** Loads the data for the specified cutscene
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_CUTSCENE */
    Load(name: string): void;
    /** Sets the position for a cutscene
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CUTSCENE_OFFSET */
    SetOffset(x: float, y: float, z: float): void;
    /** Starts the loaded cutscene (02E4)
    *
    * https://library.sannybuilder.com/#/sa?q=START_CUTSCENE */
    Start(): void;
    /** Returns true if the cutscene was skipped
    *
    * https://library.sannybuilder.com/#/sa?q=WAS_CUTSCENE_SKIPPED */
    WasSkipped(): boolean;
}
declare var Cutscene: Cutscene
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Debugger */
interface Debugger {
    IsDebugCameraOn(): boolean;
    /** Makes the current script skip the next 128 bytes of the code
    *
    * https://library.sannybuilder.com/#/sa?q=SAVE_STRING_TO_DEBUG_FILE */
    SaveStringToDebugFile(msg: int): void;
}
declare var Debugger: Debugger
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/DecisionMaker */
declare class DecisionMaker {
    constructor(handle: number);
    /** Returns true if the handle is a valid decision maker handle
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_DECISION_MAKER_EXIST */
    static DoesExist(handle: int): boolean;
    /** Removes the decision maker
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_DECISION_MAKER */
    remove(): void;
}
/** Loading DLL files and finding exported functions
 * 
 * https://library.sannybuilder.com/#/sa/classes/DynamicLibrary */
declare class DynamicLibrary {
    constructor(handle: number);
    /** Loads the specified module (usually a dynamic-link library (DLL)) into the address space of the game
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_DYNAMIC_LIBRARY */
    static Load(libraryFileName: string): DynamicLibrary | undefined;
    /** Frees the loaded dynamic-link library (DLL) module and unloads it from the address space of the game
    *
    * https://library.sannybuilder.com/#/sa?q=FREE_DYNAMIC_LIBRARY */
    free(): void;
    /** Retrieves the address of an exported function or variable from the specified dynamic-link library (DLL)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_DYNAMIC_LIBRARY_PROCEDURE */
    getProcedure(procName: string): int | undefined;
}
/** Class Entity
 * 
 * https://library.sannybuilder.com/#/sa/classes/Entity */
interface Entity {
    /** Gets the type of the entity
    *
    * https://library.sannybuilder.com/#/sa?q=GET_ENTITY_TYPE */
    GetType(entity: int): int;
}
declare var Entity: Entity
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/File */
declare class File {
    constructor(handle: number);
    /** Opens the file in the specified mode, sets the condition result to True if the open operation has been successful, or to False otherwise, and writes the file handle to the variable
    *
    * https://library.sannybuilder.com/#/sa?q=OPEN_FILE */
    static Open(filePathName: string, mode: int): File | undefined;
    /** Closes the file and frees the memory
    *
    * https://library.sannybuilder.com/#/sa?q=CLOSE_FILE */
    close(): void;
    /** Gets the file size in bytes
    *
    * https://library.sannybuilder.com/#/sa?q=GET_FILE_SIZE */
    getSize(): int;
    /** Returns true if the end of the specified file has been reached
    *
    * https://library.sannybuilder.com/#/sa?q=IS_END_OF_FILE_REACHED */
    isEndReached(): boolean;
    /** Reads the specified number of bytes from the opened file and writes them to the memory region starting from the address of the destination variable
    *
    * https://library.sannybuilder.com/#/sa?q=READ_FROM_FILE */
    read(size: int): int;
    /** Reads data from the file into the buffer until either the end of buffer is reached, the newline character is read, or the end-of-file is reached, whichever comes first
    *
    * https://library.sannybuilder.com/#/sa?q=READ_STRING_FROM_FILE */
    readString(buffer: string, size: int): boolean;
    scan(format: string, ...args: number[]): string | undefined;
    /** Sets the position of the file to the given offset from the origin
    *
    * https://library.sannybuilder.com/#/sa?q=FILE_SEEK */
    seek(offset: int, origin: int): boolean;
    /** Copies the specified number of bytes of the memory region starting from the address of the source variable to the file
    *
    * https://library.sannybuilder.com/#/sa?q=WRITE_TO_FILE */
    write(size: int, source: int): File;
    /** Writes a formatted string to the file
    *
    * https://library.sannybuilder.com/#/sa?q=WRITE_FORMATTED_STRING_TO_FILE */
    writeFormattedString(format: string, ...args: number[]): File;
    /** Copies data from the source string to the file up to but not including the null character
    *
    * https://library.sannybuilder.com/#/sa?q=WRITE_STRING_TO_FILE */
    writeString(source: string): boolean;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/FindFile */
declare class FindFile {
    constructor(handle: number);
    /** Searches a directory for a file or subdirectory with a name that matches a specific name (or partial name if wildcards are used)
    *
    * https://library.sannybuilder.com/#/sa?q=FIND_FIRST_FILE */
    static First(searchMask: string, fileName: string): FindFile | undefined;
    /** Closes a file search handle opened by 0AE6
    *
    * https://library.sannybuilder.com/#/sa?q=FIND_CLOSE */
    close(): FindFile;
    /** Continues a file search from a previous call to 0AE6
    *
    * https://library.sannybuilder.com/#/sa?q=FIND_NEXT_FILE */
    next(): string | undefined;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Fs */
interface Fs {
    /** Copies an existing directory to a new directory and returns true if the operation is successful
    *
    * https://library.sannybuilder.com/#/sa?q=COPY_DIRECTORY */
    CopyDirectory(dirPath: string, newDirPath: string): boolean;
    /** Copies an existing file to a new file and returns true if the operation is successful
    *
    * https://library.sannybuilder.com/#/sa?q=COPY_FILE */
    CopyFile(fileName: string, newFileName: string): boolean;
    /** Creates a directory at the given path
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_DIRECTORY */
    CreateDirectory(dirName: string): boolean;
    /** Deletes a directory at the given path and returns true if the operation is successful
    *
    * https://library.sannybuilder.com/#/sa?q=DELETE_DIRECTORY */
    DeleteDirectory(dirPath: string, recursive: boolean): boolean;
    /** Deletes a file at the given path and returns true if the operation is successful
    *
    * https://library.sannybuilder.com/#/sa?q=DELETE_FILE */
    DeleteFile(fileName: string): boolean;
    /** Returns true if a directory at the given path exists
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_DIRECTORY_EXIST */
    DoesDirectoryExist(dirPath: string): boolean;
    /** Returns true if a file at the given path exists
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_FILE_EXIST */
    DoesFileExist(path: string): boolean;
    /** Moves an existing directory and returns true if the operation is successful
    *
    * https://library.sannybuilder.com/#/sa?q=MOVE_DIRECTORY */
    MoveDirectory(dirPath: string, newDirPath: string): boolean;
    /** Moves an existing file and returns true if the operation is successful
    *
    * https://library.sannybuilder.com/#/sa?q=MOVE_FILE */
    MoveFile(fileName: string, newFileName: string): boolean;
    /** Sets the current working directory (cwd) to a predefined location with a value of 0 or 1, or to an arbitrary path with a string value
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CURRENT_DIRECTORY */
    SetCurrentDirectory(path: int): void;
}
declare var Fs: Fs
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Fx */
interface Fx {
    /** Creates a gun flash particle effect
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_BIG_GUN_FLASH */
    AddBigGunFlash(fromX: float, fromY: float, fromZ: float, toX: float, toY: float, toZ: float): void;
    AddBlood(x: float, y: float, z: float, offsetX: float, offsetY: float, offsetZ: float, density: int, handle: Char): void;
    /** Creates an explosion at the point
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_EXPLOSION */
    AddExplosion(x: float, y: float, z: float, type: int): void;
    /** Creates an explosion with no sound
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_EXPLOSION_NO_SOUND */
    AddExplosionNoSound(x: float, y: float, z: float, type: int): void;
    /** Creates an explosion at the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_EXPLOSION_VARIABLE_SHAKE */
    AddExplosionVariableShake(x: float, y: float, z: float, type: int, shake: float): void;
    AddSmokeParticle(x: float, y: float, z: float, velocityX: float, velocityY: float, velocityZ: float, red: int, green: int, blue: int, alpha: int, size: float, lastFactor: float): void;
    AddSparks(x: float, y: float, z: float, velocityX: float, velocityY: float, velocityZ: float, density: int): void;
    /** Displays a corona at the specified location
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_CORONA */
    DrawCorona(x: float, y: float, z: float, size: float, coronaType: int, flareType: int, r: int, g: int, b: int): void;
    /** Draws colored light in radius of the specified point
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_LIGHT_WITH_RANGE */
    DrawLightWithRange(x: float, y: float, z: float, red: int, green: int, blue: int, radius: float): void;
    /** Draws a shadow in the current frame
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_SHADOW */
    DrawShadow(textureType: int, x: float, y: float, z: float, angle: float, length: float, intensity: int, r: int, g: int, b: int): void;
    /** Displays a corona with the lowered draw distance at the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_WEAPONSHOP_CORONA */
    DrawWeaponshopCorona(x: float, y: float, z: float, size: float, coronaType: int, flareType: int, r: int, g: int, b: int): void;
}
declare var Fx: Fx
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Game */
interface Game {
    /** Enables ped spawning in interiors
    *
    * https://library.sannybuilder.com/#/sa?q=ACTIVATE_INTERIOR_PEDS */
    ActivateInteriorPeds(state: boolean): void;
    /** Sets whether sleeping with a prostitute earns you money instead of taking it away from you
    *
    * https://library.sannybuilder.com/#/sa?q=ACTIVATE_PIMP_CHEAT */
    ActivatePimpCheat(state: boolean): void;
    /** Displays a screen prompting the player to save
    *
    * https://library.sannybuilder.com/#/sa?q=ACTIVATE_SAVE_MENU */
    ActivateSaveMenu(): void;
    /** Enables the player to access the pause menu while widescreen is enabled
    *
    * https://library.sannybuilder.com/#/sa?q=ALLOW_PAUSE_IN_WIDESCREEN */
    AllowPauseInWidescreen(state: boolean): void;
    /** Returns true if the player has used any of the cheats
    *
    * https://library.sannybuilder.com/#/sa?q=ARE_ANY_CAR_CHEATS_ACTIVATED */
    AreAnyCarCheatsActivated(): boolean;
    /** Returns true if the game uses metric measurements (meters instead of feet)
    *
    * https://library.sannybuilder.com/#/sa?q=ARE_MEASUREMENTS_IN_METRES */
    AreMeasurementsInMeters(): boolean;
    /** Returns true if subtitles are switched on in the settings menu
    *
    * https://library.sannybuilder.com/#/sa?q=ARE_SUBTITLES_SWITCHED_ON */
    AreSubtitlesSwitchedOn(): boolean;
    /** Sets an animation pack to be loaded along with the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_ANIMS_TO_MODEL */
    AttachAnimsToModel(pedModelId: int, animationFile: string): void;
    /** Allows the player to provoke turf wars while a mission is active
    *
    * https://library.sannybuilder.com/#/sa?q=CAN_TRIGGER_GANG_WAR_WHEN_ON_A_MISSION */
    CanTriggerGangWarWhenOnAMission(state: boolean): void;
    ClearRelationship(relationshipType: int, ofPedType: int, toPedType: int): void;
    /** Enables turf wars to be provoked in all zones
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_SPECIFIC_ZONES_TO_TRIGGER_GANG_WAR */
    ClearSpecificZonesToTriggerGangWar(): void;
    /** Suspends the current players wanted level
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_WANTED_LEVEL_IN_GARAGE */
    ClearWantedLevelInGarage(): void;
    DisableSecondPlayer(restoreCamera: boolean): void;
    /** Enables the entry/exit marker in the specified radius of the coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=ENABLE_ENTRY_EXIT_PLAYER_GROUP_WARPING */
    EnableEntryExitPlayerGroupWarping(x: float, y: float, radius: float, state: boolean): void;
    FindMaxNumberOfGroupMembers(): int;
    /** Enables fixes for making two players use separated cars
    *
    * https://library.sannybuilder.com/#/sa?q=FIX_TWO_PLAYERS_SEPARATED_CARS */
    FixTwoPlayersSeparatedCars(): void;
    /** Disables all vehicle lights from being rendered if enabled
    *
    * https://library.sannybuilder.com/#/sa?q=FORCE_ALL_VEHICLE_LIGHTS_OFF */
    ForceAllVehicleLightsOff(state: boolean): void;
    ForceDeathRestart(): void;
    /** Returns the current language set in the menu language settings
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CURRENT_LANGUAGE */
    GetCurrentLanguage(): int;
    /** Gets the game window width and height resolution
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CURRENT_RESOLUTION */
    GetCurrentResolution(): {
        width: int;
        height: int;
    };
    /** Gets loaded save slot number. -1 if new game
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CURRENT_SAVE_SLOT */
    GetCurrentSaveSlot(): int;
    /** Returns game FPS
    *
    * https://library.sannybuilder.com/#/sa?q=GET_FRAMERATE */
    GetFramerate(): int;
    /** Gets the maximum wanted level the player can receive
    *
    * https://library.sannybuilder.com/#/sa?q=GET_MAX_WANTED_LEVEL */
    GetMaxWantedLevel(): int;
    /** Cancels any prostitute invitations received in-game and makes any current prostitutes quit
    *
    * https://library.sannybuilder.com/#/sa?q=GET_RID_OF_PLAYER_PROSTITUTE */
    GetRidOfPlayerProstitute(): void;
    /** Returns true if the player just exited the menu on the last frame
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_GAME_JUST_RETURNED_FROM_FRONTEND */
    HasGameJustReturnedFromFrontend(): boolean;
    /** Returns true if the current language set is different from the previous language set
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_LANGUAGE_CHANGED */
    HasLanguageChanged(): boolean;
    /** Returns true if the player has saved their game
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_SAVE_GAME_FINISHED */
    HasSaveGameFinished(): boolean;
    HideAllFrontendBlips(state: boolean): void;
    /** Returns true if the game is in 2-player mode
    *
    * https://library.sannybuilder.com/#/sa?q=IS_2PLAYER_GAME_GOING_ON */
    Is2PlayerGameGoingOn(): boolean;
    /** Returns true if the current game is an Australian release
    *
    * https://library.sannybuilder.com/#/sa?q=IS_AUSTRALIAN_GAME */
    IsAustralian(): boolean;
    /** Is first gameplay start (game was not reloaded)
    *
    * https://library.sannybuilder.com/#/sa?q=IS_GAME_FIRST_START */
    IsFirstStart(): boolean;
    /** Returns true if the player provoked a gang war or is defending territory
    *
    * https://library.sannybuilder.com/#/sa?q=IS_GANG_WAR_FIGHTING_GOING_ON */
    IsGangWarFightingGoingOn(): boolean;
    /** Returns true if there is a gang war happening
    *
    * https://library.sannybuilder.com/#/sa?q=IS_GANG_WAR_GOING_ON */
    IsGangWarGoingOn(): boolean;
    /** Returns true if the game language is set to German
    *
    * https://library.sannybuilder.com/#/sa?q=IS_GERMAN_GAME */
    IsGerman(): boolean;
    /** Returns true if 09BD has been used in any script to disable help messages
    *
    * https://library.sannybuilder.com/#/sa?q=IS_MINIGAME_IN_PROGRESS */
    IsMinigameInProgress(): boolean;
    /** Returns true if night vision is active
    *
    * https://library.sannybuilder.com/#/sa?q=IS_NIGHT_VISION_ACTIVE */
    IsNightVisionActive(): boolean;
    /** Returns true if players controls are set to joystick and not mouse+keyboard
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PC_USING_JOYPAD */
    IsPcUsingJoypad(): boolean;
    /** Returns true on PC versions of the game
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PC_VERSION */
    IsPcVersion(): boolean;
    /** Returns true in interactive interiors
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PROCEDURAL_INTERIOR_ACTIVE */
    IsProceduralInteriorActive(interiorId: int): boolean;
    /** Returns true if the specified relationship between ped types is set
    *
    * https://library.sannybuilder.com/#/sa?q=IS_RELATIONSHIP_SET */
    IsRelationshipSet(ofPedType: int, toPedType: int, relationshipType: int): boolean;
    /** Returns true if the current game runs on San Andreas Multiplayer (SA-MP)
    *
    * https://library.sannybuilder.com/#/sa?q=IS_ON_SAMP */
    IsSamp(): boolean;
    /** Returns true if the game version is vanilla 1.0
    *
    * https://library.sannybuilder.com/#/sa?q=IS_GAME_VERSION_ORIGINAL */
    IsVersionOriginal(): boolean;
    /** Returns true if widescreen is switched on in the display settings
    *
    * https://library.sannybuilder.com/#/sa?q=IS_WIDESCREEN_ON_IN_OPTIONS */
    IsWidescreenOnInOptions(): boolean;
    /** Sets how far apart players can get on 2-player mode
    *
    * https://library.sannybuilder.com/#/sa?q=LIMIT_TWO_PLAYER_DISTANCE */
    LimitTwoPlayerDistance(distance: float): void;
    /** Ensures there is x amount of space for new members to be added to the players gang
    *
    * https://library.sannybuilder.com/#/sa?q=MAKE_ROOM_IN_PLAYER_GANG_FOR_MISSION_PEDS */
    MakeRoomInPlayerGangForMissionPeds(_p1: int): void;
    ManageAllPopulation(): void;
    /** Emulates the shared effects of being wasted or busted
    *
    * https://library.sannybuilder.com/#/sa?q=RESET_STUFF_UPON_RESURRECTION */
    ResetStuffUponResurrection(): void;
    /** Enables missiles to be fired from the aircraft carrier by Easter Bay Naval Station, San Fierro
    *
    * https://library.sannybuilder.com/#/sa?q=SET_AIRCRAFT_CARRIER_SAM_SITE */
    SetAircraftCarrierSamSite(state: boolean): void;
    /** Sets whether all cars receive damage
    *
    * https://library.sannybuilder.com/#/sa?q=SET_ALL_CARS_CAN_BE_DAMAGED */
    SetAllCarsCanBeDamaged(state: boolean): void;
    /** Toggles whether all taxis have nitrous
    *
    * https://library.sannybuilder.com/#/sa?q=SET_ALL_TAXIS_HAVE_NITRO */
    SetAllTaxisHaveNitro(state: boolean): void;
    /** Enables or disables the SAM site at the Area 51
    *
    * https://library.sannybuilder.com/#/sa?q=SET_AREA51_SAM_SITE */
    SetArea51SamSite(state: boolean): void;
    /** Sets the total number of hidden packages to collect
    *
    * https://library.sannybuilder.com/#/sa?q=SET_COLLECTABLE1_TOTAL */
    SetCollectableTotal(amount: int): void;
    /** Makes pedestrians pay no attention to the player
    *
    * https://library.sannybuilder.com/#/sa?q=SET_EVERYONE_IGNORE_PLAYER */
    SetEveryoneIgnorePlayer(handle: Player, state: boolean): void;
    /** Forces all cars spawned to be of the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=SET_FORCE_RANDOM_CAR_MODEL */
    SetForceRandomCarModel(modelId: int): void;
    /** Defines whether the player can respray their car for free
    *
    * https://library.sannybuilder.com/#/sa?q=SET_FREE_RESPRAYS */
    SetFreeResprays(state: boolean): void;
    /** Sets whether gang wars can be started by the player or enemy gangs
    *
    * https://library.sannybuilder.com/#/sa?q=SET_GANG_WARS_ACTIVE */
    SetGangWarsActive(state: boolean): void;
    /** Disables highlighting of gang territory on the map and radar
    *
    * https://library.sannybuilder.com/#/sa?q=SET_GANG_WARS_TRAINING_MISSION */
    SetGangWarsTrainingMission(state: boolean): void;
    SetGunshotSenseRangeForRiot2(range: float): void;
    /** Enables thermal vision effects
    *
    * https://library.sannybuilder.com/#/sa?q=SET_INFRARED_VISION */
    SetInfraredVision(state: boolean): void;
    /** Greys out the radar
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_IS_IN_STADIUM */
    SetIsInStadium(state: boolean): void;
    /** Sets the limit on how many fires can be created from other fires when "propagation" was enabled on 02CF
    *
    * https://library.sannybuilder.com/#/sa?q=SET_MAX_FIRE_GENERATIONS */
    SetMaxFireGenerations(limit: int): void;
    /** Sets the maximum wanted level the player can receive
    *
    * https://library.sannybuilder.com/#/sa?q=SET_MAX_WANTED_LEVEL */
    SetMaxWantedLevel(wantedLevel: int): void;
    /** Disables displaying help messages in other scripts
    *
    * https://library.sannybuilder.com/#/sa?q=SET_MINIGAME_IN_PROGRESS */
    SetMinigameInProgress(state: boolean): void;
    /** Sets the specified enex flag
    *
    * https://library.sannybuilder.com/#/sa?q=SET_NAMED_ENTRY_EXIT_FLAG */
    SetNamedEntryExitFlag(name: string, entryexitsFlag: int, state: boolean): void;
    /** Enables night vision effects
    *
    * https://library.sannybuilder.com/#/sa?q=SET_NIGHT_VISION */
    SetNightVision(state: boolean): void;
    /** Disables respray garages from opening for the player
    *
    * https://library.sannybuilder.com/#/sa?q=SET_NO_RESPRAYS */
    SetNoResprays(state: boolean): void;
    /** Sets the attitude of peds with one pedtype towards peds of another pedtype
    *
    * https://library.sannybuilder.com/#/sa?q=SET_RELATIONSHIP */
    SetRelationship(relationshipType: int, ofPedType: int, toPedType: int): void;
    /** Sets an unused flag at address 0x96A8A8
    *
    * https://library.sannybuilder.com/#/sa?q=SET_SCRIPT_COOP_GAME */
    SetScriptCoopGame(state: boolean): void;
    /** Sets the maximum number of members that the player can recruit
    *
    * https://library.sannybuilder.com/#/sa?q=SET_SCRIPT_LIMIT_TO_GANG_SIZE */
    SetScriptLimitToGangSize(maxSize: int): void;
    /** Sets sensitivity to crime, changing how many crimes a player can commit before police begin to pursue
    *
    * https://library.sannybuilder.com/#/sa?q=SET_WANTED_MULTIPLIER */
    SetWantedMultiplier(multiplier: float): void;
    /** Enables entity blips showing on the radar and map while in interiors
    *
    * https://library.sannybuilder.com/#/sa?q=SHOW_BLIPS_ON_ALL_LEVELS */
    ShowBlipsOnAllLevels(state: boolean): void;
    /** Prevents all peds from attempting to start conversations with the player
    *
    * https://library.sannybuilder.com/#/sa?q=SHUT_ALL_CHARS_UP */
    ShutAllCharsUp(state: boolean): void;
    /** Enables or disables planes
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_AMBIENT_PLANES */
    SwitchAmbientPlanes(state: boolean): void;
    /** Sets whether or not the player loses their weapons and inventory when busted
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_ARREST_PENALTIES */
    SwitchArrestPenalties(state: boolean): void;
    /** Disables the game from creating police bikes and their riders on the roads
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_COPS_ON_BIKES */
    SwitchCopsOnBikes(state: boolean): void;
    /** Sets whether or not the player loses their weapons and inventory when taken to hospital
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_DEATH_PENALTIES */
    SwitchDeathPenalties(state: boolean): void;
    /** Sets whether emergency traffic spawns
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_EMERGENCY_SERVICES */
    SwitchEmergencyServices(state: boolean): void;
    /** Enables or disables all triggers of the specified type (0928 or 0929)
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_OBJECT_BRAINS */
    SwitchObjectBrains(type: int, state: boolean): void;
    /** Sets whether ghetto birds spawn
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_POLICE_HELIS */
    SwitchPoliceHelis(state: boolean): void;
    /** Takes a screenshot of the screen without any HUD elements and stores the file in the "GTA San Andreas User FilesGallery" folder
    *
    * https://library.sannybuilder.com/#/sa?q=TAKE_PHOTO */
    TakePhoto(_p1: boolean): void;
}
declare var Game: Game
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Gang */
interface Gang {
    /** Sets the weapons that the specified gang can use
    *
    * https://library.sannybuilder.com/#/sa?q=SET_GANG_WEAPONS */
    SetWeapons(gangId: int, weaponType1: int, weaponType2: int, weaponType3: int): void;
}
declare var Gang: Gang
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Garage */
interface Garage {
    /** Activates the garage
    *
    * https://library.sannybuilder.com/#/sa?q=ACTIVATE_GARAGE */
    Activate(garageId: string): void;
    /** Sets the garage's type
    *
    * https://library.sannybuilder.com/#/sa?q=CHANGE_GARAGE_TYPE */
    ChangeType(garageId: string, type: int): void;
    /** Closes the garage
    *
    * https://library.sannybuilder.com/#/sa?q=CLOSE_GARAGE */
    Close(garageId: string): void;
    /** Deactivates the garage
    *
    * https://library.sannybuilder.com/#/sa?q=DEACTIVATE_GARAGE */
    Deactivate(garageId: string): void;
    /** Returns true if the garage's door is closed
    *
    * https://library.sannybuilder.com/#/sa?q=IS_GARAGE_CLOSED */
    IsClosed(garageId: string): boolean;
    /** Returns true if the garage's door is open
    *
    * https://library.sannybuilder.com/#/sa?q=IS_GARAGE_OPEN */
    IsOpen(garageId: string): boolean;
    /** Opens the garage
    *
    * https://library.sannybuilder.com/#/sa?q=OPEN_GARAGE */
    Open(garageId: string): void;
    SetResprayFree(garageId: string, state: boolean): void;
    /** Sets the specified garage to only accept the specified vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TARGET_CAR_FOR_MISSION_GARAGE */
    SetTargetCarForMission(garageName: int, vehicle: Car): void;
}
declare var Garage: Garage
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Group */
declare class Group {
    constructor(handle: number);
    /** Creates a new group, which multiple characters can be assigned to, allowing control over all of them as a group
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_GROUP */
    static Create(defaultTaskAllocator: int): Group;
    /** Returns true if the handle is a valid group handle
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_GROUP_EXIST */
    static DoesExist(handle: int): boolean;
    /** Returns the nth group member
    *
    * https://library.sannybuilder.com/#/sa?q=GET_GROUP_MEMBER */
    getMember(slotId: int): Char;
    getSize(): {
        numLeaders: int;
        numMembers: int;
    };
    /** Releases the group
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_GROUP */
    remove(): void;
    /** Sets the decision maker for a group of characters
    *
    * https://library.sannybuilder.com/#/sa?q=SET_GROUP_DECISION_MAKER */
    setDecisionMaker(maskOrHandle: DecisionMakerGroup): Group;
    setDefaultTaskAllocator(defaultTaskAllocator: int): Group;
    /** Sets whether the group members enter a car when the leader does
    *
    * https://library.sannybuilder.com/#/sa?q=SET_GROUP_FOLLOW_STATUS */
    setFollowStatus(state: boolean): Group;
    /** Puts the specified character into the group as the leader
    *
    * https://library.sannybuilder.com/#/sa?q=SET_GROUP_LEADER */
    setLeader(handle: Char): Group;
    /** Puts the specified character into the group as a member
    *
    * https://library.sannybuilder.com/#/sa?q=SET_GROUP_MEMBER */
    setMember(handle: Char): Group;
    /** Sets how far members of the group can be from the leader before they are removed from the group
    *
    * https://library.sannybuilder.com/#/sa?q=SET_GROUP_SEPARATION_RANGE */
    setSeparationRange(range: float): Group;
    /** Sets the default task sequence for members of the group
    *
    * https://library.sannybuilder.com/#/sa?q=SET_GROUP_SEQUENCE */
    setSequence(sequence: Sequence): Group;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Hud */
interface Hud {
    /** Removes the onscreen counter (0150 or 03C4)
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_ONSCREEN_COUNTER */
    ClearCounter(counter: int): void;
    /** Removes the onscreen timer
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_ONSCREEN_TIMER */
    ClearTimer(timer: int): void;
    /** Sets whether the HUD displays
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_HUD */
    Display(state: boolean): void;
    /** Sets whether the name of the current vehicle should be displayed
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_CAR_NAMES */
    DisplayCarNames(state: boolean): void;
    /** Displays an onscreen counter with the text, either shown in numbers or as a bar
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_ONSCREEN_COUNTER_WITH_STRING */
    DisplayCounterWithString(counter: int, display: int, text: string): void;
    /** Displays an onscreen counter with the text in the specified slot, either shown in numbers or as a bar
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_NTH_ONSCREEN_COUNTER_WITH_STRING */
    DisplayNthCounterWithString(counter: int, display: int, slot: int, text: string): void;
    /** Displays or hides the radar
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_RADAR */
    DisplayRadar(state: boolean): void;
    /** Creates a countdown or countup onscreen timer
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_ONSCREEN_TIMER */
    DisplayTimer(timer: int, direction: int): void;
    /** Creates a countdown or countup onscreen timer with the text
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_ONSCREEN_TIMER_WITH_STRING */
    DisplayTimerWithString(timer: int, direction: int, text: string): void;
    /** Sets whether the area text for the current area should show
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_ZONE_NAMES */
    DisplayZoneNames(state: boolean): void;
    /** Sets whether the HUD should always display weapon aiming crosshairs, used in the mission 'Catalyst' where the player must throw crates of ammo to Ryder
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_CROSSHAIR */
    DrawCrosshair(state: boolean): void;
    /** Draws a box at the specified screen X and Y position, with the specified size and RGBA colors
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_RECT */
    DrawRect(x: float, y: float, width: float, height: float, r: int, g: int, b: int, a: int): void;
    /** Draws a loaded texture (038F) at the specified on-screen X and Y coordinates, with the specified size and RGBA color
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_SPRITE */
    DrawSprite(memorySlot: int, offsetLeft: float, offsetTop: float, width: float, height: float, r: int, g: int, b: int, a: int): void;
    /** This is an extended version of 038D with scale and angle parameters
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_SPRITE_WITH_ROTATION */
    DrawSpriteWithRotation(memorySlot: int, offsetLeft: float, offsetTop: float, height: float, width: float, angle: float, red: int, green: int, blue: int, alpha: int): void;
    /** Draws a black box with styled text from corner A to corner B
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_WINDOW */
    DrawWindow(leftTopX: float, leftTopY: float, rightBottomX: float, rightBottomY: float, header: string, zIndex: int): void;
    /** Makes a specific part of the HUD disappear and reappear several times
    *
    * https://library.sannybuilder.com/#/sa?q=FLASH_HUD_OBJECT */
    FlashObject(object: int): void;
    /** Makes the on-screen timer stop updating
    *
    * https://library.sannybuilder.com/#/sa?q=FREEZE_ONSCREEN_TIMER */
    FreezeTimer(state: boolean): void;
    /** Returns the RGBA of the specified HUD color
    *
    * https://library.sannybuilder.com/#/sa?q=GET_HUD_COLOUR */
    GetColor(hudObject: int): {
        red: int;
        green: int;
        blue: int;
        alpha: int;
    };
    /** Gets x and y values based on window aspect ratio, useful for text and hud scaling
    *
    * https://library.sannybuilder.com/#/sa?q=GET_FIXED_XY_ASPECT_RATIO */
    GetFixedXyAspectRatio(x: float, y: float): {
        x: float;
        y: float;
    };
    IsRadarVisible(): boolean;
    IsVisible(): boolean;
    SetOnscreenCounterFlashWhenFirstDisplayed(counter: int, state: boolean): void;
    SetRadarZoom(zoom: int): void;
    /** Causes the next texture to be drawn (038D) before the fade is drawn
    *
    * https://library.sannybuilder.com/#/sa?q=SET_SPRITES_DRAW_BEFORE_FADE */
    SetSpritesDrawBeforeFade(state: boolean): void;
    /** Starts a sound when the countdown timer reaches the specified number of seconds
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TIMER_BEEP_COUNTDOWN_TIME */
    SetTimerBeepCountdownTime(timer: int, timeInSec: int): void;
    /** Enables widescreen
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_WIDESCREEN */
    SwitchWidescreen(state: boolean): void;
}
declare var Hud: Hud
/** ImGui integration
 * 
 * https://library.sannybuilder.com/#/sa/classes/ImGui */
interface ImGui {
    /** Creates the window
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_BEGIN */
    Begin(windowName: string, state: boolean, noTitleBar: boolean, noResize: boolean, noMove: boolean, autoResize: boolean): boolean;
    /** Creates a child window widget inside the main window
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_BEGIN_CHILD */
    BeginChild(uniqueId: string): void;
    /** Creates a unique frame with its own space in memory. End it with 0C32. MUST BE UNIQUE!
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_BEGIN_FRAME */
    BeginFrame(uniqueId: string): void;
    /** Creates the main menu bar
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_BEGIN_MAINMENUBAR */
    BeginMainMenuBar(uniqueId: string): boolean;
    /** Creates a bullet point
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_BULLET */
    Bullet(): void;
    /** Creates the button
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_BUTTON */
    Button(buttonName: string, width: float, height: float): boolean;
    /** Creates the arrow button in the specified direction
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_ARROW_BUTTON */
    ButtonArrow(name: string, imGuiDir: int): boolean;
    /** Creates the button with custom colors
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_COLOR_BUTTON */
    ButtonColored(buttonName: string, red: float, green: float, blue: float, alpha: float, width: float, height: float): boolean;
    /** Creates the invisible button
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_INVISIBLE_BUTTON */
    ButtonInvisible(buttonName: string, width: float, height: float): boolean;
    /** Returns the width and height of the given text
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_CALC_TEXT_SIZE */
    CalcTextSize(text: string): {
        width: float;
        height: float;
    };
    /** Creates the checkbox
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_CHECKBOX */
    Checkbox(label: string, isChecked: boolean): boolean;
    /** Adds the collapsing header
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_COLLAPSING_HEADER */
    CollapsingHeader(label: string): boolean;
    /** Creates the color picker and sets the default color (0.0f-1.0f)
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_COLOR_PICKER */
    ColorPicker(label: string): {
        red: float;
        green: float;
        blue: float;
        alpha: float;
    };
    /** Divides the window width into N columns. Close this with Columns(1)
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_COLUMNS */
    Columns(count: int): void;
    /** Creates a combo box widget. Pass options separated by commas "item1,item2,item3"
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_COMBO */
    ComboBox(name: string, options: string, selection: int): int;
    /** Creates the dummy widget. Used for spacing
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_DUMMY */
    Dummy(width: float, height: float): void;
    /** Ends the window
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_END */
    End(): void;
    /** Ends the child window widget created with 0C25
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_END_CHILD */
    EndChild(): void;
    /** Ends unique ImGui frame
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_END_FRAME */
    EndFrame(): void;
    /** Ends the main menu bar
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_END_MAINMENUBAR */
    EndMainMenuBar(): void;
    /** Returns the width & height of the display
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_GET_DISPLAY_SIZE */
    GetDisplaySize(): {
        width: float;
        height: float;
    };
    /** Returns the ImGui frame height
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_GET_FRAME_HEIGHT */
    GetFrameHeight(): float;
    /** Returns the ImGuiRedux version
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_GET_PLUGIN_VERSION */
    GetPluginVersion(): float;
    /** Returns the width and height scaling factor based on the window size
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_GET_SCALING_SIZE */
    GetScalingSize(uniqueId: string, count: int, spacing: boolean): {
        x: float;
        y: float;
    };
    /** Returns the ImGui version
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_GET_VERSION */
    GetVersion(): string;
    /** Returns the content region width of the window
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_GET_WINDOW_CONTENT_REGION_WIDTH */
    GetWindowContentRegionWidth(uniqueId: string): float;
    /** Returns the x,y coordinates of the window on the screen
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_GET_WINDOW_POS */
    GetWindowPos(uniqueId: string): {
        x: float;
        y: float;
    };
    /** Returns the width and height of the window
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_GET_WINDOW_SIZE */
    GetWindowSize(uniqueId: string): {
        width: float;
        height: float;
    };
    /** Creates the float input
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_INPUT_FLOAT */
    InputFloat(label: string, initValue: float, min: float, max: float): float;
    /** Creates the int input
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_INPUT_INT */
    InputInt(label: string, initValue: int, min: int, max: int): int;
    /** Creates the text input
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_INPUT_TEXT */
    InputText(label: string): string;
    /** Returns true if the previous widget is in active state
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_IS_ITEM_ACTIVE */
    IsItemActive(uniqueId: string): boolean;
    /** Returns true if the previous widget is clicked
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_IS_ITEM_CLICKED */
    IsItemClicked(uniqueId: string): boolean;
    /** Returns true if the previous widget is focused
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_IS_ITEM_FOCUSED */
    IsItemFocused(uniqueId: string): boolean;
    /** Returns true if the previous widget is hovered with mouse
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_IS_ITEM_HOVERED */
    IsItemHovered(uniqueId: string): boolean;
    /** Adds the menu item
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_MENU_ITEM */
    MenuItem(text: string, selected: boolean, enabled: boolean): boolean;
    /** Creates a new line for the next widget
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_NEWLINE */
    NewLine(): void;
    /** Puts the next widgets on the next column. Used alongside 0C16
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_NEXT_COLUMN */
    NextColumn(): void;
    /** Removes the pushed item width (0C27) from the stack
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_POP_ITEM_WIDTH */
    PopItemWidth(): void;
    /** Sets the item width for the next widgets
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_PUSH_ITEM_WIDTH */
    PushItemWidth(width: float): void;
    /** Creates the radio button
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_RADIO_BUTTON */
    RadioButton(label: string, selectedBtn: int, btnNo: int): int;
    /** Appends the next widget to the same line as the previous widget
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SAMELINE */
    SameLine(): void;
    /** Adds the selectable widget
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SELECTABLE */
    Selectable(text: string): boolean;
    /** Adds a horizontal separator line
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SEPARATOR */
    Separator(): void;
    /** Toggles the cursor
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SET_CURSOR_VISIBLE */
    SetCursorVisible(show: boolean): void;
    /** Displays a text message on top left corner of the screen. Useful for games without `showTextBox(...)` support
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SET_MESSAGE */
    SetMessage(text: string): void;
    /** Sets the current window position. Applies to the next window ( aka Begin() )
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SET_NEXT_WINDOW_POS */
    SetNextWindowPos(x: float, y: float, imGuiCond: int): void;
    /** Sets the current window size. Applies to the next window ( aka Begin() )
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SET_NEXT_WINDOW_SIZE */
    SetNextWindowSize(width: float, height: float, imGuiCond: int): void;
    /** Sets the background transparency of next window (0.0f-1.0f)
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SET_NEXT_WINDOW_TRANSPARENCY */
    SetNextWindowTransparency(alpha: float): void;
    /** Creates the popup window with the given text
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SET_TOOLTIP */
    SetTooltip(text: string): void;
    /** Sets the current window position. Must be called inside Begin()...End()
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SET_WINDOW_POS */
    SetWindowPos(x: float, y: float, imGuiCond: int): void;
    /** Sets the current window size. Must be called inside Begin()...End()
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SET_WINDOW_SIZE */
    SetWindowSize(width: float, height: float, imGuiCond: int): void;
    /** Creates the float slider input
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SLIDER_FLOAT */
    SliderFloat(label: string, initValue: float, min: float, max: float): float;
    /** Creates the int slider input
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SLIDER_INT */
    SliderInt(label: string, initValue: int, min: int, max: int): int;
    /** Adds some spacing after the previous widget
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SPACING */
    Spacing(): void;
    /** Creates the text line
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_TEXT */
    Text(text: string): void;
    /** Creates the text line of the given RGBA color (0.0f-1.0f)
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_TEXT_COLORED */
    TextColored(text: string, red: float, green: float, blue: float, alpha: float): void;
    /** Creates the text line with the disabled color ( Grayish by default )
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_TEXT_DISABLED */
    TextDisabled(text: string): void;
    /** Creates the text line with a bullet point
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_BULLET_TEXT */
    TextWithBullet(text: string): void;
    /** Creates the text line that wraps to a newline if the text goes beyond the window width
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_TEXT_WRAPPED */
    TextWrapped(text: string): void;
}
declare var ImGui: ImGui
/** Reading and writing .ini files
 * 
 * https://library.sannybuilder.com/#/sa/classes/IniFile */
interface IniFile {
    /** Reads a floating-point value from the ini file
    *
    * https://library.sannybuilder.com/#/sa?q=READ_FLOAT_FROM_INI_FILE */
    ReadFloat(path: string, section: string, key: string): float | undefined;
    /** Reads an integer value from the ini file
    *
    * https://library.sannybuilder.com/#/sa?q=READ_INT_FROM_INI_FILE */
    ReadInt(path: string, section: string, key: string): int | undefined;
    /** Reads a string value from the ini file
    *
    * https://library.sannybuilder.com/#/sa?q=READ_STRING_FROM_INI_FILE */
    ReadString(path: string, section: string, key: string): string | undefined;
    /** Writes the floating-point value to the ini file
    *
    * https://library.sannybuilder.com/#/sa?q=WRITE_FLOAT_TO_INI_FILE */
    WriteFloat(value: float, path: string, section: string, key: string): boolean;
    /** Writes the integer value to the ini file
    *
    * https://library.sannybuilder.com/#/sa?q=WRITE_INT_TO_INI_FILE */
    WriteInt(value: int, path: string, section: string, key: string): boolean;
    /** Writes the string value to the ini file
    *
    * https://library.sannybuilder.com/#/sa?q=WRITE_STRING_TO_INI_FILE */
    WriteString(value: string, path: string, section: string, key: string): boolean;
}
declare var IniFile: IniFile
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/KillFrenzy */
interface KillFrenzy {
    /** Cancels current rampage, setting the rampage status to failed
    *
    * https://library.sannybuilder.com/#/sa?q=FAIL_KILL_FRENZY */
    Fail(): void;
    /** Returns the status of the current rampage
    *
    * https://library.sannybuilder.com/#/sa?q=READ_KILL_FRENZY_STATUS */
    ReadStatus(): int;
    /** Starts a rampage
    *
    * https://library.sannybuilder.com/#/sa?q=START_KILL_FRENZY */
    Start(text: string, weaponType: int, timeInMs: int, targetsNum: int, targetModel1: int, targetModel2: int, targetModel3: int, targetModel4: int, betaSoundsAndMessages: boolean): void;
}
declare var KillFrenzy: KillFrenzy
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Math */
interface Math {
    // https://github.com/microsoft/TypeScript/blob/f3cc8684997d2c5708c344d909691636c355612b/lib/lib.es5.d.ts#L617
    // Copyright (c) Microsoft Corporation. All rights reserved.
    /** The mathematical constant e. This is Euler's number, the base of natural logarithms. */
    readonly E: number;
    /** The natural logarithm of 10. */
    readonly LN10: number;
    /** The natural logarithm of 2. */
    readonly LN2: number;
    /** The base-2 logarithm of e. */
    readonly LOG2E: number;
    /** The base-10 logarithm of e. */
    readonly LOG10E: number;
    /** Pi. This is the ratio of the circumference of a circle to its diameter. */
    readonly PI: number;
    /** The square root of 0.5, or, equivalently, one divided by the square root of 2. */
    readonly SQRT1_2: number;
    /** The square root of 2. */
    readonly SQRT2: number;
    /**
    * Returns the absolute value of a number (the value without regard to whether it is positive or negative).
    * For example, the absolute value of -5 is the same as the absolute value of 5.
    * @param x A numeric expression for which the absolute value is needed.
    */
    abs(x: number): number;
    /**
    * Returns the arc cosine (or inverse cosine) of a number.
    * @param x A numeric expression.
    */
    acos(x: number): number;
    /**
    * Returns the arcsine of a number.
    * @param x A numeric expression.
    */
    asin(x: number): number;
    /**
    * Returns the arctangent of a number.
    * @param x A numeric expression for which the arctangent is needed.
    */
    atan(x: number): number;
    /**
    * Returns the angle (in radians) from the X axis to a point.
    * @param y A numeric expression representing the cartesian y-coordinate.
    * @param x A numeric expression representing the cartesian x-coordinate.
    */
    atan2(y: number, x: number): number;
    /**
    * Returns the smallest integer greater than or equal to its numeric argument.
    * @param x A numeric expression.
    */
    ceil(x: number): number;
    /**
    * Returns the cosine of a number.
    * @param x A numeric expression that contains an angle measured in radians.
    */
    cos(x: number): number;
    /**
    * Returns e (the base of natural logarithms) raised to a power.
    * @param x A numeric expression representing the power of e.
    */
    exp(x: number): number;
    /**
    * Returns the greatest integer less than or equal to its numeric argument.
    * @param x A numeric expression.
    */
    floor(x: number): number;
    /**
    * Returns the natural logarithm (base e) of a number.
    * @param x A numeric expression.
    */
    log(x: number): number;
    /**
    * Returns the larger of a set of supplied numeric expressions.
    * @param values Numeric expressions to be evaluated.
    */
    max(...values: number[]): number;
    /**
    * Returns the smaller of a set of supplied numeric expressions.
    * @param values Numeric expressions to be evaluated.
    */
    min(...values: number[]): number;
    /**
    * Returns the value of a base expression taken to a specified power.
    * @param x The base value of the expression.
    * @param y The exponent value of the expression.
    */
    pow(x: number, y: number): number;
    /** Returns a pseudorandom number between 0 and 1. */
    random(): number;
    /**
    * Returns a supplied numeric expression rounded to the nearest integer.
    * @param x The value to be rounded to the nearest integer.
    */
    round(x: number): number;
    /**
    * Returns the sine of a number.
    * @param x A numeric expression that contains an angle measured in radians.
    */
    sin(x: number): number;
    /**
    * Returns the square root of a number.
    * @param x A numeric expression.
    */
    sqrt(x: number): number;
    /**
    * Returns the tangent of a number.
    * @param x A numeric expression that contains an angle measured in radians.
    */
    tan(x: number): number;

    // https://github.com/microsoft/TypeScript/blob/cec2fda9a53620dc545a2c4d7b0156446ab145b4/lib/lib.es2015.core.d.ts#L100
    // Copyright (c) Microsoft Corporation. All rights reserved.
    /**
     * Returns the number of leading zero bits in the 32-bit binary representation of a number.
     * @param x A numeric expression.
     */
    clz32(x: number): number;
    /**
     * Returns the result of 32-bit multiplication of two numbers.
     * @param x First number
     * @param y Second number
     */
    imul(x: number, y: number): number;
    /**
     * Returns the sign of the x, indicating whether x is positive, negative or zero.
     * @param x The numeric expression to test
     */
    sign(x: number): number;
    /**
     * Returns the base 10 logarithm of a number.
     * @param x A numeric expression.
     */
    log10(x: number): number;
    /**
     * Returns the base 2 logarithm of a number.
     * @param x A numeric expression.
     */
    log2(x: number): number;
    /**
     * Returns the natural logarithm of 1 + x.
     * @param x A numeric expression.
     */
    log1p(x: number): number;
    /**
     * Returns the result of (e^x - 1), which is an implementation-dependent approximation to
     * subtracting 1 from the exponential function of x (e raised to the power of x, where e
     * is the base of the natural logarithms).
     * @param x A numeric expression.
     */
    expm1(x: number): number;
    /**
     * Returns the hyperbolic cosine of a number.
     * @param x A numeric expression that contains an angle measured in radians.
     */
    cosh(x: number): number;
    /**
     * Returns the hyperbolic sine of a number.
     * @param x A numeric expression that contains an angle measured in radians.
     */
    sinh(x: number): number;
    /**
     * Returns the hyperbolic tangent of a number.
     * @param x A numeric expression that contains an angle measured in radians.
     */
    tanh(x: number): number;
    /**
     * Returns the inverse hyperbolic cosine of a number.
     * @param x A numeric expression that contains an angle measured in radians.
     */
    acosh(x: number): number;
    /**
     * Returns the inverse hyperbolic sine of a number.
     * @param x A numeric expression that contains an angle measured in radians.
     */
    asinh(x: number): number;
    /**
     * Returns the inverse hyperbolic tangent of a number.
     * @param x A numeric expression that contains an angle measured in radians.
     */
    atanh(x: number): number;
    /**
     * Returns the square root of the sum of squares of its arguments.
     * @param values Values to compute the square root for.
     *     If no arguments are passed, the result is +0.
     *     If there is only one argument, the result is the absolute value.
     *     If any argument is +Infinity or -Infinity, the result is +Infinity.
     *     If any argument is NaN, the result is NaN.
     *     If all arguments are either +0 or −0, the result is +0.
     */
    hypot(...values: number[]): number;
    /**
     * Returns the integral part of the a numeric expression, x, removing any fractional digits.
     * If x is already an integer, the result is x.
     * @param x A numeric expression.
     */
    trunc(x: number): number;
    /**
     * Returns the nearest single precision float representation of a number.
     * @param x A numeric expression.
     */
    fround(x: number): number;
    /**
     * Returns an implementation-dependent approximation to the cube root of number.
     * @param x A numeric expression.
     */
    cbrt(x: number): number;    /** Returns the result of converting meters to feet
    *
    * https://library.sannybuilder.com/#/sa?q=CONVERT_METRES_TO_FEET_INT */
    ConvertMetersToFeet(meters: int): int;
    /** Eases k value in range of 0.0 to 1.0, resulting in a easing value based on mode and way, useful for smooth animations
    *
    * https://library.sannybuilder.com/#/sa?q=EASE */
    Ease(k: float, mode: int, way: int): float;
    /** Gets the angle between the two 2D vectors
    *
    * https://library.sannybuilder.com/#/sa?q=GET_ANGLE_BETWEEN_2D_VECTORS */
    GetAngleBetween2DVectors(x1: float, y1: float, x2: float, y2: float): float;
    GetAngleFromTwoCoords(x1: float, y1: float, x2: float, y2: float): float;
    /** Gets the distance between two points
    *
    * https://library.sannybuilder.com/#/sa?q=GET_DISTANCE_BETWEEN_COORDS_2D */
    GetDistanceBetweenCoords2D(fromX: float, fromY: float, toX: float, toZ: float): float;
    /** Gets the distance between two points
    *
    * https://library.sannybuilder.com/#/sa?q=GET_DISTANCE_BETWEEN_COORDS_3D */
    GetDistanceBetweenCoords3D(fromX: float, fromY: float, fromZ: float, toX: float, toY: float, toZ: float): float;
    /** Gets the angle for the XY offset
    *
    * https://library.sannybuilder.com/#/sa?q=GET_HEADING_FROM_VECTOR_2D */
    GetHeadingFromVector2D(x: float, y: float): float;
    /** Gets the exact angle of an angle
    *
    * https://library.sannybuilder.com/#/sa?q=LIMIT_ANGLE */
    LimitAngle(value: float): float;
    /** Calculates the 1D Perlin simplex noise
    *
    * https://library.sannybuilder.com/#/sa?q=PERLIN_NOISE */
    PerlinNoise(x: float): float;
    /** Calculates the Fractal Brownian Motion (fBm) summation of 1D Perlin Simplex noise
    *
    * https://library.sannybuilder.com/#/sa?q=PERLIN_NOISE_FRACTAL */
    PerlinNoiseFractal(x: float, octaves: int, frequency: float, amplitude: float, lacunarity: float, persistence: float): float;
    /** Calculates the Fractal Brownian Motion (fBm) summation of 2D Perlin Simplex noise
    *
    * https://library.sannybuilder.com/#/sa?q=PERLIN_NOISE_FRACTAL_2D */
    PerlinNoiseFractal2D(x: float, y: float, octaves: int, frequency: float, amplitude: float, lacunarity: float, persistence: float): float;
    /** Calculates the Fractal Brownian Motion (fBm) summation of 3D Perlin Simplex noise
    *
    * https://library.sannybuilder.com/#/sa?q=PERLIN_NOISE_FRACTAL_3D */
    PerlinNoiseFractal3D(x: float, y: float, z: float, octaves: int, frequency: float, amplitude: float, lacunarity: float, persistence: float): float;
    /** Returns a random float between the specified ranges
    *
    * https://library.sannybuilder.com/#/sa?q=GENERATE_RANDOM_FLOAT_IN_RANGE */
    RandomFloatInRange(min: float, max: float): float;
    /** Returns a random integer between the specified ranges
    *
    * https://library.sannybuilder.com/#/sa?q=GENERATE_RANDOM_INT_IN_RANGE */
    RandomIntInRange(min: int, max: int): int;
}
declare var Math: Math
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Memory */
interface Memory {
    /** Reads a floating-point value (IEEE 754) from the game memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    ReadFloat(address: int, vp: boolean): float;
    /** Writes a floating-point value (IEEE 754) to the game memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    WriteFloat(address: int, value: float, vp: boolean): void;
    /** Reads a 8-bit signed integer value from the game memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    ReadI8(address: int, vp: boolean): int;
    /** Reads a 16-bit signed integer value from the game memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    ReadI16(address: int, vp: boolean): int;
    /** Reads a 32-bit signed integer value from the game memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    ReadI32(address: int, vp: boolean): int;
    /** Reads a 8-bit unsigned integer value from the game memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    ReadU8(address: int, vp: boolean): int;
    /** Reads a 16-bit unsigned integer value from the game memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    ReadU16(address: int, vp: boolean): int;
    /** Reads a 32-bit unsigned integer value from the game memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    ReadU32(address: int, vp: boolean): int;
    /** Writes a 8-bit signed integer value to the game memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    WriteI8(address: int, value: int, vp: boolean): void;
    /** Writes a 16-bit signed integer value to the game memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    WriteI16(address: int, value: int, vp: boolean): void;
    /** Writes a 32-bit signed integer value to the game memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    WriteI32(address: int, value: int, vp: boolean): void;
    /** Writes a 8-bit unsigned integer value to the game memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    WriteU8(address: int, value: int, vp: boolean): void;
    /** Writes a 16-bit unsigned integer value to the game memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    WriteU16(address: int, value: int, vp: boolean): void;
    /** Writes a 32-bit unsigned integer value to the game memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    WriteU32(address: int, value: int, vp: boolean): void;

    /** Cast 32-bit signed integer value to floating-point value (IEEE 754) 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    ToFloat(value: int): float;
    /** Cast floating-point value (IEEE 754) to 32-bit signed integer value 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    FromFloat(value: float): int;
    /** Cast 8-bit signed integer value to unsigned integer value 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    ToU8(value: int): int;
    /** Cast 16-bit signed integer value to unsigned integer value 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    ToU16(value: int): int;
    /** Cast 32-bit signed integer value to unsigned integer value 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    ToU32(value: int): int;
    /** Cast 8-bit unsigned integer value to signed integer value 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    ToI8(value: int): int;
    /** Cast 16-bit unsigned integer value to signed integer value 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    ToI16(value: int): int;
    /** Cast 32-bit unsigned integer value to signed integer value 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    ToI32(value: int): int;
    /** Returns address of a function or variable, or 0 otherwise
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    Translate(symbol: string): int;

    /** Convenience methods for invoking different types of functions */
    Fn: {
        /** Creates a new function to be called using "cdecl" calling convention
         * https://en.wikipedia.org/wiki/X86_calling_conventions#cdecl
         * @param address global address of the function
         * @returns a function accepting arguments and returning a 32-bit signed integer value as a result */
        Cdecl(address: int): (...funcParams: int[]) => int;
        /** Creates a new function to be called using "cdecl" calling convention
         * https://en.wikipedia.org/wiki/X86_calling_conventions#cdecl
         * @param address global address of the function
         * @returns a function accepting arguments and returning a floating-point value as a result */
        CdeclFloat(address: int): (...funcParams: int[]) => float;
        /** Creates a new function to be called using "cdecl" calling convention
         * https://en.wikipedia.org/wiki/X86_calling_conventions#cdecl
         * @param address global address of the function
         * @returns a function accepting arguments and returning a 8-bit signed integer value as a result */
        CdeclI8(address: int): (...funcParams: int[]) => int;
        /** Creates a new function to be called using "cdecl" calling convention
         * https://en.wikipedia.org/wiki/X86_calling_conventions#cdecl
         * @param address global address of the function
         * @returns a function accepting arguments and returning a 16-bit signed integer value as a result */
        CdeclI16(address: int): (...funcParams: int[]) => int;
        /** Creates a new function to be called using "cdecl" calling convention
         * https://en.wikipedia.org/wiki/X86_calling_conventions#cdecl
         * @param address global address of the function
         * @returns a function accepting arguments and returning a 32-bit signed integer value as a result */
        CdeclI32(address: int): (...funcParams: int[]) => int;
        /** Creates a new function to be called using "cdecl" calling convention
         * https://en.wikipedia.org/wiki/X86_calling_conventions#cdecl
         * @param address global address of the function
         * @returns a function accepting arguments and returning a 8-bit unsigned integer value as a result */
        CdeclU8(address: int): (...funcParams: int[]) => int;
        /** Creates a new function to be called using "cdecl" calling convention
         * https://en.wikipedia.org/wiki/X86_calling_conventions#cdecl
         * @param address global address of the function
         * @returns a function accepting arguments and returning a 16-bit unsigned integer value as a result */
        CdeclU16(address: int): (...funcParams: int[]) => int;
        /** Creates a new function to be called using "cdecl" calling convention
         * https://en.wikipedia.org/wiki/X86_calling_conventions#cdecl
         * @param address global address of the function
         * @returns a function accepting arguments and returning a 32-bit unsigned integer value as a result */
        CdeclU32(address: int): (...funcParams: int[]) => int;

        /** Creates a new function to be called using "stdcall"  calling convention
         * https://en.wikipedia.org/wiki/X86_calling_conventions#stdcall
         * @param address global address of the function
         * @returns a function accepting arguments and returning a 32-bit signed integer value as a result */
        Stdcall(address: int): (...funcParams: int[]) => int;
        /** Creates a new function to be called using "stdcall"  calling convention
         * https://en.wikipedia.org/wiki/X86_calling_conventions#stdcall
         * @param address global address of the function
         * @returns a function accepting arguments and returning a floating-point value as a result */
        StdcallFloat(address: int): (...funcParams: int[]) => float;
        /** Creates a new function to be called using "stdcall"  calling convention
         * https://en.wikipedia.org/wiki/X86_calling_conventions#stdcall
         * @param address global address of the function
         * @returns a function accepting arguments and returning a 8-bit signed integer value as a result */
        StdcallI8(address: int): (...funcParams: int[]) => int;
        /** Creates a new function to be called using "stdcall"  calling convention
         * https://en.wikipedia.org/wiki/X86_calling_conventions#stdcall
         * @param address global address of the function
         * @returns a function accepting arguments and returning a 16-bit signed integer value as a result */
        StdcallI16(address: int): (...funcParams: int[]) => int;
        /** Creates a new function to be called using "stdcall"  calling convention
         * https://en.wikipedia.org/wiki/X86_calling_conventions#stdcall
         * @param address global address of the function
         * @returns a function accepting arguments and returning a 32-bit signed integer value as a result */
        StdcallI32(address: int): (...funcParams: int[]) => int;
        /** Creates a new function to be called using "stdcall"  calling convention
         * https://en.wikipedia.org/wiki/X86_calling_conventions#stdcall
         * @param address global address of the function
         * @returns a function accepting arguments and returning a 8-bit unsigned integer value as a result */
        StdcallU8(address: int): (...funcParams: int[]) => int;
        /** Creates a new function to be called using "stdcall"  calling convention
         * https://en.wikipedia.org/wiki/X86_calling_conventions#stdcall
         * @param address global address of the function
         * @returns a function accepting arguments and returning a 16-bit unsigned integer value as a result */
        StdcallU16(address: int): (...funcParams: int[]) => int;
        /** Creates a new function to be called using "stdcall"  calling convention
         * https://en.wikipedia.org/wiki/X86_calling_conventions#stdcall
         * @param address global address of the function
         * @returns a function accepting arguments and returning a 32-bit unsigned integer value as a result */
        StdcallU32(address: int): (...funcParams: int[]) => int;

        /** Creates a new function to be called using "thiscall" calling convention
         * https://en.wikipedia.org/wiki/X86_calling_conventions#thiscall
         * It's also known as a class method call
         * @param address global address of the method
         * @param struct global address of the object whose method is being called
         * @returns a function accepting arguments and returning a 32-bit signed integer value as a result */
        Thiscall(address: int, struct: int): (...funcParams: int[]) => int;
        /** Creates a new function to be called using "thiscall" calling convention
         * https://en.wikipedia.org/wiki/X86_calling_conventions#thiscall
         * It's also known as a class method call
         * @param address global address of the method
         * @param struct global address of the object whose method is being called
         * @returns a function accepting arguments and returning a floating-point value as a result */
        ThiscallFloat(address: int, struct: int): (...funcParams: int[]) => float;
        /** Creates a new function to be called using "thiscall" calling convention
         * https://en.wikipedia.org/wiki/X86_calling_conventions#thiscall
         * It's also known as a class method call
         * @param address global address of the method
         * @param struct global address of the object whose method is being called
         * @returns a function accepting arguments and returning a 8-bit signed integer value as a result */
        ThiscallI8(address: int, struct: int): (...funcParams: int[]) => int;
        /** Creates a new function to be called using "thiscall" calling convention
         * https://en.wikipedia.org/wiki/X86_calling_conventions#thiscall
         * It's also known as a class method call
         * @param address global address of the method
         * @param struct global address of the object whose method is being called
         * @returns a function accepting arguments and returning a 16-bit signed integer value as a result */
        ThiscallI16(address: int, struct: int): (...funcParams: int[]) => int;
        /** Creates a new function to be called using "thiscall" calling convention
         * https://en.wikipedia.org/wiki/X86_calling_conventions#thiscall
         * It's also known as a class method call
         * @param address global address of the method
         * @param struct global address of the object whose method is being called
         * @returns a function accepting arguments and returning a 32-bit signed integer value as a result */
        ThiscallI32(address: int, struct: int): (...funcParams: int[]) => int;
        /** Creates a new function to be called using "thiscall" calling convention
         * https://en.wikipedia.org/wiki/X86_calling_conventions#thiscall
         * It's also known as a class method call
         * @param address global address of the method
         * @param struct global address of the object whose method is being called
         * @returns a function accepting arguments and returning a 8-bit unsigned integer value as a result */
        ThiscallU8(address: int, struct: int): (...funcParams: int[]) => int;
        /** Creates a new function to be called using "thiscall" calling convention
         * https://en.wikipedia.org/wiki/X86_calling_conventions#thiscall
         * It's also known as a class method call
         * @param address global address of the method
         * @param struct global address of the object whose method is being called
         * @returns a function accepting arguments and returning a 16-bit unsigned integer value as a result */
        ThiscallU16(address: int, struct: int): (...funcParams: int[]) => int;
        /** Creates a new function to be called using "thiscall" calling convention
         * https://en.wikipedia.org/wiki/X86_calling_conventions#thiscall
         * It's also known as a class method call
         * @param address global address of the method
         * @param struct global address of the object whose method is being called
         * @returns a function accepting arguments and returning a 32-bit unsigned integer value as a result */
        ThiscallU32(address: int, struct: int): (...funcParams: int[]) => int;
    }

    /** Calls a function 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    CallFunction(address: int, numParams: int, pop: int, ...funcParams: int[]): void;

    /** Calls a function that returns an integer value
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    CallFunctionReturn(address: int, numParams: int, pop: int, ...funcParams: int[]): int;

    /** Calls a function that returns a floating-point value
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    CallFunctionReturnFloat(address: int, numParams: int, pop: int, ...funcParams: int[]): float;

    /** Calls a class method
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    CallMethod(address: int, struct: int, numParams: int, pop: int, ...funcParams: int[]): void;

    /** Calls a class method that returns an integer value
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    CallMethodReturn(address: int, struct: int, numParams: int, pop: int, ...funcParams: int[]): int;

    /** Calls a class method that returns a floating-point value
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    CallMethodReturnFloat(address: int, struct: int, numParams: int, pop: int, ...funcParams: int[]): float;
    /** Allocates a chunk of memory of the given size near to the memory page of the main exe module
    *
    * https://library.sannybuilder.com/#/sa?q=ALLOC_NEAR */
    AllocNear(size: int): int;
    /** Allocates a chunk of memory of the given size and stores its address to the variable
    *
    * https://library.sannybuilder.com/#/sa?q=ALLOCATE_MEMORY */
    Allocate(size: int): int;
    /** Calls a function at the address with the given arguments and the calling convention defined by the pop parameter where 0 means 'stdcall' and a value equal to numParams means  'cdecl'
    *
    * https://library.sannybuilder.com/#/sa?q=CALL_FUNCTION */
    CallFunction(address: int, numParams: int, pop: int, ...funcParams: number[]): void;
    /** Calls a function similarly to 0AA5 and writes the result into the variable following the arguments list
    *
    * https://library.sannybuilder.com/#/sa?q=CALL_FUNCTION_RETURN */
    CallFunctionReturn(address: int, numParams: int, pop: int, ...funcParams: number[]): int;
    /** Calls a method of the object (struct) with the given arguments and the 'thiscall' calling convention (pop is always 0)
    *
    * https://library.sannybuilder.com/#/sa?q=CALL_METHOD */
    CallMethod(address: int, struct: int, numParams: int, pop: int, ...funcParams: number[]): void;
    /** Calls a method of the object (struct) similarly to 0AA6 and writes the result into the variable following the arguments list
    *
    * https://library.sannybuilder.com/#/sa?q=CALL_METHOD_RETURN */
    CallMethodReturn(address: int, struct: int, numParams: int, pop: int, ...funcParams: number[]): int;
    /** Copies each memory byte from src address to dest address
    *
    * https://library.sannybuilder.com/#/sa?q=COPY_MEMORY */
    Copy(src: int, dest: int, size: int): void;
    /** Returns an address of a memory chunk with the given index in a list of matches for the pattern
    *
    * https://library.sannybuilder.com/#/sa?q=FIND_PATTERN */
    FindPattern(pattern: string, index: int): int | undefined;
    /** Frees the memory allocated with 0AC8
    *
    * https://library.sannybuilder.com/#/sa?q=FREE_MEMORY */
    Free(address: int): void;
    /** Returns the address of the main exe module
    *
    * https://library.sannybuilder.com/#/sa?q=GET_IMAGE_BASE */
    GetImageBase(): int;
    /** Stores the absolute address of a code location marked with the label
    *
    * https://library.sannybuilder.com/#/sa?q=GET_LABEL_POINTER */
    GetLabelPointer(_: int): int;
    /** Gets the address of the object struct in the game memory by its handle
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OBJECT_POINTER */
    GetObjectPointer(object: ScriptObject): int;
    /** Gets the corresponding handle of the object located at the given address in memory
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OBJECT_REF */
    GetObjectRef(address: int): ScriptObject;
    /** Gets the address of the ped struct in the game memory by its handle
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PED_POINTER */
    GetPedPointer(char: Char): int;
    /** Gets the corresponding handle of the char located at the given address in memory
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PED_REF */
    GetPedRef(address: int): Char;
    /** Gets the address of a running script which name matches the given string or 0 otherwise
    *
    * https://library.sannybuilder.com/#/sa?q=GET_SCRIPT_STRUCT_NAMED */
    GetScriptStructNamed(scriptName: string): int;
    /** Gets the address of the current script structure in the game memory
    *
    * https://library.sannybuilder.com/#/sa?q=GET_THIS_SCRIPT_STRUCT */
    GetThisScriptStruct(): int;
    /** Stores the absolute address of the variable
    *
    * https://library.sannybuilder.com/#/sa?q=GET_VAR_POINTER */
    GetVarPointer(_: int): int;
    /** Gets the address of the vehicle struct in the game memory by its handle
    *
    * https://library.sannybuilder.com/#/sa?q=GET_VEHICLE_POINTER */
    GetVehiclePointer(vehicle: Car): int;
    /** Gets the corresponding handle of the vehicle located at the given address in memory
    *
    * https://library.sannybuilder.com/#/sa?q=GET_VEHICLE_REF */
    GetVehicleRef(address: int): Car;
    /** Fills memory address with 0x90 with given size
    *
    * https://library.sannybuilder.com/#/sa?q=MAKE_NOP */
    MakeNop(address: int, size: int): void;
    PopFloat(): float;
    /** Reads a value from the game memory
    *
    * https://library.sannybuilder.com/#/sa?q=READ_MEMORY */
    Read(address: int, size: int, vp: boolean): int;
    /** Reads a 32-bit value referenced by a relative offset at the address
    *
    * https://library.sannybuilder.com/#/sa?q=READ_RELATIVE_OFFSET */
    ReadRelativeOffset(address: int): int;
    /** Reads a value from the given offset from the memory address
    *
    * https://library.sannybuilder.com/#/sa?q=READ_STRUCT_OFFSET */
    ReadStructOffset(address: int, offset: int, size: int): int;
    /** Reads a value from the given offset from the memory address multiple times as array/vector
    *
    * https://library.sannybuilder.com/#/sa?q=READ_STRUCT_OFFSET_MULTI */
    ReadStructOffsetMulti(address: int, offset: int, count: int, size: int): number[];
    /** Writes the value at the memory address
    *
    * https://library.sannybuilder.com/#/sa?q=WRITE_MEMORY */
    Write(address: int, size: int, value: int, vp: boolean): void;
    /** Replaces an offset at the address with the offset to the near address (use ALLOC_NEAR)
    *
    * https://library.sannybuilder.com/#/sa?q=WRITE_RELATIVE_OFFSET */
    WriteRelativeOffset(address: int, nearAddress: int): void;
    /** Writes the value at the given offset from the memory address
    *
    * https://library.sannybuilder.com/#/sa?q=WRITE_STRUCT_OFFSET */
    WriteStructOffset(address: int, offset: int, size: int, value: int): void;
    /** Writes the value at the given offset from the memory address multiple times as array/vector
    *
    * https://library.sannybuilder.com/#/sa?q=WRITE_STRUCT_OFFSET_MULTI */
    WriteStructOffsetMulti(address: int, offset: int, count: int, size: int, ...params: number[]): void;
}
declare var Memory: Memory
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Menu */
declare class Menu {
    constructor(handle: number);
    /** Creates the specified panel on the screen with basic settings
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_MENU */
    static Create(header: string, topLeftX: float, topLeftY: float, width: float, numColumns: int, interactive: boolean, background: boolean, alignment: int): Menu;
    activateItem(row: int, state: boolean): Menu;
    changeCarColor(vehicle: Car, colorSlot: int, row: int): Menu;
    /** Removes the specified panel from the screen
    *
    * https://library.sannybuilder.com/#/sa?q=DELETE_MENU */
    delete(): void;
    /** Returns the last row of a panel selected with the sprint key
    *
    * https://library.sannybuilder.com/#/sa?q=GET_MENU_ITEM_ACCEPTED */
    getItemAccepted(): int;
    /** Returns the currently highlighted row in a panel
    *
    * https://library.sannybuilder.com/#/sa?q=GET_MENU_ITEM_SELECTED */
    getItemSelected(): int;
    /** Highlights the menu item - used to indicate an owned shopping item
    *
    * https://library.sannybuilder.com/#/sa?q=HIGHLIGHT_MENU_ITEM */
    highlightItem(row: int, state: boolean): Menu;
    setActiveItem(row: int): Menu;
    setColumn(column: int, title: string, row0: string, row1: string, row2: string, row3: string, row4: string, row5: string, row6: string, row7: string, row8: string, row9: string, row10: string, row11: string): Menu;
    setColumnOrientation(column: int, alignment: int): Menu;
    /** Sets the width of the specified menu column
    *
    * https://library.sannybuilder.com/#/sa?q=SET_MENU_COLUMN_WIDTH */
    setColumnWidth(column: int, width: int): Menu;
    setItemWith2Numbers(column: int, row: int, gxt: string, number1: int, number2: int): Menu;
    /** Sets the numbered GXT of the specified panel row
    *
    * https://library.sannybuilder.com/#/sa?q=SET_MENU_ITEM_WITH_NUMBER */
    setItemWithNumber(column: int, row: int, gxt: string, number: int): Menu;
}
/** Current Mission control
 * 
 * https://library.sannybuilder.com/#/sa/classes/Mission */
interface Mission {
    /** Terminates the active mission by executing its mission cleanup routine
    *
    * https://library.sannybuilder.com/#/sa?q=FAIL_CURRENT_MISSION */
    Fail(): void;
    /** Resets multiple settings that are usually set during missions and in some scripts
    *
    * https://library.sannybuilder.com/#/sa?q=MISSION_HAS_FINISHED */
    Finish(): void;
    /** Returns true if the player is on a mission (the variable set in 0180 is not zero)
    *
    * https://library.sannybuilder.com/#/sa?q=IS_ON_MISSION */
    IsOn(): boolean;
    /** Checks if is playing scripted mission cutscene, that is, original widescreen borders are toggled on
    *
    * https://library.sannybuilder.com/#/sa?q=IS_ON_SCRIPTED_CUTSCENE */
    IsOnScriptedCutscene(): boolean;
    /** Loads a mission from the list defined in the main.scm header
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_AND_LAUNCH_MISSION_INTERNAL */
    LoadAndLaunchInternal(index: int): void;
}
declare var Mission: Mission
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Mouse */
interface Mouse {
    /** Gives the offset of the mouse or right thumbstick movement
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PC_MOUSE_MOVEMENT */
    GetMovement(): {
        offsetX: float;
        offsetY: float;
    };
    /** Gets the mouse sensibility set in the game options
    *
    * https://library.sannybuilder.com/#/sa?q=GET_MOUSE_SENSIBILITY */
    GetSensibility(): float;
    /** Returns true if the players settings are set to invert the mouse
    *
    * https://library.sannybuilder.com/#/sa?q=IS_MOUSE_USING_VERTICAL_INVERSION */
    IsUsingVerticalInversion(): boolean;
    /** Returns true if the mouse wheel has been scrolled down
    *
    * https://library.sannybuilder.com/#/sa?q=IS_MOUSE_WHEEL_DOWN */
    IsWheelDown(): boolean;
    /** Returns true if the mouse wheel has been scrolled up
    *
    * https://library.sannybuilder.com/#/sa?q=IS_MOUSE_WHEEL_UP */
    IsWheelUp(): boolean;
}
declare var Mouse: Mouse
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Pad */
interface Pad {
    /** Returns the controller mode
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CONTROLLER_MODE */
    GetControllerMode(): int;
    /** Returns the code of the last pressed button
    *
    * https://library.sannybuilder.com/#/sa?q=GET_LAST_KEY */
    GetLastKey(): int;
    /** Returns the offset of the specified Left/Right, Up/Down, Look Left/Look Right and Look Up/Look Down keys
    *
    * https://library.sannybuilder.com/#/sa?q=GET_POSITION_OF_ANALOGUE_STICKS */
    GetPositionOfAnalogueSticks(pad: Pad): {
        leftStickX: int;
        leftStickY: int;
        rightStickX: int;
        rightStickY: int;
    };
    /** Stores the status of the specified key into a variable
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PAD_STATE */
    GetState(pad: Pad, buttonId: int): int;
    /** Holds down a keyboard or mouse button until it gets released with RELEASE_KEY
    *
    * https://library.sannybuilder.com/#/sa?q=HOLD_KEY */
    HoldKey(keyCode: int): void;
    /** Returns true if the pad's button has been pressed
    *
    * https://library.sannybuilder.com/#/sa?q=IS_BUTTON_PRESSED */
    IsButtonPressed(pad: Pad, buttonId: int): boolean;
    /** Returns true if a keyboard or mouse button has just been pressed
    *
    * https://library.sannybuilder.com/#/sa?q=IS_KEY_DOWN */
    IsKeyDown(keyCode: int): boolean;
    /** Returns true if the player is pressing a keyboard button with the specified code
    *
    * https://library.sannybuilder.com/#/sa?q=IS_KEY_PRESSED */
    IsKeyPressed(keyCode: int): boolean;
    /** Returns true if a keyboard or mouse button has just been released
    *
    * https://library.sannybuilder.com/#/sa?q=IS_KEY_UP */
    IsKeyUp(keyCode: int): boolean;
    /** Returns true if the player is pressing a key used to skip cutscenes or the game has been minimised
    *
    * https://library.sannybuilder.com/#/sa?q=IS_SKIP_CUTSCENE_BUTTON_PRESSED */
    IsSkipCutsceneButtonPressed(): boolean;
    /** Releases a keyboard or mouse button after HOLD_KEY
    *
    * https://library.sannybuilder.com/#/sa?q=RELEASE_KEY */
    ReleaseKey(keyCode: int): void;
    /** Affects the delay to the left and right steering while driving
    *
    * https://library.sannybuilder.com/#/sa?q=SET_DRUNK_INPUT_DELAY */
    SetDrunkInputDelay(pad: Pad, delay: int): void;
    SetPlayerCycleWeaponButton(playerId: Player, state: boolean): void;
    /** Sets whether a player can use the ACTION key to display their stats
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_DISPLAY_VITAL_STATS_BUTTON */
    SetPlayerDisplayVitalStatsButton(playerId: Player, state: boolean): void;
    /** Sets whether the player can use the crouch button
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_DUCK_BUTTON */
    SetPlayerDuckButton(playerId: Player, state: boolean): void;
    /** Sets whether the player can enter and exit vehicles
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_ENTER_CAR_BUTTON */
    SetPlayerEnterCarButton(playerId: Player, state: boolean): void;
    /** Sets whether the player is able to use weapons
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_FIRE_BUTTON */
    SetPlayerFireButton(playerId: Player, state: boolean): void;
    /** Sets whether the player can jump
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_JUMP_BUTTON */
    SetPlayerJumpButton(playerId: Player, state: boolean): void;
    /** Shakes the player's joypad at the specified intensity for the specified time
    *
    * https://library.sannybuilder.com/#/sa?q=SHAKE_PAD */
    Shake(pad: Pad, time: int, intensity: int): void;
    /** Returns true if the specified string of letters has been typed on the keyboard
    *
    * https://library.sannybuilder.com/#/sa?q=TEST_CHEAT */
    TestCheat(input: string): boolean;
}
declare var Pad: Pad
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Particle */
declare class Particle {
    constructor(handle: number);
    /** Creates a particle effect
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_FX_SYSTEM */
    static Create(name: string, x: float, y: float, z: float, type: int): Particle;
    /** Creates a particle effect attached to a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_FX_SYSTEM_ON_CAR */
    static CreateOnCar(name: string, vehicle: Car, xOffset: float, yOffset: float, zOffset: float, type: float): Particle;
    /** Creates a particle and attaches it to the specified vehicle with the specified offset and direction
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_FX_SYSTEM_ON_CAR_WITH_DIRECTION */
    static CreateOnCarWithDirection(name: string, vehicle: Car, xOffset: float, yOffset: float, zOffset: float, xDirection: float, yDirection: float, zDirection: float, type: int): Particle;
    /** Creates a particle attached to a character
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_FX_SYSTEM_ON_CHAR */
    static CreateOnChar(name: string, char: Char, xOffset: float, yOffset: float, zOffset: float, type: int): Particle;
    /** Creates a particle effect attached to a character
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_FX_SYSTEM_ON_CHAR_WITH_DIRECTION */
    static CreateOnCharWithDirection(name: string, char: Char, xOffset: float, yOffset: float, zOffset: float, xDirection: float, yDirection: float, zDirection: float, type: int): Particle;
    /** Creates a particle effect on an object
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_FX_SYSTEM_ON_OBJECT */
    static CreateOnObject(name: string, object: ScriptObject, xOffset: float, yOffset: float, zOffset: float, type: int): Particle;
    /** Creates particle effect on an object
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_FX_SYSTEM_ON_OBJECT_WITH_DIRECTION */
    static CreateOnObjectWithDirection(name: string, object: ScriptObject, xOffset: float, yOffset: float, zOffset: float, xDirection: float, yDirection: float, zDirection: float, type: int): Particle;
    /** Attaches the specified particle to the specified character
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_FX_SYSTEM_TO_CHAR_BONE */
    attachToCharBone(handle: Char, boneId: int): Particle;
    /** Stops the particle and deletes it
    *
    * https://library.sannybuilder.com/#/sa?q=KILL_FX_SYSTEM */
    kill(): void;
    /** Destroys the specified particle
    *
    * https://library.sannybuilder.com/#/sa?q=KILL_FX_SYSTEM_NOW */
    killNow(): void;
    /** Makes the specified particle visible
    *
    * https://library.sannybuilder.com/#/sa?q=PLAY_FX_SYSTEM */
    play(): Particle;
    /** Starts the particle effect and relinquishes script control over it
    *
    * https://library.sannybuilder.com/#/sa?q=PLAY_AND_KILL_FX_SYSTEM */
    playAndKill(): Particle;
    /** Stops the specified particle at the source
    *
    * https://library.sannybuilder.com/#/sa?q=STOP_FX_SYSTEM */
    stop(): Particle;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Path */
interface Path {
    /** Adds a new point to the patrol route
    *
    * https://library.sannybuilder.com/#/sa?q=EXTEND_PATROL_ROUTE */
    ExtendPatrolRoute(x: float, y: float, z: float, animationName: string, animationFile: string): void;
    /** Adds a point to the task route
    *
    * https://library.sannybuilder.com/#/sa?q=EXTEND_ROUTE */
    ExtendRoute(x: float, y: float, z: float): void;
    /** Clears all previous patrol data to start a new patrol route, which can be used in combination with 0755 to create patrol routes
    *
    * https://library.sannybuilder.com/#/sa?q=FLUSH_PATROL_ROUTE */
    FlushPatrolRoute(): void;
    /** Flushes the task route
    *
    * https://library.sannybuilder.com/#/sa?q=FLUSH_ROUTE */
    FlushRoute(): void;
    /** Returns the nearest path note from the specified coordinates that a vehicle can drive on
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CLOSEST_CAR_NODE */
    GetClosestCarNode(x: float, y: float, z: float): {
        nodeX: float;
        nodeY: float;
        nodeZ: float;
    };
    /** Returns the position and heading of the closest vehicle path node to the specified position
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CLOSEST_CAR_NODE_WITH_HEADING */
    GetClosestCarNodeWithHeading(x: float, y: float, z: float): {
        nodeX: float;
        nodeY: float;
        nodeZ: float;
        angle: float;
    };
    /** Returns the nearest path node from the specified coordinates that a pedestrian can walk on
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CLOSEST_CHAR_NODE */
    GetClosestCharNode(x: float, y: float, z: float): {
        nodeX: float;
        nodeY: float;
        nodeZ: float;
    };
    /** Gets two closest path nodes within the specified distance range
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CLOSEST_STRAIGHT_ROAD */
    GetClosestStraightRoad(x: float, y: float, z: float, minDist: float, maxDist: float): {
        node1X: float;
        node1Y: float;
        node1Z: float;
        node2X: float;
        node2Y: float;
        node2Z: float;
        angle: float;
    };
    /** Gets the coordinates of the nth car path node closest to the given coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=GET_NTH_CLOSEST_CAR_NODE */
    GetNthClosestCarNode(fromX: float, fromY: float, fromZ: float, n: int): {
        x: float;
        y: float;
        z: float;
    };
    GetNthClosestCarNodeWithHeading(xCoord: float, yCoord: float, zCoord: float, nth: int): {
        x: float;
        y: float;
        z: float;
        heading: float;
    };
    /** Adds an area where script created cars will avoid driving in
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_PATH_NODES_IN_AREA */
    LoadPathNodesInArea(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float): void;
    MarkRoadNodeAsDontWander(x: float, y: float, z: float): void;
    /** Removes areas forbidden for scripted cars set up by 0606
    *
    * https://library.sannybuilder.com/#/sa?q=RELEASE_PATH_NODES */
    ReleaseNodes(): void;
    SwitchPedRoadsBackToOriginal(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): void;
    /** Forbids pedestrians to walk into the specified area
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_PED_ROADS_OFF */
    SwitchPedRoadsOff(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): void;
    /** Allows pedestrians to walk into the specified area
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_PED_ROADS_ON */
    SwitchPedRoadsOn(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): void;
    SwitchRoadsBackToOriginal(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): void;
    /** Prevents cars from driving on roads in the specified 3D area
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_ROADS_OFF */
    SwitchRoadsOff(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): void;
    /** Allows cars to drive in the specified 3D area
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_ROADS_ON */
    SwitchRoadsOn(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): void;
    UnmarkAllRoadNodesAsDontWander(): void;
}
declare var Path: Path
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Pickup */
declare class Pickup {
    constructor(handle: number);
    /** Creates a pickup with the given model and type
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_PICKUP */
    static Create(modelId: int, pickupType: int, x: float, y: float, z: float): Pickup;
    /** Creates an asset pickup for an asset which can be bought
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_FORSALE_PROPERTY_PICKUP */
    static CreateForSaleProperty(x: float, y: float, z: float, price: int, message: string): Pickup;
    static CreateHorseshoe(x: float, y: float, z: float): Pickup;
    /** Creates an asset icon for an asset that is not for sale
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_LOCKED_PROPERTY_PICKUP */
    static CreateLockedProperty(x: float, y: float, z: float, message: string): Pickup;
    /** Creates a money pickup with the specified cash value
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_MONEY_PICKUP */
    static CreateMoney(x: float, y: float, z: float, cashAmount: int, permanent: boolean): Pickup;
    static CreateOyster(x: float, y: float, z: float): Pickup;
    /** Creates an asset revenue pickup
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_PROTECTION_PICKUP */
    static CreateProtection(x: float, y: float, z: float, revenueLimit: int, revenueRate: int): Pickup;
    static CreateSnapshot(x: float, y: float, z: float): Pickup;
    /** Creates a weapon pickup, giving the player the specified amount of ammo when they pick it up
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_PICKUP_WITH_AMMO */
    static CreateWithAmmo(modelId: int, pickupType: int, ammo: int, x: float, y: float, z: float): Pickup;
    /** Returns true if the handle is a valid pickup handle
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_PICKUP_EXIST */
    static DoesExist(handle: int): boolean;
    /** Returns the X, Y and Z coordinates of the pickup
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PICKUP_COORDINATES */
    getCoordinates(x: float, y: float, z: float): Pickup;
    /** Returns true if specified pickup has been collected
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_PICKUP_BEEN_COLLECTED */
    hasBeenCollected(): boolean;
    /** Destroys the specified pickup, freeing game memory
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_PICKUP */
    remove(): void;
    updateMoneyPerDay(value: int): Pickup;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Player */
declare class Player {
    constructor(handle: number);
    /** Creates a player at the specified location
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_PLAYER */
    static Create(modelId: int, x: float, y: float, z: float): Player;
    /** Returns true if the handle is an invalid player handle or the player is dead (wasted)
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_DEAD */
    static IsDead(handle: int): boolean;
    static MakeGangDisappear(): void;
    static MakeGangReappear(): void;
    /** Restores the players clothes stored with 0793
    *
    * https://library.sannybuilder.com/#/sa?q=RESTORE_CLOTHES_STATE */
    static RestoreClothesState(): void;
    /** Stores the players current clothes to later be restored with 0794
    *
    * https://library.sannybuilder.com/#/sa?q=STORE_CLOTHES_STATE */
    static StoreClothesState(): void;
    /** Detonates all satchel charges and car bombs planted by the player
    *
    * https://library.sannybuilder.com/#/sa?q=USE_DETONATOR */
    static UseDetonator(): void;
    /** Adds to the player's money
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_SCORE */
    addScore(money: int): Player;
    /** Sets the player's wanted level
    *
    * https://library.sannybuilder.com/#/sa?q=ALTER_WANTED_LEVEL */
    alterWantedLevel(wantedLevel: int): Player;
    /** Sets the player's wanted level if the specified level is higher than the current one
    *
    * https://library.sannybuilder.com/#/sa?q=ALTER_WANTED_LEVEL_NO_DROP */
    alterWantedLevelNoDrop(wantedLevel: int): Player;
    /** Applies brakes to the player's car
    *
    * https://library.sannybuilder.com/#/sa?q=APPLY_BRAKES_TO_PLAYERS_CAR */
    applyBrakesToCar(state: boolean): Player;
    /** Rebuilds the player model, applying any required texture changes
    *
    * https://library.sannybuilder.com/#/sa?q=BUILD_PLAYER_MODEL */
    buildModel(): Player;
    /** Returns true if the player can move
    *
    * https://library.sannybuilder.com/#/sa?q=CAN_PLAYER_START_MISSION */
    canStartMission(): boolean;
    /** Changes player money by set, add or remove
    *
    * https://library.sannybuilder.com/#/sa?q=CHANGE_PLAYER_MONEY */
    changeMoney(mode: int, value: int): Player;
    /** Resets the status of the last model the player has shot
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_LAST_BUILDING_MODEL_SHOT_BY_PLAYER */
    clearLastBuildingModelShot(): Player;
    /** Clears the player's wanted level
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_WANTED_LEVEL */
    clearWantedLevel(): Player;
    /** Removes the specified player
    *
    * https://library.sannybuilder.com/#/sa?q=DELETE_PLAYER */
    delete(): void;
    disableSprint(state: boolean): Player;
    /** Sets the amount of ammo a player has during a driveby
    *
    * https://library.sannybuilder.com/#/sa?q=ENSURE_PLAYER_HAS_DRIVE_BY_WEAPON */
    ensureHasDriveByWeapon(ammo: int): Player;
    forceInteriorLighting(state: boolean): Player;
    /** Gets the character handle for the specified player
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PLAYER_CHAR */
    getChar(): Char;
    getCharIsTargeting(): Char | undefined;
    /** Gets the players current town ID
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CITY_PLAYER_IS_IN */
    getCityIsIn(): int;
    getClothesItem(bodyPart: int): {
        textureHash: int;
        modelHash: int;
    };
    getGroup(): Group;
    getMaxArmor(): int;
    /** Returns the number of times the player has destroyed a specific model
    *
    * https://library.sannybuilder.com/#/sa?q=GET_NUM_OF_MODELS_KILLED_BY_PLAYER */
    getNumOfModelsKilled(modelId: int): int;
    /** Returns the number of peds killed by the player since the last reset (0297)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_TOTAL_NUMBER_OF_PEDS_KILLED_BY_PLAYER */
    getTotalNumberOfPedsKilled(): int;
    /** Returns the stats of the most recent wheelie or stoppie attempt
    *
    * https://library.sannybuilder.com/#/sa?q=GET_WHEELIE_STATS */
    getWheelieStats(): {
        twoWheelsTime: int;
        twoWheelsDistance: float;
        wheelieTime: int;
        wheelieDistance: float;
        stoppieTime: int;
        stoppieDistance: float;
    };
    giveClothes(textureHash: int, modelHash: int, bodyPart: int): Player;
    /** Sets the players clothing
    *
    * https://library.sannybuilder.com/#/sa?q=GIVE_PLAYER_CLOTHES_OUTSIDE_SHOP */
    giveClothesOutsideShop(textureName: string, modelName: string, bodyPart: int): Player;
    /** Increases the players armor by the specified amount
    *
    * https://library.sannybuilder.com/#/sa?q=INCREASE_PLAYER_MAX_ARMOUR */
    increaseMaxArmor(value: int): Player;
    /** Increases the players maximum health by the specified amount
    *
    * https://library.sannybuilder.com/#/sa?q=INCREASE_PLAYER_MAX_HEALTH */
    increaseMaxHealth(value: int): Player;
    /** Returns true if the heading has finished being applied, as started by 0858
    *
    * https://library.sannybuilder.com/#/sa?q=IS_ATTACHED_PLAYER_HEADING_ACHIEVED */
    isAttachedHeadingAchieved(): boolean;
    /** Returns true if the player is climbing
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_CLIMBING */
    isClimbing(): boolean;
    /** Returns true if the player control hasn't been disabled using 01B4
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_CONTROL_ON */
    isControlOn(): boolean;
    /** Returns true if the player is in the specified zone
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_IN_INFO_ZONE */
    isInInfoZone(infoZone: string): boolean;
    /** Returns true if the player is controlling a remote-control vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_IN_REMOTE_MODE */
    isInRemoteMode(): boolean;
    /** Returns true if the player's last shot model is the model specified
    *
    * https://library.sannybuilder.com/#/sa?q=IS_LAST_BUILDING_MODEL_SHOT_BY_PLAYER */
    isLastBuildingModelShot(modelId: int): boolean;
    /** Returns true if the player is performing a stoppie
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_PERFORMING_STOPPIE */
    isPerformingStoppie(): boolean;
    isPerformingWheelie(): boolean;
    /** Returns true if the player hasn't been wasted or busted (the player is still playing)
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_PLAYING */
    isPlaying(): boolean;
    /** Returns true if the player is honking the horn in a car
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_PRESSING_HORN */
    isPressingHorn(): boolean;
    /** Returns true if the player's money is over the specified value
    *
    * https://library.sannybuilder.com/#/sa?q=IS_SCORE_GREATER */
    isScoreGreater(money: int): boolean;
    /** Returns true if the specified player is aiming at anything using autoaim
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_TARGETTING_ANYTHING */
    isTargettingAnything(): boolean;
    /** Returns true if the player is aiming at the specified character
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_TARGETTING_CHAR */
    isTargettingChar(handle: Char): boolean;
    /** Returns true if the player is aiming at the specified object
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_TARGETTING_OBJECT */
    isTargettingObject(handle: ScriptObject): boolean;
    /** Returns true if player is using a jetpack
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_USING_JETPACK */
    isUsingJetpack(): boolean;
    /** Returns true if the player's wanted level is over the specified value
    *
    * https://library.sannybuilder.com/#/sa?q=IS_WANTED_LEVEL_GREATER */
    isWantedLevelGreater(wantedLevel: int): boolean;
    /** Returns true if the player's bodypart has the specified model (0784 or 087B) 
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_WEARING */
    isWearing(modelName: string, bodyPart: int): boolean;
    /** Makes the player immune to fire
    *
    * https://library.sannybuilder.com/#/sa?q=MAKE_PLAYER_FIRE_PROOF */
    makeFireProof(state: boolean): Player;
    /** Makes the player safe, putting the character in a safe location
    *
    * https://library.sannybuilder.com/#/sa?q=MAKE_PLAYER_SAFE_FOR_CUTSCENE */
    makeSafeForCutscene(): Player;
    /** Resets the count of how many times the player has destroyed a certain model
    *
    * https://library.sannybuilder.com/#/sa?q=RESET_NUM_OF_MODELS_KILLED_BY_PLAYER */
    resetNumOfModelsKilled(): Player;
    /** Sets the players driveby mode
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_CAN_DO_DRIVE_BY */
    setCanDoDriveBy(state: boolean): Player;
    /** Sets whether player's control is enabled
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_CONTROL */
    setControl(state: boolean): Player;
    /** Makes the camera start moving around in a swirling motion with the specified intensity as if drunk
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_DRUNKENNESS */
    setDrunkenness(intensity: int): Player;
    /** Defines whether the player have to reload their gun
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_FAST_RELOAD */
    setFastReload(state: boolean): Player;
    /** Sets whether the player loses the cash when gets wasted (works once)
    *
    * https://library.sannybuilder.com/#/sa?q=SET_FREE_HEALTH_CARE */
    setFreeHealthCare(state: boolean): Player;
    setGroupRecruitment(state: boolean): Player;
    /** Controls the players ability to tell their group to wait and automatically orders any group members to continue following
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_GROUP_TO_FOLLOW_ALWAYS */
    setGroupToFollowAlways(state: boolean): Player;
    /** Sets whether the player's group stops following the player, even if the player uses the "group follow" button
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_GROUP_TO_FOLLOW_NEVER */
    setGroupToFollowNever(state: boolean): Player;
    /** Sets the view angle for the player attached to an object or vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=SET_HEADING_FOR_ATTACHED_PLAYER */
    setHeadingForAttached(heading: float, rotationSpeed: float): Player;
    /** Sets whether cops should ignore the player regardless of wanted level
    *
    * https://library.sannybuilder.com/#/sa?q=SET_POLICE_IGNORE_PLAYER */
    setIgnorePolice(state: boolean): Player;
    /** Changes the player to use the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_MODEL */
    setModel(modelId: int): Player;
    /** Sets the players mood, affecting the dialogue spoken by the player
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_MOOD */
    setMood(mood: int, time: int): Player;
    /** Defines whether the player can run fast forever
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_NEVER_GETS_TIRED */
    setNeverGetsTired(state: boolean): Player;
    /** Returns the player's money
    *
    * https://library.sannybuilder.com/#/sa?q=STORE_SCORE */
    storeScore(): int;
    /** Returns the player's current wanted level
    *
    * https://library.sannybuilder.com/#/sa?q=STORE_WANTED_LEVEL */
    storeWantedLevel(): int;
    /** Removes the players Goggles and disables night/heat vision
    *
    * https://library.sannybuilder.com/#/sa?q=PLAYER_TAKE_OFF_GOGGLES */
    takeOffGoggles(animate: boolean): Player;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Rc */
interface Rc {
    /** Returns the player's radio-controlled vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=GET_REMOTE_CONTROLLED_CAR */
    GetCar(player: Player): Car;
    /** Puts the player in control of a remote-control vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=GIVE_REMOTE_CONTROLLED_MODEL_TO_PLAYER */
    GiveModelToPlayer(handle: Player, x: float, y: float, z: float, angle: float, modelId: int): void;
    /** Exits remote-control mode
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_RC_BUGGY */
    RemoveBuggy(): void;
    /** Enables a remote-control vehicle detonation
    *
    * https://library.sannybuilder.com/#/sa?q=SET_ENABLE_RC_DETONATE */
    SetEnableDetonate(state: boolean): void;
    /** Sets whether RC Bandits detonate on contact with the wheels of any four-wheeled vehicles
    *
    * https://library.sannybuilder.com/#/sa?q=SET_ENABLE_RC_DETONATE_ON_CONTACT */
    SetEnableDetonateOnContact(state: boolean): void;
    /** Puts the specified player in control of a remote-control vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=TAKE_REMOTE_CONTROL_OF_CAR */
    TakeCar(player: Player, vehicle: Car): void;
}
declare var Rc: Rc
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Restart */
interface Restart {
    /** Adds a hospital restart, which is where the player will spawn after death (wasted) if the point is closer than any other hospital restart
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_HOSPITAL_RESTART */
    AddHospital(x: float, y: float, z: float, heading: float, townId: int): void;
    /** Adds a police restart, which is where the player will spawn after being arrested (busted) if the point is closer than any other police restart
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_POLICE_RESTART */
    AddPolice(x: float, y: float, z: float, heading: float, townId: int): void;
    /** Stops the player from spawning at the override location (016E)
    *
    * https://library.sannybuilder.com/#/sa?q=CANCEL_OVERRIDE_RESTART */
    CancelOverride(): void;
    /** Forces this location to be the next respawn location
    *
    * https://library.sannybuilder.com/#/sa?q=OVERRIDE_NEXT_RESTART */
    OverrideNext(x: float, y: float, z: float, heading: float): void;
    SetExtraHospitalRestartPoint(x: float, y: float, z: float, radius: float, heading: float): void;
    SetExtraPoliceStationRestartPoint(x: float, y: float, z: float, radius: float, heading: float): void;
    /** Overrides the respawn point
    *
    * https://library.sannybuilder.com/#/sa?q=SET_RESPAWN_POINT_FOR_DURATION_OF_MISSION */
    SetRespawnPointForDurationOfMission(x: float, y: float, z: float): void;
}
declare var Restart: Restart
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/ScriptFire */
declare class ScriptFire {
    constructor(handle: number);
    /** Creates a script fire on the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=START_CAR_FIRE */
    static CreateCarFire(vehicle: Car): ScriptFire;
    /** Creates a script fire on the character
    *
    * https://library.sannybuilder.com/#/sa?q=START_CHAR_FIRE */
    static CreateCharFire(char: Char): ScriptFire;
    /** Creates a fire at the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=START_SCRIPT_FIRE */
    static Start(x: float, y: float, z: float, propagation: int, size: int): ScriptFire;
    /** Returns true if the handle is a valid script fire handle
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_SCRIPT_FIRE_EXIST */
    static DoesExist(handle: int): boolean;
    /** Gets the coordinates of the fire
    *
    * https://library.sannybuilder.com/#/sa?q=GET_SCRIPT_FIRE_COORDS */
    getCoords(x: float, y: float, z: float): ScriptFire;
    /** Returns true if the script fire has been put out
    *
    * https://library.sannybuilder.com/#/sa?q=IS_SCRIPT_FIRE_EXTINGUISHED */
    isExtinguished(): boolean;
    /** Removes the script fire
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_SCRIPT_FIRE */
    remove(): void;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/ScriptObject */
declare class ScriptObject {
    constructor(handle: number);
    /** Creates an object at the specified location, with the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_OBJECT */
    static Create(modelId: int, x: float, y: float, z: float): ScriptObject;
    /** Creates an object without offset at the location
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_OBJECT_NO_OFFSET */
    static CreateNoOffset(modelId: int, x: float, y: float, z: float): ScriptObject;
    /** Creates an no save game object at the specified location, with the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_OBJECT_NO_SAVE */
    static CreateNoSave(modelId: int, x: float, y: float, z: float, useOffset: boolean, useGround: boolean): ScriptObject;
    /** Returns true if the handle is a valid object handle
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_OBJECT_EXIST */
    static DoesExist(handle: int): boolean;
    /** Sets the object's rotation velocity from the center of its body
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_TO_OBJECT_ROTATION_VELOCITY */
    addToRotationVelocity(x: float, y: float, z: float): ScriptObject;
    /** Adds the given vector to the object's velocity (0381)
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_TO_OBJECT_VELOCITY */
    addToVelocity(x: float, y: float, z: float): ScriptObject;
    /** Sets the object's velocity
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_VELOCITY_RELATIVE_TO_OBJECT_VELOCITY */
    addVelocityRelative(x: float, y: float, z: float): ScriptObject;
    attachToCar(handle: Car, xOffset: float, yOffset: float, zOffset: float, xRotation: float, yRotation: float, zRotation: float): ScriptObject;
    attachToChar(handle: Char, xOffset: float, yOffset: float, zOffset: float, xRotation: float, yRotation: float, zRotation: float): ScriptObject;
    attachToObject(handle: ScriptObject, xOffset: float, yOffset: float, zOffset: float, xRotation: float, yRotation: float, zRotation: float): ScriptObject;
    /** Smashes the object to pieces
    *
    * https://library.sannybuilder.com/#/sa?q=BREAK_OBJECT */
    break(intensity: int): ScriptObject;
    /** Clears the object's last damaging weapon ID
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_OBJECT_LAST_WEAPON_DAMAGE */
    clearLastWeaponDamage(): ScriptObject;
    /** Sets which LOD object should show when the object is being viewed from far away
    *
    * https://library.sannybuilder.com/#/sa?q=CONNECT_LODS */
    connectLods(lodObject: ScriptObject): ScriptObject;
    /** Destroys the object, freeing game memory
    *
    * https://library.sannybuilder.com/#/sa?q=DELETE_OBJECT */
    delete(): void;
    detach(x: float, y: float, z: float, collisionDetection: boolean): ScriptObject;
    /** Returns true if the object's model is the model specified
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_OBJECT_HAVE_THIS_MODEL */
    doesHaveThisModel(modelId: int): boolean;
    /** Removes the object from the mission cleanup list, preventing it from being deleted when the mission ends
    *
    * https://library.sannybuilder.com/#/sa?q=DONT_REMOVE_OBJECT */
    dontRemove(): ScriptObject;
    /** Sets whether the object attracts spawned peds to interact with it
    *
    * https://library.sannybuilder.com/#/sa?q=ENABLE_DISABLED_ATTRACTORS_ON_OBJECT */
    enableDisabledAttractors(state: boolean): ScriptObject;
    /** Keeps the object in the games memory
    *
    * https://library.sannybuilder.com/#/sa?q=FREEZE_OBJECT_POSITION */
    freezePosition(state: boolean): ScriptObject;
    /** Gets the current progress of the object's animation
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OBJECT_ANIM_CURRENT_TIME */
    getAnimCurrentTime(animationName: string): float;
    /** Returns the object's coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OBJECT_COORDINATES */
    getCoordinates(): {
        x: float;
        y: float;
        z: float;
    };
    /** Gets extended var value for this char. Returns false if not initialized (0E1A)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_EXTENDED_OBJECT_VAR */
    getExtendedVar(identifier: string, varNumber: int): int | undefined;
    /** Returns the object's heading (z-angle)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OBJECT_HEADING */
    getHeading(): float;
    getHealth(health: int): ScriptObject;
    getLevelDesignCoords(nth: int): {
        x: float;
        y: float;
        z: float;
    };
    /** Returns the object's mass
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OBJECT_MASS */
    getMass(mass: float): ScriptObject;
    /** Returns the object's model index
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OBJECT_MODEL */
    getModel(model: int): ScriptObject;
    /** Returns the object's coordinates with an offset
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OFFSET_FROM_OBJECT_IN_WORLD_COORDS */
    getOffsetInWorldCoords(xOffset: float, yOffset: float, zOffset: float): {
        x: float;
        y: float;
        z: float;
    };
    /** Gets the object's quaternion
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OBJECT_QUATERNION */
    getQuaternion(x: float, y: float, z: float, w: float): ScriptObject;
    getRopeHeight(): float;
    getRotationVelocity(): {
        x: float;
        y: float;
        z: float;
    };
    /** Gets the speed of the object
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OBJECT_SPEED */
    getSpeed(speed: float): ScriptObject;
    /** Returns the object's turn mass
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OBJECT_TURN_MASS */
    getTurnMass(turnMass: float): ScriptObject;
    /** Returns the object's X, Y, and Z velocity
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OBJECT_VELOCITY */
    getVelocity(): {
        x: float;
        y: float;
        z: float;
    };
    grabEntityOnRope(): {
        vehicle: Car;
        char: Char;
        object: ScriptObject;
    };
    /** Returns true if the object is damaged
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_OBJECT_BEEN_DAMAGED */
    hasBeenDamaged(): boolean;
    /** Returns true if the object has been damaged by the specified weapon or damage type
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_OBJECT_BEEN_DAMAGED_BY_WEAPON */
    hasBeenDamagedByWeapon(weaponType: int): boolean;
    /** Returns true if the object has been photographed
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_OBJECT_BEEN_PHOTOGRAPHED */
    hasBeenPhotographed(): boolean;
    /** Returns true if the object has been made moveable by the 0392
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_OBJECT_BEEN_UPROOTED */
    hasBeenUprooted(): boolean;
    /** Returns true if the object has collided
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_OBJECT_COLLIDED_WITH_ANYTHING */
    hasCollidedWithAnything(): boolean;
    /** Inits additional variables for this object. Identifier can be "AUTO" for unique ID based on script pointer
    *
    * https://library.sannybuilder.com/#/sa?q=INIT_EXTENDED_OBJECT_VARS */
    initExtendedVars(identifier: string, totalVars: int): boolean;
    isAttached(): boolean;
    isInAngledArea2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, angle: float, drawSphere: boolean): boolean;
    isInAngledArea3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, angle: float, drawSphere: boolean): boolean;
    /** Returns true if object is in the specified area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_OBJECT_IN_AREA_2D */
    isInArea2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, drawSphere: boolean): boolean;
    /** Returns true if the object is in the specified area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_OBJECT_IN_AREA_3D */
    isInArea3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, drawSphere: boolean): boolean;
    /** Returns true if the object is in water
    *
    * https://library.sannybuilder.com/#/sa?q=IS_OBJECT_IN_WATER */
    isInWater(): boolean;
    /** Appears to return true if something had entered the object's position since it was created or its position was changed
    *
    * https://library.sannybuilder.com/#/sa?q=IS_OBJECT_INTERSECTING_WORLD */
    isIntersectingWorld(): boolean;
    /** Returns true if the object is visible
    *
    * https://library.sannybuilder.com/#/sa?q=IS_OBJECT_ON_SCREEN */
    isOnScreen(): boolean;
    /** Returns true if the object is playing the specified animation
    *
    * https://library.sannybuilder.com/#/sa?q=IS_OBJECT_PLAYING_ANIM */
    isPlayingAnim(animationName: string): boolean;
    /** Returns true if the specified object is controlled by a script
    *
    * https://library.sannybuilder.com/#/sa?q=IS_OBJECT_SCRIPT_CONTROLLED */
    isScriptControlled(): boolean;
    /** Returns true if the object is not moving
    *
    * https://library.sannybuilder.com/#/sa?q=IS_OBJECT_STATIC */
    isStatic(): boolean;
    /** Returns true if the object is within the external script trigger radius
    *
    * https://library.sannybuilder.com/#/sa?q=IS_OBJECT_WITHIN_BRAIN_ACTIVATION_RANGE */
    isWithinBrainActivationRange(): boolean;
    /** Returns true if the object is near the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_OBJECT_2D */
    locate2D(x: float, y: float, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the object is near the specified point
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_OBJECT_3D */
    locate3D(x: float, y: float, z: float, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Sets whether the door object is locked at its current rotation and allows it to be pushed open by entities once
    *
    * https://library.sannybuilder.com/#/sa?q=LOCK_DOOR */
    lockDoor(state: boolean): ScriptObject;
    /** Sets whether the object can be targeted (auto-aimed) or not
    *
    * https://library.sannybuilder.com/#/sa?q=MAKE_OBJECT_TARGETABLE */
    makeTargetable(state: boolean): ScriptObject;
    /** marks object as script controlled
    *
    * https://library.sannybuilder.com/#/sa?q=MARK_OBJECT_AS_NEEDED */
    markAsNeeded(): ScriptObject;
    /** Allows the object to be deleted by the game if necessary, and also removes it from the mission cleanup list, if applicable
    *
    * https://library.sannybuilder.com/#/sa?q=MARK_OBJECT_AS_NO_LONGER_NEEDED */
    markAsNoLongerNeeded(): ScriptObject;
    /** Places the object at an offset from the car
    *
    * https://library.sannybuilder.com/#/sa?q=PLACE_OBJECT_RELATIVE_TO_CAR */
    placeRelativeToCar(vehicle: Car, xOffset: float, yOffset: float, zOffset: float): ScriptObject;
    /** Plays an object animation
    *
    * https://library.sannybuilder.com/#/sa?q=PLAY_OBJECT_ANIM */
    playAnim(animationName: string, animationFile: string, framedelta: float, lockF: boolean, loop: boolean): ScriptObject;
    releaseEntityFromRope(): ScriptObject;
    /** Fades the object out of existence, freeing game memory
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_OBJECT_ELEGANTLY */
    removeElegantly(): void;
    /** Rotates the object from one angle to another, optionally accounting for a collision during the rotation
    *
    * https://library.sannybuilder.com/#/sa?q=ROTATE_OBJECT */
    rotate(fromAngle: float, toAngle: float, collisionCheck: boolean): boolean;
    /** Sets the progress of an animation, with 0
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_ANIM_CURRENT_TIME */
    setAnimCurrentTime(animationName: string, time: float): ScriptObject;
    /** Sets the object's animation speed
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_ANIM_SPEED */
    setAnimSpeed(animationName: string, speed: float): ScriptObject;
    /** Sets the visibility of the object to the specified interior
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_AREA_VISIBLE */
    setAreaVisible(areaId: int): ScriptObject;
    /** Sets whether the object can be picked up and carried
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_AS_STEALABLE */
    setAsStealable(state: boolean): ScriptObject;
    /** Sets the object's collision detection
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_COLLISION */
    setCollision(state: boolean): ScriptObject;
    /** Sets whether the object can be destroyed or not
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_COLLISION_DAMAGE_EFFECT */
    setCollisionDamageEffect(state: boolean): ScriptObject;
    /** Puts the object at the specified location
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_COORDINATES */
    setCoordinates(x: float, y: float, z: float): ScriptObject;
    /** Sets the object's coordinates without affecting the rotation
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_COORDINATES_AND_VELOCITY */
    setCoordinatesAndVelocity(x: float, y: float, z: float): ScriptObject;
    /** Sets the specified object to always draw on top of other objects
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_DRAW_LAST */
    setDrawLast(state: boolean): ScriptObject;
    /** Defines whether or not the object is moveable
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_DYNAMIC */
    setDynamic(state: boolean): ScriptObject;
    /** Sets extended var value for this object. Requires initialization (0E1A), otherwise returns false
    *
    * https://library.sannybuilder.com/#/sa?q=SET_EXTENDED_OBJECT_VAR */
    setExtendedVar(identifier: string, varNumber: int, value: int): boolean;
    /** Sets the object's heading (z-angle)
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_HEADING */
    setHeading(heading: float): ScriptObject;
    setHealth(health: int): ScriptObject;
    /** Sets the object's mass
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_MASS */
    setMass(mass: float): ScriptObject;
    /** Makes the object damageable only by the player
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_ONLY_DAMAGED_BY_PLAYER */
    setOnlyDamagedByPlayer(state: boolean): ScriptObject;
    /** Sets what immunities the object has
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_PROOFS */
    setProofs(bulletProof: boolean, fireProof: boolean, explosionProof: boolean, collisionProof: boolean, meleeProof: boolean): ScriptObject;
    /** Sets the object's quaternion
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_QUATERNION */
    setQuaternion(x: float, y: float, z: float, w: float): ScriptObject;
    /** Enables the use of collision checking for the object
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_RECORDS_COLLISIONS */
    setRecordsCollisions(state: boolean): ScriptObject;
    /** Makes the object look like it has been burnt
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_RENDER_SCORCHED */
    setRenderScorched(state: boolean): ScriptObject;
    setRopeHeight(height: float): ScriptObject;
    /** Sets the object rotation along X, Y and Z axis
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_ROTATION */
    setRotation(x: float, y: float, z: float): ScriptObject;
    /** Sets the object's rotation velocity with frame sync applied?
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_ROTATION_VELOCITY */
    setRotationVelocity(x: float, y: float, z: float): ScriptObject;
    /** Sets the scale of the object
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_SCALE */
    setScale(scale: float): ScriptObject;
    /** Sets the object's turn mass
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_TURN_MASS */
    setTurnMass(turnMass: float): ScriptObject;
    /** Sets the object's velocity
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_VELOCITY */
    setVelocity(xSpeed: float, ySpeed: float, zSpeed: float): ScriptObject;
    /** Sets whether the object is visible
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_VISIBLE */
    setVisible(state: boolean): ScriptObject;
    /** Returns true if the object has finished moving
    *
    * https://library.sannybuilder.com/#/sa?q=SLIDE_OBJECT */
    slide(fromX: float, fromY: float, fromZ: float, xSpeed: float, ySpeed: float, zSpeed: float, collisionCheck: boolean): boolean;
    /** Makes the specified car have no collision with the specified object
    *
    * https://library.sannybuilder.com/#/sa?q=SORT_OUT_OBJECT_COLLISION_WITH_CAR */
    sortOutCollisionWithCar(handle: Car): ScriptObject;
    /** Sets whether the object can be picked up with the magnocrane
    *
    * https://library.sannybuilder.com/#/sa?q=WINCH_CAN_PICK_OBJECT_UP */
    winchCanPickUp(state: boolean): ScriptObject;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Searchlight */
declare class Searchlight {
    constructor(handle: number);
    static Create(x: float, y: float, z: float, xPoint: float, yPoint: float, zPoint: float, radius: float, radiusPoint: float): Searchlight;
    /** Creates a searchlight-styled light cone on a car with the specified offset and points to a certain point
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_SEARCHLIGHT_ON_VEHICLE */
    static CreateOnVehicle(vehicle: Car, xOffset: float, yOffset: float, zOffset: float, xPoint: float, yPoint: float, zPoint: float, pointRadius: float, radius: float): Searchlight;
    /** Returns true if the handle is a valid searchlight handle
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_SEARCHLIGHT_EXIST */
    static DoesExist(handle: int): boolean;
    /** Attaches the searchlight to the specified objects
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_SEARCHLIGHT_TO_SEARCHLIGHT_OBJECT */
    attachToObject(spotTower: ScriptObject, spotHousing: ScriptObject, spotBulb: ScriptObject, xOffset: float, yOffset: float, zOffset: float): Searchlight;
    delete(): void;
    /** Returns true if the searchlight has spotted the actor
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_SEARCHLIGHT */
    isCharIn(handle: Char): boolean;
    /** Returns true if the searchlights light is on the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_VEHICLE_IN_SEARCHLIGHT */
    isVehicleIn(handle: Car): boolean;
    /** Makes the specified searchlight travel between the two specified points with the specified speed
    *
    * https://library.sannybuilder.com/#/sa?q=MOVE_SEARCHLIGHT_BETWEEN_COORDS */
    moveBetweenCoords(fromX: float, fromY: float, fromZ: float, toX: float, toY: float, toZ: float, speed: float): Searchlight;
    /** Makes the searchlight follow the specified actor
    *
    * https://library.sannybuilder.com/#/sa?q=POINT_SEARCHLIGHT_AT_CHAR */
    pointAtChar(handle: Char, speed: float): Searchlight;
    /** Makes the searchlight target move/travel to the specified coords
    *
    * https://library.sannybuilder.com/#/sa?q=POINT_SEARCHLIGHT_AT_COORD */
    pointAtCoord(x: float, y: float, z: float, speed: float): Searchlight;
    pointAtVehicle(handle: Car, speed: float): Searchlight;
    setClipIfColliding(state: boolean): Searchlight;
    /** Sets whether the searchlight shows a shadow effect on the surface it hits
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_ON_GROUND_SEARCHLIGHT */
    switchOnGround(state: boolean): Searchlight;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Sequence */
declare class Sequence {
    constructor(handle: number);
    /** Begins a task sequence
    *
    * https://library.sannybuilder.com/#/sa?q=OPEN_SEQUENCE_TASK */
    static Open(): Sequence;
    /** Clears the task sequence
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_SEQUENCE_TASK */
    clear(): void;
    /** Ends the task sequence
    *
    * https://library.sannybuilder.com/#/sa?q=CLOSE_SEQUENCE_TASK */
    close(): Sequence;
    /** Sets whether the task sequence repeats continuously
    *
    * https://library.sannybuilder.com/#/sa?q=SET_SEQUENCE_TO_REPEAT */
    setToRepeat(state: boolean): Sequence;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Shopping */
interface Shopping {
    AddPriceModifier(itemId: int, modifier: int): void;
    /** Charges the player for the purchase of the item and in many cases, automatically gives the item to the player
    *
    * https://library.sannybuilder.com/#/sa?q=BUY_ITEM */
    BuyItem(itemId: int): void;
    /** Releases the loaded shopping data
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_LOADED_SHOP */
    ClearLoaded(): void;
    GetExtraInfo(itemId: int, flag: int): int;
    /** Returns an identifier for an item associated with the shopping data entry
    *
    * https://library.sannybuilder.com/#/sa?q=GET_ITEM_IN_SHOP */
    GetItem(nth: int): int;
    /** Returns the name of currently loaded subsection in shopping
    *
    * https://library.sannybuilder.com/#/sa?q=GET_LOADED_SHOP */
    GetLoaded(): string;
    GetNameOfItem(itemId: int): string;
    GetNumberOfItems(): int;
    GetPriceOfItem(itemId: int): int;
    /** Returns true if the shopping item has been bought
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_PLAYER_BOUGHT_ITEM */
    HasPlayerBoughtItem(itemId: int): boolean;
    Load(name: string): void;
    LoadPrices(sectionName: string): void;
    RemovePriceModifier(itemId: int): void;
}
declare var Shopping: Shopping
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Skip */
interface Skip {
    Clear(): void;
    /** Returns true if the trip skip created with 0A35 has finished teleporting the vehicle and is ready to allow the script to fade in
    *
    * https://library.sannybuilder.com/#/sa?q=IS_SKIP_WAITING_FOR_SCRIPT_TO_FADE_IN */
    IsWaitingForScriptToFadeIn(): boolean;
    /** Fades out the screen and teleports the player to the specified coordinates and angle
    *
    * https://library.sannybuilder.com/#/sa?q=SET_UP_SKIP */
    SetUp(x: float, y: float, z: float, heading: float): void;
    /** Fades the screen out and teleports the player to the specified coordinates and angle
    *
    * https://library.sannybuilder.com/#/sa?q=SET_UP_SKIP_AFTER_MISSION */
    SetUpAfterMission(x: float, y: float, z: float, heading: float): void;
    /** Teleports the player to the specified coordinates and sets the specified angle when in the specified car
    *
    * https://library.sannybuilder.com/#/sa?q=SET_UP_SKIP_FOR_SPECIFIC_VEHICLE */
    SetUpForSpecificVehicle(x: float, y: float, z: float, heading: float, handle: Car): void;
    /** Teleports the player to the specified coordinates and sets the specified angle with the screen fading in when in the specified car
    *
    * https://library.sannybuilder.com/#/sa?q=SET_UP_SKIP_FOR_VEHICLE_FINISHED_BY_SCRIPT */
    SetUpForVehicleFinishedByScript(x: float, y: float, z: float, heading: float, vehicle: Car): void;
}
declare var Skip: Skip
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Sound */
interface Sound {
    /** Plays a sound with the specified ID at the location
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_ONE_OFF_SOUND */
    AddOneOffSound(x: float, y: float, z: float, soundId: int): void;
}
declare var Sound: Sound
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Sphere */
declare class Sphere {
    constructor(handle: number);
    /** Creates a static sphere at the location, with the specified radius
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_SPHERE */
    static Create(x: float, y: float, z: float, radius: float): Sphere;
    /** Displays a red cylinder sphere
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_SPHERE */
    static Draw(x: float, y: float, z: float, radius: float): void;
    /** Destroys a static sphere
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_SPHERE */
    remove(): void;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Stat */
interface Stat {
    AwardPlayerMissionRespect(value: int): void;
    /** Decreases the stat by the value given
    *
    * https://library.sannybuilder.com/#/sa?q=DECREMENT_FLOAT_STAT */
    DecrementFloat(statId: int, value: float): void;
    /** Decreases the stat by the value given
    *
    * https://library.sannybuilder.com/#/sa?q=DECREMENT_INT_STAT */
    DecrementInt(statId: int, value: int): void;
    /** Gets the number of spraytags painted over
    *
    * https://library.sannybuilder.com/#/sa?q=FIND_NUMBER_TAGS_TAGGED */
    FindNumberTagsTagged(): int;
    /** Returns the value of the specified float stat
    *
    * https://library.sannybuilder.com/#/sa?q=GET_FLOAT_STAT */
    GetFloat(statId: int): float;
    /** Returns the value of the specified integer stat
    *
    * https://library.sannybuilder.com/#/sa?q=GET_INT_STAT */
    GetInt(statId: int): int;
    /** Gets the progress of completion as a percentage
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PROGRESS_PERCENTAGE */
    GetProgressPercentage(): float;
    GetTerritoryUnderControlPercentage(): int;
    /** Increases the stat by the value specified
    *
    * https://library.sannybuilder.com/#/sa?q=INCREMENT_FLOAT_STAT */
    IncrementFloat(statId: int, value: float): void;
    /** Adds the value to the specified stat
    *
    * https://library.sannybuilder.com/#/sa?q=INCREMENT_FLOAT_STAT_NO_MESSAGE */
    IncrementFloatNoMessage(statId: int, value: float): void;
    /** Increases the stat by the value given
    *
    * https://library.sannybuilder.com/#/sa?q=INCREMENT_INT_STAT */
    IncrementInt(statId: int, value: int): void;
    IncrementIntNoMessage(statId: int, value: int): void;
    /** Increases the progress made stat by the specified amount
    *
    * https://library.sannybuilder.com/#/sa?q=PLAYER_MADE_PROGRESS */
    PlayerMadeProgress(progress: int): void;
    /** Updates the race best position
    *
    * https://library.sannybuilder.com/#/sa?q=REGISTER_BEST_POSITION */
    RegisterBestPosition(statId: int, position: int): void;
    /** Updates the stat if the value is lower than the current stat value
    *
    * https://library.sannybuilder.com/#/sa?q=REGISTER_FASTEST_TIME */
    RegisterFastestTime(statId: int, value: int): void;
    /** Sets the specified stat to the specified value, if the specified value is greater than the current stat value
    *
    * https://library.sannybuilder.com/#/sa?q=REGISTER_FLOAT_STAT */
    RegisterFloat(statId: int, value: float): void;
    /** Updates the specified integer stat
    *
    * https://library.sannybuilder.com/#/sa?q=REGISTER_INT_STAT */
    RegisterInt(statId: int, value: int): void;
    /** Increments the number of mission attempts stat by one
    *
    * https://library.sannybuilder.com/#/sa?q=REGISTER_MISSION_GIVEN */
    RegisterMissionGiven(): void;
    /** Sets the GXT of the last mission passed
    *
    * https://library.sannybuilder.com/#/sa?q=REGISTER_MISSION_PASSED */
    RegisterMissionPassed(key: string): void;
    /** Sets the latest odd job mission passed
    *
    * https://library.sannybuilder.com/#/sa?q=REGISTER_ODDJOB_MISSION_PASSED */
    RegisterOddjobMissionPassed(): void;
    /** Sets the stat to the specified value
    *
    * https://library.sannybuilder.com/#/sa?q=SET_FLOAT_STAT */
    SetFloat(statId: int, value: float): void;
    /** Sets the stat to the specified value
    *
    * https://library.sannybuilder.com/#/sa?q=SET_INT_STAT */
    SetInt(statId: int, value: int): void;
    SetMissionRespectTotal(totalRespect: int): void;
    /** Sets the maximum progress the player can reach
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PROGRESS_TOTAL */
    SetProgressTotal(maxProgress: int): void;
    /** Sets the total number of missions that can be completed
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TOTAL_NUMBER_OF_MISSIONS */
    SetTotalNumberOfMissions(numMissions: int): void;
    /** Displays help boxes indicating that the players stats have been updated
    *
    * https://library.sannybuilder.com/#/sa?q=SHOW_UPDATE_STATS */
    ShowUpdateStats(state: boolean): void;
}
declare var Stat: Stat
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/StreamedScript */
interface StreamedScript {
    /** Makes the game start an ambient script when the player is nearby an object of the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=ALLOCATE_STREAMED_SCRIPT_TO_OBJECT */
    AllocateToObject(id: int, modelId: int, priority: int, radius: float, type: int): void;
    /** Makes the game start an ambient script when the player is nearby a character of the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=ALLOCATE_STREAMED_SCRIPT_TO_RANDOM_PED */
    AllocateToRandomPed(id: int, modelId: int, priority: int): void;
    /** Gets the number of instances of a script
    *
    * https://library.sannybuilder.com/#/sa?q=GET_NUMBER_OF_INSTANCES_OF_STREAMED_SCRIPT */
    GetNumberOfInstances(id: int): int;
    /** Returns true if the ambient script has finished loading (08A9)
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_STREAMED_SCRIPT_LOADED */
    HasLoaded(id: int): boolean;
    /** Ends the specified script brain
    *
    * https://library.sannybuilder.com/#/sa?q=MARK_STREAMED_SCRIPT_AS_NO_LONGER_NEEDED */
    MarkAsNoLongerNeeded(id: int): void;
    /** Registers a script brain for the specified ped attractor
    *
    * https://library.sannybuilder.com/#/sa?q=REGISTER_ATTRACTOR_SCRIPT_BRAIN_FOR_CODE_USE */
    RegisterAttractorScriptBrainForCodeUse(id: int, _p2: string): void;
    /** Sets the name for the script brain, enabling it to be initiated by the EXE
    *
    * https://library.sannybuilder.com/#/sa?q=REGISTER_SCRIPT_BRAIN_FOR_CODE_USE */
    RegisterScriptBrainForCodeUse(id: int, _p2: string): void;
    /** Releases the ambient script with the specified ID, freeing game memory
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_STREAMED_SCRIPT */
    Remove(id: int): void;
    /** Runs the ambient script with the specified ID
    *
    * https://library.sannybuilder.com/#/sa?q=START_NEW_STREAMED_SCRIPT */
    StartNew(id: int, ...args: number[]): void;
    /** Loads the ambient script with the specified ID from the script.img file
    *
    * https://library.sannybuilder.com/#/sa?q=STREAM_SCRIPT */
    Stream(id: int): void;
}
declare var StreamedScript: StreamedScript
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Streaming */
interface Streaming {
    /** Gets the current interior ID
    *
    * https://library.sannybuilder.com/#/sa?q=GET_AREA_VISIBLE */
    GetAreaVisible(): int;
    GetModelByName(name: string): int;
    GetModelDimensions(modelId: int): {
        leftBottomBackX: float;
        leftBottomBackY: float;
        leftBottomBackZ: float;
        rightTopFrontX: float;
        rightTopFrontY: float;
        rightTopFrontZ: float;
    };
    GetNameOfVehicleModel(modelId: int): string;
    GetRandomCarModelInMemory(_p1: boolean): {
        modelId: int;
        class: int;
    };
    /** Returns a slot the upgrade model is for
    *
    * https://library.sannybuilder.com/#/sa?q=GET_VEHICLE_MOD_TYPE */
    GetVehicleModType(modelId: int): int;
    /** Returns true if the specified IFP file is loaded
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_ANIMATION_LOADED */
    HasAnimationLoaded(animationFile: string): boolean;
    /** Returns true if the car recording has finished loading
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CAR_RECORDING_BEEN_LOADED */
    HasCarRecordingBeenLoaded(pathId: int): boolean;
    /** Returns true if the model is available for creation
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_MODEL_LOADED */
    HasModelLoaded(modelId: int): boolean;
    /** Returns true if the special character's model (023C) is available for creation
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_SPECIAL_CHARACTER_LOADED */
    HasSpecialCharacterLoaded(slotId: int): boolean;
    /** Returns true if the vehicle upgrade model has loaded
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_VEHICLE_MOD_LOADED */
    HasVehicleModLoaded(modelId: int): boolean;
    /** Returns true if the specified model exists in the loaded 
    *
    * https://library.sannybuilder.com/#/sa?q=IS_MODEL_AVAILABLE */
    IsModelAvailable(modelId: int): boolean;
    /** Returns true if a file for the model exists
    *
    * https://library.sannybuilder.com/#/sa?q=IS_MODEL_IN_CDIMAGE */
    IsModelInCdimage(modeId: int): boolean;
    /** Returns true if the model is the model of a boat
    *
    * https://library.sannybuilder.com/#/sa?q=IS_THIS_MODEL_A_BOAT */
    IsThisModelABoat(modelId: int): boolean;
    /** Returns true if a valid car model is passed
    *
    * https://library.sannybuilder.com/#/sa?q=IS_THIS_MODEL_A_CAR */
    IsThisModelACar(modelId: int): boolean;
    /** Returns true if the model is the model of a helicopter
    *
    * https://library.sannybuilder.com/#/sa?q=IS_THIS_MODEL_A_HELI */
    IsThisModelAHeli(modelId: int): boolean;
    /** Returns true if the model is the model of a plane
    *
    * https://library.sannybuilder.com/#/sa?q=IS_THIS_MODEL_A_PLANE */
    IsThisModelAPlane(modelId: int): boolean;
    /** Loads any requested models (0247 or 0353) synchronously
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_ALL_MODELS_NOW */
    LoadAllModelsNow(): void;
    /** Starts loading a specific location, just like if the player was there, removing LOD textures
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_SCENE */
    LoadScene(x: float, y: float, z: float): void;
    LoadSceneInDirection(x: float, y: float, z: float, heading: float): void;
    /** Requests a special character's model to be loaded into the specified slot
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_SPECIAL_CHARACTER */
    LoadSpecialCharacter(slotId: int, modelName: string): void;
    /** Releases the specified model, freeing game memory
    *
    * https://library.sannybuilder.com/#/sa?q=MARK_MODEL_AS_NO_LONGER_NEEDED */
    MarkModelAsNoLongerNeeded(modelId: int): void;
    /** Marks the vehicle upgrade model as no longer needed, allowing it to be unloaded by the streamer
    *
    * https://library.sannybuilder.com/#/sa?q=MARK_VEHICLE_MOD_AS_NO_LONGER_NEEDED */
    MarkVehicleModAsNoLongerNeeded(modelId: int): void;
    /** Releases the specified IFP file, freeing game memory
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_ANIMATION */
    RemoveAnimation(animationFile: string): void;
    /** Unloads the car recording
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_CAR_RECORDING */
    RemoveCarRecording(pathId: int): void;
    RemoveIpl(iplName: string): void;
    RemoveIplDiscreetly(iplName: string): void;
    /** Loads the specified IFP File
    *
    * https://library.sannybuilder.com/#/sa?q=REQUEST_ANIMATION */
    RequestAnimation(animationFile: string): void;
    /** Loads the specified car recording
    *
    * https://library.sannybuilder.com/#/sa?q=REQUEST_CAR_RECORDING */
    RequestCarRecording(pathId: int): void;
    /** Reloads the area at the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=REQUEST_COLLISION */
    RequestCollision(x: float, y: float): void;
    RequestIpl(iplName: string): void;
    /** Requests a new model to load
    *
    * https://library.sannybuilder.com/#/sa?q=REQUEST_MODEL */
    RequestModel(modelId: int): void;
    /** Loads the upgrade model and any associated models
    *
    * https://library.sannybuilder.com/#/sa?q=REQUEST_VEHICLE_MOD */
    RequestVehicleMod(modelId: int): void;
    /** Sets the visibility of an interior area
    *
    * https://library.sannybuilder.com/#/sa?q=SET_AREA_VISIBLE */
    SetAreaVisible(areaId: int): void;
    /** Sets the streaming of additional models like peds, cars, and maps
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_STREAMING */
    Switch(state: boolean): void;
    /** Releases the special character (023C), freeing game memory
    *
    * https://library.sannybuilder.com/#/sa?q=UNLOAD_SPECIAL_CHARACTER */
    UnloadSpecialCharacter(slotId: int): void;
}
declare var Streaming: Streaming
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/StuckCarCheck */
interface StuckCarCheck {
    /** Adds the vehicle to the stuck cars array
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_STUCK_CAR_CHECK */
    Add(vehicle: Car, speed: float, duration: int): void;
    /** Attempts to automatically restore vehicles that get stuck or flipped
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_STUCK_CAR_CHECK_WITH_WARP */
    AddWithWarp(vehicle: Car, speed: float, duration: int, stuck: boolean, flipped: boolean, warp: boolean, pathId: int): void;
    /** Returns true if the car is stuck
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_STUCK */
    IsCarStuck(vehicle: Car): boolean;
    /** Removes the vehicle from the stuck cars array
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_STUCK_CAR_CHECK */
    Remove(vehicle: Car): void;
}
declare var StuckCarCheck: StuckCarCheck
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Task */
interface Task {
    /** Rotates a character to the specified angle
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_ACHIEVE_HEADING */
    AchieveHeading(handle: Char, heading: float): void;
    /** Makes a character aim at another character
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_AIM_GUN_AT_CHAR */
    AimGunAtChar(char: Char, target: Char, time: int): void;
    /** Makes the character aim at the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_AIM_GUN_AT_COORD */
    AimGunAtCoord(handle: Char, x: float, y: float, z: float, time: int): void;
    CarDriveToCoord(driver: Char, vehicle: Car, x: float, y: float, z: float, speed: float, _p7: int, _p8: int, drivingStyle: int): void;
    /** Makes the character drive around aimlessly in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_CAR_DRIVE_WANDER */
    CarDriveWander(char: Char, vehicle: Car, speed: float, drivingStyle: int): void;
    /** Sets the car's current mission with various parameters
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_CAR_MISSION */
    CarMission(char: Char, vehicle: Car, targetVehicle: Car, missionId: int, cruiseSpeed: float, drivingStyle: int): void;
    CarTempAction(char: Char, vehicle: Car, actionId: int, time: int): void;
    /** Makes the character attempt to arrest another character
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_CHAR_ARREST_CHAR */
    CharArrestChar(char: Char, target: Char): void;
    CharSlideToCoord(handle: Char, x: float, y: float, z: float, angle: float, radius: float): void;
    /** Makes a character go to the specified point and play an anim
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_CHAR_SLIDE_TO_COORD_AND_PLAY_ANIM */
    CharSlideToCoordAndPlayAnim(handle: Char, x: float, y: float, z: float, angle: float, radius: float, animationName: string, animationFile: string, frameDelta: float, loop: boolean, lockX: boolean, lockY: boolean, lockF: boolean, time: int): void;
    /** Makes the character chat with another character
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_CHAT_WITH_CHAR */
    ChatWithChar(char: Char, other: Char, leadSpeaker: boolean, _p4: int): void;
    /** Makes the character jump and climb on an object
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_CLIMB */
    Climb(handle: Char, flag: boolean): void;
    ComplexPickupObject(char: Char, object: ScriptObject): void;
    /** Makes the actor stumble backwards with their arms in front of their face as if he is backing away from something in fear
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_COWER */
    Cower(handle: Char): void;
    /** Kills the character
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_DEAD */
    Dead(handle: Char): void;
    /** Makes the character attack a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_DESTROY_CAR */
    DestroyCar(char: Char, vehicle: Car): void;
    /** Kills the character
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_DIE */
    Die(handle: Char): void;
    /** Makes the actor perform an animation similarly to 0605
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_DIE_NAMED_ANIM */
    DieNamedAnim(handle: Char, animationName: string, animationFile: string, frameDelta: float, time: int): void;
    /** Makes the character perform a dive in the specified direction
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_DIVE_AND_GET_UP */
    DiveAndGetUp(handle: Char, directionX: float, directionY: float, timeOnGround: int): void;
    DiveFromAttachmentAndGetUp(handle: Char, time: int): void;
    DriveBy(handle: Char, targetChar: Char, targetVehicle: Car, x: float, y: float, z: float, radius: float, style: int, rightHandCarSeat: boolean, fireRate: int): void;
    DrivePointRoute(char: Char, vehicle: Car, speed: int): void;
    DrivePointRouteAdvanced(char: Char, vehicle: Car, speed: float, _p4: int, _p5: int, _p6: int): void;
    /** Makes a character duck with their arms over head
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_DUCK */
    Duck(handle: Char, time: int): void;
    /** Makes a character approach the car and occupy the driver seat
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_ENTER_CAR_AS_DRIVER */
    EnterCarAsDriver(char: Char, vehicle: Car, time: int): void;
    /** Makes a character approach the car and occupy the specified passenger seat
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_ENTER_CAR_AS_PASSENGER */
    EnterCarAsPassenger(char: Char, vehicle: Car, time: int, seatId: int): void;
    /** Makes actor fall to the ground and stay there for the specified time
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_FALL_AND_GET_UP */
    FallAndGetUp(handle: Char, fallDown: boolean, timeOnGround: int): void;
    /** Makes the character run away from another character
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_FLEE_CHAR */
    FleeChar(handle: Char, threat: Char, radius: float, time: int): void;
    FleeCharAnyMeans(handle: Char, threat: Char, runDistance: float, time: int, changeCourse: boolean, _p6: int, _p7: int, radius: float): void;
    /** Makes the character run away from a point, scared and often screaming
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_FLEE_POINT */
    FleePoint(handle: Char, x: float, y: float, z: float, radius: float, time: int): void;
    /** Makes one actor follow another
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_FOLLOW_FOOTSTEPS */
    FollowFootsteps(handle: Char, target: Char): void;
    /** Makes the character go to the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_FOLLOW_PATH_NODES_TO_COORD */
    FollowPathNodesToCoord(handle: Char, x: float, y: float, z: float, walkSpeed: int, time: int): void;
    /** Makes the specified character run in panic to the specified position
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_FOLLOW_PATH_NODES_TO_COORD_WITH_RADIUS */
    FollowPathNodesToCoordWithRadius(handle: Char, x: float, y: float, z: float, mode: int, time: int, radius: float): void;
    /** Assigns the character to the patrol path
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_FOLLOW_PATROL_ROUTE */
    FollowPatrolRoute(handle: Char, walkSpeed: int, routeMode: int): void;
    /** Makes the character follow the path route
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_FOLLOW_POINT_ROUTE */
    FollowPointRoute(handle: Char, walkSpeed: int, flag: int): void;
    /** Makes the character walk to the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_GO_STRAIGHT_TO_COORD */
    GoStraightToCoord(handle: Char, x: float, y: float, z: float, moveState: int, time: int): void;
    /** Assigns the character the task of getting to the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_GO_TO_COORD_ANY_MEANS */
    GoToCoordAnyMeans(char: Char, x: float, y: float, z: float, walkSpeed: int, vehicle: Car): void;
    GoToCoordWhileAiming(char: Char, x: float, y: float, z: float, mode: int, turnRadius: float, stopRadius: float, target: Char, xOffset: float, yOffset: float, zOffset: float): void;
    /** Makes a character go to the location while shooting at another character
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_GO_TO_COORD_WHILE_SHOOTING */
    GoToCoordWhileShooting(char: Char, x: float, y: float, z: float, mode: int, turnRadius: float, stopRadius: float, target: Char): void;
    /** Makes the character go to an object
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_GO_TO_OBJECT */
    GoToObject(char: Char, object: ScriptObject, time: int, radius: float): void;
    GotoCar(char: Char, vehicle: Car, time: int, radius: float): void;
    /** Approaches the character from any direction within the specified radius
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_GOTO_CHAR */
    GotoChar(walking: Char, target: Char, time: int, radius: float): void;
    GotoCharAiming(handle: Char, target: Char, radiusFrom: float, radiusTo: float): void;
    /** Approaches the char at the specified offset, specified by the radius and angle
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_GOTO_CHAR_OFFSET */
    GotoCharOffset(char: Char, target: Char, time: int, radius: float, heading: float): void;
    /** Makes a character greet another character with a handshake
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_GREET_PARTNER */
    GreetPartner(handle: Char, partner: Char, _p3: float, _p4: int): void;
    /** Makes a character face the other character and make a gesture
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_HAND_GESTURE */
    HandGesture(handle: Char, target: Char): void;
    /** Makes the actor put their hands in the air
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_HANDS_UP */
    HandsUp(handle: Char, time: int): void;
    Jetpack(handle: Char): void;
    /** Makes the actor perform a jump
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_JUMP */
    Jump(handle: Char, state: boolean): void;
    /** Makes a character attack another character on foot
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_KILL_CHAR_ON_FOOT */
    KillCharOnFoot(killer: Char, target: Char): void;
    /** Makes the character attack the specified character
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_KILL_CHAR_ON_FOOT_TIMED */
    KillCharOnFootTimed(handle: Char, target: Char, time: int): void;
    KillCharOnFootWhileDucking(char: Char, target: Char, flags: int, actionDelay: int, actionChance: int): void;
    /** Makes the character stay near their current position
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_KINDA_STAY_IN_SAME_PLACE */
    KindaStayInSamePlace(handle: Char, state: boolean): void;
    /** Makes the actor exit the car, if he is in one
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_LEAVE_ANY_CAR */
    LeaveAnyCar(handle: Char): void;
    /** Makes the character exit the specified vehicle, if they are currently in it
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_LEAVE_CAR */
    LeaveCar(char: Char, vehicle: Car): void;
    /** Makes the character exit the vehicle and flee to the specified position
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_LEAVE_CAR_AND_FLEE */
    LeaveCarAndFlee(char: Char, vehicle: Car, x: float, y: float, z: float): void;
    /** Makes the character jump out of the vehicle while it is in motion
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_LEAVE_CAR_IMMEDIATELY */
    LeaveCarImmediately(char: Char, vehicle: Car): void;
    /** Makes a character look out ahead
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_LOOK_ABOUT */
    LookAbout(handle: Char, time: int): void;
    /** Makes the character look at another character
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_LOOK_AT_CHAR */
    LookAtChar(observer: Char, target: Char, time: int): void;
    /** Makes the actor look at the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_LOOK_AT_COORD */
    LookAtCoord(handle: Char, x: float, y: float, z: float, time: int): void;
    /** Makes the character look at an object
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_LOOK_AT_OBJECT */
    LookAtObject(char: Char, object: ScriptObject, time: int): void;
    /** Makes the actor look at the specified vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_LOOK_AT_VEHICLE */
    LookAtVehicle(char: Char, vehicle: Car, time: int): void;
    /** Makes the character pause for the specified amount of time
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_PAUSE */
    Pause(handle: Char, time: int): void;
    /** Attaches the specified actor to an object with the optional addition of having it perform an animation
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_PICK_UP_OBJECT */
    PickUpObject(char: Char, object: ScriptObject, xOffset: float, yOffset: float, zOffset: float, boneId: int, _p7: int, animationName: string, animationFile: string, time: int): void;
    PickUpSecondObject(char: Char, object: ScriptObject, xOffset: float, yOffset: float, zOffset: float, boneId: int, _p7: int, animationName: string, animationFile: string, time: int): void;
    /** Makes the character perform an animation
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_PLAY_ANIM */
    PlayAnim(handle: Char, animationName: string, animationFile: string, frameDelta: float, loop: boolean, lockX: boolean, lockY: boolean, lockF: boolean, time: int): void;
    /** Makes the character perform an animation
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_PLAY_ANIM_NON_INTERRUPTABLE */
    PlayAnimNonInterruptable(handle: Char, animationName: string, animationFile: string, frameDelta: float, loop: boolean, lockX: boolean, lockY: boolean, lockF: boolean, time: int): void;
    /** Makes a character play an animation that affects only the upper half of their body
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_PLAY_ANIM_SECONDARY */
    PlayAnimSecondary(handle: Char, animationFile: string, animationName: string, frameDelta: float, loop: boolean, lockX: boolean, lockY: boolean, lockF: boolean, time: int): void;
    /** Makes the actor perform an animation
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_PLAY_ANIM_WITH_FLAGS */
    PlayAnimWithFlags(handle: Char, animationName: string, animationFile: string, frameDelta: float, loop: boolean, lockX: boolean, lockY: boolean, lockF: boolean, time: int, disableForce: boolean, disableLockZ: boolean): void;
    /** Makes the character say a phrase from the specified audio table
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_SAY */
    Say(handle: Char, phraseId: int): void;
    /** Makes a character scratch their head while looking around
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_SCRATCH_HEAD */
    ScratchHead(handle: Char): void;
    /** Sets the decision maker used by the specified actor
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_SET_CHAR_DECISION_MAKER */
    SetCharDecisionMaker(char: Char, decisionMakerChar: DecisionMakerChar): void;
    SetIgnoreWeaponRangeFlag(handle: Char, state: boolean): void;
    /** Makes the actor lift their hand up in the air angrily
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_SHAKE_FIST */
    ShakeFist(handle: Char): void;
    ShootAtChar(handle: Char, target: Char, time: int): void;
    /** Makes the character turn round and shoot at the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_SHOOT_AT_COORD */
    ShootAtCoord(handle: Char, x: float, y: float, z: float, time: int): void;
    /** Makes the character move to the seat on the right
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_SHUFFLE_TO_NEXT_CAR_SEAT */
    ShuffleToNextCarSeat(char: Char, vehicle: Car): void;
    /** Makes the actor sit down for the specified amount of time
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_SIT_DOWN */
    SitDown(handle: Char, time: int): void;
    /** Makes the character flee from another character
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_SMART_FLEE_CHAR */
    SmartFleeChar(handle: Char, threat: Char, radius: float, time: int): void;
    /** Makes the character run away from the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_SMART_FLEE_POINT */
    SmartFleePoint(handle: Char, x: float, y: float, z: float, radius: float, time: int): void;
    /** Makes the character stand still
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_STAND_STILL */
    StandStill(handle: Char, time: int): void;
    /** Makes the character stay in the same place
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_STAY_IN_SAME_PLACE */
    StayInSamePlace(handle: Char, state: boolean): void;
    SwimToCoord(handle: Char, x: float, y: float, z: float): void;
    /** Makes the actor stop to regain breath
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_TIRED */
    Tired(handle: Char, time: int): void;
    /** Makes the character crouch
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_TOGGLE_DUCK */
    ToggleDuck(handle: Char, state: boolean): void;
    TogglePedThreatScanner(handle: Char, _p2: boolean, _p3: boolean, _p4: boolean): void;
    /** Makes a character face another character
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_TURN_CHAR_TO_FACE_CHAR */
    TurnCharToFaceChar(char: Char, target: Char): void;
    TurnCharToFaceCoord(handle: Char, x: float, y: float, z: float): void;
    /** Makes a character use an ATM machine
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_USE_ATM */
    UseAtm(handle: Char): void;
    UseAttractor(char: Char, attractor: Attractor): void;
    UseClosestMapAttractor(handle: Char, radius: float, modelId: int, fromX: float, fromY: float, fromZ: float, name: string): void;
    /** Makes a character pull out a cellphone, answer it, and hold it to their ear
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_USE_MOBILE_PHONE */
    UseMobilePhone(handle: Char, start: boolean): void;
    /** Makes the character walk alongside the specified character
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_WALK_ALONGSIDE_CHAR */
    WalkAlongsideChar(handle: Char, target: Char): void;
    /** Makes the character walk around the ped path
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_WANDER_STANDARD */
    WanderStandard(handle: Char): void;
    /** Warps the character into the specified vehicle's driver seat
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_WARP_CHAR_INTO_CAR_AS_DRIVER */
    WarpCharIntoCarAsDriver(char: Char, vehicle: Car): void;
    WarpCharIntoCarAsPassenger(char: Char, vehicle: Car, seatId: int): void;
    WeaponRoll(handle: Char, direction: boolean): void;
}
declare var Task: Task
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Text */
interface Text {
    AddLabel(dynamicKey: string, text: string): void;
    /** Sets whether the next text is added to the brief in the menu
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_NEXT_MESSAGE_TO_PREVIOUS_BRIEFS */
    AddNextMessageToPreviousBriefs(state: boolean): void;
    /** Removes the text box from the screen
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_HELP */
    ClearHelp(): void;
    /** Clears all priority text and some styles of big texts
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_PRINTS */
    ClearPrints(): void;
    /** Clears small messages from the screen
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_SMALL_PRINTS */
    ClearSmallPrints(): void;
    /** Removes the styled text from the screen
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_THIS_BIG_PRINT */
    ClearThisBigPrint(key: string): void;
    /** Removes the priority text from the screen
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_THIS_PRINT */
    ClearThisPrint(key: string): void;
    /** Removes the print big text with the specified style from the screen
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_THIS_PRINT_BIG_NOW */
    ClearThisPrintBigNow(textStyle: int): void;
    /** Draws text at the specified on-screen position
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_TEXT */
    Display(offsetLeft: float, offsetTop: float, key: string): void;
    /** Overrides the text block set by 09BD
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_NON_MINIGAME_HELP_MESSAGES */
    DisplayNonMinigameHelpMessages(state: boolean): void;
    /** Draws text with two numbers
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_TEXT_WITH_2_NUMBERS */
    DisplayWith2Numbers(offsetLeft: float, offsetTop: float, key: string, num1: int, num2: int): void;
    /** Converts the float to two separate numbers to use in a 2-numbered GXT entry, and draws the text
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_TEXT_WITH_FLOAT */
    DisplayWithFloat(leftTopX: float, leftTopY: float, key: string, value: float, precision: int): void;
    /** Draws text with one number
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_TEXT_WITH_NUMBER */
    DisplayWithNumber(offsetLeft: float, offsetTop: float, key: string, num: int): void;
    /** Sets whether the styled text stays on the screen when it fades out
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_ODDJOB_TITLE_BEFORE_FADE */
    DrawOddjobTitleBeforeFade(state: boolean): void;
    /** Sets whether the text stays on the screen when it fades out
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_SUBTITLES_BEFORE_FADE */
    DrawSubtitlesBeforeFade(state: boolean): void;
    /** Prevents timers and big texts from being hidden if there is another conflicting type of text on screen
    *
    * https://library.sannybuilder.com/#/sa?q=FORCE_BIG_MESSAGE_AND_COUNTER */
    ForceBigMessageAndCounter(state: boolean): void;
    GetLabelString(key: string): string;
    /** Returns the string length
    *
    * https://library.sannybuilder.com/#/sa?q=GET_STRING_LENGTH */
    GetStringLength(text: string): int;
    /** Gets the width of the GXT entry string with the specified number
    *
    * https://library.sannybuilder.com/#/sa?q=GET_STRING_WIDTH_WITH_NUMBER */
    GetStringWidthWithNumber(gxtEntry: string, number: int): float;
    /** Returns true if any help message is being displayed
    *
    * https://library.sannybuilder.com/#/sa?q=IS_HELP_MESSAGE_BEING_DISPLAYED */
    IsHelpMessageBeingDisplayed(): boolean;
    /** Returns true if a priority GXT string is displayed on screen
    *
    * https://library.sannybuilder.com/#/sa?q=IS_MESSAGE_BEING_DISPLAYED */
    IsMessageBeingDisplayed(): boolean;
    /** Returns true if a help message with the specified GXT entry is being displayed
    *
    * https://library.sannybuilder.com/#/sa?q=IS_THIS_HELP_MESSAGE_BEING_DISPLAYED */
    IsThisHelpMessageBeingDisplayed(gxt: string): boolean;
    /** Makes the game use GXT Entries from the specified GXT Table
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_MISSION_TEXT */
    LoadMissionText(tableName: string): void;
    /** Displays a message positioned on the bottom of the screen for the specified time
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT */
    Print(key: string, time: int, flag: int): void;
    /** Displays a styled message for the specified time
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_BIG */
    PrintBig(key: string, time: int, style: int): void;
    /** Displays a styled message for the specified time respecting the format of the String entered
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_BIG_FORMATTED */
    PrintBigFormatted(text: string, time: int, style: int, ...args: number[]): void;
    /** Displays a low-priority styled message for the specified time
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_BIG_Q */
    PrintBigQ(key: string, duration: int, style: int): void;
    PrintBigString(text: string, time: int, style: int): void;
    PrintFormatted(text: string, time: int, ...arg: number[]): void;
    PrintFormattedNow(text: string, time: int, ...arg: number[]): void;
    /** Displays a black text box for a few seconds
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_HELP */
    PrintHelp(key: string): void;
    /** Shows a text box which stays on screen until it is removed by another command
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_HELP_FOREVER */
    PrintHelpForever(key: string): void;
    /** Shows a text box with one number
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_HELP_FOREVER_WITH_NUMBER */
    PrintHelpForeverWithNumber(gxt: string, number: int): void;
    /** Displays a black text box for a few seconds respecting the format of the String entered
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_HELP_FORMATTED */
    PrintHelpFormatted(text: string, ...args: number[]): void;
    PrintHelpString(text: string): void;
    /** Displays a message positioned on the bottom of the screen for the specified time
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_NOW */
    PrintNow(key: string, time: int, flag: int): void;
    /** Displays the text (provided as a string literal or an address) similarly to 00BB
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_STRING */
    PrintString(text: string, time: int): void;
    /** Displays a styled message in which the first string token ~a~ is substituted with the specified text
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_STRING_IN_STRING_NOW */
    PrintStringInStringNow(templateKey: string, replacementKey: string, duration: int, style: int): void;
    PrintStringNow(text: string, time: int): void;
    /** Displays a styled message in which the first two ~1~ tokens are substituted with the specified numbers
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_WITH_2_NUMBERS_BIG */
    PrintWith2NumbersBig(key: string, num1: int, num2: int, duration: int, style: int): void;
    /** Displays a styled message in which the first two ~1~ tokens are substituted with the specified numbers
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_WITH_2_NUMBERS_NOW */
    PrintWith2NumbersNow(key: string, num1: int, num2: int, duration: int, style: int): void;
    /** Displays a styled message in which the first three ~1~ tokens are substituted with the specified numbers
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_WITH_3_NUMBERS */
    PrintWith3Numbers(key: string, num1: int, num2: int, num3: int, duration: int, style: int): void;
    /** Displays a styled message in which the first four ~1~ tokens are substituted with the specified numbers
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_WITH_4_NUMBERS */
    PrintWith4Numbers(key: string, num1: int, num2: int, num3: int, num4: int, duration: int, style: int): void;
    /** Displays a styled message in which the first four ~1~ tokens are substituted with the specified numbers
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_WITH_4_NUMBERS_NOW */
    PrintWith4NumbersNow(key: string, num1: int, num2: int, num3: int, num4: int, duration: int, style: int): void;
    /** Displays a styled message in which the first six ~1~ tokens are substituted with the specified numbers
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_WITH_6_NUMBERS */
    PrintWith6Numbers(key: string, num1: int, num2: int, num3: int, num4: int, num5: int, num6: int, duration: int, style: int): void;
    /** Displays a styled message in which the first string token ~1~ is substituted with the specified number
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_WITH_NUMBER */
    PrintWithNumber(key: string, num: int, duration: int, flag: int): void;
    /** Displays a styled message in which the first string token~1~ is substituted with the specified number
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_WITH_NUMBER_BIG */
    PrintWithNumberBig(key: string, num: int, duration: int, style: int): void;
    /** Displays a styled message in which the first string token ~1~ is substituted with the specified number
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_WITH_NUMBER_NOW */
    PrintWithNumberNow(key: string, num: int, duration: int, flag: int): void;
    RemoveLabel(dynamicKey: string): void;
    ScanString(str: string, format: string, ...args: number[]): string;
    /** Displays the text of the specified GXT entry using San Andreas' area name text style
    *
    * https://library.sannybuilder.com/#/sa?q=SET_AREA_NAME */
    SetAreaName(name: string): void;
    /** Gives the text a background (0346)
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TEXT_BACKGROUND */
    SetBackground(state: boolean): void;
    /** Centers the text
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TEXT_CENTRE */
    SetCenter(state: boolean): void;
    /** Sets the line width of the centered text
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TEXT_CENTRE_SIZE */
    SetCenterSize(width: float): void;
    /** Sets the color of the text letters
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TEXT_COLOUR */
    SetColor(red: int, green: int, blue: int, alpha: int): void;
    /** Causes the next text to be drawn before the fade is drawn
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TEXT_DRAW_BEFORE_FADE */
    SetDrawBeforeFade(state: boolean): void;
    /** Sets shadow for the current text draw
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TEXT_DROPSHADOW */
    SetDropshadow(intensity: int, red: int, green: int, blue: int, alpha: int): void;
    /** Adds an outline to the next text drawn using a text draw command
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TEXT_EDGE */
    SetEdge(size: int, red: int, green: int, blue: int, alpha: int): void;
    /** Sets the text draw font
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TEXT_FONT */
    SetFont(font: int): void;
    /** Sets the global width of text boxes displayed on screen
    *
    * https://library.sannybuilder.com/#/sa?q=SET_HELP_MESSAGE_BOX_SIZE */
    SetHelpMessageBoxSize(size: int): void;
    /** Sets the text to be drawn justified, which means the text will wrap in order to fill an even rectangle of space
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TEXT_JUSTIFY */
    SetJustify(state: boolean): void;
    /** Overrides the position of the text on screen
    *
    * https://library.sannybuilder.com/#/sa?q=SET_MESSAGE_FORMATTING */
    SetMessageFormatting(_p1: boolean, margin: int, width: int): void;
    /** Makes the text size proportionate
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TEXT_PROPORTIONAL */
    SetProportional(state: boolean): void;
    /** Sets the text draw to be aligned to the right
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TEXT_RIGHT_JUSTIFY */
    SetRightJustify(state: boolean): void;
    /** Scales the width and height of the text letters
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TEXT_SCALE */
    SetScale(widthScale: float, heightScale: float): void;
    /** Sets the line width of the text
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TEXT_WRAPX */
    SetWrapX(width: float): void;
    StringFloatFormat(number: float, format: string): string;
    StringFormat(format: string, ...args: number[]): string;
    /** Enables text and texture drawing
    *
    * https://library.sannybuilder.com/#/sa?q=USE_TEXT_COMMANDS */
    UseCommands(state: boolean): void;
}
declare var Text: Text
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Train */
declare class Train {
    constructor(handle: number);
    /** Creates a script handled train from a predefined type (the type dictates how long the train is and the varieties of carriages) and sets the direction for the train to head in
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_MISSION_TRAIN */
    static Create(type: int, x: float, y: float, z: float, direction: boolean): Train;
    /** Removes the specified script created train
    *
    * https://library.sannybuilder.com/#/sa?q=DELETE_MISSION_TRAIN */
    delete(): void;
    /** Returns true if the train is travelling clockwise, around San Andreas
    *
    * https://library.sannybuilder.com/#/sa?q=FIND_TRAIN_DIRECTION */
    findDirection(): boolean;
    /** Gets the handle of the last carriage (known as the "caboose")
    *
    * https://library.sannybuilder.com/#/sa?q=GET_TRAIN_CABOOSE */
    getCaboose(): Car;
    /** Gets the nth train carriage
    *
    * https://library.sannybuilder.com/#/sa?q=GET_TRAIN_CARRIAGE */
    getCarriage(number: int): Car;
    /** Returns true if the train has derailed (usually from going too fast)
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_TRAIN_DERAILED */
    hasDerailed(): boolean;
    /** Returns true if the next station is accessible (at the start of the game, railroad blocks prevent the player from travelling to stations whose area is not unlocked)
    *
    * https://library.sannybuilder.com/#/sa?q=IS_NEXT_STATION_ALLOWED */
    isNextStationAllowed(): boolean;
    /** Removes the specified script created train from the list of trains that the game shouldn't delete
    *
    * https://library.sannybuilder.com/#/sa?q=MARK_MISSION_TRAIN_AS_NO_LONGER_NEEDED */
    markAsNoLongerNeeded(): Train;
    /** Puts the train on the rails nearest to the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=SET_MISSION_TRAIN_COORDINATES */
    setCoordinates(x: float, y: float, z: float): Train;
    /** Sets the trains speed
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TRAIN_CRUISE_SPEED */
    setCruiseSpeed(speed: float): Train;
    /** Sets whether the train should stop at each station it encounters
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TRAIN_FORCED_TO_SLOW_DOWN */
    setForcedToSlowDown(state: boolean): Train;
    /** Sets the trains acceleration
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TRAIN_SPEED */
    setSpeed(speed: float): Train;
    /** Puts the script created train at the next allowed station
    *
    * https://library.sannybuilder.com/#/sa?q=SKIP_TO_NEXT_ALLOWED_STATION */
    skipToNextAllowedStation(): Train;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Txd */
interface Txd {
    /** Draws RwTexture or sprite ID once on specific drawing event and optional mask, no limits
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_TEXTURE_PLUS */
    DrawTexturePlus(rwTextureOrSprite: int, drawEvent: int, posX: float, posY: float, sizeX: float, sizeY: float, angle: float, depth: float, fixAr: boolean, maskVertCount: int, maskVertArray: int, red: int, green: int, blue: int, alpha: int): void;
    /** Loads the texture dictionary for use in drawing sprites (038D) on the screen
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_TEXTURE_DICTIONARY */
    LoadDictionary(name: string): void;
    /** Loads a sprite from the most recently loaded texture dictionary (0390)
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_SPRITE */
    LoadSprite(memorySlot: int, spriteName: string): void;
    /** Unloads all currently loaded textures (038F), as well as texture dictionaries (0390), freeing game memory
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_TEXTURE_DICTIONARY */
    Remove(): void;
}
declare var Txd: Txd
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/User3DMarker */
declare class User3DMarker {
    constructor(handle: number);
    /** Creates a marker similar to the yellow enex markers
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_USER_3D_MARKER */
    static Create(x: float, y: float, z: float, color: int): User3DMarker;
    /** Destroys a marker created with 0A40
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_USER_3D_MARKER */
    remove(): void;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Weapon */
interface Weapon {
    /** Gets the model ID of the weapon according to the weapon type
    *
    * https://library.sannybuilder.com/#/sa?q=GET_WEAPONTYPE_MODEL */
    GetModel(weaponType: int): int;
    GetSlot(weaponType: int): int;
    /** Checks if the weapon has the specified fire type
    *
    * https://library.sannybuilder.com/#/sa?q=IS_WEAPON_FIRE_TYPE */
    IsFireType(weaponType: int, weaponFire: int): boolean;
}
declare var Weapon: Weapon
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Weather */
interface Weather {
    /** Forces the game weather to the specified type
    *
    * https://library.sannybuilder.com/#/sa?q=FORCE_WEATHER */
    Force(type: int): void;
    /** Forces the upcoming weather to the specified type
    *
    * https://library.sannybuilder.com/#/sa?q=FORCE_WEATHER_NOW */
    ForceNow(type: int): void;
    /** Gets weather type that is being blended from
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CURRENT_WEATHER */
    GetCurrent(): int;
    /** Gets weather type that is being blended to
    *
    * https://library.sannybuilder.com/#/sa?q=GET_NEXT_WEATHER */
    GetNext(): int;
    /** Gets rain intensity in range of 0.0 to 1.0
    *
    * https://library.sannybuilder.com/#/sa?q=GET_RAIN_INTENSITY */
    GetRainIntensity(): float;
    /** Allows the game to continue its usual weather pattern after using 01B5
    *
    * https://library.sannybuilder.com/#/sa?q=RELEASE_WEATHER */
    Release(): void;
    /** Specifies whether the heat haze effect should be enabled in sunny conditions
    *
    * https://library.sannybuilder.com/#/sa?q=SET_HEATHAZE_EFFECT */
    SetHeathazeEffect(state: boolean): void;
    /** Sets weather type which will be blend to
    *
    * https://library.sannybuilder.com/#/sa?q=SET_NEXT_WEATHER */
    SetNext(type: int): void;
    /** Sets rain intensity in range of 0.0 to 1.0
    *
    * https://library.sannybuilder.com/#/sa?q=SET_RAIN_INTENSITY */
    SetRainIntensity(intensity: float): void;
    /** Sets the current weather ID according to the game clock and the players current town number
    *
    * https://library.sannybuilder.com/#/sa?q=SET_WEATHER_TO_APPROPRIATE_TYPE_NOW */
    SetToAppropriateTypeNow(): void;
}
declare var Weather: Weather
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/World */
interface World {
    /** Returns the handle of a random car with the specified model in the specified 2D area, or -1 otherwise
    *
    * https://library.sannybuilder.com/#/sa?q=GET_RANDOM_CAR_OF_TYPE_IN_AREA */
    GetRandomCarOfTypeInArea(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, modelId: int): Car;
    /** Returns the character using a map attractor with the specified model in the specified area
    *
    * https://library.sannybuilder.com/#/sa?q=GET_USER_OF_CLOSEST_MAP_ATTRACTOR */
    GetUserOfClosestMapAttractor(x: float, y: float, z: float, radius: float, modelId: int, attractorName: string): Char;
    /** Creates a trigger zone for police to appear during chases
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_SET_PIECE */
    AddSetPiece(type: int, fromX: float, fromY: float, toX: float, toY: float, spawnPoliceAAtX: float, spawnPoliceAAtY: float, headedTowardsAAtX: float, headedTowardsAAtY: float, spawnPoliceBAtX: float, spawnPoliceBAtY: float, headedTowardsBAtX: float, headedTowardsBAtY: float): void;
    /** Creates a trigger for a Unique Jump bonus
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_STUNT_JUMP */
    AddStuntJump(startX: float, startY: float, startZ: float, startRadiusX: float, startRadiusY: float, startRadiusZ: float, finishX: float, finishY: float, finishZ: float, finishRadiusX: float, finishRadiusY: float, finishRadiusZ: float, cameraX: float, cameraY: float, cameraZ: float, reward: int): void;
    /** Marks all fires as no longer needed, allowing them to disappear
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_ALL_SCRIPT_FIRE_FLAGS */
    ClearAllScriptFireFlags(): void;
    /** Removes references to all created roadblocks, freeing game memory
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_ALL_SCRIPT_ROADBLOCKS */
    ClearAllScriptRoadblocks(): void;
    /** Clears the area, removing all vehicles and pedestrians
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_AREA */
    ClearArea(x: float, y: float, z: float, radius: float, clearParticles: boolean): void;
    /** Clears all cars in the specified 3D area
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_AREA_OF_CARS */
    ClearAreaOfCars(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): void;
    /** Clears all pedestrians from the given area
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_AREA_OF_CHARS */
    ClearAreaOfChars(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): void;
    /** Clears the extra color of the sky
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_EXTRA_COLOURS */
    ClearExtraColors(withFade: boolean): void;
    /** Creates a flock of birds flying in the specified direction
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_BIRDS */
    CreateBirds(xFrom: float, yFrom: float, zFrom: float, xTo: float, yTo: float, zTo: float, quantity: int, type: int): void;
    /** Creates an emergency service vehicle on the closest road to the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_EMERGENCY_SERVICES_CAR */
    CreateEmergencyServicesCar(model: int, x: float, y: float, z: float): void;
    /** Starts spawning random cars at the specified location
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_RANDOM_CAR_FOR_CAR_PARK */
    CreateRandomCarForCarPark(x: float, y: float, z: float, heading: float): void;
    /** Creates a roadblock in the specified area with the specified type
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_SCRIPT_ROADBLOCK */
    CreateScriptRoadblock(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, type: int): void;
    /** Destroys all trains, including those that are not created by the script
    *
    * https://library.sannybuilder.com/#/sa?q=DELETE_ALL_TRAINS */
    DeleteAllTrains(): void;
    /** Destroys all script-created trains
    *
    * https://library.sannybuilder.com/#/sa?q=DELETE_MISSION_TRAINS */
    DeleteMissionTrains(): void;
    /** Disables all entry/exit markers
    *
    * https://library.sannybuilder.com/#/sa?q=DISABLE_ALL_ENTRY_EXITS */
    DisableAllEntryExits(state: boolean): void;
    /** Sets whether cops will chase and kill criminals when their task is 'TASK_COMPLEX_KILL_CRIMINAL'
    *
    * https://library.sannybuilder.com/#/sa?q=ENABLE_AMBIENT_CRIME */
    EnableAmbientCrime(state: boolean): void;
    /** Switches enex markers used for burglary missions on or off
    *
    * https://library.sannybuilder.com/#/sa?q=ENABLE_BURGLARY_HOUSES */
    EnableBurglaryHouses(state: boolean): void;
    /** Removes all fires within the specified area
    *
    * https://library.sannybuilder.com/#/sa?q=EXTINGUISH_FIRE_AT_POINT */
    ExtinguishFireAtPoint(x: float, y: float, z: float, radius: float): void;
    FireSingleBullet(fromX: float, fromY: float, fromZ: float, toX: float, toY: float, toZ: float, energy: int): void;
    /** Returns the town the specified location is within
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CITY_FROM_COORDS */
    GetCityFromCoords(x: float, y: float, z: float): int;
    /** Gets the closest object which can be stolen for burglary missions
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CLOSEST_STEALABLE_OBJECT */
    GetClosestStealableObject(x: float, y: float, z: float, radius: float): ScriptObject;
    /** Returns appropriate coordinates for creating a pickup by a dead character
    *
    * https://library.sannybuilder.com/#/sa?q=GET_DEAD_CHAR_PICKUP_COORDS */
    GetDeadCharPickupCoords(char: Char): {
        x: float;
        y: float;
        z: float;
    };
    /** Stores the ground position at the location
    *
    * https://library.sannybuilder.com/#/sa?q=GET_GROUND_Z_FOR_3D_COORD */
    GetGroundZFor3DCoord(x: float, y: float, z: float): float;
    GetNearestTagPosition(xCoord: float, yCoord: float, zCoord: float): {
        x: float;
        y: float;
        z: float;
    };
    /** Gets the number of fires within the specified area
    *
    * https://library.sannybuilder.com/#/sa?q=GET_NUMBER_OF_FIRES_IN_AREA */
    GetNumberOfFiresInArea(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): int;
    GetNumberOfFiresInRange(x: float, y: float, z: float, radius: float): int;
    /** Stores the coordinates of the nearest car park node in the specified area
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PARKING_NODE_IN_AREA */
    GetParkingNodeInArea(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): {
        x: float;
        y: float;
        z: float;
    };
    /** Gets the percentage of the number of tags sprayed in the area
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PERCENTAGE_TAGGED_IN_AREA */
    GetPercentageTaggedInArea(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float): int;
    GetRandomCarInSphereNoSave(x: float, y: float, z: float, radius: float, model: int): Car;
    GetRandomCarInSphereNoSaveRecursive(x: float, y: float, z: float, radius: float, findNext: boolean, skipWrecked: boolean): Car | undefined;
    GetRandomCarOfTypeInAngledAreaNoSave(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, angle: float, char: Char): Car;
    /** Loops through the pool of vehicles to retrieve one that matches the specified model in the specified 2D area
    *
    * https://library.sannybuilder.com/#/sa?q=GET_RANDOM_CAR_OF_TYPE_IN_AREA_NO_SAVE */
    GetRandomCarOfTypeInAreaNoSave(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, modelId: int): Car;
    /** Returns the first char in the ped pool within radius of the specified point
    *
    * https://library.sannybuilder.com/#/sa?q=GET_RANDOM_CHAR_IN_AREA_OFFSET_NO_SAVE */
    GetRandomCharInAreaOffsetNoSave(x: float, y: float, z: float, radiusX: float, radiusY: float, radiusZ: float): Char;
    GetRandomCharInSphere(x: float, y: float, z: float, radius: float, civilian: boolean, gang: boolean, criminal: boolean): Char;
    /** Finds the nearest character to the specified point, in the specified radius
    *
    * https://library.sannybuilder.com/#/sa?q=GET_RANDOM_CHAR_IN_SPHERE_NO_BRAIN */
    GetRandomCharInSphereNoBrain(x: float, y: float, z: float, radius: float): Char;
    GetRandomCharInSphereNoSaveRecursive(x: float, y: float, z: float, radius: float, findNext: boolean, skipDead: boolean): Char | undefined;
    /** Loops through the ped pool and returns the first character that is within the specified radius and has the "buys drugs" flag set in peds
    *
    * https://library.sannybuilder.com/#/sa?q=GET_RANDOM_CHAR_IN_SPHERE_ONLY_DRUGS_BUYERS */
    GetRandomCharInSphereOnlyDrugsBuyers(x: float, y: float, z: float, radius: float): Char;
    GetRandomObjectInSphereNoSaveRecursive(x: float, y: float, z: float, radius: float, findNext: boolean): ScriptObject | undefined;
    /** Gets the level that the character can hear noise at the specified position
    *
    * https://library.sannybuilder.com/#/sa?q=GET_SOUND_LEVEL_AT_COORDS */
    GetSoundLevelAtCoords(handle: Char, x: float, y: float, z: float): float;
    /** Gets the coordinates of the location targeted in the game map
    *
    * https://library.sannybuilder.com/#/sa?q=GET_TARGET_BLIP_COORDS */
    GetTargetCoords(): {
        x: float;
        y: float;
        z: float;
    } | undefined;
    /** Gets the height of the water at the specified 2D coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=GET_WATER_HEIGHT_AT_COORDS */
    GetWaterHeightAtCoords(x: float, y: float, ignoreWaves: boolean): float;
    HasObjectOfTypeBeenSmashed(x: float, y: float, z: float, radius: float, modelId: int): boolean;
    /** Returns true if the pickup at the specified coordinates is available to be picked up
    *
    * https://library.sannybuilder.com/#/sa?q=IS_ANY_PICKUP_AT_COORDS */
    IsAnyPickupAtCoords(x: float, y: float, z: float): boolean;
    /** Returns true if there is anything with the specified properties within the 3D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_AREA_OCCUPIED */
    IsAreaOccupied(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, solid: boolean, car: boolean, char: boolean, object: boolean, particle: boolean): boolean;
    IsClosestObjectOfTypeSmashedOrDamaged(x: float, y: float, z: float, radius: float, modelId: int, smashed: boolean, damaged: boolean): boolean;
    /** Returns true if there's any kind of police vehicle in the specified 3D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_COP_VEHICLE_IN_AREA_3D_NO_SAVE */
    IsCopVehicleInArea3DNoSave(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): boolean;
    /** Returns true if there is an explosion of the specified type in the 3D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_EXPLOSION_IN_AREA */
    IsExplosionInArea(explosionType: int, leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): boolean;
    /** Returns true if there's any fire particles within the specified area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_FLAME_IN_ANGLED_AREA_2D */
    IsFlameInAngledArea2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, angle: float, drawSphere: boolean): boolean;
    /** Returns true if there's any flames within the specified area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_FLAME_IN_ANGLED_AREA_3D */
    IsFlameInAngledArea3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, angle: float, drawSphere: boolean): boolean;
    /** Checks if there is something in the range of the two specified points
    *
    * https://library.sannybuilder.com/#/sa?q=IS_LINE_OF_SIGHT_CLEAR */
    IsLineOfSightClear(fromX: float, fromY: float, fromZ: float, toX: float, toY: float, toZ: float, buildings: boolean, cars: boolean, chars: boolean, objects: boolean, particles: boolean): boolean;
    /** Returns true if a money pickup exists near the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=IS_MONEY_PICKUP_AT_COORDS */
    IsMoneyPickupAtCoords(x: float, y: float, z: float): boolean;
    /** Returns true if there is a vehicle in the specified area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_POINT_OBSCURED_BY_A_MISSION_ENTITY */
    IsPointObscuredByAMissionEntity(x: float, y: float, z: float, radiusX: float, radiusY: float, radiusZ: float): boolean;
    /** Returns true if a projectile is in the specified 3D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PROJECTILE_IN_AREA */
    IsProjectileInArea(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): boolean;
    /** Marks the train as no longer needed by the script, allowing it to be deleted by the game
    *
    * https://library.sannybuilder.com/#/sa?q=MARK_MISSION_TRAINS_AS_NO_LONGER_NEEDED */
    MarkMissionTrainsAsNoLongerNeeded(): void;
    /** Removes all script fires (02CF)
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_ALL_SCRIPT_FIRES */
    RemoveAllScriptFires(): void;
    RemoveOilPuddlesInArea(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float): void;
    /** Enables an increase in the distance that markers hovering above entities can be seen from
    *
    * https://library.sannybuilder.com/#/sa?q=SET_ALWAYS_DRAW_3D_MARKERS */
    SetAlwaysDraw3DMarkers(state: boolean): void;
    /** Sets the quantity of traffic that will spawn in the game
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_DENSITY_MULTIPLIER */
    SetCarDensityMultiplier(multiplier: float): void;
    SetCharUsesCollisionClosestObjectOfType(x: float, y: float, z: float, radius: float, modelId: int, solid: boolean, target: Char): void;
    /** This command is like 098E, except it finds the appropriate enex marker via its position instead of its name
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CLOSEST_ENTRY_EXIT_FLAG */
    SetClosestEntryExitFlag(x: float, y: float, radius: float, entryexitsFlag: int, state: boolean): void;
    SetCreateRandomCops(state: boolean): void;
    /** Sets whether gang members will spawn
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CREATE_RANDOM_GANG_MEMBERS */
    SetCreateRandomGangMembers(state: boolean): void;
    /** Sets the extra color of the sky
    *
    * https://library.sannybuilder.com/#/sa?q=SET_EXTRA_COLOURS */
    SetExtraColors(color: int, fade: boolean): void;
    /** Enables the LS Riots, making smoke appear on houses, random car fires occur, peds stealing things and attacking each other in a frenzy
    *
    * https://library.sannybuilder.com/#/sa?q=SET_LA_RIOTS */
    SetLaRiots(state: boolean): void;
    /** Sets whether gangs appear everywhere, like when "Gangs control the streets" cheat is activated
    *
    * https://library.sannybuilder.com/#/sa?q=SET_ONLY_CREATE_GANG_MEMBERS */
    SetOnlyCreateGangMembers(state: boolean): void;
    /** Sets the quantity of pedestrians to spawn in the game
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PED_DENSITY_MULTIPLIER */
    SetPedDensityMultiplier(multiplier: float): void;
    /** Creates a pool collision object
    *
    * https://library.sannybuilder.com/#/sa?q=SET_POOL_TABLE_COORDS */
    SetPoolTableCoords(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): void;
    /** Sets the friction/slowdown rate on all rail tracks
    *
    * https://library.sannybuilder.com/#/sa?q=SET_RAILTRACK_RESISTANCE_MULT */
    SetRailtrackResistanceMult(mult: float): void;
    /** Sets whether all tags in the area are sprayed
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TAG_STATUS_IN_AREA */
    SetTagStatusInArea(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, percent: int): void;
    /** Sets the visibility of the object closest to the specified coordinates, matching the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=SET_VISIBILITY_OF_CLOSEST_OBJECT_OF_TYPE */
    SetVisibilityOfClosestObjectOfType(x: float, y: float, z: float, radius: float, modelId: int, state: boolean): void;
    /** Creates a vehicle with the model (no pre-loading needed) in front of the player
    *
    * https://library.sannybuilder.com/#/sa?q=SPAWN_VEHICLE_BY_CHEATING */
    SpawnVehicleByCheating(modelId: int): void;
    /** Swaps a map model with another map model nearest to the center of the search area
    *
    * https://library.sannybuilder.com/#/sa?q=SWAP_NEAREST_BUILDING_MODEL */
    SwapNearestBuildingModel(x: float, y: float, z: float, radius: float, fromModelId: int, toModelId: int): void;
    /** Locates the enex marker via the specified name and sets whether it is visible and usable
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_ENTRY_EXIT */
    SwitchEntryExit(interiorName: string, state: boolean): void;
    /** Sets whether the game should render the world or only the cutscene objects
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_WORLD_PROCESSING */
    SwitchProcessing(state: boolean): void;
    /** Sets whether trains are generated
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_RANDOM_TRAINS */
    SwitchRandomTrains(state: boolean): void;
}
declare var World: World
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Zone */
interface Zone {
    /** Gets a random character in the specified zone whose pedtype matches the specified values
    *
    * https://library.sannybuilder.com/#/sa?q=GET_RANDOM_CHAR_IN_ZONE */
    GetRandomChar(zone: string, civilian: boolean, gang: boolean, criminalOrProstitute: boolean): Char;
    GetCurrentPopulationZoneType(): int;
    /** Returns the drug dealer density of the specified zone
    *
    * https://library.sannybuilder.com/#/sa?q=GET_ZONE_DEALER_STRENGTH */
    GetDealerStrength(zone: string): int;
    /** Returns the density of the gang members in the specified zone
    *
    * https://library.sannybuilder.com/#/sa?q=GET_ZONE_GANG_STRENGTH */
    GetGangStrength(zone: string, gangId: int): int;
    /** Gets the name of the zone at the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=GET_NAME_OF_INFO_ZONE */
    GetName(x: float, y: float, z: float): string;
    /** Resets all changes made to the zone info
    *
    * https://library.sannybuilder.com/#/sa?q=INIT_ZONE_POPULATION_SETTINGS */
    InitPopulationSettings(): void;
    /** Sets the total number of drug dealers in the zone
    *
    * https://library.sannybuilder.com/#/sa?q=SET_ZONE_DEALER_STRENGTH */
    SetDealerStrength(zone: string, strength: int): void;
    /** Causes the players wanted level to be set at 4 when in restricted areas
    *
    * https://library.sannybuilder.com/#/sa?q=SET_DISABLE_MILITARY_ZONES */
    SetDisableMilitaryZones(state: boolean): void;
    /** Sets the zone as the only zone where a turf war can be provoked
    *
    * https://library.sannybuilder.com/#/sa?q=SET_ZONE_FOR_GANG_WARS_TRAINING */
    SetForGangWarsTraining(zone: string): void;
    /** Sets the density of the gang members in the specified zone
    *
    * https://library.sannybuilder.com/#/sa?q=SET_ZONE_GANG_STRENGTH */
    SetGangStrength(zoneId: string, gangId: int, density: int): void;
    /** Sets whether cops should be prevented from spawning in the specified area
    *
    * https://library.sannybuilder.com/#/sa?q=SET_ZONE_NO_COPS */
    SetNoCops(zone: string, state: boolean): void;
    SetPopulationRace(zone: string, _p2: int): void;
    SetPopulationType(zone: string, type: int): void;
    SetTriggerGangWar(zone: string): void;
    /** Sets whether the IPL defined audio for the specified area should play
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_AUDIO_ZONE */
    SwitchAudio(zone: string, state: boolean): void;
}
declare var Zone: Zone
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/AudioStream3D */
declare class AudioStream3D extends AudioStream {
    constructor(handle: number);
    static Load(audioFileName: string): AudioStream3D | undefined;
    setPlayAtCar(handle: Car): AudioStream3D;
    setPlayAtChar(handle: Char): AudioStream3D;
    setPlayAtCoords(x: float, y: float, z: float): AudioStream3D;
    setPlayAtObject(handle: ScriptObject): AudioStream3D;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Boat */
declare class Boat extends Car {
    constructor(handle: number);
    /** Makes the boat stay motionless in the water
    *
    * https://library.sannybuilder.com/#/sa?q=ANCHOR_BOAT */
    anchor(state: boolean): Boat;
    /** Makes the boat sail to the location
    *
    * https://library.sannybuilder.com/#/sa?q=BOAT_GOTO_COORDS */
    goto(x: float, y: float, z: float): Boat;
    /** Sets the boat's max speed
    *
    * https://library.sannybuilder.com/#/sa?q=SET_BOAT_CRUISE_SPEED */
    setCruiseSpeed(maxSpeed: float): Boat;
    /** Turns off the car's engine
    *
    * https://library.sannybuilder.com/#/sa?q=BOAT_STOP */
    stop(): Boat;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/DecisionMakerChar */
declare class DecisionMakerChar extends DecisionMaker {
    constructor(handle: number);
    /** Copies a decision makers data to another decision maker
    *
    * https://library.sannybuilder.com/#/sa?q=COPY_CHAR_DECISION_MAKER */
    static Copy(maskOrOtherHandle: DecisionMakerChar): DecisionMakerChar;
    static CopyShared(mask: int): DecisionMakerChar;
    /** Creates a decision maker with the specified type
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_CHAR_DECISION_MAKER */
    static Load(type: int): DecisionMakerChar;
    /** Sets which action should occur according to the event on the following parameters
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_CHAR_DECISION_MAKER_EVENT_RESPONSE */
    addEventResponse(eventId: int, taskId: int, respect: float, hate: float, like: float, dislike: float, inCar: boolean, onFoot: boolean): DecisionMakerChar;
    /** Resets the task for the event of the specified decision maker
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_CHAR_DECISION_MAKER_EVENT_RESPONSE */
    clearEventResponse(eventId: int): DecisionMakerChar;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/DecisionMakerGroup */
declare class DecisionMakerGroup extends DecisionMaker {
    constructor(handle: number);
    /** Copies a group decision makers data to another decision maker
    *
    * https://library.sannybuilder.com/#/sa?q=COPY_GROUP_DECISION_MAKER */
    static Copy(mask: int): DecisionMakerGroup;
    /** Creates a decision maker for use on groups of actors
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_GROUP_DECISION_MAKER */
    static Load(type: int): DecisionMakerGroup;
    /** Sets which action should occur according to the event on the following parameters
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_GROUP_DECISION_MAKER_EVENT_RESPONSE */
    addEventResponse(eventId: int, taskId: int, respect: float, hate: float, like: float, dislike: float, inCar: boolean, onFoot: boolean): DecisionMakerGroup;
    /** Resets the task for the event of the specified group decision maker
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_GROUP_DECISION_MAKER_EVENT_RESPONSE */
    clearEventResponse(eventId: int): DecisionMakerGroup;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Heli */
declare class Heli extends Car {
    constructor(handle: number);
    /** Provides the heli with extra thrust power
    *
    * https://library.sannybuilder.com/#/sa?q=ACTIVATE_HELI_SPEED_CHEAT */
    activateSpeedCheat(power: int): Heli;
    attachWinch(state: boolean): Heli;
    /** Makes the heli follow and attack the current player in the given radius
    *
    * https://library.sannybuilder.com/#/sa?q=HELI_ATTACK_PLAYER */
    attackPlayer(handle: Player, radius: float): Heli;
    /** Makes the helicopter hunt down the character or the vehicle within the specified radius
    *
    * https://library.sannybuilder.com/#/sa?q=POLICE_HELI_CHASE_ENTITY */
    chaseEntity(char: Char, vehicle: Car, radius: float): Heli;
    /** Resets the heli rotation set with 04D0
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_HELI_ORIENTATION */
    clearOrientation(): Heli;
    /** Sets whether the helicopter sound is muted
    *
    * https://library.sannybuilder.com/#/sa?q=DISABLE_HELI_AUDIO */
    disableAudio(state: boolean): Heli;
    /** Makes the Hunter helicopter fire cannon gun
    *
    * https://library.sannybuilder.com/#/sa?q=FIRE_HUNTER_GUN */
    fireHunterGun(): Heli;
    /** Makes the heli follow the specified actor or vehicle in the air
    *
    * https://library.sannybuilder.com/#/sa?q=HELI_FOLLOW_ENTITY */
    followEntity(char: Char, vehicle: Car, radius: float): Heli;
    /** Makes the helicopter fly to the specified location, keeping a specific Z height/altitude
    *
    * https://library.sannybuilder.com/#/sa?q=HELI_GOTO_COORDS */
    gotoCoords(x: float, y: float, z: float, minAltitude: float, maxAltitude: float): Heli;
    /** Retrieves the entity attached to the heli's magnet and returns to specific variables depending on the entities type
    *
    * https://library.sannybuilder.com/#/sa?q=GRAB_ENTITY_ON_WINCH */
    grabEntityOnWinch(): {
        char: Char;
        vehicle: Car;
        object: ScriptObject;
    };
    keepEntityInView(char: Char, vehicle: Car, minAltitude: float, maxAltitude: int): Heli;
    landAtCoords(x: float, y: float, z: float, minAltitude: float, maxAltitude: float): Heli;
    /** Makes helicopter simulate crash landing, exploding on the way if high up
    *
    * https://library.sannybuilder.com/#/sa?q=MAKE_HELI_COME_CRASHING_DOWN */
    makeComeCrashingDown(): Heli;
    releaseEntityFromWinch(): Heli;
    /** Makes the helicopter rotor spin at full speed instantly
    *
    * https://library.sannybuilder.com/#/sa?q=SET_HELI_BLADES_FULL_SPEED */
    setBladesFullSpeed(): Heli;
    /** Forces the heli rotation relative to the north
    *
    * https://library.sannybuilder.com/#/sa?q=SET_HELI_ORIENTATION */
    setOrientation(angle: float): Heli;
    setReachedTargetDistance(distance: int): Heli;
    /** Limits the amount a helicopter can tilt
    *
    * https://library.sannybuilder.com/#/sa?q=SET_HELI_STABILISER */
    setStabiliser(state: boolean): Heli;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/MenuGrid */
declare class MenuGrid extends Menu {
    constructor(handle: number);
    /** Creates the same color chart that you see in car modification shops
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_MENU_GRID */
    static Create(header: string, topLeftX: float, topLeftY: float, width: float, numColumns: int, interactive: boolean, background: boolean, alignment: int): MenuGrid;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Plane */
declare class Plane extends Car {
    constructor(handle: number);
    /** Sets the planes mission to attack the player
    *
    * https://library.sannybuilder.com/#/sa?q=PLANE_ATTACK_PLAYER */
    attackPlayer(handle: Player, radius: float): Plane;
    attackPlayerUsingDogFight(player: Player, radius: float): Plane;
    flyInDirection(heading: float, minAltitude: float, maxAltitude: float): Plane;
    followEntity(char: Char, vehicle: Car, radius: float): Plane;
    getUndercarriagePosition(): float;
    gotoCoords(x: float, y: float, z: float, minAltitude: float, maxAltitude: float): Plane;
    setThrottle(throttle: float): Plane;
    /** Sets whether the plane's landing wheels are up
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLANE_UNDERCARRIAGE_UP */
    setUndercarriageUp(state: boolean): Plane;
    /** Provides the aircraft with full power so it can start flying mid-air
    *
    * https://library.sannybuilder.com/#/sa?q=PLANE_STARTS_IN_AIR */
    startsInAir(): Plane;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Trailer */
declare class Trailer extends Car {
    constructor(handle: number);
    attachToCab(cab: Car): Trailer;
    /** Detaches the trailer from the car which it is attached to
    *
    * https://library.sannybuilder.com/#/sa?q=DETACH_TRAILER_FROM_CAB */
    detachFromCab(cab: Car): Trailer;
    /** Returns true if CAR A has CAR B attached to it like a trailer
    *
    * https://library.sannybuilder.com/#/sa?q=IS_TRAILER_ATTACHED_TO_CAB */
    isAttachedToCab(cab: Car): boolean;
}
