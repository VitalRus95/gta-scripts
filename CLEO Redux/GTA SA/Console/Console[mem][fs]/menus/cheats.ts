import { AltMenu } from "../../altMenu[mem]";
import { OFF, ON } from "../sharedConstants";

const cheats: { name: string; address: int }[] = [
    { name: "AGGRESSIVE DRIVERS", address: 0x96914f },
    { name: "ALL CARS HAVE NITRO", address: 0x969165 },
    { name: "ALL GREEN LIGHTS", address: 0x96914e },
    { name: "ALL TAXIS HAVE NITRO", address: 0x96918b },
    { name: "BLACK TRAFFIC", address: 0x969151 },
    { name: "BOATS CAN FLY", address: 0x969153 },
    { name: "CARS CAN DRIVE ON WATER", address: 0x969152 },
    { name: "CARS CAN FLY", address: 0x969160 },
    { name: "CARS FLOAT AWAY WHEN HIT", address: 0x969166 },
    { name: "DECREASED TRAFFIC", address: 0x96917a },
    { name: "EVERYONE IS ARMED", address: 0x969140 },
    { name: "FASTER CLOCK", address: 0x96913b },
    { name: "FULL WEAPON AIMING WHILE DRIVING", address: 0x969179 },
    { name: "GANGS CONTROL THE STREETS", address: 0x96915b },
    { name: "HUGE BUNNY HOP", address: 0x969161 },
    { name: "INFINITE AMMO", address: 0x969178 },
    { name: "INFINITE OXYGEN", address: 0x96916e },
    { name: "MEGA JUMP", address: 0x96916c },
    { name: "MEGA PUNCH", address: 0x969173 },
    { name: "NEVER GET HUNGRY", address: 0x969174 },
    { name: "MAX SEX APPEAL", address: 0x969180 },
    { name: "PEDS ATTACK EACH OTHER", address: 0x96913e },
    { name: "PEDS' RIOT", address: 0x969175 },
    { name: "PERFECT HANDLING", address: 0x96914c },
    { name: "PINK TRAFFIC", address: 0x969150 },
    { name: "RECRUIT ANYONE (9MM)", address: 0x96917c },
    { name: "RECRUIT ANYONE (AK47)", address: 0x96917d },
    { name: "RECRUIT ANYONE (ROCKETS)", address: 0x96917e },
    { name: "STOP GAME CLOCK", address: 0x969168 },
    { name: "TANK MODE", address: 0x969164 },
    { name: "TRAFFIC IS CHEAP CARS", address: 0x96915e },
    { name: "TRAFFIC IS FAST CARS", address: 0x96915f },
    { name: "WHEELS ONLY (INVISIBLE CARS)", address: 0x96914b },
];

export let cheatsMenu: AltMenu = new AltMenu(
    "Cheats",
    cheats.map((c) => ({
        name: function () {
            return `${c.name}: ${
                Memory.ReadU8(c.address, false) !== 0 ? ON : OFF
            }`;
        },
        click: function () {
            Memory.WriteU8(
                c.address,
                +!(Memory.ReadU8(c.address, false) !== 0),
                false,
            );
        },
    })),
    {
        selectedBackgroundColour: [255, 70, 150, 90],
        showCounter: true,
        titleColour: [255, 70, 150, 230],
    },
);
