import { AltMenu } from "../../altMenu[mem]";
import { Align, Button, PadId } from "../../sa_enums";
import { plc } from "../sharedConstants";

const colours: { name: string; slot: int }[] = [
    { name: "1ST COLOUR", slot: 1 },
    { name: "2ND COLOUR", slot: 2 },
    { name: "3RD COLOUR", slot: 3 },
    { name: "4TH COLOUR", slot: 4 },
];

export let carColMenu: AltMenu = new AltMenu(
    "Vehicle's colours",
    colours.map((c) => ({
        name: c.name,
        click: function () {
            if (!plc.isInAnyCar()) return;

            let grid = MenuGrid.Create(
                "CARM1",
                640 * 0.017,
                448 * 0.55,
                19,
                8,
                true,
                true,
                Align.Left,
            );

            grid.changeCarColor(
                plc.storeCarIsInNoSave(),
                c.slot,
                grid.getItemSelected(),
            );

            while (
                plc.isInAnyCar() &&
                !Pad.IsButtonPressed(PadId.Pad1, Button.Triangle)
            ) {
                let oldColour = grid.getItemSelected();
                wait(0);
                let newColour = grid.getItemSelected();

                if (newColour !== oldColour) {
                    grid.changeCarColor(
                        plc.storeCarIsInNoSave(),
                        c.slot,
                        newColour,
                    );
                }
            }

            grid.delete();
        },
    })),
    {
        disableHud: true,
        selectedBackgroundColour: [127, 127, 0, 127],
        titleColour: [185, 185, 0, 230],
    },
);
