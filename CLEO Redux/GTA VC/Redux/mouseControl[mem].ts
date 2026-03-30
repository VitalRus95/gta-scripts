// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import { Button, PadId, VehicleModel } from "./vc_enums.mts";
import { clamp, getMouseInput, PLAYER } from "./vc_funcs.mts";

let mouse: { x: float; y: float } = { x: 0, y: 0 };
let heli: { x: float; y: float } = { x: 0, y: 0 };
let voodoo: { x: float; y: float } = { x: 0, y: 0 };
let rmb = {
    heli: false,
    tank: false,
    voodoo: false,
    fireTruck: false,
};

while (true) {
    wait(0);

    if (!PLAYER.isPlaying()) continue;
    if (!PLAYER.isInAnyCar()) continue;

    mouse = getMouseInput();

    if (PLAYER.isInAnyHeli() || isInRcHeli()) processHeli();
    else if (PLAYER.isInModel(VehicleModel.Firetruck)) processFireTruck();
    else if (PLAYER.isInModel(VehicleModel.Voodoo)) processVoodoo();
    else if (PLAYER.isInModel(VehicleModel.Rhino)) processTank();
    else processCar();
}

function isRightMouseButtonJustDown(): boolean {
    // Old state OFF and new state ON
    return Memory.ReadU8(0x936909) === 0 && Memory.ReadU8(0x94d789) !== 0;
}

function isInRcHeli(): boolean {
    if (!PLAYER.isInRemoteMode()) return false;

    let vehicle: Car = Rc.GetCar(PLAYER);
    return (
        vehicle.isModel(VehicleModel.RC_Goblin) ||
        vehicle.isModel(VehicleModel.RC_Raider)
    );
}

function processHeli() {
    if (isRightMouseButtonJustDown()) {
        rmb.heli = !rmb.heli;
    }

    // Hold/Press `Horn` to stabilise the helicopter
    if (Pad.IsButtonPressed(PadId.Pad1, Button.LeftShock)) {
        heli.x = 0;
        heli.y = 0;
    } else {
        heli.x = rmb.heli
            ? clamp(-128, mouse.x * 1.5, 128)
            : clamp(-128, mouse.x * 0.5 + heli.x, 128);
        heli.y = clamp(-128, mouse.y * -0.5 + heli.y, 128);
    }

    Pad.EmulateButtonPressWithSensitivity(
        rmb.heli ? Button.RightStickX : Button.LeftStickX,
        heli.x,
    );
    Pad.EmulateButtonPressWithSensitivity(Button.LeftStickY, heli.y);
}

function processFireTruck() {
    if (Pad.IsButtonPressed(PadId.Pad1, Button.Circle)) {
        Pad.EmulateButtonPressWithSensitivity(
            Button.RightStickX,
            clamp(-128, mouse.x, 128),
        );
        Pad.EmulateButtonPressWithSensitivity(
            Button.RightStickY,
            clamp(-128, mouse.y, 128),
        );
    } else {
        processCar();
    }
}

function processVoodoo() {
    if (isRightMouseButtonJustDown()) {
        rmb.voodoo = !rmb.voodoo;
    }

    if (rmb.voodoo) {
        voodoo.x = clamp(-128, voodoo.x + mouse.x * -1, 128);
        voodoo.y = clamp(-128, voodoo.y + mouse.y, 128);

        Pad.EmulateButtonPressWithSensitivity(Button.RightStickX, voodoo.x);
        Pad.EmulateButtonPressWithSensitivity(Button.RightStickY, voodoo.y);
    } else {
        processCar();
    }
}

function processTank() {
    if (isRightMouseButtonJustDown()) {
        rmb.tank = !rmb.tank;
    }

    if (rmb.tank) {
        Pad.EmulateButtonPressWithSensitivity(
            Button.RightStickX,
            clamp(-128, mouse.x, 128),
        );
        Pad.EmulateButtonPressWithSensitivity(
            Button.RightStickY,
            clamp(-128, mouse.y, 128),
        );
    } else {
        processCar();
    }
}

function processCar() {
    Pad.EmulateButtonPressWithSensitivity(
        Button.LeftStickX,
        clamp(-255, mouse.x * 3, 255),
    );
    Pad.EmulateButtonPressWithSensitivity(
        Button.LeftStickY,
        clamp(-255, mouse.y * -4, 255),
    );
}
