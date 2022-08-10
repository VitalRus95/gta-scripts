//	Script by Vital (Vitaly Pavlovich Ulyanov)
/// <reference path=".config/sa.d.ts"/>

import { KeyCode } from ".config/enums.js";
import { Panel, Option, dummyText } from "./Modules/Panels";

// Make a constant for menu activation button
const activation = KeyCode.Z;

// Let's keep all the GXT entries from the original game in another constant
const Texts = {
    'Title': 'FEM_MM',
    'Health': 'CHEAT3',
    'Armour': 'CHEAT4',
    'Money': 'CHEAT6',
    'WantedLevel': 'CHEAT5',
    'Weather': 'CHEAT7',
    'Backward': 'FEC_BAC',
    'Forward': 'FEC_FOR',
    'Variable': 'BJ_0',
    'Dollar': 'DOLLAR',
    // Weather constants are arrays with weather type and its corresponding name
    'ExtraSunnyLa': [0, 'WEATH3'],
    'SunnyLa': [1, 'WEATH1'],
    'ExtraSunnySmogLa': [2, 'WEATH5'],
    'SunnySmogLa': [3, 'WEATH4'],
    'CloudyLa': [4, 'WEATH2'],
    'SunnySf': [5, 'WEATH11'],
    'ExtraSunnySf': [6, 'WEATH12'],
    'CloudySf': [7, 'WEATH13'],
    'RainySf': [8, 'WEATH14'],
    'FoggySf': [9, 'WEATH10'],
    'SunnyVegas': [10, 'WEATH18'],
    'ExtraSunnyVegas': [11, 'WEATH19'],
    'CloudyVegas': [12, 'WEATH20'],
    'ExtraSunnyCountryside': [13, 'WEATH9'],
    'SunnyCountryside': [14, 'WEATH8'],
    'CloudyCountryside': [15, 'WEATH7'],
    'RainyCountryside': [16, 'WEATH6'],
    'ExtraSunnyDesert': [17, 'WEATH17'],
    'SunnyDesert': [18, 'WEATH16'],
    'SandstormDesert': [19, 'WEATH15']
};

var plr = new Player(0),
    plc = plr.getChar(),
    panel; // This variable will contain our future menu panel

while (true) {
    wait(0);

    if (plr.isPlaying() && !plc.isInAnyCar() && Pad.IsKeyDown(activation)) {
        pageMain(); // Call the function which creates the main page of our menu panel

        if (Hud.IsRadarVisible()) {
            Hud.DisplayRadar(false);
        }

        // Panel module automatically checks exit conditions (pressing 'Enter car' button, death, or arrest)
        while (panel.exists) {
            panel.processChoice(); // Just call this built-in function for choice processing
            wait(0);
        }

        Hud.DisplayRadar(true);
    }
}

// If your menu consists of pages (12 options max per page), you can manage each in its own function
function pageMain() {
    // Create the panel. The only obligatory argument is the title.
    panel = new Panel(Texts.Title, 0, 335, 320, 2);
    // Set up the panel's options that the player will be able to choose
    panel.addColumn(0, dummyText, [
        // Health
        new Option(Texts.Health, function(){
            plc.setHealth(plc.getHealth() + 25);
            showTextBox('Some health');
        }),
        // Armour
        new Option(Texts.Armour, function(){
            plc.addArmor(20);
            showTextBox('Some armour');
        }),
        // Money
        new Option(Texts.Money, function(){
            plr.addScore(100);
            showTextBox('Some money');
        }),
        // Clear wanted level
        new Option(Texts.WantedLevel, function(){
            plr.alterWantedLevel(0);
            showTextBox('Drop wanted level');
        }),
        // Change weather (highlighted)
        new Option(Texts.Weather, function(){
            panel.delete();
            pageWeather1();
        }, [], true)
    ]);

    panel.addColumn(1, dummyText, [
        new Option(Texts.Variable, undefined, [], false, [25]),
        new Option(Texts.Variable, undefined, [], false, [20]),
        new Option(Texts.Dollar, undefined, [], false, [100])
    ]);
}

