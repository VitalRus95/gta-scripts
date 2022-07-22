/// <reference path=".config/sa.d.ts"/>
//	Script by Vital (Vitaly Pavlovich Ulyanov)

export const PanelAlignment = {
    'Centre': 0,
    'Left': 1,
    'Right': 2
};

export class Option {
    /**
     * Creates a menu (panel) option.
     * @param {gxt_key} optionName GXT entry of the menu option
     * @param {function} callbackFunction Function to call when this option is chosen
     * @param {Array} args Array of the function's arguments
     * @param {boolean} highlight Whether to highlight this menu item
     * @param {any[]} displayedNumbers Numbers to display with the text (max 2)
     */
    constructor(optionName = 'DUMMY', callbackFunction = undefined, args = [], highlight = false, displayedNumbers = []) {
        this.gxt = optionName;
        this.func = callbackFunction;
        this.args = args;
        this.highlight = highlight;
        this.displayedNumbers = displayedNumbers;
    }

    run() {
        if (this.func) {
            this.func.apply(undefined, this.args);
        }
    }
};

export class Panel {
    /**
     * Set up the panel's settings.
     * @param {string} header Menu header
     * @param {float} topLeftX Menu X coordinate
     * @param {float} topLeftY Menu Y coordinate
     * @param {float} width Menu width
     * @param {int} numColumns Number of columns
     * @param {boolean} interactive Is the menu interactive
     * @param {boolean} background Does the menu have background
     * @param {PanelAlignment} alignment Type of text alignment
     */
    constructor (header, topLeftX = 230, topLeftY = 150, width = 180, numColumns = 1, interactive = true, background = true, alignment = PanelAlignment.Left) {
        this.exists = true;
        this.header = header;
        this.x = topLeftX;
        this.y = topLeftY;
        this.width = width;
        this.numColumns = numColumns;
        this.interactive = interactive;
        this.background = background;
        this.alignment = alignment;

        var newMenu = Menu.Create(this.header, this.x, this.y, this.width, this.numColumns, this.interactive, this.background, this.alignment),
            plr = new Player(0);

        this.menu = newMenu;
        this.player = plr;
    }

    /**
     * Set up the panel's options.
     * @param {int} column Column number
     * @param {gxt_key} title Column's title
     * @param {Option[]} options Array of options (max 12)
     */
    setUpOptions(column = 0, title = 'DUMMY', options = []) {
        this.column = column;
        this.title = title;
        this.options = options;

        // Add 'DUMMY' options if there are fewer than 12 of them
        while (this.options.length < 12) {
            this.options.push(new Option());
        }

        // Set column content
        this.menu.setColumn(
            this.column,
            this.title,
            this.options[0].gxt,
            this.options[1].gxt,
            this.options[2].gxt,
            this.options[3].gxt,
            this.options[4].gxt,
            this.options[5].gxt,
            this.options[6].gxt,
            this.options[7].gxt,
            this.options[8].gxt,
            this.options[9].gxt,
            this.options[10].gxt,
            this.options[11].gxt
        );

        // Rows formatting
        for (var i = 0; i < 12; i++) {
            // Highlighting
            if (this.options[i].highlight) {
                this.menu.highlightItem(i, true);
            }
            // Text with variables
            var numArray = this.options[i].displayedNumbers;
            if (numArray.length > 0) {
                if (numArray.length < 2) {
                    this.menu.setItemWithNumber(this.column, i, this.options[i].gxt, numArray[0]);
                } else {
                    this.menu.setItemWith2Numbers(this.column, i, this.options[i].gxt, numArray[0], numArray[1]);
                }
            }
        }
    }

    processChoice() {
        // Confirm
        if (Pad.IsButtonPressed(0, 16)) {
            var selection = this.menu.getItemSelected();

            if (selection > -1 && selection < 12) {
                this.options[selection].run();
            } else {
                log('Failed to run the function of panel item ', selection);
            }

            while (Pad.IsButtonPressed(0, 16)) {
                wait(0);
            }
        }

        // Exit
        if (Pad.IsButtonPressed(0, 15) || !this.player.isPlaying()) {
            this.menu.delete();
            this.exists = false;
        }
    }

    delete() {
        this.menu.delete();
        this.exists = false;
    }
};