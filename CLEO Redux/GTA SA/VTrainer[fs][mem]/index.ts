//	Script by Vital (Vitaly Pavlovich Ulyanov)

import { Texts } from "./texts";
import data from "../../data/vehicles.ide";

enum Elements {
    Text = 0,
    TextDisabled,
    WindowBg,
    ChildBg,
    PopupBg,
    Border,
    BorderShadow,
    FrameBg,
    FrameBgHovered,
    FrameBgActive,
    TitleBg,
    TitleBgActive,
    TitleBgCollapsed,
    MenuBarBg,
    ScrollbarBg,
    ScrollbarGrab,
    ScrollbarGrabHovered,
    ScrollbarGrabActive,
    CheckMark,
    SliderGrab,
    SliderGrabActive,
    Button,
    ButtonHovered,
    ButtonActive,
    Header,
    HeaderHovered,
    HeaderActive,
    Separator,
    SeparatorHovered,
    SeparatorActive,
    ResizeGrip,
    ResizeGripHovered,
    ResizeGripActive,
    Tab,
    TabHovered,
    TabActive,
    TabUnfocused,
    TabUnfocusedActive,
    PlotLines,
    PlotLinesHovered,
    PlotHistogram,
    PlotHistogramHovered,
    TableHeaderBg,
    TableBorderStrong,
    TableBorderLight,
    TableRowBg,
    TableRowBgAlt,
    TextSelectedBg,
    DragDropTarget,
    NavHighlight,
    NavWindowingHighlight,
    NavWindowingDimBg,
    ModalWindowDimBg
}

let customStyle: { element: Elements, RGBA: int[]; }[] = [
    { element: Elements.FrameBg, RGBA: [0, 255, 255, 50] },
    { element: Elements.FrameBgHovered, RGBA: [125, 0, 0, 175] },
    { element: Elements.FrameBgActive, RGBA: [150, 0, 0, 200] },
    { element: Elements.SliderGrab, RGBA: [0, 0, 0, 175] },
    { element: Elements.SliderGrabActive, RGBA: [0, 0, 0, 200] },
    { element: Elements.CheckMark, RGBA: [0, 0, 0, 255] },
    { element: Elements.TitleBgActive, RGBA: [125, 0, 0, 225] },
    { element: Elements.Header, RGBA: [0, 0, 127, 60] },
    { element: Elements.HeaderHovered, RGBA: [0, 0, 150, 100] },
    { element: Elements.HeaderActive, RGBA: [0, 0, 175, 125] },
    { element: Elements.Button, RGBA: [0, 0, 0, 175] },
    { element: Elements.ButtonHovered, RGBA: [100, 0, 0, 175] },
    { element: Elements.ButtonActive, RGBA: [150, 0, 0, 200] },
    { element: Elements.Tab, RGBA: [100, 0, 0, 175] },
    { element: Elements.TabHovered, RGBA: [150, 0, 0, 200] },
    { element: Elements.TabActive, RGBA: [0, 0, 0, 200] }
];

customStyle.forEach(e => {
    log('Style check. Element:', e.element, 'RGBA:', e.RGBA[0], e.RGBA[1], e.RGBA[2], e.RGBA[3]);
});

const plr: Player = new Player(0);
const plc: Char = plr.getChar();

const cars: string[] = data.cars;
const carModel: int = 0;
const carType: int = 3;
const vehicles: int[] = cars.filter(c => c && c[carType] != 'train').map(c => (parseInt(c[carModel])));

