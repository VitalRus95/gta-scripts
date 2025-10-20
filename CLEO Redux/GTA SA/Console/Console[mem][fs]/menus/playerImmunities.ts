import { AltMenu } from "../../altMenu[mem]";
import { Proofs, isBitSet, playerProofs, setImmunity } from "../index";
import { OFF, ON } from "../sharedConstants";

export let playerImmunitiesMenu: AltMenu = new AltMenu(
    "Player's immunities",
    [
        {
            // Bullet
            name: function () {
                return `Bullet: ${
                    isBitSet(playerProofs, Proofs.Bullet) ? ON : OFF
                }`;
            },
            click: function () {
                setImmunity(
                    true,
                    Proofs.Bullet,
                    !isBitSet(playerProofs, Proofs.Bullet),
                );
            },
        },
        {
            // Fire
            name: function () {
                return `Fire: ${
                    isBitSet(playerProofs, Proofs.Fire) ? ON : OFF
                }`;
            },
            click: function () {
                setImmunity(
                    true,
                    Proofs.Fire,
                    !isBitSet(playerProofs, Proofs.Fire),
                );
            },
        },
        {
            // Explosion
            name: function () {
                return `Explosion: ${
                    isBitSet(playerProofs, Proofs.Explosion) ? ON : OFF
                }`;
            },
            click: function () {
                setImmunity(
                    true,
                    Proofs.Explosion,
                    !isBitSet(playerProofs, Proofs.Explosion),
                );
            },
        },
        {
            // Collision
            name: function () {
                return `Collision: ${
                    isBitSet(playerProofs, Proofs.Collision) ? ON : OFF
                }`;
            },
            click: function () {
                setImmunity(
                    true,
                    Proofs.Collision,
                    !isBitSet(playerProofs, Proofs.Collision),
                );
            },
        },
        {
            // Melee
            name: function () {
                return `Melee: ${
                    isBitSet(playerProofs, Proofs.Melee) ? ON : OFF
                }`;
            },
            click: function () {
                setImmunity(
                    true,
                    Proofs.Melee,
                    !isBitSet(playerProofs, Proofs.Melee),
                );
            },
        },
    ],
    {
        selectedBackgroundColour: [155, 255, 165, 90],
        titleColour: [155, 255, 165, 230],
    },
);
