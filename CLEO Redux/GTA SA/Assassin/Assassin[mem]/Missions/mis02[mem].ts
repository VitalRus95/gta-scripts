//  Script by Vital (Vitaly Pavlovich Ulyanov)
import { MissionHelper } from "../../missionHelper";
import { BlipColor, BlipDisplay, CameraMode, CarColor, DefaultTaskAllocator, DrivingMode, PedModel, PedType, RelationshipType, SeatId, SwitchType, VehicleModel, WeaponModel, WeaponType } from "../../sa_enums";

// Mission texts
enum Texts {
    HELP01 = 'My client\'s ~y~car~s~ was stolen by two Ballas ~r~gangsters~s~.',
    HELP02 = 'Deal with ~r~them~s~ and bring the ~y~car~s~ back.',
    HELP03 = 'The less damage to the vehicle, the bigger the ~g~~h~reward~s~.',
    HELP04 = 'Great! Now return the ~y~car~s~ back to ~b~~h~where it belongs~s~.',
    HELP05 = '~r~The car is destroyed!',
    HELP06 = 'They spotted you and try to escape!',
    HELP07 = 'Could have been better but you made it.',
    HELP08 = 'The car is in relatively good shape, well done!',
    HELP09 = 'Fascinating, not a scratch!'
}

// Constants
const plr: Player = new Player(0);
const plc: Char = plr.getChar();
const baseReward: int = 500;
const returnCarPos: [x: float, y: float, z: float] = [1616.99, -1119.24, 23.89];

// Variables
let rewardMult: int = 1;
let rewardText: string;
let driver: Char;
let passenger: Char;
let gang: Group;
let vehicle: Car;
let carBlip: Blip;
let destinationBlip: Blip;

MissionHelper.Launch(main, finish);

