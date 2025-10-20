import { AltMenu } from "../../altMenu[mem]";
import { Proofs, carProofs, isBitSet, setImmunity } from "../index";
import { OFF, ON } from "../sharedConstants";

export let vehicleImmunitiesMenu: AltMenu = new AltMenu(
    "Vehicle's immunities",
    [
        {
            // Bullet
            name: function () {
                return `Bullet: ${
                    isBitSet(carProofs, Proofs.Bullet) ? ON : OFF
                }`;
            },
            click: function () {
                setImmunity(
                    false,
                    Proofs.Bullet,
                    !isBitSet(carProofs, Proofs.Bullet),
                );
            },
        },
        {
            // Fire
            name: function () {
                return `Fire: ${isBitSet(carProofs, Proofs.Fire) ? ON : OFF}`;
            },
            click: function () {
                setImmunity(
                    false,
                    Proofs.Fire,
                    !isBitSet(carProofs, Proofs.Fire),
                );
            },
        },
        {
            // Explosion
            name: function () {
                return `Explosion: ${
                    isBitSet(carProofs, Proofs.Explosion) ? ON : OFF
                }`;
            },
            click: function () {
                setImmunity(
                    false,
                    Proofs.Explosion,
                    !isBitSet(carProofs, Proofs.Explosion),
                );
            },
        },
        {
            // Collision
            name: function () {
                return `Collision: ${
                    isBitSet(carProofs, Proofs.Collision) ? ON : OFF
                }`;
            },
            click: function () {
                setImmunity(
                    false,
                    Proofs.Collision,
                    !isBitSet(carProofs, Proofs.Collision),
                );
            },
        },
        {
            // Melee
            name: function () {
                return `Melee: ${isBitSet(carProofs, Proofs.Melee) ? ON : OFF}`;
            },
            click: function () {
                setImmunity(
                    false,
                    Proofs.Melee,
                    !isBitSet(carProofs, Proofs.Melee),
                );
            },
        },
    ],
    {
        selectedBackgroundColour: [145, 250, 255, 90],
        titleColour: [145, 250, 255, 230],
    },
);
