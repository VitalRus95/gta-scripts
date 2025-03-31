//  Script by Vital (Vitaly Pavlovich Ulyanov)
//  Big thanks for help to Seemann!
export class MissionHelper {
    static plr: Player = new Player(0);
    static plc: Char = this.plr.getChar();
    /** Current stage of the mission:
     * `'SETUP'` - initial stage.
     * `'FINISH'` - end the mission and go to `finish` function. */
    static stage: string = '';
    static targetEntities: Target[] = [];
    static vitalEntities: Vital[] = [];
    static otherEntities: any[] = [];

    /**
     * Defines your mission's segments. The approach is inspired by Seemann's recreation of Luigi's mission `'Drive Misty for Me'` in GTA 3 in CLEO Redux: https://github.com/x87/luigi3.
     * @param main The mission's body function.
     * @param finish The mission's end function where you determine if it's passed or failed.
     */
    static Launch(main: Function, finish: Function) {
        const _wait = wait;
        wait = (delay) => {
            _wait(delay);
            if (!this.plr.isPlaying()) {
                throw new Error('Mission aborted: the player is wasted or busted.');
            }
            if (this.stage === 'FINISH') {
                throw new Error('Mission finished by setting \'FINISH\' stage.')
            }
            if (this.targetEntities.length > 0) {
                this.CheckTargets();
            }
            if (this.vitalEntities.length > 0) {
                this.CheckVitals();
            }
            if (this.otherEntities.length > 0) {
                this.CheckOthers();
            }
        }
        this.stage = 'SETUP';
        ONMISSION = true;
        try {
            main();
            finish();
        } catch (error) {
            log(error);
            finish();
        }
        ONMISSION = false;
        this.plr.setControl(true);
        this.plc.freezePosition(false);
        this.CleanEntities();
        Mission.Finish();
        Camera.Restore();
        wait = _wait;
    }

    /**
     * Loads and unloads the models needed to spawn different entities.
     * @param models Models to load before spawning the entities.
     * @param func Function where you manually spawn the entities. After the call, models will be unloaded automatically.
     */
    static Loader(models: int[], func: Function) {
        models.forEach(m => Streaming.RequestModel(m));

        while (true) {
            let everythingLoaded: boolean = true;

            models.forEach(m => {
                if (!Streaming.HasModelLoaded(m)) {
                    everythingLoaded = false;
                }
            });

            if (everythingLoaded) {
                break;
            } else {
                wait(0);
            }
        }

        if (func) {
            func();
        }

        models.forEach(m => Streaming.MarkModelAsNoLongerNeeded(m));
    };

    /**
     * Unloads the specified entities.
     * @param entities Entities to unload.
     */
    static Cleaner(entities: any[]) {
        entities.forEach(e => {
            if (e instanceof Char) e.markAsNoLongerNeeded();
            else if (e instanceof Car) e.markAsNoLongerNeeded();
            else if (e instanceof Pickup) e.remove();
            else if (e instanceof Blip) e.remove();
            else if (e instanceof Sphere) e.remove();
            else if (e instanceof ScriptObject) e.markAsNoLongerNeeded();
            else if (e instanceof Sequence) e.clear();
            else if (e instanceof ScriptFire) e.remove();
            else if (e instanceof Attractor) e.clear();
            else if (e instanceof Group) e.remove();
            else if (e instanceof Particle) e.playAndKill();
            else if (e instanceof DecisionMaker) e.remove();
            else if (e instanceof Searchlight) e.delete();
            else if (e instanceof Checkpoint) e.delete();
            else if (e instanceof Train) e.markAsNoLongerNeeded();
            else if (e instanceof Menu) e.delete();
            else if (e instanceof User3DMarker) e.remove();
            else if (e instanceof AudioStream) e.remove();
        });
        Txd.Remove();
    }

    /**
     * Checks if the targets are dead/destroyed and updates the corresponding list.
     */
    static CheckTargets() {
        this.targetEntities = this.targetEntities.filter(t => {
            if (t.isDead()) {
                if (Blip.DoesExist(+t.blip)) {
                    t.blip.remove();
                }
                t.entity.markAsNoLongerNeeded();
                return false;
            }
            return true;
        });
    }

    /**
     * Checks if any vital entity is dead/destroyed and fails the mission if it is so.
     */
    static CheckVitals() {
        this.vitalEntities.forEach(v => {
            if (v.isDead()) {
                throw new Error(`Mission aborted: vital entity ${v.entity} is dead/destroyed!`);
            }
        });
    }

    /**
     * Checks other entities and unloads those which are dead/destroyed.
     */
    static CheckOthers() {
        this.otherEntities = this.otherEntities.filter(o => {
            if ((o instanceof Car && Car.IsDead(+o))
                || (o instanceof Char && Char.IsDead(+o))
                || (o instanceof ScriptObject && (!ScriptObject.DoesExist(+o) || o.hasBeenDamaged()))
            ) {
                o.markAsNoLongerNeeded();
                return false;
            }
            return true;
        });
    }