// Taken from standard SA carcols.dat
const carColours: { r: float, g: float, b: float; }[] = [
    { r: 0, g: 0, b: 0 },
    { r: 245, g: 245, b: 245 },
    { r: 42, g: 119, b: 161 },
    { r: 132, g: 4, b: 16 },
    { r: 38, g: 55, b: 57 },
    { r: 134, g: 68, b: 110 },
    { r: 215, g: 142, b: 16 },
    { r: 76, g: 117, b: 183 },
    { r: 189, g: 190, b: 198 },
    { r: 94, g: 112, b: 114 },
    { r: 70, g: 89, b: 122 },
    { r: 101, g: 106, b: 121 },
    { r: 93, g: 126, b: 141 },
    { r: 88, g: 89, b: 90 },
    { r: 214, g: 218, b: 214 },
    { r: 156, g: 161, b: 163 },
    { r: 51, g: 95, b: 63 },
    { r: 115, g: 14, b: 26 },
    { r: 123, g: 10, b: 42 },
    { r: 159, g: 157, b: 148 },
    { r: 59, g: 78, b: 120 },
    { r: 115, g: 46, b: 62 },
    { r: 105, g: 30, b: 59 },
    { r: 150, g: 145, b: 140 },
    { r: 81, g: 84, b: 89 },
    { r: 63, g: 62, b: 69 },
    { r: 165, g: 169, b: 167 },
    { r: 99, g: 92, b: 90 },
    { r: 61, g: 74, b: 104 },
    { r: 151, g: 149, b: 146 },
    { r: 66, g: 31, b: 33 },
    { r: 95, g: 39, b: 43 },
    { r: 132, g: 148, b: 171 },
    { r: 118, g: 123, b: 124 },
    { r: 100, g: 100, b: 100 },
    { r: 90, g: 87, b: 82 },
    { r: 37, g: 37, b: 39 },
    { r: 45, g: 58, b: 53 },
    { r: 147, g: 163, b: 150 },
    { r: 109, g: 122, b: 136 },
    { r: 34, g: 25, b: 24 },
    { r: 111, g: 103, b: 95 },
    { r: 124, g: 28, b: 42 },
    { r: 95, g: 10, b: 21 },
    { r: 25, g: 56, b: 38 },
    { r: 93, g: 27, b: 32 },
    { r: 157, g: 152, b: 114 },
    { r: 122, g: 117, b: 96 },
    { r: 152, g: 149, b: 134 },
    { r: 173, g: 176, b: 176 },
    { r: 132, g: 137, b: 136 },
    { r: 48, g: 79, b: 69 },
    { r: 77, g: 98, b: 104 },
    { r: 22, g: 34, b: 72 },
    { r: 39, g: 47, b: 75 },
    { r: 125, g: 98, b: 86 },
    { r: 158, g: 164, b: 171 },
    { r: 156, g: 141, b: 113 },
    { r: 109, g: 24, b: 34 },
    { r: 78, g: 104, b: 129 },
    { r: 156, g: 156, b: 152 },
    { r: 145, g: 115, b: 71 },
    { r: 102, g: 28, b: 38 },
    { r: 148, g: 157, b: 159 },
    { r: 164, g: 167, b: 165 },
    { r: 142, g: 140, b: 70 },
    { r: 52, g: 26, b: 30 },
    { r: 106, g: 122, b: 140 },
    { r: 170, g: 173, b: 142 },
    { r: 171, g: 152, b: 143 },
    { r: 133, g: 31, b: 46 },
    { r: 111, g: 130, b: 151 },
    { r: 88, g: 88, b: 83 },
    { r: 154, g: 167, b: 144 },
    { r: 96, g: 26, b: 35 },
    { r: 32, g: 32, b: 44 },
    { r: 164, g: 160, b: 150 },
    { r: 170, g: 157, b: 132 },
    { r: 120, g: 34, b: 43 },
    { r: 14, g: 49, b: 109 },
    { r: 114, g: 42, b: 63 },
    { r: 123, g: 113, b: 94 },
    { r: 116, g: 29, b: 40 },
    { r: 30, g: 46, b: 50 },
    { r: 77, g: 50, b: 47 },
    { r: 124, g: 27, b: 68 },
    { r: 46, g: 91, b: 32 },
    { r: 57, g: 90, b: 131 },
    { r: 109, g: 40, b: 55 },
    { r: 167, g: 162, b: 143 },
    { r: 175, g: 177, b: 177 },
    { r: 54, g: 65, b: 85 },
    { r: 109, g: 108, b: 110 },
    { r: 15, g: 106, b: 137 },
    { r: 32, g: 75, b: 107 },
    { r: 43, g: 62, b: 87 },
    { r: 155, g: 159, b: 157 },
    { r: 108, g: 132, b: 149 },
    { r: 77, g: 93, b: 96 },
    { r: 174, g: 155, b: 127 },
    { r: 64, g: 108, b: 143 },
    { r: 31, g: 37, b: 59 },
    { r: 171, g: 146, b: 118 },
    { r: 19, g: 69, b: 115 },
    { r: 150, g: 129, b: 108 },
    { r: 100, g: 104, b: 106 },
    { r: 16, g: 80, b: 130 },
    { r: 161, g: 153, b: 131 },
    { r: 56, g: 86, b: 148 },
    { r: 82, g: 86, b: 97 },
    { r: 127, g: 105, b: 86 },
    { r: 140, g: 146, b: 154 },
    { r: 89, g: 110, b: 135 },
    { r: 71, g: 53, b: 50 },
    { r: 68, g: 98, b: 79 },
    { r: 115, g: 10, b: 39 },
    { r: 34, g: 52, b: 87 },
    { r: 100, g: 13, b: 27 },
    { r: 163, g: 173, b: 198 },
    { r: 105, g: 88, b: 83 },
    { r: 155, g: 139, b: 128 },
    { r: 98, g: 11, b: 28 },
    { r: 91, g: 93, b: 94 },
    { r: 98, g: 68, b: 40 },
    { r: 115, g: 24, b: 39 },
    { r: 27, g: 55, b: 109 },
    { r: 236, g: 106, b: 174 }
];

