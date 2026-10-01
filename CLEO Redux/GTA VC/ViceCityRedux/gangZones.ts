// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import { DayOrNight, GangType, VehicleModel } from "../ScriptingKit/vc_enums.mts";
import { randomInt } from "../ScriptingKit/vc_funcs.mts";

Gang.SetCarModel(GangType.Security, VehicleModel.Securicar);

type MaxDensity = {
    day: float;
    night: float;
};

type GangZone = {
    name: string;
    peds: MaxDensity;
    cars: MaxDensity;
    cuban?: MaxDensity;
    haitian?: MaxDensity;
    street?: MaxDensity;
    security?: MaxDensity;
    biker?: MaxDensity;
    cop?: MaxDensity;
};

const BASE_DENSITY: int = 100;
const ZONES: GangZone[] = [
    {
        name: "BIKAREA",
        peds: { day: 0.13, night: 0.1 },
        cars: { day: 0.12, night: 0.1 },
        biker: { day: 0.6, night: 0.5 },
        haitian: { day: 0.15, night: 0.15 },
        cop: { day: 0.3, night: 0.35 },
    },
    {
        name: "BUSINES",
        peds: { day: 0.18, night: 0.1 },
        cars: { day: 0.16, night: 0.1 },
        biker: { day: 0.3, night: 0.2 },
        street: { day: 0.1, night: 0.1 },
        cop: { day: 0.2, night: 0.25 },
    },
    {
        name: "CLUB1",
        peds: { day: 0.1, night: 0.11 },
        cars: { day: 0.1, night: 0.09 },
        biker: { day: 0.15, night: 0.2 },
        security: { day: 0.1, night: 0.1 },
        cop: { day: 0.1, night: 0.07 },
    },
    {
        name: "CLUB2",
        peds: { day: 0.11, night: 0.09 },
        cars: { day: 0.09, night: 0.07 },
        biker: { day: 0.25, night: 0.4 },
        security: { day: 0.1, night: 0.1 },
        cop: { day: 0.15, night: 0.1 },
    },
    {
        name: "CONSTRU",
        peds: { day: 0.11, night: 0.1 },
        cars: { day: 0.11, night: 0.1 },
        security: { day: 0.2, night: 0.1 },
        cop: { day: 0.2, night: 0.15 },
    },
    {
        name: "DOCKS",
        peds: { day: 0.12, night: 0.09 },
        cars: { day: 0.11, night: 0.08 },
        street: { day: 0.3, night: 0.2 },
        cop: { day: 0.15, night: 0.1 },
    },
    {
        name: "GANG2",
        peds: { day: 0.12, night: 0.09 },
        cars: { day: 0.11, night: 0.08 },
        haitian: { day: 0.7, night: 0.6 },
        cuban: { day: 0.2, night: 0.3 },
        biker: { day: 0.15, night: 0.1 },
        cop: { day: 0.1, night: 0.15 },
    },
    {
        name: "GHETTO1",
        peds: { day: 0.12, night: 0.09 },
        cars: { day: 0.11, night: 0.08 },
        haitian: { day: 0.7, night: 0.6 },
        cuban: { day: 0.2, night: 0.25 },
        biker: { day: 0.2, night: 0.1 },
        cop: { day: 0.1, night: 0.15 },
    },
    {
        name: "GHETTO2",
        peds: { day: 0.12, night: 0.09 },
        cars: { day: 0.11, night: 0.08 },
        cuban: { day: 0.7, night: 0.6 },
        haitian: { day: 0.2, night: 0.25 },
        security: { day: 0.3, night: 0.2 },
        cop: { day: 0.1, night: 0.15 },
    },
    {
        name: "RICH1",
        peds: { day: 0.13, night: 0.1 },
        cars: { day: 0.11, night: 0.08 },
        street: { day: 0.2, night: 0.3 },
        security: { day: 0.5, night: 0.7 },
        cop: { day: 0.3, night: 0.35 },
    },
    {
        name: "RICH2",
        peds: { day: 0.13, night: 0.1 },
        cars: { day: 0.11, night: 0.08 },
        street: { day: 0.1, night: 0.2 },
        security: { day: 0.4, night: 0.6 },
        biker: { day: 0.1, night: 0.25 },
        cop: { day: 0.3, night: 0.25 },
    },
    {
        name: "RICH3",
        peds: { day: 0.11, night: 0.07 },
        cars: { day: 0.1, night: 0.08 },
        security: { day: 0.6, night: 0.8 },
        cop: { day: 0.3, night: 0.25 },
    },
    {
        name: "SHOP1",
        peds: { day: 2, night: 1 },
        cars: { day: 0.12, night: 0.09 },
        security: { day: 0.5, night: 0.7 },
        cop: { day: 0.3, night: 0.35 },
    },
    {
        name: "SHOP2",
        peds: { day: 0.13, night: 0.1 },
        cars: { day: 0.1, night: 0.08 },
        security: { day: 0.4, night: 0.6 },
        cop: { day: 0.2, night: 0.25 },
    },
    {
        name: "SHOP3",
        peds: { day: 0.13, night: 0.1 },
        cars: { day: 0.1, night: 0.08 },
        security: { day: 0.4, night: 0.6 },
        cop: { day: 0.2, night: 0.25 },
    },
    {
        name: "SHOP4",
        peds: { day: 0.13, night: 0.1 },
        cars: { day: 0.1, night: 0.08 },
        biker: { day: 0.3, night: 0.2 },
        security: { day: 0.3, night: 0.5 },
        cop: { day: 0.15, night: 0.2 },
    },
    {
        name: "SHOP5",
        peds: { day: 0.13, night: 0.1 },
        cars: { day: 0.1, night: 0.08 },
        biker: { day: 0.4, night: 0.3 },
        security: { day: 0.3, night: 0.5 },
        cop: { day: 0.2, night: 0.2 },
    },
    {
        name: "STREET5",
        peds: { day: 0.05, night: 0.04 },
        cars: { day: 0.06, night: 0.05 },
        street: { day: 0.4, night: 0.5 },
        biker: { day: 0.2, night: 0.25 },
        security: { day: 0.1, night: 0.1 },
        cop: { day: 0.1, night: 0.15 },
    },
    {
        name: "STREET6",
        peds: { day: 0.12, night: 0.09 },
        cars: { day: 0.11, night: 0.08 },
        cuban: { day: 0.5, night: 0.3 },
        haitian: { day: 0.15, night: 0.2 },
        street: { day: 0.1, night: 0.1 },
        cop: { day: 0.15, night: 0.2 },
    },
];

