// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
// Thanks to: Seemann

import { Button, MissionAudioSlot, SfxMission } from "./vc_enums.mts";
import {
    getTimeStepInSeconds,
    isButtonJustDown,
    PLAYER,
    PLAYER_CHAR,
} from "./vc_funcs.mts";

const PHONE_MODEL: int = 258;

export class PhoneCall {
    /** The first stage of the call */
    private initialStage: PhoneCallStage = "START";
    /** Current stage of the call */
    private stage: PhoneCallStage;
    /** Time the phone rings (in seconds) */
    private ringingTime: float;
    /** Interval between rings (in seconds) */
    private ringingInterval: float;
    /** Time passed since the phone was picked up (in seconds) */
    private pickUpTime: float;
    /** Current conversation line */
    private currentLine: int;

    /** Phone conversation lines */
    lines: ConversationLine[];
    /** Maximum phone ringing time (in seconds) */
    maxRingingTime: float;

    /**
     * Sets up a phone call
     * @param lines Phone conversation lines
     * @param ringingDuration Maximum phone ringing time (in seconds). Set to zero to skip ringing. Defaults to `14`.
     */
    constructor(lines: ConversationLine[], ringingDuration: float = 14) {
        this.lines = lines;
        this.maxRingingTime = ringingDuration;

        // Transform GXT/FXT keys to upper case to be on the safe side
        this.lines.forEach((l) => {
            if (l.textKey) {
                if (l.textKey === "=") {
                    l.textKey = l.audioName.toUpperCase();
                } else {
                    l.textKey = l.textKey.toUpperCase();
                }
            }
        });

        // Skip ringing if its duration is zero
        if (ringingDuration === 0) {
            this.initialStage = "START_PICKING_UP";
        }

        // Set other properties to defaults
        this.reset();
    }

    /**
     * Resets the call's properties
     */
    reset() {
        this.stage = this.initialStage;
        this.currentLine = 0;
        this.ringingTime = 0;
        this.pickUpTime = 0;
        this.ringingInterval = 0;
    }