    /**
     * Adds mission entities to track and automatically remove after the mission.
     * @param entities Mission entities (target, vital, and other).
     */
    static AddEntities(entities: MissionEntities) {
        entities.target?.forEach(t => {
            if (t === undefined) {
                log(`AddEntities: Entity ${t} is not found!`);
                return;
            }
            if (t instanceof Car || t instanceof Char || t instanceof ScriptObject) {
                this.targetEntities.push({
                    entity: t,
                    blip: t instanceof Car ? Blip.AddForCar(t)
                        : t instanceof Char ? Blip.AddForChar(t)
                        : Blip.AddForObject(t),
                    isDead: t instanceof Car ? function () { return Car.IsDead(+t) }
                        : t instanceof Char ? function () { return Char.IsDead(+t) }
                        : function () { return (!ScriptObject.DoesExist(+t) || t.hasBeenDamaged()) }
                });
            } else {
                log(`AddEntities: Entity ${t} is of a wrong class!`);
                return;
            }
        });
        entities.vital?.forEach(v => {
            this.vitalEntities.push({
                entity: v,
                isDead: v instanceof Car ? function () { return Car.IsDead(+v) }
                    : v instanceof Char ? function () { return Char.IsDead(+v) }
                    : function () { return (!ScriptObject.DoesExist(+v) || v.hasBeenDamaged()) }
            });
        });
        entities.other?.forEach(o => {
            this.otherEntities.push(o);
        });
    }

    /**
     * Removes all targets and other entities listed in `DefineEntities` method.
     */
    static CleanEntities() {
        this.targetEntities.forEach(t => {
            if (Blip.DoesExist(+t.blip)) {
                t.blip.remove();
            }
            t.entity.markAsNoLongerNeeded();
        });
        this.vitalEntities.forEach(v => {
            v.entity.markAsNoLongerNeeded();
        });
        this.Cleaner(this.otherEntities);

        this.targetEntities = [];
        this.vitalEntities = [];
        this.otherEntities = [];
    }

    /**
     * Tries to find the entity among mission's targets and return its blip.
     * @param entity The target's entity.
     * @returns The entity's blip.
     */
    static GetBlipOfTarget(entity: Car|Char|ScriptObject): Blip|undefined {
        for (const t of this.targetEntities) {
            if (t.entity === entity) {
                return Blip.DoesExist(+t.blip) ? t.blip : undefined;
            }
        }
        return undefined;
    }

    /**
     * Makes a character say a phrase and prints the corresponding text.
     * @param soundId The ID of the sound to play.
     * @param gxtKey GXT entry of the text to print.
     * @param ped Character that should speak.
     */
    static PlaySpeech(soundId: int, gxtKey: string, ped: Char) {
        Audio.LoadMissionAudio(1, soundId);
    
        while (!Audio.HasMissionAudioLoaded(1)) {
            wait(0);
        }
    
        Audio.AttachMissionAudioToChar(1, ped);
        Audio.PlayMissionAudio(1);
        ped.disableSpeech(true);
    
        while (true) {
            if (!Char.DoesExist(+ped) || Audio.HasMissionAudioFinished(1)) {
                break;
            } else {
                Text.PrintNow(gxtKey, 0, 1);
                ped.startFacialTalk(0);
            }
            wait(0);
        }
    
        if (Char.DoesExist(+ped)) {
            ped.stopFacialTalk();
            ped.enableSpeech();
        }
    
        Audio.ClearMissionAudio(1);
    }
    
