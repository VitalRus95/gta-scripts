//	Script by Vital (Vitaly Pavlovich Ulyanov)
/// <reference path=".config/sa.d.ts"/>

import { KeyCode, WeaponType, WeatherType } from "./.config/enums";
import { DefaultStyles, ScrollMenu, RGBA } from "./Modules/ScrollMenu";

const AreasColours = {
    'LA': new RGBA(170, 170, 170),
    'LV': new RGBA(210, 210, 60),
    'SF': new RGBA(110, 150, 200),
    'Countryside': new RGBA(55, 255, 55),
    'Desert': new RGBA(255, 95, 80),
};

var plr = new Player(0),
    plc = plr.getChar(),
    menu = new ScrollMenu([
        {   // Header
            name: 'FEM_MM',
            func: () => showTextBox('Scroll Menu module by Vital (Vitaly Pavlovich Ulyanov).~n~Thanks for help to Seemann.'),
            style: DefaultStyles.PricedownHeader
        },
        {   // Health
            name: 'CHEAT3',
            func: () => plc.setHealth(plc.getHealth() + 25)
        },
        {   // Amour
            name: 'CHEAT4',
            func: () => plc.addArmor(20)
        },
        {   // Money
            name: 'CHEAT6',
            func: () => plr.addScore(100)
        },
        {   // Wanted level
            name: 'CHEAT5',
            func: () => plr.clearWantedLevel()
        },
        {
            // Weapons
            name: 'CHEAT2',
            func: () => {
                while (weaponMenu.draw({ y: 30 })) {
                    wait(0);
                }
            },
            style: {
                colour: new RGBA(130, 130, 255)
            }
        },
        {
            // Weather
            name: 'CHEAT7',
            func: () => {
                while (weatherMenu.draw({ y: 315 })) {
                    wait(0);
                }
            },
            style: {
                colour: new RGBA(255, 255, 130)
            }
        }
    ]),
    weaponMenu = new ScrollMenu([
        {   // Header
            name: 'CHEAT2',
            style: DefaultStyles.PricedownHeader
        },
        {   // Pistol
            name: 'STWE001',
            func: giveWeaponToPlayer,
            args: [WeaponType.Pistol, 34]
        },
        {   // Silenced Pistol
            name: 'STWE002',
            func: giveWeaponToPlayer,
            args: [WeaponType.PistolSilenced, 34]
        },
        {   // Desert Eagle
            name: 'STWE003',
            func: giveWeaponToPlayer,
            args: [WeaponType.DesertEagle, 21]
        },
        {   // Shotgun
            name: 'STWE004',
            func: giveWeaponToPlayer,
            args: [WeaponType.Shotgun, 10]
        },
        {   // Sawn-off Shotgun
            name: 'STWE005',
            func: giveWeaponToPlayer,
            args: [WeaponType.Sawnoff, 12]
        },
        {   // Combat Shotgun
            name: 'STWE006',
            func: giveWeaponToPlayer,
            args: [WeaponType.Spas12, 14]
        },
        {   // Machine Pistol
            name: 'UZI',
            func: giveWeaponToPlayer,
            args: [WeaponType.MicroUzi, 30]
        },
        {   // SMG
            name: 'MP5',
            func: giveWeaponToPlayer,
            args: [WeaponType.Mp5, 30]
        },
        {   // AK47
            name: 'STWE009',
            func: giveWeaponToPlayer,
            args: [WeaponType.Ak47, 30]
        },
        {   // M4
            name: 'STWE010',
            func: giveWeaponToPlayer,
            args: [WeaponType.M4, 50]
        },
        {   // Tec9
            name: 'STWE011',
            func: giveWeaponToPlayer,
            args: [WeaponType.Tec9, 30]
        }
    ]),
    weatherMenu = new ScrollMenu([
        {   // Header
            name: 'CHEAT7',
            style: DefaultStyles.PricedownHeader
        },
        {   // WEATHER SUNNY LA
            name: 'WEATH1',
            func: Weather.ForceNow,
            args: [WeatherType.SunnyLa],
            style: { colour: AreasColours.LA }
        },
        {   // WEATHER CLOUDY LA
            name: 'WEATH2',
            func: Weather.ForceNow,
            args: [WeatherType.CloudyLa],
            style: { colour: AreasColours.LA }
        },
        {   // WEATHER EXTRASUNNY LA
            name: 'WEATH3',
            func: Weather.ForceNow,
            args: [WeatherType.ExtraSunnyLa],
            style: { colour: AreasColours.LA }
        },
        {   // WEATHER SUNNY SMOG LA
            name: 'WEATH4',
            func: Weather.ForceNow,
            args: [WeatherType.SunnySmogLa],
            style: { colour: AreasColours.LA }
        },
        {   // WEATHER EXTRASUNNY SMOG LA
            name: 'WEATH5',
            func: Weather.ForceNow,
            args: [WeatherType.ExtraSunnySmogLa],
            style: { colour: AreasColours.LA }
        },
        {   // WEATHER RAINY COUNTRYSIDE
            name: 'WEATH6',
            func: Weather.ForceNow,
            args: [WeatherType.RainyCountryside],
            style: { colour: AreasColours.Countryside }
        },
        {   // WEATHER CLOUDY COUNTRYSIDE
            name: 'WEATH7',
            func: Weather.ForceNow,
            args: [WeatherType.CloudyCountryside],
            style: { colour: AreasColours.Countryside }
        },
        {   // WEATHER SUNNY COUNTRYSIDE
            name: 'WEATH8',
            func: Weather.ForceNow,
            args: [WeatherType.SunnyCountryside],
            style: { colour: AreasColours.Countryside }
        },
        {   // WEATHER EXTRASUNNY COUNTRYSIDE
            name: 'WEATH9',
            func: Weather.ForceNow,
            args: [WeatherType.ExtraSunnyCountryside],
            style: { colour: AreasColours.Countryside }
        },
        {   // WEATHER FOGGY SF
            name: 'WEATH10',
            func: Weather.ForceNow,
            args: [WeatherType.FoggySf],
            style: { colour: AreasColours.SF }
        },
        {   // WEATHER SUNNY SF
            name: 'WEATH11',
            func: Weather.ForceNow,
            args: [WeatherType.SunnySf],
            style: { colour: AreasColours.SF }
        },
        {   // WEATHER EXTRASUNNY SF
            name: 'WEATH12',
            func: Weather.ForceNow,
            args: [WeatherType.ExtraSunnySf],
            style: { colour: AreasColours.SF }
        },
        {   // WEATHER CLOUDY SF
            name: 'WEATH13',
            func: Weather.ForceNow,
            args: [WeatherType.CloudySf],
            style: { colour: AreasColours.SF }
        },
        {   // WEATHER RAINY SF
            name: 'WEATH14',
            func: Weather.ForceNow,
            args: [WeatherType.RainySf],
            style: { colour: AreasColours.SF }
        },
        {   // WEATHER SANDSTORM DESERT
            name: 'WEATH15',
            func: Weather.ForceNow,
            args: [WeatherType.SandstormDesert],
            style: { colour: AreasColours.Desert }
        },
        {   // WEATHER SUNNY DESERT
            name: 'WEATH16',
            func: Weather.ForceNow,
            args: [WeatherType.SunnyDesert],
            style: { colour: AreasColours.Desert }
        },
        {   // WEATHER EXTRASUNNY DESERT
            name: 'WEATH17',
            func: Weather.ForceNow,
            args: [WeatherType.ExtraSunnyDesert],
            style: { colour: AreasColours.Desert }
        },
        {   // WEATHER SUNNY VEGAS
            name: 'WEATH18',
            func: Weather.ForceNow,
            args: [WeatherType.SunnyVegas],
            style: { colour: AreasColours.LV }
        },
        {   // WEATHER EXTRASUNNY VEGAS
            name: 'WEATH19',
            func: Weather.ForceNow,
            args: [WeatherType.ExtraSunnyVegas],
            style: { colour: AreasColours.LV }
        },
        {   // WEATHER CLOUDY VEGAS
            name: 'WEATH20',
            func: Weather.ForceNow,
            args: [WeatherType.CloudyVegas],
            style: { colour: AreasColours.LV }
        },
        {   // EXTRAcolorS 1
            name: 'WEATH21',
            func: Weather.ForceNow,
            args: [WeatherType.ExtraColours1]
        },
        {   // EXTRAcolorS 2
            name: 'WEATH22',
            func: Weather.ForceNow,
            args: [WeatherType.ExtraColours2]
        }
    ], {
        selectedBackground: true,
        selectedColour: undefined
    });

while (true) {
    wait(0);

    if (Pad.IsKeyDown(KeyCode.X)) {
        while (menu.draw({ y: 315 })) {
            wait(0);
        }
    }
}

/**
 * Loads and gives a weapon to the player.
 * @param {int} weaponId Weapon type
 * @param {int} ammo Ammo to give
 */
function giveWeaponToPlayer(weaponId, ammo) {
    var weaponModel = Weapon.GetModel(weaponId);
    Streaming.RequestModel(weaponModel);
    Streaming.LoadAllModelsNow();
    plc.giveWeapon(weaponId, ammo);
    Streaming.MarkModelAsNoLongerNeeded(weaponModel);
}