    /**
     * Processes the call, should be called in a loop
     */
    process() {
        // Cancelling the call
        if (
            !PLAYER.isPlaying() ||
            PLAYER.isInAnyCar() ||
            isButtonJustDown(Button.Triangle) ||
            this.ringingTime > this.maxRingingTime
        ) {
            this.stage = "CANCELLED";
        }

        // Make sure the line id is >= 0
        if (this.currentLine < 0) {
            this.currentLine = 0;
        }

        // Finish the call if the line id is >= max
        if (this.currentLine >= this.lines.length) {
            this.stage = "FINISHED";
        }

        // Phone call's stages
        switch (this.stage) {
            case "START":
                Text.PrintHelpForever("ANSWER");
                this.stage = "REQUEST_RINGING";
            case "REQUEST_RINGING":
                Audio.LoadMissionAudio(
                    MissionAudioSlot.Slot1,
                    SfxMission.Mobring,
                );
                this.stage = "LOADING_RINGING";
            case "LOADING_RINGING":
                if (!Audio.HasMissionAudioLoaded(MissionAudioSlot.Slot1)) {
                    break;
                }
                Audio.PlayMissionAudio(MissionAudioSlot.Slot1);
                this.ringingInterval = 0;
                this.stage = "RINGING";
            case "RINGING":
                this.ringingTime += getTimeStepInSeconds();

                // Reload the audio if it has finished playing
                if (Audio.HasMissionAudioFinished(MissionAudioSlot.Slot1)) {
                    if (this.ringingInterval < 0.75) {
                        this.ringingInterval += getTimeStepInSeconds();
                    } else {
                        Audio.ClearMissionAudio(MissionAudioSlot.Slot1);
                        this.stage = "REQUEST_RINGING";
                        break;
                    }
                }

                // The player hasn't picked up the phone yet
                if (!isButtonJustDown(Button.LeftShoulder1)) {
                    break;
                }

                Audio.ClearMissionAudio(MissionAudioSlot.Slot1);
                Text.ClearHelp();
                this.stage = "START_PICKING_UP";
            case "START_PICKING_UP":
                Streaming.RequestModel(PHONE_MODEL);
                Streaming.LoadAllModelsNow();
                PLAYER.shutUp(true);
                PLAYER_CHAR.setAnsweringMobile(true);
                Streaming.MarkModelAsNoLongerNeeded(PHONE_MODEL);
                this.pickUpTime = 0;
                this.stage = "PICKING_UP";
            case "PICKING_UP":
                this.pickUpTime += getTimeStepInSeconds();
                if (this.pickUpTime < 1) {
                    break;
                }
                this.stage = "REQUEST_SPEECH";
            case "REQUEST_SPEECH":
                // Request audio
                Audio.LoadMissionAudio(
                    MissionAudioSlot.Slot1,
                    this.lines[this.currentLine].audioName,
                );

                // Load GXT table if necessary
                if (this.lines[this.currentLine].gxtTable) {
                    Text.LoadMissionText(this.lines[this.currentLine].gxtTable);
                }

                this.stage = "LOADING_SPEECH";
            case "LOADING_SPEECH":
                if (!Audio.HasMissionAudioLoaded(MissionAudioSlot.Slot1)) {
                    break;
                }
                Audio.PlayMissionAudio(MissionAudioSlot.Slot1);
                this.stage = "SPEAKING";
            case "SPEAKING":
                // Go to next line (`Next weapon` button)
                if (isButtonJustDown(Button.RightShoulder2)) {
                    Audio.ClearMissionAudio(MissionAudioSlot.Slot1);
                    this.currentLine++;
                    this.stage = "REQUEST_SPEECH";
                    break;
                }

                // Go to previous line (`Previous weapon` button)
                if (
                    isButtonJustDown(Button.LeftShoulder2) &&
                    this.currentLine > 0
                ) {
                    Audio.ClearMissionAudio(MissionAudioSlot.Slot1);
                    this.currentLine--;
                    this.stage = "REQUEST_SPEECH";
                    break;
                }

                // Print text
                if (!Audio.HasMissionAudioFinished(MissionAudioSlot.Slot1)) {
                    Text.PrintNow(this.lines[this.currentLine].textKey, 0, 1);
                    break;
                }

                // Stop current audio and proceed to the next line
                Audio.ClearMissionAudio(MissionAudioSlot.Slot1);
                this.currentLine++;
                this.stage = "REQUEST_SPEECH";
                break;
            case "CANCELLED":
            case "FINISHED":
                Audio.ClearMissionAudio(MissionAudioSlot.Slot1);
                PLAYER_CHAR.setAnsweringMobile(false);
                PLAYER.shutUp(false);
                Text.ClearHelp();
                break;
        }
    }

    isFinished() {
        return this.stage === "FINISHED";
    }

    isCancelled() {
        return this.stage === "CANCELLED";
    }
}

// Thanks to Seemann for reminding that functions can return objects!
// https://github.com/x87/gta3.ts/blob/bus1/III%5Bmem%5D/Main/Industrial/bus1.mts
/**
 * Generates a conversation line
 * @param audioName The name of the audio to play
 * @param textKey Subtitle's GXT/FXT key. Defaults to `=` (matches the audio name), set to `undefined` to skip
 * @param gxtTable GXT table to load if necessary
 * @returns
 */
export function line(
    audioName: SfxMission | string,
    textKey: string = "=",
    gxtTable?: string,
): ConversationLine {
    return {
        audioName: audioName,
        textKey: textKey,
        gxtTable: gxtTable,
    };
}

interface ConversationLine {
    audioName: SfxMission | string;
    textKey?: string;
    gxtTable?: string;
}

type PhoneCallStage =
    | "START"
    | "REQUEST_RINGING"
    | "LOADING_RINGING"
    | "RINGING"
    | "START_PICKING_UP"
    | "PICKING_UP"
    | "REQUEST_SPEECH"
    | "LOADING_SPEECH"
    | "SPEAKING"
    | "FINISHED"
    | "CANCELLED";
