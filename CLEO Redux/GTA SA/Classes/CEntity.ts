//	Script by Vital (Vitaly Pavlovich Ulyanov)
/* Some Plugin SDK classes for GTA: San Andreas. Thanks to:
    - GTA community for research;
    - DK22Pac for Plugin SDK [https://github.com/DK22Pac/plugin-sdk];
    - Seemann and wmysterio for help.
*/

import { CPlaceable } from "./CPlaceable";

export class CEntity extends CPlaceable {
    constructor(pointer: int) {
        super(pointer);
    }
    get modelIndex(): int {
        return Memory.ReadI16(this.pointer + 0x22, false);
    }
}