const settings: string = './settings.ini';
const menuSwitch: int = 192; // Tilde
const tabFunction: Function[] = [tabPlayer, tabVehicle, tabWorld, tabPosition, tabAbout];
const space: Function = () => { ImGui.Dummy(15, 15); };
const maxItemWidth: float = 0.55;

let menuShow: boolean = false;
let menuOpacity: float = IniFile.ReadFloat(settings, 'SETTINGS', 'opacity') ?? 0.75;
let lang: string = IniFile.ReadString(settings, 'SETTINGS', 'language') ?? 'English';
let coloursPerRow: int = IniFile.ReadInt(settings, 'SETTINGS', 'colsPerRow') ?? 30;

//#region Flags
let playerProofs: boolean[] = [false, false, false, false, false];
let carProofs: boolean[] = [false, false, false, false, false];
let stayOnBike: boolean = false;
let tyresProof: boolean = false;
let heavyCar: boolean = false;
let lockClock: boolean = false;
let instantTeleport: boolean = false;
let resetInstantTp: boolean = false;

let pedDensity: float = 1.0;
let carDensity: float = 1.0;
let gameSpeed: float = 1.0;
let oldSpawnedCarModel: int = 0;
let time = { hours: 0, minutes: 0 };
let x, y, z, heading; // Teleport
let chosenCar: int; // Index of car to spawn
let money: int; // Giving money
//#endregion

while (true) {
    wait(0);

    if (Pad.IsKeyDown(menuSwitch)) {
        menuShow = !menuShow;
        if (!menuShow && resetInstantTp) instantTeleport = false;
    }

    ImGui.BeginFrame('VITALTRAINER');
    ImGui.SetCursorVisible(menuShow);

    if (menuShow && plr.isPlaying()) {
        var windowSize = ImGui.GetDisplaySize();

        ImGui.SetNextWindowTransparency(menuOpacity);
        ImGui.SetNextWindowPos(0, 0, 8); // 8 - appearing
        ImGui.SetNextWindowSize(windowSize.width, windowSize.height, 8);
        menuShow = ImGui.Begin('Vital Trainer', menuShow, false, true, true, false);
        style();

        menuOpacity = ImGui.SliderInt(Texts[lang].Opacity, menuOpacity * 100, 0, 100) / 100 as float;
        if (ImGui.IsItemActive('MenuOpacity')) IniFile.WriteFloat(menuOpacity, settings, 'SETTINGS', 'opacity');

        let tab: int = ImGui.Tabs('VTTabs', Texts[lang].Tabs);

        tabFunction[tab]?.apply(undefined, undefined);

        ImGui.End();
    }

    applyFlags();

    ImGui.EndFrame();
}

