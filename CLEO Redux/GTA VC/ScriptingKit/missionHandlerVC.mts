// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
// Thanks to: Seemann
// TO DO:
// - Entities tracker with optional blips.
import { TextStyle } from "./vc_enums.mts";
import { PLAYER, PLAYER_CHAR } from "./vc_funcs.mts";

export class MissionHandler {
    /** The next stage of the mission represented by a function */
    static nextStage: Function;
    /** The function where the mission cleanup occurs */
    static cleanup: Function;

    /**
     * Starts the mission and begins tracking its status
     * @param firstStage The first stage of the mission
     * @param cleanup The function with mission cleanup
     */
    static Launch(firstStage: Function, cleanup: Function = undefined) {
        // Thanks to Seemann for this `wait` trick!
        const _wait = wait;
        wait = (delay: int) => {
            _wait(delay);
            if (!PLAYER.isPlaying()) {
                this.Fail();
            }
            if (Pad.TestCheat("MISEND")) {
                Text.PrintBigString("Mission finished", 5000, TextStyle.Middle);
                this.Finish();
            }
        };
        this.nextStage = firstStage;
        this.cleanup = cleanup;

        ONMISSION = true;
        while (this.nextStage !== undefined) {
            try {
                this.nextStage();
                wait(0);
            } catch (error) {
                log(error);
                break;
            }
        }
        ONMISSION = false;

        PLAYER_CHAR.setAnsweringMobile(false);
        Mission.Finish();
        wait = _wait;
        this?.cleanup();
    }

    /**
     * Passes the mission and finishes it
     * @param reward Money given to the player
     * @param clearWantedLevel Whether to remove wanted stars or not
     */
    static Pass(reward: int = 0, clearWantedLevel: boolean = true) {
        Audio.PlayMissionPassedTune(1);
        if (clearWantedLevel) PLAYER.clearWantedLevel();
        if (reward > 0) {
            Text.PrintWithNumberBig("M_PASS", reward, 5000, TextStyle.Middle);
            PLAYER.addScore(reward);
        } else {
            Text.LoadMissionText("KENT1");
            Text.PrintBig("M_PASSN", 5000, TextStyle.Middle);
        }
        throw new Error("Mission passed!");
    }

    /**
     * Fails the mission and finishes it
     */
    static Fail() {
        Text.PrintBig("M_FAIL", 5000, TextStyle.Middle);
        throw new Error("Mission failed!");
    }

    static Finish() {
        throw new Error("Mission finished!");
    }

    /**
     * Deletes specified entities
     * @param entities An array of entities to clean up
     */
    static DeleteEntities(entities: any[]) {
        entities.forEach((e) => {
            if (!e) return;

            if (e instanceof Char) e.markAsNoLongerNeeded();
            else if (e instanceof Car) e.markAsNoLongerNeeded();
            else if (e instanceof Pickup) e.remove();
            else if (e instanceof Blip) e.remove();
            else if (e instanceof Sphere) e.remove();
            else if (e instanceof ScriptObject) e.markAsNoLongerNeeded();
            else if (e instanceof ScriptFire) e.remove();
        });
    }

    /**
     * Automatically loads the requested models, calls the spawn function, and unloads them
     * @param models An array of models to load
     * @param quickLoad Whether to load the models immediately (may cause a microfreeze)
     * @param spawn The function where you spawn the necessary entities
     */
    static ModelLoader(models: int[], quickLoad: boolean, spawn: Function) {
        models.forEach((m) => Streaming.RequestModel(m));

        if (quickLoad) {
            Streaming.LoadAllModelsNow();
        } else {
            for (let i = 0; i < models.length; i++) {
                if (!Streaming.HasModelLoaded(models[i])) {
                    wait(0);
                    i = -1;
                    continue;
                }
            }
        }

        try {
            spawn();
        } catch (error) {
            log(error);
        } finally {
            models.forEach((m) => Streaming.MarkModelAsNoLongerNeeded(m));
        }
    }
}
