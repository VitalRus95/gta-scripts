import { AltMenu } from "../../altMenu[mem]";
import { clamp, getLeftRight } from "../index";
import { CHANGE_VALUE, plc } from "../sharedConstants";

const gangs: { name: string; id: int }[] = [
    { name: "BALLAS", id: 0 },
    { name: "GROVE", id: 1 },
    { name: "VAGOS", id: 2 },
    { name: "RIFA", id: 3 },
    { name: "DA NANG BOYS", id: 4 },
    { name: "MAFIA", id: 5 },
    { name: "TRIAD", id: 6 },
    { name: "AZTECAS", id: 7 },
    { name: "GANG 9", id: 8 },
    { name: "GANG 10", id: 9 },
];

export let gangZoneMenu: AltMenu = new AltMenu(
    "Gang zone",
    gangs.map((g) => ({
        name: function () {
            let pos = plc.getCoordinates();
            let currentZone = Zone.GetName(pos.x, pos.y, pos.z);
            return `${g.name}: ~y~${Zone.GetGangStrength(currentZone, g.id)}`;
        },
        description: CHANGE_VALUE,
        display: function () {
            let change = getLeftRight();
            if (change === 0) return;
            let pos = plc.getCoordinates();
            let currentZone = Zone.GetName(pos.x, pos.y, pos.z);
            Zone.SetGangStrength(
                currentZone,
                g.id,
                clamp(0, Zone.GetGangStrength(currentZone, g.id) + change, 100),
            );
        },
    })),
    {
        selectedBackgroundColour: [0, 80, 0, 120],
        showCounter: true,
        titleColour: [220, 0, 220, 230],
    },
);