// Auxiliary functions
function style() {
    ImGui.PushItemWidth(windowSize.width * maxItemWidth);

    customStyle.forEach(e => {
        ImGui.PushStyleColor(e.element ?? 0, e.RGBA[0] ?? 0, e.RGBA[1] ?? 0, e.RGBA[2] ?? 0, e.RGBA[3] ?? 0);
    });
}

function applyFlags() {
    plc.setProofs(playerProofs[0], playerProofs[1], playerProofs[2], playerProofs[3], playerProofs[4])
        .setCanBeKnockedOffBike(stayOnBike);

    if (plc.isInAnyCar()) {
        let car: Car = plc.storeCarIsInNoSave();
        car.setProofs(carProofs[0], carProofs[1], carProofs[2], carProofs[3], carProofs[4])
            .setCanBurstTires(!tyresProof)
            .setHeavy(heavyCar);
    }

    World.SetPedDensityMultiplier(pedDensity);
    World.SetCarDensityMultiplier(carDensity);

    Clock.SetTimeScale(gameSpeed);
    if (lockClock) {
        Clock.SetTimeOfDay(time.hours, time.minutes);
        Weather.ForceNow(getCurrentWeather());
    }
}

function getCurrentWeather(): int {
    return Memory.ReadU16(0xC81320, false);
}

function teleport(char: Char, x: float, y: float, z: float, heading: float, interior: int = 0, loadScene: boolean = true) {
    Streaming.SetAreaVisible(interior);

    if (loadScene) {
        Streaming.RequestCollision(x, y);
        Streaming.LoadScene(x, y, z);
    }

    if (!char.isInAnyCar()) {
        char.setCoordinates(x, y, z).setHeading(heading);
    } else {
        char.storeCarIsInNoSave().setCoordinates(x, y, z).setHeading(heading).setAreaVisible(interior);
    }

    char.setAreaVisible(interior);

    if (char === plc) Camera.RestoreJumpcut();
}

function spawnCar(model: int) {
    if (model === undefined) return;
    if (model === oldSpawnedCarModel && TIMERA < 333) return;

    if (!Streaming.HasModelLoaded(model)) {
        Streaming.RequestModel(model);
        Streaming.LoadAllModelsNow();
    }

    let modelWidth = Streaming.GetModelDimensions(model).rightTopFrontX;
    let pos = plc.getOffsetInWorldCoords(0, modelWidth + 6, 0.5);

    World.ClearArea(pos.x, pos.y, pos.z, 5, true);
    Car.Create(model, pos.x, pos.y, pos.z)
        .setHeading(plc.getHeading() + 90)
        .lockDoors(1) // Unlocked
        .markAsNoLongerNeeded();

    Streaming.MarkModelAsNoLongerNeeded(model);
    oldSpawnedCarModel = model;
    TIMERA = 0;
}

// Menu tabs
function tabPlayer() {
    if (ImGui.CollapsingHeader(Texts[lang].General + '##Player')) {
        let step;
        switch (ImGui.Tabs(Texts[lang].Mode + '##Money', Texts[lang].Modes + '##Money')) {
            case 0: // Fast
                step = 1000;
                money = ImGui.SliderInt(
                    Texts[lang].Money, 0,
                    money - step < -999999999 ? -999999999 : money - step,
                    money + step > 999999999 ? 999999999 : money + step
                );
                break;
            case 1: // Precise
                step = 5;
                money = ImGui.SliderInt(
                    Texts[lang].Money, 0,
                    money - step < -999999999 ? -999999999 : money - step,
                    money + step > 999999999 ? 999999999 : money + step
                );
                break;
            case 2: // Text input
                money = ImGui.InputInt(Texts[lang].Money, 0, -999999999, 999999999);
                break;
            default:
                break;
        }
        if (ImGui.IsItemActive('GiveMoney')) plr.addScore(money + plr.storeScore() * -1);
        space();

        let health = ImGui.SliderInt(Texts[lang].Health, 100, 0, 176);
        if (ImGui.IsItemActive('plrHealth')) plc.setHealth(health);

        let armour = ImGui.SliderInt(Texts[lang].Armour, 50, 0, 100);
        if (ImGui.IsItemActive('plrArmour')) plc.addArmor(plc.getArmor() * -1 + armour);
        space();

        let wantedLevel = ImGui.SliderInt(Texts[lang].Wanted, 0, 0, 6);
        if (ImGui.IsItemActive('CurWL')) plr.alterWantedLevel(wantedLevel);

        let maxWL = ImGui.SliderInt(Texts[lang].MaxWL, 6, 0, 6);
        if (ImGui.IsItemActive('MaxWL')) Game.SetMaxWantedLevel(maxWL);
    }
    ImGui.Separator();

    if (ImGui.CollapsingHeader(Texts[lang].Immunities + '##Player')) {
        playerProofs[0] = ImGui.Checkbox(Texts[lang].ImmBullet, playerProofs[0]);
        playerProofs[1] = ImGui.Checkbox(Texts[lang].ImmFire, playerProofs[1]);
        playerProofs[2] = ImGui.Checkbox(Texts[lang].ImmExplosion, playerProofs[2]);
        playerProofs[3] = ImGui.Checkbox(Texts[lang].ImmCollision, playerProofs[3]);
        playerProofs[4] = ImGui.Checkbox(Texts[lang].ImmMelee, playerProofs[4]);

        space();
        stayOnBike = ImGui.Checkbox(Texts[lang].StayOnBike, stayOnBike);
    }
    ImGui.Separator();
}

