/// <reference path=".config/sa.d.ts"/>
//	Script by Vital (Vitaly Pavlovich Ulyanov)

var player = new Player(0);

class Column {
    /**
     * Internal column class.
     * @param {int} index Column number
     * @param {gxt_key} title Column's title
     * @param {Option[]} options Array of options (max 12)
     */
    constructor (index, title, options) {
        this.index = index;
        this.title = title;
        this.options = options;

        // Add 'DUMMY' options if there are fewer than 12 of them
        while (this.options.length < 12) {
            this.options.push(new Option());
        }
    }
};

export const dummyText = 'DUMMY';

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
    constructor(optionName = dummyText, callbackFunction = undefined, args = [], highlight = false, displayedNumbers = []) {
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

/**
 * Module by Vital (Vitaly Pavlovich Ulyanov)
 */
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
     * @param {boolean} lockPlayer Whether to lock the player when the menu is shown
     */
    constructor (header, topLeftX = 230, topLeftY = 150, width = 180, numColumns = 1, interactive = true, background = true, alignment = PanelAlignment.Left, lockPlayer = true) {
        this.exists = true;
        this.header = header;
        this.x = topLeftX;
        this.y = topLeftY;
        this.width = width;
        this.numColumns = numColumns;
        this.interactive = interactive;
        this.background = background;
        this.alignment = alignment;
        this.lockPlayer = lockPlayer;

        var newMenu = Menu.Create(this.header, this.x, this.y, this.width, this.numColumns, this.interactive, this.background, this.alignment);

        this.menu = newMenu;
        /**
         * @type Column[]
         */
        this.columns = new Array(this.numColumns);

        if (this.lockPlayer && player.isPlaying()) {
            player.setControl(false);
        }
    }

    /**
     * Set up the panel's options.
     * @param {int} columnIndex Column number
     * @param {gxt_key} title Column's title
     * @param {Option[]} options Array of options (max 12)
     */
    addColumn(columnIndex = 0, title = dummyText, options = []) {
        this.columns[columnIndex] = new Column(columnIndex, title, options);

        // Set column content
        this.menu.setColumn(
            this.columns[columnIndex].index,
            this.columns[columnIndex].title,
            this.columns[columnIndex].options[0].gxt,
            this.columns[columnIndex].options[1].gxt,
            this.columns[columnIndex].options[2].gxt,
            this.columns[columnIndex].options[3].gxt,
            this.columns[columnIndex].options[4].gxt,
            this.columns[columnIndex].options[5].gxt,
            this.columns[columnIndex].options[6].gxt,
            this.columns[columnIndex].options[7].gxt,
            this.columns[columnIndex].options[8].gxt,
            this.columns[columnIndex].options[9].gxt,
            this.columns[columnIndex].options[10].gxt,
            this.columns[columnIndex].options[11].gxt
        );

        // Rows formatting
        for (var i = 0; i < 12; i++) {
            // Highlighting
            if (this.columns[columnIndex].options[i].highlight) {
                this.menu.highlightItem(i, true);
            }
            // Text with variables
            var numArray = this.columns[columnIndex].options[i].displayedNumbers;
            if (numArray.length > 0) {
                var numGxt = this.columns[columnIndex].options[i].gxt;
                if (numArray.length < 2) {
                    this.menu.setItemWithNumber(columnIndex, i, numGxt, numArray[0]);
                } else {
                    this.menu.setItemWith2Numbers(columnIndex, i, numGxt, numArray[0], numArray[1]);
                }
            }
        }
    }

    processChoice() {
        // Exit
        if (!player.isPlaying() || Pad.IsButtonPressed(0, 15)) {
            this.delete();
            return;
        }

        // Lock player again so that nothing could reset this flag
        if (this.lockPlayer) {
            player.setControl(false);
        }

        // Confirm choice
        if (Pad.IsButtonPressed(0, 16)) {
            var selection = this.menu.getItemSelected();

            if (selection > -1 && selection < 12) {
                this.columns[0].options[selection].run();
            } else {
                log('Failed to run the function of panel item ', selection);
            }

            while (Pad.IsButtonPressed(0, 16)) {
                wait(0);
            }
        }
    }

    delete() {
        this.menu.delete();
        this.exists = false;
        if (this.lockPlayer) {
            player.setControl(true);
        }
    }
};