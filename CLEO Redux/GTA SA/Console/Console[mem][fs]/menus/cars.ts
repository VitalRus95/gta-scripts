import data from "../../../data/vehicles.ide";
import { AltMenu, Item } from "../../altMenu[mem]";
import { CarLock, Font, RadioChannel, SwitchType } from "../../sa_enums";
import { plc } from "../sharedConstants";

const CAR_MODEL: int = 0;
const CAR_TYPE: int = 3;
const CAR_NAME: int = 5;

let options: Item[] = data.cars
    .sort((a, b) =>
        Text.GetLabelString(a[CAR_NAME]).localeCompare(
            Text.GetLabelString(b[CAR_NAME]),
        ),
    )
    .filter(
        (c) =>
            c &&
            Text.GetStringWidthWithNumber(c[CAR_NAME], 0) &&
            c[CAR_TYPE] !== "train",
    )
    .map((c) => ({
        name: `#${c[CAR_NAME]}`,
        enter: function () {
            spawnVehicle(+c[CAR_MODEL], false);
        },
        click: function () {
            spawnVehicle(+c[CAR_MODEL], true);
        },
    }));

export let carMenu: AltMenu = new AltMenu("Quick car spawner", options, {
    disableHud: true,
    counterAlignment: "CENTRE",
    counterPos: { x: 0.5, y: 0.1 },
    itemsPos: { x: 0.03, y: 0.7 },
    selectedBackgroundColour: [210, 210, 70, 100],
    showCounter: true,
    titleColour: [210, 210, 70, 230],
    titleAlignment: "CENTRE",
    titleFont: Font.Gothic,
    titleFontSize: { height: 2.7, width: 0.7 },
    titlePos: { x: 0.5, y: 0.03 },
});

function spawnVehicle(modelId: int, warpInto: boolean) {
    Streaming.RequestModel(modelId);
    Streaming.LoadAllModelsNow();

    let size = Streaming.GetModelDimensions(modelId);
    let pos = plc.getOffsetInWorldCoords(0, size.rightTopFrontX + 6, 0.5);

    World.ClearArea(pos.x, pos.y, pos.z, 50, true);
    let veh = Car.Create(modelId, pos.x, pos.y, pos.z);
    veh.setHeading(plc.getHeading() + 90);
    veh.lockDoors(CarLock.Unlocked);

    let camPoint = veh.getOffsetInWorldCoords(
        size.leftBottomBackX * 1.5 - 3,
        size.rightTopFrontY + 6,
        size.rightTopFrontZ * 1.1,
    );
    Camera.SetFixedPosition(camPoint.x, camPoint.y, camPoint.z, 0, 0, 0);
    Camera.PointAtPoint(pos.x, pos.y, pos.z, SwitchType.JumpCut);

    if (warpInto) {
        if (plc.isInAnyCar()) {
            let current = plc.storeCarIsInNoSave();
            plc.warpFromCarToCoord(pos.x, pos.y, pos.z);
            current.delete();
        }
        plc.warpIntoCar(veh);
        Camera.RestoreJumpcut();
        Audio.SetRadioChannel(RadioChannel.None);
    }

    veh.markAsNoLongerNeeded();
    Streaming.MarkModelAsNoLongerNeeded(modelId);
}
