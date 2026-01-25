import { AltMenu } from "../../altMenu[mem]";

const GRAVITY_EARTH: float = 0.008;
const GRAVITY_MOON: float = GRAVITY_EARTH * 0.166;
const GRAVITY_MARS: float = GRAVITY_EARTH * 0.32;
const GRAVITY_WEAK: float = GRAVITY_EARTH * 0.5;
const GRAVITY_STRONG: float = GRAVITY_EARTH * 1.5;
const GRAVITY_SUPERWEAK: float = GRAVITY_EARTH / 8;
const GRAVITY_SUPERSTRONG: float = GRAVITY_EARTH * 3;
const GRAVITY_NEGATIVE: float = GRAVITY_SUPERWEAK * -1;

const gravityTypes: { name: string; value: float }[] = [
    {
        name: "Earth",
        value: GRAVITY_EARTH,
    },
    {
        name: "Moon",
        value: GRAVITY_MOON,
    },
    {
        name: "Mars",
        value: GRAVITY_MARS,
    },
    {
        name: "Weak",
        value: GRAVITY_WEAK,
    },
    {
        name: "Zero",
        value: 0,
    },
    {
        name: "Strong",
        value: GRAVITY_STRONG,
    },
    {
        name: "Superweak",
        value: GRAVITY_SUPERWEAK,
    },
    {
        name: "Superstrong",
        value: GRAVITY_SUPERSTRONG,
    },
    {
        name: "Negative",
        value: GRAVITY_NEGATIVE,
    },
];

export let gravityMenu: AltMenu = new AltMenu(
    "Gravity",
    gravityTypes.map((g) => ({
        name: g.name,
        description: g.value.toFixed(5),
        click: function () {
            Memory.WriteFloat(0x863984, g.value, false);
        },
    })),
);