    /**
     * Sets camera views for a cutscene.
     * @param interpolationOut Smoothly set the camera behind the player after the cutscene.
     * @param cameras Camera views with various parameters.
     */
    static SetCamera(cameras: {
        pos?: [float, float, float]
        target?: [float, float, float],
        duration: int|Function,
        interpolationIn?: boolean,
        inFade?: boolean,
        outFade?: boolean,
        gxtKey?: string,
        textString?: string
    }[], interpolationOut: boolean = false) {
        if (!this.plr.isPlaying() || cameras.length === 0) {
            return;
        }
    
        let playerPos: { x: float; y: float; z: float; } = undefined;
    
        Game.AllowPauseInWidescreen(true);
        Hud.SwitchWidescreen(true);
        this.plr.setControl(false);
        if (Char.DoesExist(+this.plc)) {
            playerPos = this.plc.getCoordinates();
        }
    
        cameras.forEach((cam, index) => {
            // Fade before the camera is set
            if (cam.inFade) {
                Camera.DoFade(500, 0);
                while (Camera.GetFadingStatus()) {
                    wait(0);
                }
                if (Char.DoesExist(+this.plc) && cam.pos) {
                    Streaming.LoadScene(cam.pos[0], cam.pos[1], cam.pos[2]);
                    this.plc.setCoordinates(cam.pos[0], cam.pos[1], -90);
                    this.plc.freezePosition(true);
                }
                Camera.DoFade(500, 1);
            } else if (Char.DoesExist(+this.plc) && cam.pos) {
                Streaming.LoadScene(cam.pos[0], cam.pos[1], cam.pos[2]);
                this.plc.setCoordinates(cam.pos[0], cam.pos[1], -90);
                this.plc.freezePosition(true);
            }
    
            // Set the camera's position and target
            if (cam.pos) {
                Camera.SetFixedPosition(cam.pos[0], cam.pos[1], cam.pos[2], 0, 0, 0);
            }
            if (cam.target) {
                Camera.PointAtPoint(cam.target[0], cam.target[1], cam.target[2], cam.interpolationIn ? 1 : 2);
            }
    
            // Wait for the timer or the function to finish
            if (typeof cam.duration === 'number') {
                TIMERA = 0;
    
                while (TIMERA < cam.duration && !this.IsCutsceneSkipButtonPressed()) {
                    if (cam.gxtKey) {
                        Text.PrintNow(cam.gxtKey, 0, 1);
                    } else if (cam.textString) {
                        Text.PrintStringNow(cam.textString, 0);
                    }
                    wait(0);
                }
            } else if (typeof cam.duration === 'function') {
                cam.duration();
            }
    
            // Cancel the next camera's interpolation if the scene is skipped
            if (this.IsCutsceneSkipButtonPressed()) {
                if (cameras[index + 1]) {
                    cameras[index + 1].interpolationIn = false;
                }
                wait(0);
            }
    
            // Fade after the scene ends
            if (cam.outFade) {
                Camera.DoFade(500, 0);
                while (Camera.GetFadingStatus()) {
                    wait(0);
                }
                if (index === cameras.length - 1 && Char.DoesExist(+this.plc)) {
                    this.plc.freezePosition(false);
    
                    if (playerPos) {
                        this.plc.setCoordinatesNoOffset(playerPos.x, playerPos.y, playerPos.z);
                        Streaming.LoadScene(playerPos.x, playerPos.y, playerPos.z);
                        Streaming.RequestCollision(playerPos.x, playerPos.y);
                    }
                }
                Camera.DoFade(500, 1);
            } else {
                if (index === cameras.length - 1 && Char.DoesExist(+this.plc)) {
                    this.plc.freezePosition(false);
    
                    if (playerPos) {
                        this.plc.setCoordinates(playerPos.x, playerPos.y, playerPos.z);
                        Streaming.LoadScene(playerPos.x, playerPos.y, playerPos.z);
                        Streaming.RequestCollision(playerPos.x, playerPos.y);
                    }
                }
            }
        });
    
        // Restore the camera
        if (interpolationOut) {
            Camera.Restore();
        } else {
            Camera.RestoreJumpcut();
        }
    
        // Reset control and other stuff
        Game.AllowPauseInWidescreen(false);
        Hud.SwitchWidescreen(false);
        this.plr.setControl(true);
    }
    
    /**
     * Shows `Mission failed` text with optional failure reason.
     * @param reasonGxt A GXT entry with the reason why the mission was failed.
     * @param reasonString A custom string with mission failure reason.
     */
    static MissionFailed(reasonGxt: string = undefined, reasonString: string = undefined) {
        Mission.Finish();
        Text.PrintBig('M_FAIL', 5000, 1);
        if (reasonGxt) {
            Text.PrintNow(reasonGxt, 5000, 1);
        } else if (reasonString) {
            Text.PrintStringNow(reasonString, 5000);
        }
    }
    
    /**
     * Shows `Mission passed` text with optional money and respect rewards.
     * @param removeWantedLevel Whether to clear the player's wanted level.
     * @param money The amount of money reward.
     * @param respect The amount of respect reward.
     */
    static MissionPassed(removeWantedLevel: boolean = false, money: int = undefined, respect: int = undefined) {
        Mission.Finish();
        Audio.PlayMissionPassedTune(1);

        if (!money && !respect) {
            Text.PrintBig('M_PASSD', 5000, 1);
        } else if (money && !respect) {
            Text.PrintWithNumberBig('M_PASS', money, 5000, 1);
        } else if (!money && respect) {
            Text.PrintBig('M_PASSR', 5000, 1);
        } else {
            Text.PrintWithNumberBig('M_PASSS', money, 5000, 1);
        }
    
        if (removeWantedLevel) this.plr.clearWantedLevel();
        if (money) new Player(0).addScore(money);
        if (respect) Stat.AwardPlayerMissionRespect(respect);
    }
    
    /**
     * Checks if one of the cutscene skip buttons was pressed.
     * @returns Cutscene skip button pressed state.
     */
    static IsCutsceneSkipButtonPressed(): boolean {
        return Memory.Fn.CdeclU8(0x4D5D10)() !== 0;
    }
}

interface MissionEntities {
    /** Targets to kill/destroy. Receive a blip automatically. */
    target?: (Car|Char|ScriptObject)[],
    /** Entities that must not be killed or destroyed during the mission. */
    vital?: (Car|Char|ScriptObject)[],
    /** Other entities. */
    other?: any[]
}

interface Target {
    entity: Car|Char|ScriptObject,
    blip: Blip,
    isDead: Function
}

interface Vital {
    entity: Car|Char|ScriptObject,
    isDead: Function
}