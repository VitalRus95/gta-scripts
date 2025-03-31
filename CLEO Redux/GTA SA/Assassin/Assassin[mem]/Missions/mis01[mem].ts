//  Script by Vital (Vitaly Pavlovich Ulyanov)
import { MissionHelper } from "../../missionHelper";
import { PedType, PickupType, WeaponType, TaskStatus, WeaponModel, PedModel, VehicleModel, PadId, Button, BodyPart, PickupModel, Fade, DecisionMakerType, ScriptTask } from "../../sa_enums";

// Mission texts
enum Texts {
    HELP01 = 'A ~r~corrupt cop~s~ is about to enjoy his day at the beach.',
    HELP02 = 'Make sure it\'s his last one, but ~y~don\'t get spotted~s~!',
    HELP03 = 'Look around for things that may help you to complete the task.',
    HELP04 = 'He spotted you and called the police, don\'t lose him!',
    HELP05 = '~r~You lost the target!',
    HELP06 = 'Use ~y~~k~~TOGGLE_SUBMISSIONS~~s~ to control an RC vehicle.',
    HELP07 = 'The ~r~target~s~ follows you, don\'t miss this opportunity!',
    HELP08 = 'The ~r~target~s~ has stopped following you.',
    HELP09 = 'The ~r~target~s~ doesn\'t want to follow you.'
}

// Constants
const plr: Player = new Player(0);
const plc: Char = plr.getChar();
const plg: Group = plr.getGroup();

// Variables
let molotov: Pickup;
let clothes: Pickup;
let target: Char;
let walking: Sequence;
let van: Car;
let rcVeh: Car;
let carNameTimer: int;
let ai: DecisionMaker;

MissionHelper.Launch(main, finish);

