import { AltMenu, Item } from "../../altMenu[mem]";

const weather: Item[] = [
    { name: "~p~~h~LS~s~ EXTRASUNNY", id: 0 },
    { name: "~p~~h~LS~s~ SUNNY", id: 1 },
    { name: "~p~~h~LS~s~ EXTRASUNNY SMOG", id: 2 },
    { name: "~p~~h~LS~s~ SUNNY SMOG", id: 3 },
    { name: "~p~~h~LS~s~ CLOUDY", id: 4 },
    { name: "~b~~h~~h~SF~s~ SUNNY", id: 5 },
    { name: "~b~~h~~h~SF~s~ EXTRASUNNY", id: 6 },
    { name: "~b~~h~~h~SF~s~ CLOUDY", id: 7 },
    { name: "~b~~h~~h~SF~s~ RAINY", id: 8 },
    { name: "~b~~h~~h~SF~s~ FOGGY", id: 9 },
    { name: "~y~LV~s~ SUNNY", id: 10 },
    { name: "~y~LV~s~ EXTRASUNNY", id: 11 },
    { name: "~y~LV~s~ CLOUDY", id: 12 },
    { name: "~g~~h~COUNTRYSIDE~s~ EXTRASUNNY", id: 13 },
    { name: "~g~~h~COUNTRYSIDE~s~ SUNNY", id: 14 },
    { name: "~g~~h~COUNTRYSIDE~s~ CLOUDY", id: 15 },
    { name: "~g~~h~COUNTRYSIDE~s~ RAINY", id: 16 },
    { name: "~r~~h~~h~DESERT~s~ EXTRASUNNY", id: 17 },
    { name: "~r~~h~~h~DESERT~s~ SUNNY", id: 18 },
    { name: "~r~~h~~h~DESERT~s~ SANDSTORM", id: 19 },
    { name: "UNDERWATER", id: 20 },
    { name: "EXTRACOLOURS 1", id: 21 },
    { name: "EXTRACOLOURS 2", id: 22 },
].map((w) => ({
    name: w.name,
    enter: function () {
        Weather.ForceNow(w.id);
    },
}));

weather.unshift({
    name: "Reset",
    enter: function () {
        Weather.SetToAppropriateTypeNow();
    },
});

export let weatherMenu: AltMenu = new AltMenu("Weather", weather, {
    disableHud: true,
    counterPos: { x: 0.03, y: 0.89 },
    itemsPos: { x: 0.03, y: 0.6 },
    selectedBackgroundColour: [255, 190, 120, 127],
    showCounter: true,
    titleColour: [255, 190, 120, 230],
    titlePos: { x: 0.03, y: 0.53 },
});
