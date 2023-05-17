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
};

enum VK {
    End = 0x23,
    Home = 0x24,
    Left = 0x25,
    Up = 0x26,
    Right = 0x27,
    Down = 0x28
};

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
const tabFunction: Function[] = [tabPlayer, tabVehicle, tabWorld, tabPosition, tabDisplay, tabAbout];
const space: Function = () => { ImGui.Dummy(15, 15); };
const maxWidthPercent: float = 0.7;
const minItemWidth: int = 300;

let menuShow: boolean = false;
let lang: string = IniFile.ReadString(settings, 'SETTINGS', 'language') ?? 'English';
let menuOpacity: float = IniFile.ReadFloat(settings, 'SETTINGS', 'opacity') ?? 0.75;
let coloursPerRow: int = IniFile.ReadInt(settings, 'SETTINGS', 'colsPerRow') ?? 30;

//#region Flags & Values
let proofs: { stateChar: boolean, stateCar: boolean, byte: int, text: string; }[] = [
    { stateChar: undefined, stateCar: undefined, byte: 0b00000100, text: Texts[lang].ImmBullet },
    { stateChar: undefined, stateCar: undefined, byte: 0b00001000, text: Texts[lang].ImmFire },
    { stateChar: undefined, stateCar: undefined, byte: 0b10000000, text: Texts[lang].ImmExplosion },
    { stateChar: undefined, stateCar: undefined, byte: 0b00010000, text: Texts[lang].ImmCollision },
    { stateChar: undefined, stateCar: undefined, byte: 0b00100000, text: Texts[lang].ImmMelee }
];

let flags = {
    freezePlayer: undefined,
    lockPlayer: undefined,
    stayOnBike: undefined,
    infiniteSprint: undefined,
    ignoredByPolice: undefined,
    ignoredByEveryone: undefined,
    tyresProof: undefined,
    heavyCar: undefined,
    changePedDensity: undefined,
    changeCarDensity: undefined,
    lockClock: false,
    instantTeleport: false,
    resetInstantTp: false,
    changeWind: false,
    hud: undefined,
    radar: undefined,
    widescreen: undefined,
    nightVision: undefined,
    thermalVision: undefined
};

let pedDensity: float = 1.0;
let carDensity: float = 1.0;
let gameSpeed: float = 1.0;
let oldSpawnedCarModel: int = 0;
let gravity: float = 0.008;
let windX: float, windY: float, windZ: float;
let time = { hours: 0, minutes: 0 };

let x, y, z, heading; // Teleport
let chosenCar: int; // Index of car to spawn
let money: int; // Giving money
//#endregion

