//	Script by Vital (Vitaly Pavlovich Ulyanov)
/* Some Plugin SDK classes for GTA: San Andreas. Thanks to:
    - GTA community for research;
    - DK22Pac for Plugin SDK [https://github.com/DK22Pac/plugin-sdk];
    - Seemann and wmysterio for help.
*/

export function isNumInRange(value: number, min: number, max: number) {
    return value >= min && value <= max;
}

export function clamp(value: number, min: number, max: number) {
    return value > max ? max : value < min ? min : value;
}

export function getWindowResolution() {
    return {
        width: Memory.ReadI32(0xc17040 + 4, false),
        height: Memory.ReadI32(0xc17040 + 8, false),
    };
}

export function convertToGameScreenPos(x: float, y: float) {
    let res = getWindowResolution();
    return {
        x: (x / res.width) * 640,
        y: (y / res.height) * 448,
    };
}