while (true) {
    if (ONMISSION) {
        wait(1000);
        continue;
    }

    ZONES.forEach((zone) => {
        [DayOrNight.Night, DayOrNight.Day].forEach((time) => {
            Zone.SetPedInfo(
                zone.name,
                time,
                getFixedDensity(zone.peds, time),
                getDensity(zone.cuban, time),
                getDensity(zone.haitian, time),
                getDensity(zone.street, time),
                0,
                getDensity(zone.security, time),
                getDensity(zone.biker, time),
                0,
                0,
                0,
                getDensity(zone.cop, time),
            );

            Zone.SetCarInfo(
                zone.name,
                time,
                getFixedDensity(zone.cars, time),
                getDensity(zone.cuban, time),
                getDensity(zone.haitian, time),
                getDensity(zone.street, time),
                0,
                getDensity(zone.security, time),
                getDensity(zone.biker, time),
                0,
                0,
                0,
                getDensity(zone.cop, time),
            );
        });
    });
    wait(60000);
}

function getFixedDensity(value: MaxDensity, time: DayOrNight): int {
    return time === DayOrNight.Day
        ? Math.round(value.day * BASE_DENSITY)
        : Math.round(value.night * BASE_DENSITY);
}

function getDensity(range: MaxDensity, time: DayOrNight): int {
    if (range) {
        return randomInt(
            0,
            time === DayOrNight.Day ? range.day * BASE_DENSITY : range.night * BASE_DENSITY,
        );
    } else {
        return randomInt(0, 5);
    }
}
