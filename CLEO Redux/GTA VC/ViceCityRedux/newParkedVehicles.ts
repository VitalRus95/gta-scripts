// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import { CarColor, CarLock, VehicleModel } from "../ScriptingKit/vc_enums.mts";
import { PLAYER, randomArrayItem, randomInt } from "../ScriptingKit/vc_funcs.mts";

type ParkedVehicle = {
    model: VehicleModel;
    position: [float, float, float];
    heading: float;
    health?: int;
    colours?: {
        primary: int[];
        secondary: int[];
    };
    proofs?: {
        bullet: boolean;
        fire: boolean;
        explosion: boolean;
        collision: boolean;
        melee: boolean;
    };
    active?: boolean;
};

const RADIUS: float = 75;
const vehicles: ParkedVehicle[] = [
    {
        model: VehicleModel.Skimmer,
        position: [-398.051, -1315.3, 7.406],
        heading: 2.966,
    },
    {
        model: VehicleModel.Skimmer,
        position: [-1210.447, -1377.038, 7.402],
        heading: 154.546,
    },
    {
        model: VehicleModel.Maverick,
        position: [-1126.905, 1513.705, 10.98],
        heading: 183.182,
    },
    {
        model: VehicleModel.Maverick,
        position: [-907.138, 1021.386, 77.162],
        heading: 242.292,
    },
    {
        model: VehicleModel.Sparrow,
        position: [-1796.792, -840.799, 14.112],
        heading: 269.502,
    },
    {
        model: VehicleModel.SeaSparrow,
        position: [-168.831, 624.35, 10.079],
        heading: 105.594,
    },
    {
        model: VehicleModel.Police,
        position: [-665.298, 799.408, 10.037],
        heading: 359.755,
        colours: {
            primary: [CarColor.White],
            secondary: [CarColor.White],
        },
    },
    {
        model: VehicleModel.FBI_Rancher,
        position: [-616.404, 752.113, 10.5],
        heading: 86.857,
    },
    {
        model: VehicleModel.Sanchez,
        position: [-71.702, 989.201, 9.94],
        heading: 253.597,
    },
    {
        model: VehicleModel.CubanHermes,
        position: [-1176.763, -523.919, 10.059],
        heading: 6.03,
    },
    {
        model: VehicleModel.Faggio,
        position: [-1174.122, -370.85, 9.808],
        heading: 8.91,
    },
    {
        model: VehicleModel.PCJ600,
        position: [-73.337, -1386.848, 9.018],
        heading: 358.1,
        colours: {
            primary: [
                CarColor.Black,
                CarColor.White,
                CarColor.Red1,
                CarColor.Blue1,
                CarColor.Yellow1,
                CarColor.Green1,
            ],
            secondary: [CarColor.White, CarColor.Black],
        },
    },
    {
        model: VehicleModel.BloodringBanger2,
        position: [30.238, -1560.503, 8.974],
        heading: 83.469,
    },
    {
        model: VehicleModel.Sandking,
        position: [273.603, -1496.292, 9.591],
        heading: 320.217,
    },
    {
        model: VehicleModel.Sanchez,
        position: [588.967, 417.443, 9.247],
        heading: 263.323,
    },
    {
        model: VehicleModel.Rumpo,
        position: [335.412, -234.492, 11.202],
        heading: 91.79,
    },
    {
        model: VehicleModel.RomerosHearse,
        position: [-882.587, -499.716, 9.94],
        heading: 275.769,
    },
    {
        model: VehicleModel.Dinghy,
        position: [-89.473, 1083.873, 4.156],
        heading: 71.975,
    },
    {
        model: VehicleModel.CoastGuard,
        position: [-328.564, -1638.812, 5.813],
        heading: 179.488,
    },
    {
        model: VehicleModel.Dinghy,
        position: [-294.3, -1721.644, 5.877],
        heading: 271.253,
    },
    {
        model: VehicleModel.Dinghy,
        position: [-1241.159, -1398.519, 5.843],
        heading: 248.723,
        colours: {
            primary: [
                CarColor.Red7,
                CarColor.Orange9,
                CarColor.Yellow10,
                CarColor.Green7,
                CarColor.Blue1,
            ],
            secondary: [CarColor.Black, CarColor.LightBlueGrey, CarColor.Hoods],
        },
    },
];

while (true) {
    wait(100);

    if (!PLAYER.isPlaying()) continue;

    for (let v of vehicles) {
        if (PLAYER.locateAnyMeans3D(...v.position, RADIUS, RADIUS, RADIUS, false)) {
            if (v.active) continue;
            if (!Streaming.HasModelLoaded(v.model)) {
                Streaming.RequestModel(v.model);
                continue;
            }

            let vehicle = Car.Create(v.model, ...v.position);
            vehicle.lockDoors(CarLock.Unlocked);
            vehicle.setHeading(v.heading);

            if (v.health) {
                vehicle.setHealth(v.health);
            }
            if (v.colours) {
                vehicle.changeColor(
                    randomArrayItem(v.colours.primary) ?? randomInt(0, 95),
                    randomArrayItem(v.colours.secondary) ?? randomInt(0, 95),
                );
            }
            if (v.proofs) {
                vehicle.setProofs(
                    v.proofs.bullet,
                    v.proofs.fire,
                    v.proofs.explosion,
                    v.proofs.collision,
                    v.proofs.melee,
                );
            }
            Streaming.MarkModelAsNoLongerNeeded(v.model);
            vehicle.markAsNoLongerNeeded();
            v.active = true;
        } else {
            if (v.active) v.active = false;
        }
    }
}
