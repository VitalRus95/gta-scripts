//  Script by Vital (Vitaly Pavlovich Ulyanov)
import { MissionHelper } from "../../missionHelper";
import {  } from "../../sa_enums";

// Mission texts
enum Texts {
    HELP01 = '',
}

// Constants
const plr: Player = new Player(0);
const plc: Char = plr.getChar();
const plg: Group = plr.getGroup();

// Variables


MissionHelper.Launch(main, finish);

function main() {
    // Spawn characters, vehicles, pickups, etc.
    MissionHelper.Loader(
        [],
        function() {}
    );

    // Define all mission entities
    MissionHelper.AddEntities({
        target: [],
        vital: [],
        other: []
    });

    // Main loop
    while (MissionHelper.targetEntities.length > 0 && MissionHelper.stage !== 'FINISH') {
        // Manage mission stages
        switch (MissionHelper.stage) {
            case 'SETUP':
                MissionHelper.SetCamera([], false);
                MissionHelper.stage = '';
            case '':
            default:
                break;
        }
        wait(0);
    }
}

function finish() {
    // Determine if the mission is passed or failed
    if (!plr.isPlaying() || MissionHelper.targetEntities.length > 0) {
        MissionHelper.MissionFailed();
    } else {
        MissionHelper.MissionPassed();
    }
}