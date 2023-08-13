//	Script by Vital (Vitaly Pavlovich Ulyanov)
/* Some Plugin SDK classes for GTA: San Andreas. Thanks to:
    - GTA community for research;
    - DK22Pac for Plugin SDK [https://github.com/DK22Pac/plugin-sdk];
    - Seemann and wmysterio for help.
*/

import { CEntity } from "./CEntity";
import { CVector } from "./CVector";

export class CPhysical extends CEntity {
    moveSpeed: CVector;
    turnSpeed: CVector;
    frictionMoveSpeed: CVector;
    frictionTurnSpeed: CVector;
    force: CVector;
    torque: CVector;
    centreOfMass: CVector;
    lastCollisionDirection: CVector;
    lastCollisionPosition: CVector;

    constructor(pointer: int) {
        super(pointer);
        this.moveSpeed = new CVector(this.pointer + 0x44);
        this.turnSpeed = new CVector(this.pointer + 0x50);
        this.frictionMoveSpeed = new CVector(this.pointer + 0x5c);
        this.frictionTurnSpeed = new CVector(this.pointer + 0x68);
        this.force = new CVector(this.pointer + 0x74);
        this.torque = new CVector(this.pointer + 0x80);
        this.centreOfMass = new CVector(this.pointer + 0xa4);
        this.lastCollisionDirection = new CVector(this.pointer + 0xe0);
        this.lastCollisionPosition = new CVector(this.pointer + 0xec);
    }
    get damageIntensity(): float {
        return Memory.ReadFloat(this.pointer + 0xd8, false);
    }
    set damageIntensity(value: float) {
        Memory.WriteFloat(this.pointer + 0xd8, value, false);
    }

    get movingSpeed(): float {
        return Memory.ReadFloat(this.pointer + 0xd4, false);
    }
    get contactSurfaceBrightness(): float {
        return Memory.ReadFloat(this.pointer + 0x12c, false);
    }
    get dynamicLighting(): float {
        return Memory.ReadFloat(this.pointer + 0x130, false);
    }
}