function main() {
    // Spawn characters, vehicles, pickups, etc.
    MissionHelper.Loader(
        [
            PedModel.WMYBE, WeaponModel.MolotovCocktail, WeaponModel.Pistol, VehicleModel.BerkleyRC_Van, PickupModel.CLOTHESP
        ],
        function() {
            molotov = Pickup.CreateWithAmmo(WeaponModel.MolotovCocktail, PickupType.Once, 1, 810.84, -1823.04, 13.02);
            clothes = Pickup.Create(PickupModel.CLOTHESP, PickupType.Once, 989.34, -1872.37, 11.69);
            van = Car.Create(VehicleModel.BerkleyRC_Van, 952.32, -1827.38, 12.65);
            van.setHeading(76.86);
            target = Char.Create(PedType.CivMale, PedModel.WMYBE, 982.79, -1873.24, 10.50);
            target.setDrownsInWater(false);
            target.setHeading(68.52);
            target.setMoney(100);
            target.giveWeapon(WeaponType.Pistol, 99999);
            target.hideWeaponForScriptedCutscene(true);
        }
    );

    walking = Sequence.Open();

    Task.CharSlideToCoord(new Char(-1), 982.79, -1873.24, 10.50, 68.52, 1);
    Task.CharSlideToCoord(new Char(-1), 933.23, -1856.88, 10.49, 88.94, 1);
    Task.CharSlideToCoord(new Char(-1), 661.69, -1856.49, 5.46, 85.85, 1);
    Task.CharSlideToCoord(new Char(-1), 562.18, -1884.36, 3.71, 112.87, 1);
    Task.CharSlideToCoord(new Char(-1), 275.23, -1883.05, 1.95, 88.53, 1);
    Task.CharSlideToCoord(new Char(-1), 278.77, -1843.21, 3.48, 278.97, 1);
    Task.CharSlideToCoord(new Char(-1), 316.20, -1858.00, 3.14, 217.29, 1);

    walking.close();
    walking.setToRepeat(true);
    target.performSequence(walking);

    ai = DecisionMakerChar.Load(DecisionMakerType.Weak);
    target.setDecisionMaker(+ai);

    // Define all mission entities
    MissionHelper.AddEntities({
        target: [target],
        other: [molotov, clothes, van, walking, ai]
    });

    // Main loop
    while (MissionHelper.targetEntities.length > 0) {
        // Clothes pickup
        if (clothes?.hasBeenCollected()) {
            plr.setControl(false);
            Camera.DoFade(500, Fade.Out);

            while (Camera.GetFadingStatus()) {
                wait(0);
            }

            plr.giveClothesOutsideShop('policetr', 'policetr', BodyPart.SpecialCostume);
            plr.buildModel();
            plr.setControl(true);
            Camera.DoFade(500, Fade.In);
        }

        // RC van
        if (!Car.IsDead(+van)
            && !plr.isInRemoteMode()
            && plc.isInCar(van)
        ) {
            carNameTimer = Memory.ReadI32(0xBAA44C, false);
            if (carNameTimer > 0) {
                Text.PrintStringNow(Texts.HELP06, 3000);
            }
            
            if (Pad.IsButtonPressed(PadId.Pad1, Button.Rightshock)) {
                let vehicles: int[] = [
                    VehicleModel.RC_Bandit, VehicleModel.RC_Baron, VehicleModel.RC_Goblin, VehicleModel.RC_Raider, VehicleModel.RC_Tiger
                ];
                let model = vehicles[Math.RandomIntInRange(0, vehicles.length)];

                MissionHelper.Loader([model], function () {
                    let pos = van.getOffsetInWorldCoords(
                        0, Streaming.GetModelDimensions(VehicleModel.BerkleyRC_Van).leftBottomBackY - 2, 0
                    );
                    Rc.GiveModelToPlayer(plr, pos.x, pos.y, -100, van.getHeading(), model);
                });

                rcVeh = Rc.GetCar(plr);
            }
        }

        // Manage mission stages
        switch (MissionHelper.stage) {
            case 'SETUP':
                MissionHelper.SetCamera([
                    {
                        pos: [985.99, -1872.25, 10.72],
                        target: [985.01, -1872.07, 10.79],
                        duration: 4000,
                        inFade: true,
                        textString: Texts.HELP01
                    },
                    {
                        pos: [941.09, -1848.50, 11.95],
                        target: [941.89, -1849.10, 11.91],
                        duration: 4000,
                        textString: Texts.HELP02
                    },
                    {
                        pos: [809.51, -1813.51, 13.95],
                        target: [809.87, -1814.44, 13.96],
                        duration: 4000,
                        outFade: true,
                        textString: Texts.HELP03
                    }
                ], false);
                MissionHelper.stage = 'WALK';
            case 'WALK':
                // Spotting the player
                if (target.hasSpottedCharInFront(plc)
                    && plc.locateAnyMeansChar3D(target, 25, 25, 10, false)
                ) {
                    if (!plr.isWearing(BodyPart.SpecialCostume, 'policetr')
                        || target.hasBeenDamagedByChar(plc)
                        || (plr.isTargetingChar(target) && plc.getCurrentWeapon() > 1)
                    ) {
                        MissionHelper.stage = 'START_TO_FLEE';
                        break;
                    }
                }
                // Spotting an RC vehicle
                if (!target.isInAnyCar()
                    && !Car.IsDead(+rcVeh)
                    && target.locateAnyMeansCar3D(rcVeh, 5, 5, 5, false)
                ) {
                    MissionHelper.stage = 'START_TO_FLEE';
                    break;
                }
                // Following the player
                if (plr.isWearing(BodyPart.SpecialCostume, 'policetr')
                    && plr.isTargetingChar(target)
                    && GroupControlForwardJustDown()
                ) {
                    if (!target.isGroupMember(plg)) {
                        if (plg.getSize().numMembers === 0) {
                            Text.PrintStringNow(Texts.HELP07, 4000);
                            target.hideWeaponForScriptedCutscene(false);
                            plg.setMember(target);
                        } else {
                            Text.PrintStringNow(Texts.HELP09, 4000);
                        }
                    } else {
                        Text.PrintStringNow(Texts.HELP08, 4000);
                        target.hideWeaponForScriptedCutscene(true);
                        target.removeFromGroup();
                        Task.WanderStandard(target);
                    }
                }
                break;
            case 'START_TO_FLEE':
                Text.PrintStringNow(Texts.HELP04, 4000);
                target.removeFromGroup();
                MissionHelper.stage = 'FLEE';
            case 'FLEE':
                if (!plr.isInRemoteMode() && !plc.locateAnyMeansChar2D(target, 100, 100, false)) {
                    MissionHelper.stage = 'FINISH';
                    break;
                }
                if (target.hasSpottedCharInFront(plc)
                    || target.hasBeenDamagedByChar(plc)
                    || (!Car.IsDead(+rcVeh)
                        && target.locateAnyMeansCar3D(rcVeh, 5, 5, 5, false))
                ) {
                    if (target.getScriptTaskStatus(ScriptTask.FleeCharAnyMeans) === TaskStatus.FinishedTask) {
                        target.hideWeaponForScriptedCutscene(false);
                        Task.FleeCharAnyMeans(target, plc, 40, -1, true, 2000, 3000, 50);
                        plr.alterWantedLevelNoDrop(1);
                    }
                } else {
                    if (target.getScriptTaskStatus(ScriptTask.WanderStandard) === TaskStatus.FinishedTask
                        && target.getScriptTaskStatus(ScriptTask.FleeCharAnyMeans) === TaskStatus.FinishedTask
                    ) {
                        target.hideWeaponForScriptedCutscene(true);
                        Task.WanderStandard(target);
                    }
                }
            default:
                break;
        }
        wait(0);
    }
}

function finish() {
    // Determine if the mission is passed or failed
    if (!plr.isPlaying() || MissionHelper.targetEntities.length > 0) {
        MissionHelper.MissionFailed(
            undefined,
            MissionHelper.targetEntities.length > 0 ? Texts.HELP05 : undefined
        );
    } else if (Char.IsDead(+target)) {
        MissionHelper.MissionPassed(
            MissionHelper.stage !== 'FLEE',
            MissionHelper.stage !== 'FLEE' ? 400 : 200
        );
    }
}

function GroupControlForwardJustDown(): boolean {
    let thisPad: int = Memory.CallFunctionReturn(0x53fb70, 1, 1, 0);
    return Memory.Fn.ThiscallU8(0x541230, thisPad)() !== 0;
}