import { AltMenu } from "../../altMenu[mem]";
import { SwitchType } from "../../sa_enums";
import { camOffset, getLeftRight } from "../index";
import { CHANGE_VALUE, plc } from "../sharedConstants";

function camOffsetString(): string {
    // Thanks to Seemann for refactoring!
    const { offsetX, offsetY, offsetZ, rotationX, rotationY, rotationZ } =
        camOffset;
    const offset = [offsetX, offsetY, offsetZ]
        .map((v) => v.toFixed(2))
        .join(" ");
    const rotation = [rotationX, rotationY, rotationZ]
        .map((v) => v.toFixed(2))
        .join(" ");
    return `~y~Offset~s~: ${offset}~n~~y~Rotation~s~: ${rotation}`;
}

export function applyCamOffset() {
    Camera.AttachToChar(
        plc,
        camOffset.offsetX,
        camOffset.offsetY,
        camOffset.offsetZ,
        camOffset.rotationX,
        camOffset.rotationY,
        camOffset.rotationZ,
        0,
        SwitchType.JumpCut,
    );
}

export let offsetMenu: AltMenu = new AltMenu(
    "Camera offset",
    [
        {
            // Help
            name: "Help",
            description: CHANGE_VALUE,
        },
        {
            // Offset X
            name: "Offset ~y~X",
            description: camOffsetString,
            display: function () {
                let change = getLeftRight();
                if (change === 0) return;
                camOffset.offsetX += change * 0.02;
                applyCamOffset();
            },
        },
        {
            // Offset Y
            name: "Offset ~y~Y",
            description: camOffsetString,
            display: function () {
                let change = getLeftRight();
                if (change === 0) return;
                camOffset.offsetY += change * 0.02;
                applyCamOffset();
            },
        },
        {
            // Offset Z
            name: "Offset ~y~Z",
            description: camOffsetString,
            display: function () {
                let change = getLeftRight();
                if (change === 0) return;
                camOffset.offsetZ += change * 0.02;
                applyCamOffset();
            },
        },
        {
            // Rotation X
            name: "Rotation ~y~X",
            description: camOffsetString,
            display: function () {
                let change = getLeftRight();
                if (change === 0) return;
                camOffset.rotationX += change * 0.02;
                applyCamOffset();
            },
        },
        {
            // Rotation Y
            name: "Rotation ~y~Y",
            description: camOffsetString,
            display: function () {
                let change = getLeftRight();
                if (change === 0) return;
                camOffset.rotationY += change * 0.02;
                applyCamOffset();
            },
        },
        {
            // Rotation Z
            name: "Rotation ~y~Z",
            description: camOffsetString,
            display: function () {
                let change = getLeftRight();
                if (change === 0) return;
                camOffset.rotationZ += change * 0.02;
                applyCamOffset();
            },
        },
    ],
    {
        addHelp: false,
    },
);
