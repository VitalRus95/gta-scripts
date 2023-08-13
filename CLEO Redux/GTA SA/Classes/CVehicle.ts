//	Script by Vital (Vitaly Pavlovich Ulyanov)
/* Some Plugin SDK classes for GTA: San Andreas. Thanks to:
    - GTA community for research;
    - DK22Pac for Plugin SDK [https://github.com/DK22Pac/plugin-sdk];
    - Seemann and wmysterio for help.
*/

import { CPhysical } from "./CPhysical";

export class CVehicle extends CPhysical {
    handle: Car;

    constructor(carOrPointer: Car | int) {
        if (carOrPointer instanceof Car) {
            super(Memory.GetVehiclePointer(carOrPointer));
            this.handle = carOrPointer;
            this.pointer = Memory.GetVehiclePointer(carOrPointer);
        } else {
            super(carOrPointer);
            this.handle = Memory.GetVehicleRef(carOrPointer);
            this.pointer = carOrPointer;
        }
    }
}