function tabVehicle() {
    if (plc.isInAnyCar()) { // In car only
        let car: Car = plc.storeCarIsInNoSave();

        if (ImGui.CollapsingHeader(Texts[lang].General + '##Car')) {
            let health = ImGui.SliderInt(Texts[lang].Health + '##Car', 1000, 0, 1000);
            if (ImGui.IsItemActive('carHealth')) car.setHealth(health);

            if (ImGui.Button(Texts[lang].Fix, windowSize.width * maxItemWidth, 30)) car.fix();
            space();

            let dirt = ImGui.SliderInt(Texts[lang].DirtLevel, 0, 0, 15) as float;
            if (ImGui.IsItemActive('CarDirt')) car.setDirtLevel(dirt);
        }
        ImGui.Separator();

        if (ImGui.CollapsingHeader(Texts[lang].Immunities + '##Car')) {
            carProofs[0] = ImGui.Checkbox(Texts[lang].ImmBullet + '##Car', carProofs[0]);
            carProofs[1] = ImGui.Checkbox(Texts[lang].ImmFire + '##Car', carProofs[1]);
            carProofs[2] = ImGui.Checkbox(Texts[lang].ImmExplosion + '##Car', carProofs[2]);
            carProofs[3] = ImGui.Checkbox(Texts[lang].ImmCollision + '##Car', carProofs[3]);
            carProofs[4] = ImGui.Checkbox(Texts[lang].ImmMelee + '##Car', carProofs[4]);

            space();
            tyresProof = ImGui.Checkbox(Texts[lang].TyresProof, tyresProof);
            heavyCar = ImGui.Checkbox(Texts[lang].HeavyCar, heavyCar);
        }
        ImGui.Separator();

        if (ImGui.CollapsingHeader(Texts[lang].Colours)) {
            let paintjobsNum: int = car.getNumAvailablePaintjobs();
            if (paintjobsNum > 0) {
                let paintjob = ImGui.SliderInt(Texts[lang].Paintjob, paintjobsNum, 0, paintjobsNum);
                if (ImGui.IsItemActive('GivePaintjob')) car.givePaintjob(paintjob);
            }

            coloursPerRow = ImGui.SliderInt(Texts[lang].ColsPerRow, 30, 1, carColours.length);
            if (ImGui.IsItemActive('ColsInRow')) IniFile.WriteInt(coloursPerRow, settings, 'SETTINGS', 'colsPerRow');

            let colourNumber: int = ImGui.Tabs('ColNum', Texts[lang].Categories);
            for (let i = 0; i < carColours.length; i++) {
                let r = carColours[i].r / 255;
                let g = carColours[i].g / 255;
                let b = carColours[i].b / 255;

                if (i > 0 && i % coloursPerRow !== 0) ImGui.SameLine();
                if (ImGui.ButtonColored(`${Texts[lang].Colour} ${i}`, r, g, b, 1, 30, 30)) {
                    if (colourNumber === 0 || colourNumber === 1) {
                        let currentColours = car.getColors();
                        car.changeColor(
                            colourNumber === 0 ? i : currentColours.primaryColour,
                            colourNumber === 1 ? i : currentColours.secondaryColour
                        );
                    } else {
                        let currentColours = car.getExtraColors();
                        car.setExtraColors(
                            colourNumber === 2 ? i : currentColours.color1,
                            colourNumber === 3 ? i : currentColours.color2
                        );
                    }
                }
            }
        }
    }

    if (ImGui.CollapsingHeader(Texts[lang].Spawner)) {
        let step = 5;
        chosenCar = ImGui.SliderInt(
            Texts[lang].Vehicles, 0,
            chosenCar - step < 0 ? 0 : chosenCar - step,
            chosenCar + step > vehicles.length - 1 ? vehicles.length - 1 : chosenCar + step
        );
        if (ImGui.IsItemActive('SpawnCar')) spawnCar(vehicles[chosenCar]);
    }
}