while (true) {
    wait(0);

    // Holding the activation button while the window is open will not close it (for snapping)
    if (Pad.IsKeyDown(menuSwitch)) {
        TIMERA = 0;

        // Skip waiting if the menu is not open
        while (menuShow && Pad.IsKeyPressed(menuSwitch) && TIMERA < 349) {
            wait(0);
        }

        if (TIMERA < 349) {
            menuShow = !menuShow;
            if (!menuShow && flags.resetInstantTp) flags.instantTeleport = false;
        }
    }

    ImGui.BeginFrame('VITALTRAINER');
    ImGui.SetCursorVisible(menuShow);

    if (menuShow && plr.isPlaying()) {
        ImGui.SetNextWindowTransparency(menuOpacity);
        ImGui.SetNextWindowPos(0, 0, 2);
        ImGui.SetNextWindowSize(640, 480, 2);

        menuShow = ImGui.Begin('Vital Trainer', menuShow, false, false, false, false);

        var displaySize = ImGui.GetDisplaySize();
        var winSize = ImGui.GetWindowSize('WINSIZE');
        windowControl();

        // Calculate width of ImGui items
        let newWidth = winSize.width * maxWidthPercent;
        var itemsWidth = (newWidth) >= minItemWidth ? newWidth : minItemWidth;
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
function getSnapValues(): { x: int, y: int, width: int, height: int; } {
    // Reset
    if (Pad.IsKeyDown(VK.Home)) return {
        x: 0, y: 0,
        width: 640, height: 480
    };
    // Fill the screen
    if (Pad.IsKeyDown(VK.End)) return {
        x: 0, y: 0,
        width: displaySize.width, height: displaySize.height
    };
    // Upper corners
    if (Pad.IsKeyPressed(VK.Up)) {
        // Upper-left corner
        if (Pad.IsKeyPressed(VK.Left)) return {
            x: 0, y: 0,
            width: displaySize.width / 2, height: displaySize.height / 2
        };
        // Upper-right corner
        if (Pad.IsKeyPressed(VK.Right)) return {
            x: displaySize.width / 2, y: 0,
            width: displaySize.width / 2, height: displaySize.height / 2
        };
    }
    // Bottom corners
    if (Pad.IsKeyPressed(VK.Down)) {
        // Bottom-left corner
        if (Pad.IsKeyPressed(VK.Left)) return {
            x: 0, y: displaySize.height / 2,
            width: displaySize.width / 2, height: displaySize.height / 2
        };
        // Bottom-right corner
        if (Pad.IsKeyPressed(VK.Right)) return {
            x: displaySize.width / 2, y: displaySize.height / 2,
            width: displaySize.width / 2, height: displaySize.height / 2
        };
    }
    // Top
    if (Pad.IsKeyDown(VK.Up)) return {
        x: 0, y: 0,
        width: displaySize.width, height: displaySize.height / 2
    };
    // Bottom
    if (Pad.IsKeyDown(VK.Down)) return {
        x: 0, y: displaySize.height / 2,
        width: displaySize.width, height: displaySize.height / 2
    };
    // Left
    if (Pad.IsKeyDown(VK.Left)) return {
        x: 0, y: 0,
        width: displaySize.width / 2, height: displaySize.height
    };
    // Right
    if (Pad.IsKeyDown(VK.Right)) return {
        x: displaySize.width / 2, y: 0,
        width: displaySize.width / 2, height: displaySize.height
    };
}

function windowControl() {
    // Prevent from resizing beyond the screen size
    if (winSize.width > displaySize.width) ImGui.SetWindowSize(displaySize.width, winSize.height, 1);
    if (winSize.height > displaySize.height) ImGui.SetWindowSize(winSize.width, displaySize.height, 1);

    // Prevent from moving beyond the screen borders
    let winPos = ImGui.GetWindowPos('WINPOS');
    if (winPos.x < 0)
        ImGui.SetWindowPos(0, winPos.y, 1);
    if (winPos.y < 0)
        ImGui.SetWindowPos(winPos.x, 0, 1);
    if (winPos.x + winSize.width > displaySize.width)
        ImGui.SetWindowPos(displaySize.width - winSize.width, winPos.y, 1);
    if (winPos.y + winSize.height > displaySize.height)
        ImGui.SetWindowPos(winPos.x, displaySize.height - winSize.height, 1);

    // Window snapping: ~ + Home, End, or arrow buttons
    if (Pad.IsKeyPressed(menuSwitch)) {
        let snap = getSnapValues();
        if (snap) {
            ImGui.SetWindowPos(snap.x, snap.y, 1);
            ImGui.SetWindowSize(snap.width, snap.height, 1);
        }
    }
}

function style() {
    ImGui.PushItemWidth(itemsWidth);

    customStyle.forEach(e => {
        ImGui.PushStyleColor(e.element ?? 0, e.RGBA[0] ?? 0, e.RGBA[1] ?? 0, e.RGBA[2] ?? 0, e.RGBA[3] ?? 0);
    });
}

function isDefined(flag: boolean) { return flag !== undefined; }

function applyFlags() {
    if (isDefined(flags.lockPlayer)) plr.setControl(!flags.lockPlayer);
    if (isDefined(flags.infiniteSprint)) plr.setNeverGetsTired(flags.infiniteSprint);

    if (isDefined(flags.stayOnBike)) plc.setCanBeKnockedOffBike(flags.stayOnBike);
    if (isDefined(flags.freezePlayer)) plc.freezePosition(flags.freezePlayer);

    let offsetProofs: int = Memory.GetPedPointer(plc) + 0x42;
    let currentPlayerProofs: int = Memory.ReadU8(offsetProofs, false);
    let setPlayerProofs = currentPlayerProofs;
    proofs.forEach(p => {
        if (p.stateChar !== undefined) {
            if (p.stateChar) {
                setPlayerProofs |= p.byte;
            } else {
                setPlayerProofs &= ~p.byte;
            }
        }
    });
    if (setPlayerProofs !== currentPlayerProofs) Memory.WriteU8(offsetProofs, setPlayerProofs, false);

    if (isDefined(flags.ignoredByPolice)) Game.SetPoliceIgnorePlayer(plr, flags.ignoredByPolice);
    if (isDefined(flags.ignoredByEveryone)) Game.SetEveryoneIgnorePlayer(plr, flags.ignoredByEveryone);

    if (plc.isInAnyCar()) {
        let car: Car = plc.storeCarIsInNoSave();
        if (isDefined(flags.tyresProof)) car.setCanBurstTires(!flags.tyresProof);
        if (isDefined(flags.heavyCar)) car.setHeavy(flags.heavyCar);

        let offsetProofs: int = Memory.GetVehiclePointer(car) + 0x42;
        let currentCarProofs: int = Memory.ReadU8(offsetProofs, false);
        let setCarProofs = currentCarProofs;
        proofs.forEach(p => {
            if (p.stateCar !== undefined) {
                if (p.stateCar) {
                    setCarProofs |= p.byte;
                } else {
                    setCarProofs &= ~p.byte;
                }
            }
        });
        if (setCarProofs !== currentCarProofs) Memory.WriteU8(offsetProofs, setCarProofs, false);
    }

    if (flags.changePedDensity) World.SetPedDensityMultiplier(pedDensity);
    if (flags.changeCarDensity) World.SetCarDensityMultiplier(carDensity);

    Clock.SetTimeScale(gameSpeed);
    if (flags.lockClock) {
        Clock.SetTimeOfDay(time.hours, time.minutes);
        Weather.ForceNow(getCurrentWeather());
    }

    if (flags.changeWind) {
        Memory.WriteFloat(0xC813E0, windX, false);
        Memory.WriteFloat(0xC813E4, windY, false);
        Memory.WriteFloat(0xC813E8, windZ, false);
    }

    if (isDefined(flags.hud)) Hud.Display(flags.hud);
    if (isDefined(flags.radar)) Hud.DisplayRadar(flags.radar);
    if (isDefined(flags.widescreen)) Hud.SwitchWidescreen(flags.widescreen);
    if (isDefined(flags.nightVision)) Game.SetNightVision(flags.nightVision);
    if (isDefined(flags.thermalVision)) Game.SetInfraredVision(flags.thermalVision);
}

function getCurrentWeather(): int {
    return Memory.ReadU16(0xC81320, false);
}

function teleport(char: Char, x: float, y: float, z: float, heading: float, interior: int = 0, loadScene: boolean = true) {
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

function input(mode: int, inputType: 'int' | 'float', value: number, text: string, initial: number, min: number, max: number, stepFast: number, stepPrecise: number): number {
    if (mode === 0 || mode === 1) {
        let step = mode === 0 ? stepFast : stepPrecise;
        return inputType === 'int'
            ? ImGui.SliderInt(text, initial, Math.max(value - step, min), Math.min(value + step, max))
            : ImGui.SliderFloat(text, initial, Math.max(value - step, min), Math.min(value + step, max));
    }
    return inputType === 'int'
        ? ImGui.InputInt(text, initial, min, max)
        : ImGui.InputFloat(text, initial, min, max);
}

function sliderFlag(text: string): boolean {
    let width = winSize.width * 0.07;
    ImGui.PushItemWidth(width > 49 ? width : 50);

    let value = ImGui.SliderInt(text, -1, -1, 1);
    if (ImGui.IsItemHovered(text + '##Hover')) {
        ImGui.SameLine();
        if (value === -1) ImGui.TextColored(`[${Texts[lang].GameChoice}]`, 1, 1, 0, 1);
        else if (value === 0) ImGui.TextColored(`[${Texts[lang].AlwaysOFF}]`, 1, 0, 0, 1);
        else ImGui.TextColored(`[${Texts[lang].AlwaysON}]`, 0, 1, 0, 1);
    }
    ImGui.PushItemWidth(winSize.width * maxWidthPercent);
    return value === 1 ? true : value === 0 ? false : undefined;
}

function myButton(text: string): boolean {
    return ImGui.Button(text, itemsWidth, 30);
}

// Menu tabs
function tabPlayer() {
    if (ImGui.CollapsingHeader(Texts[lang].General + '##Player')) {
        money = input(
            ImGui.Tabs(Texts[lang].Mode + '##Money', Texts[lang].Modes + '##Money'),
            'int', money, Texts[lang].Money, 0, -999999999, 999999999, 1000, 5
        );
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
        space();

        flags.freezePlayer = sliderFlag(Texts[lang].FreezePlr);
        flags.lockPlayer = sliderFlag(Texts[lang].LockPlr);
    }
    ImGui.Separator();

    if (ImGui.CollapsingHeader(Texts[lang].Immunities + '##Player')) {
        proofs.forEach(p => { p.stateChar = sliderFlag(p.text + '##Player'); });
        space();

        flags.stayOnBike = sliderFlag(Texts[lang].StayOnBike);
        flags.infiniteSprint = sliderFlag(Texts[lang].InfiniteSprint);
        flags.ignoredByPolice = sliderFlag(Texts[lang].IgnoredByCops);
        flags.ignoredByEveryone = sliderFlag(Texts[lang].IgnoredByAll);
    }
}

function tabVehicle() {
    if (plc.isInAnyCar()) { // In car only
        let car: Car = plc.storeCarIsInNoSave();

        if (ImGui.CollapsingHeader(Texts[lang].General + '##Car')) {
            let health = ImGui.SliderInt(Texts[lang].Health + '##Car', 1000, 0, 1000);
            if (ImGui.IsItemActive('carHealth')) car.setHealth(health);

            if (myButton(Texts[lang].Fix)) {
                car.fix();
                Sound.AddOneOffSound(0, 0, 0, 1054);
            }
            space();

            let dirt = ImGui.SliderInt(Texts[lang].DirtLevel, 0, 0, 15) as float;
            if (ImGui.IsItemActive('CarDirt')) car.setDirtLevel(dirt);

            if (
                !plc.isInAnyBoat() && !plc.isOnAnyBike() && !plc.isInFlyingVehicle()
                && myButton(car.doesHaveHydraulics() ? Texts[lang].HydraulicsRemove : Texts[lang].HydraulicsAdd)
            ) {
                if (car.doesHaveHydraulics()) {
                    car.setHydraulics(false);
                    Sound.AddOneOffSound(0, 0, 0, 1055);
                } else {
                    car.setHydraulics(true);
                    Sound.AddOneOffSound(0, 0, 0, 1054);
                }
            }
        }
        ImGui.Separator();

        if (ImGui.CollapsingHeader(Texts[lang].Immunities + '##Car')) {
            proofs.forEach(p => { p.stateCar = sliderFlag(p.text + '##Car'); });

            space();
            flags.tyresProof = sliderFlag(Texts[lang].TyresProof);
            flags.heavyCar = sliderFlag(Texts[lang].HeavyCar);
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
            Texts[lang].Vehicles, 0, Math.max(chosenCar - step, 0), Math.min(chosenCar + step, vehicles.length - 1)
        );
        if (ImGui.IsItemActive('SpawnCar')) spawnCar(vehicles[chosenCar]);
    }
}

function tabWorld() {
    if (ImGui.CollapsingHeader(Texts[lang].General + '##World')) {
        gravity = ImGui.SliderFloat(
            Texts[lang].Gravity, 0.008, Math.max(gravity - 0.01, -0.1), Math.min(gravity + 0.01, 0.1)
        );
        if (ImGui.IsItemActive('SetGravity')) Memory.WriteFloat(0x863984, gravity, false);

        if (myButton(Texts[lang].Reset + '##Gravity')) {
            Memory.WriteFloat(0x863984, 0.008, false);
            Sound.AddOneOffSound(0, 0, 0, 1054);
        }
    }

    if (ImGui.CollapsingHeader(Texts[lang].Population)) {
        let clrRadius = ImGui.SliderInt(Texts[lang].Radius + '##CLR', 20, 1, 200);
        if (myButton(Texts[lang].ClearArea)) {
            let pos = plc.getCoordinates();
            World.ClearArea(pos.x, pos.y, pos.z, clrRadius, true);
            Sound.AddOneOffSound(0, 0, 0, 1054);
        }
        space();

        flags.changePedDensity = ImGui.Checkbox(Texts[lang].PedDensChange, flags.changePedDensity);
        if (flags.changePedDensity) {
            pedDensity = ImGui.SliderInt(Texts[lang].PedDensity, 10, 0, 10) / 10;
        }

        flags.changeCarDensity = ImGui.Checkbox(Texts[lang].CarDensChange, flags.changeCarDensity);
        if (flags.changeCarDensity) {
            carDensity = ImGui.SliderInt(Texts[lang].CarDensity, 10, 0, 10) / 10;
        }
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

        flags.lockClock = ImGui.Checkbox(Texts[lang].LockTime, flags.lockClock);
        if (flags.lockClock) {
            time.hours = hours;
            time.minutes = minutes;
        }
    }
    ImGui.Separator();

    if (ImGui.CollapsingHeader(Texts[lang].Weather)) {
        let currentWeather = ImGui.SliderInt(Texts[lang].CurrentWeather, 3, 0, 45);
        if (ImGui.IsItemActive('SetCurWeather')) Weather.ForceNow(currentWeather);

        if (!flags.lockClock) {
            let nextWeather = ImGui.SliderInt(Texts[lang].NextWeather, 3, 0, 45);
            if (ImGui.IsItemActive('SetNextWeather')) Weather.Force(nextWeather);
        }

        if (myButton(Texts[lang].ResetWeather)) {
            Weather.SetToAppropriateTypeNow();
            Sound.AddOneOffSound(0, 0, 0, 1054);
        }
        space();

        flags.changeWind = ImGui.Checkbox(Texts[lang].Wind, flags.changeWind);
        if (flags.changeWind) {
            let tab: int = ImGui.Tabs(Texts[lang].Mode + '##Wind', Texts[lang].Modes + '##Wind');
            windX = input(tab, 'float', windX, Texts[lang].WindX, 0, -100, 100, 10, 1);
            windY = input(tab, 'float', windY, Texts[lang].WindY, 0, -100, 100, 10, 1);
            windZ = input(tab, 'float', windZ, Texts[lang].WindZ, 0, -100, 100, 10, 1);
        }
    }
}

function tabPosition() {
    if (ImGui.CollapsingHeader(Texts[lang].CurPosition)) {
        let pos = plc.getCoordinates();
        let heading = plc.getHeading();
        let interior = plc.getAreaVisible();

        ImGui.TextColored(`X: ${pos.x.toFixed(3)}`, 1, 1, 0, 1);
        ImGui.TextColored(`Y: ${pos.y.toFixed(3)}`, 1, 1, 0, 1);
        ImGui.TextColored(`Z: ${pos.z.toFixed(3)}`, 1, 1, 0, 1);
        ImGui.TextColored(`${Texts[lang].Heading}: ${heading.toFixed(3)}`, 1, 1, 1, 1);
        ImGui.TextColored(`${Texts[lang].Interior}: ${interior}`, 1, 1, 1, 1);
    }
    ImGui.Separator();

    if (ImGui.CollapsingHeader(Texts[lang].Teleport)) {
        flags.instantTeleport = ImGui.Checkbox(Texts[lang].InstantTeleport, flags.instantTeleport);
        if (flags.instantTeleport) {
            ImGui.SameLine();
            flags.resetInstantTp = ImGui.Checkbox(Texts[lang].InstTpReset, flags.resetInstantTp);
        }
        space();

        let tab: int = ImGui.Tabs(Texts[lang].Mode + '##Teleport', Texts[lang].Modes + '##Teleport');
        x = input(tab, 'float', x, Texts[lang].CoordX, 0, -3000, 3000, 75, 0.5);
        y = input(tab, 'float', y, Texts[lang].CoordY, 0, -3000, 3000, 75, 0.5);
        z = input(tab, 'float', z, Texts[lang].CoordZ, 0, -100, 2000, 20, 0.5);
        heading = input(tab, 'float', heading, Texts[lang].Heading, 0, 0, 360, 180, 0.5);

        let interior = ImGui.SliderInt(Texts[lang].Interior, 0, 0, 18);
        if (ImGui.IsItemActive('SetInterior')) Streaming.SetAreaVisible(interior);

        if (flags.instantTeleport) {
            teleport(plc, x, y, z, heading, interior, false);
        } else {
            if (myButton(Texts[lang].Coords)) {
                teleport(plc, x, y, z, heading, interior);
                Sound.AddOneOffSound(0, 0, 0, 1054);
            }

            let wp = World.GetTargetCoords();
            if (wp && myButton(Texts[lang].Waypoint)) {
                teleport(plc, wp.x, wp.y, -100, plc.getHeading(), 0);
                Sound.AddOneOffSound(0, 0, 0, 1054);
            }
        }
    }
}

function tabDisplay() {
    if (ImGui.CollapsingHeader(Texts[lang].General + '##Display')) {
        flags.hud = sliderFlag(Texts[lang].Hud);
        flags.radar = sliderFlag(Texts[lang].Radar);
        flags.widescreen = sliderFlag(Texts[lang].Widescreen);
        space();

        flags.nightVision = sliderFlag(Texts[lang].NightVision);
        flags.thermalVision = sliderFlag(Texts[lang].ThermalVision);
    }
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
    ImGui.Separator();

    if (ImGui.CollapsingHeader(Texts[lang].WindowControl)) {
        ImGui.TextWithBullet(Texts[lang].WinCtrl1);
        ImGui.TextWrapped(Texts[lang].WinCtrl2);
        ImGui.TextWrapped(Texts[lang].WinCtrl3);
        ImGui.TextWrapped(Texts[lang].WinCtrl4);
    }
}