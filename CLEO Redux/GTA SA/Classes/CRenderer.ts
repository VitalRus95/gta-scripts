//	Script by Vital (Vitaly Pavlovich Ulyanov)
/* Some Plugin SDK classes for GTA: San Andreas. Thanks to:
    - GTA community for research;
    - DK22Pac for Plugin SDK [https://github.com/DK22Pac/plugin-sdk];
    - Seemann and wmysterio for help.
*/

import { CVector } from "./CVector";

export class CRenderer {
    /** Heading range `±3.14`. */
    static cameraPosition: CVector = new CVector(0xb76870);
    static GetCameraHeading(): float {
        return Memory.ReadFloat(0xb7684c, false);
    }
    static GetInTheSky(): boolean {
        return Memory.ReadU8(0xb76851, false) !== 0;
    }
}
