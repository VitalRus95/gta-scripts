/// <reference path="../.config/sa.d.ts"/>
//	Script by Vital (Vitaly Pavlovich Ulyanov)

import { ImGuiCond, WeaponType } from "../.config/enums";
import { KeyCode } from "../.config/enums";
import { Creator } from "./texts";

const plr = new Player(0),
    plc = plr.getChar(),
    activation = KeyCode.Oem3, // Tilde
    defaultWidth = 500,
    defaultHeight = 600,
    defaultTransparency = .205,
    defaultScreenshotButton = KeyCode.R;

var maxWantedLevel = 6,
    active = false;

//#region Ingame booleans
var preview = false,
    allIgnore = false,
    copsIgnore = false,
    infSprint = false,
    stayOnBike = false,
    lock = false,
    freeze = false,
    bp = false,
    fp = false,
    ep = false,
    cp = false,
    mp = false,
    vbp = false,
    vfp = false,
    vep = false,
    vcp = false,
    vmp = false,
    hud = true,
    radar = true,
    carNames = true,
    zoneNames = true,
    widescreen = false;
//#endregion

// Load settings
var windowX = IniFile.ReadInt('./creator.ini', 'WINDOW', 'X') ?? 0,
    windowY = IniFile.ReadInt('./creator.ini', 'WINDOW', 'Y') ?? 0,
    windowW = IniFile.ReadInt('./creator.ini', 'WINDOW', 'W') ?? defaultWidth,
    windowH = IniFile.ReadInt('./creator.ini', 'WINDOW', 'H') ?? defaultHeight,
    windowT = IniFile.ReadInt('./creator.ini', 'WINDOW', 'T') ?? defaultTransparency,
    screenshotButton = IniFile.ReadInt('./creator.ini', 'MOD', 'SCREENSHOT') ?? defaultScreenshotButton;

