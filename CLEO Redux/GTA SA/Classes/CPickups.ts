//	Script by Vital (Vitaly Pavlovich Ulyanov)
/* Some Plugin SDK classes for GTA: San Andreas. Thanks to:
    - GTA community for research;
    - DK22Pac for Plugin SDK [https://github.com/DK22Pac/plugin-sdk];
    - Seemann and wmysterio for help.
*/

import { CEntity } from "./CEntity";

export class CPickups {
    static DoCollectableEffects(entity: CEntity) {
        Memory.CallFunction(0x455e20, 1, 1, entity.pointer);
    }
    static DoMineEffects(entity: CEntity) {
        Memory.CallFunction(0x4560e0, 1, 1, entity.pointer);
    }
    static DoMoneyEffects(entity: CEntity) {
        Memory.CallFunction(0x454e80, 1, 1, entity.pointer);
    }
    static DoPickUpEffects(entity: CEntity) {
        Memory.CallFunction(0x455720, 1, 1, entity.pointer);
    }
    static ModelForWeapon(weaponType: int): int {
        return Memory.CallFunctionReturn(0x454ac0, 1, 1, weaponType);
    }
    static WeaponForModel(modelIndex: int) {
        return Memory.CallFunctionReturn(0x454ae0, 1, 1, modelIndex);
    }
    static PickedUpHorseShoe() {
        Memory.CallFunction(0x455390, 0, 0);
    }
    static PickedUpOyster() {
        Memory.CallFunction(0x4552d0, 0, 0);
    }
}
