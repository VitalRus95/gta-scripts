import { AltMenu } from "../../altMenu[mem]";
import { clamp, getLeftRight } from "../index";
import { CHANGE_VALUE, plr } from "../sharedConstants";

const stats: { name: string; id: int }[] = [
    { name: "Fat", id: 21 },
    { name: "Stamina", id: 22 },
    { name: "Muscle", id: 23 },
    { name: "Max Health", id: 24 },
    { name: "Respect", id: 68 },
    { name: "Girlfriend respect", id: 65 },
    { name: "Clothes respect", id: 66 },
    { name: "Fitness respect", id: 67 },
    { name: "Respect Mission", id: 224 },
    { name: "Respect Mission Total", id: 228 },
    { name: "Total respect", id: 64 },
    { name: "Pistol Skill", id: 69 },
    { name: "Silenced Pistol Skill", id: 70 },
    { name: "Desert Eagle Skill", id: 71 },
    { name: "Shotgun Skill", id: 72 },
    { name: "Sawn-Off Shotgun Skill", id: 73 },
    { name: "Combat Shotgun Skill", id: 74 },
    { name: "Machine Pistol Skill", id: 75 },
    { name: "SMG Skill", id: 76 },
    { name: "AK-47 Skill", id: 77 },
    { name: "M4 Skill", id: 78 },
    { name: "Rifle Skill", id: 79 },
    { name: "Appearance", id: 80 },
    { name: "Gambling", id: 81 },
    { name: "Driving skill", id: 160 },
    { name: "Armor", id: 164 },
    { name: "Energy", id: 165 },
    { name: "Flying skill", id: 223 },
    { name: "Lung capacity", id: 225 },
    { name: "Bike skill", id: 229 },
    { name: "Cycling skill", id: 230 },
    { name: "Luck", id: 233 },
];

export let playerStatsMenu: AltMenu = new AltMenu(
    "Player's statistics",
    stats.map((s) => ({
        name: function () {
            return `${s.name}: ~y~${
                s.id < 82 ? Stat.GetFloat(s.id).toFixed(0) : Stat.GetInt(s.id)
            }`;
        },
        description: CHANGE_VALUE,
        display: function () {
            let change = getLeftRight();
            if (change === 0) return;
            if (s.id < 82) {
                Stat.SetFloat(
                    s.id,
                    clamp(0, Stat.GetFloat(s.id) + change * 5, 1000),
                );
            } else {
                Stat.SetInt(
                    s.id,
                    clamp(0, Stat.GetInt(s.id) + change * 5, 1000),
                );
            }
            plr.buildModel();
        },
    })),
    {
        selectedBackgroundColour: [170, 145, 180, 90],
        titleColour: [170, 145, 180, 230],
    },
);