function main() {
    // Spawn characters, vehicles, pickups, etc.
    MissionHelper.Loader(
        [PedModel.BALLAS1, PedModel.BALLAS2, VehicleModel.Merit, WeaponModel.Pistol, WeaponModel.MicroSMG],
        function() {
            destinationBlip = Blip.AddForCoord(...returnCarPos);
            destinationBlip.changeDisplay(BlipDisplay.Neither);
            destinationBlip.changeColor(BlipColor.Blue);

            World.ClearArea(...returnCarPos, 10, true);
            Car.CustomPlateForNextCar(VehicleModel.Merit, 'K1FFLOM');
            vehicle = Car.Create(VehicleModel.Merit, ...returnCarPos);
            vehicle.setHeading(270.59);
            vehicle.setDirtLevel(0);
            vehicle.changeColor(CarColor.MedMauiBluePoly, CarColor.MedMauiBluePoly);
            vehicle.setCanRespray(false);

            carBlip = Blip.AddForCar(vehicle);
            carBlip.changeColor(BlipColor.Yellow);
            carBlip.changeDisplay(BlipDisplay.Neither);
            carBlip.setAsFriendly(true);

            driver = Char.CreateInsideCar(vehicle, PedType.Gang1, PedModel.BALLAS1);
            driver.giveWeapon(WeaponType.Pistol, 99999);
            driver.setRelationship(RelationshipType.Hate, PedType.Player1);
            driver.setRelationship(RelationshipType.Hate, PedType.Cop);
            driver.setWantedByPolice(true);

            passenger = Char.CreateAsPassenger(vehicle, PedType.Gang1, PedModel.BALLAS2, SeatId.FrontRight);
            passenger.giveWeapon(WeaponType.MicroUzi, 99999);
            passenger.setRelationship(RelationshipType.Hate, PedType.Player1);
            passenger.setRelationship(RelationshipType.Hate, PedType.Cop);
            passenger.setWantedByPolice(true);

            gang = Group.Create(DefaultTaskAllocator.SitInLeaderCar);
            gang.setLeader(driver);
            gang.setMember(passenger);
        }
    );

    // Define all mission entities
    MissionHelper.AddEntities({
        target: [driver, passenger],
        vital: [vehicle],
        other: [gang, carBlip, destinationBlip]
    });

    // Main loop
    while (true) {
        // Returning the car
        if (MissionHelper.targetEntities.length === 0) {
            if (MissionHelper.stage === 'RETURN' ) {
                if (plc.isInCar(vehicle)) {
                    carBlip.changeDisplay(BlipDisplay.Neither);
                } else {
                    carBlip.changeDisplay(BlipDisplay.Both);
                }
            } else {
                MissionHelper.stage = 'RETURN';
                Text.PrintStringNow(Texts.HELP04, 4000);
                destinationBlip.changeDisplay(BlipDisplay.Both);
            }
        }

        // Manage mission stages
        switch (MissionHelper.stage) {
            case 'SETUP':
                MissionHelper.SetCamera([
                    {
                        pos: [1609.25, -1112.18, 24.80],
                        target: [1609.96, -1112.88, 24.89],
                        duration: 4000,
                        inFade: true,
                        textString: Texts.HELP01
                    },
                    {
                        duration: function () {
                            TIMERA = 0;
                            Camera.PointAtCar(vehicle, CameraMode.BehindCar, SwitchType.JumpCut);
                            if (Char.DoesExist(+vehicle.getDriver())) {
                                setCarWander(20, DrivingMode.StopForCars);
                            }
                            while (TIMERA < 5000 && !MissionHelper.IsCutsceneSkipButtonPressed()) {
                                Text.PrintStringNow(Texts.HELP02, 0);
                                wait(0);
                            }
                        }
                    },
                    {
                        duration: function () {
                            TIMERA = 0;
                            Camera.PointAtCar(vehicle, CameraMode.WheelCam, SwitchType.JumpCut);
                            while (TIMERA < 5000 && !MissionHelper.IsCutsceneSkipButtonPressed()) {
                                Text.PrintStringNow(Texts.HELP03, 0);
                                wait(0);
                            }
                        }
                    }
                ], false);
                MissionHelper.stage = 'DRIVE';
            case 'DRIVE':
                // Player spotted
                if (plc.locateAnyMeansCar3D(vehicle, 10, 10, 10, false)
                    && (driver.isInCar(vehicle) || passenger.isInCar(vehicle))
                ) {
                    MissionHelper.stage = 'ESCAPE';
                    Text.PrintStringNow(Texts.HELP06, 4000);
                } else {
                    if (vehicle.isStopped()
                        && Char.DoesExist(+vehicle.getDriver())
                        && !plc.isInCar(vehicle)
                    ) {
                        setCarWander(15, DrivingMode.StopForCars);
                    }
                }
                break;
            case 'ESCAPE':
                if (vehicle.isStopped()
                    && Char.DoesExist(+vehicle.getDriver())
                    && !plc.isInCar(vehicle)
                ) {
                    setCarWander(25, DrivingMode.AvoidCars);
                }
                break;
            case 'RETURN':
                if (vehicle.locateStopped3D(...returnCarPos, 3, 3, 3, true)) {
                    rewardMult = (vehicle.getHealth() - 250 ) / 750;
                    MissionHelper.SetCamera([
                        {
                            inFade: true,
                            outFade: true,
                            duration: function () {
                                rewardText = rewardMult < 0.5 ? Texts.HELP07
                                    : rewardMult < 1 ? Texts.HELP08
                                    : Texts.HELP09;

                                Camera.SetFixedPosition(1627.55, -1146.70, 23.49, 0, 0, 0);
                                Camera.PointAtPoint(1627.92, -1145.80, 23.73, SwitchType.JumpCut);

                                plc.removeFromCarMaintainPosition(vehicle);
                                plc.setCoordinatesNoOffset(1630.78, -1135.09, 23.91);
                                plc.setHeading(176.93);
                                Task.CharSlideToCoord(plc, 1630.19, -1149.24, 24.07, 179.62, 3);

                                TIMERA = 0;
                                while (TIMERA < 5000 && !MissionHelper.IsCutsceneSkipButtonPressed()) {
                                    Text.PrintStringNow(rewardText, 0);
                                    wait(0);
                                }
                            }
                        }
                    ]);
                    plc.setCoordinatesNoOffset(1630.19, -1149.24, 24.07);
                    vehicle.delete();
                    MissionHelper.stage = 'FINISH';
                }
            default:
                break;
        }
        wait(0);
    }
}

function finish() {
    // Determine if the mission is passed or failed
    if (!plr.isPlaying()
        || MissionHelper.targetEntities.length > 0
        || MissionHelper.stage !== 'FINISH'
    ) {
        MissionHelper.MissionFailed(
            undefined, MissionHelper.stage !== 'FINISH' ? Texts.HELP05 : undefined
        );
    } else {
        MissionHelper.MissionPassed(true, Math.floor(baseReward * rewardMult), 3);
    }
}

function setCarWander(maxSpeed: float, mode: DrivingMode) {
    vehicle.wanderRandomly();
    vehicle.setDrivingStyle(mode);
    vehicle.setCruiseSpeed(maxSpeed);
}