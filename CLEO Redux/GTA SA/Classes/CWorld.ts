//	Script by Vital (Vitaly Pavlovich Ulyanov)
/* Some Plugin SDK classes for GTA: San Andreas. Thanks to:
    - GTA community for research;
    - DK22Pac for Plugin SDK [https://github.com/DK22Pac/plugin-sdk];
    - Seemann and wmysterio for help.
*/

import { CEntity } from "./CEntity";
import { CVector } from "./CVector";

export class CWorld {
    static SetPedsOnFire(position: CVector, radius: float, culprit?: CEntity) {
        Memory.CallFunction(
            0x565610,
            5,
            5,
            Memory.FromFloat(position.x),
            Memory.FromFloat(position.y),
            Memory.FromFloat(position.z),
            Memory.FromFloat(radius),
            culprit?.pointer ?? 0
        );
    }

    static SetCarsOnFire(position: CVector, radius: float, culprit?: CEntity) {
        Memory.CallFunction(
            0x5659f0,
            5,
            5,
            Memory.FromFloat(position.x),
            Memory.FromFloat(position.y),
            Memory.FromFloat(position.z),
            Memory.FromFloat(radius),
            culprit?.pointer ?? 0
        );
    }

    static SetPedsChoking(position: CVector, radius: float, culprit?: CEntity) {
        Memory.CallFunction(
            0x565800,
            5,
            5,
            Memory.FromFloat(position.x),
            Memory.FromFloat(position.y),
            Memory.FromFloat(position.z),
            Memory.FromFloat(radius),
            culprit?.pointer ?? 0
        );
    }

    static SetWorldOnFire(position: CVector, radius: float, culprit?: CEntity) {
        Memory.CallFunction(
            0x56b910,
            5,
            5,
            Memory.FromFloat(position.x),
            Memory.FromFloat(position.y),
            Memory.FromFloat(position.z),
            Memory.FromFloat(radius),
            culprit?.pointer ?? 0
        );
    }
}