function tabWorld() {
    if (ImGui.CollapsingHeader(Texts[lang].Population)) {
        let clrRadius = ImGui.SliderInt(Texts[lang].Radius + '##CLR', 20, 1, 300);
        if (ImGui.Button(Texts[lang].ClearArea, windowSize.width * maxItemWidth, 30)) {
            let pos = plc.getCoordinates();
            World.ClearArea(pos.x, pos.y, pos.z, clrRadius, true);
        }
        space();

        pedDensity = ImGui.SliderInt(Texts[lang].PedDensity, 10, 0, 10) / 10;
        carDensity = ImGui.SliderInt(Texts[lang].CarDensity, 10, 0, 10) / 10;
    }
    ImGui.Separator();

    if (ImGui.CollapsingHeader(Texts[lang].Time)) {
        gameSpeed = ImGui.SliderInt(Texts[lang].GameSpeed, 100, 0, 300) / 100;

        let hours = ImGui.SliderInt(Texts[lang].Hours, 12, 0, 23);
        if (ImGui.IsItemActive('TimeHours')) {
            Clock.SetTimeOfDay(hours, Clock.GetTimeOfDay().minutes);
            Weather.ForceNow(getCurrentWeather());
        }

        let minutes = ImGui.SliderInt(Texts[lang].Minutes, 30, 0, 59);
        if (ImGui.IsItemActive('TimeMinutes')) {
            Clock.SetTimeOfDay(Clock.GetTimeOfDay().hours, minutes);
            Weather.ForceNow(getCurrentWeather());
        }

        lockClock = ImGui.Checkbox(Texts[lang].LockTime, lockClock);
        if (lockClock) {
            time.hours = hours;
            time.minutes = minutes;
        }
    }
    ImGui.Separator();

    if (ImGui.CollapsingHeader(Texts[lang].Weather)) {
        let currentWeather = ImGui.SliderInt(Texts[lang].CurrentWeather, 3, 0, 45);
        if (ImGui.IsItemActive('SetCurWeather')) Weather.ForceNow(currentWeather);

        if (!lockClock) {
            let nextWeather = ImGui.SliderInt(Texts[lang].NextWeather, 3, 0, 45);
            if (ImGui.IsItemActive('SetNextWeather')) Weather.Force(nextWeather);
        }

        if (ImGui.Button(Texts[lang].ResetWeather, windowSize.width * maxItemWidth, 30)) {
            Weather.SetToAppropriateTypeNow();
        }
    }
    ImGui.Separator();
}