while (true) {
    wait(0);

    ImGui.BeginFrame('CREATOR2');
    ImGui.SetCursorVisible(active);

    if (active) {
        ImGui.SetNextWindowSize(windowW, windowH, ImGuiCond.Once);
        ImGui.SetNextWindowPos(windowX, windowY, ImGuiCond.Once);
        ImGui.SetNextWindowTransparency(1.0 - windowT);
        active = ImGui.Begin(Creator.Creator, active, false, false, false, false);

        var preview = ImGui.Checkbox(Creator.Preview, preview);
        ImGui.Separator();

        if (ImGui.CollapsingHeader(Creator.General)) {
            allIgnore = ImGui.Checkbox(Creator.AllIgnore, allIgnore);
            copsIgnore = ImGui.Checkbox(Creator.CopsIgnore, copsIgnore);
            infSprint = ImGui.Checkbox(Creator.InfiniteSprint, infSprint);
            stayOnBike = ImGui.Checkbox(Creator.StayOnBike, stayOnBike);
            ImGui.Separator();
            var health = ImGui.SliderInt(Creator.Health, 100, 0, 200);
            var armour = ImGui.SliderInt(Creator.Armour, 50, 0, 100);
            var stars = ImGui.SliderInt(Creator.WantedLevel, 0, 0, 6);
            maxWantedLevel = ImGui.SliderInt(Creator.MaxWL, 6, 0, 6);
            var money = ImGui.InputInt(Creator.Money, 350, -999999999, 999999999);

            if (preview || IsGuiButtonPressed(Creator.Apply.concat('##General'))) {
                plc.setHealth(health);
                plc.addArmor(plc.getArmor() * -1 + armour);
                plr.alterWantedLevel(stars);
                plr.addScore(plr.storeScore() * -1).addScore(money);
            }
            ImGui.Separator();
        }

        if (ImGui.CollapsingHeader(Creator.Weapons)) {
            var ammo = ImGui.InputInt(Creator.Ammo, 100, 1, 15000);
            ImGui.Separator();
            var secondColumn = false;

            Object.entries(WeaponType).forEach(([key, value]) => {
                if (secondColumn) {
                    ImGui.SameLine();
                }
                secondColumn = !secondColumn;
                if (IsGuiButtonPressed(key, 2)) {
                    Sound.AddOneOffSound(.0, .0, .0, 1052);
                    var model = Weapon.GetModel(value);
                    loadModel(model);
                    plc.giveWeapon(value, ammo);
                    Streaming.MarkModelAsNoLongerNeeded(model);
                }
            });
            ImGui.Separator();
        }

        if (ImGui.CollapsingHeader(Creator.Proofs)) {
            if (plc.isInAnyCar()) {
                ImGui.TextColored(Creator.Player, .0, 1.0, 1.0, 1.0);
                ImGui.Spacing();
            }
            bp = ImGui.Checkbox(Creator.BulletProof, bp);
            fp = ImGui.Checkbox(Creator.FireProof, fp);
            ep = ImGui.Checkbox(Creator.ExplosionProof, ep);
            cp = ImGui.Checkbox(Creator.CollisionProof, cp);
            mp = ImGui.Checkbox(Creator.MeleeProof, mp);

            if (plc.isInAnyCar()) {
                ImGui.Separator();
                ImGui.TextColored(Creator.Vehicle, 1.0, 1.0, .0, 1.0);
                vbp = ImGui.Checkbox(Creator.BulletProof.concat('##2'), vbp);
                vfp = ImGui.Checkbox(Creator.FireProof.concat('##2'), vfp);
                vep = ImGui.Checkbox(Creator.ExplosionProof.concat('##2'), vep);
                vcp = ImGui.Checkbox(Creator.CollisionProof.concat('##2'), vcp);
                vmp = ImGui.Checkbox(Creator.MeleeProof.concat('##2'), vmp);
            }
            ImGui.Separator();
        }

        if (ImGui.CollapsingHeader(Creator.TimeWeather)) {
            var hours = ImGui.SliderInt(Creator.Hours, 12, 0, 23);
            var minutes = ImGui.SliderInt(Creator.Minutes, 30, 0, 59);
            var speed = ImGui.InputFloat(Creator.GameSpeed, 1.0, 0.0, 5.0);
            var weather = ImGui.SliderInt(Creator.Weather, 3, 0, 45);

            if (preview || IsGuiButtonPressed(Creator.Apply.concat('##TimeWeather'))) {
                Clock.SetTimeOfDay(hours, minutes);
                Clock.SetTimeScale(speed);
                Weather.ForceNow(weather);
            }
            ImGui.Separator();
        }

        if (ImGui.CollapsingHeader(Creator.Position)) {
            var pos = plc.getCoordinates();
            var int = plc.getAreaVisible();
            ImGui.TextColored(Creator.CurPosition, 1.0, 1.0, .0, 1.0);
            var displayedPos = 'X: ' + pos.x.toFixed(2) + ' Y: ' + pos.y.toFixed(2) + ' Z: ' + pos.z.toFixed(2) + ' Interior: ' + int.toString();
            ImGui.Text(displayedPos);
            ImGui.Separator()

            lock = ImGui.Checkbox(Creator.Lock, lock);
            freeze = ImGui.Checkbox(Creator.Freeze, freeze);
            ImGui.Separator();

            ImGui.Text(Creator.Coordinates);
            var pos = plc.getCoordinates();
            var precision = ImGui.Checkbox(Creator.Precision, precision);

            if (precision) {
                ImGui.SameLine();
                var floatRepr = ImGui.Checkbox(Creator.FloatRepr, floatRepr);

                if (floatRepr) {
                    var x = ImGui.InputFloat(Creator.PosX, x, -3000.0, 3000.0);
                    var y = ImGui.InputFloat(Creator.PosY, y, -3000.0, 3000.0);
                    var z = ImGui.InputFloat(Creator.PosZ, z, -100.0, 1500.0);
                    var heading = ImGui.InputFloat(Creator.Heading, heading, .0, 359.9);
                } else {
                    var x = ImGui.InputInt(Creator.PosX, x, -3000, 3000);
                    var y = ImGui.InputInt(Creator.PosY, y, -3000, 3000);
                    var z = ImGui.InputInt(Creator.PosZ, z, -100, 1500);
                    var heading = ImGui.InputInt(Creator.Heading, heading, 0, 359);
                }
            } else {
                var x = ImGui.SliderInt(Creator.PosX, x, -3000, 3000);
                var y = ImGui.SliderInt(Creator.PosY, y, -3000, 3000);
                var z = ImGui.SliderInt(Creator.PosZ, z, -100, 1500);
                var heading = ImGui.SliderInt(Creator.Heading, heading, 0, 359);
            }
            var interior = ImGui.SliderInt(Creator.Interior, 0, 0, 18);

            if (preview || IsGuiButtonPressed(Creator.Apply.concat('##Position'))) {
                teleportChar(plc, x, y, z, heading, interior, !preview);
            }
            if (!preview && World.GetTargetCoords()) {
                if (IsGuiButtonPressed(Creator.ToMapDest)) {
                    var waypoint = World.GetTargetCoords();
                    teleportChar(plc, waypoint.x, waypoint.y, -100, heading);
                }
            }
            Camera.RestoreJumpcut();
        }

        if (ImGui.CollapsingHeader(Creator.Interface)) {
            hud = ImGui.Checkbox(Creator.HUD, hud);
            radar = ImGui.Checkbox(Creator.Radar, radar);
            widescreen = ImGui.Checkbox(Creator.Widescreen, widescreen);
            carNames = ImGui.Checkbox(Creator.CarNames, carNames);
            zoneNames = ImGui.Checkbox(Creator.ZoneNames, zoneNames);
            var fov = ImGui.SliderInt(Creator.FOV, Camera.GetFov(), 30, 100);
            if (TIMERA > 499) {
                Camera.SetLerpFov(Camera.GetFov(), fov, 500, true);
                TIMERA = 0;
            }
            Camera.PersistFov(true);
        }
        ImGui.Separator();

        if (ImGui.CollapsingHeader(Creator.Settings)) {
            windowT = ImGui.SliderFloat(Creator.Transparency, 0.2, 0, 1);

            if (IsGuiButtonPressed(Creator.ResetPos)) {
                ImGui.SetWindowPos(0, 0, ImGuiCond.Always);
            }
            if (IsGuiButtonPressed(Creator.ResetSize)) {
                ImGui.SetWindowSize(defaultWidth, defaultHeight, ImGui.Always);
            }
            ImGui.Dummy(20.0, 30.0);
            ImGui.SameLine();
            if (ImGui.CollapsingHeader(Creator.ScrShotButton)) {
                // Thanks to Seemann for  how to iterate an enumeration!
                Object.entries(KeyCode).forEach(([key, value]) => {
                    addDummy();
                    screenshotButton = ImGui.RadioButton(key, screenshotButton, value);
                });
            }
            ImGui.Separator();
        }

        if (ImGui.CollapsingHeader(Creator.About)) {
            ImGui.TextWrapped(Creator.Authors);
        }

        applyBooleans();

        var windowPos = ImGui.GetWindowPos('CreatorWindowPos');
        var windowSize = ImGui.GetWindowSize('CreatorWindowSize');
        ImGui.End();
    }
    ImGui.EndFrame();

    if (Pad.IsKeyDown(activation)) {
        active = !active;

        if (!active) { // Save window settings
            Sound.AddOneOffSound(.0, .0, .0, 1054);
            IniFile.WriteInt(windowPos.x, './creator.ini', 'WINDOW', 'X');
            IniFile.WriteInt(windowPos.y, './creator.ini', 'WINDOW', 'Y');
            IniFile.WriteInt(windowSize.width, './creator.ini', 'WINDOW', 'W');
            IniFile.WriteInt(windowSize.height, './creator.ini', 'WINDOW', 'H');
            IniFile.WriteFloat(windowT, './creator.ini', 'WINDOW', 'T');
            IniFile.WriteInt(screenshotButton, './creator.ini', 'MOD', 'SCREENSHOT');
        }
    }
    if (Pad.IsKeyDown(screenshotButton)) {
        Camera.TakePhoto();
    }
}

