import { AltMenu } from "../../altMenu[mem]";
import { ScriptSound } from "../../sa_enums";
import { plc } from "../sharedConstants";

const weapons: { name: string; id: int; ammo: int }[] = [
    { name: "BRASS KNUCKLES", id: 1, ammo: 1 },
    { name: "GOLF CLUB", id: 2, ammo: 1 },
    { name: "NIGHT STICK", id: 3, ammo: 1 },
    { name: "KNIFE", id: 4, ammo: 1 },
    { name: "BASEBALL BAT", id: 5, ammo: 1 },
    { name: "SHOVEL", id: 6, ammo: 1 },
    { name: "POOL CUE", id: 7, ammo: 1 },
    { name: "KATANA", id: 8, ammo: 1 },
    { name: "CHAINSAW", id: 9, ammo: 1 },
    { name: "PURPLE DILDO", id: 10, ammo: 1 },
    { name: "WHITE DILDO", id: 11, ammo: 1 },
    { name: "LONG WHITE DILDO", id: 12, ammo: 1 },
    { name: "WHITE DILDO 2", id: 13, ammo: 1 },
    { name: "FLOWERS", id: 14, ammo: 1 },
    { name: "CANE", id: 15, ammo: 1 },
    { name: "GRENADES", id: 16, ammo: 8 },
    { name: "TEAR GAS", id: 17, ammo: 8 },
    { name: "MOLOTOVS", id: 18, ammo: 8 },
    { name: "PISTOL", id: 22, ammo: 17 },
    { name: "SILENCED PISTOL", id: 23, ammo: 17 },
    { name: "DESERT EAGLE", id: 24, ammo: 14 },
    { name: "SHOTGUN", id: 25, ammo: 10 },
    { name: "SAWN-OFF SHOTGUN", id: 26, ammo: 10 },
    { name: "COMBAT SHOTGUN", id: 27, ammo: 14 },
    { name: "MICRO UZI", id: 28, ammo: 50 },
    { name: "MP5", id: 29, ammo: 30 },
    { name: "AK47", id: 30, ammo: 30 },
    { name: "M4", id: 31, ammo: 50 },
    { name: "TEC9", id: 32, ammo: 50 },
    { name: "RIFLE", id: 33, ammo: 10 },
    { name: "SNIPER RIFLE", id: 34, ammo: 10 },
    { name: "ROCKET LAUNCHER", id: 35, ammo: 8 },
    { name: "HEAT SEEKING ROCKET LAUNCHER", id: 36, ammo: 8 },
    { name: "FLAMETHROWER", id: 37, ammo: 250 },
    { name: "MINIGUN", id: 38, ammo: 250 },
    { name: "SACHEL CHARGES", id: 39, ammo: 8 },
    { name: "DETONATOR", id: 40, ammo: 1 },
    { name: "SPRAY PAINT", id: 41, ammo: 250 },
    { name: "FIRE EXTINGUISHER", id: 42, ammo: 250 },
    { name: "CAMERA", id: 43, ammo: 5 },
    { name: "NIGHT VISION GOGGLES", id: 44, ammo: 1 },
    { name: "THERMAL GOGGLES", id: 45, ammo: 1 },
    { name: "PARACHUTE", id: 46, ammo: 1 },
];

export let weaponMenu: AltMenu = new AltMenu(
    "Weapons",
    weapons.map((w) => ({
        name: w.name,
        enter: function () {
            TIMERA = 0;
        },
        hold: function () {
            if (TIMERA < 250) return;
            TIMERA = 0;
            let model: int = Weapon.GetModel(w.id);
            Streaming.RequestModel(model);
            Streaming.LoadAllModelsNow();
            plc.giveWeapon(w.id, w.ammo);
            Streaming.MarkModelAsNoLongerNeeded(model);
            Sound.AddOneOffSound(0, 0, 0, ScriptSound.SoundShopBuy);
        },
    })),
    {
        selectedBackgroundColour: [255, 127, 127, 155],
        showCounter: true,
        titleColour: [255, 127, 127, 230],
    },
);
