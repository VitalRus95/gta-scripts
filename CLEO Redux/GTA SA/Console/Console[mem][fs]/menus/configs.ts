import { AltMenu } from "../../altMenu[mem]";
import { configsInfo } from "../configs";
import { runCommand } from "../index";

export let configsMenu: AltMenu = new AltMenu(
    "Configurations",
    configsInfo.map((c) => ({
        name: c.name,
        description: c.description,
        click: function () {
            c.commands.forEach((i) => runCommand(i));
            Text.PrintHelpString("Configuration applied!");
        },
    })),
    {
        selectedBackgroundColour: [130, 110, 205, 90],
        showCounter: true,
        titleColour: [130, 110, 205, 230],
    },
);