//#region Additional ImGui functions
/**
 * Creates an ImGui button and returns its status.
 * @param {string} buttonText ImGui button name
 * @param {int} itemsNum The number of items on the line
 * @returns result of pressing the button
 */
function IsGuiButtonPressed(buttonText, itemsNum = 1) {
    return ImGui.Button(buttonText, ImGui.GetScalingSize('TestScaling', itemsNum, false).x, 30.0);
}

/**
 * Adds an ImGui dummy widget.
 * @param {float} width Dummy width
 * @param {float} height Dummy height
 */
 function addDummy(width = 20.0, height = 30.0) {
    ImGui.Dummy(20.0, 30.0);
    ImGui.SameLine();
}
//#endregion

//#region Creator functions
function applyBooleans() {
    Game.SetEveryoneIgnorePlayer(plr, allIgnore);
    Game.SetPoliceIgnorePlayer(plr, copsIgnore);
    Game.SetMaxWantedLevel(maxWantedLevel);

    Hud.Display(hud);
    Hud.DisplayRadar(radar);
    Hud.SwitchWidescreen(widescreen);
    Hud.DisplayCarNames(carNames);
    Hud.DisplayZoneNames(zoneNames);

    plr.setNeverGetsTired(infSprint)
        .setControl(!lock);

    plc.freezePosition(freeze)
        .setProofs(bp, fp, ep, cp, mp)
        .setCanBeKnockedOffBike(stayOnBike);

    if (plc.isInAnyCar()) {
        plc.storeCarIsInNoSave().setProofs(vbp, vfp, vep, vcp, vmp);
    }
}
//#endregion

//#region Game functions
/**
 * Teleports the character to the required destination.
 * @param {Char} char Character to teleport
 * @param {float} x X coordinate
 * @param {float} y Y coordinate
 * @param {float} z Z coordinate
 * @param {float} heading Heading (Z angle)
 * @param {int} interior Interior
 * @param {boolean} sceneLoading Request collision and load textures
 */
function teleportChar(char, x, y, z, heading, interior = 0, sceneLoading = true) {
    Streaming.SetAreaVisible(interior);

    if (sceneLoading) {
        Streaming.RequestCollision(x, y);
        Streaming.LoadScene(x, y, z);
    }

    if (!char.isInAnyCar()) {
        char.setCoordinates(x, y, z).setHeading(heading).setAreaVisible(interior);
    } else {
        var car = char.storeCarIsInNoSave();
        car.setCoordinates(x, y, z).setHeading(heading).setAreaVisible(interior);
        char.setAreaVisible(interior);
    }
}

/**
 * Load a GTA model.
 * @param {int} modelId Model ID to load
 */
function loadModel(modelId) {
    /*while (!Streaming.HasModelLoaded(modelId)) {
        Streaming.RequestModel(modelId);
        wait(0);
    }*/
    if (!Streaming.HasModelLoaded(modelId)) {
        Streaming.RequestModel(modelId);
        Streaming.LoadAllModelsNow();
    }
}
//#endregion