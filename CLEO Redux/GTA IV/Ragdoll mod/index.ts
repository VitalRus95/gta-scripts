//	Script by Vital (Vitaly Pavlovich Ulyanov). Thanks for help to Seemann and wmysterio!

type ragdollStatus = 'none' | 'switch' | 'enable' | 'disable';

const buttonReload = 29;
const buttonAim = 87;

const plr: Player = new Player(0);
const plc: Char = plr.getChar();
let isRagdoll: boolean = false;

while (true) {
    wait(15);

    if (!plr.isPlaying()) continue;

    switch (getRagdollStatus()) {
        case 'enable':
            plc.switchToRagdoll(-1, -1, false, false, false, false);
            break;
        case 'switch':
        case 'disable':
            isRagdoll = !isRagdoll;
            if (!isRagdoll) plc.switchToAnimated(false);
        default:
            break;
    }
}

function getRagdollStatus(): ragdollStatus {
    if (
        !plc.isInAnyCar() &&
        plc.getCurrentWeapon() < 6 &&
        !Pad.IsControlPressed(0, buttonAim) &&
        Pad.IsControlJustPressed(0, buttonReload)
    ) return 'switch';

    if (isRagdoll) {
        if (
            plc.isInAnyCar() ||
            plc.getCurrentWeapon() === undefined // When switching weapons
        ) return 'disable';

        if (
            !plc.isRagdoll()
        ) return 'enable';
    }

    return 'none';
}