function pageWeather1() {
    panel = new Panel(Texts.Weather, 0, 225, 640);
    panel.addColumn(0, dummyText, [
        // Back (highlighted)
        new Option(Texts.Backward, function(){
            panel.delete();
            pageMain();
        }, [], true),
        // Change weather
        new Option(Texts.CloudyCountryside[1], function(){
            Weather.ForceNow(Texts.CloudyCountryside[0]);
        }),
        new Option(Texts.CloudyLa[1], function(){
            Weather.ForceNow(Texts.CloudyLa[0]);
        }),
        new Option(Texts.CloudySf[1], function(){
            Weather.ForceNow(Texts.CloudySf[0]);
        }),
        new Option(Texts.CloudyVegas[1], function(){
            Weather.ForceNow(Texts.CloudyVegas[0]);
        }),
        new Option(Texts.ExtraSunnyCountryside[1], function(){
            Weather.ForceNow(Texts.ExtraSunnyCountryside[0]);
        }),
        new Option(Texts.ExtraSunnyDesert[1], function(){
            Weather.ForceNow(Texts.ExtraSunnyDesert[0]);
        }),
        new Option(Texts.ExtraSunnyLa[1], function(){
            Weather.ForceNow(Texts.ExtraSunnyLa[0]);
        }),
        new Option(Texts.ExtraSunnySf[1], function(){
            Weather.ForceNow(Texts.ExtraSunnySf[0]);
        }),
        new Option(Texts.ExtraSunnySmogLa[1], function(){
            Weather.ForceNow(Texts.ExtraSunnySmogLa[0]);
        }),
        new Option(Texts.ExtraSunnyVegas[1], function(){
            Weather.ForceNow(Texts.ExtraSunnyVegas[0]);
        }),
        // Forward (highlighted)
        new Option(Texts.Forward, function(){
            panel.delete();
            pageWeather2();
        }, [], true)
    ]);
}

function pageWeather2() {
    panel = new Panel(Texts.Weather, 0, 225, 640);
    panel.addColumn(0, dummyText, [
        // Back (highlighted)
        new Option(Texts.Backward, function(){
            panel.delete();
            pageWeather1();
        }, [], true),
        // Change weather
        new Option(Texts.FoggySf[1], function(){
            Weather.ForceNow(Texts.FoggySf[0]);
        }),
        new Option(Texts.RainyCountryside[1], function(){
            Weather.ForceNow(Texts.RainyCountryside[0]);
        }),
        new Option(Texts.RainySf[1], function(){
            Weather.ForceNow(Texts.RainySf[0]);
        }),
        new Option(Texts.SandstormDesert[1], function(){
            Weather.ForceNow(Texts.SandstormDesert[0]);
        }),
        new Option(Texts.SunnyCountryside[1], function(){
            Weather.ForceNow(Texts.SunnyCountryside[0]);
        }),
        new Option(Texts.SunnyDesert[1], function(){
            Weather.ForceNow(Texts.SunnyDesert[0]);
        }),
        new Option(Texts.SunnyLa[1], function(){
            Weather.ForceNow(Texts.SunnyLa[0]);
        }),
        new Option(Texts.SunnySf[1], function(){
            Weather.ForceNow(Texts.SunnySf[0]);
        }),
        new Option(Texts.SunnySmogLa[1], function(){
            Weather.ForceNow(Texts.SunnySmogLa[0]);
        }),
        new Option(Texts.SunnyVegas[1], function(){
            Weather.ForceNow(Texts.SunnyVegas[0]);
        }),
        // Back to main page (highlighted)
        new Option(Texts.Title, function(){
            panel.delete();
            pageMain();
        }, [], true),
    ]);
}