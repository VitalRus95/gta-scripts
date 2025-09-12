// Sanny Builder Library v0.997
/// <reference no-default-lib="true"/>
/// <reference lib="es2020" />
/** Integer value */
type int = (number & { _int: never }) | number;
/** Floating-point value */
type float = (number & { _float: never }) | number;
/** Vector3 type */
type Vector3 = { x: float; y: float; z: float };

/** Pauses the script execution for the specified amount of time in milliseconds */
declare function wait(delay: int): void;
/** Returns a Promise that resolves after given time in milliseconds */
declare function asyncWait(delay: int): Promise<void>;
/** Displays a black text box with custom text. Not available on an `unknown` host */
declare function showTextBox(text: string): void;
/** Prints serialized values to the cleo_redux.log */
declare function log(...values: Array<any>): void;
/** Executes the command by name with the given arguments */
declare function native<T>(name: string, ...args: any[]): T;
/** Terminates the script and optionally writes a reason to the log file */
declare function exit(reason?: string): void;
/** Creates a new event listener https://re.cleo.li/docs/en/events.html */
declare function addEventListener<T>(event: string, callback: (event: CleoEvent<T>) => void): () => void;
/** Dispatches an event https://re.cleo.li/docs/en/events.html */
declare function dispatchEvent<T>(event: string, data?: T): void;
// Sets a timer which executes a function once the timer expires
declare function setTimeout(callback: () => void, delay?: int, ...args: any[]): number;
// Repeatedly calls a function with a fixed time delay between each call
declare function setInterval(callback: () => void, delay?: int, ...args: any[]): number;
// Cancels a timeout previously established by calling setTimeout()
declare function clearTimeout(id: number): void;
// Cancels a timed, repeating action which was previously established by a call to setInterval()
declare function clearInterval(id: number): void;

/** Current host name */
declare const HOST:
  | "re3"
  | "reVC"
  | "gta3"
  | "vc"
  | "sa"
  | "gta3_unreal"
  | "vc_unreal"
  | "sa_unreal"
  | "gta_iv"
  | "bully"
  | "unknown";
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
  readonly major: string | undefined;
  readonly minor: string | undefined;
  readonly patch: string | undefined;
  readonly pre: string | undefined;
  readonly build: string | undefined;
  toString(): string;
}
declare interface CleoEvent<T = object> {
  name: string;
  data: T | undefined;
}
interface CLEO {
  /** CLEO Redux version */
  readonly version: Version;
  /** Version of API definitions from Sanny Builder Library */
  readonly apiVersion: Version;
  /** Version of the host's exe file. Not available on some hosts */
  readonly hostVersion?: Version;
  debug: {
    /** Enables or disables tracing of executed commands in cleo_redux.log */
    trace(flag: boolean): void;
  };
  /** Spawns a new instance of a script at path and optionally sets initial values for the variables */
  runScript(path: string, args?: object): void;
}

declare const CLEO: CLEO;
interface FxtStore {
  /**
   * Inserts new text content in the script's fxt storage overwriting the previous content and shadowing static fxt with the same key
   * @param key GXT key that can be used in text commands (7 characters max)
   * @param value text content
   * @param [isGlobal] if true, the text affects global FXT storage
   */
  insert(key: string, value: string, isGlobal?: boolean): void;
  /**
   * Removes the text content associated with the key in the local fxt storage
   * @param key GXT key
   * @param [isGlobal] if true, the text affects global FXT storage
   */
  delete(key: string, isGlobal?: boolean): void;
}

declare const FxtStore: FxtStore;
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Attractor */
declare class Attractor {
    constructor(handle: number);
    /** Adds a ped attractor
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_ATTRACTOR [061D]*/
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
    * https://library.sannybuilder.com/#/sa?q=ATTACH_MISSION_AUDIO_TO_CAR [0A16]*/
    AttachMissionAudioToCar(slotId: int, handle: Car): void;
    /** Sets the loaded audio to play at the char's location
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_MISSION_AUDIO_TO_CHAR [0949]*/
    AttachMissionAudioToChar(slotId: int, handle: Char): void;
    /** Sets the loaded audio to play at the object's location
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_MISSION_AUDIO_TO_OBJECT [097C]*/
    AttachMissionAudioToObject(slotId: int, handle: ScriptObject): void;
    /** Unloads the mission audio (03CF), freeing game memory
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_MISSION_AUDIO [040D]*/
    ClearMissionAudio(slotId: int): void;
    GetBeatProximity(_p1: int): {
        _p2: int;
        _p3: int;
        _p4: int;
    };
    GetBeatTrackStatus(): int;
    /** Returns the current radio station that is being played
    *
    * https://library.sannybuilder.com/#/sa?q=GET_RADIO_CHANNEL [051E]*/
    GetRadioChannel(): int;
    /** Gets the radio volume set in the game options
    *
    * https://library.sannybuilder.com/#/sa?q=GET_AUDIO_RADIO_VOLUME [0E22]*/
    GetRadioVolume(): float;
    /** Gets the SFX volume set in the game options
    *
    * https://library.sannybuilder.com/#/sa?q=GET_AUDIO_SFX_VOLUME [0E21]*/
    GetSfxVolume(): float;
    /** Returns true if the audio (03CF) is no longer playing
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_MISSION_AUDIO_FINISHED [03D2]*/
    HasMissionAudioFinished(slotId: int): boolean;
    /** Returns true if the mission audio requested with LOAD_MISSION_AUDIO has loaded
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_MISSION_AUDIO_LOADED [03D0]*/
    HasMissionAudioLoaded(slotId: int): boolean;
    /** Loads the file from the audio directory
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_MISSION_AUDIO [03CF]*/
    LoadMissionAudio(slotId: int, audioId: int): void;
    /** Sets whether the loaded soundtrack is paused
    *
    * https://library.sannybuilder.com/#/sa?q=PAUSE_CURRENT_BEAT_TRACK [0991]*/
    PauseCurrentBeatTrack(state: boolean): void;
    PlayBeatTrack(): void;
    /** Plays the loaded sound (03CF)
    *
    * https://library.sannybuilder.com/#/sa?q=PLAY_MISSION_AUDIO [03D1]*/
    PlayMissionAudio(slotId: int): void;
    /** Plays an audio file with the specified ID from the Audio directory
    *
    * https://library.sannybuilder.com/#/sa?q=PLAY_MISSION_PASSED_TUNE [0394]*/
    PlayMissionPassedTune(soundId: int): void;
    PreloadBeatTrack(trackId: int): void;
    /** Plays the audio event at the car's position
    *
    * https://library.sannybuilder.com/#/sa?q=REPORT_MISSION_AUDIO_EVENT_AT_CAR [09F7]*/
    ReportMissionAudioEventAtCar(handle: Car, soundId: int): void;
    ReportMissionAudioEventAtChar(handle: Char, soundId: int): void;
    ReportMissionAudioEventAtObject(handle: ScriptObject, soundId: int): void;
    ReportMissionAudioEventAtPosition(x: float, y: float, z: float, soundId: int): void;
    /** Sets the location of the mission audio (03CF) where it can be heard
    *
    * https://library.sannybuilder.com/#/sa?q=SET_MISSION_AUDIO_POSITION [03D7]*/
    SetMissionAudioPosition(slotId: int, x: float, y: float, z: float): void;
    /** Sets whether sounds should fade along with the screen
    *
    * https://library.sannybuilder.com/#/sa?q=SET_MUSIC_DOES_FADE [043C]*/
    SetMusicDoesFade(state: boolean): void;
    /** Sets the current radio station that is playing, if the player is in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=SET_RADIO_CHANNEL [041E]*/
    SetRadioChannel(channel: int): void;
    /** Sets the radio station of the vehicle the player is currently in to the favourite station, retrieved from the stats (ID 326)
    *
    * https://library.sannybuilder.com/#/sa?q=SET_RADIO_TO_PLAYERS_FAVOURITE_STATION [0A26]*/
    SetRadioToPlayersFavouriteStation(): void;
    StopBeatTrack(): void;
}
declare var Audio: Audio
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/AudioStream */
declare class AudioStream {
    constructor(handle: number);
    /** Loads an audio file and creates a new audio stream (see 0AC1)
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_AUDIO_STREAM [0AAC]*/
    static Load(audioFileName: string): AudioStream | undefined;
    /** Gets the audio stream total duration considering its speed (see 2505)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_AUDIO_STREAM_DURATION [2501]*/
    getDuration(): float;
    /** Returns the internal reference of a given AUDIOSTREAM to be used in bass.dll functions
    *
    * https://library.sannybuilder.com/#/sa?q=GET_AUDIOSTREAM_INTERNAL [0E3B]*/
    getInternal(): int;
    /** Gets the audio stream length in seconds
    *
    * https://library.sannybuilder.com/#/sa?q=GET_AUDIO_STREAM_LENGTH [0AAF]*/
    getLength(): int;
    /** Gets audio stream playback progress as value from 0.0 to 1.0
    *
    * https://library.sannybuilder.com/#/sa?q=GET_AUDIO_STREAM_PROGRESS [2507]*/
    getProgress(): float;
    /** Returns current playback progress in seconds. Does not take in consideration current stream's playback speed
    *
    * https://library.sannybuilder.com/#/sa?q=GET_AUDIO_STREAM_PROGRESS_SECONDS [250B]*/
    getProgressSeconds(): float;
    /** Gets audio stream playback speed multiplier
    *
    * https://library.sannybuilder.com/#/sa?q=GET_AUDIO_STREAM_SPEED [2502]*/
    getSpeed(): float;
    /** Returns the state of the audio stream
    *
    * https://library.sannybuilder.com/#/sa?q=GET_AUDIO_STREAM_STATE [0AB9]*/
    getState(): int;
    /** Returns current volume settings type group of the stream
    *
    * https://library.sannybuilder.com/#/sa?q=GET_AUDIO_STREAM_TYPE [2509]*/
    getType(): int;
    /** Returns the audio stream volume (from 0.0 to 1.0)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_AUDIO_STREAM_VOLUME [0ABB]*/
    getVolume(): float;
    /** Checks if audio stream is currently in 'play' state
    *
    * https://library.sannybuilder.com/#/sa?q=IS_AUDIO_STREAM_PLAYING [2500]*/
    isPlaying(): boolean;
    /** Unloads the audio stream and frees the memory
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_AUDIO_STREAM [0AAE]*/
    remove(): void;
    /** Makes the audio stream repeat endlessly
    *
    * https://library.sannybuilder.com/#/sa?q=SET_AUDIO_STREAM_LOOPED [0AC0]*/
    setLooped(state: boolean): AudioStream;
    /** Sets audio stream playback position. Progress range is from 0.0 to 1.0
    *
    * https://library.sannybuilder.com/#/sa?q=SET_AUDIO_STREAM_PROGRESS [2508]*/
    setProgress(progress: float): AudioStream;
    /** Sets current playback progress in seconds. Does not take in consideration current stream's playback speed
    *
    * https://library.sannybuilder.com/#/sa?q=SET_AUDIO_STREAM_PROGRESS_SECONDS [250C]*/
    setProgressSeconds(progress: float): AudioStream;
    /** Sets audio stream playback speed multiplier
    *
    * https://library.sannybuilder.com/#/sa?q=SET_AUDIO_STREAM_SPEED [2503]*/
    setSpeed(speed: float): AudioStream;
    /** Changes stream speed with smooth transition. Pauses/Starts stream playback if neccesarry
    *
    * https://library.sannybuilder.com/#/sa?q=SET_AUDIO_STREAM_SPEED_WITH_TRANSITION [2505]*/
    setSpeedWithTransition(speed: float, timeMs: int): AudioStream;
    /** Sets the state of the audio stream
    *
    * https://library.sannybuilder.com/#/sa?q=SET_AUDIO_STREAM_STATE [0AAD]*/
    setState(action: int): AudioStream;
    /** Sets which game's master volume settings the stream should follow
    *
    * https://library.sannybuilder.com/#/sa?q=SET_AUDIO_STREAM_TYPE [250A]*/
    setType(type: int): AudioStream;
    /** Sets the audio stream volume (default is 1.0). Pauses/Starts stream playback if neccesarry
    *
    * https://library.sannybuilder.com/#/sa?q=SET_AUDIO_STREAM_VOLUME [0ABC]*/
    setVolume(volume: float): AudioStream;
    /** Changes stream volume with smooth transition
    *
    * https://library.sannybuilder.com/#/sa?q=SET_AUDIO_STREAM_VOLUME_WITH_TRANSITION [2504]*/
    setVolumeWithTransition(volume: float, timeMs: int): AudioStream;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Blip */
declare class Blip {
    constructor(handle: number);
    /** Adds a blip and a marker to the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_BLIP_FOR_CAR [0186]*/
    static AddForCar(vehicle: Car): Blip;
    /** Adds a blip with properties to the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_BLIP_FOR_CAR_OLD [0161]*/
    static AddForCarOld(vehicle: Car, color: int, display: int): Blip;
    /** Adds a blip and a marker to the character
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_BLIP_FOR_CHAR [0187]*/
    static AddForChar(char: Char): Blip;
    /** Adds a blip to the location
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_BLIP_FOR_COORD [018A]*/
    static AddForCoord(x: float, y: float, z: float): Blip;
    /** Adds a blip with properties at the location
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_BLIP_FOR_COORD_OLD [0167]*/
    static AddForCoordOld(x: float, y: float, z: float, colour: int, display: int): Blip;
    /** Adds a blip and a marker to the character (identical to 0187)
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_BLIP_FOR_DEAD_CHAR [0888]*/
    static AddForDeadChar(char: Char): Blip;
    /** Adds a blip and a marker to the object
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_BLIP_FOR_OBJECT [0188]*/
    static AddForObject(object: ScriptObject): Blip;
    /** Adds a blip and a marker to the pickup
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_BLIP_FOR_PICKUP [03DC]*/
    static AddForPickup(pickup: Pickup): Blip;
    /** Creates a blip indicating the searchlights position on the radar
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_BLIP_FOR_SEARCHLIGHT [06C4]*/
    static AddForSearchlight(searchlight: Searchlight): Blip;
    /** Adds a short range sprite blip and sphere to the contact point that is not displayed while on mission
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_SHORT_RANGE_SPRITE_BLIP_FOR_CONTACT_POINT [0570]*/
    static AddShortRangeSpriteForContactPoint(x: float, y: float, z: float, sprite: int): Blip;
    /** Adds a sprite blip for the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_SHORT_RANGE_SPRITE_BLIP_FOR_COORD [04CE]*/
    static AddShortRangeSpriteForCoord(x: float, y: float, z: float, sprite: int): Blip;
    /** Adds a long range sprite blip and sphere to the contact point that is not displayed while on mission
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_SPRITE_BLIP_FOR_CONTACT_POINT [02A7]*/
    static AddSpriteForContactPoint(x: float, y: float, z: float, sprite: int): Blip;
    /** Adds a sprite blip to the location
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_SPRITE_BLIP_FOR_COORD [02A8]*/
    static AddSpriteForCoord(x: float, y: float, z: float, sprite: int): Blip;
    /** Returns true if the handle is a valid blip handle
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_BLIP_EXIST [075C]*/
    static DoesExist(handle: int): boolean;
    /** Sets the blip's color
    *
    * https://library.sannybuilder.com/#/sa?q=CHANGE_BLIP_COLOUR [0165]*/
    changeColor(color: int): Blip;
    /** Changes the display of the specified blip
    *
    * https://library.sannybuilder.com/#/sa?q=CHANGE_BLIP_DISPLAY [018B]*/
    changeDisplay(display: int): Blip;
    /** Sets the blip's size
    *
    * https://library.sannybuilder.com/#/sa?q=CHANGE_BLIP_SCALE [0168]*/
    changeScale(size: int): Blip;
    /** Removes the blip
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_BLIP [0164]*/
    remove(): void;
    /** Sets whether the tracking blip will remain regardless of the entities existance
    *
    * https://library.sannybuilder.com/#/sa?q=SET_BLIP_ALWAYS_DISPLAY_ON_ZOOMED_RADAR [07BF]*/
    setAlwaysDisplayOnZoomedRadar(state: boolean): Blip;
    setAsFriendly(state: boolean): Blip;
    /** Works similar to 0165, except this command does not work on tracking blips, has different colors and does not support direct RGBA setting
    *
    * https://library.sannybuilder.com/#/sa?q=SET_COORD_BLIP_APPEARANCE [08FB]*/
    setCoordAppearance(color: int): Blip;
    /** Assigns the blip to the specified entrance/exit marker
    *
    * https://library.sannybuilder.com/#/sa?q=SET_BLIP_ENTRY_EXIT [08DC]*/
    setEntryExit(x: float, y: float, radius: float): Blip;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Camera */
interface Camera {
    /** Makes the camera remain behind the player when in any garage
    *
    * https://library.sannybuilder.com/#/sa?q=ALLOW_FIXED_CAMERA_COLLISION [09EC]*/
    AllowFixedCollision(state: boolean): void;
    /** Keeps the camera relative to the char with the specified offset
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_CAMERA_TO_CHAR [067C]*/
    AttachToChar(handle: Char, xOffset: float, yOffset: float, zOffset: float, xRotation: float, yRotation: float, zRotation: float, tilt: float, switchStyle: int): void;
    /** Puts the camera on the character like with 067C
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_CAMERA_TO_CHAR_LOOK_AT_CHAR [067E]*/
    AttachToCharLookAtChar(handle: Char, xOffset: float, yOffset: float, zOffset: float, char: Char, tilt: float, switchStyle: int): void;
    AttachToCharLookAtVehicle(char: Char, xOffset: float, yOffset: float, zOffset: float, vehicle: Car, tilt: float, switchStyle: int): void;
    /** Keeps the camera relative to the car with the specified offset
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_CAMERA_TO_VEHICLE [0679]*/
    AttachToVehicle(handle: Car, xOffset: float, yOffset: float, zOffset: float, xRotation: float, yRotation: float, zRotation: float, tilt: float, switchStyle: int): void;
    /** Attaches the camera to the vehicle and points it at the specified character
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_CAMERA_TO_VEHICLE_LOOK_AT_CHAR [067B]*/
    AttachToVehicleLookAtChar(car: Car, xOffset: float, yOffset: float, zOffset: float, char: Char, tilt: float, switchStyle: int): void;
    /** Puts the camera on the vehicle like in 0679
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_CAMERA_TO_VEHICLE_LOOK_AT_VEHICLE [067A]*/
    AttachToVehicleLookAtVehicle(handle: Car, xOffset: float, yOffset: float, zOffset: float, vehicle: Car, tilt: float, switchStyle: int): void;
    /** Bumps the camera in the specified direction as if it had collided
    *
    * https://library.sannybuilder.com/#/sa?q=DO_CAMERA_BUMP [0834]*/
    DoBump(xOffset: float, yOffset: float): void;
    /** Fades the screen for the specified time
    *
    * https://library.sannybuilder.com/#/sa?q=DO_FADE [016A]*/
    DoFade(time: int, direction: int): void;
    /** Stores the cameras coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=GET_ACTIVE_CAMERA_COORDINATES [068D]*/
    GetActiveCoordinates(): {
        x: float;
        y: float;
        z: float;
    };
    /** Gets the coordinates the camera is pointing to
    *
    * https://library.sannybuilder.com/#/sa?q=GET_ACTIVE_CAMERA_POINT_AT [068E]*/
    GetActivePointAt(): {
        x: float;
        y: float;
        z: float;
    };
    /** Returns the active camera rotation
    *
    * https://library.sannybuilder.com/#/sa?q=GET_ACTIVE_CAMERA_ROTATION [0F10]*/
    GetActiveRotation(): {
        x: float;
        y: float;
        z: float;
    };
    /** Returns the current camera mode
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CURRENT_CAMERA_MODE [0E64]*/
    GetCurrentMode(): int;
    /** Returns the debug camera position
    *
    * https://library.sannybuilder.com/#/sa?q=GET_DEBUG_CAMERA_COORDINATES [0454]*/
    GetDebugCoordinates(): {
        x: float;
        y: float;
        z: float;
    };
    /** Stores the location the debug camera is pointing to
    *
    * https://library.sannybuilder.com/#/sa?q=GET_DEBUG_CAMERA_POINT_AT [0463]*/
    GetDebugPointAt(): {
        x: float;
        y: float;
        z: float;
    };
    /** Returns the current alpha of the fade being performed ( < 255.0 max )
    *
    * https://library.sannybuilder.com/#/sa?q=GET_FADE_ALPHA [0EC7]*/
    GetFadeAlpha(): float;
    /** Returns true if the screen is fading (016A)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_FADING_STATUS [016B]*/
    GetFadingStatus(): boolean;
    /** Returns the cameras field of view
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAMERA_FOV [0801]*/
    GetFov(): float;
    /** Returns world coordinates for the offset from the camera
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OFFSET_FROM_CAMERA_IN_WORLD_COORDS [0EB2]*/
    GetOffsetFromCameraInWorldCoords(offsetX: float, offsetY: float, offsetZ: float): {
        x: float;
        y: float;
        z: float;
    };
    /** Gets the players chosen camera mode of the current vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PLAYER_IN_CAR_CAMERA_MODE [0A39]*/
    GetPlayerInCarMode(): int;
    /** Returns the camera's rotation input values
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAMERA_ROTATION_INPUT_VALUES [0F14]*/
    GetRotationInputValues(): {
        x: float;
        y: float;
    };
    /** Returns the address of TheCamera (CCamera) and ActiveCam (CCam)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAMERA_STRUCT [0F12]*/
    GetStruct(cCamera: int): int;
    /** Returns the third person camera target
    *
    * https://library.sannybuilder.com/#/sa?q=GET_THIRD_PERSON_CAMERA_TARGET [0F0E]*/
    GetThirdPersonTarget(range: float, sourceX: float, sourceY: float, sourceZ: float): {
        startX: float;
        startY: float;
        startZ: float;
        endX: float;
        endY: float;
        endZ: float;
    };
    /** Returns true if any part of the radius of the specified point is visible on screen
    *
    * https://library.sannybuilder.com/#/sa?q=IS_POINT_ON_SCREEN [00C2]*/
    IsPointOnScreen(x: float, y: float, z: float, radius: float): boolean;
    /** Returns true if the camera is moving in position
    *
    * https://library.sannybuilder.com/#/sa?q=CAMERA_IS_VECTOR_MOVE_RUNNING [0933]*/
    IsVectorMoveRunning(): boolean;
    /** Returns true if the camera is moving in angle
    *
    * https://library.sannybuilder.com/#/sa?q=CAMERA_IS_VECTOR_TRACK_RUNNING [0934]*/
    IsVectorTrackRunning(): boolean;
    /** Returns True if the camera is located within the specified radius of the coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CAMERA_DISTANCE_TO_COORDINATES [0EBE]*/
    LocateDistanceToCoordinates(x: float, y: float, z: float, radius: float): boolean;
    /** Locks the zoom level after the camera has finished zooming
    *
    * https://library.sannybuilder.com/#/sa?q=CAMERA_PERSIST_FOV [0931]*/
    PersistFov(state: boolean): void;
    /** Locks the cameras position
    *
    * https://library.sannybuilder.com/#/sa?q=CAMERA_PERSIST_POS [0930]*/
    PersistPos(state: boolean): void;
    /** Locks the camera target point in position after propagating
    *
    * https://library.sannybuilder.com/#/sa?q=CAMERA_PERSIST_TRACK [092F]*/
    PersistTrack(state: boolean): void;
    /** Attaches the camera to the specified vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=POINT_CAMERA_AT_CAR [0158]*/
    PointAtCar(vehicle: Car, mode: int, switchStyle: int): void;
    /** Attaches the camera to the specified character
    *
    * https://library.sannybuilder.com/#/sa?q=POINT_CAMERA_AT_CHAR [0159]*/
    PointAtChar(char: Char, mode: int, switchStyle: int): void;
    /** Points the camera at the specified location and applies the position set by 0159
    *
    * https://library.sannybuilder.com/#/sa?q=POINT_CAMERA_AT_POINT [0160]*/
    PointAtPoint(x: float, y: float, z: float, switchStyle: int): void;
    /** Stops the camera propagating, interpolating, shaking and zooming
    *
    * https://library.sannybuilder.com/#/sa?q=CAMERA_RESET_NEW_SCRIPTABLES [0925]*/
    ResetNewScriptables(): void;
    /** Resets any changes made with 09EF
    *
    * https://library.sannybuilder.com/#/sa?q=RESET_VEHICLE_CAMERA_TWEAK [09F0]*/
    ResetVehicleTweak(): void;
    /** Restores the camera to its usual position
    *
    * https://library.sannybuilder.com/#/sa?q=RESTORE_CAMERA [015A]*/
    Restore(): void;
    /** Restores the camera, putting it back behind the player
    *
    * https://library.sannybuilder.com/#/sa?q=RESTORE_CAMERA_JUMPCUT [02EB]*/
    RestoreJumpcut(): void;
    /** Puts the camera behind the player
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAMERA_BEHIND_PLAYER [0373]*/
    SetBehindPlayer(): void;
    /** Enables rotational control of the camera
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAMERA_CONTROL [0E60]*/
    SetCameraControl(state: boolean): void;
    /** Locks the camera on cinematic vehicle mode
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CINEMA_CAMERA [093D]*/
    SetCinema(state: boolean): void;
    /** Darkens the game
    *
    * https://library.sannybuilder.com/#/sa?q=SET_DARKNESS_EFFECT [0924]*/
    SetDarknessEffect(enable: boolean, pitchBlack: int): void;
    /** Sets the RGB color of the fade command (016A)
    *
    * https://library.sannybuilder.com/#/sa?q=SET_FADING_COLOUR [0169]*/
    SetFadingColor(r: int, g: int, b: int): void;
    /** Enables vehicle bumper view for the camera
    *
    * https://library.sannybuilder.com/#/sa?q=SET_FIRST_PERSON_IN_CAR_CAMERA_MODE [0822]*/
    SetFirstPersonInCarMode(state: boolean): void;
    /** Sets the fixed camera's position and up vector offset
    *
    * https://library.sannybuilder.com/#/sa?q=SET_FIXED_CAMERA_POSITION [015F]*/
    SetFixedPosition(x: float, y: float, z: float, upVecOffsetX: float, upVecOffsetY: float, upVecOffsetZ: float): void;
    /** Puts the camera in front of the specified character
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAMERA_IN_FRONT_OF_CHAR [0944]*/
    SetInFrontOfChar(handle: Char): void;
    /** Puts the camera in front of the player, pointing towards the player
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAMERA_IN_FRONT_OF_PLAYER [03C8]*/
    SetInFrontOfPlayer(): void;
    /** Sets how long the camera transition will last
    *
    * https://library.sannybuilder.com/#/sa?q=SET_INTERPOLATION_PARAMETERS [0460]*/
    SetInterpolationParameters(interpolationToStopMoving: float, time: int): void;
    /** Sets the cameras zoom factors
    *
    * https://library.sannybuilder.com/#/sa?q=CAMERA_SET_LERP_FOV [0922]*/
    SetLerpFov(from: float, to: float, time: int, ease: boolean): void;
    /** Sets camera minimum drawing distance
    *
    * https://library.sannybuilder.com/#/sa?q=SET_NEAR_CLIP [041D]*/
    SetNearClip(distance: float): void;
    /** Puts the camera in first-person mode if the player is holding a weapon with a first-person shooting mode (such as a sniper rifle or camera)
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PHOTO_CAMERA_EFFECT [0A2F]*/
    SetPhotoEffect(state: boolean): void;
    /** Changes the camera mode on the current vehicle, just like when the user presses the 'change view' key
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_IN_CAR_CAMERA_MODE [09AD]*/
    SetPlayerInCarMode(mode: int): void;
    /** Sets the position of the camera to an offset of the targeted entity
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAMERA_POSITION_UNFIXED [0A25]*/
    SetPositionUnfixed(xOffset: float, yOffset: float): void;
    /** Sets the camera's rotation Input values
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAMERA_ROTATION_INPUT_VALUES [0F15]*/
    SetRotationInputValues(x: float, y: float): void;
    /** Jiggles the camera in a variety of different ways
    *
    * https://library.sannybuilder.com/#/sa?q=CAMERA_SET_SHAKE_SIMULATION_SIMPLE [099C]*/
    SetShakeSimulationSimple(type: int, timeInMs: float, intensity: float): void;
    /** Enables the cooperative camera mode
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TWO_PLAYER_CAMERA_MODE [06E0]*/
    SetTwoPlayerMode(state: boolean): void;
    /** Puts the camera at the position of the first passed coordinates and moves it to the second passed coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=CAMERA_SET_VECTOR_MOVE [0936]*/
    SetVectorMove(fromX: float, fromY: float, fromZ: float, toX: float, toY: float, toZ: float, time: int, ease: boolean): void;
    /** Makes the camera point at the first coordinates and then rotate to point at the second coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=CAMERA_SET_VECTOR_TRACK [0920]*/
    SetVectorTrack(fromX: float, fromY: float, fromZ: float, toX: float, toY: float, toZ: float, time: int, ease: boolean): void;
    /** Sets the position the camera automatically moves to while driving a vehicle of the specified type
    *
    * https://library.sannybuilder.com/#/sa?q=SET_VEHICLE_CAMERA_TWEAK [09EF]*/
    SetVehicleTweak(modelId: int, distance: float, altitude: float, angle: float): void;
    /** Sets how far behind the camera is from the player
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAMERA_ZOOM [032A]*/
    SetZoom(zoom: int): void;
    /** Shakes the camera with the given intensity
    *
    * https://library.sannybuilder.com/#/sa?q=SHAKE_CAM [0003]*/
    Shake(intensity: int): void;
    /** Takes a screenshot of the screen without any HUD elements and stores the file in the "GTA San Andreas User FilesGallery" folder
    *
    * https://library.sannybuilder.com/#/sa?q=TAKE_PHOTO [0A1E]*/
    TakePhoto(_p1: boolean): void;
}
declare var Camera: Camera
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Car */
declare class Car {
    constructor(handle: number);
    /** Creates a vehicle at the specified location, with the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_CAR [00A5]*/
    static Create(modelId: int, x: float, y: float, z: float): Car;
    /** Sets the numberplate of the next car to be spawned with the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=CUSTOM_PLATE_FOR_NEXT_CAR [0674]*/
    static CustomPlateForNextCar(modelId: int, text: string): void;
    /** Returns true if the handle is a valid vehicle handle
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_VEHICLE_EXIST [056E]*/
    static DoesExist(handle: int): boolean;
    /** Returns the value of the specified car model
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_MODEL_VALUE [09E1]*/
    static GetModelValue(model: int): int;
    /** Returns true if the handle is an invalid vehicle handle or the vehicle has been destroyed (wrecked)
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_DEAD [0119]*/
    static IsDead(handle: int): boolean;
    static RestoreModState(): void;
    /** Sets the variation of the next car to be created
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_MODEL_COMPONENTS [0506]*/
    static SetModelComponents(_unused: int, component1: int, component2: int): void;
    static StoreModState(): void;
    /** Adds a new mod with the model to the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_VEHICLE_MOD [06E7]*/
    addMod(modelId: int): int;
    addToRotationVelocity(x: float, y: float, z: float): Car;
    /** Activates upside-down car check for the car
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_UPSIDEDOWN_CAR_CHECK [0190]*/
    addUpsidedownCheck(): Car;
    applyForce(xOffset: float, yOffset: float, zOffset: float, xRotation: float, yRotation: float, zRotation: float): Car;
    attachToCar(handle: Car, xOffset: float, yOffset: float, zOffset: float, xRotation: float, yRotation: float, zRotation: float): Car;
    /** Attaches the car to object with offset and rotation
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_CAR_TO_OBJECT [0939]*/
    attachToObject(handle: ScriptObject, xOffset: float, yOffset: float, zOffset: float, xRotation: float, yRotation: float, zRotation: float): Car;
    /** Deflates the car's tire
    *
    * https://library.sannybuilder.com/#/sa?q=BURST_CAR_TYRE [04FE]*/
    burstTire(tireId: int): Car;
    /** Sets whether the player can target this vehicle with a heatseeking rocket launcher
    *
    * https://library.sannybuilder.com/#/sa?q=VEHICLE_CAN_BE_TARGETTED_BY_HS_MISSILE [08F2]*/
    canBeTargetedByHsMissile(state: boolean): Car;
    /** Sets the car's primary and secondary colors. See also 0A11
    *
    * https://library.sannybuilder.com/#/sa?q=CHANGE_CAR_COLOUR [0229]*/
    changeColor(color1: int, color2: int): Car;
    /** Changes vehicle control from playback to AI driven
    *
    * https://library.sannybuilder.com/#/sa?q=CHANGE_PLAYBACK_TO_USE_AI [099B]*/
    changePlaybackToUseAi(): Car;
    /** Clears the car's last damage entity
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_CAR_LAST_DAMAGE_ENTITY [054F]*/
    clearLastDamageEntity(): Car;
    /** Clears the vehicle's last weapon damage (see 031E)
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_CAR_LAST_WEAPON_DAMAGE [0468]*/
    clearLastWeaponDamage(): Car;
    /** Sets whether the vehicle's engine is turned on or off
    *
    * https://library.sannybuilder.com/#/sa?q=CLEO_SET_CAR_ENGINE_ON [0ABF]*/
    cleoSetEngineOn(state: boolean): Car;
    /** Closes all car doors, hoods and boots
    *
    * https://library.sannybuilder.com/#/sa?q=CLOSE_ALL_CAR_DOORS [0508]*/
    closeAllDoors(): Car;
    /** Sets the car's door angle and latch state
    *
    * https://library.sannybuilder.com/#/sa?q=CONTROL_CAR_DOOR [095E]*/
    controlDoor(door: int, state: int, angle: float): Car;
    controlHydraulics(_p2: float, _p3: float, _p4: float, _p5: float): Car;
    /** Sets the angle of a vehicle's extra
    *
    * https://library.sannybuilder.com/#/sa?q=CONTROL_MOVABLE_VEHICLE_PART [08A4]*/
    controlMovablePart(range: float): Car;
    /** Damages a component on the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=DAMAGE_CAR_DOOR [073C]*/
    damageDoor(door: int): Car;
    /** Damages a panel on the car
    *
    * https://library.sannybuilder.com/#/sa?q=DAMAGE_CAR_PANEL [0730]*/
    damagePanel(panelId: int): Car;
    /** Removes the vehicle from the game
    *
    * https://library.sannybuilder.com/#/sa?q=DELETE_CAR [00A6]*/
    delete(): void;
    detach(x: float, y: float, z: float, collisionDetection: boolean): Car;
    /** Returns true if the car has hydraulics installed
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_CAR_HAVE_HYDRAULICS [0803]*/
    doesHaveHydraulics(): boolean;
    /** Returns True if the car has the specified carNode part
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_CAR_HAVE_PART_NODE [0E82]*/
    doesHavePartNode(carNode: int): boolean;
    /** Returns true if the car has car stuck check enabled
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_CAR_HAVE_STUCK_CAR_CHECK [06FC]*/
    doesHaveStuckCarCheck(): boolean;
    /** Sets whether characters in combat will choose to use the vehicle as cover from gunfire
    *
    * https://library.sannybuilder.com/#/sa?q=VEHICLE_DOES_PROVIDE_COVER [0957]*/
    doesProvideCover(state: boolean): Car;
    /** Prevents the deletion of the specified car until MsFromNow
    *
    * https://library.sannybuilder.com/#/sa?q=DONT_DELETE_CAR_UNTIL_TIME [0ECD]*/
    dontDeleteUntilTime(msFromNow: int): Car;
    /** Makes the vehicle explode
    *
    * https://library.sannybuilder.com/#/sa?q=EXPLODE_CAR [020B]*/
    explode(): Car;
    /** Makes the vehicle explode without affecting its surroundings
    *
    * https://library.sannybuilder.com/#/sa?q=EXPLODE_CAR_IN_CUTSCENE [070C]*/
    explodeInCutscene(): Car;
    /** Causes the vehicle to explode, without damage to surrounding entities
    *
    * https://library.sannybuilder.com/#/sa?q=EXPLODE_CAR_IN_CUTSCENE_SHAKE_AND_BITS [08CB]*/
    explodeInCutsceneShakeAndBits(shake: boolean, effect: boolean, sound: boolean): Car;
    /** Restores the vehicle to full health and removes the damage
    *
    * https://library.sannybuilder.com/#/sa?q=FIX_CAR [0A30]*/
    fix(): Car;
    /** Repairs the car door
    *
    * https://library.sannybuilder.com/#/sa?q=FIX_CAR_DOOR [068A]*/
    fixDoor(door: int): Car;
    fixPanel(panelId: int): Car;
    /** Repairs a car's tire
    *
    * https://library.sannybuilder.com/#/sa?q=FIX_CAR_TYRE [0699]*/
    fixTire(tireId: int): Car;
    /** Sets an override for the car's lights
    *
    * https://library.sannybuilder.com/#/sa?q=FORCE_CAR_LIGHTS [067F]*/
    forceLights(lightMode: int): Car;
    /** Locks the vehicle's position
    *
    * https://library.sannybuilder.com/#/sa?q=FREEZE_CAR_POSITION [0519]*/
    freezePosition(state: boolean): Car;
    /** Makes the car maintain its position
    *
    * https://library.sannybuilder.com/#/sa?q=FREEZE_CAR_POSITION_AND_DONT_LOAD_COLLISION [0574]*/
    freezePositionAndDontLoadCollision(state: boolean): Car;
    /** Returns the status of the car's alarm
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_ALARM [0E00]*/
    getAlarm(): int;
    /** Returns the carAnimGroup of the specified car
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_ANIMGROUP [0EF9]*/
    getAnimGroup(): int;
    /** Returns a model id available for the vehicle's mod slot, or -1 otherwise
    *
    * https://library.sannybuilder.com/#/sa?q=GET_AVAILABLE_VEHICLE_MOD [06E5]*/
    getAvailableMod(slotId: int): int;
    /** Returns a handle of the vehicle preventing this car from getting to its destination
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_BLOCKING_CAR [0987]*/
    getBlockingCar(): Car;
    /** Returns the handle of a character sitting in the specified car seat
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_IN_CAR_PASSENGER_SEAT [0432]*/
    getCharInPassengerSeat(seat: int): Char;
    /** Returns the vehicle's class as defined in vehicles.ide
    *
    * https://library.sannybuilder.com/#/sa?q=GET_VEHICLE_CLASS [08EC]*/
    getClass(): int;
    /** Returns the coordinates of the last collision of the specified car
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_COLLISION_COORDINATES [0E66]*/
    getCollisionCoordinates(): {
        x: float;
        y: float;
        z: float;
    };
    /** Returns the intensity of the last collision of the specified car
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_COLLISION_INTENSITY [0E65]*/
    getCollisionIntensity(): float | undefined;
    /** Returns the specified car's collision lighting
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_COLLISION_LIGHTING [0E91]*/
    getCollisionLighting(): float;
    /** Returns the specified car's collision surfaceType
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_COLLISION_SURFACE [0E90]*/
    getCollisionSurface(): int;
    /** Gets the car's primary and secondary colors. See also 0A12
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_COLOURS [03F3]*/
    getColors(): {
        color1: int;
        color2: int;
    };
    /** Gets car component by name
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_COMPONENT [0D0D]*/
    getComponent(name: string): Component | undefined;
    /** Gets matrix of car component
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_COMPONENT_MATRIX [0D0C]*/
    getComponentMatrix(componentName: string): Matrix | undefined;
    /** Returns the vehicle's coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_COORDINATES [00AA]*/
    getCoordinates(): {
        x: float;
        y: float;
        z: float;
    };
    /** Returns the current gear of the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_CURRENT_GEAR [0AB8]*/
    getCurrentGear(): int;
    /** Returns the model of the component installed on the specified slot of the vehicle, or -1 otherwise
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CURRENT_CAR_MOD [096D]*/
    getCurrentMod(slot: int): int;
    /** Gets the car's paintjob
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CURRENT_VEHICLE_PAINTJOB [0988]*/
    getCurrentPaintjob(): int;
    /** Gets the specified car doors angle, relative to the hinge
    *
    * https://library.sannybuilder.com/#/sa?q=GET_DOOR_ANGLE_RATIO [095F]*/
    getDoorAngleRatio(door: int): float;
    /** Returns the door lock mode of the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_DOOR_LOCK_STATUS [09B3]*/
    getDoorLockStatus(): int;
    /** Returns the car's driver handle
    *
    * https://library.sannybuilder.com/#/sa?q=GET_DRIVER_OF_CAR [046C]*/
    getDriver(): Char;
    /** Returns the coordinates of the specified car's vehicleDummy
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_DUMMY_COORD [0E5B]*/
    getDummyCoord(vehicleDummy: int, worldCoords: boolean, invertX: boolean): {
        x: float;
        y: float;
        z: float;
    } | undefined;
    /** Gets extended var value for this car. Returns false if not initialized (0E17)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_EXTENDED_CAR_VAR [0E19]*/
    getExtendedCarVar(identifier: string, varNumber: int): int | undefined;
    /** Returns the car's tertiary and quaternary colors (0A11)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_EXTRA_CAR_COLOURS [0A12]*/
    getExtraColors(): {
        color3: int;
        color4: int;
    };
    /** Returns the X coord of the vehicle's angle
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_FORWARD_X [02F8]*/
    getForwardX(): float;
    /** Returns the Y coord of the vehicle's angle
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_FORWARD_Y [02F9]*/
    getForwardY(): float;
    /** Returns the vehicle's heading (z-angle)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_HEADING [0174]*/
    getHeading(): float;
    /** Returns the vehicle's health
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_HEALTH [0227]*/
    getHealth(): int;
    /** Returns the vehicle's mass
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_MASS [06A3]*/
    getMass(): float;
    /** Returns the maximum number of passengers that could sit in the car
    *
    * https://library.sannybuilder.com/#/sa?q=GET_MAXIMUM_NUMBER_OF_PASSENGERS [01EA]*/
    getMaximumNumberOfPassengers(): int;
    /** Returns the car's model id
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_MODEL [0441]*/
    getModel(): int;
    /** Sets the angle of a vehicle's extra
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_MOVING_COMPONENT_OFFSET [098D]*/
    getMovingComponentOffset(): float;
    /** Gets the number of possible paintjobs that can be applied to the car
    *
    * https://library.sannybuilder.com/#/sa?q=GET_NUM_AVAILABLE_PAINTJOBS [06EC]*/
    getNumAvailablePaintjobs(): int;
    getNumColors(): int;
    /** Gets the total number of gears of the vehicle and stores it to the variable
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_NUMBER_OF_GEARS [0AB7]*/
    getNumberOfGears(): int;
    /** Returns the number of passengers sitting in the car
    *
    * https://library.sannybuilder.com/#/sa?q=GET_NUMBER_OF_PASSENGERS [01E9]*/
    getNumberOfPassengers(): int;
    /** Returns the coordinates of an offset of the vehicle's position, depending on the vehicle's rotation
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OFFSET_FROM_CAR_IN_WORLD_COORDS [0407]*/
    getOffsetInWorldCoords(xOffset: float, yOffset: float, zOffset: float): {
        x: float;
        y: float;
        z: float;
    };
    /** Returns the value of the car's gas and brake pedals
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_PEDALS [0EFD]*/
    getPedals(): {
        gas: float;
        brake: float;
    };
    /** Returns the X Angle of the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_PITCH [077D]*/
    getPitch(): float;
    /** Returns the specified car's damage proofs
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_PROOFS [0EAD]*/
    getProofs(): {
        bullet: boolean;
        fire: boolean;
        explosion: boolean;
        collision: boolean;
        melee: boolean;
    };
    /** Gets the quaternion values of the car
    *
    * https://library.sannybuilder.com/#/sa?q=GET_VEHICLE_QUATERNION [07C5]*/
    getQuaternion(): {
        x: float;
        y: float;
        z: float;
        w: float;
    };
    /** Returns the randomSeed of the specified car
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_RANDOM_SEED [0EC9]*/
    getRandomSeed(): int;
    /** Returns the Y Angle of the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_ROLL [06BE]*/
    getRoll(): float;
    /** Returns the SAMP vehicle ID using its car handle
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_CAR_ID [0B2C]*/
    getSampId(): int;
    /** Gets the car's speed
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_SPEED [02E3]*/
    getSpeed(): float;
    getSpeedVector(): {
        x: float;
        y: float;
        z: float;
    };
    /** Returns vehicle subclass, useful to check if vehicle is motorbike, bicycle, trailer etc
    *
    * https://library.sannybuilder.com/#/sa?q=GET_VEHICLE_SUBCLASS [0E12]*/
    getSubclass(): int;
    /** Returns the TimeIsDead in milliseconds since the specified car is dead
    *
    * https://library.sannybuilder.com/#/sa?q=GET_TIME_CAR_IS_DEAD [0ECF]*/
    getTimeIsDead(): int;
    /** Returns the handle of a tractor towing this car
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_FROM_TRAILER [0E5A]*/
    getTractor(): Car | undefined;
    /** Returns the handle of a trailer towed by this car
    *
    * https://library.sannybuilder.com/#/sa?q=GET_TRAILER_FROM_CAR [0E59]*/
    getTrailer(): Car | undefined;
    /** Gets the car's vertical angle
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_UPRIGHT_VALUE [083F]*/
    getUprightValue(): float;
    /** Returns the monetary value of the car
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_VALUE [0EFC]*/
    getValue(): int;
    /** Gets car damage by weapon last frame. Char can be invalid, and returns false if no damage last frame
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_WEAPON_DAMAGE_LAST_FRAME [0EB6]*/
    getWeaponDamageLastFrame(): {
        char: Char;
        weaponType: int;
        intensity: float;
    } | undefined;
    /** Makes the car have one nitro
    *
    * https://library.sannybuilder.com/#/sa?q=GIVE_NON_PLAYER_CAR_NITRO [09E9]*/
    giveNonPlayerNitro(): Car;
    /** Sets the car's paintjob
    *
    * https://library.sannybuilder.com/#/sa?q=GIVE_VEHICLE_PAINTJOB [06ED]*/
    givePaintjob(paintjobId: int): Car;
    /** Makes the AI drive to the specified location by any means
    *
    * https://library.sannybuilder.com/#/sa?q=CAR_GOTO_COORDINATES [00A7]*/
    gotoCoordinates(x: float, y: float, z: float): Car;
    /** Makes the AI drive to the specified location obeying the traffic rules
    *
    * https://library.sannybuilder.com/#/sa?q=CAR_GOTO_COORDINATES_ACCURATE [02C2]*/
    gotoCoordinatesAccurate(x: float, y: float, z: float): Car;
    /** Makes the AI drive to the destination as fast as possible, trying to overtake other vehicles
    *
    * https://library.sannybuilder.com/#/sa?q=CAR_GOTO_COORDINATES_RACING [0704]*/
    gotoCoordinatesRacing(x: float, y: float, z: float): Car;
    /** Returns true if the vehicle has been damaged by another specified vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CAR_BEEN_DAMAGED_BY_CAR [051D]*/
    hasBeenDamagedByCar(other: Car): boolean;
    /** Returns true if the car has been damaged by the specified char
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CAR_BEEN_DAMAGED_BY_CHAR [051C]*/
    hasBeenDamagedByChar(handle: Char): boolean;
    /** Returns true if the vehicle has been hit by the specified weapon
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CAR_BEEN_DAMAGED_BY_WEAPON [031E]*/
    hasBeenDamagedByWeapon(weaponType: int): boolean;
    /** Returns true if the vehicle was resprayed in the last frame
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CAR_BEEN_RESPRAYED [0A15]*/
    hasBeenResprayed(): boolean;
    /** Sets whether a ped driven vehicle's handling is affected by the 'perfect handling' cheat
    *
    * https://library.sannybuilder.com/#/sa?q=IMPROVE_CAR_BY_CHEATING [0A21]*/
    improveByCheating(state: boolean): Car;
    /** Inits additional variables for this car. Identifier can be "AUTO" for unique ID based on script pointer
    *
    * https://library.sannybuilder.com/#/sa?q=INIT_EXTENDED_CAR_VARS [0E17]*/
    initExtendedVars(identifier: string, totalVars: int): boolean;
    isAttached(): boolean;
    /** Returns true if the specified vehicle has the 'is big' flag set in vehicles
    *
    * https://library.sannybuilder.com/#/sa?q=IS_BIG_VEHICLE [0969]*/
    isBig(): boolean;
    /** Returns True if the specified car is a convertible
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_CONVERTIBLE [0EFB]*/
    isConvertible(): boolean;
    /** Returns true if the specified vehicle part is visibly damaged
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_DOOR_DAMAGED [09BB]*/
    isDoorDamaged(door: int): boolean;
    isDoorFullyOpen(door: int): boolean;
    /** Returns true if the vehicle is an emergency vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_EMERGENCY_SERVICES_VEHICLE [0975]*/
    isEmergencyServices(): boolean;
    isEngineOn(): boolean;
    /** Returns true if the car's health is over the specified value
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_HEALTH_GREATER [0185]*/
    isHealthGreater(health: int): boolean;
    /** Returns true if the vehicle is in the air
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_IN_AIR_PROPER [01F3]*/
    isInAirProper(): boolean;
    /** Returns true if the vehicle is located within the specified 2D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_IN_AREA_2D [00B0]*/
    isInArea2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, drawSphere: boolean): boolean;
    /** Returns true if the vehicle is located within the specified 3D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_IN_AREA_3D [00B1]*/
    isInArea3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, drawSphere: boolean): boolean;
    /** Returns true if the vehicle is submerged in water
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_IN_WATER [02BF]*/
    isInWater(): boolean;
    /** Returns true if the vehicle is a low rider
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_LOW_RIDER [096E]*/
    isLowRider(): boolean;
    /** Returns true if the vehicle has the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_MODEL [0137]*/
    isModel(modelId: int): boolean;
    /** Returns true if all the vehicle's wheels are touching the ground
    *
    * https://library.sannybuilder.com/#/sa?q=IS_VEHICLE_ON_ALL_WHEELS [09D0]*/
    isOnAllWheels(): boolean;
    /** Returns true if the car is burning
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_ON_FIRE [0495]*/
    isOnFire(): boolean;
    /** Returns true if the car is visible
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_ON_SCREEN [02CA]*/
    isOnScreen(): boolean;
    /** Returns True if the specified car is owned by the player
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_OWNED_BY_PLAYER [0EF5]*/
    isOwnedByPlayer(): boolean;
    /** Returns true if the specified car seat is empty
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_PASSENGER_SEAT_FREE [0431]*/
    isPassengerSeatFree(seat: int): boolean;
    /** Returns true if the car is assigned to a path
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYBACK_GOING_ON_FOR_CAR [060E]*/
    isPlaybackGoingOn(): boolean;
    /** Returns True if the specified car is really in the air, and False for boats floating on water
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_REALLY_IN_AIR [0E93]*/
    isReallyInAir(): boolean;
    /** Returns true if the specified vehicle is controlled by script
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_SCRIPT_CONTROLLED [0E08]*/
    isScriptControlled(): boolean;
    isSirenOn(): boolean;
    /** Returns true if the vehicle is not moving
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_STOPPED [01C1]*/
    isStopped(): boolean;
    isStoppedInArea2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, drawSphere: boolean): boolean;
    isStoppedInArea3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, drawSphere: boolean): boolean;
    /** Returns true if the vehicle is a street racer
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_STREET_RACER [096F]*/
    isStreetRacer(): boolean;
    /** Returns true if the car has been upside down for more than 2 seconds (requires 0190)
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_STUCK_ON_ROOF [018F]*/
    isStuckOnRoof(): boolean;
    /** Returns true if a given tire on the car is deflated
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_TYRE_BURST [0496]*/
    isTireBurst(tireId: int): boolean;
    /** Returns true if the car is touching the other car
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_TOUCHING_CAR [09CB]*/
    isTouchingCar(handle: Car): boolean;
    /** Returns true if the vehicle is in contact with the object
    *
    * https://library.sannybuilder.com/#/sa?q=IS_VEHICLE_TOUCHING_OBJECT [0897]*/
    isTouchingObject(handle: ScriptObject): boolean;
    /** Returns true if the vehicle is in the normal position (upright)
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_UPRIGHT [020D]*/
    isUpright(): boolean;
    /** Returns true if the car is upside down
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_UPSIDEDOWN [01F4]*/
    isUpsidedown(): boolean;
    /** Returns true if any of the car components is visibly damaged or lost
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_VISIBLY_DAMAGED [03C9]*/
    isVisiblyDamaged(): boolean;
    isWaitingForWorldCollision(): boolean;
    locate2D(x: float, y: float, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    locate3D(x: float, y: float, z: float, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns True if the car(self) is within the radius of the specified car
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CAR_DISTANCE_TO_CAR [0EE8]*/
    locateDistanceToCar(car: Car, radius: float): boolean;
    /** Returns True if the car is within the radius of the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CAR_DISTANCE_TO_COORDINATES [0EEB]*/
    locateDistanceToCoordinates(x: float, y: float, z: float, radius: float): boolean;
    /** Returns True if the car is within the radius of the specified object
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CAR_DISTANCE_TO_OBJECT [0EE7]*/
    locateDistanceToObject(object: ScriptObject, radius: float): boolean;
    locateStopped2D(x: float, y: float, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the car is stopped in the radius of the specified point
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_STOPPED_CAR_3D [01B0]*/
    locateStopped3D(x: float, y: float, z: float, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Sets the locked status of the car's doors
    *
    * https://library.sannybuilder.com/#/sa?q=LOCK_CAR_DOORS [020A]*/
    lockDoors(lockStatus: int): Car;
    /** Marks the car as being part of a convoy, which seems to follow a path set by 0994
    *
    * https://library.sannybuilder.com/#/sa?q=MARK_CAR_AS_CONVOY_CAR [04BD]*/
    markAsConvoyCar(state: boolean): Car;
    /** Marks the vehicle as script controlled
    *
    * https://library.sannybuilder.com/#/sa?q=MARK_CAR_AS_NEEDED [0E09]*/
    markAsNeeded(): Car;
    /** Allows the vehicle to be deleted by the game if necessary, and also removes it from the mission cleanup list, if applicable
    *
    * https://library.sannybuilder.com/#/sa?q=MARK_CAR_AS_NO_LONGER_NEEDED [01C3]*/
    markAsNoLongerNeeded(): Car;
    /** Opens the specified car door
    *
    * https://library.sannybuilder.com/#/sa?q=OPEN_CAR_DOOR [0657]*/
    openDoor(door: int): Car;
    /** Sets the angle of a car door
    *
    * https://library.sannybuilder.com/#/sa?q=OPEN_CAR_DOOR_A_BIT [08A6]*/
    openDoorABit(door: int, value: float): Car;
    /** Freezes the car on its path
    *
    * https://library.sannybuilder.com/#/sa?q=PAUSE_PLAYBACK_RECORDED_CAR [05ED]*/
    pausePlayback(): Car;
    /** Plays the car's horn (if the player is driving the car)
    *
    * https://library.sannybuilder.com/#/sa?q=CAR_HORN [0E5F]*/
    playHorn(): Car;
    /** Opens the car's trunk and keeps it open
    *
    * https://library.sannybuilder.com/#/sa?q=POP_CAR_BOOT [04E1]*/
    popBoot(): Car;
    /** Removes the specified car door component from the car
    *
    * https://library.sannybuilder.com/#/sa?q=POP_CAR_DOOR [0689]*/
    popDoor(door: int, visibility: boolean): Car;
    popPanel(panelId: int, visibility: boolean): Car;
    /** Makes a passenger in the vehicle speak from an ambient speech ID, if one exists for the character
    *
    * https://library.sannybuilder.com/#/sa?q=RANDOM_PASSENGER_SAY [09AB]*/
    randomPassengerSay(phrase: int): Car;
    /** Removes the vehicle's mod with the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_VEHICLE_MOD [06E8]*/
    removeMod(modelId: int): Car;
    /** Deactivates upside-down car check (0190) for the car
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_UPSIDEDOWN_CAR_CHECK [0191]*/
    removeUpsidedownCheck(): Car;
    /** This resets all the hydraulics on the car, making it "sit"
    *
    * https://library.sannybuilder.com/#/sa?q=RESET_VEHICLE_HYDRAULICS [09FE]*/
    resetHydraulics(): Car;
    /** Sets the vehicle to use its secondary guns
    *
    * https://library.sannybuilder.com/#/sa?q=SELECT_WEAPONS_FOR_VEHICLE [0841]*/
    selectWeapons(_p2: int): Car;
    /** Sets the air resistance for the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=SET_VEHICLE_AIR_RESISTANCE_MULTIPLIER [088B]*/
    setAirResistanceMultiplier(multiplier: float): Car;
    /** Sets the status of the car's alarm
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_ALARM [0E61]*/
    setAlarm(status: int): Car;
    setAlwaysCreateSkids(state: boolean): Car;
    setAreaVisible(interiorId: int): Car;
    /** Sets the script as the owner of the vehicle and adds it to the mission cleanup list
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_AS_MISSION_CAR [0763]*/
    setAsMissionCar(): Car;
    /** Sets whether the vehicle will avoid paths between levels (0426)
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_AVOID_LEVEL_TRANSITIONS [0428]*/
    setAvoidLevelTransitions(state: boolean): Car;
    /** Sets whether the car receives damage
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_CAN_BE_DAMAGED [03F5]*/
    setCanBeDamaged(state: boolean): Car;
    /** Sets whether the vehicle can be targeted
    *
    * https://library.sannybuilder.com/#/sa?q=SET_VEHICLE_CAN_BE_TARGETTED [084E]*/
    setCanBeTargeted(state: boolean): Car;
    /** Sets whether the vehicle can be visibly damaged
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_CAN_BE_VISIBLY_DAMAGED [0852]*/
    setCanBeVisiblyDamaged(state: boolean): Car;
    /** Sets whether the car's tires can be deflated
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAN_BURST_CAR_TYRES [053F]*/
    setCanBurstTires(state: boolean): Car;
    /** Sets whether the vehicle will drive the wrong way on roads
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_CAN_GO_AGAINST_TRAFFIC [073B]*/
    setCanGoAgainstTraffic(state: boolean): Car;
    /** Makes car keep current colors when Pay'n'Spray is used
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAN_RESPRAY_CAR [0294]*/
    setCanRespray(changeColors: boolean): Car;
    setCollision(state: boolean): Car;
    /** Sets alpha value for car's component model
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_COMPONENT_MODEL_ALPHA [0D12]*/
    setComponentModelAlpha(componentName: string, alpha: int): boolean;
    /** Puts the vehicle at the specified location
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_COORDINATES [00AB]*/
    setCoordinates(x: float, y: float, z: float): Car;
    /** Sets the vehicle coordinates without applying offsets to account for the height of the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_COORDINATES_NO_OFFSET [088C]*/
    setCoordinatesNoOffset(x: float, y: float, z: float): Car;
    /** Sets the specified car's coordinates without exception protocols
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_COORDINATES_SIMPLE [0EB4]*/
    setCoordinatesSimple(x: float, y: float, z: float): Car;
    /** Sets the vehicle's max speed
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_CRUISE_SPEED [00AD]*/
    setCruiseSpeed(maxSpeed: float): Car;
    /** Sets the dirt level of the car
    *
    * https://library.sannybuilder.com/#/sa?q=SET_VEHICLE_DIRT_LEVEL [0878]*/
    setDirtLevel(level: float): Car;
    /** Sets the window state of the specified door of the car
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_DOOR_WINDOW_STATE [0D33]*/
    setDoorWindowState(door: int, state: boolean): Car;
    /** Sets the behavior of the vehicle's AI driver
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_DRIVING_STYLE [00AE]*/
    setDrivingStyle(drivingStyle: int): Car;
    /** Sets whether the car's engine is broken
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_ENGINE_BROKEN [081D]*/
    setEngineBroken(state: boolean): Car;
    /** Sets whether the vehicle's engine is turned on or off
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_ENGINE_ON [0918]*/
    setEngineOn(state: boolean): Car;
    /** Makes the vehicle stay in front of the other, keeping parallel
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_ESCORT_CAR_FRONT [05F4]*/
    setEscortCarFront(handle: Car): Car;
    /** Makes the vehicle stay on the other vehicle's left side, keeping parallel
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_ESCORT_CAR_LEFT [05F1]*/
    setEscortCarLeft(handle: Car): Car;
    /** Makes the vehicle stay behind the other car, keeping parallel
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_ESCORT_CAR_REAR [05F3]*/
    setEscortCarRear(handle: Car): Car;
    /** Makes the vehicle stay by the right side of the other vehicle, keeping parallel
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_ESCORT_CAR_RIGHT [05F2]*/
    setEscortCarRight(handle: Car): Car;
    /** Sets extended var value for this car. Requires initialization (0E17), otherwise returns false
    *
    * https://library.sannybuilder.com/#/sa?q=SET_EXTENDED_CAR_VAR [0E18]*/
    setExtendedVar(identifier: string, varNumber: int, value: int): boolean;
    /** Sets the car's ternary and quaternary colors. See also 0229
    *
    * https://library.sannybuilder.com/#/sa?q=SET_EXTRA_CAR_COLOURS [0A11]*/
    setExtraColors(color3: int, color4: int): Car;
    setFollowCar(handle: Car, radius: float): Car;
    /** Sets the speed of the car
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_FORWARD_SPEED [04BA]*/
    setForwardSpeed(forwardSpeed: float): Car;
    /** Sets whether the player can receive items from this vehicle, such as shotgun ammo from a police car and cash from a taxi
    *
    * https://library.sannybuilder.com/#/sa?q=SET_FREEBIES_IN_VEHICLE [08F3]*/
    setFreebies(state: boolean): Car;
    /** Sets the vehicle's heading (z-angle)
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_HEADING [0175]*/
    setHeading(heading: float): Car;
    /** Sets the vehicle's health
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_HEALTH [0224]*/
    setHealth(health: int): Car;
    /** Sets whether the car is heavy
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_HEAVY [01EC]*/
    setHeavy(state: boolean): Car;
    /** Enables hydraulic suspension on the car
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_HYDRAULICS [07FF]*/
    setHydraulics(state: boolean): Car;
    /** Sets the car's mission to idle (MISSION_NONE), stopping any driving activity
    *
    * https://library.sannybuilder.com/#/sa?q=CAR_SET_IDLE [00A9]*/
    setIdle(): Car;
    /** Makes player character ignore the car when enter vehicle key is used
    *
    * https://library.sannybuilder.com/#/sa?q=SET_VEHICLE_IS_CONSIDERED_BY_PLAYER [09B0]*/
    setIsConsideredByPlayer(state: boolean): Car;
    /** Sets whether the vehicle's lights are on
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_LIGHTS_ON [0919]*/
    setLightsOn(state: boolean): Car;
    setLoadCollisionFlag(state: boolean): Car;
    /** Sets the mission of the vehicle's AI driver
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_MISSION [00AF]*/
    setMission(carMission: int): Car;
    /** Set's the specified car's transparency alpha
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_MODEL_ALPHA [0D0F]*/
    setModelAlpha(alpha: int): Car;
    /** Makes a vehicle immune to everything except the player
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_ONLY_DAMAGED_BY_PLAYER [02AA]*/
    setOnlyDamagedByPlayer(state: boolean): Car;
    /** Sets the specified car as OwnedByPlayer
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_OWNED_BY_PLAYER [0EF6]*/
    setOwnedByPlayer(ownedByPlayer: boolean): Car;
    /** Sets whether the car can be blown up by shooting at the petrol tank
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PETROL_TANK_WEAKPOINT [09C4]*/
    setPetrolTankWeakpoint(state: boolean): Car;
    /** Sets the playback speed of the car playing a car recording
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYBACK_SPEED [06FD]*/
    setPlaybackSpeed(speed: float): Car;
    /** Sets the vehicle's immunities
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_PROOFS [02AC]*/
    setProofs(bulletProof: boolean, fireProof: boolean, explosionProof: boolean, collisionProof: boolean, meleeProof: boolean): Car;
    /** Sets the rotation of a vehicle using quaternion values
    *
    * https://library.sannybuilder.com/#/sa?q=SET_VEHICLE_QUATERNION [07C6]*/
    setQuaternion(x: float, y: float, z: float, w: float): Car;
    /** Sets the car on a specific route
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_RANDOM_ROUTE_SEED [048B]*/
    setRandomRouteSeed(routeSeed: int): Car;
    /** Sets the Y Angle of the vehicle to the specified value
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_ROLL [0731]*/
    setRoll(yAngle: float): Car;
    setRotationVelocity(x: float, y: float, z: float): Car;
    /** Sets the car's status
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_STATUS [03A2]*/
    setStatus(status: int): Car;
    setStayInFastLane(state: boolean): Car;
    setStayInSlowLane(state: boolean): Car;
    /** Sets the minimum distance for the AI driver to start ignoring car paths and go straight to the target
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_STRAIGHT_LINE_DISTANCE [04E0]*/
    setStraightLineDistance(distance: int): Car;
    /** Defines whether the car is more resistant to collisions than normal
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_STRONG [03AB]*/
    setStrong(state: boolean): Car;
    /** Sets whether the taxi's roof light is on
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TAXI_LIGHTS [0216]*/
    setTaxiLights(state: boolean): Car;
    /** Makes the AI driver perform the action in the vehicle for the specified period of time
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_TEMP_ACTION [0477]*/
    setTempAction(actionId: int, time: int): Car;
    /** Sets the alpha transparency of a distant vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=SET_VEHICLE_TO_FADE_IN [0594]*/
    setToFadeIn(alpha: int): Car;
    /** Overrides the default AI controlled vehicle traction value of 1.0
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_TRACTION [0423]*/
    setTraction(traction: float): Car;
    /** Disables the car from exploding when it is upside down, as long as the player is not in the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=SET_UPSIDEDOWN_CAR_NOT_DAMAGED [03ED]*/
    setUpsidedownNotDamaged(state: boolean): Car;
    /** Sets whether the vehicle is visible or not
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_VISIBLE [0338]*/
    setVisible(state: boolean): Car;
    /** Makes the vehicle watertight, meaning characters inside will not be harmed if the vehicle is submerged in water
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_WATERTIGHT [039C]*/
    setWatertight(state: boolean): Car;
    /** Advances the recorded car playback by the specified amount
    *
    * https://library.sannybuilder.com/#/sa?q=SKIP_IN_PLAYBACK_RECORDED_CAR [0706]*/
    skipInPlayback(amount: float): Car;
    skipToEndAndStopPlayback(): Car;
    /** Assigns a car to a path
    *
    * https://library.sannybuilder.com/#/sa?q=START_PLAYBACK_RECORDED_CAR [05EB]*/
    startPlayback(path: int): Car;
    /** Starts looped playback of a recorded car path
    *
    * https://library.sannybuilder.com/#/sa?q=START_PLAYBACK_RECORDED_CAR_LOOPED [085E]*/
    startPlaybackLooped(pathId: int): Car;
    /** Starts the playback of a recorded car with driver AI enabled
    *
    * https://library.sannybuilder.com/#/sa?q=START_PLAYBACK_RECORDED_CAR_USING_AI [0705]*/
    startPlaybackUsingAi(pathId: int): Car;
    /** Stops car from following path
    *
    * https://library.sannybuilder.com/#/sa?q=STOP_PLAYBACK_RECORDED_CAR [05EC]*/
    stopPlayback(): Car;
    /** Sets whether the car's alarm can be activated
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_CAR_SIREN [0397]*/
    switchSiren(state: boolean): Car;
    /** Makes all passengers of the car leave it
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_EVERYONE_LEAVE_CAR [068B]*/
    taskEveryoneLeave(): Car;
    /** Sets the car's heading so that it is facing the 2D coordinate
    *
    * https://library.sannybuilder.com/#/sa?q=TURN_CAR_TO_FACE_COORD [039F]*/
    turnToFaceCoord(x: float, y: float): Car;
    /** Unfreezes the vehicle on its path
    *
    * https://library.sannybuilder.com/#/sa?q=UNPAUSE_PLAYBACK_RECORDED_CAR [05EE]*/
    unpausePlayback(): Car;
    /** Clears any current tasks the vehicle has and makes it drive around aimlessly
    *
    * https://library.sannybuilder.com/#/sa?q=CAR_WANDER_RANDOMLY [00A8]*/
    wanderRandomly(): Car;
    /** Sets whether the vehicle can be picked up using the magnocrane
    *
    * https://library.sannybuilder.com/#/sa?q=WINCH_CAN_PICK_VEHICLE_UP [08A5]*/
    winchCanPickUp(state: boolean): Car;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/CarGenerator */
declare class CarGenerator {
    constructor(handle: number);
    /** Initializes a parked car generator (modelId -1 selects a random vehicle from the local popcycle)
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_CAR_GENERATOR [014B]*/
    static Create(x: float, y: float, z: float, heading: float, modelId: int, primaryColor: int, secondaryColor: int, forceSpawn: boolean, alarmChance: int, doorLockChance: int, minDelay: int, maxDelay: int): CarGenerator;
    /** Creates a parked car generator with a number plate (modelId -1 selects a random vehicle from the local popcycle)
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_CAR_GENERATOR_WITH_PLATE [09E2]*/
    static CreateWithPlate(x: float, y: float, z: float, heading: float, modelId: int, primaryColor: int, secondaryColor: int, forceSpawn: boolean, alarmChance: int, doorLockChance: int, minDelay: int, maxDelay: int, plateName: string): CarGenerator;
    /** Resets the disabled car model list for car generators
    *
    * https://library.sannybuilder.com/#/sa?q=DONT_SUPPRESS_ANY_CAR_MODELS [0734]*/
    static DontSuppressAnyCarModels(): void;
    /** Allows the specified car model to spawn for car generators
    *
    * https://library.sannybuilder.com/#/sa?q=DONT_SUPPRESS_CAR_MODEL [0733]*/
    static DontSuppressCarModel(modelId: int): void;
    /** Prevents the specified car model from spawning for car generators
    *
    * https://library.sannybuilder.com/#/sa?q=SUPPRESS_CAR_MODEL [0732]*/
    static SuppressCarModel(model: int): void;
    /** Sets whether the player will not receive a wanted level when entering a vehicle from this generator when the police is around
    *
    * https://library.sannybuilder.com/#/sa?q=SET_HAS_BEEN_OWNED_FOR_CAR_GENERATOR [0A17]*/
    setHasBeenOwned(state: boolean): CarGenerator;
    setNoSave(): CarGenerator;
    /** Specifies the number of times the car generator spawns a car (101 - infinite)
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_CAR_GENERATOR [014C]*/
    switch(amount: int): CarGenerator;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/CardDecks */
interface CardDecks {
    /** Returns a random number between 1 and 52, inclusive
    *
    * https://library.sannybuilder.com/#/sa?q=FETCH_NEXT_CARD [059E]*/
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
    * https://library.sannybuilder.com/#/sa?q=CREATE_CHAR [009A]*/
    static Create(pedType: int, modelId: int, x: float, y: float, z: float): Char;
    /** Creates a character with the specified model in the passenger seat of the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_CHAR_AS_PASSENGER [01C8]*/
    static CreateAsPassenger(vehicle: Car, pedType: int, modelId: int, seat: int): Char;
    static CreateAtAttractor(pedType: int, modelId: int, taskId: int, attractor: Attractor): Char;
    /** Creates a character in the driver's seat of the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_CHAR_INSIDE_CAR [0129]*/
    static CreateInsideCar(vehicle: Car, pedType: int, modelId: int): Char;
    /** Creates a character with a randomised model and pedtype at the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_RANDOM_CHAR [0376]*/
    static CreateRandom(x: float, y: float, z: float): Char;
    /** Creates a driver in the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_RANDOM_CHAR_AS_DRIVER [0560]*/
    static CreateRandomAsDriver(vehicle: Car): Char;
    /** Creates a random character in the passenger seat of the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_RANDOM_CHAR_AS_PASSENGER [0561]*/
    static CreateRandomAsPassenger(vehicle: Car, seat: int): Char;
    /** Creates a character descending from a rope
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_SWAT_ROPE [0503]*/
    static CreateSwatRope(pedType: int, modelId: int, x: float, y: float, z: float): Char;
    /** Returns true if the handle is a valid character handle
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_CHAR_EXIST [056D]*/
    static DoesExist(handle: int): boolean;
    static GetBoneOffsetVector(pedBone: int): int;
    /** Returns pointer to the quaterion under bone address obtained with GET_CHAR_BONE
    *
    * https://library.sannybuilder.com/#/sa?q=GET_BONE_QUAT [0D32]*/
    static GetBoneQuat(bone: int): int;
    /** Returns true if the handle is an invalid character handle or the character is dead (wasted)
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_DEAD [0118]*/
    static IsDead(handle: int): boolean;
    /** Sets how the character chooses to go to their destination in the next task without a parameter specifying this
    *
    * https://library.sannybuilder.com/#/sa?q=SET_NEXT_DESIRED_MOVE_STATE [07A1]*/
    static SetNextDesiredMoveState(moveState: int): void;
    /** Sets the seeing and hearing range for the specified character or for all mission characters when handle is -1
    *
    * https://library.sannybuilder.com/#/sa?q=SET_SENSE_RANGE [060F]*/
    static SetSenseRange(handle: Char, range: float): void;
    /** Adds the specified amount of ammo to the character's weapon, if the character has the weapon
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_AMMO_TO_CHAR [0114]*/
    addAmmo(weaponType: int, ammo: int): Char;
    /** Increases the character's armor by the specified value to the maximum of 100
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_ARMOUR_TO_CHAR [035F]*/
    addArmor(amount: int): Char;
    attachToBike(vehicle: Car, xOffset: float, yOffset: float, zOffset: float, heading: int, headingRange: float, pitchRange: float, weaponType: int): Char;
    /** Puts character into a turret on the vehicle, allowing them to shoot
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_CHAR_TO_CAR [0464]*/
    attachToCar(vehicle: Car, xOffset: float, yOffset: float, zOffset: float, heading: int, headingRange: float, weaponType: int): Char;
    /** Attaches the character to the specified object, in turret mode
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_CHAR_TO_OBJECT [04F4]*/
    attachToObject(handle: ScriptObject, xOffset: float, yOffset: float, zOffset: float, heading: int, headingRange: float, weaponType: int): Char;
    /** Returns true if the character sees a dead body of the given type
    *
    * https://library.sannybuilder.com/#/sa?q=CAN_CHAR_SEE_DEAD_CHAR [0480]*/
    canSeeDeadChar(pedType: int): boolean;
    clearAllRelationships(relationshipType: int): Char;
    clearLastDamageEntity(): Char;
    /** Clears the character's last weapon damage (see 031D)
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_CHAR_LAST_WEAPON_DAMAGE [0467]*/
    clearLastWeaponDamage(): Char;
    /** Clears the char's look task, making them stop looking at whatever they were assigned to look at
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_LOOK_AT [0647]*/
    clearLookAt(): Char;
    /** Clears the specified character's primary tasks
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_CHAR_PRIMARY_TASKS [0E96]*/
    clearPrimaryTasks(): Char;
    clearRelationship(relationshipType: int, toPedType: int): Char;
    /** Clears the character's secondary tasks
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_CHAR_SECONDARY_TASKS [0E97]*/
    clearSecondaryTasks(): Char;
    /** Clears the char's task, making them quit whatever they were doing
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_CHAR_TASKS [0687]*/
    clearTasks(): Char;
    /** Clears all the characters tasks immediately, resetting the character to an idle state
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_CHAR_TASKS_IMMEDIATELY [0792]*/
    clearTasksImmediately(): Char;
    createRenderObjectToCharBoneFromSpecial(specialModel: int, pedBone: int, x: float, y: float, z: float, rx: float, ry: float, rz: float): int;
    /** Decreases the characters health
    *
    * https://library.sannybuilder.com/#/sa?q=DAMAGE_CHAR [0851]*/
    damage(amount: int, damageArmour: boolean): Char;
    /** Removes the character from the game and mission cleanup list, freeing game memory
    *
    * https://library.sannybuilder.com/#/sa?q=DELETE_CHAR [009B]*/
    delete(): void;
    /** Takes the character out of turret mode (0464)
    *
    * https://library.sannybuilder.com/#/sa?q=DETACH_CHAR_FROM_CAR [0465]*/
    detachFromCar(): Char;
    /** Prevents any character speech from playing
    *
    * https://library.sannybuilder.com/#/sa?q=DISABLE_CHAR_SPEECH [094E]*/
    disableSpeech(stopNow: boolean): Char;
    /** Prevents the deletion of the specified character until MsFromNow
    *
    * https://library.sannybuilder.com/#/sa?q=DONT_DELETE_CHAR_UNTIL_TIME [0ECC]*/
    dontDeleteUntilTime(msFromNow: int): Char;
    /** Removes the character from the mission cleanup list, preventing it from being deleted when the mission ends
    *
    * https://library.sannybuilder.com/#/sa?q=DONT_REMOVE_CHAR [01C5]*/
    dontRemove(): Char;
    dropObject(state: boolean): Char;
    dropSecondObject(state: boolean): Char;
    /** Enables pain audio if it was disabled using 094E
    *
    * https://library.sannybuilder.com/#/sa?q=ENABLE_CHAR_SPEECH [094F]*/
    enableSpeech(): Char;
    /** Dismembers the character
    *
    * https://library.sannybuilder.com/#/sa?q=EXPLODE_CHAR_HEAD [0321]*/
    explodeHead(): Char;
    fixGroundBrightnessAndFadeIn(fixGround: boolean, fixBrightness: boolean, fadeIn: boolean): Char;
    /** Sets whether the character's position remains unchanged
    *
    * https://library.sannybuilder.com/#/sa?q=FREEZE_CHAR_POSITION [04D7]*/
    freezePosition(state: boolean): Char;
    freezePositionAndDontLoadCollision(state: boolean): Char;
    /** Gets the amount of ammo in the specified weapon of the character
    *
    * https://library.sannybuilder.com/#/sa?q=GET_AMMO_IN_CHAR_WEAPON [041A]*/
    getAmmoInWeapon(weaponType: int): int;
    /** Returns the progress of the animation on the char, ranging from 0.0 to 1.0
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_ANIM_CURRENT_TIME [0613]*/
    getAnimCurrentTime(animationName: string): float;
    /** Returns a float of the length of the animation in milliseconds
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_ANIM_TOTAL_TIME [061A]*/
    getAnimTotalTime(animationName: string): float;
    /** Returns the interior ID that the character is in
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_AREA_VISIBLE [09E8]*/
    getAreaVisible(): int;
    /** Returns the character's armor amount
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_ARMOUR [04DD]*/
    getArmor(): int;
    getBone(pedBone: int): int | undefined;
    /** Returns the address of the character's specified bone matrix
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_BONE_MATRIX [0D0B]*/
    getBoneMatrix(pedBone: int): int | undefined;
    /** Stores a handle for the vehicle the character is in or entering (alts: 00D9,03C0,0484)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CAR_CHAR_IS_USING [0811]*/
    getCarIsUsing(): Car;
    /** Returns the character's current WeaponClip
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_WEAPON_CLIP [0E8C]*/
    getCharWeaponClip(): int;
    /** Returns the handle of the closestCop to the specified character
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CLOSEST_COP_NEAR_CHAR [0EA5]*/
    getClosestCop(radius: float, alive: boolean, inCar: boolean, onFoot: boolean, seenInFront: boolean): Char | undefined;
    /** Returns the specified character's collision lighting
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_COLLISION_LIGHTING [0E8F]*/
    getCollisionLighting(): float;
    /** Returns the specified character's collision surfaceType
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_COLLISION_SURFACE [0E8E]*/
    getCollisionSurface(): int;
    /** Returns the character's coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_COORDINATES [00A0]*/
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
    * https://library.sannybuilder.com/#/sa?q=GET_CURRENT_CHAR_WEAPON [0470]*/
    getCurrentWeapon(): int;
    /** Returns a pointer to the character's current weaponInfo struct
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CURRENT_CHAR_WEAPONINFO [0E83]*/
    getCurrentWeaponinfo(): WeaponInfo | undefined;
    /** Returns the character's damaging entity and weaponType, bodyPart damaged, and intensity of damage last frame
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_DAMAGE_LAST_FRAME [0EB5]*/
    getDamageLastFrame(): {
        entity: Char;
        weaponType: int;
        bodyPart: int;
        intensity: float;
    } | undefined;
    /** Gets extended var value for this char. Returns false if not initialized (0E14)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_EXTENDED_CHAR_VAR [0E16]*/
    getExtendedVar(identifier: string, varNumber: int): int | undefined;
    /** Returns the specified character's fear level (see pedstats.dat)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_FEAR [0EFA]*/
    getFear(): int;
    /** Returns the character's heading (z-angle)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_HEADING [0172]*/
    getHeading(): float;
    /** Returns the character's health
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_HEALTH [0226]*/
    getHealth(): int;
    /** Returns the character's health as a floating-point percentage
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_HEALTH_PERCENT [0E5C]*/
    getHealthPercent(): float;
    /** Returns the char's distance from ground
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_HEIGHT_ABOVE_GROUND [0819]*/
    getHeightAboveGround(): float;
    /** Gets the characters active ped event
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_HIGHEST_PRIORITY_EVENT [080E]*/
    getHighestPriorityEvent(): int;
    /** Returns the handle of the killTarget of the specified character
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_KILL_TARGET_CHAR [0E44]*/
    getKillTargetChar(): Char | undefined;
    /** Returns the character's maximum health (08AF)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_MAX_HEALTH [0D39]*/
    getMaxHealth(): float;
    /** Returns the characters model
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_MODEL [0665]*/
    getModel(): int;
    getMoveState(): int;
    /** Gets the name of the characters interior
    *
    * https://library.sannybuilder.com/#/sa?q=GET_NAME_OF_ENTRY_EXIT_CHAR_USED [094B]*/
    getNameOfEntryExitUsed(): string;
    /** Returns the number of members which are in a group of the character (01DE)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_NUMBER_OF_FOLLOWERS [046D]*/
    getNumberOfFollowers(): int;
    /** Returns the coordinates of the character, with an offset
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OFFSET_FROM_CHAR_IN_WORLD_COORDS [04C4]*/
    getOffsetInWorldCoords(xOffset: float, yOffset: float, zOffset: float): {
        x: float;
        y: float;
        z: float;
    };
    /** Returns the specified character's pedState
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_PEDSTATE [0EAB]*/
    getPedState(): int;
    /** Gets the ped type of the character
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PED_TYPE [089F]*/
    getPedType(): int;
    /** Returns the coordinates and heading of the entry (enex) marker the character used to get to the current interior
    *
    * https://library.sannybuilder.com/#/sa?q=GET_POSITION_OF_ENTRY_EXIT_CHAR_USED [094C]*/
    getPositionOfEntryExitCharUsed(): {
        x: float;
        y: float;
        z: float;
        heading: float;
    };
    /** Returns the specified character's damage proofs
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_PROOFS [0EAC]*/
    getProofs(): {
        bullet: boolean;
        fire: boolean;
        explosion: boolean;
        collision: boolean;
        melee: boolean;
    };
    /** Returns the randomSeed of the specified character
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_RANDOM_SEED [0EC8]*/
    getRandomSeed(): int;
    /** Returns the samp player's id controlling the character handle. Returns -1 if the character isn't controlled by any Player
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_PLAYER_ID [0B2B]*/
    getSampId(): SampPlayer;
    /** Returns the status of the specified script task of the character
    *
    * https://library.sannybuilder.com/#/sa?q=GET_SCRIPT_TASK_STATUS [062E]*/
    getScriptTaskStatus(taskId: int): int;
    /** Gets the characters task sequence progress, as started by 0618
    *
    * https://library.sannybuilder.com/#/sa?q=GET_SEQUENCE_PROGRESS [0646]*/
    getSequenceProgress(): int;
    getSequenceProgressRecursive(): {
        _p2: int;
        _p3: int;
    };
    /** Returns the character's simplest active taskId and the address of the task
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_SIMPLEST_ACTIVE_TASK [0EFF]*/
    getSimplestActiveTask(): {
        taskId: int;
        address: int;
    } | undefined;
    /** Returns the char's movement speed
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_SPEED [06AC]*/
    getSpeed(): float;
    /** Returns the specified character's pedStat ID (data\pedstats.dat)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_STAT_ID [0EB1]*/
    getStatId(): int;
    getSwimState(): int;
    /** Returns the address of the character's task by taskId
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_TASK_POINTER_BY_ID [0E43]*/
    getTaskPointerById(taskId: int): int | undefined;
    /** Returns the TimeIsDead in milliseconds since the specified character is dead
    *
    * https://library.sannybuilder.com/#/sa?q=GET_TIME_CHAR_IS_DEAD [0ECE]*/
    getTimeIsDead(): int;
    /** Gets the characters velocity
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_VELOCITY [083D]*/
    getVelocity(): {
        x: float;
        y: float;
        z: float;
    };
    /** Returns the weapon type, ammo and model from the specified slot
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_WEAPON_IN_SLOT [04B8]*/
    getWeaponInSlot(weaponSlotId: int): {
        weaponType: int;
        weaponAmmo: int;
        weaponModel: int;
    };
    /** Returns the character's current weaponState
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CHAR_WEAPON_STATE [0E8B]*/
    getWeaponState(): int;
    /** Sets the specified characters fighting style and moves
    *
    * https://library.sannybuilder.com/#/sa?q=GIVE_MELEE_ATTACK_TO_CHAR [07FE]*/
    giveMeleeAttack(style: int, move: int): Char;
    /** Gives the character the weapon with the specified amount of ammo
    *
    * https://library.sannybuilder.com/#/sa?q=GIVE_WEAPON_TO_CHAR [01B2]*/
    giveWeapon(weaponType: int, ammo: int): Char;
    /** Returns true if the character has been arrested
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CHAR_BEEN_ARRESTED [0741]*/
    hasBeenArrested(): boolean;
    /** Returns true if the char has been hurt by the specified vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CHAR_BEEN_DAMAGED_BY_CAR [051B]*/
    hasBeenDamagedByCar(handle: Car): boolean;
    /** Returns true if the character has been hurt by the other character
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CHAR_BEEN_DAMAGED_BY_CHAR [051A]*/
    hasBeenDamagedByChar(handle: Char): boolean;
    /** Returns true if the character has been hit by the specified weapon
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CHAR_BEEN_DAMAGED_BY_WEAPON [031D]*/
    hasBeenDamagedByWeapon(weaponType: int): boolean;
    /** Returns true if the character has been photographed
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CHAR_BEEN_PHOTOGRAPHED [04C5]*/
    hasBeenPhotographed(): boolean;
    /** Returns true if the character has the specified weapon
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CHAR_GOT_WEAPON [0491]*/
    hasGotWeapon(weaponType: int): boolean;
    /** Returns true if the character can see the target character
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CHAR_SPOTTED_CHAR [0364]*/
    hasSpottedChar(target: Char): boolean;
    /** Returns true if the character can see the other character in front of them
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CHAR_SPOTTED_CHAR_IN_FRONT [09ED]*/
    hasSpottedCharInFront(handle: Char): boolean;
    /** Hides all of the specified char's weapons
    *
    * https://library.sannybuilder.com/#/sa?q=HIDE_CHAR_WEAPON_FOR_SCRIPTED_CUTSCENE [06AB]*/
    hideWeaponForScriptedCutscene(state: boolean): Char;
    ignoreHeightDifferenceFollowingNodes(state: boolean): Char;
    /** Inits additional variables for this char. Identifier can be "AUTO" for unique ID based on script pointer
    *
    * https://library.sannybuilder.com/#/sa?q=INIT_EXTENDED_CHAR_VARS [0E14]*/
    initExtendedVars(identifier: string, totalVars: int): boolean;
    isAtScriptedAttractor(handle: Attractor): boolean;
    /** Returns true if the char is turreted on any vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_ATTACHED_TO_ANY_CAR [0A32]*/
    isAttachedToAnyCar(): boolean;
    /** Returns true if the character is holding the given type of weapon
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CURRENT_CHAR_WEAPON [02D8]*/
    isCurrentWeapon(weaponType: int): boolean;
    /** Returns true if the specified character is doing any important task
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_DOING_ANY_IMPORTANT_TASK [0E4C]*/
    isDoingAnyImportantTask(): boolean;
    /** Returns true if the character is performing the specified task
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_DOING_TASK_ID [0E42]*/
    isDoingTaskId(taskId: int): boolean;
    /** Returns true if the specified character is crouching
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_DUCKING [0597]*/
    isDucking(): boolean;
    /** Returns true if the specified character is entering any car
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_ENTERING_ANY_CAR [0E49]*/
    isEnteringAnyCar(): boolean;
    /** Returns true if the specified character is exiting any car
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_EXITING_ANY_CAR [0E4A]*/
    isExitingAnyCar(): boolean;
    /** Returns true if the specified character has fallen on the ground
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_FALLEN_ON_GROUND [0E48]*/
    isFallenOnGround(): boolean;
    /** Returns true if the specified character is fighting
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_FIGHTING [0E47]*/
    isFighting(): boolean;
    /** Returns true if the character is entering a car, but is not in the car
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_GETTING_IN_TO_A_CAR [09DE]*/
    isGettingInToACar(): boolean;
    /** Returns true if the character is the leader of the specified group
    *
    * https://library.sannybuilder.com/#/sa?q=IS_GROUP_LEADER [06EF]*/
    isGroupLeader(handle: Group): boolean;
    /** Returns true if the character is a member of the specified group
    *
    * https://library.sannybuilder.com/#/sa?q=IS_GROUP_MEMBER [06EE]*/
    isGroupMember(handle: Group): boolean;
    /** Returns true if the character has had its head shot off
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_HEAD_MISSING [09A8]*/
    isHeadMissing(): boolean;
    /** Returns true if the character's health is over the specified value
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_HEALTH_GREATER [0184]*/
    isHealthGreater(health: int): boolean;
    /** Returns true if the char is lifting the specified object
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_HOLDING_OBJECT [0737]*/
    isHoldingObject(handle: ScriptObject): boolean;
    /** Returns true if the character is in the air
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_AIR [0818]*/
    isInAir(): boolean;
    /** Checks if the character is within the angled 2D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_ANGLED_AREA_2D [05F6]*/
    isInAngledArea2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, angle: float, drawSphere: boolean): boolean;
    /** Checks if the character is within the angled 3D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_ANGLED_AREA_3D [05FC]*/
    isInAngledArea3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, angle: float, drawSphere: boolean): boolean;
    /** Checks if the character is in a car which is within the angled 2D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_ANGLED_AREA_IN_CAR_2D [05F8]*/
    isInAngledAreaInCar2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, angle: float, drawSphere: boolean): boolean;
    isInAngledAreaInCar3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, angle: float, drawSphere: boolean): boolean;
    /** Checks if the character is within the angled 2D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_ANGLED_AREA_ON_FOOT_2D [05F7]*/
    isInAngledAreaOnFoot2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, angle: float, drawSphere: boolean): boolean;
    /** Checks if the character is within the angled 3D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_ANGLED_AREA_ON_FOOT_3D [05FD]*/
    isInAngledAreaOnFoot3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, angle: float, drawSphere: boolean): boolean;
    /** Returns true if the character is driving a boat
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_ANY_BOAT [04A7]*/
    isInAnyBoat(): boolean;
    /** Returns true if the character has a vehicle, even if they are not actually sat inside it (opening and closing the door)
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_ANY_CAR [00DF]*/
    isInAnyCar(): boolean;
    /** Returns true if the character is flying a helicopter
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_ANY_HELI [04A9]*/
    isInAnyHeli(): boolean;
    /** Returns true if the character is in a plane
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_ANY_PLANE [04AB]*/
    isInAnyPlane(): boolean;
    /** Returns true if the character is driving a police vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_ANY_POLICE_VEHICLE [056C]*/
    isInAnyPoliceVehicle(): boolean;
    /** Returns the handle for the searchlight that's targeting the character
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_ANY_SEARCHLIGHT [07A9]*/
    isInAnySearchlight(): Searchlight | undefined;
    /** Returns true if the specified character is in a train
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_ANY_TRAIN [09AE]*/
    isInAnyTrain(): boolean;
    /** Returns true if the character is within the specified 2D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_AREA_2D [00A3]*/
    isInArea2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the specified 3D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_AREA_3D [00A4]*/
    isInArea3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the specified 2D area in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_AREA_IN_CAR_2D [01A2]*/
    isInAreaInCar2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the specified 3D area in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_AREA_IN_CAR_3D [01A7]*/
    isInAreaInCar3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the specified 2D area on foot
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_AREA_ON_FOOT_2D [01A1]*/
    isInAreaOnFoot2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the specified 3D area on foot
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_AREA_ON_FOOT_3D [01A6]*/
    isInAreaOnFoot3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, drawSphere: boolean): boolean;
    /** Returns true if the character is in the specified vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_CAR [00DB]*/
    isInCar(vehicle: Car): boolean;
    /** Returns true if the character is in a flying vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_FLYING_VEHICLE [04C8]*/
    isInFlyingVehicle(): boolean;
    /** Returns true if the character is driving a vehicle with the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_MODEL [00DD]*/
    isInModel(modelId: int): boolean;
    /** Returns true if the character is driving a taxi
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_TAXI [0602]*/
    isInTaxi(): boolean;
    /** Returns true if the character is in water
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_WATER [04AD]*/
    isInWater(): boolean;
    /** Returns true if the character is in the specified map zone
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_ZONE [0154]*/
    isInZone(zone: string): boolean;
    /** Returns true if the character is male
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_MALE [03A3]*/
    isMale(): boolean;
    /** Returns true if the character's model ID is equivalent to the model ID passed
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_MODEL [02F2]*/
    isModel(modelId: int): boolean;
    /** Returns true if any characters are within range of the character
    *
    * https://library.sannybuilder.com/#/sa?q=ARE_ANY_CHARS_NEAR_CHAR [06FF]*/
    isNearAnyChars(radius: float): boolean;
    /** Returns true if the character is riding a bike
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_ON_ANY_BIKE [047A]*/
    isOnAnyBike(): boolean;
    /** Returns True if the character is on fire
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_ON_FIRE [0EA4]*/
    isOnFire(): boolean;
    /** Returns true if the character is on foot, and not occupying a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_ON_FOOT [044B]*/
    isOnFoot(): boolean;
    /** Returns true if the character is visible
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_ON_SCREEN [02CB]*/
    isOnScreen(): boolean;
    /** Returns true if character is performing the specified animation
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_PLAYING_ANIM [0611]*/
    isPlayingAnim(animationName: string): boolean;
    /** Returns true if the specified character is playing any script animation
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_PLAYING_ANY_SCRIPT_ANIMATION [0E4B]*/
    isPlayingAnyScriptAnimation(): boolean;
    /** Returns True when the character is really in air, including while using a parachute or jetpack
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_REALLY_IN_AIR [0E92]*/
    isReallyInAir(): boolean;
    /** Returns true if the character is responding to the specified ped event
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_RESPONDING_TO_EVENT [074F]*/
    isRespondingToEvent(event: int): boolean;
    /** Returns true if the specified character is controlled by script
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_SCRIPT_CONTROLLED [0E0A]*/
    isScriptControlled(): boolean;
    /** Returns true if the character is firing a weapon
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_SHOOTING [02E0]*/
    isShooting(): boolean;
    /** Returns true if the character fired a weapon within the specified 2D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_SHOOTING_IN_AREA [02D6]*/
    isShootingInArea(leftBottomX: float, leftBottomY: float, topRightX: float, topRightY: float, drawSphere: boolean): boolean;
    /** Returns true if the character is sitting in any vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_SITTING_IN_ANY_CAR [0449]*/
    isSittingInAnyCar(): boolean;
    /** Returns true if the character is sitting in the specified vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_SITTING_IN_CAR [0448]*/
    isSittingInCar(vehicle: Car): boolean;
    /** Returns true if the character is not moving
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_STOPPED [02A0]*/
    isStopped(): boolean;
    /** Checks if the character is within the angled 2D area and is motionless
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_STOPPED_IN_ANGLED_AREA_2D [05F9]*/
    isStoppedInAngledArea2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, angle: float, drawSphere: boolean): boolean;
    isStoppedInAngledArea3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, angle: float, drawSphere: boolean): boolean;
    /** Checks if the character is in a motionless car within the angled 2D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_STOPPED_IN_ANGLED_AREA_IN_CAR_2D [05FB]*/
    isStoppedInAngledAreaInCar2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, angle: float, drawSphere: boolean): boolean;
    isStoppedInAngledAreaInCar3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, angle: float, drawSphere: boolean): boolean;
    /** Checks if the character is within the angled 2D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_STOPPED_IN_ANGLED_AREA_ON_FOOT_2D [05FA]*/
    isStoppedInAngledAreaOnFoot2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, angle: float, drawSphere: boolean): boolean;
    isStoppedInAngledAreaOnFoot3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, angle: float, drawSphere: boolean): boolean;
    /** Returns true if the character stopped within the specified 2D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_STOPPED_IN_AREA_2D [01A3]*/
    isStoppedInArea2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, drawSphere: boolean): boolean;
    /** Returns true if the character stopped within the specified 3D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_STOPPED_IN_AREA_3D [01A8]*/
    isStoppedInArea3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, drawSphere: boolean): boolean;
    /** Returns true if the character stopped within the specified 2D area in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_STOPPED_IN_AREA_IN_CAR_2D [01A5]*/
    isStoppedInAreaInCar2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, drawSphere: boolean): boolean;
    /** Returns true if the character stopped within the specified 3D area in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_STOPPED_IN_AREA_IN_CAR_3D [01AA]*/
    isStoppedInAreaInCar3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, drawSphere: boolean): boolean;
    /** Returns true if the character stopped within the specified 2D area on foot
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_STOPPED_IN_AREA_ON_FOOT_2D [01A4]*/
    isStoppedInAreaOnFoot2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, drawSphere: boolean): boolean;
    /** Returns true if the character stopped within the specified 3D area on foot
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_STOPPED_IN_AREA_ON_FOOT_3D [01A9]*/
    isStoppedInAreaOnFoot3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, drawSphere: boolean): boolean;
    /** Returns true if the char is stuck under a car
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_STUCK_UNDER_CAR [095D]*/
    isStuckUnderCar(): boolean;
    isSwimming(): boolean;
    /** Returns true if the character is playing any speech
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_TALKING [094D]*/
    isTalking(): boolean;
    /** Returns true if the character is touching the other character
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_TOUCHING_CHAR [0A1B]*/
    isTouchingChar(other: Char): boolean;
    /** Returns true if the character is colliding with the specified object
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_TOUCHING_OBJECT [0179]*/
    isTouchingObject(object: ScriptObject): boolean;
    /** Returns true if the character is colliding with the specified object on foot
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_TOUCHING_OBJECT_ON_FOOT [023B]*/
    isTouchingObjectOnFoot(object: ScriptObject): boolean;
    /** Returns true if the character is colliding with a car
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_TOUCHING_VEHICLE [0547]*/
    isTouchingVehicle(handle: Car): boolean;
    /** Returns true if the specified character is using a gun
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_USING_GUN [0E46]*/
    isUsingGun(): boolean;
    /** Returns true if the character is using a map attractor
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_USING_MAP_ATTRACTOR [09C5]*/
    isUsingMapAttractor(): boolean;
    isWaitingForWorldCollision(): boolean;
    /** Returns true if the specified character has weapon visible set
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_WEAPON_VISIBLE_SET [0EAF]*/
    isWeaponVisibleSet(): boolean;
    listenToPlayerGroupCommands(state: boolean): Char;
    /** Returns true if the character is within the 2D radius of the coordinates point
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ANY_MEANS_2D [00EC]*/
    locateAnyMeans2D(x: float, y: float, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 3D radius of the coordinates point
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ANY_MEANS_3D [00FE]*/
    locateAnyMeans3D(x: float, y: float, z: float, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 2D radius of the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ANY_MEANS_CAR_2D [0202]*/
    locateAnyMeansCar2D(vehicle: Car, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 3D radius of the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ANY_MEANS_CAR_3D [0205]*/
    locateAnyMeansCar3D(vehicle: Car, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 2D radius of the other character
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ANY_MEANS_CHAR_2D [00F2]*/
    locateAnyMeansChar2D(target: Char, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 3D radius of the other character
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ANY_MEANS_CHAR_3D [0104]*/
    locateAnyMeansChar3D(target: Char, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 2D radius of the object
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ANY_MEANS_OBJECT_2D [0471]*/
    locateAnyMeansObject2D(object: ScriptObject, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 3D radius of the object
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ANY_MEANS_OBJECT_3D [0474]*/
    locateAnyMeansObject3D(object: ScriptObject, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns True if the character is within the radius of the specified car
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_DISTANCE_TO_CAR [0EE5]*/
    locateDistanceToCar(car: Car, radius: float): boolean;
    /** Returns True if the character(self) is within the radius of the specified character
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_DISTANCE_TO_CHAR [0EE4]*/
    locateDistanceToChar(character: Char, radius: float): boolean;
    /** Returns True if the character is within the radius of the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_DISTANCE_TO_COORDINATES [0EEA]*/
    locateDistanceToCoordinates(x: float, y: float, z: float, radius: float): boolean;
    /** Returns True if the character is within the radius of the specified object
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_DISTANCE_TO_OBJECT [0EE6]*/
    locateDistanceToObject(object: ScriptObject, radius: float): boolean;
    /** Returns true if the character is within the 2D radius of the coordinates point in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_IN_CAR_2D [00EE]*/
    locateInCar2D(x: float, y: float, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 3D radius of the coordinates point in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_IN_CAR_3D [0100]*/
    locateInCar3D(x: float, y: float, z: float, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 2D radius of the vehicle in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_IN_CAR_CAR_2D [0204]*/
    locateInCarCar2D(handle: Car, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 3D radius of the vehicle in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_IN_CAR_CAR_3D [0207]*/
    locateInCarCar3D(vehicle: Car, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 2D radius of the other character in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_IN_CAR_CHAR_2D [00F4]*/
    locateInCarChar2D(otherChar: Char, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 3D radius of the other character in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_IN_CAR_CHAR_3D [0106]*/
    locateInCarChar3D(target: Char, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 2D radius of the object in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_IN_CAR_OBJECT_2D [0473]*/
    locateInCarObject2D(object: ScriptObject, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 3D radius of the object in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_IN_CAR_OBJECT_3D [0476]*/
    locateInCarObject3D(object: ScriptObject, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 2D radius of the coordinates point on foot
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ON_FOOT_2D [00ED]*/
    locateOnFoot2D(x: float, y: float, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 3D radius of the coordinates point on foot
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ON_FOOT_3D [00FF]*/
    locateOnFoot3D(x: float, y: float, z: float, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 2D radius of the vehicle on foot
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ON_FOOT_CAR_2D [0203]*/
    locateOnFootCar2D(vehicle: Car, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 3D radius of the vehicle on foot
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ON_FOOT_CAR_3D [0206]*/
    locateOnFootCar3D(vehicle: Car, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 2D radius of the other character on foot
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ON_FOOT_CHAR_2D [00F3]*/
    locateOnFootChar2D(target: Char, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 3D radius of the other character on foot
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ON_FOOT_CHAR_3D [0105]*/
    locateOnFootChar3D(target: Char, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 2D radius of the object on foot
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ON_FOOT_OBJECT_2D [0472]*/
    locateOnFootObject2D(object: ScriptObject, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character is within the 3D radius of the object on foot
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_CHAR_ON_FOOT_OBJECT_3D [0475]*/
    locateOnFootObject3D(object: ScriptObject, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character stopped within the 2D radius of the coordinates point
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_STOPPED_CHAR_ANY_MEANS_2D [00EF]*/
    locateStoppedAnyMeans2D(x: float, y: float, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character stopped within the 3D radius of the coordinates point
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_STOPPED_CHAR_ANY_MEANS_3D [0101]*/
    locateStoppedAnyMeans3D(x: float, y: float, z: float, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character stopped within the 2D radius of the coordinates point in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_STOPPED_CHAR_IN_CAR_2D [00F1]*/
    locateStoppedInCar2D(x: float, y: float, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character stopped within the 3D radius of the coordinates point in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_STOPPED_CHAR_IN_CAR_3D [0103]*/
    locateStoppedInCar3D(x: float, y: float, z: float, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character stopped within the 2D radius of the coordinates point on foot
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_STOPPED_CHAR_ON_FOOT_2D [00F0]*/
    locateStoppedOnFoot2D(x: float, y: float, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the character stopped within the 3D radius of the coordinates point on foot
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_STOPPED_CHAR_ON_FOOT_3D [0102]*/
    locateStoppedOnFoot3D(x: float, y: float, z: float, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Marks the character as script controlled
    *
    * https://library.sannybuilder.com/#/sa?q=MARK_CHAR_AS_NEEDED [0E0B]*/
    markAsNeeded(): Char;
    /** Allows the character to be deleted by the game if necessary, and also removes them from the mission cleanup list, if applicable
    *
    * https://library.sannybuilder.com/#/sa?q=MARK_CHAR_AS_NO_LONGER_NEEDED [01C2]*/
    markAsNoLongerNeeded(): Char;
    /** Assigns the character to the specified action sequence
    *
    * https://library.sannybuilder.com/#/sa?q=PERFORM_SEQUENCE_TASK [0618]*/
    performSequence(sequence: Sequence): Char;
    performSequenceFromProgress(sequence: Sequence, startTaskIndex: int, endTaskIndex: int): Char;
    /** Removes the characters weapons
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_ALL_CHAR_WEAPONS [048F]*/
    removeAllWeapons(): Char;
    /** Removes the character with a fade, freeing game memory
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_CHAR_ELEGANTLY [034F]*/
    removeElegantly(): Char;
    /** Removes the character from the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_CHAR_FROM_CAR_MAINTAIN_POSITION [09C9]*/
    removeFromCarMaintainPosition(vehicle: Car): Char;
    /** Removes the character from their current group
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_CHAR_FROM_GROUP [06C9]*/
    removeFromGroup(): Char;
    /** Removes the weapon from the character
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_WEAPON_FROM_CHAR [0555]*/
    removeWeapon(weaponType: int): Char;
    /** Affects how often the character will hit the target when attacking with a weapon
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_ACCURACY [02E2]*/
    setAccuracy(accuracy: int): Char;
    /** Sets whether the character can crouch
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_ALLOWED_TO_DUCK [0856]*/
    setAllowedToDuck(state: boolean): Char;
    /** Sets the amount of ammo the character has in the specified weapon
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_AMMO [017B]*/
    setAmmo(weaponType: int, ammo: int): Char;
    /** Sets how far through the animation the character is, with 1
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_ANIM_CURRENT_TIME [0614]*/
    setAnimCurrentTime(animationName: string, time: float): Char;
    /** Sets the animation group for the character
    *
    * https://library.sannybuilder.com/#/sa?q=SET_ANIM_GROUP_FOR_CHAR [0245]*/
    setAnimGroup(animGroup: int): Char;
    /** Sets whether the animation is playing
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_ANIM_PLAYING_FLAG [0612]*/
    setAnimPlayingFlag(animationName: string, flag: boolean): Char;
    /** Makes an char perform an animation at the specified speed
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_ANIM_SPEED [0393]*/
    setAnimSpeed(animName: string, animSpeed: float): Char;
    /** Sets the interior that the char is in
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_AREA_VISIBLE [0860]*/
    setAreaVisible(areaId: int): Char;
    /** Sets the specified character's pedState to Arrested
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_ARRESTED [0EAA]*/
    setArrested(): Char;
    /** Makes a character bleed
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_BLEEDING [0332]*/
    setBleeding(state: boolean): Char;
    /** Specifies that the character should only use upper-body damage animations, meaning they can still run if shot in the legs etc
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_BULLETPROOF_VEST [093B]*/
    setBulletproofVest(state: boolean): Char;
    /** Sets whether the character always stays on bike in collisions
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_CAN_BE_KNOCKED_OFF_BIKE [08C6]*/
    setCanBeKnockedOffBike(stayOnBike: boolean): Char;
    /** Makes the character immune to a damage while in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_CAN_BE_SHOT_IN_VEHICLE [054A]*/
    setCanBeShotInVehicle(state: boolean): Char;
    /** Locks the character while in a car
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_CANT_BE_DRAGGED_OUT [039E]*/
    setCantBeDraggedOut(state: boolean): Char;
    /** Sets whether collision detection is enabled for the character
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_COLLISION [0619]*/
    setCollision(state: boolean): Char;
    /** Puts the character at the specified location
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_COORDINATES [00A1]*/
    setCoordinates(x: float, y: float, z: float): Char;
    /** Sets the character's coordinates without warping the rest of their group
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_COORDINATES_DONT_WARP_GANG [08C7]*/
    setCoordinatesDontWarpGang(x: float, y: float, z: float): Char;
    /** This command is a combination of 0972 and 08C7
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_COORDINATES_DONT_WARP_GANG_NO_OFFSET [09BC]*/
    setCoordinatesDontWarpGangNoOffset(x: float, y: float, z: float): Char;
    /** Puts the characters at the coordinates by the center of body instead of the feet
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_COORDINATES_NO_OFFSET [0972]*/
    setCoordinatesNoOffset(x: float, y: float, z: float): Char;
    /** Sets the character's coordinates without exception protocols
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_COORDINATES_SIMPLE [0E32]*/
    setCoordinatesSimple(x: float, y: float, z: float): Char;
    /** Sets the character's currently held weapon
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CURRENT_CHAR_WEAPON [01B9]*/
    setCurrentWeapon(weaponType: int): Char;
    /** Prevents pickups, which are created when this character dies, from disappearing until picked up by the player
    *
    * https://library.sannybuilder.com/#/sa?q=SET_DEATH_WEAPONS_PERSIST [0A27]*/
    setDeathWeaponsPersist(state: boolean): Char;
    /** Sets the decision maker for the character
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_DECISION_MAKER [060B]*/
    setDecisionMaker(handleOrTemplate: int): Char;
    /** Sets whether the character will drop any of their weapons when they die
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_DROPS_WEAPONS_WHEN_DEAD [087E]*/
    setDropsWeaponsWhenDead(state: boolean): Char;
    /** Controls whether the character can drown in water
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_DROWNS_IN_WATER [04D8]*/
    setDrownsInWater(state: boolean): Char;
    setDruggedUp(state: boolean): Char;
    /** Sets extended var value for this char. Requires initialization (0E14), otherwise returns false
    *
    * https://library.sannybuilder.com/#/sa?q=SET_EXTENDED_CHAR_VAR [0E15]*/
    setExtendedVar(identifier: string, varNumber: int, value: int): boolean;
    /** Sets the range within which the char responds to events
    *
    * https://library.sannybuilder.com/#/sa?q=SET_FOLLOW_NODE_THRESHOLD_DISTANCE [0648]*/
    setFollowNodeThresholdDistance(range: float): Char;
    /** Makes a character remain in the car upon death
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_FORCE_DIE_IN_CAR [0982]*/
    setForceDieInCar(state: boolean): Char;
    /** Controls whether the character will try to exit an upside-down car until it is on fire
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_GET_OUT_UPSIDE_DOWN_CAR [09F6]*/
    setGetOutUpsideDownCar(state: boolean): Char;
    /** Locates the entry/exit marker in the specified radius of the specified coordinates and links it to the character, also setting the appropriate interior ID for the character and setting the appropriate sky color if the character is player-controlled
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_HAS_USED_ENTRY_EXIT [08AD]*/
    setHasUsedEntryExit(x: float, y: float, radius: float): Char;
    /** Sets the character's heading (z-angle)
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_HEADING [0173]*/
    setHeading(heading: float): Char;
    /** Sets the heading limit for a character attached to an object or vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=SET_HEADING_LIMIT_FOR_ATTACHED_CHAR [0887]*/
    setHeadingLimitForAttached(heading: int, headingRange: float): Char;
    /** Sets the character's health
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_HEALTH [0223]*/
    setHealth(health: int): Char;
    setIgnoreDamageAnims(state: boolean): Char;
    setInformRespectedFriends(radius: float, _p3: int): Char;
    /** Sets whether the character is a psychotic killer or not
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_IS_CHRIS_CRIMINAL [0433]*/
    setIsChrisCriminal(state: boolean): Char;
    /** Causes the auto aim to be more likely to target the specified char than actors without this flag
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_IS_TARGET_PRIORITY [0770]*/
    setIsTargetPriority(state: boolean): Char;
    /** Sets whether the character should keep their tasks after mission cleanup (basically cleanup will be skipped for this character)
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_KEEP_TASK [0961]*/
    setKeepTask(state: boolean): Char;
    /** Sets whether the character shouldn't chase their victim far (to attempt a melee attack or get in weapon range)
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_KINDA_STAY_IN_SAME_PLACE [0816]*/
    setKindaStayInSamePlace(state: boolean): Char;
    setLoadCollisionFlag(state: boolean): Char;
    /** Sets the characters max health
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_MAX_HEALTH [08AF]*/
    setMaxHealth(maxHealth: int): Char;
    /** Set's the specified character's transparency alpha
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_MODEL_ALPHA [0D10]*/
    setModelAlpha(alpha: int): Char;
    /** Sets the character's cash sum, setting how much cash they will drop when dead
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_MONEY [03FE]*/
    setMoney(amount: int): Char;
    /** Prevents the character from leaving their group
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_NEVER_LEAVES_GROUP [087F]*/
    setNeverLeavesGroup(state: boolean): Char;
    /** Sets whether the character won't be targeted by the autoaim system
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_NEVER_TARGETTED [0568]*/
    setNeverTargeted(state: boolean): Char;
    /** Makes a character immune to everything except the player
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_ONLY_DAMAGED_BY_PLAYER [02A9]*/
    setOnlyDamagedByPlayer(state: boolean): Char;
    /** Sets the character's immunities
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_PROOFS [02AB]*/
    setProofs(bulletProof: boolean, fireProof: boolean, explosionProof: boolean, collisionProof: boolean, meleeProof: boolean): Char;
    setRelationship(relationshipType: int, pedType: int): Char;
    /** Sets the renderObject to AutoHide if the character is dead, is using a weapon, or enters a car
    *
    * https://library.sannybuilder.com/#/sa?q=SET_RENDER_OBJECT_AUTO_HIDE [0E30]*/
    setRenderObjectAutoHide(dead: boolean, weapon: boolean, car: boolean): Char;
    /** Sets the characters rotation
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_ROTATION [083E]*/
    setRotation(x: float, y: float, z: float): Char;
    /** Works similar to 05C1, but returns which phrase was spoken and is not run as a task
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_SAY_CONTEXT [0947]*/
    setSayContext(phrase: int): int;
    setSayContextImportant(phrase: int, overrideSilence: boolean, ignoreMute: boolean, frontEnd: boolean): int;
    setSayScript(_p2: int, _p3: boolean, _p4: boolean, _p5: boolean): Char;
    /** Sets this char as controlled by player two
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_SECOND_PLAYER [0EA0]*/
    setSecondPlayer(enableCamera: boolean, separateCars: boolean): Char;
    /** Sets the attack rate of the char
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_SHOOT_RATE [07DD]*/
    setShootRate(rate: int): Char;
    /** Sets whether the character signals after killing
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_SIGNAL_AFTER_KILL [09B5]*/
    setSignalAfterKill(state: boolean): Char;
    /** Makes the character stay in the vehicle when it is jacked (characters let themselves get "kidnapped")
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_STAY_IN_CAR_WHEN_JACKED [0526]*/
    setStayInCarWhenJacked(state: boolean): Char;
    /** Makes the character maintain their position when attacked
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_STAY_IN_SAME_PLACE [0350]*/
    setStayInSamePlace(state: boolean): Char;
    /** Sets whether the specified character is immune to headshots
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_SUFFERS_CRITICAL_HITS [0446]*/
    setSuffersCriticalHits(state: boolean): Char;
    /** Sets the speed that the character swims at, changing their swimming animation speed
    *
    * https://library.sannybuilder.com/#/sa?q=SET_SWIM_SPEED [0A28]*/
    setSwimSpeed(speed: float): Char;
    setUsesUpperbodyDamageAnimsOnly(state: boolean): Char;
    /** Sets the characters velocity
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_VELOCITY [083C]*/
    setVelocity(x: float, y: float, z: float): Char;
    /** Sets whether the character is visible or not
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_VISIBLE [0337]*/
    setVisible(state: boolean): Char;
    /** Sets whether police should chase the character
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_WANTED_BY_POLICE [09B6]*/
    setWantedByPolice(state: boolean): Char;
    /** Sets the character's fire arms wielding style
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_WEAPON_SKILL [081A]*/
    setWeaponSkill(skill: int): Char;
    /** Sets the character's ability to talk
    *
    * https://library.sannybuilder.com/#/sa?q=SHUT_CHAR_UP [0489]*/
    shutUp(state: boolean): Char;
    /** Works similar to 0489, but mutes more things, including ambient speeches (needs confirming)
    *
    * https://library.sannybuilder.com/#/sa?q=SHUT_CHAR_UP_FOR_SCRIPTED_SPEECH [0A09]*/
    shutUpForScriptedSpeech(state: boolean): Char;
    /** Makes a character move their mouth as if they were talking
    *
    * https://library.sannybuilder.com/#/sa?q=START_CHAR_FACIAL_TALK [0967]*/
    startFacialTalk(duration: int): Char;
    /** Stops the character moving their mouth as if they were talking
    *
    * https://library.sannybuilder.com/#/sa?q=STOP_CHAR_FACIAL_TALK [0968]*/
    stopFacialTalk(): Char;
    /** Returns the vehicle the character is attached to
    *
    * https://library.sannybuilder.com/#/sa?q=STORE_CAR_CHAR_IS_ATTACHED_TO_NO_SAVE [0A33]*/
    storeCarIsAttachedToNoSave(): Car;
    /** Returns the current vehicle of the character and adds it to the mission cleanup list (alts:03C0,0811,0484)
    *
    * https://library.sannybuilder.com/#/sa?q=STORE_CAR_CHAR_IS_IN [00D9]*/
    storeCarIsIn(): Car;
    /** Returns the character's vehicle handle without marking it as used by the script, therefore allowing it to be deleted by the game at any time (alts:00D9,0811,0484)
    *
    * https://library.sannybuilder.com/#/sa?q=STORE_CAR_CHAR_IS_IN_NO_SAVE [03C0]*/
    storeCarIsInNoSave(): Car;
    /** Stores the handles of a vehicle and ped closest to the char or -1 otherwise. Ignores script created entities
    *
    * https://library.sannybuilder.com/#/sa?q=STORE_CLOSEST_ENTITIES [0AB5]*/
    storeClosestEntities(): {
        carHandle: Car;
        charHandle: Char;
    };
    /** Pulls the character out of their car and places at the location
    *
    * https://library.sannybuilder.com/#/sa?q=WARP_CHAR_FROM_CAR_TO_COORD [0362]*/
    warpFromCarToCoord(x: float, y: float, z: float): Char;
    /** Puts the character in the specified vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=WARP_CHAR_INTO_CAR [036A]*/
    warpIntoCar(vehicle: Car): Char;
    /** Puts the character into a vehicle's passenger seat
    *
    * https://library.sannybuilder.com/#/sa?q=WARP_CHAR_INTO_CAR_AS_PASSENGER [0430]*/
    warpIntoCarAsPassenger(handle: Car, seat: int): Char;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Checkpoint */
declare class Checkpoint {
    constructor(handle: number);
    /** Creates racing/flight style red checkpoint object
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_CHECKPOINT [06D5]*/
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
    * https://library.sannybuilder.com/#/sa?q=ADD_CLEO_BLIP [0E2A]*/
    static Add(rwTextureOrRadarSprite: int, x: float, y: float, short: boolean, red: int, green: int, blue: int, alpha: int): CleoBlip;
    /** Removes a cleo blip
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_CLEO_BLIP [0E2B]*/
    remove(): void;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Clipboard */
interface Clipboard {
    /** Copies the specified number of bytes of text from the clipboard to the address
    *
    * https://library.sannybuilder.com/#/sa?q=READ_CLIPBOARD_DATA [0B20]*/
    ReadData(address: int, number: int): void;
    /** Copies  the specified number of bytes of text from the address to the clipboard
    *
    * https://library.sannybuilder.com/#/sa?q=WRITE_CLIPBOARD_DATA [0B21]*/
    WriteData(address: int, number: int): void;
}
declare var Clipboard: Clipboard
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Clock */
interface Clock {
    /** Returns the in-game day of the month and month of the year
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CURRENT_DATE [0835]*/
    GetCurrentDate(): {
        day: int;
        month: int;
    };
    /** Returns an integer representation of the in-game day of the week
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CURRENT_DAY_OF_WEEK [07D0]*/
    GetCurrentDayOfWeek(): int;
    /** Returns the clock's current hour
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CURRENT_HOUR [0E40]*/
    GetCurrentHour(): int;
    /** Returns the clock's current minute
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CURRENT_MINUTE [0E41]*/
    GetCurrentMinute(): int;
    /** Returns the time passed in milliseconds since the game started
    *
    * https://library.sannybuilder.com/#/sa?q=GET_GAME_TIMER [01BD]*/
    GetGameTimer(): int;
    /** Returns the full local time of the player's PC
    *
    * https://library.sannybuilder.com/#/sa?q=GET_LOCAL_TIME [0D2D]*/
    GetLocalTime(): {
        year: int;
        month: int;
        weekDay: int;
        day: int;
        hour: int;
        minute: int;
        second: int;
        millisecond: int;
    };
    /** Returns the number of minutes left until the clock matches the time specified
    *
    * https://library.sannybuilder.com/#/sa?q=GET_MINUTES_TO_TIME_OF_DAY [00C1]*/
    GetMinutesToTimeOfDay(hours: int, minutes: int): int;
    /** Returns the number of hours and minutes passed since midnight
    *
    * https://library.sannybuilder.com/#/sa?q=GET_TIME_OF_DAY [00BF]*/
    GetTimeOfDay(): {
        hours: int;
        minutes: int;
    };
    /** Simulates the passage of time on the clock, calendar and environment
    *
    * https://library.sannybuilder.com/#/sa?q=PASS_TIME [0EBB]*/
    PassTime(minutes: int): void;
    /** Restores the game time to the time when it was saved with 0253
    *
    * https://library.sannybuilder.com/#/sa?q=RESTORE_CLOCK [0254]*/
    Restore(): void;
    /** Sets the current in-game time
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TIME_OF_DAY [00C0]*/
    SetTimeOfDay(hours: int, minutes: int): void;
    /** Progresses the game to the next day
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TIME_ONE_DAY_FORWARD [088E]*/
    SetTimeOneDayForward(): void;
    /** Sets the game to run at the specified speed
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TIME_SCALE [015D]*/
    SetTimeScale(scale: float): void;
    /** Saves the current time in game
    *
    * https://library.sannybuilder.com/#/sa?q=STORE_CLOCK [0253]*/
    Store(): void;
}
declare var Clock: Clock
/** Class ColPoint
 * 
 * https://library.sannybuilder.com/#/sa/classes/ColPoint */
interface ColPoint {
    /** Returns the colPoint, coordinates, and collision entity between two points
    *
    * https://library.sannybuilder.com/#/sa?q=GET_COLLISION_BETWEEN_POINTS [0D3A]*/
    GetCollisionBetweenPoints(fromX: float, fromY: float, fromZ: float, toX: float, toY: float, toZ: float, buildings: boolean, vehicles: boolean, peds: boolean, objects: boolean, dummies: boolean, seeThroughCheck: boolean, cameraIgnoreCheck: boolean, shotThroughCheck: boolean, entityToIgnore: int): {
        handle: ColPoint;
        outX: float;
        outY: float;
        outZ: float;
        entity: int;
    } | undefined;
    /** Returns the coordinates of the specified ColPoint
    *
    * https://library.sannybuilder.com/#/sa?q=GET_COLPOINT_COORDINATES [0EE1]*/
    getCoordinates(): {
        x: float;
        y: float;
        z: float;
    };
    /** Returns the depth of the specified ColPoint
    *
    * https://library.sannybuilder.com/#/sa?q=GET_COLPOINT_DEPTH [0D3E]*/
    getDepth(): float;
    /** Returns the lighting of the specified ColPoint
    *
    * https://library.sannybuilder.com/#/sa?q=GET_COLPOINT_LIGHTING [0E6B]*/
    getLighting(fromNight: boolean): int;
    /** Returns the vector of the specified ColPoint
    *
    * https://library.sannybuilder.com/#/sa?q=GET_COLPOINT_NORMAL_VECTOR [0D3B]*/
    getNormalVector(): {
        x: float;
        y: float;
        z: float;
    };
    /** Returns the surfaceType of the specified ColPoint
    *
    * https://library.sannybuilder.com/#/sa?q=GET_COLPOINT_SURFACE [0D3C]*/
    getSurface(): int;
}
declare var ColPoint: ColPoint
/** Class Component
 * 
 * https://library.sannybuilder.com/#/sa/classes/Component */
interface Component {
    /** Gets component child component
    *
    * https://library.sannybuilder.com/#/sa?q=GET_COMPONENT_CHILD_COMPONENT [0D1F]*/
    getChildComponent(): Component;
    /** Gets component modelling matrix
    *
    * https://library.sannybuilder.com/#/sa?q=GET_COMPONENT_MODELLING_MATRIX [0D23]*/
    getModellingMatrix(): int;
    /** Gets component name component
    *
    * https://library.sannybuilder.com/#/sa?q=GET_COMPONENT_NAME [0D21]*/
    getName(): string;
    /** Gets component next component
    *
    * https://library.sannybuilder.com/#/sa?q=GET_COMPONENT_NEXT_COMPONENT [0D20]*/
    getNextComponent(): Component;
    /** Gets component number of objects
    *
    * https://library.sannybuilder.com/#/sa?q=GET_COMPONENT_NUM_OBJECTS [0D75]*/
    getNumObjects(): int;
    /** Gets component parent component
    *
    * https://library.sannybuilder.com/#/sa?q=GET_COMPONENT_PARENT_COMPONENT [0D74]*/
    getParentComponent(): Component;
    /** Gets component world matrix
    *
    * https://library.sannybuilder.com/#/sa?q=GET_COMPONENT_WORLD_MATRIX [0D22]*/
    getWorldMatrix(): int;
}
declare var Component: Component
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Conversation */
interface Conversation {
    ClearForChar(handle: Char): void;
    /** Pauses the scripted conversation assigned to the specified character
    *
    * https://library.sannybuilder.com/#/sa?q=ENABLE_CONVERSATION [089C]*/
    Enable(handle: Char, state: boolean): void;
    /** Finalizes the current conversation sequence started with 0717. Selected answers will be subtitled
    *
    * https://library.sannybuilder.com/#/sa?q=FINISH_SETTING_UP_CONVERSATION [0719]*/
    FinishSettingUp(): void;
    /** Finalizes the current conversation sequence started with 0717. Selected answers will not be subtitled
    *
    * https://library.sannybuilder.com/#/sa?q=FINISH_SETTING_UP_CONVERSATION_NO_SUBTITLES [0A47]*/
    FinishSettingUpNoSubtitles(): void;
    /** Returns true if the conversation is at the specified node
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CONVERSATION_AT_NODE [071A]*/
    IsAtNode(handle: Char, speech: string): boolean;
    /** Returns true if there is a conversation going on between the character and the player and both the character and the player are able to communicate with one another
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_IN_POSITION_FOR_CONVERSATION [089B]*/
    IsPlayerInPosition(handle: Char): boolean;
    /** Sets the script audio ID (see 03CF) for the specified conversation response node
    *
    * https://library.sannybuilder.com/#/sa?q=SET_UP_CONVERSATION_END_NODE_WITH_SCRIPTED_SPEECH [0A3C]*/
    SetUpEndNodeWithScriptedSpeech(speech: string, speechSoundId: int): void;
    /** Sets the speech sound for the specified conversation response node
    *
    * https://library.sannybuilder.com/#/sa?q=SET_UP_CONVERSATION_END_NODE_WITH_SPEECH [09AA]*/
    SetUpEndNodeWithSpeech(text: string, phrase: int): void;
    /** Adds a new line to the scripted conversation
    *
    * https://library.sannybuilder.com/#/sa?q=SET_UP_CONVERSATION_NODE_WITH_SCRIPTED_SPEECH [0A18]*/
    SetUpNodeWithScriptedSpeech(question: string, positiveAnswer: string, negativeAnswer: string, questionSoundId: int, positiveAnswerSoundId: int, negativeAnswerSoundId: int): void;
    /** Specifies the dialogue GXT's and audio ID's
    *
    * https://library.sannybuilder.com/#/sa?q=SET_UP_CONVERSATION_NODE_WITH_SPEECH [09A4]*/
    SetUpNodeWithSpeech(question: string, positiveAnswer: string, negativeAnswer: string, questionPhrase: int, positiveAnswerPhrase: int, negativeAnswerPhrase: int): void;
    /** Starts a conversation between the character and the player and clears the conversation lines
    *
    * https://library.sannybuilder.com/#/sa?q=START_SETTING_UP_CONVERSATION [0717]*/
    StartSettingUp(handle: Char): void;
}
declare var Conversation: Conversation
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Crane */
interface Crane {
    /** Enables/disables individual crane controls
    *
    * https://library.sannybuilder.com/#/sa?q=ENABLE_CRANE_CONTROLS [0898]*/
    EnableControls(up: boolean, down: boolean, release: boolean): void;
    /** Puts the player in the San Fierro building site crane
    *
    * https://library.sannybuilder.com/#/sa?q=PLAYER_ENTERED_BUILDINGSITE_CRANE [079E]*/
    PlayerEnteredBuildingsiteCrane(): void;
    /** Puts the player in the San Fierro dock crane
    *
    * https://library.sannybuilder.com/#/sa?q=PLAYER_ENTERED_DOCK_CRANE [079D]*/
    PlayerEnteredDockCrane(): void;
    /** Puts the player in the crane at the building site in Las Venturras
    *
    * https://library.sannybuilder.com/#/sa?q=PLAYER_ENTERED_LAS_VEGAS_CRANE [07FA]*/
    PlayerEnteredLasVegasCrane(): void;
    /** Puts the player in the crane at the quarry near Las Venturras
    *
    * https://library.sannybuilder.com/#/sa?q=PLAYER_ENTERED_QUARRY_CRANE [07F9]*/
    PlayerEnteredQuarryCrane(): void;
    /** Removes the player from the current crane
    *
    * https://library.sannybuilder.com/#/sa?q=PLAYER_LEFT_CRANE [079F]*/
    PlayerLeftCrane(): void;
}
declare var Crane: Crane
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Credits */
interface Credits {
    /** Returns true if the credits have finished
    *
    * https://library.sannybuilder.com/#/sa?q=ARE_CREDITS_FINISHED [0436]*/
    AreFinished(): boolean;
    /** Makes the credits scroll up the screen
    *
    * https://library.sannybuilder.com/#/sa?q=START_CREDITS [0434]*/
    Start(): void;
    /** Stops the credits text from showing
    *
    * https://library.sannybuilder.com/#/sa?q=STOP_CREDITS [0435]*/
    Stop(): void;
}
declare var Credits: Credits
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Cutscene */
interface Cutscene {
    AppendToNext(objectName: string, animName: string): void;
    /** Ends the current cutscene, freeing game memory
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_CUTSCENE [02EA]*/
    Clear(): void;
    /** Stores the offset of the currently loaded cutscene
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CUTSCENE_OFFSET [08D1]*/
    GetOffset(): {
        xOffset: float;
        yOffset: float;
        zOffset: float;
    };
    /** Returns the time in milliseconds passed since the cutscene has started (02E7)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CUTSCENE_TIME [02E8]*/
    GetTime(): int;
    /** Returns true if the cutscene has finished
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CUTSCENE_FINISHED [02E9]*/
    HasFinished(): boolean;
    /** Returns true if the cutscene has finished loading
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CUTSCENE_LOADED [06B9]*/
    HasLoaded(): boolean;
    /** Returns true if a cutscene is active (02E7)
    *
    * https://library.sannybuilder.com/#/sa?q=IS_ON_CUTSCENE [0E25]*/
    IsOn(): boolean;
    /** Loads the data for the specified cutscene
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_CUTSCENE [02E4]*/
    Load(name: string): void;
    /** Sets the position for a cutscene
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CUTSCENE_OFFSET [0244]*/
    SetOffset(x: float, y: float, z: float): void;
    /** Starts the loaded cutscene (02E4)
    *
    * https://library.sannybuilder.com/#/sa?q=START_CUTSCENE [02E7]*/
    Start(): void;
    /** Returns true if the cutscene was skipped
    *
    * https://library.sannybuilder.com/#/sa?q=WAS_CUTSCENE_SKIPPED [056A]*/
    WasSkipped(): boolean;
}
declare var Cutscene: Cutscene
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Debugger */
interface Debugger {
    /** Creates a debug breakpoint in script
    *
    * https://library.sannybuilder.com/#/sa?q=BREAKPOINT [2100]*/
    Breakpoint(blocking: boolean, text: string, ...args: number[]): void;
    /** Deactivates debug features in this script
    *
    * https://library.sannybuilder.com/#/sa?q=DEBUG_OFF [00C4]*/
    Disable(): void;
    /** Activates debug features in this script
    *
    * https://library.sannybuilder.com/#/sa?q=DEBUG_ON [00C3]*/
    Enable(): void;
    IsDebugCameraOn(): boolean;
    /** Appends new line to file. Timestamp parameter decides if datetime prefix in format 'DD/MM/YYYY hh:mm:ss.fraction' will be added. Command is not affected by debug mode status
    *
    * https://library.sannybuilder.com/#/sa?q=LOG_TO_FILE [2102]*/
    LogLine(filename: string, timestamp: boolean, text: string, ...args: number[]): void;
    /** Prints a debug message on screen and adds it to .cleo.log
    *
    * https://library.sannybuilder.com/#/sa?q=TRACE [2101]*/
    Trace(text: string, ...args: number[]): void;
}
declare var Debugger: Debugger
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/DecisionMaker */
declare class DecisionMaker {
    constructor(handle: number);
    /** Returns true if the handle is a valid decision maker handle
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_DECISION_MAKER_EXIST [09F2]*/
    static DoesExist(handle: int): boolean;
    /** Removes the decision maker
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_DECISION_MAKER [065C]*/
    remove(): void;
}
/** Loading DLL files and finding exported functions
 * 
 * https://library.sannybuilder.com/#/sa/classes/DynamicLibrary */
declare class DynamicLibrary {
    constructor(handle: number);
    /** Returns the address of a loaded dynamic-link library (DLL)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_LOADED_LIBRARY [0EFE]*/
    static GetLoadedLibrary(fileName: string): DynamicLibrary | undefined;
    /** Loads the specified module (usually a dynamic-link library (DLL)) into the address space of the game
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_DYNAMIC_LIBRARY [0AA2]*/
    static Load(fileName: string): DynamicLibrary | undefined;
    /** Frees the loaded dynamic-link library (DLL) module and unloads it from the address space of the game
    *
    * https://library.sannybuilder.com/#/sa?q=FREE_DYNAMIC_LIBRARY [0AA3]*/
    free(): void;
    /** Retrieves the address of an exported function or variable from the specified dynamic-link library (DLL)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_DYNAMIC_LIBRARY_PROCEDURE [0AA4]*/
    getProcedure(procName: string): int | undefined;
}
/** Class Entity
 * 
 * https://library.sannybuilder.com/#/sa/classes/Entity */
interface Entity {
    /** Returns the coordinates of the entity at the specified address
    *
    * https://library.sannybuilder.com/#/sa?q=GET_ENTITY_COORDINATES [0EEE]*/
    GetCoordinates(address: int): {
        x: float;
        y: float;
        z: float;
    };
    /** Returns the heading of the entity at the specified address
    *
    * https://library.sannybuilder.com/#/sa?q=GET_ENTITY_HEADING [0EEF]*/
    GetHeading(address: int): float;
    /** Gets the type of the entity
    *
    * https://library.sannybuilder.com/#/sa?q=GET_ENTITY_TYPE [0E13]*/
    GetType(entity: int): int;
    /** Returns True if entityB is within the radius of entityA
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_ENTITY_DISTANCE_TO_ENTITY [0EED]*/
    LocateDistanceToEntity(entityA: int, entityB: int, radius: float): boolean;
}
declare var Entity: Entity
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/File */
declare class File {
    constructor(handle: number);
    /** Opens the file in the specified mode, sets the condition result to True if the open operation has been successful, or to False otherwise, and writes the file handle to the variable
    *
    * https://library.sannybuilder.com/#/sa?q=OPEN_FILE [0A9A]*/
    static Open(filePathName: string, mode: int): File | undefined;
    /** Closes the file and frees the memory
    *
    * https://library.sannybuilder.com/#/sa?q=CLOSE_FILE [0A9B]*/
    close(): void;
    /** Gets current offset of read-write carret within the file stream
    *
    * https://library.sannybuilder.com/#/sa?q=GET_FILE_POSITION [2300]*/
    getPosition(): int;
    /** Gets the file size in bytes
    *
    * https://library.sannybuilder.com/#/sa?q=GET_FILE_SIZE [0A9C]*/
    getSize(): int;
    /** Returns true if all data has been read or any file error occurred
    *
    * https://library.sannybuilder.com/#/sa?q=IS_END_OF_FILE_REACHED [0AD6]*/
    isEndReached(): boolean;
    /** Reads the specified number of bytes from the opened file and writes them to the memory region starting from the address of the destination variable
    *
    * https://library.sannybuilder.com/#/sa?q=READ_FROM_FILE [0A9D]*/
    read(size: int): int;
    /** Reads data from file into buffer at specified address
    *
    * https://library.sannybuilder.com/#/sa?q=READ_BLOCK_FROM_FILE [2301]*/
    readBlock(size: int, address: int): boolean;
    /** Reads up to maxLength-1 text characters from the file until the newline or the end-of-file is reached. Result will be null-terminated string
    *
    * https://library.sannybuilder.com/#/sa?q=READ_STRING_FROM_FILE [0AD7]*/
    readString(storeTo: string, maxLength: int): boolean;
    /** Extracts data from a file using fscanf
    *
    * https://library.sannybuilder.com/#/sa?q=SCAN_FILE [0ADA]*/
    scan(format: string): {
        nValues: int;
        values: number[];
    } | undefined;
    /** Sets the position of the file to the given offset from the origin
    *
    * https://library.sannybuilder.com/#/sa?q=FILE_SEEK [0AD5]*/
    seek(offset: int, origin: int): boolean;
    /** Copies the specified number of bytes of the memory region starting from the address of the source variable to the file
    *
    * https://library.sannybuilder.com/#/sa?q=WRITE_TO_FILE [0A9E]*/
    write(size: int, source: int): File;
    /** Writes data from memory address into file
    *
    * https://library.sannybuilder.com/#/sa?q=WRITE_BLOCK_TO_FILE [2302]*/
    writeBlock(size: int, address: int): boolean;
    /** Writes a formatted string to the file
    *
    * https://library.sannybuilder.com/#/sa?q=WRITE_FORMATTED_STRING_TO_FILE [0AD9]*/
    writeFormattedString(format: string, ...args: number[]): File;
    /** Copies data from the source string to the file up to but not including the null character
    *
    * https://library.sannybuilder.com/#/sa?q=WRITE_STRING_TO_FILE [0AD8]*/
    writeString(source: string): boolean;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/FindFile */
declare class FindFile {
    constructor(handle: number);
    /** Searches a directory for a file or subdirectory with a name that matches a specific name (or partial name if wildcards are used)
    *
    * https://library.sannybuilder.com/#/sa?q=FIND_FIRST_FILE [0AE6]*/
    static First(searchMask: string): {
        handle: FindFile;
        fileName: string;
    } | undefined;
    /** Closes a file search handle opened by 0AE6
    *
    * https://library.sannybuilder.com/#/sa?q=FIND_CLOSE [0AE8]*/
    close(): FindFile;
    /** Continues a file search from a previous call to 0AE6
    *
    * https://library.sannybuilder.com/#/sa?q=FIND_NEXT_FILE [0AE7]*/
    next(): string | undefined;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Fs */
interface Fs {
    /** Copies an existing directory to a new directory and returns true if the operation is successful
    *
    * https://library.sannybuilder.com/#/sa?q=COPY_DIRECTORY [0B05]*/
    CopyDirectory(dirPath: string, newDirPath: string): boolean;
    /** Copies an existing file to a new file and returns true if the operation is successful
    *
    * https://library.sannybuilder.com/#/sa?q=COPY_FILE [0B04]*/
    CopyFile(fileName: string, newFileName: string): boolean;
    /** Creates a directory at the given path
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_DIRECTORY [0AE5]*/
    CreateDirectory(path: string): boolean;
    /** Deletes a directory at the given path and returns true if the operation is successful
    *
    * https://library.sannybuilder.com/#/sa?q=DELETE_DIRECTORY [0B01]*/
    DeleteDirectory(path: string, recursive: boolean): boolean;
    /** Deletes a file at the given path and returns true if the operation is successful
    *
    * https://library.sannybuilder.com/#/sa?q=DELETE_FILE [0B00]*/
    DeleteFile(path: string): boolean;
    /** Returns true if a directory at the given path exists
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_DIRECTORY_EXIST [0AE4]*/
    DoesDirectoryExist(path: string): boolean;
    /** Returns true if a file at the given path exists
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_FILE_EXIST [0AAB]*/
    DoesFileExist(path: string): boolean;
    /** Gets last modification time of the file. On fail condition result is set to false, output parameters remain unchanged
    *
    * https://library.sannybuilder.com/#/sa?q=GET_FILE_WRITE_TIME [2305]*/
    GetFileWriteTime(fileName: string): {
        year: int;
        month: int;
        day: int;
        hour: int;
        minute: int;
        second: int;
        milisecond: int;
    } | undefined;
    /** Returns a file name or full file path of a script at the address (0A9F, 0AAA, 2404). If the address is -1 then this script is used. If no script with a given pointer is found, then the condition result is set to false and output argument is not modified
    *
    * https://library.sannybuilder.com/#/sa?q=GET_SCRIPT_FILENAME [2304]*/
    GetScriptFilename(address: int, fullPath: boolean): string | undefined;
    /** Moves an existing directory and returns true if the operation is successful
    *
    * https://library.sannybuilder.com/#/sa?q=MOVE_DIRECTORY [0B03]*/
    MoveDirectory(dirPath: string, newDirPath: string): boolean;
    /** Moves an existing file and returns true if the operation is successful
    *
    * https://library.sannybuilder.com/#/sa?q=MOVE_FILE [0B02]*/
    MoveFile(fileName: string, newFileName: string): boolean;
    /** Resolves absolute filepath. Input path can be relative, starts with 'virtual path' prefix or be already absolute filepath
    *
    * https://library.sannybuilder.com/#/sa?q=RESOLVE_FILEPATH [2303]*/
    ResolvePath(path: string): string;
    /** Sets the current working directory (cwd) to a predefined location with a value of 0 or 1, or to an arbitrary path with a string value
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CURRENT_DIRECTORY [0A99]*/
    SetCurrentDirectory(path: int): void;
}
declare var Fs: Fs
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Fx */
interface Fx {
    /** Creates a gun flash particle effect
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_BIG_GUN_FLASH [058A]*/
    AddBigGunFlash(fromX: float, fromY: float, fromZ: float, toX: float, toY: float, toZ: float): void;
    AddBlood(x: float, y: float, z: float, offsetX: float, offsetY: float, offsetZ: float, density: int, handle: Char): void;
    /** Creates an explosion at the point
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_EXPLOSION [020C]*/
    AddExplosion(x: float, y: float, z: float, type: int): void;
    /** Creates an explosion with no sound
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_EXPLOSION_NO_SOUND [0565]*/
    AddExplosionNoSound(x: float, y: float, z: float, type: int): void;
    /** Creates an explosion at the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_EXPLOSION_VARIABLE_SHAKE [0948]*/
    AddExplosionVariableShake(x: float, y: float, z: float, type: int, shake: float): void;
    /** Adds an FX system particle
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_FX_SYSTEM_PARTICLE [0EC0]*/
    AddParticle(particle: Particle, posX: float, posY: float, posZ: float, velX: float, velY: float, velZ: float, size: float, brightness: float, r: float, g: float, b: float, a: float, lastFactor: float): void;
    AddSmokeParticle(x: float, y: float, z: float, velocityX: float, velocityY: float, velocityZ: float, red: float, green: float, blue: float, alpha: float, size: float, lastFactor: float): void;
    AddSparks(x: float, y: float, z: float, velocityX: float, velocityY: float, velocityZ: float, density: int): void;
    /** Displays a corona with fade in-out effect at the specified location
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_CORONA [024F]*/
    DrawCorona(x: float, y: float, z: float, size: float, coronaType: int, flareType: int, r: int, g: int, b: int): void;
    /** Draws colored light in radius of the specified point
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_LIGHT_WITH_RANGE [09E5]*/
    DrawLightWithRange(x: float, y: float, z: float, red: int, green: int, blue: int, radius: float): void;
    /** Draws a shadow in the current frame
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_SHADOW [016F]*/
    DrawShadow(textureType: int, x: float, y: float, z: float, angle: float, length: float, intensity: int, r: int, g: int, b: int): void;
    /** Displays a corona with the lowered draw distance at the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_WEAPONSHOP_CORONA [04D5]*/
    DrawWeaponshopCorona(x: float, y: float, z: float, size: float, coronaType: int, flareType: int, r: int, g: int, b: int): void;
    /** Returns the address of the specified FX system associated with the given particle, or 0 if handle is invalid
    *
    * https://library.sannybuilder.com/#/sa?q=GET_FX_SYSTEM_POINTER [0EBF]*/
    GetAddress(particle: Particle): int | undefined;
    /** Returns True if an FX system with the specified name is available
    *
    * https://library.sannybuilder.com/#/sa?q=IS_FX_SYSTEM_AVAILABLE_WITH_NAME [0EC1]*/
    IsAvailableWithName(name: string): boolean;
}
declare var Fx: Fx
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Game */
interface Game {
    /** Enables ped spawning in interiors
    *
    * https://library.sannybuilder.com/#/sa?q=ACTIVATE_INTERIOR_PEDS [084D]*/
    ActivateInteriorPeds(state: boolean): void;
    /** Sets whether sleeping with a prostitute earns you money instead of taking it away from you
    *
    * https://library.sannybuilder.com/#/sa?q=ACTIVATE_PIMP_CHEAT [0A3D]*/
    ActivatePimpCheat(state: boolean): void;
    /** Displays a screen prompting the player to save
    *
    * https://library.sannybuilder.com/#/sa?q=ACTIVATE_SAVE_MENU [03D8]*/
    ActivateSaveMenu(): void;
    /** Enables the player to access the pause menu while widescreen is enabled
    *
    * https://library.sannybuilder.com/#/sa?q=ALLOW_PAUSE_IN_WIDESCREEN [0A48]*/
    AllowPauseInWidescreen(state: boolean): void;
    /** Returns true if the player has used any of the cheats
    *
    * https://library.sannybuilder.com/#/sa?q=ARE_ANY_CAR_CHEATS_ACTIVATED [0445]*/
    AreAnyCarCheatsActivated(): boolean;
    /** Returns true if the game uses metric measurements (meters instead of feet)
    *
    * https://library.sannybuilder.com/#/sa?q=ARE_MEASUREMENTS_IN_METRES [0424]*/
    AreMeasurementsInMeters(): boolean;
    /** Returns true if subtitles are switched on in the settings menu
    *
    * https://library.sannybuilder.com/#/sa?q=ARE_SUBTITLES_SWITCHED_ON [09C8]*/
    AreSubtitlesSwitchedOn(): boolean;
    /** Allows the player to provoke turf wars while a mission is active
    *
    * https://library.sannybuilder.com/#/sa?q=CAN_TRIGGER_GANG_WAR_WHEN_ON_A_MISSION [08A3]*/
    CanTriggerGangWarWhenOnAMission(state: boolean): void;
    ClearRelationship(relationshipType: int, ofPedType: int, toPedType: int): void;
    /** Enables turf wars to be provoked in all zones
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_SPECIFIC_ZONES_TO_TRIGGER_GANG_WAR [090D]*/
    ClearSpecificZonesToTriggerGangWar(): void;
    /** Suspends the current players wanted level
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_WANTED_LEVEL_IN_GARAGE [09D4]*/
    ClearWantedLevelInGarage(): void;
    DisableSecondPlayer(restoreCamera: boolean): void;
    /** Gives all the weapons of player 1 to player 2 during a cooperative mission
    *
    * https://library.sannybuilder.com/#/sa?q=DO_WEAPON_STUFF_AT_START_OF_2P_GAME [09F8]*/
    DoWeaponStuffAtStartOf2PGame(): void;
    /** Sets whether cops will chase and kill criminals when their task is 'TASK_COMPLEX_KILL_CRIMINAL'
    *
    * https://library.sannybuilder.com/#/sa?q=ENABLE_AMBIENT_CRIME [09D2]*/
    EnableAmbientCrime(state: boolean): void;
    /** Switches enex markers used for burglary missions on or off
    *
    * https://library.sannybuilder.com/#/sa?q=ENABLE_BURGLARY_HOUSES [09E6]*/
    EnableBurglaryHouses(state: boolean): void;
    /** Enables the entry/exit marker in the specified radius of the coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=ENABLE_ENTRY_EXIT_PLAYER_GROUP_WARPING [0864]*/
    EnableEntryExitPlayerGroupWarping(x: float, y: float, radius: float, state: boolean): void;
    /** Returns a number of group members the player can recruit with the current respect
    *
    * https://library.sannybuilder.com/#/sa?q=FIND_MAX_NUMBER_OF_GROUP_MEMBERS [0956]*/
    FindMaxNumberOfGroupMembers(): int;
    /** Enables fixes for making two players use separated cars
    *
    * https://library.sannybuilder.com/#/sa?q=FIX_TWO_PLAYERS_SEPARATED_CARS [0EA2]*/
    FixTwoPlayersSeparatedCars(): void;
    /** Disables all vehicle lights from being rendered if enabled
    *
    * https://library.sannybuilder.com/#/sa?q=FORCE_ALL_VEHICLE_LIGHTS_OFF [0A37]*/
    ForceAllVehicleLightsOff(state: boolean): void;
    ForceDeathRestart(): void;
    /** Returns True every mod number of frames
    *
    * https://library.sannybuilder.com/#/sa?q=FRAME_MOD [0E45]*/
    FrameMod(mod: int): boolean;
    /** Returns the current language set in the menu language settings
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CURRENT_LANGUAGE [09FB]*/
    GetCurrentLanguage(): int;
    /** Gets the game window width and height resolution
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CURRENT_RESOLUTION [0E0E]*/
    GetCurrentResolution(): {
        width: int;
        height: int;
    };
    /** Gets loaded save slot number. 0 if new game
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CURRENT_SAVE_SLOT [0E2C]*/
    GetCurrentSaveSlot(): int;
    /** Returns game FPS
    *
    * https://library.sannybuilder.com/#/sa?q=GET_FRAMERATE [2244]*/
    GetFramerate(): int;
    /** Gets the maximum wanted level the player can receive
    *
    * https://library.sannybuilder.com/#/sa?q=GET_MAX_WANTED_LEVEL [050F]*/
    GetMaxWantedLevel(): int;
    /** Returns platform type info (device/operating system)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PLATFORM [0DD5]*/
    GetPlatform(): int;
    /** Cancels any prostitute invitations received in-game and makes any current prostitutes quit
    *
    * https://library.sannybuilder.com/#/sa?q=GET_RID_OF_PLAYER_PROSTITUTE [0A43]*/
    GetRidOfPlayerProstitute(): void;
    /** Returns true if the player just exited the menu on the last frame
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_GAME_JUST_RETURNED_FROM_FRONTEND [09FA]*/
    HasGameJustReturnedFromFrontend(): boolean;
    /** Returns true if the current language set is different from the previous language set
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_LANGUAGE_CHANGED [0A0F]*/
    HasLanguageChanged(): boolean;
    /** Returns true if the player has saved their game
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_SAVE_GAME_FINISHED [03D9]*/
    HasSaveGameFinished(): boolean;
    HideAllFrontendBlips(state: boolean): void;
    /** Returns true if the game is in 2-player mode
    *
    * https://library.sannybuilder.com/#/sa?q=IS_2PLAYER_GAME_GOING_ON [0800]*/
    Is2PlayerGameGoingOn(): boolean;
    /** Returns true if the current game is an Australian release
    *
    * https://library.sannybuilder.com/#/sa?q=IS_AUSTRALIAN_GAME [059A]*/
    IsAustralian(): boolean;
    /** Returns True if the specified cheat is togglable and active
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHEAT_ACTIVE [0E5D]*/
    IsCheatActive(cheat: int): boolean;
    /** Is first gameplay start (game was not reloaded)
    *
    * https://library.sannybuilder.com/#/sa?q=IS_GAME_FIRST_START [0E2D]*/
    IsFirstStart(): boolean;
    /** Returns true if the player provoked a gang war or is defending territory
    *
    * https://library.sannybuilder.com/#/sa?q=IS_GANG_WAR_FIGHTING_GOING_ON [0A03]*/
    IsGangWarFightingGoingOn(): boolean;
    /** Returns true if there is a gang war happening
    *
    * https://library.sannybuilder.com/#/sa?q=IS_GANG_WAR_GOING_ON [087A]*/
    IsGangWarGoingOn(): boolean;
    /** Returns true if the game language is set to German
    *
    * https://library.sannybuilder.com/#/sa?q=IS_GERMAN_GAME [040C]*/
    IsGerman(): boolean;
    /** Returns true if 09BD has been used in any script to disable help messages
    *
    * https://library.sannybuilder.com/#/sa?q=IS_MINIGAME_IN_PROGRESS [09BE]*/
    IsMinigameInProgress(): boolean;
    /** Returns true if night vision is active
    *
    * https://library.sannybuilder.com/#/sa?q=IS_NIGHT_VISION_ACTIVE [099D]*/
    IsNightVisionActive(): boolean;
    /** Returns true if players controls are set to joystick and not mouse+keyboard
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PC_USING_JOYPAD [0A4B]*/
    IsPcUsingJoypad(): boolean;
    /** Returns true on PC versions of the game
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PC_VERSION [0485]*/
    IsPcVersion(): boolean;
    /** Returns true in interactive interiors
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PROCEDURAL_INTERIOR_ACTIVE [0867]*/
    IsProceduralInteriorActive(areaId: int): boolean;
    /** Returns true if the specified relationship between ped types is set
    *
    * https://library.sannybuilder.com/#/sa?q=IS_RELATIONSHIP_SET [07E8]*/
    IsRelationshipSet(relationshipType: int, ofPedType: int, toPedType: int): boolean;
    /** Returns true if the current game runs on San Andreas Multiplayer (SA-MP)
    *
    * https://library.sannybuilder.com/#/sa?q=IS_ON_SAMP [0E20]*/
    IsSamp(): boolean;
    /** Returns True if menu Select was just pressed
    *
    * https://library.sannybuilder.com/#/sa?q=IS_SELECT_MENU_JUST_PRESSED [0E6E]*/
    IsSelectMenuJustPressed(): boolean;
    /** Returns true if the game version is vanilla 1.0
    *
    * https://library.sannybuilder.com/#/sa?q=IS_GAME_VERSION_ORIGINAL [0AA9]*/
    IsVersionOriginal(): boolean;
    /** Returns true if widescreen is switched on in the display settings
    *
    * https://library.sannybuilder.com/#/sa?q=IS_WIDESCREEN_ON_IN_OPTIONS [0A2B]*/
    IsWidescreenOnInOptions(): boolean;
    /** Sets how far apart players can get on 2-player mode
    *
    * https://library.sannybuilder.com/#/sa?q=LIMIT_TWO_PLAYER_DISTANCE [06F1]*/
    LimitTwoPlayerDistance(distance: float): void;
    /** Ensures there is x amount of space for new members to be added to the players gang
    *
    * https://library.sannybuilder.com/#/sa?q=MAKE_ROOM_IN_PLAYER_GANG_FOR_MISSION_PEDS [09DD]*/
    MakeRoomInPlayerGangForMissionPeds(_p1: int): void;
    ManageAllPopulation(): void;
    /** Releases the distance limit set by LIMIT_TWO_PLAYER_DISTANCE
    *
    * https://library.sannybuilder.com/#/sa?q=RELEASE_TWO_PLAYER_DISTANCE [06F2]*/
    ReleaseTwoPlayerDistance(): void;
    /** Emulates the shared effects of being wasted or busted
    *
    * https://library.sannybuilder.com/#/sa?q=RESET_STUFF_UPON_RESURRECTION [0974]*/
    ResetStuffUponResurrection(): void;
    /** Enables missiles to be fired from the aircraft carrier by Easter Bay Naval Station, San Fierro
    *
    * https://library.sannybuilder.com/#/sa?q=SET_AIRCRAFT_CARRIER_SAM_SITE [09E4]*/
    SetAircraftCarrierSamSite(state: boolean): void;
    /** Sets whether all cars receive damage
    *
    * https://library.sannybuilder.com/#/sa?q=SET_ALL_CARS_CAN_BE_DAMAGED [03F4]*/
    SetAllCarsCanBeDamaged(state: boolean): void;
    /** Toggles whether all taxis have nitrous
    *
    * https://library.sannybuilder.com/#/sa?q=SET_ALL_TAXIS_HAVE_NITRO [0572]*/
    SetAllTaxisHaveNitro(state: boolean): void;
    /** Enables an increase in the distance that markers hovering above entities can be seen from
    *
    * https://library.sannybuilder.com/#/sa?q=SET_ALWAYS_DRAW_3D_MARKERS [08A8]*/
    SetAlwaysDraw3DMarkers(state: boolean): void;
    /** Enables or disables the SAM site at the Area 51
    *
    * https://library.sannybuilder.com/#/sa?q=SET_AREA51_SAM_SITE [07A8]*/
    SetArea51SamSite(state: boolean): void;
    /** Sets the total number of hidden packages to collect
    *
    * https://library.sannybuilder.com/#/sa?q=SET_COLLECTABLE1_TOTAL [02ED]*/
    SetCollectableTotal(amount: int): void;
    SetCreateRandomCops(state: boolean): void;
    /** Sets whether gang members will spawn
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CREATE_RANDOM_GANG_MEMBERS [08EA]*/
    SetCreateRandomGangMembers(state: boolean): void;
    /** Makes pedestrians pay no attention to the player
    *
    * https://library.sannybuilder.com/#/sa?q=SET_EVERYONE_IGNORE_PLAYER [03BF]*/
    SetEveryoneIgnorePlayer(player: Player, state: boolean): void;
    /** Forces all cars spawned to be of the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=SET_FORCE_RANDOM_CAR_MODEL [09BF]*/
    SetForceRandomCarModel(modelId: int): void;
    /** Defines whether the player can respray their car for free
    *
    * https://library.sannybuilder.com/#/sa?q=SET_FREE_RESPRAYS [0335]*/
    SetFreeResprays(state: boolean): void;
    /** Sets whether gang wars can be started by the player or enemy gangs
    *
    * https://library.sannybuilder.com/#/sa?q=SET_GANG_WARS_ACTIVE [0879]*/
    SetGangWarsActive(state: boolean): void;
    /** Disables highlighting of gang territory on the map and radar
    *
    * https://library.sannybuilder.com/#/sa?q=SET_GANG_WARS_TRAINING_MISSION [08AC]*/
    SetGangWarsTrainingMission(state: boolean): void;
    SetGunshotSenseRangeForRiot2(range: float): void;
    /** Enables thermal vision effects
    *
    * https://library.sannybuilder.com/#/sa?q=SET_INFRARED_VISION [08B2]*/
    SetInfraredVision(state: boolean): void;
    /** Greys out the radar
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_IS_IN_STADIUM [057E]*/
    SetIsInStadium(state: boolean): void;
    /** Enables the LS Riots, making smoke appear on houses, random car fires occur, peds stealing things and attacking each other in a frenzy
    *
    * https://library.sannybuilder.com/#/sa?q=SET_LA_RIOTS [06C8]*/
    SetLaRiots(state: boolean): void;
    /** Sets the limit on how many fires can be created from other fires when "propagation" was enabled on 02CF
    *
    * https://library.sannybuilder.com/#/sa?q=SET_MAX_FIRE_GENERATIONS [0828]*/
    SetMaxFireGenerations(limit: int): void;
    /** Sets the maximum wanted level the player can receive
    *
    * https://library.sannybuilder.com/#/sa?q=SET_MAX_WANTED_LEVEL [01F0]*/
    SetMaxWantedLevel(wantedLevel: int): void;
    /** Disables displaying help messages in other scripts
    *
    * https://library.sannybuilder.com/#/sa?q=SET_MINIGAME_IN_PROGRESS [09BD]*/
    SetMinigameInProgress(state: boolean): void;
    /** Sets the specified enex flag
    *
    * https://library.sannybuilder.com/#/sa?q=SET_NAMED_ENTRY_EXIT_FLAG [098E]*/
    SetNamedEntryExitFlag(name: string, flag: int, state: boolean): void;
    /** Enables night vision effects
    *
    * https://library.sannybuilder.com/#/sa?q=SET_NIGHT_VISION [08B1]*/
    SetNightVision(state: boolean): void;
    /** Disables respray garages from opening for the player
    *
    * https://library.sannybuilder.com/#/sa?q=SET_NO_RESPRAYS [0A14]*/
    SetNoResprays(state: boolean): void;
    /** Sets the game's On Mission status without referencing a global variable
    *
    * https://library.sannybuilder.com/#/sa?q=SET_ON_MISSION [0F16]*/
    SetOnMission(status: boolean): void;
    /** Sets whether gangs appear everywhere, like when "Gangs control the streets" cheat is activated
    *
    * https://library.sannybuilder.com/#/sa?q=SET_ONLY_CREATE_GANG_MEMBERS [0983]*/
    SetOnlyCreateGangMembers(state: boolean): void;
    /** Enables each player to target the other player
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_PLAYER_TARGETTING [06F3]*/
    SetPlayerPlayerTargeting(state: boolean): void;
    /** Sets whether the players can be in separate cars during a 2-player mission
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYERS_CAN_BE_IN_SEPARATE_CARS [06FA]*/
    SetPlayersCanBeInSeparateCars(state: boolean): void;
    /** Sets whether cops should ignore the player regardless of wanted level
    *
    * https://library.sannybuilder.com/#/sa?q=SET_POLICE_IGNORE_PLAYER [01F7]*/
    SetPoliceIgnorePlayer(player: Player, state: boolean): void;
    /** Sets the attitude of peds with one pedtype towards peds of another pedtype
    *
    * https://library.sannybuilder.com/#/sa?q=SET_RELATIONSHIP [0746]*/
    SetRelationship(relationshipType: int, ofPedType: int, toPedType: int): void;
    /** Sets an unused flag at address 0x96A8A8
    *
    * https://library.sannybuilder.com/#/sa?q=SET_SCRIPT_COOP_GAME [0A3F]*/
    SetScriptCoopGame(state: boolean): void;
    /** Sets the maximum number of members that the player can recruit
    *
    * https://library.sannybuilder.com/#/sa?q=SET_SCRIPT_LIMIT_TO_GANG_SIZE [08F4]*/
    SetScriptLimitToGangSize(maxSize: int): void;
    /** Sets sensitivity to crime, changing how many crimes a player can commit before police begin to pursue
    *
    * https://library.sannybuilder.com/#/sa?q=SET_WANTED_MULTIPLIER [03C7]*/
    SetWantedMultiplier(multiplier: float): void;
    /** Enables entity blips showing on the radar and map while in interiors
    *
    * https://library.sannybuilder.com/#/sa?q=SHOW_BLIPS_ON_ALL_LEVELS [09A6]*/
    ShowBlipsOnAllLevels(state: boolean): void;
    /** Prevents all peds from attempting to start conversations with the player
    *
    * https://library.sannybuilder.com/#/sa?q=SHUT_ALL_CHARS_UP [09F5]*/
    ShutAllCharsUp(state: boolean): void;
    /** Enables or disables planes
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_AMBIENT_PLANES [0923]*/
    SwitchAmbientPlanes(state: boolean): void;
    /** Sets whether or not the player loses their weapons and inventory when busted
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_ARREST_PENALTIES [08DE]*/
    SwitchArrestPenalties(state: boolean): void;
    /** Disables the game from creating police bikes and their riders on the roads
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_COPS_ON_BIKES [072C]*/
    SwitchCopsOnBikes(state: boolean): void;
    /** Sets whether or not the player loses their weapons and inventory when taken to hospital
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_DEATH_PENALTIES [08DD]*/
    SwitchDeathPenalties(state: boolean): void;
    /** Sets whether emergency traffic spawns
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_EMERGENCY_SERVICES [06D0]*/
    SwitchEmergencyServices(state: boolean): void;
    /** Enables or disables all triggers of the specified type (0928 or 0929)
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_OBJECT_BRAINS [0A46]*/
    SwitchObjectBrains(type: int, state: boolean): void;
    /** Sets whether ghetto birds spawn
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_POLICE_HELIS [096A]*/
    SwitchPoliceHelis(state: boolean): void;
    /** Sets whether trains are generated
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_RANDOM_TRAINS [06D7]*/
    SwitchRandomTrains(state: boolean): void;
}
declare var Game: Game
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Gang */
interface Gang {
    /** Sets the weapons that the specified gang can use
    *
    * https://library.sannybuilder.com/#/sa?q=SET_GANG_WEAPONS [0237]*/
    SetWeapons(gangId: int, weaponType1: int, weaponType2: int, weaponType3: int): void;
}
declare var Gang: Gang
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Garage */
interface Garage {
    /** Activates the garage
    *
    * https://library.sannybuilder.com/#/sa?q=ACTIVATE_GARAGE [0299]*/
    Activate(garageId: string): void;
    /** Sets the garage's type
    *
    * https://library.sannybuilder.com/#/sa?q=CHANGE_GARAGE_TYPE [02FA]*/
    ChangeType(garageId: string, type: int): void;
    /** Closes the garage
    *
    * https://library.sannybuilder.com/#/sa?q=CLOSE_GARAGE [0361]*/
    Close(garageId: string): void;
    /** Deactivates the garage
    *
    * https://library.sannybuilder.com/#/sa?q=DEACTIVATE_GARAGE [02B9]*/
    Deactivate(garageId: string): void;
    /** Returns true if the garage's door is closed
    *
    * https://library.sannybuilder.com/#/sa?q=IS_GARAGE_CLOSED [03B1]*/
    IsClosed(garageId: string): boolean;
    /** Returns true if the garage's door is open
    *
    * https://library.sannybuilder.com/#/sa?q=IS_GARAGE_OPEN [03B0]*/
    IsOpen(garageId: string): boolean;
    /** Opens the garage
    *
    * https://library.sannybuilder.com/#/sa?q=OPEN_GARAGE [0360]*/
    Open(garageId: string): void;
    SetResprayFree(garageId: string, state: boolean): void;
    /** Sets the specified garage to only accept the specified vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TARGET_CAR_FOR_MISSION_GARAGE [021B]*/
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
    * https://library.sannybuilder.com/#/sa?q=CREATE_GROUP [062F]*/
    static Create(defaultTaskAllocator: int): Group;
    /** Returns true if the handle is a valid group handle
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_GROUP_EXIST [07FD]*/
    static DoesExist(handle: int): boolean;
    /** Returns the nth group member
    *
    * https://library.sannybuilder.com/#/sa?q=GET_GROUP_MEMBER [092B]*/
    getMember(slotId: int): Char;
    getSize(): {
        numLeaders: int;
        numMembers: int;
    };
    /** Releases the group
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_GROUP [0632]*/
    remove(): void;
    /** Sets the decision maker for a group of characters
    *
    * https://library.sannybuilder.com/#/sa?q=SET_GROUP_DECISION_MAKER [06AD]*/
    setDecisionMaker(handleOrTemplate: int): Group;
    setDefaultTaskAllocator(defaultTaskAllocator: int): Group;
    /** Sets whether the group members enter a car when the leader does
    *
    * https://library.sannybuilder.com/#/sa?q=SET_GROUP_FOLLOW_STATUS [0940]*/
    setFollowStatus(state: boolean): Group;
    /** Puts the specified character into the group as the leader
    *
    * https://library.sannybuilder.com/#/sa?q=SET_GROUP_LEADER [0630]*/
    setLeader(handle: Char): Group;
    /** Puts the specified character into the group as a member
    *
    * https://library.sannybuilder.com/#/sa?q=SET_GROUP_MEMBER [0631]*/
    setMember(handle: Char): Group;
    /** Sets how far members of the group can be from the leader before they are removed from the group
    *
    * https://library.sannybuilder.com/#/sa?q=SET_GROUP_SEPARATION_RANGE [06F0]*/
    setSeparationRange(range: float): Group;
    /** Sets the default task sequence for members of the group
    *
    * https://library.sannybuilder.com/#/sa?q=SET_GROUP_SEQUENCE [087D]*/
    setSequence(sequence: Sequence): Group;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Hud */
interface Hud {
    /** Removes the onscreen counter (0150 or 03C4)
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_ONSCREEN_COUNTER [0151]*/
    ClearCounter(counter: int): void;
    /** Removes the local onscreen counter
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_ONSCREEN_COUNTER_LOCAL [0E55]*/
    ClearCounterLocal(counter: int): void;
    /** Removes the onscreen timer
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_ONSCREEN_TIMER [014F]*/
    ClearTimer(timer: int): void;
    /** Removes the local onscreen timer
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_ONSCREEN_TIMER_LOCAL [0E54]*/
    ClearTimerLocal(timer: int): void;
    /** Sets whether the HUD displays
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_HUD [0826]*/
    Display(state: boolean): void;
    /** Sets whether the name of the current vehicle should be displayed
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_CAR_NAMES [09B9]*/
    DisplayCarNames(state: boolean): void;
    /** Displays an onscreen counter, either shown in numbers or as a bar
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_ONSCREEN_COUNTER_LOCAL [0E50]*/
    DisplayCounterLocal(timer: int, display: int): void;
    /** Displays an onscreen counter with the text, either shown in numbers or as a bar
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_ONSCREEN_COUNTER_WITH_STRING [03C4]*/
    DisplayCounterWithString(counter: int, display: int, text: string): void;
    /** Displays an onscreen counter with the text, either shown in numbers or as a bar
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_ONSCREEN_COUNTER_WITH_STRING_LOCAL [0E51]*/
    DisplayCounterWithStringLocal(counter: int, display: int, text: string): void;
    /** Displays an onscreen counter with the text in the specified slot, either shown in numbers or as a bar
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_NTH_ONSCREEN_COUNTER_WITH_STRING [04F7]*/
    DisplayNthCounterWithString(counter: int, display: int, slot: int, text: string): void;
    /** Displays or hides the radar
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_RADAR [0581]*/
    DisplayRadar(state: boolean): void;
    /** Creates a countdown or countup onscreen timer
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_ONSCREEN_TIMER [014E]*/
    DisplayTimer(timer: int, direction: int): void;
    /** Creates a countdown or countup onscreen timer
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_ONSCREEN_TIMER_LOCAL [0E4E]*/
    DisplayTimerLocal(timer: int, direction: int): void;
    /** Creates a countdown or countup onscreen timer with the text
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_ONSCREEN_TIMER_WITH_STRING [03C3]*/
    DisplayTimerWithString(timer: int, direction: int, text: string): void;
    /** Creates a countdown or countup onscreen timer with the text
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_ONSCREEN_TIMER_WITH_STRING_LOCAL [0E4F]*/
    DisplayTimerWithStringLocal(timer: int, direction: int, text: string): void;
    /** Displays two onscreen counters separated by a slash
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_TWO_ONSCREEN_COUNTERS_LOCAL [0E52]*/
    DisplayTwoCountersLocal(leftCounter: int, rightCounter: int): void;
    /** Displays two onscreen counters separated by a slash with the text
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_TWO_ONSCREEN_COUNTERS_WITH_STRING_LOCAL [0E53]*/
    DisplayTwoCountersWithStringLocal(leftCounter: int, rightCounter: int, text: string): void;
    /** Sets whether the area text for the current area should show
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_ZONE_NAMES [09BA]*/
    DisplayZoneNames(state: boolean): void;
    /** Sets whether the HUD should always display weapon aiming crosshairs, used in the mission 'Catalyst' where the player must throw crates of ammo to Ryder
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_CROSSHAIR [09A3]*/
    DrawCrosshair(state: boolean): void;
    /** Draws a box at the specified screen X and Y position, with the specified size and RGBA colors
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_RECT [038E]*/
    DrawRect(x: float, y: float, width: float, height: float, r: int, g: int, b: int, a: int): void;
    /** Draws a loaded texture (038F) at the specified on-screen X and Y coordinates, with the specified size and RGBA color
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_SPRITE [038D]*/
    DrawSprite(memorySlot: int, offsetLeft: float, offsetTop: float, width: float, height: float, r: int, g: int, b: int, a: int): void;
    /** This is an extended version of 038D with scale and angle parameters
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_SPRITE_WITH_ROTATION [074B]*/
    DrawSpriteWithRotation(memorySlot: int, offsetLeft: float, offsetTop: float, width: float, height: float, angle: float, red: int, green: int, blue: int, alpha: int): void;
    /** Draws a black box with styled text from corner A to corner B
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_WINDOW [0937]*/
    DrawWindow(leftTopX: float, leftTopY: float, rightBottomX: float, rightBottomY: float, header: string, zIndex: int): void;
    /** Makes a specific part of the HUD disappear and reappear several times
    *
    * https://library.sannybuilder.com/#/sa?q=FLASH_HUD_OBJECT [03E7]*/
    FlashObject(object: int): void;
    /** Prevents timers and big texts from being hidden if there is another conflicting type of text on screen
    *
    * https://library.sannybuilder.com/#/sa?q=FORCE_BIG_MESSAGE_AND_COUNTER [09EE]*/
    ForceBigMessageAndCounter(state: boolean): void;
    /** Makes the on-screen timer stop updating
    *
    * https://library.sannybuilder.com/#/sa?q=FREEZE_ONSCREEN_TIMER [0396]*/
    FreezeTimer(state: boolean): void;
    /** Returns the RGBA of the specified HUD color
    *
    * https://library.sannybuilder.com/#/sa?q=GET_HUD_COLOUR [0904]*/
    GetColor(hudObject: int): {
        red: int;
        green: int;
        blue: int;
        alpha: int;
    };
    /** Gets x and y values based on window aspect ratio, useful for text and hud scaling
    *
    * https://library.sannybuilder.com/#/sa?q=GET_FIXED_XY_ASPECT_RATIO [0E0F]*/
    GetFixedXyAspectRatio(x: float, y: float): {
        x: float;
        y: float;
    };
    IsRadarVisible(): boolean;
    IsVisible(): boolean;
    /** Sets the color of the specified local counter
    *
    * https://library.sannybuilder.com/#/sa?q=SET_ONSCREEN_COUNTER_COLOUR_LOCAL [0E58]*/
    SetCounterColorLocal(counter: int, color: int): void;
    SetCounterFlashWhenFirstDisplayed(counter: int, state: boolean): void;
    /** Sets the local counter to flash when first displayed
    *
    * https://library.sannybuilder.com/#/sa?q=SET_ONSCREEN_COUNTER_FLASH_WHEN_FIRST_DISPLAYED_LOCAL [0E56]*/
    SetCounterFlashWhenFirstDisplayedLocal(counter: int, state: boolean): void;
    SetRadarZoom(zoom: int): void;
    /** Causes the next texture to be drawn (038D) before the fade is drawn
    *
    * https://library.sannybuilder.com/#/sa?q=SET_SPRITES_DRAW_BEFORE_FADE [03E3]*/
    SetSpritesDrawBeforeFade(state: boolean): void;
    /** Starts a sound when the countdown timer reaches the specified number of seconds
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TIMER_BEEP_COUNTDOWN_TIME [0890]*/
    SetTimerBeepCountdownTime(timer: int, timeInSec: int): void;
    /** Starts a sound when the countdown timer reaches the specified number of seconds
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TIMER_BEEP_COUNTDOWN_TIME_LOCAL [0E57]*/
    SetTimerBeepCountdownTimeLocal(timer: int, timeInSec: int): void;
    /** Enables widescreen
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_WIDESCREEN [02A3]*/
    SwitchWidescreen(state: boolean): void;
}
declare var Hud: Hud
/** ImGui integration
 * 
 * https://library.sannybuilder.com/#/sa/classes/ImGui */
interface ImGui {
    /** Adds a line form point A to B
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_DRAWLIST_ADD_LINE [2243]*/
    AddLine(drawList: int, p1X: float, p1Y: float, p2X: float, p2Y: float, r: int, g: int, b: int, a: int, thickness: float): void;
    /** Adds text at specified position
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_DRAWLIST_ADD_TEXT [2242]*/
    AddText(drawList: int, posX: float, posY: float, r: int, g: int, b: int, a: int, text: string): void;
    /** Creates the window
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_BEGIN [2202]*/
    Begin(windowName: string, state: boolean, noTitleBar: boolean, noResize: boolean, noMove: boolean, autoResize: boolean): boolean;
    /** Creates a child window widget inside the main window
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_BEGIN_CHILD [2206]*/
    BeginChild(uniqueId: string): void;
    /** Creates a child window widget inside the main window
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_BEGIN_CHILDEX [2252]*/
    BeginChildEx(uniqueId: string, width: float, height: float, border: boolean, flags: int): void;
    /** Disables ImGui widgets inside this block
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_BEGIN_DISABLED [2253]*/
    BeginDisabled(disabled: boolean): void;
    /** Creates a unique frame with its own space in memory. Must be enclosed with IMGUI_END_FRAME
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_BEGIN_FRAME [2200]*/
    BeginFrame(uniqueId: string): void;
    /** Creates the main menu bar
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_BEGIN_MAINMENUBAR [2204]*/
    BeginMainMenuBar(uniqueId: string): void;
    /** Begins a ImGui menu block
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_BEGIN_MENU [2255]*/
    BeginMenu(label: string, enabled: boolean): boolean;
    /** Creates a bullet point
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_BULLET [2214]*/
    Bullet(): void;
    /** Creates the button
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_BUTTON [2218]*/
    Button(buttonName: string, width: float, height: float): boolean;
    /** Creates the arrow button in the specified direction
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_ARROW_BUTTON [221C]*/
    ButtonArrow(name: string, imGuiDir: int): boolean;
    /** Creates the button with custom colors
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_COLOR_BUTTON [221B]*/
    ButtonColored(buttonName: string, red: float, green: float, blue: float, alpha: float, width: float, height: float): boolean;
    /** Creates a ImGui button with specified image
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_IMAGE_BUTTON [2219]*/
    ButtonImage(name: string, image: int, width: float, height: float): boolean;
    /** Creates the invisible button
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_INVISIBLE_BUTTON [221A]*/
    ButtonInvisible(buttonName: string, width: float, height: float): boolean;
    /** Returns the width and height of the given text
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_CALC_TEXT_SIZE [224B]*/
    CalcTextSize(text: string): {
        width: float;
        height: float;
    };
    /** Creates the checkbox
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_CHECKBOX [2215]*/
    Checkbox(label: string, isChecked: boolean): boolean;
    /** Adds the collapsing header
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_COLLAPSING_HEADER [2209]*/
    CollapsingHeader(label: string): boolean;
    /** Creates the color picker and sets the default color (0-255)
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_COLOR_PICKER [2223]*/
    ColorPicker(label: string): {
        red: int;
        green: int;
        blue: int;
        alpha: int;
    };
    /** Divides the window width into N columns. Close this with Columns(1)
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_COLUMNS [2229]*/
    Columns(count: int): void;
    /** Creates a combo box widget. Pass options separated by commas "item1,item2,item3"
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_COMBO [2216]*/
    ComboBox(name: string, options: string, selection: int): int;
    /** Creates the dummy widget. Used for spacing
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_DUMMY [2226]*/
    Dummy(width: float, height: float): void;
    /** Ends the window
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_END [2203]*/
    End(): void;
    /** Ends the child window widget created with 0C25
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_END_CHILD [2207]*/
    EndChild(): void;
    /** Closes the ImGui disable block
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_END_DISABLED [2254]*/
    EndDisabled(): void;
    /** Ends unique ImGui frame created with IMGUI_BEGIN_FRAME
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_END_FRAME [2201]*/
    EndFrame(): void;
    /** Ends the main menu bar
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_END_MAINMENUBAR [2205]*/
    EndMainMenuBar(): void;
    /** Ends a ImGui menu block
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_END_MENU [2256]*/
    EndMenu(): void;
    /** Frees a loaded image data
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_FREE_IMAGE [2239]*/
    FreeImage(image: int): void;
    /** Returns pointer to ImGui background drawlist
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_GET_BACKGROUND_DRAWLIST [2240]*/
    GetBackgroundDrawList(): int;
    /** Returns the width & height of the display
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_GET_DISPLAY_SIZE [224E]*/
    GetDisplaySize(): {
        width: float;
        height: float;
    };
    /** Returns pointer to foreground draw list
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_GET_FOREGROUND_DRAWLIST [223F]*/
    GetForegroundDrawList(): int;
    /** Returns the ImGui frame height
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_GET_FRAME_HEIGHT [2248]*/
    GetFrameHeight(): float;
    /** Returns the ImGuiRedux version
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_GET_PLUGIN_VERSION [2246]*/
    GetPluginVersion(): int;
    /** Returns the width and height scaling factor based on the window size
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_GET_SCALING_SIZE [224D]*/
    GetScalingSize(uniqueId: string, count: int, spacing: boolean): {
        x: float;
        y: float;
    };
    /** Returns the ImGui version
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_GET_VERSION [2245]*/
    GetVersion(): int;
    /** Returns the content region width of the window
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_GET_WINDOW_CONTENT_REGION_WIDTH [224C]*/
    GetWindowContentRegionWidth(uniqueId: string): float;
    /** Returns pointer to ImGui window drawList
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_GET_WINDOW_DRAWLIST [2241]*/
    GetWindowDrawlist(): int;
    /** Returns the x,y coordinates of the window on the screen
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_GET_WINDOW_POS [2249]*/
    GetWindowPos(uniqueId: string): {
        x: float;
        y: float;
    };
    /** Returns the width and height of the window
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_GET_WINDOW_SIZE [224A]*/
    GetWindowSize(uniqueId: string): {
        width: float;
        height: float;
    };
    /** Creates the float input
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_INPUT_FLOAT [2220]*/
    InputFloat(label: string, initValue: float, min: float, max: float): float;
    /** Creates the int input
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_INPUT_INT [221F]*/
    InputInt(label: string, initValue: int, min: int, max: int): int;
    /** Creates the text input
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_INPUT_TEXT [2221]*/
    InputText(label: string): string;
    /** Returns true if the previous widget is in active state
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_IS_ITEM_ACTIVE [222F]*/
    IsItemActive(uniqueId: string): boolean;
    /** Returns true if the previous widget is clicked
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_IS_ITEM_CLICKED [2230]*/
    IsItemClicked(uniqueId: string): boolean;
    /** Returns true if the previous widget is focused
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_IS_ITEM_FOCUSED [2231]*/
    IsItemFocused(uniqueId: string): boolean;
    /** Returns true if the previous widget is hovered with mouse
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_IS_ITEM_HOVERED [2232]*/
    IsItemHovered(uniqueId: string): boolean;
    /** Loads a image file from disk. Relative to CLEO directory
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_LOAD_IMAGE [2238]*/
    LoadImage(path: string): int;
    /** Adds the menu item
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_MENU_ITEM [2224]*/
    MenuItem(text: string, selected: boolean, enabled: boolean): boolean;
    /** Creates a new line for the next widget
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_NEWLINE [2228]*/
    NewLine(): void;
    /** Puts the next widgets on the next column. Used alongside 0C16
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_NEXT_COLUMN [222A]*/
    NextColumn(): void;
    /** Removes the pushed item width (0C27) from the stack
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_POP_ITEM_WIDTH [222E]*/
    PopItemWidth(): void;
    /** Removes the recent ImGuiCol from the stack
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_POP_STYLE_COLOR [223E]*/
    PopStyleColor(count: int): void;
    /** Removes the recent imGuiStyleVar from the stack
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_POP_STYLE_VAR [223D]*/
    PopStyleVar(count: int): void;
    /** Sets the item width for the next widgets
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_PUSH_ITEM_WIDTH [222D]*/
    PushItemWidth(width: float): void;
    /** Pushes a ImGuiCol value to the stack. Use PopStyleColor to undo the effect
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_PUSH_STYLE_COLOR [223C]*/
    PushStyleColor(imGuiCol: int, r: int, g: int, b: int, a: int): void;
    /** Pushes a ImGuiStyleVar value to the stack. Use PopStyleVar to undo the effect
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_PUSH_STYLE_VAR [223A]*/
    PushStyleVar(imGuiStyleVar: int, val: float): void;
    /** Pushes a ImGuiStyleVar value to the stack. Use PopStyleVar to undo the effect
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_PUSH_STYLE_VAR2 [223B]*/
    PushStyleVar2(imGuiStyleVar: int, x: float, y: float): void;
    /** Creates the radio button
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_RADIO_BUTTON [2222]*/
    RadioButton(label: string, selectedBtn: int, btnNo: int): int;
    /** Appends the next widget to the same line as the previous widget
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SAMELINE [2227]*/
    SameLine(): void;
    /** Adds the selectable widget
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SELECTABLE [2225]*/
    Selectable(text: string, selected: boolean): boolean;
    /** Adds a horizontal separator line
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SEPARATOR [222C]*/
    Separator(): void;
    /** Sets the width of the column
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SET_COLUMN_WIDTH [2251]*/
    SetColumnWidth(index: int, width: float): void;
    /** Toggles the cursor
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SET_CURSOR_VISIBLE [2247]*/
    SetCursorVisible(show: boolean): void;
    /** Sets image background color
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SET_IMAGE_BG_COLOR [2236]*/
    SetImageBgColor(r: float, g: float, b: float, a: float): void;
    /** Sets image tint color
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SET_IMAGE_TINT_COLOR [2237]*/
    SetImageTintColor(r: float, g: float, b: float, a: float): void;
    /** Sets the value of input float & slider float widget
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SET_ITEM_FLOAT [2234]*/
    SetItemValueFloat(id: string, val: float): void;
    /** Sets the value of input int & slider int widget
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SET_ITEM_INT [2233]*/
    SetItemValueInt(id: string, val: int): void;
    /** Sets value of input text widget
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SET_ITEM_TEXT [2235]*/
    SetItemValueText(id: string, val: string): void;
    /** Displays a text message on top left corner of the screen. Useful for games without `showTextBox(...)` support
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SET_MESSAGE [2250]*/
    SetMessage(text: string): void;
    /** Sets the current window position. Applies to the next window ( aka Begin() )
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SET_NEXT_WINDOW_POS [220C]*/
    SetNextWindowPos(x: float, y: float, imGuiCond: int): void;
    /** Sets the current window size. Applies to the next window ( aka Begin() )
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SET_NEXT_WINDOW_SIZE [220D]*/
    SetNextWindowSize(width: float, height: float, imGuiCond: int): void;
    /** Sets the background transparency of next window (0.0f-1.0f)
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SET_NEXT_WINDOW_TRANSPARENCY [224F]*/
    SetNextWindowTransparency(alpha: float): void;
    /** Creates the popup window with the given text
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SET_TOOLTIP [2217]*/
    SetTooltip(text: string): void;
    /** Sets the current window position. Must be called inside Begin()...End()
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SET_WINDOW_POS [220A]*/
    SetWindowPos(x: float, y: float, imGuiCond: int): void;
    /** Sets the current window size. Must be called inside Begin()...End()
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SET_WINDOW_SIZE [220B]*/
    SetWindowSize(width: float, height: float, imGuiCond: int): void;
    /** Creates the float slider input
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SLIDER_FLOAT [221E]*/
    SliderFloat(label: string, initValue: float, min: float, max: float): float;
    /** Creates the int slider input
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SLIDER_INT [221D]*/
    SliderInt(label: string, initValue: int, min: int, max: int): int;
    /** Adds some spacing after the previous widget
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_SPACING [222B]*/
    Spacing(): void;
    /** Pass tab names separated by comma. Returns the index of the visible tab
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_TABS [2208]*/
    Tabs(name: string, tabNames: string): int;
    /** Creates the text line
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_TEXT [220E]*/
    Text(text: string): void;
    /** Displays a center aligned ImGui text widget
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_TEXT_CENTERED [220F]*/
    TextCentered(text: string): void;
    /** Creates the text line of the given RGBA color (0.0f-1.0f)
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_TEXT_COLORED [2212]*/
    TextColored(text: string, red: float, green: float, blue: float, alpha: float): void;
    /** Creates the text line with the disabled color ( Grayish by default )
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_TEXT_DISABLED [2210]*/
    TextDisabled(text: string): void;
    /** Creates the text line with a bullet point
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_BULLET_TEXT [2213]*/
    TextWithBullet(text: string): void;
    /** Creates the text line that wraps to a newline if the text goes beyond the window width
    *
    * https://library.sannybuilder.com/#/sa?q=IMGUI_TEXT_WRAPPED [2211]*/
    TextWrapped(text: string): void;
}
declare var ImGui: ImGui
/** Reading and writing .ini files
 * 
 * https://library.sannybuilder.com/#/sa/classes/IniFile */
interface IniFile {
    /** Deletes the key from the ini file
    *
    * https://library.sannybuilder.com/#/sa?q=DELETE_KEY_FROM_INI_FILE [2801]*/
    DeleteKey(path: string, section: string, key: string): boolean;
    /** Deletes the section from the ini file
    *
    * https://library.sannybuilder.com/#/sa?q=DELETE_SECTION_FROM_INI_FILE [2800]*/
    DeleteSection(path: string, section: string): boolean;
    /** Reads a floating-point value from the ini file
    *
    * https://library.sannybuilder.com/#/sa?q=READ_FLOAT_FROM_INI_FILE [0AF2]*/
    ReadFloat(path: string, section: string, key: string): float | undefined;
    /** Reads an integer value from the ini file
    *
    * https://library.sannybuilder.com/#/sa?q=READ_INT_FROM_INI_FILE [0AF0]*/
    ReadInt(path: string, section: string, key: string): int | undefined;
    /** Reads a string value from the ini file
    *
    * https://library.sannybuilder.com/#/sa?q=READ_STRING_FROM_INI_FILE [0AF4]*/
    ReadString(path: string, section: string, key: string): string | undefined;
    /** Writes the floating-point value to the ini file
    *
    * https://library.sannybuilder.com/#/sa?q=WRITE_FLOAT_TO_INI_FILE [0AF3]*/
    WriteFloat(value: float, path: string, section: string, key: string): boolean;
    /** Writes the integer value to the ini file
    *
    * https://library.sannybuilder.com/#/sa?q=WRITE_INT_TO_INI_FILE [0AF1]*/
    WriteInt(value: int, path: string, section: string, key: string): boolean;
    /** Writes the string value to the ini file
    *
    * https://library.sannybuilder.com/#/sa?q=WRITE_STRING_TO_INI_FILE [0AF5]*/
    WriteString(value: string, path: string, section: string, key: string): boolean;
}
declare var IniFile: IniFile
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/KillFrenzy */
interface KillFrenzy {
    /** Cancels current rampage, setting the rampage status to failed
    *
    * https://library.sannybuilder.com/#/sa?q=FAIL_KILL_FRENZY [09C2]*/
    Fail(): void;
    /** Returns the status of the current rampage
    *
    * https://library.sannybuilder.com/#/sa?q=READ_KILL_FRENZY_STATUS [01FA]*/
    ReadStatus(): int;
    /** Starts a rampage
    *
    * https://library.sannybuilder.com/#/sa?q=START_KILL_FRENZY [01F9]*/
    Start(text: string, weaponType: int, timeInMs: int, targetsNum: int, targetModel1: int, targetModel2: int, targetModel3: int, targetModel4: int, betaSoundsAndMessages: boolean): void;
}
declare var KillFrenzy: KillFrenzy
/** Class List
 * 
 * https://library.sannybuilder.com/#/sa/classes/List */
interface List {
    /** Creates a list of the specified type
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_LIST [0E72]*/
    Create(type: int): List;
    /** Adds a numerical value to the specified list
    *
    * https://library.sannybuilder.com/#/sa?q=LIST_ADD [0E74]*/
    add(value: int): void;
    /** Adds a string value to the specified list
    *
    * https://library.sannybuilder.com/#/sa?q=LIST_ADD_STRING [0E7B]*/
    addString(string: string): void;
    /** Deletes the specified list
    *
    * https://library.sannybuilder.com/#/sa?q=DELETE_LIST [0E73]*/
    delete(): void;
    /** Returns the number of entries in the specified list
    *
    * https://library.sannybuilder.com/#/sa?q=GET_LIST_SIZE [0E77]*/
    getSize(): int;
    /** Returns a string value from the specified list by index
    *
    * https://library.sannybuilder.com/#/sa?q=GET_LIST_STRING_VALUE_BY_INDEX [0E7A]*/
    getStringValueByIndex(index: int): string;
    /** Returns a numerical value from the specified list by index
    *
    * https://library.sannybuilder.com/#/sa?q=GET_LIST_VALUE_BY_INDEX [0E78]*/
    getValueByIndex(index: int): int;
    /** Inserts a string value into a list by index
    *
    * https://library.sannybuilder.com/#/sa?q=INSERT_LIST_STRING_VALUE_BY_INDEX [0F09]*/
    insertStringValueByIndex(index: int, string: string): void;
    /** Inserts a value into a list by index
    *
    * https://library.sannybuilder.com/#/sa?q=INSERT_LIST_VALUE_BY_INDEX [0F08]*/
    insertValueByIndex(index: int, value: int): void;
    /** Removes an entry from the specified list by index
    *
    * https://library.sannybuilder.com/#/sa?q=LIST_REMOVE_INDEX [0E76]*/
    removeIndex(index: int): void;
    /** Removes entries from the specified list by index range
    *
    * https://library.sannybuilder.com/#/sa?q=LIST_REMOVE_INDEX_RANGE [0E7D]*/
    removeIndexRange(start: int, stop: int): void;
    /** Removes a string value from the specified list
    *
    * https://library.sannybuilder.com/#/sa?q=LIST_REMOVE_STRING_VALUE [0E7C]*/
    removeStringValue(string: string): void;
    /** Removes a numerical value from the specified list
    *
    * https://library.sannybuilder.com/#/sa?q=LIST_REMOVE_VALUE [0E75]*/
    removeValue(value: int): void;
    /** Replaces a string value on a list by index
    *
    * https://library.sannybuilder.com/#/sa?q=REPLACE_LIST_STRING_VALUE_BY_INDEX [0F07]*/
    replaceStringValueByIndex(index: int, string: string): void;
    /** Replaces a value on a list by index
    *
    * https://library.sannybuilder.com/#/sa?q=REPLACE_LIST_VALUE_BY_INDEX [0F06]*/
    replaceValueByIndex(index: int, value: int): void;
    /** Resets all entries within the specified list
    *
    * https://library.sannybuilder.com/#/sa?q=RESET_LIST [0E79]*/
    reset(): void;
    /** Reverses the order of entries within the specified list
    *
    * https://library.sannybuilder.com/#/sa?q=REVERSE_LIST [0E7E]*/
    reverse(): void;
}
declare var List: List
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
    cbrt(x: number): number;    /** Returns the clamped value of the specified float between the min and max values
    *
    * https://library.sannybuilder.com/#/sa?q=CLAMP_FLOAT [0EF4]*/
    ClampFloat(float: float, min: float, max: float): float;
    /** Returns the clamped value of the specified integer between the min and max values
    *
    * https://library.sannybuilder.com/#/sa?q=CLAMP_INT [0EF7]*/
    ClampInt(integer: int, min: int, max: int): int;
    /** Clears n-th bit of the number
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_BIT [2702]*/
    ClearBit(number: int, bitIndex: int): void;
    /** Returns the result of converting meters to feet
    *
    * https://library.sannybuilder.com/#/sa?q=CONVERT_METRES_TO_FEET_INT [042D]*/
    ConvertMetersToFeet(meters: int): int;
    /** Returns true if rectangle1 is inside rectangle2 or partially intersects it
    *
    * https://library.sannybuilder.com/#/sa?q=DO_2D_RECTANGLES_COLLIDE [05A5]*/
    Do2DRectanglesCollide(rectangle1PositionX: float, rectangle1PositionY: float, rectangle1SizeX: float, rectangle1SizeY: float, rectangle2PositionX: float, rectangle2PositionY: float, rectangle2SizeX: float, rectangle2SizeY: float): boolean;
    /** Eases k value in range of 0.0 to 1.0, resulting in a easing value based on mode and way, useful for smooth animations
    *
    * https://library.sannybuilder.com/#/sa?q=EASE [0E1F]*/
    Ease(k: float, mode: int, way: int): float;
    /** Generates a randomFloat from min to < max with seed
    *
    * https://library.sannybuilder.com/#/sa?q=GENERATE_RANDOM_FLOAT_IN_RANGE_WITH_SEED [0EBD]*/
    GenerateRandomFloatInRangeWithSeed(seed: int, min: float, max: float): float;
    /** Generates a randomInteger from min to < max with seed
    *
    * https://library.sannybuilder.com/#/sa?q=GENERATE_RANDOM_INT_IN_RANGE_WITH_SEED [0EBC]*/
    GenerateRandomIntInRangeWithSeed(seed: int, min: int, max: int): int;
    /** Returns the point of intersection of two lines. If they do not intersect, both returned values are -1000000.0 and the condition result is false
    *
    * https://library.sannybuilder.com/#/sa?q=GET_2D_LINES_INTERSECT_POINT [05B0]*/
    Get2DLinesIntersectPoint(line1StartX: float, line1StartY: float, line1EndX: float, line1EndY: float, line2StartX: float, line2StartY: float, line2EndX: float, line2EndY: float): {
        intersectPointX: float;
        intersectPointY: float;
    } | undefined;
    /** Gets the angle between the two 2D vectors
    *
    * https://library.sannybuilder.com/#/sa?q=GET_ANGLE_BETWEEN_2D_VECTORS [05A4]*/
    GetAngleBetween2DVectors(x1: float, y1: float, x2: float, y2: float): float;
    GetAngleFromTwoCoords(x1: float, y1: float, x2: float, y2: float): float;
    /** Gets the distance between two points
    *
    * https://library.sannybuilder.com/#/sa?q=GET_DISTANCE_BETWEEN_COORDS_2D [0509]*/
    GetDistanceBetweenCoords2D(fromX: float, fromY: float, toX: float, toZ: float): float;
    /** Gets the distance between two points
    *
    * https://library.sannybuilder.com/#/sa?q=GET_DISTANCE_BETWEEN_COORDS_3D [050A]*/
    GetDistanceBetweenCoords3D(fromX: float, fromY: float, fromZ: float, toX: float, toY: float, toZ: float): float;
    /** Gets the angle for the XY offset
    *
    * https://library.sannybuilder.com/#/sa?q=GET_HEADING_FROM_VECTOR_2D [0604]*/
    GetHeadingFromVector2D(x: float, y: float): float;
    /** Checks if n-th bit of the number is set
    *
    * https://library.sannybuilder.com/#/sa?q=IS_BIT_SET [2700]*/
    IsBitSet(number: int, bitIndex: int): boolean;
    /** Checks if value contains number different than 0 or not empty string
    *
    * https://library.sannybuilder.com/#/sa?q=IS_TRUTHY [2704]*/
    IsTruthy(value: int): boolean;
    /** Gets the exact angle of an angle
    *
    * https://library.sannybuilder.com/#/sa?q=LIMIT_ANGLE [0656]*/
    LimitAngle(value: float): float;
    /** Calculates the 1D Perlin simplex noise
    *
    * https://library.sannybuilder.com/#/sa?q=PERLIN_NOISE [0E03]*/
    PerlinNoise(x: float): float;
    /** Calculates the Fractal Brownian Motion (fBm) summation of 1D Perlin Simplex noise
    *
    * https://library.sannybuilder.com/#/sa?q=PERLIN_NOISE_FRACTAL [0E29]*/
    PerlinNoiseFractal(x: float, octaves: int, frequency: float, amplitude: float, lacunarity: float, persistence: float): float;
    /** Calculates the Fractal Brownian Motion (fBm) summation of 2D Perlin Simplex noise
    *
    * https://library.sannybuilder.com/#/sa?q=PERLIN_NOISE_FRACTAL_2D [0EF1]*/
    PerlinNoiseFractal2D(x: float, y: float, octaves: int, frequency: float, amplitude: float, lacunarity: float, persistence: float): float;
    /** Calculates the Fractal Brownian Motion (fBm) summation of 3D Perlin Simplex noise
    *
    * https://library.sannybuilder.com/#/sa?q=PERLIN_NOISE_FRACTAL_3D [0EF2]*/
    PerlinNoiseFractal3D(x: float, y: float, z: float, octaves: int, frequency: float, amplitude: float, lacunarity: float, persistence: float): float;
    /** Sets random condition result, with percent chance to be true
    *
    * https://library.sannybuilder.com/#/sa?q=RANDOM_CHANCE [2708]*/
    RandomChance(percent: float): boolean;
    /** Returns a random float between the specified ranges
    *
    * https://library.sannybuilder.com/#/sa?q=GENERATE_RANDOM_FLOAT_IN_RANGE [0208]*/
    RandomFloatInRange(min: float, max: float): float;
    /** Returns a random integer greater or equal to min and lesser or equal to max
    *
    * https://library.sannybuilder.com/#/sa?q=GENERATE_RANDOM_INT_IN_RANGE [0209]*/
    RandomIntInRange(min: int, max: int): int;
    /** Returns randomly True the specified percent of the time
    *
    * https://library.sannybuilder.com/#/sa?q=RANDOM_PERCENT [0E4D]*/
    RandomPercent(percent: int): boolean;
    /** Selects one random text from provided values
    *
    * https://library.sannybuilder.com/#/sa?q=PICK_RANDOM_TEXT [2707]*/
    RandomPick(...values: number[]): string;
    /** Sets n-th bit of the number
    *
    * https://library.sannybuilder.com/#/sa?q=SET_BIT [2701]*/
    SetBit(number: int, bitIndex: int): void;
    /** Extends a 1-, 2- or 3-byte long integer value to a 4-byte (32-bit), while preserving the sign (+/-)
    *
    * https://library.sannybuilder.com/#/sa?q=SIGN_EXTEND [0B1E]*/
    SignExtend(value: int, fromSize: int): void;
    /** Sets state of n-th bit in the number
    *
    * https://library.sannybuilder.com/#/sa?q=TOGGLE_BIT [2703]*/
    ToggleBit(number: int, bitIndex: int, state: boolean): void;
}
declare var Math: Math
/** Class Matrix
 * 
 * https://library.sannybuilder.com/#/sa/classes/Matrix */
interface Matrix {
    /** Multiplies matrices
    *
    * https://library.sannybuilder.com/#/sa?q=MULTIPLY_MATRICES [0D00]*/
    Multiply(matrixA: Matrix, matrixB: Matrix): Matrix;
    /** Copies matrix to another matrix
    *
    * https://library.sannybuilder.com/#/sa?q=COPY_MATRIX [0D09]*/
    copy(destination: Matrix): void;
    /** Gets coords on offset from matrix
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OFFSET_FROM_MATRIX_IN_WORLD_COORDS [0D0A]*/
    getOffset(x: float, y: float, z: float): {
        x: float;
        y: float;
        z: float;
    };
    /** Gets the X angle of matrix (in degrees)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_MATRIX_X_ANGLE [0D02]*/
    getXAngle(): float;
    /** Gets the Y angle of matrix (in degrees)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_MATRIX_Y_ANGLE [0D03]*/
    getYAngle(): float;
    /** Gets the Z angle of matrix (in degrees)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_MATRIX_Z_ANGLE [0D04]*/
    getZAngle(): float;
    /** Sets matrix angles
    *
    * https://library.sannybuilder.com/#/sa?q=SET_MATRIX_ROTATION [0D08]*/
    rotate(x: float, y: float, z: float): void;
    /** Rotates matrix on axis
    *
    * https://library.sannybuilder.com/#/sa?q=ROTATE_MATRIX_ON_AXIS [0D01]*/
    rotateOnAxis(axisX: float, axisY: float, axisZ: float, angle: float, combineOp: int): void;
    /** Sets position for matrix
    *
    * https://library.sannybuilder.com/#/sa?q=SET_MATRIX_POSITION [0D05]*/
    setPosition(x: float, y: float, z: float): void;
}
declare var Matrix: Matrix
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Memory */
interface Memory {
    /** Reads a floating-point value (IEEE 754) from the memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    ReadFloat(address: int, vp?: boolean): float;
    /** Writes a floating-point value (IEEE 754) to the memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    WriteFloat(address: int, value: float, vp?: boolean): void;
    /** Reads a 8-bit signed integer value from the memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    ReadI8(address: int, vp?: boolean): int;
    /** Reads a 16-bit signed integer value from the memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    ReadI16(address: int, vp?: boolean): int;
    /** Reads a 32-bit signed integer value from the memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    ReadI32(address: int, vp?: boolean): int;
    /** Reads a 8-bit unsigned integer value from the memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    ReadU8(address: int, vp?: boolean): int;
    /** Reads a 16-bit unsigned integer value from the memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    ReadU16(address: int, vp?: boolean): int;
    /** Reads a 32-bit unsigned integer value from the memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    ReadU32(address: int, vp?: boolean): int;
    /** Reads a null-terminated UTF-8 encoded string from the memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    ReadUtf8(address: int): string;
    /** Reads a null-terminated UTF-16 encoded string from the memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    ReadUtf16(address: int): string;
    /** Writes a 8-bit signed integer value to the memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    WriteI8(address: int, value: int, vp?: boolean): void;
    /** Writes a 16-bit signed integer value to the memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    WriteI16(address: int, value: int, vp?: boolean): void;
    /** Writes a 32-bit signed integer value to the memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    WriteI32(address: int, value: int, vp?: boolean): void;
    /** Writes a 8-bit unsigned integer value to the memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    WriteU8(address: int, value: int, vp?: boolean): void;
    /** Writes a 16-bit unsigned integer value to the memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    WriteU16(address: int, value: int, vp?: boolean): void;
    /** Writes a 32-bit unsigned integer value to the memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    WriteU32(address: int, value: int, vp?: boolean): void;
    /** Writes a sequence of UTF-8 encoded characters to the memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    WriteUtf8(address: int, value: string, vp?: boolean): void;
    /** Writes a sequence of UTF-16 encoded characters to the memory 
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    WriteUtf16(address: int, value: string, vp?: boolean): void;
    /** Reads 1, 2, or 4 bytes from the memory
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    Read(address: int, size: int, vp?: boolean): int;
    /** Writes 1, 2, or 4 bytes to the memory. Can also be used as memset.
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    Write(address: int, size: int, value: int, vp?: boolean): void;


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
    /** Allocates a block of memory and returns its address
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    Allocate(size: int): int;
    /** Deallocates a block of memory previously allocated with Memory.Allocate
    *
    * https://re.cleo.li/docs/en/using-memory.html */
    Free(address: int): void;

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
    * https://library.sannybuilder.com/#/sa?q=ALLOCATE_MEMORY [0AC8]*/
    Allocate(size: int): int | undefined;
    /** Calls a function at the address with the given arguments and the calling convention defined by the pop parameter where 0 means 'stdcall' and a value equal to numParams means  'cdecl'
    *
    * https://library.sannybuilder.com/#/sa?q=CALL_FUNCTION [0AA5]*/
    CallFunction(address: int, numArgs: int, pop: int, ...args: number[]): void;
    /** Calls a function similarly to 0AA5 and writes the result into the variable following the arguments list
    *
    * https://library.sannybuilder.com/#/sa?q=CALL_FUNCTION_RETURN [0AA7]*/
    CallFunctionReturn(address: int, numArgs: int, pop: int, ...args: number[]): int;
    /** Calls a method of the object (struct) with the given arguments and the 'thiscall' calling convention (pop is always 0)
    *
    * https://library.sannybuilder.com/#/sa?q=CALL_METHOD [0AA6]*/
    CallMethod(address: int, struct: int, numArgs: int, pop: int, ...args: number[]): void;
    /** Calls a method of the object (struct) similarly to 0AA6 and writes the result into the variable following the arguments list
    *
    * https://library.sannybuilder.com/#/sa?q=CALL_METHOD_RETURN [0AA8]*/
    CallMethodReturn(address: int, struct: int, numArgs: int, pop: int, ...args: number[]): int;
    /** Copies a block of memory from src address to dest address. src and dest regions may overlap (memmove behavior)
    *
    * https://library.sannybuilder.com/#/sa?q=COPY_MEMORY [2400]*/
    Copy(src: int, dest: int, size: int): void;
    /** Returns an address of a memory chunk with the given index in a list of matches for the pattern
    *
    * https://library.sannybuilder.com/#/sa?q=FIND_PATTERN */
    FindPattern(pattern: string, index: int): int | undefined;
    /** Makes the memory chunk allocated with 0AC8 persistent across load/start new game events. The memory is still released when game closes causing no leaks
    *
    * https://library.sannybuilder.com/#/sa?q=FORGET_MEMORY [2403]*/
    Forget(address: int): void;
    /** Frees the memory allocated with 0AC8
    *
    * https://library.sannybuilder.com/#/sa?q=FREE_MEMORY [0AC9]*/
    Free(address: int): void;
    /** Returns the address of the main exe module
    *
    * https://library.sannybuilder.com/#/sa?q=GET_IMAGE_BASE */
    GetImageBase(): int;
    /** Stores the absolute address of a code location marked with the label
    *
    * https://library.sannybuilder.com/#/sa?q=GET_LABEL_POINTER [0AC6]*/
    GetLabelPointer(_: int): int;
    /** Gets the address of the last created custom script
    *
    * https://library.sannybuilder.com/#/sa?q=GET_LAST_CREATED_CUSTOM_SCRIPT [0E70]*/
    GetLastCreatedCustomScript(): int | undefined;
    /** Gets the address of the object struct in the game memory by its handle
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OBJECT_POINTER [0A98]*/
    GetObjectPointer(object: ScriptObject): int;
    /** Gets the corresponding handle of the object located at the given address in memory
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OBJECT_REF [0AEC]*/
    GetObjectRef(address: int): ScriptObject;
    /** Gets the address of the ped struct in the game memory by its handle
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PED_POINTER [0A96]*/
    GetPedPointer(char: Char): int;
    /** Gets the corresponding handle of the char located at the given address in memory
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PED_REF [0AEA]*/
    GetPedRef(address: int): Char;
    /** Returns the address of a most recently (globally) created script (004F, 00D7, 0A92, 0A94)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_SCRIPT_STRUCT_JUST_CREATED [2404]*/
    GetScriptStructJustCreated(): int;
    /** Gets the address of a running script which name matches the given string or 0 otherwise
    *
    * https://library.sannybuilder.com/#/sa?q=GET_SCRIPT_STRUCT_NAMED [0AAA]*/
    GetScriptStructNamed(scriptName: string): int;
    /** Gets the address of the current script structure in the game memory
    *
    * https://library.sannybuilder.com/#/sa?q=GET_THIS_SCRIPT_STRUCT [0A9F]*/
    GetThisScriptStruct(): int;
    /** Stores the absolute address of the variable
    *
    * https://library.sannybuilder.com/#/sa?q=GET_VAR_POINTER [0AC7]*/
    GetVarPointer(_: int): int;
    /** Gets the address of the vehicle struct in the game memory by its handle
    *
    * https://library.sannybuilder.com/#/sa?q=GET_VEHICLE_POINTER [0A97]*/
    GetVehiclePointer(handle: Car): int;
    /** Gets the corresponding handle of the vehicle located at the given address in memory
    *
    * https://library.sannybuilder.com/#/sa?q=GET_VEHICLE_REF [0AEB]*/
    GetVehicleRef(address: int): Car;
    /** Compares two memory blocks
    *
    * https://library.sannybuilder.com/#/sa?q=IS_MEMORY_EQUAL [2407]*/
    IsEqual(addressA: int, addressB: int, size: int): boolean;
    /** Checks if address points at valid and running script
    *
    * https://library.sannybuilder.com/#/sa?q=IS_SCRIPT_RUNNING [2405]*/
    IsScriptRunning(address: int): boolean;
    /** Fills memory address with 0x90 with given size
    *
    * https://library.sannybuilder.com/#/sa?q=MAKE_NOP [0E6A]*/
    MakeNop(address: int, size: int): void;
    /** Returns a floating-point number stored as the result of the function called (0AA5, 0AA6, 0AA7, 0AA8) immediately before this command
    *
    * https://library.sannybuilder.com/#/sa?q=POP_FLOAT [0AE9]*/
    PopFloat(): float;
    /** Reads a value from the game memory
    *
    * https://library.sannybuilder.com/#/sa?q=READ_MEMORY [0A8D]*/
    Read(address: int, size: int, vp: boolean): int;
    /** Reads a 32-bit value referenced by a relative offset at the address
    *
    * https://library.sannybuilder.com/#/sa?q=READ_RELATIVE_OFFSET */
    ReadRelativeOffset(address: int): int;
    /** Reads a value from the given offset from the memory address (see: 0D38)
    *
    * https://library.sannybuilder.com/#/sa?q=READ_STRUCT_OFFSET [0D4E]*/
    ReadStructOffset(address: int, offset: int, size: int): int;
    /** Reads a value from the given offset from the memory address multiple times as array/vector
    *
    * https://library.sannybuilder.com/#/sa?q=READ_STRUCT_OFFSET_MULTI [0EE2]*/
    ReadStructOffsetMulti(address: int, offset: int, count: int, size: int): number[];
    /** Reads the dword value from the struct address by index (index*4+address) see: 0D4E
    *
    * https://library.sannybuilder.com/#/sa?q=READ_STRUCT_PARAM [0D38]*/
    ReadStructParam(address: int, index: int): number[];
    /** Reads a value from the given offset from the memory address (see: 2402)
    *
    * https://library.sannybuilder.com/#/sa?q=READ_MEMORY_WITH_OFFSET [2401]*/
    ReadWithOffset(address: int, offset: int, size: int): int;
    /** Writes the value at the memory address
    *
    * https://library.sannybuilder.com/#/sa?q=WRITE_MEMORY [0A8C]*/
    Write(address: int, size: int, value: int, vp: boolean): void;
    /** Replaces an offset at the address with the offset to the near address (use ALLOC_NEAR)
    *
    * https://library.sannybuilder.com/#/sa?q=WRITE_RELATIVE_OFFSET */
    WriteRelativeOffset(address: int, nearAddress: int): void;
    /** Writes the value at the given offset from the memory address (see: 0D37)
    *
    * https://library.sannybuilder.com/#/sa?q=WRITE_STRUCT_OFFSET [0E28]*/
    WriteStructOffset(address: int, offset: int, size: int, value: int): void;
    /** Writes the value at the given offset from the memory address multiple times as array/vector
    *
    * https://library.sannybuilder.com/#/sa?q=WRITE_STRUCT_OFFSET_MULTI [0EE3]*/
    WriteStructOffsetMulti(address: int, offset: int, count: int, size: int, ...params: number[]): void;
    /** Writes the dword value to the struct address by index (index*4+address) see: 0E28
    *
    * https://library.sannybuilder.com/#/sa?q=WRITE_STRUCT_PARAM [0D37]*/
    WriteStructParam(address: int, index: int, ...value: number[]): void;
    /** Writes the value at the given offset from the memory address (see: 2401)
    *
    * https://library.sannybuilder.com/#/sa?q=WRITE_MEMORY_WITH_OFFSET [2402]*/
    WriteWithOffset(address: int, offset: int, size: int, value: int): void;
}
declare var Memory: Memory
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Menu */
declare class Menu {
    constructor(handle: number);
    /** Creates the specified panel on the screen with basic settings
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_MENU [08D4]*/
    static Create(header: string, topLeftX: float, topLeftY: float, width: float, numColumns: int, interactive: boolean, background: boolean, alignment: int): Menu;
    activateItem(row: int, state: boolean): Menu;
    changeCarColor(vehicle: Car, colorSlot: int, row: int): Menu;
    /** Removes the specified panel from the screen
    *
    * https://library.sannybuilder.com/#/sa?q=DELETE_MENU [08DA]*/
    delete(): void;
    /** Returns the last row of a panel selected with the sprint key
    *
    * https://library.sannybuilder.com/#/sa?q=GET_MENU_ITEM_ACCEPTED [08D8]*/
    getItemAccepted(): int;
    /** Returns the currently highlighted row in a panel
    *
    * https://library.sannybuilder.com/#/sa?q=GET_MENU_ITEM_SELECTED [08D7]*/
    getItemSelected(): int;
    /** Highlights the menu item - used to indicate an owned shopping item
    *
    * https://library.sannybuilder.com/#/sa?q=HIGHLIGHT_MENU_ITEM [0A23]*/
    highlightItem(row: int, state: boolean): Menu;
    setActiveItem(row: int): Menu;
    setColumn(column: int, title: string, row0: string, row1: string, row2: string, row3: string, row4: string, row5: string, row6: string, row7: string, row8: string, row9: string, row10: string, row11: string): Menu;
    setColumnOrientation(column: int, alignment: int): Menu;
    /** Sets the width of the specified menu column
    *
    * https://library.sannybuilder.com/#/sa?q=SET_MENU_COLUMN_WIDTH [09DB]*/
    setColumnWidth(column: int, width: int): Menu;
    setItemWith2Numbers(column: int, row: int, gxt: string, number1: int, number2: int): Menu;
    /** Sets the numbered GXT of the specified panel row
    *
    * https://library.sannybuilder.com/#/sa?q=SET_MENU_ITEM_WITH_NUMBER [08EE]*/
    setItemWithNumber(column: int, row: int, gxt: string, number: int): Menu;
}
/** Current Mission control
 * 
 * https://library.sannybuilder.com/#/sa/classes/Mission */
interface Mission {
    /** Terminates the active mission by executing its mission cleanup routine
    *
    * https://library.sannybuilder.com/#/sa?q=FAIL_CURRENT_MISSION [045C]*/
    Fail(): void;
    /** Resets multiple settings that are usually set during missions and in some scripts
    *
    * https://library.sannybuilder.com/#/sa?q=MISSION_HAS_FINISHED [00D8]*/
    Finish(): void;
    /** Returns true if the player is on a mission (the variable set in 0180 is not zero)
    *
    * https://library.sannybuilder.com/#/sa?q=IS_ON_MISSION [0E1D]*/
    IsOn(): boolean;
    /** Checks if is playing scripted mission cutscene, that is, original widescreen borders are toggled on
    *
    * https://library.sannybuilder.com/#/sa?q=IS_ON_SCRIPTED_CUTSCENE [0EB7]*/
    IsOnScriptedCutscene(): boolean;
    /** Loads a mission from the list defined in the main.scm header
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_AND_LAUNCH_MISSION_INTERNAL [0417]*/
    LoadAndLaunchInternal(index: int): void;
}
declare var Mission: Mission
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Mouse */
interface Mouse {
    /** Returns the position of the mouse cursor
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CURSOR_POS */
    GetCursorPos(): {
        x: int;
        y: int;
    } | undefined;
    /** Gives the offset of the mouse or right thumbstick movement
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PC_MOUSE_MOVEMENT [0A4A]*/
    GetMovement(): {
        deltaX: float;
        deltaY: float;
    };
    /** Gets the mouse sensibility set in the game options
    *
    * https://library.sannybuilder.com/#/sa?q=GET_MOUSE_SENSIBILITY [0E23]*/
    GetSensibility(): float;
    /** Returns true if the players settings are set to invert the mouse
    *
    * https://library.sannybuilder.com/#/sa?q=IS_MOUSE_USING_VERTICAL_INVERSION [0A4C]*/
    IsUsingVerticalInversion(): boolean;
    /** Returns true if the mouse wheel has been scrolled down
    *
    * https://library.sannybuilder.com/#/sa?q=IS_MOUSE_WHEEL_DOWN [0E11]*/
    IsWheelDown(): boolean;
    /** Returns true if the mouse wheel has been scrolled up
    *
    * https://library.sannybuilder.com/#/sa?q=IS_MOUSE_WHEEL_UP [0E10]*/
    IsWheelUp(): boolean;
    /** Sets the position of the mouse cursor
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CURSOR_POS */
    SetCursorPos(x: int, y: int): boolean;
}
declare var Mouse: Mouse
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Pad */
interface Pad {
    /** Simulates key press event
    *
    * https://library.sannybuilder.com/#/sa?q=EMULATE_KEY_PRESS [2083]*/
    EmulateKeyPress(keyCode: int): void;
    /** Simulates key release event
    *
    * https://library.sannybuilder.com/#/sa?q=EMULATE_KEY_RELEASE [2084]*/
    EmulateKeyRelease(keyCode: int): void;
    /** Returns n-th alternate key assigned to pad's action. If no key is bound then return value is unchanged and logical result is false
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CONTROLLER_KEY [2085]*/
    GetControllerKey(action: int, altKey: int): int | undefined;
    /** Returns the controller mode
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CONTROLLER_MODE [0293]*/
    GetControllerMode(): int;
    /** Gets code of first just pressed key in range between minKeyCode and maxKeyCode. If no key was pressed return value is unmodified and logical result is set to false
    *
    * https://library.sannybuilder.com/#/sa?q=GET_KEY_JUST_PRESSED_IN_RANGE [2082]*/
    GetKeyJustPressedInRange(minKeyCode: int, maxKeyCode: int): int | undefined;
    /** Returns keyboard/mouse key name text of specified keyCode. If key code has no name return value is unchanged and logical result is false
    *
    * https://library.sannybuilder.com/#/sa?q=GET_KEY_NAME [2086]*/
    GetKeyName(keyCode: int): string | undefined;
    /** Gets code of first currently hold down key in range between minKeyCode and maxKeyCode. If no key is pressed return value is unmodified and logical result is set to false
    *
    * https://library.sannybuilder.com/#/sa?q=GET_KEY_PRESSED_IN_RANGE [2081]*/
    GetKeyPressedInRange(minKeyCode: int, maxKeyCode: int): int | undefined;
    /** Returns the code of the last pressed button
    *
    * https://library.sannybuilder.com/#/sa?q=GET_LAST_KEY */
    GetLastKey(): int;
    /** Returns the offset of the specified Left/Right, Up/Down, Look Left/Look Right and Look Up/Look Down keys
    *
    * https://library.sannybuilder.com/#/sa?q=GET_POSITION_OF_ANALOGUE_STICKS [0494]*/
    GetPositionOfAnalogueSticks(pad: int): {
        leftStickX: int;
        leftStickY: int;
        rightStickX: int;
        rightStickY: int;
    };
    /** Stores the status of the specified key into a variable
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PAD_STATE [00E2]*/
    GetState(pad: int, buttonId: int): int;
    /** Returns the time in milliseconds since the pad has been touched
    *
    * https://library.sannybuilder.com/#/sa?q=GET_TIME_NOT_TOUCHING_PAD [0F13]*/
    GetTimeNotTouching(pad: int): int;
    /** Holds down a keyboard or mouse button until it gets released with RELEASE_KEY
    *
    * https://library.sannybuilder.com/#/sa?q=HOLD_KEY */
    HoldKey(keyCode: int): void;
    /** Returns True if the pad's aim button is pressed
    *
    * https://library.sannybuilder.com/#/sa?q=IS_AIM_BUTTON_PRESSED [0E67]*/
    IsAimButtonPressed(pad: int): boolean;
    /** Returns True if the pad's primary or secondary fire button is pressed
    *
    * https://library.sannybuilder.com/#/sa?q=IS_ANY_FIRE_BUTTON_PRESSED [0E8D]*/
    IsAnyFireButtonPressed(pad: int): boolean;
    /** Returns true if the pad's button has just started to be pressed this frame
    *
    * https://library.sannybuilder.com/#/sa?q=IS_BUTTON_JUST_PRESSED [0E3E]*/
    IsButtonJustPressed(pad: int, buttonId: int): boolean;
    /** Returns true if the pad's button has been pressed
    *
    * https://library.sannybuilder.com/#/sa?q=IS_BUTTON_PRESSED [00E1]*/
    IsButtonPressed(pad: int, buttonId: int): boolean;
    /** Returns true if a keyboard or mouse button has just been pressed
    *
    * https://library.sannybuilder.com/#/sa?q=IS_KEY_DOWN */
    IsKeyDown(keyCode: int): boolean;
    /** Returns true if the player has just started to press a specified key this frame
    *
    * https://library.sannybuilder.com/#/sa?q=IS_KEY_JUST_PRESSED [2080]*/
    IsKeyJustPressed(keyCode: int): boolean;
    /** Returns true if the player is pressing a keyboard button with the specified code
    *
    * https://library.sannybuilder.com/#/sa?q=IS_KEY_PRESSED [0AB0]*/
    IsKeyPressed(keyCode: int): boolean;
    /** Returns true if a keyboard or mouse button has just been released
    *
    * https://library.sannybuilder.com/#/sa?q=IS_KEY_UP */
    IsKeyUp(keyCode: int): boolean;
    /** Returns true if the player is pressing a key used to skip cutscenes or the game has been minimised
    *
    * https://library.sannybuilder.com/#/sa?q=IS_SKIP_CUTSCENE_BUTTON_PRESSED [08D0]*/
    IsSkipCutsceneButtonPressed(): boolean;
    /** Releases a keyboard or mouse button after HOLD_KEY
    *
    * https://library.sannybuilder.com/#/sa?q=RELEASE_KEY */
    ReleaseKey(keyCode: int): void;
    /** Enables the specified control pad
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_CONTROL_PAD [0E68]*/
    SetControl(pad: int, enabled: boolean): void;
    /** Affects the delay to the left and right steering while driving
    *
    * https://library.sannybuilder.com/#/sa?q=SET_DRUNK_INPUT_DELAY [03FD]*/
    SetDrunkInputDelay(pad: int, delay: int): void;
    /** Enables the specified control pad's movement
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_CONTROL_PAD_MOVEMENT [0E69]*/
    SetMovement(pad: int, movement: boolean): void;
    SetPlayerCycleWeaponButton(playerId: Player, enabled: boolean): void;
    /** Sets whether a player can use the ACTION key to display their stats
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_DISPLAY_VITAL_STATS_BUTTON [0960]*/
    SetPlayerDisplayVitalStatsButton(playerId: Player, enabled: boolean): void;
    /** Sets whether the player can use the crouch button
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_DUCK_BUTTON [082A]*/
    SetPlayerDuckButton(playerId: Player, enabled: boolean): void;
    /** Sets whether the player can enter and exit vehicles
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_ENTER_CAR_BUTTON [07CC]*/
    SetPlayerEnterCarButton(playerId: Player, enabled: boolean): void;
    /** Sets whether the player is able to use weapons
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_FIRE_BUTTON [0881]*/
    SetPlayerFireButton(playerId: Player, enabled: boolean): void;
    /** Sets whether the player can jump
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_JUMP_BUTTON [0901]*/
    SetPlayerJumpButton(playerId: Player, enabled: boolean): void;
    /** Shakes the player's joypad at the specified intensity for the specified time
    *
    * https://library.sannybuilder.com/#/sa?q=SHAKE_PAD [015B]*/
    Shake(pad: int, time: int, intensity: int): void;
    /** Returns true if the specified string of letters has been typed on the keyboard
    *
    * https://library.sannybuilder.com/#/sa?q=TEST_CHEAT [0ADC]*/
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
    * https://library.sannybuilder.com/#/sa?q=CREATE_FX_SYSTEM [064B]*/
    static Create(name: string, x: float, y: float, z: float, ignoreBoundingChecks: boolean): Particle;
    /** Creates a particle effect attached to a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_FX_SYSTEM_ON_CAR [066B]*/
    static CreateOnCar(name: string, vehicle: Car, xOffset: float, yOffset: float, zOffset: float, ignoreBoundingChecks: boolean): Particle;
    /** Creates a particle and attaches it to the specified vehicle with the specified offset and direction
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_FX_SYSTEM_ON_CAR_WITH_DIRECTION [066C]*/
    static CreateOnCarWithDirection(name: string, vehicle: Car, xOffset: float, yOffset: float, zOffset: float, xDirection: float, yDirection: float, zDirection: float, ignoreBoundingChecks: boolean): Particle;
    /** Creates a particle attached to a character
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_FX_SYSTEM_ON_CHAR [0669]*/
    static CreateOnChar(name: string, char: Char, xOffset: float, yOffset: float, zOffset: float, ignoreBoundingChecks: boolean): Particle;
    /** Creates a particle effect attached to a character
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_FX_SYSTEM_ON_CHAR_WITH_DIRECTION [066A]*/
    static CreateOnCharWithDirection(name: string, char: Char, xOffset: float, yOffset: float, zOffset: float, xDirection: float, yDirection: float, zDirection: float, ignoreBoundingChecks: boolean): Particle;
    /** Creates a particle effect on an object
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_FX_SYSTEM_ON_OBJECT [066D]*/
    static CreateOnObject(name: string, object: ScriptObject, xOffset: float, yOffset: float, zOffset: float, ignoreBoundingChecks: boolean): Particle;
    /** Creates particle effect on an object
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_FX_SYSTEM_ON_OBJECT_WITH_DIRECTION [066E]*/
    static CreateOnObjectWithDirection(name: string, object: ScriptObject, xOffset: float, yOffset: float, zOffset: float, xDirection: float, yDirection: float, zDirection: float, ignoreBoundingChecks: boolean): Particle;
    /** Attaches the specified particle to the specified character
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_FX_SYSTEM_TO_CHAR_BONE [0883]*/
    attachToCharBone(handle: Char, pedBone: int): Particle;
    /** Stops the particle and deletes it
    *
    * https://library.sannybuilder.com/#/sa?q=KILL_FX_SYSTEM [0650]*/
    kill(): void;
    /** Destroys the specified particle
    *
    * https://library.sannybuilder.com/#/sa?q=KILL_FX_SYSTEM_NOW [0976]*/
    killNow(): void;
    /** Makes the specified particle visible
    *
    * https://library.sannybuilder.com/#/sa?q=PLAY_FX_SYSTEM [064C]*/
    play(): Particle;
    /** Starts the particle effect and relinquishes script control over it
    *
    * https://library.sannybuilder.com/#/sa?q=PLAY_AND_KILL_FX_SYSTEM [064F]*/
    playAndKill(): Particle;
    /** Stops the specified particle at the source
    *
    * https://library.sannybuilder.com/#/sa?q=STOP_FX_SYSTEM [064E]*/
    stop(): Particle;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Path */
interface Path {
    /** Adds a new point to the patrol route
    *
    * https://library.sannybuilder.com/#/sa?q=EXTEND_PATROL_ROUTE [0755]*/
    ExtendPatrolRoute(x: float, y: float, z: float, animationName: string, animationFile: string): void;
    /** Adds a point to the task route
    *
    * https://library.sannybuilder.com/#/sa?q=EXTEND_ROUTE [05D7]*/
    ExtendRoute(x: float, y: float, z: float): void;
    /** Clears all previous patrol data to start a new patrol route, which can be used in combination with 0755 to create patrol routes
    *
    * https://library.sannybuilder.com/#/sa?q=FLUSH_PATROL_ROUTE [0754]*/
    FlushPatrolRoute(): void;
    /** Flushes the task route
    *
    * https://library.sannybuilder.com/#/sa?q=FLUSH_ROUTE [05D6]*/
    FlushRoute(): void;
    /** Returns the nearest path note from the specified coordinates that a vehicle can drive on
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CLOSEST_CAR_NODE [02C1]*/
    GetClosestCarNode(x: float, y: float, z: float): {
        nodeX: float;
        nodeY: float;
        nodeZ: float;
    };
    /** Returns the position and heading of the closest vehicle path node to the specified position
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CLOSEST_CAR_NODE_WITH_HEADING [03D3]*/
    GetClosestCarNodeWithHeading(x: float, y: float, z: float): {
        nodeX: float;
        nodeY: float;
        nodeZ: float;
        angle: float;
    };
    /** Returns the nearest path node from the specified coordinates that a pedestrian can walk on
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CLOSEST_CHAR_NODE [02C0]*/
    GetClosestCharNode(x: float, y: float, z: float): {
        nodeX: float;
        nodeY: float;
        nodeZ: float;
    };
    /** Gets two closest path nodes within the specified distance range
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CLOSEST_STRAIGHT_ROAD [04B9]*/
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
    * https://library.sannybuilder.com/#/sa?q=GET_NTH_CLOSEST_CAR_NODE [04D3]*/
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
    * https://library.sannybuilder.com/#/sa?q=LOAD_PATH_NODES_IN_AREA [0606]*/
    LoadPathNodesInArea(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float): void;
    MarkRoadNodeAsDontWander(x: float, y: float, z: float): void;
    /** Removes areas forbidden for scripted cars set up by 0606
    *
    * https://library.sannybuilder.com/#/sa?q=RELEASE_PATH_NODES [0607]*/
    ReleaseNodes(): void;
    /** Reverts all changes to ped paths done with SWITCH_PED_ROADS_ON and SWITCH_PED_ROADS_OFF
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_PED_ROADS_BACK_TO_ORIGINAL [091E]*/
    SwitchPedRoadsBackToOriginal(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): void;
    /** Disables all ped paths in the given area
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_PED_ROADS_OFF [022B]*/
    SwitchPedRoadsOff(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): void;
    /** Enables all ped paths in the given area
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_PED_ROADS_ON [022A]*/
    SwitchPedRoadsOn(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): void;
    /** Reverts all changes to car paths done with SWITCH_ROADS_ON and SWITCH_ROADS_OFF
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_ROADS_BACK_TO_ORIGINAL [091D]*/
    SwitchRoadsBackToOriginal(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): void;
    /** Disables all car paths in the given area
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_ROADS_OFF [01E8]*/
    SwitchRoadsOff(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): void;
    /** Enables all car paths in the given area
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_ROADS_ON [01E7]*/
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
    * https://library.sannybuilder.com/#/sa?q=CREATE_PICKUP [0213]*/
    static Create(modelId: int, pickupType: int, x: float, y: float, z: float): Pickup;
    /** Creates an asset pickup for an asset which can be bought
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_FORSALE_PROPERTY_PICKUP [0518]*/
    static CreateForSaleProperty(x: float, y: float, z: float, price: int, message: string): Pickup;
    /** Creates a collectible horseshoe at the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_HORSESHOE_PICKUP [0959]*/
    static CreateHorseshoe(x: float, y: float, z: float): Pickup;
    /** Creates an asset icon for an asset that is not for sale
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_LOCKED_PROPERTY_PICKUP [0517]*/
    static CreateLockedProperty(x: float, y: float, z: float, message: string): Pickup;
    /** Creates a money pickup with the specified cash value
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_MONEY_PICKUP [02E1]*/
    static CreateMoney(x: float, y: float, z: float, cashAmount: int, permanent: boolean): Pickup;
    /** Creates a collectible oyster at the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_OYSTER_PICKUP [095A]*/
    static CreateOyster(x: float, y: float, z: float): Pickup;
    /** Creates an asset revenue pickup
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_PROTECTION_PICKUP [04A6]*/
    static CreateProtection(x: float, y: float, z: float, revenueLimit: int, revenueRate: int): Pickup;
    /** Creates a collectible snapshot at the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_SNAPSHOT_PICKUP [0958]*/
    static CreateSnapshot(x: float, y: float, z: float): Pickup;
    /** Creates a weapon pickup, giving the player the specified amount of ammo when they pick it up
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_PICKUP_WITH_AMMO [032B]*/
    static CreateWithAmmo(modelId: int, pickupType: int, ammo: int, x: float, y: float, z: float): Pickup;
    /** Returns true if the handle is a valid pickup handle
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_PICKUP_EXIST [09D1]*/
    static DoesExist(handle: int): boolean;
    /** Returns the X, Y and Z coordinates of the pickup
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PICKUP_COORDINATES [065B]*/
    getCoordinates(): {
        x: float;
        y: float;
        z: float;
    };
    /** Returns the model of a specified pickup
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PICKUP_MODEL [0E34]*/
    getModel(): int | undefined;
    /** Returns a pointer to the struct of a specified pickup
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PICKUP_POINTER [0E38]*/
    getPointer(): int | undefined;
    /** Returns the SAMP ID of a pickup using its handle
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_PICKUP_ID [0B53]*/
    getSampId(): int | undefined;
    /** Returns the type of a specified pickup
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PICKUP_TYPE [0E39]*/
    getType(): int;
    /** Returns true if specified pickup has been collected
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_PICKUP_BEEN_COLLECTED [0214]*/
    hasBeenCollected(): boolean;
    /** Destroys the specified pickup, freeing game memory
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_PICKUP [0215]*/
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
    * https://library.sannybuilder.com/#/sa?q=CREATE_PLAYER [0053]*/
    static Create(playerIndex: int, x: float, y: float, z: float): Player;
    static MakeGangDisappear(): void;
    static MakeGangReappear(): void;
    /** Restores the players clothes stored with 0793
    *
    * https://library.sannybuilder.com/#/sa?q=RESTORE_CLOTHES_STATE [0794]*/
    static RestoreClothesState(): void;
    /** Stores the players current clothes to later be restored with 0794
    *
    * https://library.sannybuilder.com/#/sa?q=STORE_CLOTHES_STATE [0793]*/
    static StoreClothesState(): void;
    /** Detonates all satchel charges and car bombs planted by the player
    *
    * https://library.sannybuilder.com/#/sa?q=USE_DETONATOR [09D9]*/
    static UseDetonator(): void;
    /** Adds to the player's money
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_SCORE [0109]*/
    addScore(money: int): Player;
    /** Sets the player's wanted level
    *
    * https://library.sannybuilder.com/#/sa?q=ALTER_WANTED_LEVEL [010D]*/
    alterWantedLevel(wantedLevel: int): Player;
    /** Sets the player's wanted level if the specified level is higher than the current one
    *
    * https://library.sannybuilder.com/#/sa?q=ALTER_WANTED_LEVEL_NO_DROP [010E]*/
    alterWantedLevelNoDrop(wantedLevel: int): Player;
    /** Applies brakes to the player's car
    *
    * https://library.sannybuilder.com/#/sa?q=APPLY_BRAKES_TO_PLAYERS_CAR [0221]*/
    applyBrakesToCar(state: boolean): Player;
    /** Rebuilds the player model, applying any required texture changes
    *
    * https://library.sannybuilder.com/#/sa?q=BUILD_PLAYER_MODEL [070D]*/
    buildModel(): Player;
    /** Returns true if the player can move
    *
    * https://library.sannybuilder.com/#/sa?q=CAN_PLAYER_START_MISSION [03EE]*/
    canStartMission(): boolean;
    /** Changes player money by set, add or remove
    *
    * https://library.sannybuilder.com/#/sa?q=CHANGE_PLAYER_MONEY [0E5E]*/
    changeMoney(mode: int, value: int): Player;
    /** Resets the status of the last model the player has shot
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_LAST_BUILDING_MODEL_SHOT_BY_PLAYER [0A3B]*/
    clearLastBuildingModelShot(): Player;
    /** Clears the player's wanted level
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_WANTED_LEVEL [0110]*/
    clearWantedLevel(): Player;
    /** Removes the specified player
    *
    * https://library.sannybuilder.com/#/sa?q=DELETE_PLAYER [06DF]*/
    delete(): void;
    disableSprint(state: boolean): Player;
    /** Sets the amount of ammo a player has during a driveby
    *
    * https://library.sannybuilder.com/#/sa?q=ENSURE_PLAYER_HAS_DRIVE_BY_WEAPON [0563]*/
    ensureHasDriveByWeapon(ammo: int): Player;
    forceInteriorLighting(state: boolean): Player;
    /** Gets the character handle for the specified player
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PLAYER_CHAR [01F5]*/
    getChar(): Char;
    getCharIsTargeting(): Char | undefined;
    /** Gets the player's current city
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CITY_PLAYER_IS_IN [0842]*/
    getCityIsIn(): int;
    getClothesItem(bodyPart: int): {
        textureHash: int;
        modelHash: int;
    };
    getGroup(): Group;
    getMaxArmor(): int;
    /** Returns the number of times the player has destroyed a specific model
    *
    * https://library.sannybuilder.com/#/sa?q=GET_NUM_OF_MODELS_KILLED_BY_PLAYER [0298]*/
    getNumOfModelsKilled(modelId: int): int;
    /** Returns the number of peds killed by the player since the last reset (0297)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_TOTAL_NUMBER_OF_PEDS_KILLED_BY_PLAYER [0806]*/
    getTotalNumberOfPedsKilled(): int;
    /** Returns the stats of the most recent wheelie or stoppie attempt
    *
    * https://library.sannybuilder.com/#/sa?q=GET_WHEELIE_STATS [04FC]*/
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
    * https://library.sannybuilder.com/#/sa?q=GIVE_PLAYER_CLOTHES_OUTSIDE_SHOP [087B]*/
    giveClothesOutsideShop(textureName: string, modelName: string, bodyPart: int): Player;
    /** Increases the player's max armor by the specified value and changes current armor to the new maximum
    *
    * https://library.sannybuilder.com/#/sa?q=INCREASE_PLAYER_MAX_ARMOUR [055F]*/
    increaseMaxArmor(value: int): Player;
    /** Increases the player's max health by the specified value and changes current health to the new maximum
    *
    * https://library.sannybuilder.com/#/sa?q=INCREASE_PLAYER_MAX_HEALTH [055E]*/
    increaseMaxHealth(value: int): Player;
    /** Returns true if the heading has finished being applied, as started by 0858
    *
    * https://library.sannybuilder.com/#/sa?q=IS_ATTACHED_PLAYER_HEADING_ACHIEVED [0861]*/
    isAttachedHeadingAchieved(): boolean;
    /** Returns true if the player is climbing
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_CLIMBING [0A29]*/
    isClimbing(): boolean;
    /** Returns true if the player control hasn't been disabled using 01B4
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_CONTROL_ON [09E7]*/
    isControlOn(): boolean;
    /** Returns true when player is dead (wasted)
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_DEAD [0117]*/
    isDead(): boolean;
    /** Returns true if the player is in the specified zone
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_IN_INFO_ZONE [0583]*/
    isInInfoZone(infoZone: string): boolean;
    /** Returns true if the player is controlling a remote-control vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_IN_REMOTE_MODE [0241]*/
    isInRemoteMode(): boolean;
    /** Returns true if the player's last shot model is the model specified
    *
    * https://library.sannybuilder.com/#/sa?q=IS_LAST_BUILDING_MODEL_SHOT_BY_PLAYER [0A3A]*/
    isLastBuildingModelShot(modelId: int): boolean;
    /** Returns true if the player is performing a stoppie
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_PERFORMING_STOPPIE [07F2]*/
    isPerformingStoppie(): boolean;
    isPerformingWheelie(): boolean;
    /** Returns true if the player hasn't been wasted or busted (the player is still playing)
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_PLAYING [0256]*/
    isPlaying(): boolean;
    /** Returns true if the player is honking the horn in a car
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_PRESSING_HORN [0122]*/
    isPressingHorn(): boolean;
    /** Returns true if the player's money is over the specified value
    *
    * https://library.sannybuilder.com/#/sa?q=IS_SCORE_GREATER [010A]*/
    isScoreGreater(money: int): boolean;
    /** Returns true if the specified player is auto-aiming at a ped or object
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_TARGETTING_ANYTHING [068C]*/
    isTargetingAnything(): boolean;
    /** Returns true if the player is aiming at the specified character
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_TARGETTING_CHAR [0457]*/
    isTargetingChar(handle: Char): boolean;
    /** Returns true if the player is aiming at the specified object
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_TARGETTING_OBJECT [0458]*/
    isTargetingObject(handle: ScriptObject): boolean;
    /** Returns true if player is using a jetpack
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_USING_JETPACK [0A0C]*/
    isUsingJetpack(): boolean;
    /** Returns true if the player's wanted level is over the specified value
    *
    * https://library.sannybuilder.com/#/sa?q=IS_WANTED_LEVEL_GREATER [010F]*/
    isWantedLevelGreater(wantedLevel: int): boolean;
    /** Returns true if the player's bodypart has the specified model (0784 or 087B) 
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PLAYER_WEARING [0500]*/
    isWearing(bodyPart: int, modelName: string): boolean;
    /** Makes the player immune to fire
    *
    * https://library.sannybuilder.com/#/sa?q=MAKE_PLAYER_FIRE_PROOF [055D]*/
    makeFireProof(state: boolean): Player;
    /** Makes the player safe, putting the character in a safe location
    *
    * https://library.sannybuilder.com/#/sa?q=MAKE_PLAYER_SAFE_FOR_CUTSCENE [03EF]*/
    makeSafeForCutscene(): Player;
    /** Resets the count of how many times the player has destroyed a certain model
    *
    * https://library.sannybuilder.com/#/sa?q=RESET_NUM_OF_MODELS_KILLED_BY_PLAYER [0297]*/
    resetNumOfModelsKilled(): Player;
    /** Sets the players driveby mode
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_CAN_DO_DRIVE_BY [0501]*/
    setCanDoDriveBy(state: boolean): Player;
    /** Sets whether player's control is enabled
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_CONTROL [01B4]*/
    setControl(state: boolean): Player;
    /** Makes the camera start moving around in a swirling motion with the specified intensity as if drunk
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_DRUNKENNESS [052C]*/
    setDrunkenness(intensity: int): Player;
    /** Defines whether the player can reload their gun 4x times faster
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_FAST_RELOAD [0331]*/
    setFastReload(state: boolean): Player;
    /** Sets whether the player loses the cash when gets wasted (works once)
    *
    * https://library.sannybuilder.com/#/sa?q=SET_FREE_HEALTH_CARE [0414]*/
    setFreeHealthCare(state: boolean): Player;
    /** Sets the player's ability to recruit new members to the group
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_GROUP_RECRUITMENT [07B4]*/
    setGroupRecruitment(state: boolean): Player;
    /** Controls the players ability to tell their group to wait and automatically orders any group members to continue following
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_GROUP_TO_FOLLOW_ALWAYS [0A20]*/
    setGroupToFollowAlways(state: boolean): Player;
    /** Sets whether the player's group stops following the player, even if the player uses the "group follow" button
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_GROUP_TO_FOLLOW_NEVER [0A31]*/
    setGroupToFollowNever(state: boolean): Player;
    /** Sets the view angle for the player attached to an object or vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=SET_HEADING_FOR_ATTACHED_PLAYER [0858]*/
    setHeadingForAttached(heading: float, headingRange: float): Player;
    /** Changes the player to use the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_MODEL [09C7]*/
    setModel(modelId: int): Player;
    /** Sets the players mood, affecting the dialogue spoken by the player
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_MOOD [04E3]*/
    setMood(mood: int, time: int): Player;
    /** Defines whether the player can run fast forever
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAYER_NEVER_GETS_TIRED [0330]*/
    setNeverGetsTired(state: boolean): Player;
    /** Returns the player's money
    *
    * https://library.sannybuilder.com/#/sa?q=STORE_SCORE [010B]*/
    storeScore(): int;
    /** Returns the player's current wanted level
    *
    * https://library.sannybuilder.com/#/sa?q=STORE_WANTED_LEVEL [01C0]*/
    storeWantedLevel(): int;
    /** Removes the players Goggles and disables night/heat vision
    *
    * https://library.sannybuilder.com/#/sa?q=PLAYER_TAKE_OFF_GOGGLES [09EB]*/
    takeOffGoggles(animate: boolean): Player;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Rc */
interface Rc {
    /** Returns the player's radio-controlled vehicle (alts:00D9,03C0,0811)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_REMOTE_CONTROLLED_CAR [0484]*/
    GetCar(player: Player): Car;
    /** Puts the player in control of a remote-control vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=GIVE_REMOTE_CONTROLLED_MODEL_TO_PLAYER [046E]*/
    GiveModelToPlayer(handle: Player, x: float, y: float, z: float, angle: float, modelId: int): void;
    /** Exits remote-control mode
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_RC_BUGGY [04DB]*/
    RemoveBuggy(): void;
    /** Enables a remote-control vehicle detonation
    *
    * https://library.sannybuilder.com/#/sa?q=SET_ENABLE_RC_DETONATE [048A]*/
    SetEnableDetonate(state: boolean): void;
    /** Sets whether RC Bandits detonate on contact with the wheels of any four-wheeled vehicles
    *
    * https://library.sannybuilder.com/#/sa?q=SET_ENABLE_RC_DETONATE_ON_CONTACT [04D6]*/
    SetEnableDetonateOnContact(state: boolean): void;
    /** Puts the specified player in control of a remote-control vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=TAKE_REMOTE_CONTROL_OF_CAR [0715]*/
    TakeCar(player: Player, vehicle: Car): void;
}
declare var Rc: Rc
/** Class RenderObject
 * 
 * https://library.sannybuilder.com/#/sa/classes/RenderObject */
interface RenderObject {
    /** Creates renderObject to character bone
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_RENDER_OBJECT_TO_CHAR_BONE [0E2E]*/
    CreateToCharBone(char: Char, modelId: int, pedBone: int, x: float, y: float, z: float, rx: float, ry: float, rz: float): RenderObject;
    /** Deletes the renderObject
    *
    * https://library.sannybuilder.com/#/sa?q=DELETE_RENDER_OBJECT [0E2F]*/
    delete(): void;
    /** Sets the renderObject's distortion
    *
    * https://library.sannybuilder.com/#/sa?q=SET_RENDER_OBJECT_DISTORTION [0E3A]*/
    setDistortion(x: float, y: float, z: float, w: float): void;
    /** Sets the position of a renderObject
    *
    * https://library.sannybuilder.com/#/sa?q=SET_RENDER_OBJECT_POSITION [0E35]*/
    setPosition(x: float, y: float, z: float): void;
    /** Sets the rotation of the renderObject
    *
    * https://library.sannybuilder.com/#/sa?q=SET_RENDER_OBJECT_ROTATION [0E36]*/
    setRotation(x: float, y: float, z: float): void;
    /** Sets the scale of the renderObject
    *
    * https://library.sannybuilder.com/#/sa?q=SET_RENDER_OBJECT_SCALE [0E37]*/
    setScale(x: float, y: float, z: float): void;
    /** Sets the visible status of the renderObject
    *
    * https://library.sannybuilder.com/#/sa?q=SET_RENDER_OBJECT_VISIBLE [0E31]*/
    setVisible(visible: boolean): void;
}
declare var RenderObject: RenderObject
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Restart */
interface Restart {
    /** Adds a hospital restart, which is where the player will spawn after death (wasted) if the point is closer than any other hospital restart
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_HOSPITAL_RESTART [016C]*/
    AddHospital(x: float, y: float, z: float, heading: float, citiesPassed: int): void;
    /** Adds a police restart, which is where the player will spawn after being arrested (busted) if the point is closer than any other police restart
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_POLICE_RESTART [016D]*/
    AddPolice(x: float, y: float, z: float, heading: float, citiesPassed: int): void;
    /** Stops the player from spawning at the override location (016E)
    *
    * https://library.sannybuilder.com/#/sa?q=CANCEL_OVERRIDE_RESTART [01F6]*/
    CancelOverride(): void;
    /** Forces this location to be the next respawn location
    *
    * https://library.sannybuilder.com/#/sa?q=OVERRIDE_NEXT_RESTART [016E]*/
    OverrideNext(x: float, y: float, z: float, heading: float): void;
    SetExtraHospitalRestartPoint(x: float, y: float, z: float, radius: float, heading: float): void;
    SetExtraPoliceStationRestartPoint(x: float, y: float, z: float, radius: float, heading: float): void;
    /** Overrides the respawn point
    *
    * https://library.sannybuilder.com/#/sa?q=SET_RESPAWN_POINT_FOR_DURATION_OF_MISSION [09FF]*/
    SetRespawnPointForDurationOfMission(x: float, y: float, z: float): void;
}
declare var Restart: Restart
/** Class Samp
 * 
 * https://library.sannybuilder.com/#/sa/classes/Samp */
interface Samp {
    /** Closes the active dialog by pressing the specified button programmatically
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_CLOSE_ACTIVE_DIALOG_WITH_BUTTON [0B47]*/
    CloseDialog(button: int): boolean;
    /** Connects to the specified samp server information
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_CONNECT [0B38]*/
    Connect(serverIp: string, port: int): void;
    /** Sends SampPacket.AimSync containing our current aim data, to server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_FORCE_AIM_SYNC [0C84]*/
    ForceAimSync(): void;
    /** Sends SampPacket.DrivingSync to server about our character driving a car with ID
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_FORCE_DRIVING_SYNC [0C81]*/
    ForceDrivingSync(id: int): void;
    /** Sends SampPacket.OnFootSync to server about our character being onfoot
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_FORCE_ONFOOT_SYNC [0C83]*/
    ForceOnfootSync(): void;
    /** Sends SampPacket.PassengerSync to server about our character sitting at seatId of a car with carId
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_FORCE_PASSENGER_SYNC [0C86]*/
    ForcePassengerSync(carId: int, seatId: int): void;
    /** Sends SampPacket.StatsUpdate containing our current money and drunk level, to server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_FORCE_STATS_SYNC [0C87]*/
    ForceStatsSync(): void;
    /** Sends SampPacket.TrailerSync to server about a trailer with ID being attached to our player
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_FORCE_TRAILER_SYNC [0C85]*/
    ForceTrailerSync(id: int): void;
    /** Sends SampPacket.UnoccupiedCarSync to server about a seatId of a car with carId being unoccupied
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_FORCE_UNOCCUPIED_SYNC [0C82]*/
    ForceUnnocupiedSync(carId: int, seatId: int): void;
    /** Sends SampPacket.WeaponsUpdate containing our character's current weapons, to server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_FORCE_WEAPONS_SYNC [0C88]*/
    ForceWeaponsSync(): void;
    /** Returns the Animation SAMP ID using its name and the file it was loaded from
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_ANIMATION_ID [0B59]*/
    GetAnimId(animName: string, fileName: string): int | undefined;
    /** Stores the filename and animname of the animation using its SAMP ID
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_ANIMATION_NAME [0B58]*/
    GetAnimName(animId: int): {
        fileName: int;
        animName: int;
    } | undefined;
    /** Returns a pointer to the memory address of samp.dll
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_BASE_ADDRESS [0AF7]*/
    GetBaseAddress(): int;
    /** Returns the vehicle handle using its samp vehicle id. Returns 0 If the car is not in the stream zone
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_CAR_BY_ID [0AFF]*/
    GetCar(id: int): Car;
    /** Returns the pointer to samp car pool structure
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_CAR_POOL_POINTER [0BB8]*/
    GetCarPoolPtr(): int;
    /** Returns the pointer to samp chat input field structure
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_CHAT_INPUT_INFO_POINTER [0BAF]*/
    GetChatInfoPtr(): int;
    /** Returns the current mouse cursor mode
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_CURSOR_MODE [0B8E]*/
    GetCursorMode(): int | undefined;
    /** Returns the content of the active dialog to buffer. If the dialog is not opened, the last opened dialog is evaluated instead
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_DIALOG_CONTENT [0BD7]*/
    GetDialogContent(buffer: string): void;
    /** Stores the text from the input field of the active dialog to the buffer
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_ACTIVE_DIALOG_EDITBOX_TEXT [0B4A]*/
    GetDialogEditboxText(): string | undefined;
    /** Returns the ID of the active dialog. If the dialog is not opened, returns the ID of the last opened dialog instead
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_DIALOG_ID [0B4E]*/
    GetDialogId(): int | undefined;
    /** Returns the pointer to samp dialog structure
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_DIALOG_INFO_POINTER [0BB0]*/
    GetDialogInfoPtr(): int;
    /** Stores the text of an item with specific id from the active dialog's list, to buffer. If the dialog is not opened, the last opened dialog is evaluated instead
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_DIALOG_LIST_ITEM_TEXT [0B5B]*/
    GetDialogItemText(itemId: int): string | undefined;
    /** Returns the total number of items found on the active dialog's list. If the dialog is not opened, the last opened dialog is used instead
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_DIALOG_LIST_ITEMS_COUNT [0B54]*/
    GetDialogItemsCount(): int | undefined;
    /** Returns the ID of the currently selected item on the list
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_ACTIVE_DIALOG_SELECTED_LIST_ITEM [0B48]*/
    GetDialogSelectedItem(): int | undefined;
    /** Returns the style of the active dialog. If the dialog is not opened, returns the style of the last opened dialog instead
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_DIALOG_STYLE [0B4D]*/
    GetDialogStyle(): int | undefined;
    /** Stores the title of the active dialog to buffer. If the dialog is not opened, the last opened dialog is evaluated instead
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_DIALOG_TITLE [0BD8]*/
    GetDialogTitle(buffer: string): void;
    /** Returns our connection status towards the server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_GAMESTATE [0B4F]*/
    GetGamestate(): int;
    /** Returns a pointer to the pool of samp allocated territories (gang territories)
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_GANGZONE_POOL_POINTER [0BB5]*/
    GetGangZonePoolPtr(): int;
    /** Returns a pointer to a SampInfo structure
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_INFO_POINTER [0B7F]*/
    GetInfoPtr(): int;
    /** Returns the pointer to samp kill list structure
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_KILL_INFO_POINTER [0BB1]*/
    GetKillInfoPtr(): int;
    /** Returns the pointer to a structure of various samp miscellaneous data
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_MISC_INFO_POINTER [0BB2]*/
    GetMiscInfoPtr(): int;
    /** Returns the handle of an object using its SAMP ID
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_OBJECT_BY_ID [0B50]*/
    GetObject(id: int): ScriptObject | undefined;
    /** Returns the pointer to samp object pool structure
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_OBJECT_POOL_POINTER [0BB4]*/
    GetObjectPoolPtr(): int;
    /** Returns the handle of a pickup using its SAMP ID
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_PICKUP_BY_ID [0B51]*/
    GetPickup(id: int): Pickup | undefined;
    /** Returns the pointer to samp pickup pool structure
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_PICKUP_POOL_POINTER [0BB9]*/
    GetPickupPoolPtr(): int;
    /** Returns the number of players that are currently streamed if streamedOnly = true. Else, returns the number of players allowed in the server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_PLAYER_COUNT [0C8B]*/
    GetPlayerCount(streamedOnly: boolean): int;
    /** Returns the pointer to player pool structure
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_PLAYER_POOL_POINTER [0BB7]*/
    GetPlayerPoolPtr(): int;
    /** Returns the pointer to samp pools structure
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_POOLS_POINTER [0BAD]*/
    GetPoolsPtr(): int;
    /** Returns the address of the RakClientInterface virtual method table function by index
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_RAKCLIENT_FUNC_BY_INDEX [0B7C]*/
    GetRakClientFunc(index: int): int;
    /** Returns a pointer to a RakClientInterface object
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_RAKCLIENT_INTERFACE [0B7A]*/
    GetRakClientInterface(): int;
    /** Returns a pointer to RakPeer
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_RAKPEER [0B7B]*/
    GetRakPeer(): int;
    /** Returns the RPC callback address by index
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_RPC_FUNC_BY_INDEX [0B7D]*/
    GetRpcFunc(index: int): int | undefined;
    /** Returns a pointer to the RPC structure at index
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_RPC_NODE_BY_INDEX [0B7E]*/
    GetRpcNode(index: int): int | undefined;
    /** Returns the server's port and stores server's IP address to buffer
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_SERVER_ADDRESS [0B39]*/
    GetServerAddress(): {
        buffer: string;
        port: int;
    };
    /** Stores the server name to buffer
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_SERVER_NAME [0B3A]*/
    GetServerName(): string;
    /** Returns the pointer to server settings structure
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_SERVER_SETTINGS_POINTER [0BAC]*/
    GetServerSettingsPtr(): int;
    /** Returns the pointer to samp textdraw pool structure
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_TEXTDRAW_POOL_POINTER [0BB3]*/
    GetTextDrawPoolPtr(): int;
    /** Returns the pointer to 3D text pool structure
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_TEXTLABEL_POOL_POINTER [0BB6]*/
    GetTextLabelPoolPtr(): int;
    /** Returns logical true if the last submitted SAMP Dialog is equal to the specified dialogid
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_HAS_DIALOG_RESPONDED [0B3C]*/
    HasDialogResponded(dialogId: int): {
        buttonId: int;
        listItemId: int;
        inputTextBuffer: int;
    } | undefined;
    /** Evaluates as logical true if SAMP structures was initialized. Used when checking if gta sa is running on SAMP or in Single Player
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_IS_AVAILABLE [0AFA]*/
    IsAvailable(): boolean;
    /** Checks if the mouse cursor were both visible and movable
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_IS_CURSOR_ACTIVE [0B8C]*/
    IsCursorActive(): boolean;
    /** Evaluates as logical true if the specified dialog with id is currently visible
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_IS_DIALOG_ACTIVE [0B4C]*/
    IsDialogActive(id: int): boolean;
    /** Evaluates as logical true if the active dialog is has a client side attribute
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_IS_ACTIVE_DIALOG_CLIENTSIDE [0BDA]*/
    IsDialogClientSide(): boolean;
    /** Evaluates as logical true if the scoreboard is visible
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_IS_SCOREBOARD_VISIBLE [0BD5]*/
    IsScoreboardVisible(): boolean;
    /** Returns the maximum player ID currently streamed if streamedOnly = true. Else, returns the maximum player ID allowed in the server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_MAX_PLAYER_ID [0C8A]*/
    MaxPlayerId(streamedOnly: boolean): int | undefined;
    /** Reads the value with size from samp.dll+offset memory
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_READ_SAMP_MEMORY_WITH_OFFSET [0B2E]*/
    ReadSampMemoryWithOffset(offset: int, size: int): int;
    /** Selects the id of an element in the dialog list
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SELECT_ACTIVE_DIALOG_LIST_ITEM [0B49]*/
    SelectDialogItem(itemId: int): boolean;
    /** Sends SampPacket.AimSync to the server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_AIM_DATA [0BC3]*/
    SendPktAimData(stAimData: int): void;
    /** Sends SampPacket.BulletSync to the server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_BULLET_DATA [0BC4]*/
    SendPktBulletData(stBulletData: int): void;
    /** Sends SampPacket.DrivingSync to the server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_DRIVING_DATA [0BC1]*/
    SendPktDrivingData(stInCarData: int): void;
    /** Sends SampPacket.OnFootSync to the server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_ONFOOT_DATA [0BC0]*/
    SendPktOnFootData(stOnFootData: int): void;
    /** Sends SampPacket.PassengerSync to the server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_PASSENGER_DATA [0BC2]*/
    SendPktPassengerData(stPassengerData: int): void;
    /** Sends SampPacket.SpectatorSync to the server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_SPECTATOR_DATA [0BC7]*/
    SendPktSpectatorData(stSpectatorData: int): void;
    /** Sends SampPacket.TrailerSync to the server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_TRAILER_DATA [0BC5]*/
    SendPktTrailerData(stTrailerData: int): void;
    /** Sends SampPacket.UnoccupiedCarSync to the server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_UNOCCUPIEDCAR_DATA [0BC6]*/
    SendPktUnoccupiedCarData(stUnoccupiedData: int): void;
    /** Sends SampRpc.CarDestroyed about destruction of a specific car (exploded or drenched in water)
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_CAR_DESTROYED [0BD4]*/
    SendRpcCarDestroyed(id: int): void;
    /** Sends SampRpc.Chat containing the message or command to the server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_CHAT_MESSAGE [0AF9]*/
    SendRpcChat(format: string, ...args: number[]): void;
    /** Sends SampRpc.ClickPlayer about double click on player (from Scoreboard for example)
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_CLICK_PLAYER [0BC8]*/
    SendRpcClickPlayer(playerId: int, clickSourceId: int): void;
    /** Sends an SampRpc.ClickTextDraw to the server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_CLICK_TEXTDRAW [0BCA]*/
    SendRpcClickTextDraw(textDrawId: int): void;
    /** Sends a SampRpc.DamageCar to the Server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_DAMAGE_CAR [0B33]*/
    SendRpcDamageCar(carId: int, bodyFlags: int, doorFlags: int, lightFlags: int, wheelFlags: int): void;
    /** Sends SampRpc.Death to Server without our character actually dying
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_DEATH_BY_PLAYER [0AFE]*/
    SendRpcDeath(playerId: int, weaponId: int): void;
    /** Sends an SampRpc.DialogResponse to the server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_DIALOG_RESPONSE [0BC9]*/
    SendRpcDialogResponse(dialogId: int, whichButton: int, itemId: int, inputText: string): void;
    /** Sends SampRpc.ScrServerQuit to the server without actually disconnecting our client to the server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_DISCONNECTED [0B28]*/
    SendRpcDisconnected(id: int): void;
    /** Sends SampRpc.EditAttachedObject about a change to an attached object in object edit mode
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_EDIT_ATTACHED_OBJECT [0BCE]*/
    SendRpcEditAttachedObject(response: int, index: int, model: int, pedBone: int, offsetX: float, offsetY: float, offsetZ: float, pitch: float, roll: float, yaw: float, scaleX: float, scaleY: float, scaleZ: float): void;
    /** Sends an SampRpc.EditObject about changing the structure of an object in its editing mode
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_EDIT_OBJECT [0BCD]*/
    SendRpcEditObject(isLocalObject: boolean, id: int, response: int, coordX: float, coordY: float, coordZ: float, pitch: float, roll: float, yaw: float): void;
    /** Sends SampRpc.EnterCar to Server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_ENTER_CAR [0B30]*/
    SendRpcEnterCar(carId: int, isPassenger: boolean): void;
    /** Sends SampRpc.ExitCar to Server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_EXIT_CAR [0B31]*/
    SendRpcExitCar(carId: int): void;
    /** Sends an SampRpc.GiveTakeDamage to the server about damage dealt by another player
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_GIVE_DAMAGE [0BCB]*/
    SendRpcGiveDamage(playerId: int, floatDamage: int, weapon: int, bodyPart: int): void;
    /** Sends SampRpc.MenuSelect about selecting an item in a menu (GTA:SA menu)
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_MENU_SELECT_ROW [0BD2]*/
    SendRpcMenuSelectRow(elementId: int): void;
    /** Sends SampRpc.PickedUpPickup to take a pickup
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_PICKED_UP_PICKUP [0BD1]*/
    SendRpcPickedupPickup(id: int): void;
    /** Sends SampRpc.MenuQuit to tell the server we exited the menu (GTA:SA menu)
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_QUIT_MENU [0BD3]*/
    SendRpcQuitMenu(): void;
    /** Sends an RCON command to the server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_RCON_COMMAND [0BBF]*/
    SendRpcRconCmd(command: string): void;
    /** Sends SampRpc.RequestClass to Server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_REQUEST_CLASS [0AFB]*/
    SendRpcRequestClass(classId: int): void;
    /** Sends SampRpc.RequestInteriorChange
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_REQUEST_INTERIOR_CHANGE [0BCF]*/
    SendRpcRequestInteriorChange(id: int): void;
    /** Sends SampRpc.RequestSpawn
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_REQUEST_SPAWN [0BD0]*/
    SendRpcRequestSpawn(): void;
    /** Sends SampRpc.ScmEvent information about car modification to the server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_SCM_EVENT [0AFC]*/
    SendRpcScmEvent(carId: int, type: int, param1: int, param2: int): void;
    /** Sends a SampRpc.Spawn to SAMP Server without spawning our character
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_SPAWN [0B32]*/
    SendRpcSpawn(): void;
    /** Sends an SampRpc.GiveTakeDamage to the server about damage taken from another player
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SEND_TAKE_DAMAGE [0BCC]*/
    SendRpcTakeDamage(playerId: int, floatDamage: int, weapon: int, bodyPart: int): void;
    /** Sets the cursor mode
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SET_CURSOR_MODE [0B8D]*/
    SetCursorMode(mode: int): void;
    /** Sets the visibility status of mouse cursor
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SET_CURSOR_VISIBILITY [0B5D]*/
    SetCursorVisibility(isVisible: boolean): void;
    /** Sets the text of the edit field of the active dialog's box
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SET_ACTIVE_DIALOG_EDITBOX_TEXT [0B4B]*/
    SetDialogEditboxText(text: string): boolean;
    /** Sets whether interactions with the active dialog would sync to the server(server-sided dialog) or not(client-sided dialog)
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SET_ACTIVE_DIALOG_ENVIRONMENT [0BD9]*/
    SetDialogEnv(isClientSide: boolean): void;
    /** Sets the connection status to the server. Useful when attempting to reconnect or disconnect to server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SET_GAMESTATE [0B27]*/
    SetGameState(id: int): void;
    /** Sets the visibility of the scoreboard
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SET_SCOREBOARD_VISIBILITY [0BD6]*/
    SetScoreboardVisibility(isVisible: boolean): void;
    /** Sets the periodic delay (in milliseconds) of sending specific data type to Server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SET_SEND_RATE [0B22]*/
    SetSendRate(type: int, delay: int): void;
    /** Sets the special action for our Player
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SET_SPECIAL_ACTION [0AFD]*/
    SetSpecialAction(id: int): void;
    /** Shows an artificial SAMP dialog with specified parameter attributes
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SHOW_DIALOG [0B3B]*/
    ShowDialog(id: int, title: string, content: string, leftOrMiddleButtonName: string, rightButtonName: string, style: int): void;
    /** Writes the value with size to samp.dll+offset memory
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_WRITE_SAMP_MEMORY_WITH_OFFSET [0B2D]*/
    WriteSampMemoryWithOffset(offset: int, value: int, size: int): void;
}
declare var Samp: Samp
/** Class SampBitstream
 * 
 * https://library.sannybuilder.com/#/sa/classes/SampBitstream */
interface SampBitstream {
    /** Creates a new raknet bitstream object
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_CREATE_BITSTREAM [0B3D]*/
    Create(): SampBitstream;
    /** Decrypts a compressed string (CString) from the bitstream then stores this to the buffer
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_BITSTREAM_DECODE_COMPRESSED_STRING [0BF4]*/
    decodeCString(buffer: int, buffersize: int): boolean;
    /** Remove's the specified bitstream object, freeing it from memory
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_DELETE_BITSTREAM [0B3E]*/
    delete(): boolean;
    /** Emulates the BitStream's data like an Incoming Packet
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_BITSTREAM_EMULATE_AS_INCOMING_PACKET [0BF7]*/
    emulateAsPacketIn(id: int): boolean;
    /** Emulates the BitStream's data like an incoming RPC
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_BITSTREAM_EMULATE_AS_INCOMING_RPC [0BF6]*/
    emulateAsRpcIn(id: int): boolean;
    /** Encrypts a string stored in the buffer then stores this compressed string (CString) to the bitstream
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_BITSTREAM_ENCODE_STRING [0BF5]*/
    encodeString(buffer: int, bufferSize: int): boolean;
    /** Returns the number of used bits in the BitStream
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_BITSTREAM_GET_NUMBER_OF_BITS_USED [0BEE]*/
    getBitsUsed(): int;
    /** Returns the number of bytes used in the BitStream
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_BITSTREAM_GET_NUMBER_OF_BYTES_USED [0BEF]*/
    getBytesUsed(): int | undefined;
    /** Returns a pointer to the BitStream's data
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_BITSTREAM_GET_DATA_POINTER [0BF3]*/
    getDataPtr(): int | undefined;
    /** Returns the current read offset of the BitStream
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_BITSTREAM_GET_READ_OFFSET [0BF2]*/
    getReadOffset(): int | undefined;
    /** Returns the number of unread bits in the BitStream
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_BITSTREAM_GET_NUMBER_OF_UNREAD_BITS [0BF0]*/
    getUnreadBits(): int | undefined;
    /** Returns the current write offset of the BitStream
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_BITSTREAM_GET_WRITE_OFFSET [0BF1]*/
    getWriteOffset(): int | undefined;
    /** Reads a value with datatype and datasize at the "read pointer" of the specified bitstream , then advances its "read pointer" by the same size
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_BITSTREAM_READ [0BE7]*/
    read(dataType: int): int | undefined;
    /** Stores an array of bytes from the Bitstream to buffer
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_BITSTREAM_READ_ARRAY [0BE8]*/
    readArray(buffer: int, size: int): boolean;
    /** Resets all parameters/clears BitStream
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_RESET_BITSTREAM [0B3F]*/
    reset(): boolean;
    /** Resets the read pointer of the BitStream. Setting "write offset = 0"
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_BITSTREAM_RESET_READ_POINTER [0BE9]*/
    resetReadPtr(): boolean;
    /** Resets (THIS COMMAND IS BUGGED, SETS THE WRITE POINTER AT THE BEGINNING OF THE DATA ( WRITE OFFSET = 0) WHICH IS WRONG. DO NOT USE) the value write pointer in the BitStream
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_BITSTREAM_RESET_WRITE_POINTER [0BEA]*/
    resetWritePtr(): boolean;
    /** Sends Packet BitStream to Server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_SEND_PACKET [0B8B]*/
    sendAsPacket(): boolean;
    /** Sends a Packet BitStream with the specified parameters. Commonly used to send dacket data to server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_SEND_PACKET_WITH_PARAMS [0B42]*/
    sendAsPacketWithParams(priority: int, reliability: int, orderingChannel: int): boolean;
    /** Sends BitStream as RPC to Server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_SEND_RPC [0B8A]*/
    sendAsRpc(rpcId: int): boolean;
    /** Sends a BitStream as an RPC with the specified parameters
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_SEND_RPC_WITH_PARAMS [0B41]*/
    sendAsRpcWithParams(rpc: int, priority: int, reliability: int, orderingChannel: int, shiftTimeStamp: int): boolean;
    /** Sets the read offset of the BitStream
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_BITSTREAM_SET_READ_OFFSET [0BED]*/
    setReadPtr(offset: int): boolean;
    /** Sets the write offset of the BitStream
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_BITSTREAM_SET_WRITE_OFFSET [0BEC]*/
    setWriteOffset(offset: int): boolean;
    /** Increases both its "read pointer" and "write pointer" of the Bitstream by the specified bit count
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_BITSTREAM_SKIP_BITS [0BEB]*/
    skipBits(bitCount: int): boolean;
    /** Writes a specified value with datatype and datasize at the "write pointer" of the specified bitstream, then advances its "write pointer" by the same size
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_BITSTREAM_WRITE [0B40]*/
    write(value: int, dataType: int, dataSize: int): boolean;
}
declare var SampBitstream: SampBitstream
/** Class SampChat
 * 
 * https://library.sannybuilder.com/#/sa/classes/SampChat */
interface SampChat {
    /** Adds one line of colored message to the chat
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_ADD_MESSAGE_TO_CHAT [0AF8]*/
    AddMsg(format: string, color: int, ...args: number[]): void;
    /** Returns the current chat display mode
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_CHAT_DISPLAY_MODE [0BDC]*/
    GetDisplayMode(): int;
    /** Returns the chat line's text parameters
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_CHAT_LINE [0B75]*/
    GetLine(index: int): {
        bodyBuffer: string;
        prefixBuffer: string;
        bodyColor: int;
        prefixColor: int;
    } | undefined;
    /** Evaluates as logical true if chat lines are visible
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_IS_CHAT_VISIBLE [0BDB]*/
    IsVisible(): boolean;
    /** Sets the chat display mode
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SET_CHAT_DISPLAY_MODE [0BDD]*/
    SetDisplayMode(mode: int): void;
    /** Changes the chat line's text into a custom one
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SET_CHAT_LINE [0B74]*/
    SetLine(chatLineid: int, body: string, prefix: string, bodyColor: int, prefixColor: int): boolean;
}
declare var SampChat: SampChat
/** Class SampChatInput
 * 
 * https://library.sannybuilder.com/#/sa/classes/SampChatInput */
interface SampChatInput {
    /** Returns the current text in the chat input box
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_CHAT_INPUT_TEXT [0B77]*/
    GetText(): string | undefined;
    /** Checks if the chat box input is open/visible
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_IS_CHAT_INPUT_VISIBLE [0B21]*/
    IsVisible(): boolean;
    /** Processes a message by SAMPFUNCS callbacks, then sent to server as SampRpc.Chat
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_PROCESS_CHAT_INPUT [0C8F]*/
    Process(text: string): void;
    /** Overwrites the content written at the chat input box
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SET_CHAT_INPUT_TEXT [0B76]*/
    SetText(text: string): void;
    /** Sets the visibility status (open/closed) of the chat input box
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SET_CHAT_INPUT_VISIBILITY [0B79]*/
    SetVisibility(isVisible: boolean): void;
}
declare var SampChatInput: SampChatInput
/** Class SampLocalChatCmd
 * 
 * https://library.sannybuilder.com/#/sa/classes/SampLocalChatCmd */
interface SampLocalChatCmd {
    /** Registers a callback hooked from a client sided chat command
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_HOOK_CHAT_COMMAND_AS_LOCAL [0B34]*/
    Hook(chatCommand: string, callback: int): boolean;
    /** Evaluates as logical true if the specified command is localized by a callback hook
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_IS_CHAT_COMMAND_HOOKED [0C90]*/
    IsHooked(chatCommand: string): boolean;
    /** Sets the description for the local command
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SET_LOCAL_CHAT_COMMAND_DESCRIPTION [0C7F]*/
    SetDescription(chatCommand: string, decription: string): void;
    /** Removes all callbacks hooked from a client sided chat command created by SAMP_REGISTER_CLIENTSIDE_COMMAND, suppressing all its callback's operation 
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_UNHOOK_LOCAL_CHAT_COMMAND [0B63]*/
    Unhook(chatCommand: string): boolean;
}
declare var SampLocalChatCmd: SampLocalChatCmd
/** Class SampMyPlayer
 * 
 * https://library.sannybuilder.com/#/sa/classes/SampMyPlayer */
interface SampMyPlayer {
    /** Sends SampRpc.Spawn to SAMP Server. Teleports our character to spawn as well
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_FORCE_SPAWN_MY_PLAYER [0AF6]*/
    ForceSpawn(): void;
    /** Evaluates as logical true if our player has been spawned already
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_IS_MY_PLAYER_SPAWNED [0B61]*/
    IsSpawned(): boolean;
    /** Changes our nickname (visually)
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SET_MY_NICKNAME [0B29]*/
    SetNickname(nickname: string): void;
}
declare var SampMyPlayer: SampMyPlayer
/** Class SampPlayer
 * 
 * https://library.sannybuilder.com/#/sa/classes/SampPlayer */
interface SampPlayer {
    /** Returns the SAMP ID of the animation currently being played by the specified player
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_PLAYER_ANIMATION [0B57]*/
    getAnim(): int | undefined;
    /** Gets the amount of armor the specified player has
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_PLAYER_ARMOR [0B26]*/
    getArmor(): int;
    /** Returns the character handle using the Player ID. Returns -1 if the player is not in the stream zone
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_PLAYER_CHAR_BY_ID [0B20]*/
    getChar(): Char;
    /** Returns the color of the specified player in 0xAARRGGBB format
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_PLAYER_COLOR [0B37]*/
    getColor(): int;
    /** Gets the amount of health the specified player has
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_PLAYER_HEALTH [0B25]*/
    getHealth(): int;
    /** Returns a pointer to the nickname of the specified player
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_PLAYER_NICKNAME [0B36]*/
    getName(): int;
    /** Returns the ping of the specified player with ID
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_PLAYER_PING [0B2A]*/
    getPing(): int;
    /** Returns the player's samp structure. Returns 0 (NULL Pointer) if player isn't connected
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_PLAYER_POINTER [0B24]*/
    getPtr(): int;
    /** Returns the current score of the specified player
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_PLAYER_SCORE [0B65]*/
    getScore(): int | undefined;
    /** Returns the special action ID of the specified player
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_PLAYER_SPECIAL_ACTION [0B62]*/
    getSpecialAction(): int | undefined;
    /** Returns the 3D Coordinates of a player who is outside the stream zone, if the server allows it
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_STREAMED_OUT_PLAYER_COORDS [0B2F]*/
    getStreamedOutCoords(): {
        x: float;
        y: float;
        z: float;
    };
    /** Checks if the specified player is an NPC
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_IS_PLAYER_NPC [0B64]*/
    isNpc(): boolean;
    /** Evaluates as logical true if the specified player is in paused state (or AFK)
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_IS_PLAYER_PAUSED [0B5C]*/
    isPaused(): boolean;
    /** Returns true if REMOTE Player with the given ID is connected
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_IS_REMOTE_PLAYER_CONNECTED [0B23]*/
    isRemotelyConnected(): boolean;
    /** Stores the specified player's aimData structure to the buffer
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_STORE_PLAYER_AIM_DATA [0BBE]*/
    storeAimData(): int | undefined;
    /** Stores the player's current inCarData structure to the buffer
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_STORE_PLAYER_DRIVING_DATA [0BBB]*/
    storeDrivingData(): int | undefined;
    /** Stores the current player's onFootData structure to the buffer
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_STORE_PLAYER_ONFOOT_DATA [0BBA]*/
    storeOnFootData(): int | undefined;
    /** Stores the current passengerData structure of the player to the buffer
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_STORE_PLAYER_PASSENGER_DATA [0BBC]*/
    storePassengerData(): int | undefined;
    /** Stores the player's current trailerData structure to the buffer
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_STORE_PLAYER_TRAILER_DATA [0BBD]*/
    storeTrailerData(): int | undefined;
}
declare var SampPlayer: SampPlayer
/** Class SampRaknet
 * 
 * https://library.sannybuilder.com/#/sa/classes/SampRaknet */
interface SampRaknet {
    /** Returns the hook parameter's value of the currently executing callback
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_HOOK_GET_PARAM [0BE5]*/
    GetHookParam(type: int): int | undefined;
    /** Returns a pointer to the Packet ID's Name
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_GET_PACKET_NAME [0BF9]*/
    GetPacketName(id: int): int | undefined;
    /** Returns a pointer to the RPC ID's Name
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_GET_RPC_NAME [0BF8]*/
    GetRpcName(id: int): string | undefined;
    /** Redirects all incoming packets to the specified callback for subsequent processing before acceptance on the local client
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_HOOK_INCOMING_PACKET [0BE4]*/
    HookPacketIn(callback: int): boolean;
    /** Redirects all outgoing Packets to the specified callback for subsequent processing before sending to the server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_HOOK_OUTCOMING_PACKET [0BE2]*/
    HookPacketOut(callback: int): boolean;
    /** Redirects all incoming RPCs to the specified callback for subsequent processing before acceptance on the local client
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_HOOK_INCOMING_RPC [0BE3]*/
    HookRpcIn(callback: int): boolean;
    /** Redirects all outgoing RPCs to the specified callback for subsequent processing before sending to the server
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_HOOK_OUTCOMING_RPC [0BE1]*/
    HookRpcOut(callback: int): boolean;
    /** Returns the flow of control to RakNet and decides whether the currently intercepted data will be processed by RakNet or not
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_HOOK_RETURN [0BE0]*/
    Return(processData: boolean): void;
    /** Sets the hook parameter's value of the currently executing callback
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_RAKNET_SET_HOOK_PARAM [0BE6]*/
    SetHookParam(type: int, value: int): boolean;
}
declare var SampRaknet: SampRaknet
/** Class SampTextDraw
 * 
 * https://library.sannybuilder.com/#/sa/classes/SampTextDraw */
interface SampTextDraw {
    /** Modifies a textdraw with the specified parameters, creating it if it doesn't exist
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_CREATE_TEXTDRAW [0C48]*/
    Create(id: SampTextDraw, text: string, coordX: float, coordY: float): boolean;
    /** Deletes the specified textdraw
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_DELETE_TEXTDRAW [0C5E]*/
    delete(): boolean;
    /** Evaluates as logical true if the specified textdraw exists
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_DOES_TEXTDRAW_EXIST [0C5D]*/
    doesExist(): boolean;
    /** Sets the alignment of the text in the textdraw
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_TEXTDRAW_ALIGNMENT [0C54]*/
    getAlignment(): int | undefined;
    /** Returns the parameters of the "box" (rectangle) of the specified text draw
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_TEXTDRAW_BOX [0C53]*/
    getBox(): {
        isVisible: boolean;
        color: int;
        width: float;
        height: float;
    } | undefined;
    /** Returns the size and color property of all characters in the textdraw
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_TEXTDRAW_CHARACTER_PROPERTIES [0C5C]*/
    getCharProps(): {
        width: float;
        height: float;
        color: int;
    } | undefined;
    /** Returns the gamescreen coordinates of the textdraw
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_TEXTDRAW_COORDS [0C5B]*/
    getCoords(): {
        coordX: float;
        coordY: float;
    } | undefined;
    /** Returns the properties of the text draw as a model (style 5)
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_TEXTDRAW_MODEL [0C59]*/
    getModel(): {
        model: int;
        rotPitch: float;
        rotRoll: float;
        rotYaw: float;
        camZoomRange: float;
        primaryColor: int;
        secondaryColor: int;
    } | undefined;
    /** Returns the tickness and color property of the text draw's outline
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_TEXTDRAW_OUTLINE [0C58]*/
    getOutline(): {
        tickness: int;
        color: int;
    } | undefined;
    /** Returns true if the text scaling status is proportional to the text draw
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_TEXTDRAW_PROPORTIONALITY [0C55]*/
    getProportionality(): boolean | undefined;
    /** Returns the tickness and color property of the text draw's shadow
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_TEXTDRAW_SHADOW [0C57]*/
    getShadow(): {
        tickness: int;
        color: int;
    } | undefined;
    /** Returns the text draw style
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_TEXTDRAW_STYLE [0C56]*/
    getStyle(): int | undefined;
    /** Sets the alignment of the text in the textdraw
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SET_TEXTDRAW_ALIGNMENT [0C4A]*/
    setAlignment(alignment: int): boolean;
    /** Sets the parameters of the "box" (rectangle) of the text draw
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SET_TEXTDRAW_BOX [0C49]*/
    setBox(isVisible: boolean, color: int, width: float, height: float): boolean;
    /** Sets the size and color property of all characters in the textdraw
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SET_TEXTDRAW_CHARACTER_PROPERTIES [0C52]*/
    setCharProps(width: float, height: float, color: int): boolean;
    /** Sets the gamescreen coordinates of the textdraw
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SET_TEXTDRAW_COORDS [0C51]*/
    setCoords(coordX: float, coordY: float): boolean;
    /** Sets the model (object, auto) of the text draw for style 5
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SET_TEXTDRAW_MODEL [0C4F]*/
    setModel(model: int, rotPitch: float, rotRoll: float, rotYaw: float, camZoomRange: float, primaryColor: int, secondaryColor: int): boolean;
    /** Sets the outline of the text draw
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SET_TEXTDRAW_OUTLINE [0C4E]*/
    setOutline(tickness: int, color: int): boolean;
    /** Sets whether the text scaling status is proportional to the text draw or not
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SET_TEXTDRAW_PROPORTIONALITY [0C4B]*/
    setProportionality(isProportional: boolean): boolean;
    /** Sets a shadow on the text draw
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SET_TEXTDRAW_SHADOW [0C4D]*/
    setShadow(tickness: int, color: int): boolean;
    /** Sets the text draw style
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SET_TEXTDRAW_STYLE [0C4C]*/
    setStyle(style: int): boolean;
    /** Sets the text of the textdraw
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SET_TEXTDRAW_TEXT [0C50]*/
    setText(text: string): boolean;
    /** Stores the textdraw's text to stringBuffer
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_STORE_TEXTDRAW_TEXT [0C5A]*/
    storeText(): string | undefined;
}
declare var SampTextDraw: SampTextDraw
/** Class SampTextLabel3D
 * 
 * https://library.sannybuilder.com/#/sa/classes/SampTextLabel3D */
interface SampTextLabel3D {
    /** Creates an artificial SAMP 3D text with the specified parameter attributes
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_CREATE_3D_TEXT [0B44]*/
    Create(text: string, color: int, coordX: float, coordY: float, coordZ: float, visibilityRadius: float, showBehindWalls: boolean, attachedPlayerId: int, attachedCarId: int): SampTextLabel3D | undefined;
    /** Creates/overwrites a 3D text with the specified ID
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_CREATE_3D_TEXT_WITH_ID [0C45]*/
    CreateWithId(idAsHandle: SampTextLabel3D, text: int, color: int, coordX: float, coordY: float, coordZ: float, visibilityRadius: float, showBehindWalls: boolean, attachedPlayerId: int, attachedCarId: int): void;
    /** Destroys a 3D text using it's ID
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_DELETE_3D_TEXT [0B45]*/
    delete(): boolean;
    /** Returns logical true if the specified 3D text exists
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_DOES_3D_TEXT_EXIST [0B46]*/
    doesExist(): boolean;
    /** Returns all the informations about a SampTextLabel3D using its ID
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_3D_TEXT_PARAMS [0C46]*/
    getParams(): {
        text: string;
        color: int;
        coordX: float;
        coordY: float;
        coordZ: float;
        visibilityRadius: float;
        showBehindWalls: boolean;
        attachedPlayerId: int;
        attachedCarId: int;
    } | undefined;
    /** Sets new text for 3D text
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_SET_3D_TEXT [0C47]*/
    setText(text: string): boolean;
}
declare var SampTextLabel3D: SampTextLabel3D
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/ScriptFire */
declare class ScriptFire {
    constructor(handle: number);
    /** Creates a script fire on the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=START_CAR_FIRE [0325]*/
    static CreateCarFire(vehicle: Car): ScriptFire;
    /** Creates a script fire on the character
    *
    * https://library.sannybuilder.com/#/sa?q=START_CHAR_FIRE [0326]*/
    static CreateCharFire(char: Char): ScriptFire;
    /** Creates a fire at the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=START_SCRIPT_FIRE [02CF]*/
    static Start(x: float, y: float, z: float, propagation: int, size: int): ScriptFire;
    /** Returns true if the handle is a valid script fire handle
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_SCRIPT_FIRE_EXIST [0973]*/
    static DoesExist(handle: int): boolean;
    /** Gets the coordinates of the fire
    *
    * https://library.sannybuilder.com/#/sa?q=GET_SCRIPT_FIRE_COORDS [06F5]*/
    getCoords(): {
        x: float;
        y: float;
        z: float;
    };
    /** Returns true if the script fire has been put out
    *
    * https://library.sannybuilder.com/#/sa?q=IS_SCRIPT_FIRE_EXTINGUISHED [02D0]*/
    isExtinguished(): boolean;
    /** Removes the script fire
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_SCRIPT_FIRE [02D1]*/
    remove(): void;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/ScriptObject */
declare class ScriptObject {
    constructor(handle: number);
    /** Creates an object at the specified location, with the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_OBJECT [0107]*/
    static Create(modelId: int, x: float, y: float, z: float): ScriptObject;
    /** Creates an object without offset at the location
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_OBJECT_NO_OFFSET [029B]*/
    static CreateNoOffset(modelId: int, x: float, y: float, z: float): ScriptObject;
    /** Creates an no save game object at the specified location, with the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_OBJECT_NO_SAVE [0E01]*/
    static CreateNoSave(modelId: int, x: float, y: float, z: float, useOffset: boolean, useGround: boolean): ScriptObject;
    /** Returns true if the handle is a valid object handle
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_OBJECT_EXIST [03CA]*/
    static DoesExist(handle: int): boolean;
    /** Sets the object's rotation velocity from the center of its body
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_TO_OBJECT_ROTATION_VELOCITY [05A1]*/
    addToRotationVelocity(x: float, y: float, z: float): ScriptObject;
    /** Adds the given vector to the object's velocity (0381)
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_TO_OBJECT_VELOCITY [038C]*/
    addToVelocity(x: float, y: float, z: float): ScriptObject;
    /** Sets the object's velocity
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_VELOCITY_RELATIVE_TO_OBJECT_VELOCITY [05A7]*/
    addVelocityRelative(x: float, y: float, z: float): ScriptObject;
    attachToCar(handle: Car, xOffset: float, yOffset: float, zOffset: float, xRotation: float, yRotation: float, zRotation: float): ScriptObject;
    attachToChar(handle: Char, xOffset: float, yOffset: float, zOffset: float, xRotation: float, yRotation: float, zRotation: float): ScriptObject;
    attachToObject(handle: ScriptObject, xOffset: float, yOffset: float, zOffset: float, xRotation: float, yRotation: float, zRotation: float): ScriptObject;
    /** Smashes the object to pieces
    *
    * https://library.sannybuilder.com/#/sa?q=BREAK_OBJECT [0723]*/
    break(intensity: int): ScriptObject;
    /** Clears the object's last damaging weapon ID
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_OBJECT_LAST_WEAPON_DAMAGE [0900]*/
    clearLastWeaponDamage(): ScriptObject;
    /** Sets which LOD object should show when the object is being viewed from far away
    *
    * https://library.sannybuilder.com/#/sa?q=CONNECT_LODS [0827]*/
    connectLods(lodObject: ScriptObject): ScriptObject;
    createRenderObjectToObject(modelId: int, x: float, y: float, z: float, rx: float, ry: float, rz: float): int;
    createRenderObjectToObjectFromSpecial(specialModel: int, x: float, y: float, z: float, rx: float, ry: float, rz: float): int;
    /** Destroys the object, freeing game memory
    *
    * https://library.sannybuilder.com/#/sa?q=DELETE_OBJECT [0108]*/
    delete(): void;
    detach(x: float, y: float, z: float, collisionDetection: boolean): ScriptObject;
    /** Returns true if the object's model is the model specified
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_OBJECT_HAVE_THIS_MODEL [09CC]*/
    doesHaveThisModel(modelId: int): boolean;
    /** Removes the object from the mission cleanup list, preventing it from being deleted when the mission ends
    *
    * https://library.sannybuilder.com/#/sa?q=DONT_REMOVE_OBJECT [01C7]*/
    dontRemove(): ScriptObject;
    /** Sets whether the object attracts spawned peds to interact with it
    *
    * https://library.sannybuilder.com/#/sa?q=ENABLE_DISABLED_ATTRACTORS_ON_OBJECT [0A0A]*/
    enableDisabledAttractors(state: boolean): ScriptObject;
    /** Sets whether the object's position remains unchanged
    *
    * https://library.sannybuilder.com/#/sa?q=FREEZE_OBJECT_POSITION [0550]*/
    freezePosition(state: boolean): ScriptObject;
    /** Gets the current progress of the object's animation
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OBJECT_ANIM_CURRENT_TIME [0839]*/
    getAnimCurrentTime(animationName: string): float;
    /** Returns the object's coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OBJECT_COORDINATES [01BB]*/
    getCoordinates(): {
        x: float;
        y: float;
        z: float;
    };
    /** Gets the distance between the object model's center of mass to its base
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OBJECT_CENTRE_OF_MASS_TO_BASE_OF_MODEL [0E71]*/
    getDistanceFromCenterOfMassToBaseOfModel(): float;
    /** Gets extended var value for this char. Returns false if not initialized (0E1A)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_EXTENDED_OBJECT_VAR [0E1C]*/
    getExtendedVar(identifier: string, varNumber: int): int | undefined;
    /** Returns the object's heading (z-angle)
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OBJECT_HEADING [0176]*/
    getHeading(): float;
    getHealth(): int;
    getLevelDesignCoords(nth: int): {
        x: float;
        y: float;
        z: float;
    };
    /** Returns the object's mass
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OBJECT_MASS [0907]*/
    getMass(): float;
    /** Returns the object's model index
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OBJECT_MODEL [0984]*/
    getModel(): int;
    /** Returns the object's coordinates with an offset
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OFFSET_FROM_OBJECT_IN_WORLD_COORDS [0400]*/
    getOffsetInWorldCoords(xOffset: float, yOffset: float, zOffset: float): {
        x: float;
        y: float;
        z: float;
    };
    /** Returns the specified object's damage proofs
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OBJECT_PROOFS [0EAE]*/
    getProofs(): {
        bullet: boolean;
        fire: boolean;
        explosion: boolean;
        collision: boolean;
        melee: boolean;
    };
    /** Gets the object's quaternion
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OBJECT_QUATERNION [07C3]*/
    getQuaternion(): {
        x: float;
        y: float;
        z: float;
        w: float;
    };
    /** Returns the randomSeed of the specified object
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OBJECT_RANDOM_SEED [0ECA]*/
    getRandomSeed(): int;
    getRopeHeight(): float;
    getRotationVelocity(): {
        x: float;
        y: float;
        z: float;
    };
    /** Returns the SAMP ID of an object using its handle
    *
    * https://library.sannybuilder.com/#/sa?q=SAMP_GET_OBJECT_ID [0B52]*/
    getSampId(): int | undefined;
    /** Gets the speed of the object
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OBJECT_SPEED [05A8]*/
    getSpeed(): float;
    /** Returns the object's turn mass
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OBJECT_TURN_MASS [0909]*/
    getTurnMass(): float;
    /** Returns the object's X, Y, and Z velocity
    *
    * https://library.sannybuilder.com/#/sa?q=GET_OBJECT_VELOCITY [059F]*/
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
    * https://library.sannybuilder.com/#/sa?q=HAS_OBJECT_BEEN_DAMAGED [0366]*/
    hasBeenDamaged(): boolean;
    /** Returns true if the object has been damaged by the specified weapon or damage type
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_OBJECT_BEEN_DAMAGED_BY_WEAPON [08FF]*/
    hasBeenDamagedByWeapon(weaponType: int): boolean;
    /** Returns true if the object has been photographed
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_OBJECT_BEEN_PHOTOGRAPHED [0833]*/
    hasBeenPhotographed(): boolean;
    /** Returns true if the object has been made moveable by the 0392
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_OBJECT_BEEN_UPROOTED [095B]*/
    hasBeenUprooted(): boolean;
    /** Returns true if the object has collided
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_OBJECT_COLLIDED_WITH_ANYTHING [04DA]*/
    hasCollidedWithAnything(): boolean;
    /** Inits additional variables for this object. Identifier can be "AUTO" for unique ID based on script pointer
    *
    * https://library.sannybuilder.com/#/sa?q=INIT_EXTENDED_OBJECT_VARS [0E1A]*/
    initExtendedVars(identifier: string, totalVars: int): boolean;
    isAttached(): boolean;
    isInAngledArea2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, angle: float, drawSphere: boolean): boolean;
    isInAngledArea3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, angle: float, drawSphere: boolean): boolean;
    /** Returns true if object is in the specified area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_OBJECT_IN_AREA_2D [04E9]*/
    isInArea2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, drawSphere: boolean): boolean;
    /** Returns true if the object is in the specified area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_OBJECT_IN_AREA_3D [04EA]*/
    isInArea3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, drawSphere: boolean): boolean;
    /** Returns true if the object is in water
    *
    * https://library.sannybuilder.com/#/sa?q=IS_OBJECT_IN_WATER [04E7]*/
    isInWater(): boolean;
    /** Appears to return true if something had entered the object's position since it was created or its position was changed
    *
    * https://library.sannybuilder.com/#/sa?q=IS_OBJECT_INTERSECTING_WORLD [09FC]*/
    isIntersectingWorld(): boolean;
    /** Returns true if the object is visible
    *
    * https://library.sannybuilder.com/#/sa?q=IS_OBJECT_ON_SCREEN [02CC]*/
    isOnScreen(): boolean;
    /** Returns true if the object is playing the specified animation
    *
    * https://library.sannybuilder.com/#/sa?q=IS_OBJECT_PLAYING_ANIM [0837]*/
    isPlayingAnim(animationName: string): boolean;
    /** Returns True if the specified object is not on a solid surface and not submerged
    *
    * https://library.sannybuilder.com/#/sa?q=IS_OBJECT_REALLY_IN_AIR [0E94]*/
    isReallyInAir(): boolean;
    /** Returns true if the specified object is controlled by a script
    *
    * https://library.sannybuilder.com/#/sa?q=IS_OBJECT_SCRIPT_CONTROLLED [0E0C]*/
    isScriptControlled(): boolean;
    /** Returns true if the object is not moving
    *
    * https://library.sannybuilder.com/#/sa?q=IS_OBJECT_STATIC [05A3]*/
    isStatic(): boolean;
    /** Returns true if the object is within the external script trigger radius
    *
    * https://library.sannybuilder.com/#/sa?q=IS_OBJECT_WITHIN_BRAIN_ACTIVATION_RANGE [0977]*/
    isWithinBrainActivationRange(): boolean;
    /** Returns true if the object is near the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_OBJECT_2D [04E5]*/
    locate2D(x: float, y: float, xRadius: float, yRadius: float, drawSphere: boolean): boolean;
    /** Returns true if the object is near the specified point
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_OBJECT_3D [04E6]*/
    locate3D(x: float, y: float, z: float, xRadius: float, yRadius: float, zRadius: float, drawSphere: boolean): boolean;
    /** Returns True if the object is within the radius of the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_OBJECT_DISTANCE_TO_COORDINATES [0EEC]*/
    locateDistanceToCoordinates(x: float, y: float, z: float, radius: float): boolean;
    /** Returns True if the object(self) is within the radius of the specified object
    *
    * https://library.sannybuilder.com/#/sa?q=LOCATE_OBJECT_DISTANCE_TO_OBJECT [0EE9]*/
    locateDistanceToObject(object: ScriptObject, radius: float): boolean;
    /** Sets whether the door object is locked at its current rotation and allows it to be pushed open by entities once
    *
    * https://library.sannybuilder.com/#/sa?q=LOCK_DOOR [0905]*/
    lockDoor(state: boolean): ScriptObject;
    /** Sets whether the object can be targeted (auto-aimed) or not
    *
    * https://library.sannybuilder.com/#/sa?q=MAKE_OBJECT_TARGETTABLE [035D]*/
    makeTargetable(state: boolean): ScriptObject;
    /** marks object as script controlled
    *
    * https://library.sannybuilder.com/#/sa?q=MARK_OBJECT_AS_NEEDED [0E0D]*/
    markAsNeeded(): ScriptObject;
    /** Allows the object to be deleted by the game if necessary, and also removes it from the mission cleanup list, if applicable
    *
    * https://library.sannybuilder.com/#/sa?q=MARK_OBJECT_AS_NO_LONGER_NEEDED [01C4]*/
    markAsNoLongerNeeded(): ScriptObject;
    /** Places the object at an offset from the car
    *
    * https://library.sannybuilder.com/#/sa?q=PLACE_OBJECT_RELATIVE_TO_CAR [035C]*/
    placeRelativeToCar(vehicle: Car, xOffset: float, yOffset: float, zOffset: float): ScriptObject;
    /** Plays an object animation
    *
    * https://library.sannybuilder.com/#/sa?q=PLAY_OBJECT_ANIM [075A]*/
    playAnim(animationName: string, animationFile: string, frameDelta: float, lockF: boolean, loop: boolean): ScriptObject;
    releaseEntityFromRope(): ScriptObject;
    /** Fades the object out of existence, freeing game memory
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_OBJECT_ELEGANTLY [09A2]*/
    removeElegantly(): void;
    /** Rotates the object from one angle to another, optionally accounting for a collision during the rotation
    *
    * https://library.sannybuilder.com/#/sa?q=ROTATE_OBJECT [034D]*/
    rotate(fromAngle: float, toAngle: float, collisionCheck: boolean): boolean;
    /** Sets the progress of an animation, with 0
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_ANIM_CURRENT_TIME [083A]*/
    setAnimCurrentTime(animationName: string, time: float): ScriptObject;
    /** Sets the object's animation speed
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_ANIM_SPEED [0836]*/
    setAnimSpeed(animationName: string, speed: float): ScriptObject;
    /** Sets the visibility of the object to the specified interior
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_AREA_VISIBLE [0566]*/
    setAreaVisible(areaId: int): ScriptObject;
    /** Sets whether the object can be picked up and carried
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_AS_STEALABLE [08E9]*/
    setAsStealable(state: boolean): ScriptObject;
    /** Sets the object's collision detection
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_COLLISION [0382]*/
    setCollision(state: boolean): ScriptObject;
    /** Sets whether the object can be destroyed or not
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_COLLISION_DAMAGE_EFFECT [07F7]*/
    setCollisionDamageEffect(state: boolean): ScriptObject;
    /** Puts the object at the specified location
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_COORDINATES [01BC]*/
    setCoordinates(x: float, y: float, z: float): ScriptObject;
    /** Sets the object's coordinates without affecting the rotation
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_COORDINATES_AND_VELOCITY [0815]*/
    setCoordinatesAndVelocity(x: float, y: float, z: float): ScriptObject;
    /** Sets the specified object to always draw on top of other objects
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_DRAW_LAST [0418]*/
    setDrawLast(state: boolean): ScriptObject;
    /** Defines whether or not the object is moveable
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_DYNAMIC [0392]*/
    setDynamic(state: boolean): ScriptObject;
    /** Sets extended var value for this object. Requires initialization (0E1A), otherwise returns false
    *
    * https://library.sannybuilder.com/#/sa?q=SET_EXTENDED_OBJECT_VAR [0E1B]*/
    setExtendedVar(identifier: string, varNumber: int, value: int): boolean;
    /** Sets the object's heading (z-angle)
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_HEADING [0177]*/
    setHeading(heading: float): ScriptObject;
    setHealth(health: int): ScriptObject;
    /** Sets the object's mass
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_MASS [0906]*/
    setMass(mass: float): ScriptObject;
    /** Set's the specified object's transparency alpha
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_MODEL_ALPHA [0D11]*/
    setModelAlpha(alpha: int): ScriptObject;
    /** Makes the object damageable only by the player
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_ONLY_DAMAGED_BY_PLAYER [0875]*/
    setOnlyDamagedByPlayer(state: boolean): ScriptObject;
    /** Sets what immunities the object has
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_PROOFS [09CA]*/
    setProofs(bulletProof: boolean, fireProof: boolean, explosionProof: boolean, collisionProof: boolean, meleeProof: boolean): ScriptObject;
    /** Sets the object's quaternion
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_QUATERNION [07C4]*/
    setQuaternion(x: float, y: float, z: float, w: float): ScriptObject;
    /** Enables the use of collision checking for the object
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_RECORDS_COLLISIONS [04D9]*/
    setRecordsCollisions(state: boolean): ScriptObject;
    /** Makes the object look like it has been burnt
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_RENDER_SCORCHED [0654]*/
    setRenderScorched(state: boolean): ScriptObject;
    setRopeHeight(height: float): ScriptObject;
    /** Sets the object rotation along X, Y and Z axis
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_ROTATION [0453]*/
    setRotation(x: float, y: float, z: float): ScriptObject;
    /** Sets the object's rotation velocity with frame sync applied?
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_ROTATION_VELOCITY [05A2]*/
    setRotationVelocity(x: float, y: float, z: float): ScriptObject;
    /** Sets the scale of the object
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_SCALE [08D2]*/
    setScale(scale: float): ScriptObject;
    /** Sets the object's turn mass
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_TURN_MASS [0908]*/
    setTurnMass(turnMass: float): ScriptObject;
    /** Sets the object's velocity
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_VELOCITY [0381]*/
    setVelocity(xSpeed: float, ySpeed: float, zSpeed: float): ScriptObject;
    /** Sets whether the object is visible
    *
    * https://library.sannybuilder.com/#/sa?q=SET_OBJECT_VISIBLE [0750]*/
    setVisible(state: boolean): ScriptObject;
    /** Simulates the specified damage amount and weaponType on the object
    *
    * https://library.sannybuilder.com/#/sa?q=SIMULATE_OBJECT_DAMAGE [0E95]*/
    simulateDamage(damage: float, weaponType: int): ScriptObject;
    /** Returns true if the object has finished moving
    *
    * https://library.sannybuilder.com/#/sa?q=SLIDE_OBJECT [034E]*/
    slide(fromX: float, fromY: float, fromZ: float, xSpeed: float, ySpeed: float, zSpeed: float, collisionCheck: boolean): boolean;
    /** Makes the specified car have no collision with the specified object
    *
    * https://library.sannybuilder.com/#/sa?q=SORT_OUT_OBJECT_COLLISION_WITH_CAR [050E]*/
    sortOutCollisionWithCar(handle: Car): ScriptObject;
    /** Sets whether the object can be picked up with the magnocrane
    *
    * https://library.sannybuilder.com/#/sa?q=WINCH_CAN_PICK_OBJECT_UP [0916]*/
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
    * https://library.sannybuilder.com/#/sa?q=CREATE_SEARCHLIGHT_ON_VEHICLE [06C1]*/
    static CreateOnVehicle(vehicle: Car, xOffset: float, yOffset: float, zOffset: float, xPoint: float, yPoint: float, zPoint: float, pointRadius: float, radius: float): Searchlight;
    /** Returns true if the handle is a valid searchlight handle
    *
    * https://library.sannybuilder.com/#/sa?q=DOES_SEARCHLIGHT_EXIST [06B3]*/
    static DoesExist(handle: int): boolean;
    /** Attaches the searchlight to the specified objects
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_SEARCHLIGHT_TO_SEARCHLIGHT_OBJECT [06CA]*/
    attachToObject(spotTower: ScriptObject, spotHousing: ScriptObject, spotBulb: ScriptObject, xOffset: float, yOffset: float, zOffset: float): Searchlight;
    delete(): void;
    /** Returns true if the searchlight has spotted the char
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CHAR_IN_SEARCHLIGHT [06B7]*/
    isCharIn(handle: Char): boolean;
    /** Returns true if the searchlights light is on the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=IS_VEHICLE_IN_SEARCHLIGHT [06C0]*/
    isVehicleIn(handle: Car): boolean;
    /** Makes the specified searchlight travel between the two specified points with the specified speed
    *
    * https://library.sannybuilder.com/#/sa?q=MOVE_SEARCHLIGHT_BETWEEN_COORDS [06B4]*/
    moveBetweenCoords(fromX: float, fromY: float, fromZ: float, toX: float, toY: float, toZ: float, speed: float): Searchlight;
    /** Makes the searchlight follow the specified char
    *
    * https://library.sannybuilder.com/#/sa?q=POINT_SEARCHLIGHT_AT_CHAR [06B6]*/
    pointAtChar(handle: Char, speed: float): Searchlight;
    /** Makes the searchlight target move/travel to the specified coords
    *
    * https://library.sannybuilder.com/#/sa?q=POINT_SEARCHLIGHT_AT_COORD [06B5]*/
    pointAtCoord(x: float, y: float, z: float, speed: float): Searchlight;
    pointAtVehicle(handle: Car, speed: float): Searchlight;
    setClipIfColliding(state: boolean): Searchlight;
    /** Sets whether the searchlight shows a shadow effect on the surface it hits
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_ON_GROUND_SEARCHLIGHT [0A02]*/
    switchOnGround(state: boolean): Searchlight;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Sequence */
declare class Sequence {
    constructor(handle: number);
    /** Begins a sequence of up to 8 tasks
    *
    * https://library.sannybuilder.com/#/sa?q=OPEN_SEQUENCE_TASK [0615]*/
    static Open(): Sequence;
    /** Clears the task sequence
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_SEQUENCE_TASK [061B]*/
    clear(): void;
    /** Ends the task sequence
    *
    * https://library.sannybuilder.com/#/sa?q=CLOSE_SEQUENCE_TASK [0616]*/
    close(): Sequence;
    /** Sets whether the task sequence repeats continuously
    *
    * https://library.sannybuilder.com/#/sa?q=SET_SEQUENCE_TO_REPEAT [0643]*/
    setToRepeat(state: boolean): Sequence;
}
/** Class Sf
 * 
 * https://library.sannybuilder.com/#/sa/classes/Sf */
interface Sf {
    /** Returns the radian arccosine of the specified ratio
    *
    * https://library.sannybuilder.com/#/sa?q=SF_ACOS [0C06]*/
    ACos(ratio: float): float;
    /** Returns the radian arcsine of the specified ratio
    *
    * https://library.sannybuilder.com/#/sa?q=SF_ASIN [0C04]*/
    ASin(ratio: float): float;
    /** Returns the radian arctangent of the specified ratio
    *
    * https://library.sannybuilder.com/#/sa?q=SF_ATAN [0C08]*/
    ATan(ratio: float): float;
    /** Returns the absolute value of a number (float or integer)
    *
    * https://library.sannybuilder.com/#/sa?q=SF_ABS [0C00]*/
    Abs(number: int): int;
    /** Converts an ANSI string to Unicode string then stores it to ansiStringBuffer
    *
    * https://library.sannybuilder.com/#/sa?q=SF_ANSI_TO_UNICODE [0C69]*/
    AnsiToUnicode(ansiString: string, unicodeStringBuffer: int, buffersize: int): boolean;
    /** mixes color channels into 0xAARRGGBB colorcode format
    *
    * https://library.sannybuilder.com/#/sa?q=SF_ARGB_TO_HEX [0B67]*/
    ArgbToHex(alpha: int, red: int, green: int, blue: int): int;
    /** Converts an ascii string into a floating point number
    *
    * https://library.sannybuilder.com/#/sa?q=SF_ATOF [0C1B]*/
    AtoF(ascii: string): float;
    /** Converts an ascii string into a decimal integer
    *
    * https://library.sannybuilder.com/#/sa?q=SF_ATOI [0C1A]*/
    AtoI(ascii: string): int;
    /** Converts the basis vectors of a rotation matrix into quaternion values
    *
    * https://library.sannybuilder.com/#/sa?q=SF_AXES_TO_QUAT [0C32]*/
    AxesToQuat(pitchVectorX: float, pitchVectorY: float, pitchVectorZ: float, rollVectorX: float, rollVectorY: float, rollVectorZ: float, yawVectorX: float, yawVectorY: float, yawVectorZ: float): {
        quaternionW: float;
        quaternionX: float;
        quaternionY: float;
        quaternionZ: float;
    };
    /** Converts binary text to hexadecimal text and stores at stringBuffer. Can be used as a condition which evaluates as logical false if the bufferSize is not enough to contain the converted hexadecimal text
    *
    * https://library.sannybuilder.com/#/sa?q=SF_BIN_TO_HEX [0C22]*/
    BintoHex(binaryString: string, stringBuffer: string, bufferSize: int): boolean;
    /** Returns the rounded-up result the specified number
    *
    * https://library.sannybuilder.com/#/sa?q=SF_CEIL [0C0A]*/
    Ceil(number: float): float;
    /** Copies raw binary or text from the clipboard to buffer
    *
    * https://library.sannybuilder.com/#/sa?q=SF_READ_DATA_FROM_CLIPBOARD [0C8E]*/
    ClipboardReadData(buffer: int, size: int): boolean;
    /** Sets the text on the clipboard
    *
    * https://library.sannybuilder.com/#/sa?q=SF_WRITE_TEXT_TO_CLIPBOARD [0C8D]*/
    ClipboardWriteText(text: string): void;
    /** Marks the end of a command callback. Used as its returning statement
    *
    * https://library.sannybuilder.com/#/sa?q=SF_COMMAND_RETURN [0B43]*/
    CmdRet(): void;
    /** Returns the cosine of the specified radians
    *
    * https://library.sannybuilder.com/#/sa?q=SF_COS [0C05]*/
    Cos(radians: float): float;
    /** Converts degrees to radians
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DEGREES_TO_RADIANS [0C02]*/
    DegToRad(degrees: float): float;
    /** Returns the rounded-down result the specified number
    *
    * https://library.sannybuilder.com/#/sa?q=SF_FLOOR [0C0B]*/
    Floor(number: float): float;
    /** Converts window screen coordinates (pixels) to world's 3D coordinates with the specified depth
    *
    * https://library.sannybuilder.com/#/sa?q=SF_WINDOW_SCREEN_COORDS_TO_WORLD_COORDS [0B8F]*/
    From2DTo3DCoords(screenCoordX: int, screenCoordY: int, depth: float): {
        worldCoordX: float;
        worldCoordY: float;
        worldCoordZ: float;
    };
    /** Converts 3D coordinates from the world into window screen coordinates (pixels)
    *
    * https://library.sannybuilder.com/#/sa?q=SF_WORLD_COORDS_TO_WINDOW_SCREEN_COORDS [0B55]*/
    From3DTo2DCoords(worldCoordX: float, worldCoordY: float, worldCoordZ: float): {
        screenCoordX: int;
        screenCoordY: int;
    } | undefined;
    /** Returns the WindowScreen Coordinates counterpart of the specified GameScreen Coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=SF_GAME_SCREEN_COORDS_TO_WINDOW_SCREEN_COORDS [0B60]*/
    FromGameToWindowScreenCoords(gameScreenCoordX: float, gameScreenCoordY: float): {
        windowScreenCoordX: int;
        windowScreenCoordY: int;
    };
    /** Returns the GameScreen Coordinates counterpart of the specified WindowScreen Coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=SF_WINDOW_SCREEN_COORDS_TO_GAME_SCREEN_COORDS [0B5F]*/
    FromWindowToGameScreenCoords(windowScreenCoordX: int, windowScreenCoordY: int): {
        gameScreenCoordX: float;
        gameScreenCoordY: float;
    };
    /** Returns the installed version of CLEO
    *
    * https://library.sannybuilder.com/#/sa?q=SF_GET_CLEO_LIBRARY_VERSION [0C92]*/
    GetCleoLibVer(): int;
    /** Returns a pointer to a string containing the parameters of the last command entered at console or SAMP Chat
    *
    * https://library.sannybuilder.com/#/sa?q=SF_GET_PARAMS_OF_LAST_TRIGGERED_COMMAND [0B35]*/
    GetCmdParams(): int | undefined;
    /** Returns the mouse cursor's window screen coordinates in pixels
    *
    * https://library.sannybuilder.com/#/sa?q=SF_GET_CURSOR_COORD [0B5E]*/
    GetCursorCoord(): {
        windowScreenCoordX: int;
        windowScreenCoordY: int;
    };
    /** Returns a pointer to the element of an array of sized buffers using its element index
    *
    * https://library.sannybuilder.com/#/sa?q=SF_GET_ELEMENT_POINTER_OF_BUFFER_ARRAY [0C1F]*/
    GetElementPointerOfBufferArray(array: int, index: int, size: int): int;
    /** Returns the handle of a loaded module with name (moduleName)
    *
    * https://library.sannybuilder.com/#/sa?q=SF_GET_LOADED_MODULE [0C70]*/
    GetModule(moduleName: string): int | undefined;
    /** Returns a pointer (functionPtr) to specified functionName inside the moduleHandle
    *
    * https://library.sannybuilder.com/#/sa?q=SF_GET_MODULE_PROCEDURE [0C71]*/
    GetModuleProc(moduleHandle: int, functionName: string): int | undefined;
    /** Stores the contents of the specified Windows variable (or environment variable) name to buffer
    *
    * https://library.sannybuilder.com/#/sa?q=SF_STORE_OS_ENVIRONMENT_VARIABLE [0C67]*/
    GetOsEnv(varName: string, stringBuffer: string, buffersize: int): boolean;
    /** Returns the current window screen resolution in pixels
    *
    * https://library.sannybuilder.com/#/sa?q=SF_GET_SCREEN_RESOLUTION [0B5A]*/
    GetScreenRes(): {
        width: int;
        height: int;
    };
    /** Returns the OS's current uptime in milliseconds. Recommended substitute for TIMERA and TIMERB when requiring precise timing operations
    *
    * https://library.sannybuilder.com/#/sa?q=SF_GET_TICK_COUNT [0BFE]*/
    GetTickCount(): int;
    /** Splits 0xAARRGGBB colorcode format into individial color channels
    *
    * https://library.sannybuilder.com/#/sa?q=SF_HEX_TO_ARGB [0B66]*/
    HexToArgb(color: int): {
        alpha: int;
        red: int;
        green: int;
        blue: int;
    };
    /** Converts hexadecimal text to binary text and stores at stringBuffer. Can be used as a condition which evaluates as logical false if the bufferSize is not enough to contain the converted binary text
    *
    * https://library.sannybuilder.com/#/sa?q=SF_HEX_TO_BIN [0C23]*/
    HextoBin(hexString: string, stringBuffer: string, bufferSize: int): boolean;
    /** Converts a baseN integer into an ascii string then stores it to stringBuffer
    *
    * https://library.sannybuilder.com/#/sa?q=SF_ITOA [0C1C]*/
    ItoA(integer: int, radix: int): string;
    /** Evaluates as logical true if the specified virtual keyCode has been pressed just now
    *
    * https://library.sannybuilder.com/#/sa?q=SF_KEY_JUST_PRESSED [0C89]*/
    KeyJustPressed(keyCode: int): boolean;
    /** Makes the script where this command is executed invisible across other scripts
    *
    * https://library.sannybuilder.com/#/sa?q=SF_MAKE_SCRIPT_PRIVATE [1337]*/
    MakeScriptPrivate(isPrivate: int): void;
    /** Converts the quaternion values into basis vectors of a rotation matrix
    *
    * https://library.sannybuilder.com/#/sa?q=SF_QUAT_TO_AXES [0C33]*/
    MathQuatToMatrixVectors(quaternionW: float, quaternionX: float, quaternionY: float, pitchVectorZ: float): {
        pitchVectorX: float;
        pitchVectorY: float;
        pitchVectorZ: float;
        rollVectorX: float;
        rollVectorY: float;
        rollVectorZ: float;
        yawVectorX: float;
        yawVectorY: float;
        yawVectorZ: float;
    };
    /** Converts a matrix structure into a quaternion structure stored at quaternionBuffer
    *
    * https://library.sannybuilder.com/#/sa?q=SF_MATRIX_TO_QUAT [0C30]*/
    MatrixToQuat(matrix: int): int;
    /** Copies a memory block with size from source address to destination address
    *
    * https://library.sannybuilder.com/#/sa?q=SF_MEMCPY [0C10]*/
    MemCpy(destination: int, source: int, size: int): boolean;
    /** Evaluates as logical true if both memory blocks have the same content
    *
    * https://library.sannybuilder.com/#/sa?q=SF_MEMEQ [0C12]*/
    MemEq(addressA: int, addressB: int, size: int): boolean;
    /** Fills a sized memory block with value byte-by-byte
    *
    * https://library.sannybuilder.com/#/sa?q=SF_MEMFILL [0C11]*/
    MemFill(address: int, byteValue: int, size: int): boolean;
    /** Sets the specified script's isActive parameter to 0
    *
    * https://library.sannybuilder.com/#/sa?q=SF_PAUSE_SCRIPT [0BDE]*/
    PauseScript(scriptId: int): void;
    /** Restores all previously saved local variables by SF_PUSH_LOCAL_VARIABLES to the local variables of the currently executing script (Main Script or a Function)
    *
    * https://library.sannybuilder.com/#/sa?q=SF_POP_LOCAL_VARIABLES [0BFB]*/
    PopLocalVars(): void;
    /** Raises a number to the specified power
    *
    * https://library.sannybuilder.com/#/sa?q=SF_POW [0C09]*/
    Pow(coefficient: float, exponent: float): float;
    /** Checks for collisions using flags from the start of the vector to its end
    *
    * https://library.sannybuilder.com/#/sa?q=SF_PROCESS_LINE_OF_SIGHT [0BFF]*/
    ProcessLineOfSight(fromCoordX: float, fromCoordY: float, fromCoordZ: float, toCoordX: float, toCoordY: float, toCoordZ: float, checkBuildings: boolean, checkCars: boolean, checkChars: boolean, checkObjects: boolean, checkParticles: boolean, seeThrough: boolean, ignoreCameras: boolean): {
        colPointPtr: int;
        entityPtr: int;
    } | undefined;
    /** Saves the values of all local variables from the currently executing script (Main Script or a Function) to a separate memory that can be recovered later on by SF_POP_LOCAL_VARIABLES
    *
    * https://library.sannybuilder.com/#/sa?q=SF_PUSH_LOCAL_VARIABLES [0BFA]*/
    PushLocalVars(): void;
    /** Converts a quaternion structure into a matrix structure stored at matrixBuffer
    *
    * https://library.sannybuilder.com/#/sa?q=SF_QUAT_TO_MATRIX [0C31]*/
    QuatToMatrix(quaternion: int): int;
    /** Converts radians to degrees
    *
    * https://library.sannybuilder.com/#/sa?q=SF_RADIANS_TO_DEGREES [0C01]*/
    RadToDeg(radians: float): float;
    /** Reads the value from the specified element index of an array
    *
    * https://library.sannybuilder.com/#/sa?q=SF_READ_ELEMENT_OF_4BYTES_ARRAY [0C0E]*/
    ReadElementOf4BytesArray(array: int, index: int): int | undefined;
    /** Reads the value of the sized array's element at index. The size per element is constrained between 1 to 4
    *
    * https://library.sannybuilder.com/#/sa?q=SF_READ_ELEMENT_OF_SIZED_ARRAY [0C1D]*/
    ReadElementOfSizedArray(array: int, index: int, size: int): int | undefined;
    /** Reads the value with size from memory address with offset
    *
    * https://library.sannybuilder.com/#/sa?q=SF_READ_MEMORY_WITH_OFFSET [0C0C]*/
    ReadMemoryWithOffset(address: int, offset: int, size: int): int | undefined;
    /** Sets the specified script's isActive parameter to 1
    *
    * https://library.sannybuilder.com/#/sa?q=SF_RESUME_SCRIPT [0BDF]*/
    ResumeScript(scriptId: int): void;
    /** Sets the press status of a game (NOT keyboard) key
    *
    * https://library.sannybuilder.com/#/sa?q=SF_SET_BUTTON [0B56]*/
    SetButton(buttonId: int, behaviorValue: int): void;
    /** Sets whether a specific virtual key represented in ascii character format is pressed or not
    *
    * https://library.sannybuilder.com/#/sa?q=SF_SET_CHARACTER_KEY_STATUS [0C73]*/
    SetCharKeyStatus(ascii: int, isPressed: boolean): void;
    /** Sets whether a specific virtual key code is pressed or not
    *
    * https://library.sannybuilder.com/#/sa?q=SF_SET_KEY_STATUS [0C72]*/
    SetKeyStatus(keyCode: int, isPressed: boolean): void;
    /** Returns the sine of the specified radians
    *
    * https://library.sannybuilder.com/#/sa?q=SF_SIN [0C03]*/
    Sin(radians: float): float;
    /** Appends the appendedString at the end of the string found at the stringBuffer
    *
    * https://library.sannybuilder.com/#/sa?q=SF_STRCAT [0C15]*/
    StrCat(stringBuffer: string, appendedString: string): void;
    /** Returns a pointer to the first occurence of the specified ascii character in the source string
    *
    * https://library.sannybuilder.com/#/sa?q=SF_STRCHR [0C2A]*/
    StrChr(source: string, character: int): int | undefined;
    /** Copies the string from source to destination
    *
    * https://library.sannybuilder.com/#/sa?q=SF_STRCPY [0C13]*/
    StrCpy(destination: string, source: string): void;
    /** Searches the string for any matching characters at the characterList. Returns the character index of the first occurence from the string and evaluates as logical true if used as a condition. Returns the length of the string if nothing matched the characterSet
    *
    * https://library.sannybuilder.com/#/sa?q=SF_STRCSPN [0C19]*/
    StrCspn(source: string, characterList: string): int | undefined;
    /** Evaluates as logical true if both case-sensitive strings are equal
    *
    * https://library.sannybuilder.com/#/sa?q=SF_STREQ [0C14]*/
    StrEq(stringA: string, stringB: string): boolean;
    /** Returns the length of a string
    *
    * https://library.sannybuilder.com/#/sa?q=SF_STRLEN [0C17]*/
    StrLen(string: string): int;
    /** Converts all letters of the source's string into non-capital letters stored at destination
    *
    * https://library.sannybuilder.com/#/sa?q=SF_STRLWR [0C28]*/
    StrLwr(source: string): string;
    /** Searches the source's string for any matching characters at the characterList. Returns a pointer to the first occurence from the source's string and evaluates as logical true if used as a condition
    *
    * https://library.sannybuilder.com/#/sa?q=SF_STRPBRK [0C2B]*/
    StrPBrk(source: string, characterList: string): string | undefined;
    /** Stores a pointer to the specified string into the var
    *
    * https://library.sannybuilder.com/#/sa?q=SF_STRING_POINTER [0C3A]*/
    StrPtr(var: int, string: string, ...unused: number[]): void;
    /** Returns a pointer to the last occurence of the specified ascii character in the source string
    *
    * https://library.sannybuilder.com/#/sa?q=SF_STRRCHR [0C2C]*/
    StrRChr(source: string, character: int): string | undefined;
    /** Reverses the source's string, changing the positions of characters, then stores it to the destination
    *
    * https://library.sannybuilder.com/#/sa?q=SF_STRREV [0C2D]*/
    StrRev(source: string): string;
    /** Searches the source's string then returns the index of the first character that does not match any of the specified characters in the characterList and evaluates as logical true if used as a condition. Returns the length of the string if all characters matches any characters at the characterList
    *
    * https://library.sannybuilder.com/#/sa?q=SF_STRSPN [0C2E]*/
    StrSpn(source: string, characterList: string): int | undefined;
    /** Returns a pointer to the first occurence of a specified substring in the source string
    *
    * https://library.sannybuilder.com/#/sa?q=SF_STRSTR [0C18]*/
    StrStr(source: string, subString: string): string | undefined;
    /** Searches the stringBuffer for any delimiters then replaces the first hit with a NULL terminator (0x00). Returns the (token) pointer next to the first hit. Can be used as a condition which evaluates as logical false if none of the delimiters were found at the string
    *
    * https://library.sannybuilder.com/#/sa?q=SF_STRTOK [0C16]*/
    StrTok(stringBuffer: string, delimiters: string): string | undefined;
    /** Ignores any whitespace at the beginning of the source's string, converting the next characters into a baseN longInteger. The scanning stops when it comes across the first non-integer character, stores its pointer to unscannedAddress
    *
    * https://library.sannybuilder.com/#/sa?q=SF_STRTOL [0C2F]*/
    StrTol(source: int, radix: int): {
        unscannedAddress: int;
        longInteger: int;
    };
    /** Converts all letters of the source's string into CAPITAL LETTERS stored at destination
    *
    * https://library.sannybuilder.com/#/sa?q=SF_STRUPR [0C26]*/
    StrUpr(source: string): string;
    /** Evaluates as logical true if both case-insensitive strings are equal
    *
    * https://library.sannybuilder.com/#/sa?q=SF_STRIEQ [0C21]*/
    StriEq(stringA: string, stringB: string): boolean;
    /** Returns a pointer to the first case-insensitive occurence of the specified substring in the source string
    *
    * https://library.sannybuilder.com/#/sa?q=SF_STRISTR [0C29]*/
    StriStr(source: string, subString: string): string | undefined;
    /** Appends a appendedString safely at the end of the string found at the stringBuffer. The appendedString will be truncated if the overall size is beyond the specified bufferSize
    *
    * https://library.sannybuilder.com/#/sa?q=SF_STRNCAT [0C27]*/
    StrnCat(stringBuffer: string, appendedString: string, bufferSize: int): void;
    /** Copies the string safely from source to stringBuffer. The copied string will be truncated if the occupied size is beyond the specified bufferSize
    *
    * https://library.sannybuilder.com/#/sa?q=SF_STRNCPY [0C24]*/
    StrnCpy(stringBuffer: int, source: int, bufferSize: int): void;
    /** Evaluates as logical true if all characters with length at the beginning of both case-sensitive strings are equal
    *
    * https://library.sannybuilder.com/#/sa?q=SF_STRNEQ [0C25]*/
    StrnEq(stringA: string, stringB: string, length: int): boolean;
    /** Returns the tangent of the specified radians
    *
    * https://library.sannybuilder.com/#/sa?q=SF_TAN [0C07]*/
    Tan(radians: float): float;
    /** Converts a Unicode string to ANSI string then stores it to ansiStringBuffer
    *
    * https://library.sannybuilder.com/#/sa?q=SF_UNICODE_TO_ANSI [0C68]*/
    UnicodeToAnsi(unicodeString: int, ansiStringBuffer: string, bufferSize: int): boolean;
    /** Writes the value to the specified element index of an array
    *
    * https://library.sannybuilder.com/#/sa?q=SF_WRITE_ELEMENT_OF_4BYTES_ARRAY [0C0F]*/
    WriteElementOf4BytesArray(array: int, index: int, value: int): boolean;
    /** Writes the value to the specified element index of a sized array. The size per element is constrained between 1 to 4
    *
    * https://library.sannybuilder.com/#/sa?q=SF_WRITE_ELEMENT_OF_SIZED_ARRAY [0C1E]*/
    WriteElementOfSizedArray(array: int, index: int, size: int, value: int): boolean;
    /** Writes the value with size to memory address with offset
    *
    * https://library.sannybuilder.com/#/sa?q=SF_WRITE_MEMORY_WITH_OFFSET [0C0D]*/
    WriteMemoryWithOffset(address: int, offset: int, size: int, value: int): boolean;
    /** Writes a string at the buffer element of an array of sized buffers using its element index
    *
    * https://library.sannybuilder.com/#/sa?q=SF_WRITE_STRING_TO_ELEMENT_OF_BUFFER_ARRAY [0C20]*/
    WriteStringToElementOfBufferArray(array: int, index: int, size: int, string: string): void;
}
declare var Sf: Sf
/** Class SfConsole
 * 
 * https://library.sannybuilder.com/#/sa/classes/SfConsole */
interface SfConsole {
    /** Executes the specified command in the SAMPFUNCS console
    *
    * https://library.sannybuilder.com/#/sa?q=SF_EXECUTE_CONSOLE_COMMAND [0C62]*/
    ExecCmd(command: string): void;
    /** Returns logical true if the specified console command is registered
    *
    * https://library.sannybuilder.com/#/sa?q=SF_IS_CONSOLE_COMMAND_REGISTERED [0C91]*/
    IsCmdRegistered(command: string): boolean;
    /** Evaluates as logical true if the SAMPFUNCS console is open
    *
    * https://library.sannybuilder.com/#/sa?q=SF_IS_CONSOLE_OPEN [0C7E]*/
    IsOpen(): boolean;
    /** Adds a line to the SAMPFUNCS console and logs it
    *
    * https://library.sannybuilder.com/#/sa?q=SF_LOG_TO_CONSOLE [0B78]*/
    Log(format: string, ...args: number[]): void;
    /** Registers a callback hooked on a SAMPFUNCS console command with maximum length of 64 characters
    *
    * https://library.sannybuilder.com/#/sa?q=SF_REGISTER_CONSOLE_COMMAND [0C63]*/
    RegisterCmd(command: string, callback: int): boolean;
    /** Sets the description for the console command
    *
    * https://library.sannybuilder.com/#/sa?q=SF_SET_CONSOLE_COMMAND_DESCRIPTION [0C80]*/
    SetCmdDesc(command: string, description: string): void;
    /** Removes the specified SAMPFUNCS console command. This command does nothing if the the specified command isn't a registered in the SAMPFUNCS console then evaluates as logical false if used as a condition
    *
    * https://library.sannybuilder.com/#/sa?q=SF_UNREGISTER_CONSOLE_COMMAND [0C64]*/
    UnregisterCmd(command: string): boolean;
}
declare var SfConsole: SfConsole
/** Class SfD3D
 * 
 * https://library.sannybuilder.com/#/sa/classes/SfD3D */
interface SfD3D {
    /** Draws a rectangular area with border at the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=SF_D3D_DRAW_BORDERED_BOX [0B6A]*/
    DrawBorderedBox(coordX: int, coordY: int, width: int, height: int, color: int, borderSize: int, borderColor: int): void;
    /** Draws a rectangular area at the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=SF_D3D_DRAW_BORDERLESS_BOX [0B69]*/
    DrawBorderlessBox(coordX: int, coordY: int, width: int, height: int, color: int): void;
    /** Draws a line between two window screen coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=SF_D3D_DRAW_LINE [0B68]*/
    DrawLine(fromCoordX: int, fromCoordY: int, toCoordX: int, toCoordY: int, tickness: int, color: int): void;
    /** Draws a polygon with the specified parameters
    *
    * https://library.sannybuilder.com/#/sa?q=SF_D3D_DRAW_POLYGON [0B70]*/
    DrawPolygon(coordX: int, coordY: int, width: int, height: int, cornerCount: int, heading: float, color: int): void;
}
declare var SfD3D: SfD3D
/** Class SfD3DFont
 * 
 * https://library.sannybuilder.com/#/sa/classes/SfD3DFont */
interface SfD3DFont {
    /** Creates a D3DFont Object
    *
    * https://library.sannybuilder.com/#/sa?q=SF_D3D_CREATE_FONT [0B6D]*/
    Create(fontName: string, size: int, flags: int): SfD3DFont;
    /** Destroys the specified font object, freeing it from memory
    *
    * https://library.sannybuilder.com/#/sa?q=SF_D3D_DELETE_FONT [0B6E]*/
    delete(): boolean;
    /** Draws text using the specified font
    *
    * https://library.sannybuilder.com/#/sa?q=SF_D3D_DRAW_TEXT_WITH_FONT [0B6F]*/
    drawText(text: string, coordX: int, coordY: int, color: int): void;
    /** Returns the height (in pixels) occupied by any text that uses the specified font
    *
    * https://library.sannybuilder.com/#/sa?q=SF_D3D_GET_FONT_DRAW_HEIGHT [0B6C]*/
    getDrawHeight(): int;
    /** Returns the width (in pixels) that will be occupied by the text with font
    *
    * https://library.sannybuilder.com/#/sa?q=SF_D3D_GET_DRAW_WIDTH_OF_TEXT_WITH_FONT [0B6B]*/
    getDrawWidth(text: string): int;
}
declare var SfD3DFont: SfD3DFont
/** Class SfD3DTexture
 * 
 * https://library.sannybuilder.com/#/sa/classes/SfD3DTexture */
interface SfD3DTexture {
    /** Loads a file (any image, or txd) as D3DTexture Object
    *
    * https://library.sannybuilder.com/#/sa?q=SF_D3D_LOAD_TEXTURE_FROM_FILE [0B71]*/
    Load(filePath: string): SfD3DTexture | undefined;
    /** Loads a texture from a file located in memory buffer
    *
    * https://library.sannybuilder.com/#/sa?q=SF_D3D_LOAD_TEXTURE_FROM_FILE_IN_MEMORY [0C8C]*/
    LoadTextureFromFileMemory(buffer: int, bufferSize: int): SfD3DTexture | undefined;
    /** Draws the texture on the screen
    *
    * https://library.sannybuilder.com/#/sa?q=SF_D3D_DRAW_TEXTURE [0B73]*/
    draw(coordX: int, coordY: int, width: int, height: int, heading: float, contrast: int): void;
    /** Releases the D3DTexture Object, freeing it from memory
    *
    * https://library.sannybuilder.com/#/sa?q=SF_D3D_RELEASE_TEXTURE [0B72]*/
    release(): boolean;
}
declare var SfD3DTexture: SfD3DTexture
/** Class SfDownload
 * 
 * https://library.sannybuilder.com/#/sa/classes/SfDownload */
interface SfDownload {
    /** Downloads a file from the specified url source asynchronosly then saves it to filepath. Returns a handle to this file's SfDownload object for tracking purposes
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DOWNLOAD_FILE [0C65]*/
    File(url: string, filePath: string): SfDownload;
    /** Returns the download status of the SfDownload object
    *
    * https://library.sannybuilder.com/#/sa?q=SF_GET_DOWNLOAD_STATE [0C66]*/
    getState(): int | undefined;
    /** Frees an SfDownload object from memory
    *
    * https://library.sannybuilder.com/#/sa?q=SF_RELEASE_DOWNLOAD [0C7D]*/
    release(): boolean;
}
declare var SfDownload: SfDownload
/** Class SfDxutDialog
 * 
 * https://library.sannybuilder.com/#/sa/classes/SfDxutDialog */
interface SfDxutDialog {
    /** Creates a DXUTDialog Object with Title
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_CREATE_DIALOG [0B80]*/
    Create(title: string): SfDxutDialog;
    /** Adds a button on the DXUTDialog
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_ADD_BUTTON [0B82]*/
    addButton(id: int, text: string, relCoordX: int, relCoordY: int, width: int, height: int): void;
    /** Creates a checkbox on the DxutDialog
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_ADD_CHECKBOX [0B83]*/
    addCheckbox(id: int, text: string, relCoordX: int, relCoordY: int, width: int, height: int): void;
    /** Creates a text input field on a DxutDialog
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_ADD_EDITBOX [0B88]*/
    addEditbox(id: int, initialText: string, coordX: int, coordY: int, width: int, height: int): void;
    /** Creates a listbox on the dialog
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_ADD_LISTBOX [0B99]*/
    addListbox(id: int, relCoordX: int, relCoordY: int, width: int, height: int): void;
    /** Creates a horizontal slider on the DxutDialog
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_ADD_SLIDER [0B96]*/
    addSlider(id: int, relCoordX: int, relCoordY: int, width: int, height: int, maxValue: int): void;
    /** Adds a static text control in the DxutDialog
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_ADD_STATIC_TEXT [0B91]*/
    addStaticText(id: int, text: string, relCoordX: int, relCoordY: int, width: int, height: int): void;
    /** Deletes the DxutDialog and frees the memory allocated for it
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_DELETE [0BA4]*/
    delete(): void;
    /** Removes a DxutDialog's control with ID and frees the memory allocated for it
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_DELETE_CONTROL [0BA3]*/
    deleteControl(id: int): void;
    /** Removes the element found at the specified index from the DxutDialog's listbox with ID
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_DELETE_LISTBOX_ELEMENT [0B9C]*/
    deleteListboxElement(id: int, index: int): boolean;
    /** Evaluates as logical true if the specified DxutDialog exists
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_EXIST [0BAB]*/
    doesExist(): boolean;
    /** Returns the window position of a DxutDialog control
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_GET_COORDS_OF_CONTROL [0BA9]*/
    getControlCoords(id: int): {
        coordX: int;
        coordY: int;
    };
    /** Returns the dimensions of the DxutDialog control with ID
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_GET_DIMS_OF_CONTROL [0BA7]*/
    getControlDims(id: int): {
        width: int;
        height: int;
    };
    /** Returns the text of a control using its ID
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_GET_TEXT_OF_CONTROL [0B89]*/
    getControlText(id: int): int | undefined;
    /** Returns the Coordinates and Dimensions of the DxutDialog
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_GET_COORDS_AND_DIMS [0B85]*/
    getCoordsAndDims(): {
        coordX: int;
        coordY: int;
        width: int;
        height: int;
    };
    /** Returns the text and data associated with the DxutDialog's listbox element by index
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_GET_LISTBOX_ELEMENT [0B9D]*/
    getListboxElement(id: int, index: int): {
        text: string;
        data: int;
    } | undefined;
    /** Returns the index of the selected element and the count/number of elements in the DxutDialog's listbox with ID
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_GET_SELECTED_LISTBOX_ELEMENT [0B9B]*/
    getSelectedListboxElement(id: int): {
        index: int;
        count: int;
    };
    /** Returns the thumb position value of the DxutDialog's slider with ID
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_GET_SLIDER_VALUE [0B97]*/
    getSliderValue(id: int): int;
    /** Inserts a new element into the DxutDialog's listbox with ID
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_INSERT_LISTBOX_ELEMENT [0B9A]*/
    insertListboxElement(id: int, text: int, data: int, index: int): boolean;
    /** Evaluates as logical true if the checkbox control of the DxutDialog is checked
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_IS_CHECKBOX_CHECKED [0B92]*/
    isCheckBoxChecked(checkboxId: int): boolean;
    /** Evaluates as true if the DxutDialog's control element with ID is visible
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_IS_CONTROL_VISIBLE [0B95]*/
    isControlVisible(id: int): boolean;
    /** Returns logical true if the DxutDialog is minimized
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_IS_MINIMIZED [0BA2]*/
    isMinimized(): boolean;
    /** Evaluates as logical true if the DxutDialog's title is visible
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_IS_TITLE_VISIBLE [0BA0]*/
    isTitleVisible(): boolean;
    /** Checks if the DxutDialog is visible
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_IS_VISIBLE [0B87]*/
    isVisible(): boolean;
    /** Returns the last event and component ID that occurred with the specified dialog
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_POP [0B81]*/
    pop(): {
        eventId: int;
        controlId: int;
    } | undefined;
    /** Sets the background color of the DxutDialog
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_SET_BACKGROUND_COLOR [0B93]*/
    setBgColor(color: int): void;
    /** Sets the color of DxutDialog's checkbox control with ID
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_SET_COLOR_OF_CHECKBOX [0BAA]*/
    setCheckboxColor(id: int, color: int): void;
    /** Sets the status of a checkbox
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_SET_STATUS_OF_CHECKBOX [0B9E]*/
    setCheckboxStatus(id: int, isChecked: boolean): void;
    /** Sets the window position of the DxutDialog control with ID
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_SET_COORDS_OF_CONTROL [0BA8]*/
    setControlCoords(id: int, relCoordX: int, relCoordY: int): void;
    /** Sets the text of a control using its ID
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_SET_TEXT_OF_CONTROL [0B94]*/
    setControlText(id: int, text: string): boolean;
    /** Sets the coordinates and dimensions of the DxutDialog
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_SET_COORDS_AND_DIMS [0B84]*/
    setCoordsAndDims(coordX: int, coordY: int, width: int, height: int): void;
    /** Changes the dimensions of the DxutDialog control with ID
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_SET_DIMS_OF_CONTROL [0BA6]*/
    setDims(id: int, width: int, height: int): void;
    /** Sets the minimized status of the DxutDialog
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_SET_MINIMIZED [0BA1]*/
    setMinimized(isMinimized: boolean): void;
    /** Sets the thumb position value of the DxutDialog's slider with ID
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_SET_SLIDER_VALUE [0B98]*/
    setSliderValue(id: int, value: int): void;
    /** Sets the visibility of the DxutDialog's title
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_SET_TITLE_VISIBILITY [0B9F]*/
    setTitleVisibility(isVisible: boolean): void;
    /** Sets the visibility of the DXUTDialog's control element with ID
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_SET_VISIBILITY_OF_CONTROL [0B90]*/
    setVisibilityOfControl(controlId: int, isVisible: int): void;
    /** Sets the focus of user interaction to a specific DxutDialog control with ID
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_SET_FOCUSED_CONTROL [0BA5]*/
    toggleControlFocus(id: int): void;
    /** Sets the visibility status of the DxutDialog
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DXUT_DIALOG_SET_VISIBILITY [0B86]*/
    visibility(isVisible: boolean): void;
}
declare var SfDxutDialog: SfDxutDialog
/** Class SfGFunc
 * 
 * https://library.sannybuilder.com/#/sa/classes/SfGFunc */
interface SfGFunc {
    /** Calls a registered custom global function with name
    *
    * https://library.sannybuilder.com/#/sa?q=SF_CALL_CUSTOM_GLOBAL_FUNCTION [0C35]*/
    Call(name: string, numArgs: int, ...args: number[]): boolean;
    /** Returns the origin informations of a custom global function with name
    *
    * https://library.sannybuilder.com/#/sa?q=SF_CUSTOM_GLOBAL_FUNCTION_GET_ORIGIN [0C38]*/
    GetOrigin(name: string): {
        hostThreadAddress: int;
        functionAddress: int;
    } | undefined;
    /** Evaluates as logical true if the specified name is registered a custom global function
    *
    * https://library.sannybuilder.com/#/sa?q=SF_IS_CUSTOM_GLOBAL_FUNCTION_REGISTERED [0C37]*/
    IsRegistered(name: string): boolean;
    /** Registers the name of a custom global function allowing other scripts to call it using SF_CALL_CUSTOM_GLOBAL_FUNCTION command
    *
    * https://library.sannybuilder.com/#/sa?q=SF_REGISTER_CUSTOM_GLOBAL_FUNCTION [0C34]*/
    Register(name: string, label: int): boolean;
    /** Returns the flow of the execution to the next instruction after the custom global function call, optionally returning one or more parameters as result
    *
    * https://library.sannybuilder.com/#/sa?q=SF_CUSTOM_GLOBAL_FUNCTION_RETURN [0C36]*/
    Return(numRet: int, ...retParams: number[]): boolean;
    /** Removes the currently registered custom global function. Allowing its name to be re-registered by SF_REGISTER_CUSTOM_GLOBAL_FUNCTION command
    *
    * https://library.sannybuilder.com/#/sa?q=SF_UNREGISTER_CUSTOM_GLOBAL_FUNCTION [0C39]*/
    Unregister(name: string): void;
}
declare var SfGFunc: SfGFunc
/** Class SfGVar
 * 
 * https://library.sannybuilder.com/#/sa/classes/SfGVar */
interface SfGVar {
    /** Evaluates as logical true if a custom global variable with specified name existed
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DOES_CUSTOM_GLOBAL_VARIABLE_EXIST [0C5F]*/
    DoesExist(name: string): boolean;
    /** Returns the value of the custom global variable with name
    *
    * https://library.sannybuilder.com/#/sa?q=SF_GET_CUSTOM_GLOBAL_VARIABLE [0BFD]*/
    Get(name: string): int | undefined;
    /** Returns the specified script's read/write permissions to the specified custom global variable
    *
    * https://library.sannybuilder.com/#/sa?q=SF_GET_CUSTOM_GLOBAL_VARIABLE_SCOPE [0C61]*/
    GetScope(gVarName: int, scriptPtr: int): {
        canRead: boolean;
        canWrite: boolean;
    } | undefined;
    /** Sets the value of the custom global variable with name
    *
    * https://library.sannybuilder.com/#/sa?q=SF_SET_CUSTOM_GLOBAL_VARIABLE [0BFC]*/
    Set(name: string, value: int): boolean;
    /** Sets whether the specified script can read or write to the specified custom global variable
    *
    * https://library.sannybuilder.com/#/sa?q=SF_SET_CUSTOM_GLOBAL_VARIABLE_SCOPE [0C60]*/
    SetScope(gVarName: string, scriptPtr: int, canRead: boolean, canWrite: boolean): boolean;
}
declare var SfGVar: SfGVar
/** Class SfScript
 * 
 * https://library.sannybuilder.com/#/sa/classes/SfScript */
interface SfScript {
    /** Starts a new script from the specified scriptLabel then stores its pointer at newScriptPtrTo parameter
    *
    * https://library.sannybuilder.com/#/sa?q=SF_START_NEW_SCRIPT_FROM_LABEL [0C6A]*/
    RunFromLabel(scriptLabel: int, newScriptPtrTo: SfScript, ...passedValues: number[]): void;
    /** Starts a new script from the specified memory location where a script binary data is stored (scriptBin) then stores its pointer at newScriptPtrTo parameter
    *
    * https://library.sannybuilder.com/#/sa?q=SF_START_NEW_SCRIPT_FROM_POINTER [0C6B]*/
    RunFromPtr(scriptBin: int, newScriptPtrTo: SfScript, ...passedValues: number[]): void;
    /** Returns the value of a local variable in the specified script
    *
    * https://library.sannybuilder.com/#/sa?q=SF_GET_SCRIPT_LOCAL_VARIABLE [0C6D]*/
    getLVar(varIndex: int): int;
    /** Restarts a script pointed by the address
    *
    * https://library.sannybuilder.com/#/sa?q=SF_RESTART_SCRIPT [0C6F]*/
    restart(...passedValues: number[]): void;
    /** Sets the values for a local variable in the specified script
    *
    * https://library.sannybuilder.com/#/sa?q=SF_SET_SCRIPT_LOCAL_VARIABLE [0C6C]*/
    setLVar(varIndex: int, value: int): void;
    /** Terminates a script pointed by the address
    *
    * https://library.sannybuilder.com/#/sa?q=SF_TERMINATE_SCRIPT [0C6E]*/
    terminate(): void;
}
declare var SfScript: SfScript
/** Class SfTimer
 * 
 * https://library.sannybuilder.com/#/sa/classes/SfTimer */
interface SfTimer {
    /** Creates and starts an SfTimer object that periodically executes its callback upon expiration
    *
    * https://library.sannybuilder.com/#/sa?q=SF_CREATE_TIMER [0C74]*/
    Create(interval: int, callback: int): SfTimer | undefined;
    /** Removes the specified SfTimer object, freeing it from memory
    *
    * https://library.sannybuilder.com/#/sa?q=SF_DELETE_TIMER [0C75]*/
    delete(): boolean;
    /** Returns the number of milliseconds that have passed since the last SfTimer reset (including after the interval has passed)
    *
    * https://library.sannybuilder.com/#/sa?q=SF_GET_TIMER_ELAPSED_TIME [0C7B]*/
    getElapsedTime(): int | undefined;
    /** Returns the SfTimer's configured interval
    *
    * https://library.sannybuilder.com/#/sa?q=SF_GET_TIMER_INTERVAL [0C7A]*/
    getInterval(): int | undefined;
    /** Returns the number of milliseconds remaining before the SfTimer expires (decremented if the timer is active)
    *
    * https://library.sannybuilder.com/#/sa?q=SF_GET_TIMER_TIME_LEFT [0C7C]*/
    getTimeLeft(): int | undefined;
    /** Evaluates as logical true if the SfTimer is active
    *
    * https://library.sannybuilder.com/#/sa?q=SF_IS_TIMER_ACTIVE [0C79]*/
    isActive(): boolean;
    /** Resets the expiration time of the SfTimer, restarting its trigger countdown
    *
    * https://library.sannybuilder.com/#/sa?q=SF_RESET_TIMER [0C76]*/
    reset(): boolean;
    /** Sets a new interval for the SfTimer
    *
    * https://library.sannybuilder.com/#/sa?q=SF_SET_TIMER_INTERVAL [0C77]*/
    setInterval(interval: int): boolean;
    /** Activates or pauses an SfTimer's functionality
    *
    * https://library.sannybuilder.com/#/sa?q=SF_SET_TIMER_STATUS [0C78]*/
    setStatus(isActive: boolean): boolean;
}
declare var SfTimer: SfTimer
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Shopping */
interface Shopping {
    /** Sets a new base price for the shopping.dat item
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_PRICE_MODIFIER [08C8]*/
    AddPriceModifier(itemId: int, price: int): void;
    /** Charges the player for the purchase of the item and in many cases, automatically gives the item to the player
    *
    * https://library.sannybuilder.com/#/sa?q=BUY_ITEM [0790]*/
    BuyItem(itemId: int): void;
    /** Releases the loaded shopping data
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_LOADED_SHOP [087C]*/
    ClearLoaded(): void;
    GetExtraInfo(itemId: int, flag: int): int;
    /** Returns an identifier for an item associated with the shopping data entry
    *
    * https://library.sannybuilder.com/#/sa?q=GET_ITEM_IN_SHOP [0760]*/
    GetItem(nth: int): int;
    /** Returns the name of currently loaded subsection in shopping
    *
    * https://library.sannybuilder.com/#/sa?q=GET_LOADED_SHOP [07B0]*/
    GetLoaded(): string;
    GetNameOfItem(itemId: int): string;
    GetNumberOfItems(): int;
    GetPriceOfItem(itemId: int): int;
    /** Returns true if the shopping item has been bought
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_PLAYER_BOUGHT_ITEM [0942]*/
    HasPlayerBoughtItem(itemId: int): boolean;
    Load(name: string): void;
    LoadPrices(sectionName: string): void;
    /** Restores the base price for a shopping.dat item altered by ADD_PRICE_MODIFIER
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_PRICE_MODIFIER [08C9]*/
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
    * https://library.sannybuilder.com/#/sa?q=IS_SKIP_WAITING_FOR_SCRIPT_TO_FADE_IN [0A36]*/
    IsWaitingForScriptToFadeIn(): boolean;
    /** Fades out the screen and teleports the player to the specified coordinates and angle
    *
    * https://library.sannybuilder.com/#/sa?q=SET_UP_SKIP [0950]*/
    SetUp(x: float, y: float, z: float, heading: float): void;
    /** Fades the screen out and teleports the player to the specified coordinates and angle
    *
    * https://library.sannybuilder.com/#/sa?q=SET_UP_SKIP_AFTER_MISSION [09AF]*/
    SetUpAfterMission(x: float, y: float, z: float, heading: float): void;
    /** Teleports the player to the specified coordinates and sets the specified angle when in the specified car
    *
    * https://library.sannybuilder.com/#/sa?q=SET_UP_SKIP_FOR_SPECIFIC_VEHICLE [09E0]*/
    SetUpForSpecificVehicle(x: float, y: float, z: float, heading: float, handle: Car): void;
    /** Teleports the player to the specified coordinates and sets the specified angle with the screen fading in when in the specified car
    *
    * https://library.sannybuilder.com/#/sa?q=SET_UP_SKIP_FOR_VEHICLE_FINISHED_BY_SCRIPT [0A35]*/
    SetUpForVehicleFinishedByScript(x: float, y: float, z: float, heading: float, vehicle: Car): void;
}
declare var Skip: Skip
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Sound */
interface Sound {
    /** Plays a sound with the specified ID at the location
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_ONE_OFF_SOUND [018C]*/
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
    * https://library.sannybuilder.com/#/sa?q=ADD_SPHERE [03BC]*/
    static Create(x: float, y: float, z: float, radius: float): Sphere;
    /** Displays a red cylinder sphere
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_SPHERE [03A1]*/
    static Draw(x: float, y: float, z: float, diameter: float): void;
    /** Destroys a static sphere
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_SPHERE [03BD]*/
    remove(): void;
    /** Changes the color of the sphere
    *
    * https://library.sannybuilder.com/#/sa?q=SET_SPHERE_COLOR [2880]*/
    setColor(r: int, g: int, b: int): Sphere;
}
/** Class Sprite
 * 
 * https://library.sannybuilder.com/#/sa/classes/Sprite */
interface Sprite {
    /** Draws 2D sprite
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_2D_SPRITE [0D7E]*/
    Draw2D(texture: int, cornerAx: float, cornerAy: float, cornerBx: float, cornerBy: float, red: int, blue: int, green: int, aplha: int, angle: float): void;
    /** Draws 2D sprite with gradient
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_2D_SPRITE_WITH_GRADIENT [0D7F]*/
    Draw2DWithGradient(texture: int, cornerAx: float, cornerAy: float, cornerBx: float, cornerBy: float, red0: int, green0: int, blue0: int, alpha0: int, red1: int, green1: int, blue1: int, alpha1: int, red2: int, green2: int, blue2: int, alpha2: int, red3: int, green3: int, blue3: int, alpha3: int, angle: float): void;
}
declare var Sprite: Sprite
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Stat */
interface Stat {
    /** Increments the earned mission respect points (stat 224) by the given value
    *
    * https://library.sannybuilder.com/#/sa?q=AWARD_PLAYER_MISSION_RESPECT [0998]*/
    AwardPlayerMissionRespect(value: int): void;
    /** Decreases the float stat by the value given
    *
    * https://library.sannybuilder.com/#/sa?q=DECREMENT_FLOAT_STAT [0626]*/
    DecrementFloat(id: int, value: float): void;
    /** Decreases the integer stat by the value given
    *
    * https://library.sannybuilder.com/#/sa?q=DECREMENT_INT_STAT [0625]*/
    DecrementInt(id: int, value: int): void;
    /** Gets the number of spraytags painted over
    *
    * https://library.sannybuilder.com/#/sa?q=FIND_NUMBER_TAGS_TAGGED [08E1]*/
    FindNumberTagsTagged(): int;
    /** Returns the value of the specified float stat
    *
    * https://library.sannybuilder.com/#/sa?q=GET_FLOAT_STAT [0653]*/
    GetFloat(id: int): float;
    /** Returns the value of the specified integer stat
    *
    * https://library.sannybuilder.com/#/sa?q=GET_INT_STAT [0652]*/
    GetInt(id: int): int;
    /** Gets the progress of completion as a percentage
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PROGRESS_PERCENTAGE [058C]*/
    GetProgressPercentage(): float;
    GetTerritoryUnderControlPercentage(): int;
    /** Increases the float stat by the value specified
    *
    * https://library.sannybuilder.com/#/sa?q=INCREMENT_FLOAT_STAT [0624]*/
    IncrementFloat(id: int, value: float): void;
    /** Increases the float stat by the value given without displaying popup message
    *
    * https://library.sannybuilder.com/#/sa?q=INCREMENT_FLOAT_STAT_NO_MESSAGE [0A1F]*/
    IncrementFloatNoMessage(id: int, value: float): void;
    /** Increases the integer stat by the value given
    *
    * https://library.sannybuilder.com/#/sa?q=INCREMENT_INT_STAT [0623]*/
    IncrementInt(id: int, value: int): void;
    /** Increases the integer stat by the value given without displaying popup message
    *
    * https://library.sannybuilder.com/#/sa?q=INCREMENT_INT_STAT_NO_MESSAGE [0A10]*/
    IncrementIntNoMessage(id: int, value: int): void;
    /** Increases the progress made stat by the specified amount
    *
    * https://library.sannybuilder.com/#/sa?q=PLAYER_MADE_PROGRESS [030C]*/
    PlayerMadeProgress(progress: int): void;
    /** Updates the race best position
    *
    * https://library.sannybuilder.com/#/sa?q=REGISTER_BEST_POSITION [0582]*/
    RegisterBestPosition(id: int, position: int): void;
    /** Updates the stat if the value is lower than the current stat value
    *
    * https://library.sannybuilder.com/#/sa?q=REGISTER_FASTEST_TIME [042E]*/
    RegisterFastestTime(id: int, value: int): void;
    /** Sets the specified stat to the specified value, if the specified value is greater than the current stat value
    *
    * https://library.sannybuilder.com/#/sa?q=REGISTER_FLOAT_STAT [0628]*/
    RegisterFloat(id: int, value: float): void;
    /** Updates the specified integer stat
    *
    * https://library.sannybuilder.com/#/sa?q=REGISTER_INT_STAT [0627]*/
    RegisterInt(id: int, value: int): void;
    /** Increments the number of mission attempts stat by one
    *
    * https://library.sannybuilder.com/#/sa?q=REGISTER_MISSION_GIVEN [0317]*/
    RegisterMissionGiven(): void;
    /** Sets the GXT of the last mission passed
    *
    * https://library.sannybuilder.com/#/sa?q=REGISTER_MISSION_PASSED [0318]*/
    RegisterMissionPassed(key: string): void;
    /** Sets the latest odd job mission passed
    *
    * https://library.sannybuilder.com/#/sa?q=REGISTER_ODDJOB_MISSION_PASSED [0595]*/
    RegisterOddjobMissionPassed(): void;
    /** Sets the float stat to the specified value
    *
    * https://library.sannybuilder.com/#/sa?q=SET_FLOAT_STAT [062A]*/
    SetFloat(id: int, value: float): void;
    /** Sets the integer stat to the specified value
    *
    * https://library.sannybuilder.com/#/sa?q=SET_INT_STAT [0629]*/
    SetInt(id: int, value: int): void;
    /** Sets the total value of mission respect points (stat 228)
    *
    * https://library.sannybuilder.com/#/sa?q=SET_MISSION_RESPECT_TOTAL [0997]*/
    SetMissionRespectTotal(value: int): void;
    /** Sets the maximum progress the player can reach
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PROGRESS_TOTAL [030D]*/
    SetProgressTotal(maxProgress: int): void;
    /** Sets the total number of missions that can be completed
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TOTAL_NUMBER_OF_MISSIONS [042C]*/
    SetTotalNumberOfMissions(numMissions: int): void;
    /** Displays help boxes indicating that the players stats have been updated
    *
    * https://library.sannybuilder.com/#/sa?q=SHOW_UPDATE_STATS [08F8]*/
    ShowUpdateStats(state: boolean): void;
}
declare var Stat: Stat
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/StreamedScript */
interface StreamedScript {
    /** Makes the game start an ambient script when the player is nearby an object of the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=ALLOCATE_STREAMED_SCRIPT_TO_OBJECT [0929]*/
    AllocateToObject(id: int, modelId: int, priority: int, radius: float, type: int): void;
    /** Makes the game start an ambient script when the player is nearby a character of the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=ALLOCATE_STREAMED_SCRIPT_TO_RANDOM_PED [0928]*/
    AllocateToRandomPed(id: int, modelId: int, priority: int): void;
    /** Gets the number of instances of a script
    *
    * https://library.sannybuilder.com/#/sa?q=GET_NUMBER_OF_INSTANCES_OF_STREAMED_SCRIPT [0926]*/
    GetNumberOfInstances(id: int): int;
    /** Returns true if the ambient script has finished loading (08A9)
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_STREAMED_SCRIPT_LOADED [08AB]*/
    HasLoaded(id: int): boolean;
    /** Ends the specified script brain
    *
    * https://library.sannybuilder.com/#/sa?q=MARK_STREAMED_SCRIPT_AS_NO_LONGER_NEEDED [090F]*/
    MarkAsNoLongerNeeded(id: int): void;
    /** Registers a script brain for the specified ped attractor
    *
    * https://library.sannybuilder.com/#/sa?q=REGISTER_ATTRACTOR_SCRIPT_BRAIN_FOR_CODE_USE [0884]*/
    RegisterAttractorScriptBrainForCodeUse(id: int, _p2: string): void;
    /** Sets the name for the script brain, enabling it to be initiated by the EXE
    *
    * https://library.sannybuilder.com/#/sa?q=REGISTER_SCRIPT_BRAIN_FOR_CODE_USE [07D3]*/
    RegisterScriptBrainForCodeUse(id: int, _p2: string): void;
    /** Releases the ambient script with the specified ID, freeing game memory
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_STREAMED_SCRIPT [0910]*/
    Remove(id: int): void;
    /** Runs the ambient script with the specified ID
    *
    * https://library.sannybuilder.com/#/sa?q=START_NEW_STREAMED_SCRIPT [0913]*/
    StartNew(id: int, ...args: number[]): void;
    /** Loads the ambient script with the specified ID from the script.img file
    *
    * https://library.sannybuilder.com/#/sa?q=STREAM_SCRIPT [08A9]*/
    Stream(id: int): void;
}
declare var StreamedScript: StreamedScript
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Streaming */
interface Streaming {
    /** Sets an animation pack to be loaded along with the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=ATTACH_ANIMS_TO_MODEL [08E8]*/
    AttachAnimsToModel(pedModelId: int, animationFile: string): void;
    /** Sets the town ID of the license plate which is created on the specified model, affecting which texture is chosen for the plate
    *
    * https://library.sannybuilder.com/#/sa?q=CUSTOM_PLATE_DESIGN_FOR_NEXT_CAR [0771]*/
    CustomPlateDesignForNextCar(modelId: int, design: int): void;
    /** Gets the current interior ID
    *
    * https://library.sannybuilder.com/#/sa?q=GET_AREA_VISIBLE [077E]*/
    GetAreaVisible(): int;
    /** Returns the modelID by name
    *
    * https://library.sannybuilder.com/#/sa?q=GET_MODEL_BY_NAME [0E9C]*/
    GetModelByName(name: string): int | undefined;
    GetModelDimensions(modelId: int): {
        leftBottomBackX: float;
        leftBottomBackY: float;
        leftBottomBackZ: float;
        rightTopFrontX: float;
        rightTopFrontY: float;
        rightTopFrontZ: float;
    };
    /** Returns the address of the modelInfo of the specified modelId
    *
    * https://library.sannybuilder.com/#/sa?q=GET_MODEL_INFO [0EF8]*/
    GetModelInfo(modelId: int): int | undefined;
    /** Returns the type of the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=GET_MODEL_TYPE [0E7F]*/
    GetModelType(model: int): int;
    GetNameOfVehicleModel(modelId: int): string;
    GetRandomCarModelInMemory(normalOnly: boolean): {
        modelId: int;
        class: int;
    };
    GetSpecialModelData(specialModel: int): {
        clump: int;
        atomic: int;
        txdIndex: int;
    };
    /** Returns a slot the upgrade model is for
    *
    * https://library.sannybuilder.com/#/sa?q=GET_VEHICLE_MOD_TYPE [06E6]*/
    GetVehicleModType(modelId: int): int;
    /** Returns true if the specified IFP file is loaded
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_ANIMATION_LOADED [04EE]*/
    HasAnimationLoaded(animationFile: string): boolean;
    /** Returns true if the car recording has finished loading
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_CAR_RECORDING_BEEN_LOADED [07C1]*/
    HasCarRecordingBeenLoaded(pathId: int): boolean;
    /** Returns true if the model is available for creation
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_MODEL_LOADED [0248]*/
    HasModelLoaded(modelId: int): boolean;
    /** Returns true if the special character's model (023C) is available for creation
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_SPECIAL_CHARACTER_LOADED [023D]*/
    HasSpecialCharacterLoaded(slotId: int): boolean;
    /** Returns true if the vehicle upgrade model has loaded
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_VEHICLE_MOD_LOADED [06EA]*/
    HasVehicleModLoaded(modelId: int): boolean;
    /** Returns true if the specified model exists in the loaded 
    *
    * https://library.sannybuilder.com/#/sa?q=IS_MODEL_AVAILABLE [0488]*/
    IsModelAvailable(modelId: int): boolean;
    /** Returns true if the specified model name is available as a valid special character
    *
    * https://library.sannybuilder.com/#/sa?q=IS_MODEL_AVAILABLE_BY_NAME [0E9D]*/
    IsModelAvailableByName(name: string): boolean;
    /** Returns true if a file for the model exists
    *
    * https://library.sannybuilder.com/#/sa?q=IS_MODEL_IN_CDIMAGE [07DE]*/
    IsModelInCdimage(modelId: int): boolean;
    /** Returns true if the model is the model of a boat
    *
    * https://library.sannybuilder.com/#/sa?q=IS_THIS_MODEL_A_BOAT [081E]*/
    IsThisModelABoat(modelId: int): boolean;
    /** Returns true if a valid car model is passed
    *
    * https://library.sannybuilder.com/#/sa?q=IS_THIS_MODEL_A_CAR [0A01]*/
    IsThisModelACar(modelId: int): boolean;
    /** Returns true if the model is the model of a helicopter
    *
    * https://library.sannybuilder.com/#/sa?q=IS_THIS_MODEL_A_HELI [0820]*/
    IsThisModelAHeli(modelId: int): boolean;
    /** Returns true if the model is the model of a plane
    *
    * https://library.sannybuilder.com/#/sa?q=IS_THIS_MODEL_A_PLANE [081F]*/
    IsThisModelAPlane(modelId: int): boolean;
    /** Loads any requested models (0247 or 0353) synchronously
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_ALL_MODELS_NOW [038B]*/
    LoadAllModelsNow(): void;
    /** This is a duplicate of LOAD_ALL_MODELS_NOW
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_ALL_PRIORITY_MODELS_NOW [0E99]*/
    LoadAllPriorityModelsNow(): void;
    /** Starts loading a specific location, just like if the player was there, removing LOD textures
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_SCENE [03CB]*/
    LoadScene(x: float, y: float, z: float): void;
    LoadSceneInDirection(x: float, y: float, z: float, heading: float): void;
    /** Requests a special character's model to be loaded into the specified slot
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_SPECIAL_CHARACTER [023C]*/
    LoadSpecialCharacter(slotId: int, modelName: string): void;
    LoadSpecialCharacterForId(id: int, name: string): void;
    LoadSpecialModel(dff: string, txd: string): int | undefined;
    /** Marks the train as no longer needed by the script, allowing it to be deleted by the game
    *
    * https://library.sannybuilder.com/#/sa?q=MARK_MISSION_TRAINS_AS_NO_LONGER_NEEDED [06DA]*/
    MarkMissionTrainsAsNoLongerNeeded(): void;
    /** Releases the specified model, freeing game memory
    *
    * https://library.sannybuilder.com/#/sa?q=MARK_MODEL_AS_NO_LONGER_NEEDED [0249]*/
    MarkModelAsNoLongerNeeded(modelId: int): void;
    /** Marks the vehicle upgrade model as no longer needed, allowing it to be unloaded by the streamer
    *
    * https://library.sannybuilder.com/#/sa?q=MARK_VEHICLE_MOD_AS_NO_LONGER_NEEDED [06EB]*/
    MarkVehicleModAsNoLongerNeeded(modelId: int): void;
    RemoveAllUnusedModels(): void;
    /** Releases the specified IFP file, freeing game memory
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_ANIMATION [04EF]*/
    RemoveAnimation(animationFile: string): void;
    /** Unloads the car recording
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_CAR_RECORDING [0873]*/
    RemoveCarRecording(pathId: int): void;
    RemoveIpl(iplName: string): void;
    RemoveIplDiscreetly(iplName: string): void;
    /** Removes the specified ModelID from memory if unused
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_MODEL_IF_UNUSED [0EA3]*/
    RemoveModelIfUnused(modelId: int): void;
    RemoveSpecialModel(specialModel: int): void;
    /** Loads the specified IFP File
    *
    * https://library.sannybuilder.com/#/sa?q=REQUEST_ANIMATION [04ED]*/
    RequestAnimation(animationFile: string): void;
    /** Loads the specified car recording
    *
    * https://library.sannybuilder.com/#/sa?q=REQUEST_CAR_RECORDING [07C0]*/
    RequestCarRecording(pathId: int): void;
    /** Reloads the area at the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=REQUEST_COLLISION [04E4]*/
    RequestCollision(x: float, y: float): void;
    RequestIpl(iplName: string): void;
    /** Requests a new model to load
    *
    * https://library.sannybuilder.com/#/sa?q=REQUEST_MODEL [0247]*/
    RequestModel(modelId: int): void;
    /** Requests a priority modelID to be loaded
    *
    * https://library.sannybuilder.com/#/sa?q=REQUEST_PRIORITY_MODEL [0E98]*/
    RequestPriorityModel(modelId: int): void;
    /** Loads the upgrade model and any associated models
    *
    * https://library.sannybuilder.com/#/sa?q=REQUEST_VEHICLE_MOD [06E9]*/
    RequestVehicleMod(modelId: int): void;
    /** Sets the visibility of an interior area
    *
    * https://library.sannybuilder.com/#/sa?q=SET_AREA_VISIBLE [04BB]*/
    SetAreaVisible(areaId: int): void;
    /** Sets the streaming of additional models like peds, cars, and maps
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_STREAMING [03AF]*/
    Switch(state: boolean): void;
    /** Releases the special character (023C), freeing game memory
    *
    * https://library.sannybuilder.com/#/sa?q=UNLOAD_SPECIAL_CHARACTER [0296]*/
    UnloadSpecialCharacter(slotId: int): void;
    UnloadSpecialCharacterFromId(id: int): void;
}
declare var Streaming: Streaming
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/StuckCarCheck */
interface StuckCarCheck {
    /** Adds the vehicle to the stuck cars array
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_STUCK_CAR_CHECK [03CC]*/
    Add(vehicle: Car, distance: float, time: int): void;
    /** Attempts to automatically restore vehicles that get stuck or flipped
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_STUCK_CAR_CHECK_WITH_WARP [072F]*/
    AddWithWarp(vehicle: Car, distance: float, time: int, stuck: boolean, flipped: boolean, inWater: boolean, numNodesToCheck: int): void;
    /** Returns true if the car is stuck
    *
    * https://library.sannybuilder.com/#/sa?q=IS_CAR_STUCK [03CE]*/
    IsCarStuck(vehicle: Car): boolean;
    /** Removes the vehicle from the stuck cars array
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_STUCK_CAR_CHECK [03CD]*/
    Remove(vehicle: Car): void;
}
declare var StuckCarCheck: StuckCarCheck
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Task */
interface Task {
    /** Rotates a character to the specified angle
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_ACHIEVE_HEADING [05D4]*/
    AchieveHeading(handle: Char, heading: float): void;
    /** Makes a character aim at another character
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_AIM_GUN_AT_CHAR [0635]*/
    AimGunAtChar(char: Char, target: Char, time: int): void;
    /** Makes the character aim at the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_AIM_GUN_AT_COORD [0667]*/
    AimGunAtCoord(handle: Char, x: float, y: float, z: float, time: int): void;
    CarDriveToCoord(driver: Char, vehicle: Car, x: float, y: float, z: float, speed: float, driveStyle: int, modelId: int, drivingStyle: int): void;
    /** Makes the character drive around aimlessly in a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_CAR_DRIVE_WANDER [05D2]*/
    CarDriveWander(char: Char, vehicle: Car, speed: float, drivingMode: int): void;
    /** Sets the car's current mission with various parameters
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_CAR_MISSION [06E1]*/
    CarMission(char: Char, vehicle: Car, targetVehicle: Car, missionId: int, cruiseSpeed: float, drivingStyle: int): void;
    /** Makes the AI driver perform the action in the vehicle for the specified period of time
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_CAR_TEMP_ACTION [06C7]*/
    CarTempAction(char: Char, vehicle: Car, actionId: int, time: int): void;
    /** Makes the character attempt to arrest another character
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_CHAR_ARREST_CHAR [06E4]*/
    CharArrestChar(char: Char, target: Char): void;
    CharSlideToCoord(handle: Char, x: float, y: float, z: float, angle: float, radius: float): void;
    /** Makes a character walk to the specified point, trun to heading, then play an animation
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_CHAR_SLIDE_TO_COORD_AND_PLAY_ANIM [0804]*/
    CharSlideToCoordAndPlayAnim(handle: Char, x: float, y: float, z: float, heading: float, radius: float, animationName: string, animationFile: string, blendSpeed: float, loop: boolean, lockX: boolean, lockY: boolean, keepLastFrame: boolean, time: int): void;
    /** Makes the character chat with another character
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_CHAT_WITH_CHAR [0677]*/
    ChatWithChar(char: Char, other: Char, leadSpeaker: boolean, _p4: int): void;
    /** Makes the character jump and climb on an object
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_CLIMB [078F]*/
    Climb(handle: Char, flag: boolean): void;
    ComplexPickupObject(char: Char, object: ScriptObject): void;
    /** Makes the char stumble backwards with their arms in front of their face as if he is backing away from something in fear
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_COWER [05C3]*/
    Cower(handle: Char): void;
    /** Kills the character
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_DEAD [0762]*/
    Dead(handle: Char): void;
    /** Makes the character attack a vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_DESTROY_CAR [0672]*/
    DestroyCar(char: Char, vehicle: Car): void;
    /** Kills the character
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_DIE [05BE]*/
    Die(handle: Char): void;
    /** Makes the char perform an animation similarly to 0605
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_DIE_NAMED_ANIM [0829]*/
    DieNamedAnim(handle: Char, animationName: string, animationFile: string, blendSpeed: float, time: int): void;
    /** Makes the character perform a dive in the specified direction
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_DIVE_AND_GET_UP [0673]*/
    DiveAndGetUp(handle: Char, directionX: float, directionY: float, timeOnGround: int): void;
    DiveFromAttachmentAndGetUp(handle: Char, time: int): void;
    DriveBy(handle: Char, targetChar: Char, targetVehicle: Car, x: float, y: float, z: float, radius: float, type: int, rightHandCarSeat: boolean, fireRate: int): void;
    DrivePointRoute(char: Char, vehicle: Car, speed: int): void;
    DrivePointRouteAdvanced(char: Char, vehicle: Car, speed: float, driveStyle: int, modelId: int, drivingStyle: int): void;
    /** Makes a character duck with their arms over head
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_DUCK [05C5]*/
    Duck(handle: Char, time: int): void;
    /** Makes a character approach the car and occupy the driver seat
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_ENTER_CAR_AS_DRIVER [05CB]*/
    EnterCarAsDriver(char: Char, vehicle: Car, time: int): void;
    /** Makes a character approach the car and occupy the specified passenger seat
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_ENTER_CAR_AS_PASSENGER [05CA]*/
    EnterCarAsPassenger(char: Char, vehicle: Car, time: int, seat: int): void;
    /** Makes char fall to the ground and stay there for the specified time
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_FALL_AND_GET_UP [05BB]*/
    FallAndGetUp(handle: Char, fallDown: boolean, timeOnGround: int): void;
    /** Makes the character run away from another character
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_FLEE_CHAR [05DB]*/
    FleeChar(handle: Char, threat: Char, radius: float, time: int): void;
    FleeCharAnyMeans(handle: Char, threat: Char, safeDist: float, time: int, shoot: boolean, shootTime: int, shootCooldownTime: int, stealCarDist: float): void;
    /** Makes the character run away from a point, scared and often screaming
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_FLEE_POINT [05DA]*/
    FleePoint(handle: Char, x: float, y: float, z: float, radius: float, time: int): void;
    /** Makes one char follow another
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_FOLLOW_FOOTSTEPS [0850]*/
    FollowFootsteps(handle: Char, target: Char): void;
    /** Makes the character go to the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_FOLLOW_PATH_NODES_TO_COORD [05F5]*/
    FollowPathNodesToCoord(handle: Char, x: float, y: float, z: float, speed: int, time: int): void;
    /** Makes the specified character run in panic to the specified position
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_FOLLOW_PATH_NODES_TO_COORD_WITH_RADIUS [0A2E]*/
    FollowPathNodesToCoordWithRadius(handle: Char, x: float, y: float, z: float, speed: int, time: int, radius: float): void;
    /** Assigns the character to the patrol path
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_FOLLOW_PATROL_ROUTE [0817]*/
    FollowPatrolRoute(handle: Char, speed: int, mode: int): void;
    /** Makes the character follow the path route
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_FOLLOW_POINT_ROUTE [05D8]*/
    FollowPointRoute(handle: Char, speed: int, mode: int): void;
    /** Makes the character walk to the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_GO_STRAIGHT_TO_COORD [05D3]*/
    GoStraightToCoord(handle: Char, x: float, y: float, z: float, speed: int, time: int): void;
    /** Assigns the character the task of getting to the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_GO_TO_COORD_ANY_MEANS [0603]*/
    GoToCoordAnyMeans(char: Char, x: float, y: float, z: float, speed: int, vehicle: Car): void;
    GoToCoordWhileAiming(char: Char, x: float, y: float, z: float, speed: int, turnRadius: float, stopRadius: float, target: Char, xOffset: float, yOffset: float, zOffset: float): void;
    /** Makes a character go to the location while shooting at another character
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_GO_TO_COORD_WHILE_SHOOTING [0637]*/
    GoToCoordWhileShooting(char: Char, x: float, y: float, z: float, speed: int, turnRadius: float, stopRadius: float, target: Char): void;
    /** Makes the character go to an object
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_GO_TO_OBJECT [06E2]*/
    GoToObject(char: Char, object: ScriptObject, time: int, radius: float): void;
    GotoCar(char: Char, vehicle: Car, time: int, radius: float): void;
    /** Approaches the character from any direction within the specified radius
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_GOTO_CHAR [05D9]*/
    GotoChar(walking: Char, target: Char, time: int, radius: float): void;
    GotoCharAiming(handle: Char, target: Char, radiusFrom: float, radiusTo: float): void;
    /** Approaches the char at the specified offset, specified by the radius and angle
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_GOTO_CHAR_OFFSET [06A8]*/
    GotoCharOffset(char: Char, target: Char, time: int, radius: float, heading: float): void;
    /** Makes a character greet another character with a handshake
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_GREET_PARTNER [0823]*/
    GreetPartner(handle: Char, partner: Char, approachRatio: float, greetStyle: int): void;
    /** Makes a character face the other character and make a gesture
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_HAND_GESTURE [0A1D]*/
    HandGesture(handle: Char, target: Char): void;
    /** Makes the char put their hands in the air
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_HANDS_UP [05C4]*/
    HandsUp(handle: Char, time: int): void;
    Jetpack(handle: Char): void;
    /** Makes the char perform a jump
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_JUMP [05BC]*/
    Jump(handle: Char, state: boolean): void;
    /** Makes a character attack another character on foot
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_KILL_CHAR_ON_FOOT [05E2]*/
    KillCharOnFoot(killer: Char, target: Char): void;
    /** Makes the character attack the specified character
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_KILL_CHAR_ON_FOOT_TIMED [07A5]*/
    KillCharOnFootTimed(handle: Char, target: Char, time: int): void;
    KillCharOnFootWhileDucking(char: Char, target: Char, flags: int, actionDelay: int, actionChance: int): void;
    /** Makes the character stay near their current position
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_KINDA_STAY_IN_SAME_PLACE [085B]*/
    KindaStayInSamePlace(handle: Char, state: boolean): void;
    /** Makes the char exit the car, if he is in one
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_LEAVE_ANY_CAR [0633]*/
    LeaveAnyCar(handle: Char): void;
    /** Makes the character exit the specified vehicle, if they are currently in it
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_LEAVE_CAR [05CD]*/
    LeaveCar(char: Char, vehicle: Car): void;
    /** Makes the character exit the vehicle and flee to the specified position
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_LEAVE_CAR_AND_FLEE [05CF]*/
    LeaveCarAndFlee(char: Char, vehicle: Car, x: float, y: float, z: float): void;
    /** Makes the character jump out of the vehicle while it is in motion
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_LEAVE_CAR_IMMEDIATELY [0622]*/
    LeaveCarImmediately(char: Char, vehicle: Car): void;
    /** Makes a character look out ahead
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_LOOK_ABOUT [05C9]*/
    LookAbout(handle: Char, time: int): void;
    /** Makes the character look at another character
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_LOOK_AT_CHAR [05BF]*/
    LookAtChar(observer: Char, target: Char, time: int): void;
    /** Makes the char look at the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_LOOK_AT_COORD [06A9]*/
    LookAtCoord(handle: Char, x: float, y: float, z: float, time: int): void;
    /** Makes the character look at an object
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_LOOK_AT_OBJECT [0655]*/
    LookAtObject(char: Char, object: ScriptObject, time: int): void;
    /** Makes the char look at the specified vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_LOOK_AT_VEHICLE [05C0]*/
    LookAtVehicle(char: Char, vehicle: Car, time: int): void;
    /** Makes the character pause for the specified amount of time
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_PAUSE [05B9]*/
    Pause(handle: Char, time: int): void;
    /** Attaches the specified char to an object with the optional addition of having it perform an animation
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_PICK_UP_OBJECT [070A]*/
    PickUpObject(char: Char, object: ScriptObject, xOffset: float, yOffset: float, zOffset: float, boneId: int, _p7: int, animationName: string, animationFile: string, time: int): void;
    PickUpSecondObject(char: Char, object: ScriptObject, xOffset: float, yOffset: float, zOffset: float, boneId: int, _p7: int, animationName: string, animationFile: string, time: int): void;
    /** Makes the character perform an animation
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_PLAY_ANIM [0605]*/
    PlayAnim(handle: Char, animationName: string, animationFile: string, blendSpeed: float, loop: boolean, lockX: boolean, lockY: boolean, keepLastFrame: boolean, time: int): void;
    /** Makes the character perform an animation like TASK_PLAY_ANIM, except it will not be disturbed by any events
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_PLAY_ANIM_NON_INTERRUPTABLE [0812]*/
    PlayAnimNonInterruptable(handle: Char, animationName: string, animationFile: string, blendSpeed: float, loop: boolean, lockX: boolean, lockY: boolean, keepLastFrame: boolean, time: int): void;
    /** Makes a character play an animation that affects only the upper half of their body
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_PLAY_ANIM_SECONDARY [0A1A]*/
    PlayAnimSecondary(handle: Char, animationName: string, animationFile: string, blendSpeed: float, loop: boolean, lockX: boolean, lockY: boolean, keepLastFrame: boolean, time: int): void;
    /** Makes the char perform an animation
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_PLAY_ANIM_WITH_FLAGS [088A]*/
    PlayAnimWithFlags(handle: Char, animationName: string, animationFile: string, frameDelta: float, loop: boolean, lockX: boolean, lockY: boolean, lockF: boolean, time: int, disableForce: boolean, disableLockZ: boolean): void;
    /** Makes the character say a phrase from the specified audio table
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_SAY [05C1]*/
    Say(handle: Char, phrase: int): void;
    /** Makes a character scratch their head while looking around
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_SCRATCH_HEAD [05C8]*/
    ScratchHead(handle: Char): void;
    /** Sets the decision maker used by the specified char
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_SET_CHAR_DECISION_MAKER [07BC]*/
    SetCharDecisionMaker(char: Char, handleOrTemplate: int): void;
    SetIgnoreWeaponRangeFlag(handle: Char, state: boolean): void;
    /** Makes the char lift their hand up in the air angrily
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_SHAKE_FIST [05C2]*/
    ShakeFist(handle: Char): void;
    ShootAtChar(handle: Char, target: Char, time: int): void;
    /** Makes the character turn round and shoot at the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_SHOOT_AT_COORD [0668]*/
    ShootAtCoord(handle: Char, x: float, y: float, z: float, time: int): void;
    /** Makes the character move to the seat on the right
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_SHUFFLE_TO_NEXT_CAR_SEAT [0676]*/
    ShuffleToNextCarSeat(char: Char, vehicle: Car): void;
    /** Makes the char sit down for the specified amount of time
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_SIT_DOWN [06B0]*/
    SitDown(handle: Char, time: int): void;
    /** Makes the character flee from another character
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_SMART_FLEE_CHAR [05DD]*/
    SmartFleeChar(handle: Char, threat: Char, radius: float, time: int): void;
    /** Makes the character run away from the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_SMART_FLEE_POINT [05DC]*/
    SmartFleePoint(handle: Char, x: float, y: float, z: float, radius: float, time: int): void;
    /** Makes the character stand still
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_STAND_STILL [05BA]*/
    StandStill(handle: Char, time: int): void;
    /** Makes the character stay in the same place
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_STAY_IN_SAME_PLACE [0638]*/
    StayInSamePlace(handle: Char, state: boolean): void;
    SwimToCoord(handle: Char, x: float, y: float, z: float): void;
    /** Makes the char stop to regain breath
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_TIRED [05BD]*/
    Tired(handle: Char, time: int): void;
    /** Makes the character crouch
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_TOGGLE_DUCK [04EB]*/
    ToggleDuck(handle: Char, state: boolean): void;
    TogglePedThreatScanner(handle: Char, onFoot: boolean, inCar: boolean, duringScriptTask: boolean): void;
    /** Makes a character face another character
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_TURN_CHAR_TO_FACE_CHAR [0639]*/
    TurnCharToFaceChar(char: Char, target: Char): void;
    TurnCharToFaceCoord(handle: Char, x: float, y: float, z: float): void;
    /** Makes a character use an ATM machine
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_USE_ATM [05C7]*/
    UseAtm(handle: Char): void;
    UseAttractor(char: Char, attractor: Attractor): void;
    UseClosestMapAttractor(handle: Char, radius: float, modelId: int, fromX: float, fromY: float, fromZ: float, name: string): void;
    /** Makes a character pull out a cellphone, answer it, and hold it to their ear
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_USE_MOBILE_PHONE [0729]*/
    UseMobilePhone(handle: Char, start: boolean): void;
    /** Makes the character walk alongside the specified character
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_WALK_ALONGSIDE_CHAR [0859]*/
    WalkAlongsideChar(handle: Char, target: Char): void;
    /** Makes the character walk around the ped path
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_WANDER_STANDARD [05DE]*/
    WanderStandard(handle: Char): void;
    /** Warps the character into the specified vehicle's driver seat
    *
    * https://library.sannybuilder.com/#/sa?q=TASK_WARP_CHAR_INTO_CAR_AS_DRIVER [072A]*/
    WarpCharIntoCarAsDriver(char: Char, vehicle: Car): void;
    WarpCharIntoCarAsPassenger(char: Char, vehicle: Car, seatId: int): void;
    WeaponRoll(handle: Char, direction: boolean): void;
}
declare var Task: Task
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Text */
interface Text {
    /** Adds or updates the text associated with the dynamic GXT key. It does nothing if the same key is defined in a FXT file
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_TEXT_LABEL [0ADF]*/
    AddLabel(dynamicKey: string, text: string): void;
    /** Adds or updates the text associated with the dynamic GXT key. It does nothing if the same key is defined in a FXT file
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_TEXT_LABEL_FORMATTED [2609]*/
    AddLabelFormatted(dynamicKey: string, format: string, ...args: number[]): void;
    /** Sets whether the next text is added to the brief in the menu
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_NEXT_MESSAGE_TO_PREVIOUS_BRIEFS [09C1]*/
    AddNextMessageToPreviousBriefs(state: boolean): void;
    /** Removes the text box from the screen
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_HELP [03E6]*/
    ClearHelp(): void;
    /** Clears all priority text and some styles of big texts
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_PRINTS [00BE]*/
    ClearPrints(): void;
    /** Clears small messages from the screen
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_SMALL_PRINTS [03EB]*/
    ClearSmallPrints(): void;
    /** Removes the styled text from the screen
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_THIS_BIG_PRINT [03D6]*/
    ClearThisBigPrint(key: string): void;
    /** Removes the priority text from the screen
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_THIS_PRINT [03D5]*/
    ClearThisPrint(key: string): void;
    /** Removes the print big text with the specified style from the screen
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_THIS_PRINT_BIG_NOW [0A0E]*/
    ClearThisPrintBigNow(textStyle: int): void;
    /** Checks if text contains specified text
    *
    * https://library.sannybuilder.com/#/sa?q=IS_TEXT_IN_TEXT [2602]*/
    Contains(text: string, subText: string, ignoreCase: boolean): boolean;
    /** Copies the string to the specified address
    *
    * https://library.sannybuilder.com/#/sa?q=COPY_STRING [0D4D]*/
    CopyString(string: string, address: int): void;
    /** Cuts stringAddress at the specified character index
    *
    * https://library.sannybuilder.com/#/sa?q=CUT_STRING_AT [0EC5]*/
    CutStringAt(stringAddress: int, index: int): void;
    /** Draws text at the specified on-screen position
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_TEXT [033E]*/
    Display(offsetLeft: float, offsetTop: float, key: string): void;
    /** Formats args according to the format string then draws text at the specified on-screen position. See 033E
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_TEXT_FORMATTED [2605]*/
    DisplayFormatted(offsetLeft: float, offsetTop: float, format: string, ...args: number[]): void;
    /** Overrides the text block set by 09BD
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_NON_MINIGAME_HELP_MESSAGES [0A44]*/
    DisplayNonMinigameHelpMessages(state: boolean): void;
    /** Draws text with two numbers
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_TEXT_WITH_2_NUMBERS [045B]*/
    DisplayWith2Numbers(offsetLeft: float, offsetTop: float, key: string, num1: int, num2: int): void;
    /** Converts the float to two separate numbers to use in a 2-numbered GXT entry, and draws the text
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_TEXT_WITH_FLOAT [07FC]*/
    DisplayWithFloat(leftTopX: float, leftTopY: float, key: string, value: float, precision: int): void;
    /** Draws text with one number
    *
    * https://library.sannybuilder.com/#/sa?q=DISPLAY_TEXT_WITH_NUMBER [045A]*/
    DisplayWithNumber(offsetLeft: float, offsetTop: float, key: string, num: int): void;
    /** Sets whether the styled text stays on the screen when it fades out
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_ODDJOB_TITLE_BEFORE_FADE [0A2D]*/
    DrawOddjobTitleBeforeFade(state: boolean): void;
    /** Draws string once on specific drawing event
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_STRING [0E62]*/
    DrawString(string: string, drawEvent: int, posX: float, posY: float, sizeX: float, sizeY: float, fixAr: boolean, font: int): void;
    /** Draws string once on specific drawing event with extended text styling
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_STRING_EXT [0E63]*/
    DrawStringExt(string: string, drawEvent: int, posX: float, posY: float, sizeX: float, sizeY: float, fixAr: boolean, font: int, prop: boolean, align: int, wrap: float, justify: boolean, red: int, green: int, blue: int, alpha: int, edge: int, shadow: int, dropRed: int, dropGreen: int, dropBlue: int, dropAlpha: int, background: boolean, backRed: int, backGreen: int, backBlue: int, backAlpha: int): void;
    /** Sets whether the text stays on the screen when it fades out
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_SUBTITLES_BEFORE_FADE [0A2C]*/
    DrawSubtitlesBeforeFade(state: boolean): void;
    /** Checks if text ends with specified suffix text
    *
    * https://library.sannybuilder.com/#/sa?q=IS_TEXT_SUFFIX [2604]*/
    EndsWith(text: string, suffix: string, ignoreCase: boolean): boolean;
    /** Returns the CRC hash of the input string
    *
    * https://library.sannybuilder.com/#/sa?q=GET_HASH_KEY [09A9]*/
    GetHashKey(text: string): int;
    /** Returns the text associated with the GXT key
    *
    * https://library.sannybuilder.com/#/sa?q=GET_TEXT_LABEL_STRING [0ADE]*/
    GetLabelString(key: string): string;
    /** Returns count of characters in the text
    *
    * https://library.sannybuilder.com/#/sa?q=GET_TEXT_LENGTH [2608]*/
    GetLength(text: string): int;
    /** Returns the string length
    *
    * https://library.sannybuilder.com/#/sa?q=GET_STRING_LENGTH [0D4C]*/
    GetStringLength(text: string): int;
    /** Gets the width of the GXT entry string
    *
    * https://library.sannybuilder.com/#/sa?q=GET_STRING_WIDTH [09FD]*/
    GetStringWidth(entry: string): int;
    /** Gets the width of the GXT entry string with the specified number
    *
    * https://library.sannybuilder.com/#/sa?q=GET_STRING_WIDTH_WITH_NUMBER [0A08]*/
    GetStringWidthWithNumber(gxtEntry: string, number: int): int;
    /** Checks if string length is equal to zero
    *
    * https://library.sannybuilder.com/#/sa?q=IS_TEXT_EMPTY [2600]*/
    IsEmpty(string: string): boolean;
    /** Compares two texts
    *
    * https://library.sannybuilder.com/#/sa?q=IS_TEXT_EQUAL [2601]*/
    IsEqual(text: string, another: string, ignoreCase: boolean): boolean;
    /** Returns true if any help message is being displayed
    *
    * https://library.sannybuilder.com/#/sa?q=IS_HELP_MESSAGE_BEING_DISPLAYED [08FE]*/
    IsHelpMessageBeingDisplayed(): boolean;
    /** Returns true if a priority GXT string is displayed on screen
    *
    * https://library.sannybuilder.com/#/sa?q=IS_MESSAGE_BEING_DISPLAYED [076F]*/
    IsMessageBeingDisplayed(): boolean;
    /** Returns True if the specified characters are found at the index of the string
    *
    * https://library.sannybuilder.com/#/sa?q=IS_STRING_CHARACTER_AT [0EC6]*/
    IsStringCharacterAt(string: string, characters: string, index: int): boolean;
    /** Returns True if the string starts with a hash (#), semicolon (;) or double slash (//)
    *
    * https://library.sannybuilder.com/#/sa?q=IS_STRING_COMMENT [0E81]*/
    IsStringComment(string: string): boolean;
    /** Returns True if string1 and string2 match
    *
    * https://library.sannybuilder.com/#/sa?q=IS_STRING_EQUAL [0E80]*/
    IsStringEqual(string1: string, string2: string, maxSize: int, caseSensitive: boolean, ignoreCharacter: string): boolean;
    /** Returns true if a help message with the specified GXT entry is being displayed
    *
    * https://library.sannybuilder.com/#/sa?q=IS_THIS_HELP_MESSAGE_BEING_DISPLAYED [0A2A]*/
    IsThisHelpMessageBeingDisplayed(gxt: string): boolean;
    /** Loads GXT texts from selected FXT dictionary file
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_FXT [2606]*/
    LoadFxt(filepath: string): boolean;
    /** Makes the game use GXT Entries from the specified GXT Table
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_MISSION_TEXT [054C]*/
    LoadMissionText(tableName: string): void;
    /** Displays a message positioned on the bottom of the screen for the specified time
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT [00BB]*/
    Print(key: string, time: int, flag: int): void;
    /** Displays a styled message for the specified time
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_BIG [00BA]*/
    PrintBig(key: string, time: int, style: int): void;
    /** Formats args according to the format string, then displays it similarly to PRINT_BIG
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_BIG_FORMATTED [0ACF]*/
    PrintBigFormatted(format: string, time: int, style: int, ...args: number[]): void;
    /** Displays a low-priority styled message for the specified time
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_BIG_Q [0217]*/
    PrintBigQ(key: string, duration: int, style: int): void;
    /** Displays a custom text (provided as a literal or an address) similarly to PRINT_BIG
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_BIG_STRING [0ACB]*/
    PrintBigString(text: string, time: int, style: int): void;
    /** Formats args according to the format string, then displays it similarly to PRINT
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_FORMATTED [0AD0]*/
    PrintFormatted(format: string, time: int, ...args: number[]): void;
    /** Formats args according to the format string, then displays it similarly to PRINT_NOW
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_FORMATTED_NOW [0AD1]*/
    PrintFormattedNow(format: string, time: int, ...args: number[]): void;
    /** Displays a black text box for a few seconds
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_HELP [03E5]*/
    PrintHelp(key: string): void;
    /** Shows a text box which stays on screen until it is removed by another command
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_HELP_FOREVER [0512]*/
    PrintHelpForever(key: string): void;
    /** Shows a text box with one number
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_HELP_FOREVER_WITH_NUMBER [0513]*/
    PrintHelpForeverWithNumber(gxt: string, number: int): void;
    /** Displays a black text box for a few seconds respecting the format of the String entered
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_HELP_FORMATTED [0ACE]*/
    PrintHelpFormatted(text: string, ...args: number[]): void;
    /** Displays a custom text (provided as a literal or an address) in a black box similarly to PRINT_HELP
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_HELP_STRING [0ACA]*/
    PrintHelpString(text: string): void;
    /** Displays a message positioned on the bottom of the screen for the specified time
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_NOW [00BC]*/
    PrintNow(key: string, time: int, flag: int): void;
    /** Displays a custom text (provided as a literal or an address) similarly to PRINT
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_STRING [0ACC]*/
    PrintString(text: string, time: int): void;
    /** Displays a styled message in which the first string token ~a~ is substituted with the specified text
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_STRING_IN_STRING_NOW [0384]*/
    PrintStringInStringNow(templateKey: string, replacementKey: string, duration: int, style: int): void;
    /** Displays a custom text (provided as a literal or an address) similarly to PRINT_NOW
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_STRING_NOW [0ACD]*/
    PrintStringNow(text: string, time: int): void;
    /** Displays a styled message in which the first two ~1~ tokens are substituted with the specified numbers
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_WITH_2_NUMBERS_BIG [036D]*/
    PrintWith2NumbersBig(key: string, num1: int, num2: int, duration: int, style: int): void;
    /** Displays a styled message in which the first two ~1~ tokens are substituted with the specified numbers
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_WITH_2_NUMBERS_NOW [02FD]*/
    PrintWith2NumbersNow(key: string, num1: int, num2: int, duration: int, style: int): void;
    /** Displays a styled message in which the first three ~1~ tokens are substituted with the specified numbers
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_WITH_3_NUMBERS [02FF]*/
    PrintWith3Numbers(key: string, num1: int, num2: int, num3: int, duration: int, style: int): void;
    /** Displays a styled message in which the first four ~1~ tokens are substituted with the specified numbers
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_WITH_4_NUMBERS [0302]*/
    PrintWith4Numbers(key: string, num1: int, num2: int, num3: int, num4: int, duration: int, style: int): void;
    /** Displays a styled message in which the first four ~1~ tokens are substituted with the specified numbers
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_WITH_4_NUMBERS_NOW [0303]*/
    PrintWith4NumbersNow(key: string, num1: int, num2: int, num3: int, num4: int, duration: int, style: int): void;
    /** Displays a styled message in which the first six ~1~ tokens are substituted with the specified numbers
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_WITH_6_NUMBERS [0308]*/
    PrintWith6Numbers(key: string, num1: int, num2: int, num3: int, num4: int, num5: int, num6: int, duration: int, style: int): void;
    /** Displays a styled message in which the first string token ~1~ is substituted with the specified number
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_WITH_NUMBER [01E4]*/
    PrintWithNumber(key: string, num: int, duration: int, flag: int): void;
    /** Displays a styled message in which the first string token~1~ is substituted with the specified number
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_WITH_NUMBER_BIG [01E3]*/
    PrintWithNumberBig(key: string, num: int, duration: int, style: int): void;
    /** Displays a styled message in which the first string token ~1~ is substituted with the specified number
    *
    * https://library.sannybuilder.com/#/sa?q=PRINT_WITH_NUMBER_NOW [01E5]*/
    PrintWithNumberNow(key: string, num: int, duration: int, flag: int): void;
    /** Deletes the key and associated text created with ADD_TEXT_LABEL or defined in a FXT file
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_TEXT_LABEL [0AE0]*/
    RemoveLabel(key: string): void;
    /** Extracts data from a string using sscanf
    *
    * https://library.sannybuilder.com/#/sa?q=SCAN_STRING [0AD4]*/
    ScanString(string: string, format: string): {
        nValues: int;
        values: number[];
    } | undefined;
    /** Displays the text of the specified GXT entry using San Andreas' area name text style
    *
    * https://library.sannybuilder.com/#/sa?q=SET_AREA_NAME [0A19]*/
    SetAreaName(name: string): void;
    /** Gives the text a background (0346)
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TEXT_BACKGROUND [0345]*/
    SetBackground(state: boolean): void;
    /** Centers the text
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TEXT_CENTRE [0342]*/
    SetCenter(state: boolean): void;
    /** Sets the line width of the centered text
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TEXT_CENTRE_SIZE [0344]*/
    SetCenterSize(width: float): void;
    /** Sets the color of the text letters
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TEXT_COLOUR [0340]*/
    SetColor(red: int, green: int, blue: int, alpha: int): void;
    /** Causes the next text to be drawn before the fade is drawn
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TEXT_DRAW_BEFORE_FADE [03E0]*/
    SetDrawBeforeFade(state: boolean): void;
    /** Sets shadow for the current text draw
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TEXT_DROPSHADOW [060D]*/
    SetDropshadow(intensity: int, red: int, green: int, blue: int, alpha: int): void;
    /** Adds an outline to the next text drawn using a text draw command
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TEXT_EDGE [081C]*/
    SetEdge(size: int, red: int, green: int, blue: int, alpha: int): void;
    /** Sets the text draw font
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TEXT_FONT [0349]*/
    SetFont(font: int): void;
    /** Sets the global width of text boxes displayed on screen
    *
    * https://library.sannybuilder.com/#/sa?q=SET_HELP_MESSAGE_BOX_SIZE [0989]*/
    SetHelpMessageBoxSize(size: int): void;
    /** Sets the text to be drawn justified, which means the text will wrap in order to fill an even rectangle of space
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TEXT_JUSTIFY [0341]*/
    SetJustify(state: boolean): void;
    /** Overrides the position of the text on screen
    *
    * https://library.sannybuilder.com/#/sa?q=SET_MESSAGE_FORMATTING [0912]*/
    SetMessageFormatting(customPosition: boolean, margin: int, width: int): void;
    /** Makes the text size proportionate
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TEXT_PROPORTIONAL [0348]*/
    SetProportional(state: boolean): void;
    /** Sets the text draw to be aligned to the right
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TEXT_RIGHT_JUSTIFY [03E4]*/
    SetRightJustify(state: boolean): void;
    /** Scales the width and height of the text letters
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TEXT_SCALE [033F]*/
    SetScale(widthScale: float, heightScale: float): void;
    /** Sets the string at the specified address to all lower case
    *
    * https://library.sannybuilder.com/#/sa?q=SET_STRING_LOWER [0EC3]*/
    SetStringLower(stringAddress: int): void;
    /** Sets the string at the specified address to all upper case
    *
    * https://library.sannybuilder.com/#/sa?q=SET_STRING_UPPER [0EC2]*/
    SetStringUpper(stringAddress: int): void;
    /** Sets the line width of the text
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TEXT_WRAPX [0343]*/
    SetWrapX(width: float): void;
    /** Checks if text starts with specified prefix text
    *
    * https://library.sannybuilder.com/#/sa?q=IS_TEXT_PREFIX [2603]*/
    StartsWith(text: string, prefix: string, ignoreCase: boolean): boolean;
    /** Returns the character index where strFind is found within stringOrigin
    *
    * https://library.sannybuilder.com/#/sa?q=STRING_FIND [0EC4]*/
    StringFind(stringFind: int, stringOrigin: string, strFind: string): int | undefined;
    StringFloatFormat(number: float, format: string): string;
    /** Formats a text according to the format string and given arguments and writes it in the result
    *
    * https://library.sannybuilder.com/#/sa?q=STRING_FORMAT [0AD3]*/
    StringFormat(result: string, format: string, ...args: number[]): void;
    /** Unloads GXT labels defined in selected Fxt file
    *
    * https://library.sannybuilder.com/#/sa?q=UNLOAD_FXT [2607]*/
    UnloadFxt(filepath: string): boolean;
    /** Enables text and texture drawing
    *
    * https://library.sannybuilder.com/#/sa?q=USE_TEXT_COMMANDS [03F0]*/
    UseCommands(state: boolean): void;
}
declare var Text: Text
/** Class Texture
 * 
 * https://library.sannybuilder.com/#/sa/classes/Texture */
interface Texture {
    /** Loads texture from BMP file. Can be used with texture memory option to load file from memory
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_TEXTURE_FROM_BMP_FILE [0D61]*/
    LoadFromBmpFile(bmp: string, mask: string): int | undefined;
    /** Loads texture from DDS file
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_TEXTURE_FROM_DDS_FILE [0D7C]*/
    LoadFromDdsFile(dds: string): int | undefined;
    /** Loads texture from PNG file. Can be used with texturememory option to load file from memory
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_TEXTURE_FROM_PNG_FILE [0D64]*/
    LoadFromPngFile(png: string): int | undefined;
    /** Cleans loaded texture
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAN_LOADED_TEXTURE [0D7D]*/
    cleanLoaded(): void;
}
declare var Texture: Texture
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Train */
declare class Train {
    constructor(handle: number);
    /** Creates a script handled train from a predefined type (the type dictates how long the train is and the varieties of carriages) and sets the direction for the train to head in
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_MISSION_TRAIN [06D8]*/
    static Create(type: int, x: float, y: float, z: float, direction: boolean): Train;
    /** Removes the specified script created train
    *
    * https://library.sannybuilder.com/#/sa?q=DELETE_MISSION_TRAIN [07BD]*/
    delete(): void;
    /** Returns true if the train is travelling clockwise, around San Andreas
    *
    * https://library.sannybuilder.com/#/sa?q=FIND_TRAIN_DIRECTION [09E3]*/
    findDirection(): boolean;
    /** Gets the handle of the last carriage (known as the "caboose")
    *
    * https://library.sannybuilder.com/#/sa?q=GET_TRAIN_CABOOSE [06DE]*/
    getCaboose(): Car;
    /** Gets the nth train carriage
    *
    * https://library.sannybuilder.com/#/sa?q=GET_TRAIN_CARRIAGE [078A]*/
    getCarriage(number: int): Car;
    /** Returns true if the train has derailed (usually from going too fast)
    *
    * https://library.sannybuilder.com/#/sa?q=HAS_TRAIN_DERAILED [0981]*/
    hasDerailed(): boolean;
    /** Returns true if the next station is accessible (at the start of the game, railroad blocks prevent the player from travelling to stations whose area is not unlocked)
    *
    * https://library.sannybuilder.com/#/sa?q=IS_NEXT_STATION_ALLOWED [0A06]*/
    isNextStationAllowed(): boolean;
    /** Removes the specified script created train from the list of trains that the game shouldn't delete
    *
    * https://library.sannybuilder.com/#/sa?q=MARK_MISSION_TRAIN_AS_NO_LONGER_NEEDED [07BE]*/
    markAsNoLongerNeeded(): Train;
    /** Puts the train on the rails nearest to the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=SET_MISSION_TRAIN_COORDINATES [07C7]*/
    setCoordinates(x: float, y: float, z: float): Train;
    /** Sets the trains speed
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TRAIN_CRUISE_SPEED [06DD]*/
    setCruiseSpeed(speed: float): Train;
    /** Sets whether the train should stop at each station it encounters
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TRAIN_FORCED_TO_SLOW_DOWN [09CF]*/
    setForcedToSlowDown(state: boolean): Train;
    /** Sets the trains acceleration
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TRAIN_SPEED [06DC]*/
    setSpeed(speed: float): Train;
    /** Puts the script created train at the next allowed station
    *
    * https://library.sannybuilder.com/#/sa?q=SKIP_TO_NEXT_ALLOWED_STATION [0A07]*/
    skipToNextAllowedStation(): Train;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Txd */
interface Txd {
    /** Draws RwTexture or sprite ID once on specific drawing event and optional mask, no limits
    *
    * https://library.sannybuilder.com/#/sa?q=DRAW_TEXTURE_PLUS [0E1E]*/
    DrawTexturePlus(rwTextureOrSprite: int, drawEvent: int, posX: float, posY: float, sizeX: float, sizeY: float, angle: float, depth: float, fixAr: boolean, maskVertCount: int, maskVertArray: int, red: int, green: int, blue: int, alpha: int): void;
    /** Returns the rwTexture pointer from sprite index
    *
    * https://library.sannybuilder.com/#/sa?q=GET_TEXTURE_FROM_SPRITE [0E3C]*/
    GetTextureFromSprite(sprite: int): int;
    /** Loads the texture dictionary for use in drawing sprites (038D) on the screen
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_TEXTURE_DICTIONARY [0390]*/
    LoadDictionary(name: string): void;
    /** Loads a sprite from the most recently loaded texture dictionary (0390)
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_SPRITE [038F]*/
    LoadSprite(memorySlot: int, spriteName: string): void;
    /** Unloads all currently loaded textures (038F), as well as texture dictionaries (0390), freeing game memory
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_TEXTURE_DICTIONARY [0391]*/
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
    * https://library.sannybuilder.com/#/sa?q=CREATE_USER_3D_MARKER [0A40]*/
    static Create(x: float, y: float, z: float, color: int): User3DMarker;
    /** Destroys a marker created with 0A40
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_USER_3D_MARKER [0A41]*/
    remove(): void;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Weapon */
interface Weapon {
    /** Gets the model ID of the weapon according to the weapon type
    *
    * https://library.sannybuilder.com/#/sa?q=GET_WEAPONTYPE_MODEL [0781]*/
    GetModel(weaponType: int): int;
    GetSlot(weaponType: int): int;
    /** Returns a pointer to the CWeaponInfo struct of the the specified weaponType and weaponSkill
    *
    * https://library.sannybuilder.com/#/sa?q=GET_WEAPONINFO [0E84]*/
    GetWeaponInfo(weaponType: int, weaponSkill: int): WeaponInfo | undefined;
    /** Checks if the weapon has the specified fire type
    *
    * https://library.sannybuilder.com/#/sa?q=IS_WEAPON_FIRE_TYPE [0E26]*/
    IsFireType(weaponType: int, weaponFire: int): boolean;
}
declare var Weapon: Weapon
/** Class WeaponInfo
 * 
 * https://library.sannybuilder.com/#/sa/classes/WeaponInfo */
interface WeaponInfo {
    /** Returns the FireType of the current weaponInfo struct
    *
    * https://library.sannybuilder.com/#/sa?q=GET_WEAPONINFO_ANIMGROUP [0E87]*/
    getAnimgroup(): int;
    /** Returns the FireType of the current weaponInfo struct
    *
    * https://library.sannybuilder.com/#/sa?q=GET_WEAPONINFO_FIRE_TYPE [0E89]*/
    getFireType(): int;
    /** Returns the flags of the specified WeaponInfo struct
    *
    * https://library.sannybuilder.com/#/sa?q=GET_WEAPONINFO_FLAGS [0E86]*/
    getFlags(): int;
    /** Returns the model1 and model2 of the current weaponInfo struct
    *
    * https://library.sannybuilder.com/#/sa?q=GET_WEAPONINFO_MODELS [0E85]*/
    getModels(): {
        model1: int;
        model2: int;
    };
    /** Returns the weaponSlot of the current weaponInfo struct
    *
    * https://library.sannybuilder.com/#/sa?q=GET_WEAPONINFO_SLOT [0E8A]*/
    getSlot(): int;
    /** Returns the totalClip size for the current weaponInfo struct
    *
    * https://library.sannybuilder.com/#/sa?q=GET_WEAPONINFO_TOTAL_CLIP [0E88]*/
    getTotalClip(): int;
}
declare var WeaponInfo: WeaponInfo
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Weather */
interface Weather {
    /** Forces the game weather to the specified type
    *
    * https://library.sannybuilder.com/#/sa?q=FORCE_WEATHER [01B5]*/
    Force(type: int): void;
    /** Forces the upcoming weather to the specified type
    *
    * https://library.sannybuilder.com/#/sa?q=FORCE_WEATHER_NOW [01B6]*/
    ForceNow(type: int): void;
    /** Gets weather type that is being blended from
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CURRENT_WEATHER [0D59]*/
    GetCurrent(): int;
    /** Returns the intensity of the night filter
    *
    * https://library.sannybuilder.com/#/sa?q=GET_DAY_NIGHT_BALANCE [0E6C]*/
    GetDayNightBalance(): float;
    /** Returns the forced weather type
    *
    * https://library.sannybuilder.com/#/sa?q=GET_FORCED_WEATHER [0EB0]*/
    GetForced(): int;
    /** Gets weather type that is being blended to
    *
    * https://library.sannybuilder.com/#/sa?q=GET_NEXT_WEATHER [0E04]*/
    GetNext(): int;
    /** Gets rain intensity in range of 0.0 to 1.0
    *
    * https://library.sannybuilder.com/#/sa?q=GET_RAIN_INTENSITY [0E06]*/
    GetRainIntensity(): float;
    /** Returns the intensity of the underwater filter
    *
    * https://library.sannybuilder.com/#/sa?q=GET_UNDERWATERNESS [0E6D]*/
    GetUnderwaterness(): float;
    /** Allows the game to continue its usual weather pattern after using 01B5
    *
    * https://library.sannybuilder.com/#/sa?q=RELEASE_WEATHER [01B7]*/
    Release(): void;
    /** Specifies whether the heat haze effect should be enabled in sunny conditions
    *
    * https://library.sannybuilder.com/#/sa?q=SET_HEATHAZE_EFFECT [08FD]*/
    SetHeathazeEffect(state: boolean): void;
    /** Sets weather type which will be blend to
    *
    * https://library.sannybuilder.com/#/sa?q=SET_NEXT_WEATHER [0E05]*/
    SetNext(type: int): void;
    /** Sets rain intensity in range of 0.0 to 1.0
    *
    * https://library.sannybuilder.com/#/sa?q=SET_RAIN_INTENSITY [0E07]*/
    SetRainIntensity(intensity: float): void;
    /** Sets the weather appropriate to the weather region the player is currently in
    *
    * https://library.sannybuilder.com/#/sa?q=SET_WEATHER_TO_APPROPRIATE_TYPE_NOW [0915]*/
    SetToAppropriateTypeNow(): void;
}
declare var Weather: Weather
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/World */
interface World {
    /** Returns the handle of a random car with the specified model in the specified 2D area, or -1 otherwise
    *
    * https://library.sannybuilder.com/#/sa?q=GET_RANDOM_CAR_OF_TYPE_IN_AREA [0327]*/
    GetRandomCarOfTypeInArea(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, modelId: int): Car;
    /** Returns the character using a map attractor with the specified model in the specified area
    *
    * https://library.sannybuilder.com/#/sa?q=GET_USER_OF_CLOSEST_MAP_ATTRACTOR [091C]*/
    GetUserOfClosestMapAttractor(x: float, y: float, z: float, radius: float, modelId: int, attractorName: string): Char;
    /** Creates a trigger zone for police to appear during chases
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_SET_PIECE [04F8]*/
    AddSetPiece(type: int, fromX: float, fromY: float, toX: float, toY: float, spawnPoliceAAtX: float, spawnPoliceAAtY: float, headedTowardsAAtX: float, headedTowardsAAtY: float, spawnPoliceBAtX: float, spawnPoliceBAtY: float, headedTowardsBAtX: float, headedTowardsBAtY: float): void;
    /** Creates a trigger for a Unique Jump bonus
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_STUNT_JUMP [0814]*/
    AddStuntJump(startX: float, startY: float, startZ: float, startRadiusX: float, startRadiusY: float, startRadiusZ: float, finishX: float, finishY: float, finishZ: float, finishRadiusX: float, finishRadiusY: float, finishRadiusZ: float, cameraX: float, cameraY: float, cameraZ: float, reward: int): void;
    /** Marks all fires as no longer needed, allowing them to disappear
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_ALL_SCRIPT_FIRE_FLAGS [0986]*/
    ClearAllScriptFireFlags(): void;
    /** Removes references to all created roadblocks (04C0), freeing game memory
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_ALL_SCRIPT_ROADBLOCKS [04C1]*/
    ClearAllScriptRoadblocks(): void;
    /** Clears the area, removing all vehicles and pedestrians that are not marked as needed by a mission
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_AREA [0395]*/
    ClearArea(x: float, y: float, z: float, radius: float, clearParticles: boolean): void;
    /** Clears all cars in the specified 3D area
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_AREA_OF_CARS [03BA]*/
    ClearAreaOfCars(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): void;
    /** Clears all pedestrians from the given area
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_AREA_OF_CHARS [042B]*/
    ClearAreaOfChars(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): void;
    /** Clears the extra color of the sky
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_EXTRA_COLOURS [04FA]*/
    ClearExtraColors(withFade: boolean): void;
    /** Returns 2D screen position and distance related text size for world coordinates between nearClip and farClip
    *
    * https://library.sannybuilder.com/#/sa?q=CONVERT_3D_TO_SCREEN_2D [0E3F]*/
    Convert3DToScreen2D(x: float, y: float, z: float, nearClip: boolean, farClip: boolean): {
        x: float;
        y: float;
        sizeX: float;
        sizeY: float;
    } | undefined;
    /** Creates a flock of birds flying in the specified direction
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_BIRDS [0876]*/
    CreateBirds(xFrom: float, yFrom: float, zFrom: float, xTo: float, yTo: float, zTo: float, quantity: int, type: int): void;
    /** Creates an emergency service vehicle on the closest road to the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_EMERGENCY_SERVICES_CAR [085A]*/
    CreateEmergencyServicesCar(model: int, x: float, y: float, z: float): void;
    /** Starts spawning random cars at the specified location
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_RANDOM_CAR_FOR_CAR_PARK [03C5]*/
    CreateRandomCarForCarPark(x: float, y: float, z: float, heading: float): void;
    /** Creates a roadblock in the specified area with the specified type
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_SCRIPT_ROADBLOCK [04C0]*/
    CreateScriptRoadblock(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, type: int): void;
    /** Destroys all trains, including those that are not created by the script
    *
    * https://library.sannybuilder.com/#/sa?q=DELETE_ALL_TRAINS [06DB]*/
    DeleteAllTrains(): void;
    /** Destroys all script-created trains
    *
    * https://library.sannybuilder.com/#/sa?q=DELETE_MISSION_TRAINS [06D9]*/
    DeleteMissionTrains(): void;
    /** Disables all entry/exit markers
    *
    * https://library.sannybuilder.com/#/sa?q=DISABLE_ALL_ENTRY_EXITS [08E7]*/
    DisableAllEntryExits(state: boolean): void;
    /** Removes all fires within the specified area
    *
    * https://library.sannybuilder.com/#/sa?q=EXTINGUISH_FIRE_AT_POINT [0980]*/
    ExtinguishFireAtPoint(x: float, y: float, z: float, radius: float): void;
    FireSingleBullet(fromX: float, fromY: float, fromZ: float, toX: float, toY: float, toZ: float, energy: int): void;
    /** Returns the handle of anyCar in the pool, starting at the previously returned progress index
    *
    * https://library.sannybuilder.com/#/sa?q=GET_ANY_CAR_NO_SAVE_RECURSIVE [0EA8]*/
    GetAnyCarNoSaveRecursive(progress: int): {
        progress: int;
        anyCar: Car;
    } | undefined;
    /** Returns the handle of anyChar in the pool, starting at the previously returned progress index
    *
    * https://library.sannybuilder.com/#/sa?q=GET_ANY_CHAR_NO_SAVE_RECURSIVE [0EA7]*/
    GetAnyCharNoSaveRecursive(progress: int): {
        progress: int;
        anyChar: Char;
    } | undefined;
    /** Returns the handle of anyObject in the pool, starting at the previously returned progress index
    *
    * https://library.sannybuilder.com/#/sa?q=GET_ANY_OBJECT_NO_SAVE_RECURSIVE [0EA9]*/
    GetAnyObjectNoSaveRecursive(progress: int): {
        progress: int;
        anyObject: ScriptObject;
    } | undefined;
    /** Returns the city the specified location is within
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CITY_FROM_COORDS [07EF]*/
    GetCityFromCoords(x: float, y: float, z: float): int;
    /** Returns the closestCop to the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CLOSEST_COP_NEAR_POS [0EA6]*/
    GetClosestCopNearPos(x: float, y: float, z: float, radius: float, alive: boolean, inCar: boolean, onFoot: boolean): Char | undefined;
    /** Gets the closest object which can be stolen for burglary missions
    *
    * https://library.sannybuilder.com/#/sa?q=GET_CLOSEST_STEALABLE_OBJECT [0866]*/
    GetClosestStealableObject(x: float, y: float, z: float, radius: float): ScriptObject;
    /** Returns 2D coordinates for a location relative to x and y at the specified angle and distance
    *
    * https://library.sannybuilder.com/#/sa?q=GET_COORD_FROM_ANGLED_DISTANCE [0EF0]*/
    GetCoordFromAngledDistance(x: float, y: float, angle: float, distance: float): {
        x: float;
        y: float;
    };
    /** Returns appropriate coordinates for creating a pickup by a dead character
    *
    * https://library.sannybuilder.com/#/sa?q=GET_DEAD_CHAR_PICKUP_COORDS [04A5]*/
    GetDeadCharPickupCoords(char: Char): {
        x: float;
        y: float;
        z: float;
    };
    /** Stores the ground position at the location
    *
    * https://library.sannybuilder.com/#/sa?q=GET_GROUND_Z_FOR_3D_COORD [02CE]*/
    GetGroundZFor3DCoord(x: float, y: float, z: float): float;
    GetNearestTagPosition(xCoord: float, yCoord: float, zCoord: float): {
        x: float;
        y: float;
        z: float;
    };
    /** Gets the number of fires within the specified area
    *
    * https://library.sannybuilder.com/#/sa?q=GET_NUMBER_OF_FIRES_IN_AREA [0786]*/
    GetNumberOfFiresInArea(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): int;
    GetNumberOfFiresInRange(x: float, y: float, z: float, radius: float): int;
    /** Stores the coordinates of the nearest car park node in the specified area
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PARKING_NODE_IN_AREA [0810]*/
    GetParkingNodeInArea(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): {
        x: float;
        y: float;
        z: float;
    };
    /** Gets the percentage of the number of tags sprayed in the area
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PERCENTAGE_TAGGED_IN_AREA [0702]*/
    GetPercentageTaggedInArea(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float): int;
    /** Returns the handle of a pickup at the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=GET_PICKUP_THIS_COORD [0E33]*/
    GetPickupThisCoord(x: float, y: float, z: float, onlyValid: boolean): Pickup | undefined;
    GetRandomCarInSphereNoSave(x: float, y: float, z: float, radius: float, model: int): Car;
    GetRandomCarInSphereNoSaveRecursive(x: float, y: float, z: float, radius: float, findNext: boolean, skipWrecked: boolean): Car | undefined;
    GetRandomCarOfTypeInAngledAreaNoSave(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, angle: float, modelId: int): Car;
    /** Loops through the pool of vehicles to retrieve one that matches the specified model in the specified 2D area
    *
    * https://library.sannybuilder.com/#/sa?q=GET_RANDOM_CAR_OF_TYPE_IN_AREA_NO_SAVE [053E]*/
    GetRandomCarOfTypeInAreaNoSave(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, modelId: int): Car;
    /** Returns the first char in the ped pool within radius of the specified point
    *
    * https://library.sannybuilder.com/#/sa?q=GET_RANDOM_CHAR_IN_AREA_OFFSET_NO_SAVE [0A3E]*/
    GetRandomCharInAreaOffsetNoSave(x: float, y: float, z: float, radiusX: float, radiusY: float, radiusZ: float): Char;
    GetRandomCharInSphere(x: float, y: float, z: float, radius: float, civilian: boolean, gang: boolean, criminal: boolean): Char;
    /** Finds the nearest character to the specified point, in the specified radius
    *
    * https://library.sannybuilder.com/#/sa?q=GET_RANDOM_CHAR_IN_SPHERE_NO_BRAIN [08E5]*/
    GetRandomCharInSphereNoBrain(x: float, y: float, z: float, radius: float): Char;
    GetRandomCharInSphereNoSaveRecursive(x: float, y: float, z: float, radius: float, findNext: boolean, filter: int): Char | undefined;
    /** Loops through the ped pool and returns the first character that is within the specified radius and has the "buys drugs" flag set in peds
    *
    * https://library.sannybuilder.com/#/sa?q=GET_RANDOM_CHAR_IN_SPHERE_ONLY_DRUGS_BUYERS [089E]*/
    GetRandomCharInSphereOnlyDrugsBuyers(x: float, y: float, z: float, radius: float): Char;
    GetRandomObjectInSphereNoSaveRecursive(x: float, y: float, z: float, radius: float, findNext: boolean): ScriptObject | undefined;
    /** Gets the level that the character can hear noise at the specified position
    *
    * https://library.sannybuilder.com/#/sa?q=GET_SOUND_LEVEL_AT_COORDS [0855]*/
    GetSoundLevelAtCoords(handle: Char, x: float, y: float, z: float): float;
    /** Gets the coordinates of the location targeted in the game map
    *
    * https://library.sannybuilder.com/#/sa?q=GET_TARGET_BLIP_COORDS [0AB6]*/
    GetTargetCoords(): {
        x: float;
        y: float;
        z: float;
    } | undefined;
    /** Gets the height of the water at the specified 2D coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=GET_WATER_HEIGHT_AT_COORDS [092E]*/
    GetWaterHeightAtCoords(x: float, y: float, waves: boolean): float;
    HasObjectOfTypeBeenSmashed(x: float, y: float, z: float, radius: float, modelId: int): boolean;
    /** Returns true if the pickup at the specified coordinates is available to be picked up
    *
    * https://library.sannybuilder.com/#/sa?q=IS_ANY_PICKUP_AT_COORDS [048C]*/
    IsAnyPickupAtCoords(x: float, y: float, z: float): boolean;
    /** Returns true if there is anything with the specified properties within the 3D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_AREA_OCCUPIED [0339]*/
    IsAreaOccupied(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, solid: boolean, car: boolean, char: boolean, object: boolean, particle: boolean): boolean;
    IsClosestObjectOfTypeSmashedOrDamaged(x: float, y: float, z: float, radius: float, modelId: int, smashed: boolean, damaged: boolean): boolean;
    /** Returns true if there's any kind of police vehicle in the specified 3D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_COP_VEHICLE_IN_AREA_3D_NO_SAVE [09C3]*/
    IsCopVehicleInArea3DNoSave(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): boolean;
    /** Returns true if there is an explosion of the specified type in the 3D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_EXPLOSION_IN_AREA [0356]*/
    IsExplosionInArea(explosionType: int, leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): boolean;
    /** Returns true if there's any fire particles within the specified area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_FLAME_IN_ANGLED_AREA_2D [072D]*/
    IsFlameInAngledArea2D(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, angle: float, drawSphere: boolean): boolean;
    /** Returns true if there's any flames within the specified area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_FLAME_IN_ANGLED_AREA_3D [072E]*/
    IsFlameInAngledArea3D(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float, angle: float, drawSphere: boolean): boolean;
    /** Checks if there is something in the range of the two specified points
    *
    * https://library.sannybuilder.com/#/sa?q=IS_LINE_OF_SIGHT_CLEAR [06BD]*/
    IsLineOfSightClear(fromX: float, fromY: float, fromZ: float, toX: float, toY: float, toZ: float, buildings: boolean, cars: boolean, chars: boolean, objects: boolean, particles: boolean): boolean;
    /** Returns true if a money pickup exists near the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=IS_MONEY_PICKUP_AT_COORDS [09DA]*/
    IsMoneyPickupAtCoords(x: float, y: float, z: float): boolean;
    /** Returns true if there is a vehicle in the specified area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_POINT_OBSCURED_BY_A_MISSION_ENTITY [038A]*/
    IsPointObscuredByAMissionEntity(x: float, y: float, z: float, radiusX: float, radiusY: float, radiusZ: float): boolean;
    /** Returns true if a projectile is in the specified 3D area
    *
    * https://library.sannybuilder.com/#/sa?q=IS_PROJECTILE_IN_AREA [02EE]*/
    IsProjectileInArea(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): boolean;
    /** Removes all script fires (02CF)
    *
    * https://library.sannybuilder.com/#/sa?q=REMOVE_ALL_SCRIPT_FIRES [031A]*/
    RemoveAllScriptFires(): void;
    RemoveOilPuddlesInArea(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float): void;
    /** Sets the quantity of traffic that will spawn in the game
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CAR_DENSITY_MULTIPLIER [01EB]*/
    SetCarDensityMultiplier(multiplier: float): void;
    /** Sets whether collision of the object closest to the given coordinates and matching the model applies to the target character
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CHAR_USES_COLLISION_CLOSEST_OBJECT_OF_TYPE [0985]*/
    SetCharUsesCollisionClosestObjectOfType(x: float, y: float, z: float, radius: float, modelId: int, state: boolean, target: Char): void;
    /** This command is like 098E, except it finds the appropriate enex marker via its position instead of its name
    *
    * https://library.sannybuilder.com/#/sa?q=SET_CLOSEST_ENTRY_EXIT_FLAG [09B4]*/
    SetClosestEntryExitFlag(x: float, y: float, radius: float, flag: int, state: boolean): void;
    /** Sets the extra color of the sky
    *
    * https://library.sannybuilder.com/#/sa?q=SET_EXTRA_COLOURS [04F9]*/
    SetExtraColors(color: int, fade: boolean): void;
    /** Sets the quantity of pedestrians to spawn in the game
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PED_DENSITY_MULTIPLIER [03DE]*/
    SetPedDensityMultiplier(multiplier: float): void;
    /** Creates a pool collision object
    *
    * https://library.sannybuilder.com/#/sa?q=SET_POOL_TABLE_COORDS [0830]*/
    SetPoolTableCoords(leftBottomX: float, leftBottomY: float, leftBottomZ: float, rightTopX: float, rightTopY: float, rightTopZ: float): void;
    /** Sets the friction/slowdown rate on all rail tracks
    *
    * https://library.sannybuilder.com/#/sa?q=SET_RAILTRACK_RESISTANCE_MULT [0A45]*/
    SetRailtrackResistanceMult(mult: float): void;
    /** Sets whether all tags in the area are sprayed
    *
    * https://library.sannybuilder.com/#/sa?q=SET_TAG_STATUS_IN_AREA [0703]*/
    SetTagStatusInArea(leftBottomX: float, leftBottomY: float, rightTopX: float, rightTopY: float, percent: int): void;
    /** Toggles collision of the object closest to the given coordinates and matching the model
    *
    * https://library.sannybuilder.com/#/sa?q=SET_USES_COLLISION_OF_CLOSEST_OBJECT_OF_TYPE [088D]*/
    SetUsesCollisionOfClosestObjectOfType(x: float, y: float, z: float, radius: float, modelId: int, state: boolean): void;
    /** Sets the visibility of the object closest to the specified coordinates, matching the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=SET_VISIBILITY_OF_CLOSEST_OBJECT_OF_TYPE [0363]*/
    SetVisibilityOfClosestObjectOfType(x: float, y: float, z: float, radius: float, modelId: int, state: boolean): void;
    /** Creates a vehicle with the model (no pre-loading needed) in front of the player
    *
    * https://library.sannybuilder.com/#/sa?q=SPAWN_VEHICLE_BY_CHEATING [0ADD]*/
    SpawnVehicleByCheating(modelId: int): void;
    /** Swaps a map model with another map model nearest to the center of the search area
    *
    * https://library.sannybuilder.com/#/sa?q=SWAP_NEAREST_BUILDING_MODEL [03B6]*/
    SwapNearestBuildingModel(x: float, y: float, z: float, radius: float, fromModelId: int, toModelId: int): void;
    /** Locates the enex marker via the specified name and sets whether it is visible and usable
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_ENTRY_EXIT [07FB]*/
    SwitchEntryExit(interiorName: string, state: boolean): void;
    /** Sets whether the game should render the world or only the cutscene objects
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_WORLD_PROCESSING [03B7]*/
    SwitchProcessing(state: boolean): void;
    /** Flattens water waves
    *
    * https://library.sannybuilder.com/#/sa?q=SYNC_WATER [0971]*/
    SyncWater(): void;
}
declare var World: World
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Zone */
interface Zone {
    /** Gets a random character in the specified zone whose pedtype matches the specified values
    *
    * https://library.sannybuilder.com/#/sa?q=GET_RANDOM_CHAR_IN_ZONE [02DD]*/
    GetRandomChar(zone: string, civilian: boolean, gang: boolean, criminalOrProstitute: boolean): Char;
    GetCurrentPopulationZoneType(): int;
    /** Returns the drug dealer density of the specified zone
    *
    * https://library.sannybuilder.com/#/sa?q=GET_ZONE_DEALER_STRENGTH [076B]*/
    GetDealerStrength(zone: string): int;
    /** Returns the density of the gang members in the specified zone
    *
    * https://library.sannybuilder.com/#/sa?q=GET_ZONE_GANG_STRENGTH [076D]*/
    GetGangStrength(zone: string, gangId: int): int;
    /** Returns the name of the zone at the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=GET_NAME_OF_INFO_ZONE [08F1]*/
    GetName(x: float, y: float, z: float): string;
    /** Returns the GXT key associated with the zone at the specified coordinates
    *
    * https://library.sannybuilder.com/#/sa?q=GET_NAME_OF_ZONE [0843]*/
    GetTextKey(x: float, y: float, z: float): string;
    /** Resets all changes made to the zone info
    *
    * https://library.sannybuilder.com/#/sa?q=INIT_ZONE_POPULATION_SETTINGS [08CA]*/
    InitPopulationSettings(): void;
    /** Sets the total number of drug dealers in the zone
    *
    * https://library.sannybuilder.com/#/sa?q=SET_ZONE_DEALER_STRENGTH [076A]*/
    SetDealerStrength(zone: string, strength: int): void;
    /** Causes the players wanted level to be set at 4 when in restricted areas
    *
    * https://library.sannybuilder.com/#/sa?q=SET_DISABLE_MILITARY_ZONES [0A24]*/
    SetDisableMilitaryZones(state: boolean): void;
    /** Sets the zone as the only zone where a turf war can be provoked
    *
    * https://library.sannybuilder.com/#/sa?q=SET_ZONE_FOR_GANG_WARS_TRAINING [08B3]*/
    SetForGangWarsTraining(zone: string): void;
    /** Sets the density of the gang members in the specified zone
    *
    * https://library.sannybuilder.com/#/sa?q=SET_ZONE_GANG_STRENGTH [076C]*/
    SetGangStrength(zoneId: string, gangId: int, density: int): void;
    /** Sets whether cops should be prevented from spawning in the specified area
    *
    * https://library.sannybuilder.com/#/sa?q=SET_ZONE_NO_COPS [09B7]*/
    SetNoCops(zone: string, state: boolean): void;
    SetPopulationRace(zone: string, races: int): void;
    SetPopulationType(zone: string, type: int): void;
    SetTriggerGangWar(zone: string): void;
    /** Sets whether the IPL defined audio for the specified area should play
    *
    * https://library.sannybuilder.com/#/sa?q=SWITCH_AUDIO_ZONE [0917]*/
    SwitchAudio(zone: string, state: boolean): void;
}
declare var Zone: Zone
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/AudioStream3D */
declare class AudioStream3D extends AudioStream {
    /** Loads an audio file and creates a new 3d audio stream (see 0AAC)
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_3D_AUDIO_STREAM [0AC1]*/
    static Load(audioFileName: string): AudioStream3D | undefined;
    /** Attaches sound source to the vehicle
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAY_3D_AUDIO_STREAM_AT_CAR [0AC5]*/
    setPlayAtCar(car: Car): AudioStream3D;
    /** Attaches sound source to the character
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAY_3D_AUDIO_STREAM_AT_CHAR [0AC4]*/
    setPlayAtChar(char: Char): AudioStream3D;
    /** Sets sound source position to specific world location
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAY_3D_AUDIO_STREAM_AT_COORDS [0AC2]*/
    setPlayAtCoords(x: float, y: float, z: float): AudioStream3D;
    /** Attaches sound source to the object
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLAY_3D_AUDIO_STREAM_AT_OBJECT [0AC3]*/
    setPlayAtObject(object: ScriptObject): AudioStream3D;
    /** Sets size of 3d audio stream sound source in the world. Volume will not decay within the specified distance
    *
    * https://library.sannybuilder.com/#/sa?q=SET_AUDIO_STREAM_SOURCE_SIZE [2506]*/
    setSourceSize(radius: float): AudioStream3D;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Boat */
declare class Boat extends Car {
    /** Creates a vehicle at the specified location, with the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_CAR [00A5]*/
    static Create(modelId: int, x: float, y: float, z: float): Boat;
    /** Makes the boat stay motionless in the water
    *
    * https://library.sannybuilder.com/#/sa?q=ANCHOR_BOAT [0323]*/
    anchor(state: boolean): Boat;
    /** Makes the boat sail to the location
    *
    * https://library.sannybuilder.com/#/sa?q=BOAT_GOTO_COORDS [02D3]*/
    goto(x: float, y: float, z: float): Boat;
    /** Sets the boat's max speed
    *
    * https://library.sannybuilder.com/#/sa?q=SET_BOAT_CRUISE_SPEED [02DB]*/
    setCruiseSpeed(maxSpeed: float): Boat;
    /** Turns off the car's engine
    *
    * https://library.sannybuilder.com/#/sa?q=BOAT_STOP [02D4]*/
    stop(): Boat;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/DecisionMakerChar */
declare class DecisionMakerChar extends DecisionMaker {
    /** Copies a decision makers data to another decision maker
    *
    * https://library.sannybuilder.com/#/sa?q=COPY_CHAR_DECISION_MAKER [07E5]*/
    static Copy(handleOrTemplate: int): DecisionMakerChar;
    /** Creates decision maker instance based on template. Adds itself to mission cleanup list. Otherwise should be released with REMOVE_DECISION_MAKER
    *
    * https://library.sannybuilder.com/#/sa?q=COPY_SHARED_CHAR_DECISION_MAKER [0978]*/
    static CopyShared(template: int): DecisionMakerChar;
    /** Creates a decision maker with the specified type and adds it to mission cleanup list. Otherwise should be released with REMOVE_DECISION_MAKER
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_CHAR_DECISION_MAKER [060A]*/
    static Load(type: int): DecisionMakerChar;
    /** Sets which action should occur according to the event on the following parameters
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_CHAR_DECISION_MAKER_EVENT_RESPONSE [0709]*/
    addEventResponse(event: int, taskId: int, respect: float, hate: float, like: float, dislike: float, inCar: boolean, onFoot: boolean): DecisionMakerChar;
    /** Resets the task for the event of the specified decision maker
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_CHAR_DECISION_MAKER_EVENT_RESPONSE [0708]*/
    clearEventResponse(event: int): DecisionMakerChar;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/DecisionMakerGroup */
declare class DecisionMakerGroup extends DecisionMaker {
    /** Creates copy of group decision maker and adds it to mission cleanup list. Otherwise should be released with REMOVE_DECISION_MAKER
    *
    * https://library.sannybuilder.com/#/sa?q=COPY_GROUP_DECISION_MAKER [07E6]*/
    static Copy(handleOrTemplate: int): DecisionMakerGroup;
    /** Creates a decision maker for use on groups of actors
    *
    * https://library.sannybuilder.com/#/sa?q=LOAD_GROUP_DECISION_MAKER [06AE]*/
    static Load(type: int): DecisionMakerGroup;
    /** Sets which action should occur according to the event on the following parameters
    *
    * https://library.sannybuilder.com/#/sa?q=ADD_GROUP_DECISION_MAKER_EVENT_RESPONSE [074A]*/
    addEventResponse(event: int, taskId: int, respect: float, hate: float, like: float, dislike: float, inCar: boolean, onFoot: boolean): DecisionMakerGroup;
    /** Resets the task for the event of the specified group decision maker
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_GROUP_DECISION_MAKER_EVENT_RESPONSE [0749]*/
    clearEventResponse(event: int): DecisionMakerGroup;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Heli */
declare class Heli extends Car {
    /** Creates a vehicle at the specified location, with the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_CAR [00A5]*/
    static Create(modelId: int, x: float, y: float, z: float): Heli;
    /** Provides the heli with extra thrust power
    *
    * https://library.sannybuilder.com/#/sa?q=ACTIVATE_HELI_SPEED_CHEAT [07BB]*/
    activateSpeedCheat(power: int): Heli;
    attachWinch(state: boolean): Heli;
    /** Makes the heli follow and attack the current player in the given radius
    *
    * https://library.sannybuilder.com/#/sa?q=HELI_ATTACK_PLAYER [0724]*/
    attackPlayer(handle: Player, radius: float): Heli;
    /** Makes the helicopter hunt down the character or the vehicle within the specified radius
    *
    * https://library.sannybuilder.com/#/sa?q=POLICE_HELI_CHASE_ENTITY [0727]*/
    chaseEntity(char: Char, vehicle: Car, radius: float): Heli;
    /** Resets the heli rotation set with 04D0
    *
    * https://library.sannybuilder.com/#/sa?q=CLEAR_HELI_ORIENTATION [04D1]*/
    clearOrientation(): Heli;
    /** Sets whether the helicopter sound is muted
    *
    * https://library.sannybuilder.com/#/sa?q=DISABLE_HELI_AUDIO [0A1C]*/
    disableAudio(state: boolean): Heli;
    /** Makes the Hunter helicopter fire cannon gun
    *
    * https://library.sannybuilder.com/#/sa?q=FIRE_HUNTER_GUN [0541]*/
    fireHunterGun(): Heli;
    /** Makes the heli follow the specified char or vehicle in the air
    *
    * https://library.sannybuilder.com/#/sa?q=HELI_FOLLOW_ENTITY [0726]*/
    followEntity(char: Char, vehicle: Car, radius: float): Heli;
    /** Makes the helicopter fly to the specified location, keeping a specific Z height/altitude
    *
    * https://library.sannybuilder.com/#/sa?q=HELI_GOTO_COORDS [04A2]*/
    gotoCoords(x: float, y: float, z: float, minAltitude: float, maxAltitude: float): Heli;
    /** Retrieves the entity attached to the heli's magnet and returns to specific variables depending on the entities type
    *
    * https://library.sannybuilder.com/#/sa?q=GRAB_ENTITY_ON_WINCH [078B]*/
    grabEntityOnWinch(): {
        char: Char;
        vehicle: Car;
        object: ScriptObject;
    };
    keepEntityInView(char: Char, vehicle: Car, minAltitude: float, maxAltitude: int): Heli;
    landAtCoords(x: float, y: float, z: float, minAltitude: float, maxAltitude: float): Heli;
    /** Makes helicopter simulate crash landing, exploding on the way if high up
    *
    * https://library.sannybuilder.com/#/sa?q=MAKE_HELI_COME_CRASHING_DOWN [0564]*/
    makeComeCrashingDown(): Heli;
    releaseEntityFromWinch(): Heli;
    /** Makes the helicopter rotor spin at full speed instantly
    *
    * https://library.sannybuilder.com/#/sa?q=SET_HELI_BLADES_FULL_SPEED [0825]*/
    setBladesFullSpeed(): Heli;
    /** Forces the heli rotation relative to the north
    *
    * https://library.sannybuilder.com/#/sa?q=SET_HELI_ORIENTATION [04D0]*/
    setOrientation(angle: float): Heli;
    setReachedTargetDistance(distance: int): Heli;
    /** Limits the amount a helicopter can tilt
    *
    * https://library.sannybuilder.com/#/sa?q=SET_HELI_STABILISER [04DF]*/
    setStabiliser(state: boolean): Heli;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/MenuGrid */
declare class MenuGrid extends Menu {
    /** Creates the same color chart that you see in car modification shops
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_MENU_GRID [0964]*/
    static Create(header: string, topLeftX: float, topLeftY: float, width: float, numColumns: int, interactive: boolean, background: boolean, alignment: int): MenuGrid;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Plane */
declare class Plane extends Car {
    /** Creates a vehicle at the specified location, with the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_CAR [00A5]*/
    static Create(modelId: int, x: float, y: float, z: float): Plane;
    /** Sets the planes mission to attack the player
    *
    * https://library.sannybuilder.com/#/sa?q=PLANE_ATTACK_PLAYER [070E]*/
    attackPlayer(handle: Player, radius: float): Plane;
    /** Sets the plane mission to attack the player while maintaining the minimum altitude
    *
    * https://library.sannybuilder.com/#/sa?q=PLANE_ATTACK_PLAYER_USING_DOG_FIGHT [08A2]*/
    attackPlayerUsingDogFight(player: Player, altitude: float): Plane;
    flyInDirection(heading: float, minAltitude: float, maxAltitude: float): Plane;
    followEntity(char: Char, vehicle: Car, altitude: float): Plane;
    getUndercarriagePosition(): float;
    gotoCoords(x: float, y: float, z: float, minAltitude: float, maxAltitude: float): Plane;
    setThrottle(throttle: float): Plane;
    /** Sets whether the plane's landing wheels are up
    *
    * https://library.sannybuilder.com/#/sa?q=SET_PLANE_UNDERCARRIAGE_UP [08E6]*/
    setUndercarriageUp(state: boolean): Plane;
    /** Provides the aircraft with full power so it can start flying mid-air
    *
    * https://library.sannybuilder.com/#/sa?q=PLANE_STARTS_IN_AIR [0745]*/
    startsInAir(): Plane;
}
/** 
 * 
 * https://library.sannybuilder.com/#/sa/classes/Trailer */
declare class Trailer extends Car {
    /** Creates a vehicle at the specified location, with the specified model
    *
    * https://library.sannybuilder.com/#/sa?q=CREATE_CAR [00A5]*/
    static Create(modelId: int, x: float, y: float, z: float): Trailer;
    attachToCab(cab: Car): Trailer;
    /** Detaches the trailer from the car which it is attached to
    *
    * https://library.sannybuilder.com/#/sa?q=DETACH_TRAILER_FROM_CAB [07AC]*/
    detachFromCab(cab: Car): Trailer;
    /** Returns true if CAR A has CAR B attached to it like a trailer
    *
    * https://library.sannybuilder.com/#/sa?q=IS_TRAILER_ATTACHED_TO_CAB [07AB]*/
    isAttachedToCab(cab: Car): boolean;
}
