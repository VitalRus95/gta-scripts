import { AltMenu } from "../../altMenu[mem]";

export let helpMenu: AltMenu = new AltMenu(
    "Console help",
    [
        {
            name: "~y~Buttons~s~: Enter",
            description: "Run current command",
        },
        {
            name: "~y~Buttons~s~: ~<~/~>~",
            description: "Move the cursor (~>~) left/right",
        },
        {
            name: "~y~Buttons~s~: ~u~/~d~",
            description: "Cycle through command history",
        },
        {
            name: "~y~Buttons~s~: Shift",
            description:
                "Speed up input actions (cursor movement, symbol deletion, etc.)",
        },
        {
            name: "~y~Buttons~s~: Home/End",
            description: "Move the cursor to the beginning/end of the input",
        },
        {
            name: "~y~Buttons~s~: Backspace",
            description: "Delete one symbol ~y~before~s~ the cursor",
        },
        {
            name: "~y~Buttons~s~: Delete",
            description: "Delete one symbol ~y~after~s~ the cursor",
        },
        {
            name: "~y~Buttons~s~: Left Control (~r~~h~Ctrl~s~)",
            description: "Clear the input",
        },
        {
            name: "~y~Buttons~s~: Insert",
            description: "Insert the last used command",
        },
        {
            name: "~y~Buttons~s~: Tab",
            description:
                "Autocompletion based on the text ~y~before~s~ the cursor",
        },
        {
            name: "~p~~h~Data types~s~: ~s~int",
            description: "Integer numbers: ~y~51, 108, 359,~s~ et cetera",
        },
        {
            name: "~p~~h~Data types~s~: ~s~float",
            description:
                "Floating-point numbers: ~y~1.7, 13.34, 2475.5,~s~ et cetera",
        },
        {
            name: "~p~~h~Data types~s~: ~s~string",
            description: "Text values: ~y~Hello, world~s~ et cetera",
        },
        {
            name: "~p~~h~Data types~s~: ~s~bool",
            description: "Boolean values: ~y~0 (OFF)~s~/~y~1 (ON)",
        },
        {
            name: "Author: ~r~~h~Vital~s~ (Vitaly Ulyanov)",
            description: "https://github.com/~y~VitalRus95",
        },
        {
            name: "Thanks to ~b~~h~~h~Seemann",
            description:
                "For help and ~r~~h~CLEO Redux~s~.~n~https://github.com/~y~x87",
        },
        {
            name: "Thanks to ~b~~h~~h~wmysterio",
            description: "For help.~n~https://github.com/~y~wmysterio",
        },
        {
            name: "Thanks to ~b~~h~~h~ANTINICKNAMES",
            description: "For ideas.~n~https://github.com/~y~ANTINICKNAMES",
        },
    ],
    {
        showCounter: true,
    },
);