function tabPosition() {
    if (ImGui.CollapsingHeader(Texts[lang].CurPosition)) {
        let pos = plc.getCoordinates();
        let heading = plc.getHeading();

        ImGui.TextColored(`X: ${pos.x.toFixed(3)}`, 1, 1, 0, 1);
        ImGui.TextColored(`Y: ${pos.y.toFixed(3)}`, 1, 1, 0, 1);
        ImGui.TextColored(`Z: ${pos.z.toFixed(3)}`, 1, 1, 0, 1);
        ImGui.TextColored(`${Texts[lang].Heading}: ${heading.toFixed(3)}`, 1, 1, 1, 1);
    }
    ImGui.Separator();

    if (ImGui.CollapsingHeader(Texts[lang].Teleport)) {
        instantTeleport = ImGui.Checkbox(Texts[lang].InstantTeleport, instantTeleport);
        if (instantTeleport) {
            ImGui.SameLine();
            resetInstantTp = ImGui.Checkbox(Texts[lang].InstTpReset, resetInstantTp);
        }
        space();

        switch (ImGui.Tabs(Texts[lang].Mode + '##Teleport', Texts[lang].Modes + '##Teleport')) {
            case 0: // Fast
                let stepXY = 75;
                let stepZ = 20;
                let stepH = 180;

                x = ImGui.SliderFloat(
                    Texts[lang].CoordX, 0,
                    x - stepXY < -3000 ? -3000 : x - stepXY,
                    x + stepXY > 3000 ? 3000 : x + stepXY
                );
                y = ImGui.SliderFloat(
                    Texts[lang].CoordY, 0,
                    y - stepXY < -3000 ? -3000 : y - stepXY,
                    y + stepXY > 3000 ? 3000 : y + stepXY
                );
                z = ImGui.SliderFloat(
                    Texts[lang].CoordZ, 0,
                    z - stepZ < -100 ? -100 : z - stepZ,
                    z + stepZ > 2000 ? 2000 : z + stepZ
                );
                heading = ImGui.SliderFloat(
                    Texts[lang].Heading, 0,
                    heading - stepH < 0 ? 0 : heading - stepH,
                    heading + stepH > 360 ? 360 : heading + stepH
                );
                break;
            case 1: // Precise
                let step = 0.5;

                x = ImGui.SliderFloat(
                    Texts[lang].CoordX, 0,
                    x - step < -3000 ? -3000 : x - step,
                    x + step > 3000 ? 3000 : x + step
                );
                y = ImGui.SliderFloat(
                    Texts[lang].CoordY, 0,
                    y - step < -3000 ? -3000 : y - step,
                    y + step > 3000 ? 3000 : y + step
                );
                z = ImGui.SliderFloat(
                    Texts[lang].CoordZ, 0,
                    z - step < -100 ? -100 : z - step,
                    z + step > 2000 ? 2000 : z + step
                );
                heading = ImGui.SliderFloat(
                    Texts[lang].Heading, 0,
                    heading - step < 0 ? 0 : heading - step,
                    heading + step > 360 ? 360 : heading + step
                );
                break;
            case 2: // Texts input
                x = ImGui.InputFloat(Texts[lang].CoordX, 0, -3000, 3000);
                y = ImGui.InputFloat(Texts[lang].CoordY, 0, -3000, 3000);
                z = ImGui.InputFloat(Texts[lang].CoordZ, 0, -100, 2000);
                heading = ImGui.InputFloat(Texts[lang].Heading, 0, 0, 360);
                break;
            default:
                break;
        }

        let interior = ImGui.SliderInt(Texts[lang].Interior, 0, 0, 18);

        if (instantTeleport) {
            teleport(plc, x, y, z, heading, interior, false);
        } else {
            if (ImGui.Button(Texts[lang].Coords, windowSize.width * maxItemWidth, 30)) {
                teleport(plc, x, y, z, heading, interior);
            }

            let wp = World.GetTargetCoords();
            if (wp && ImGui.Button(Texts[lang].Waypoint, windowSize.width * maxItemWidth, 30)) {
                teleport(plc, wp.x, wp.y, -100, plc.getHeading(), 0);
            }
        }
    }
    ImGui.Separator();
}

function tabAbout() {
    ImGui.TextWrapped(Texts[lang].HowTo);
    space();
    ImGui.TextWithBullet(Texts[lang].About0);
    ImGui.TextWrapped(Texts[lang].About1);
    ImGui.TextWrapped(Texts[lang].About2);
    ImGui.TextWrapped(Texts[lang].About3);
    ImGui.Separator();
    ImGui.TextWithBullet(Texts[lang].Help);
    ImGui.TextWrapped(Texts[lang].Help1);
}