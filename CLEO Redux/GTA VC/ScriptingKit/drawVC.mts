// Script by Vital (Vitaly Pavlovich Ulyanov)
// GTA: Vice City v1.0 required
import { Font, ScriptSound, TimerDirection } from "./vc_enums.mts";
import { clamp, getScreenSize, getTimeStep, PLAYER } from "./vc_funcs.mts";

Memory.Write(0x5599c2, 5, 0x90, true); // NOP zone names
Memory.Write(0x559e8e, 5, 0x90, true); // NOP vehicle names
Memory.Write(0x5446f2, 5, 0x90, true); // NOP custom shadow in credits
Memory.WriteU8(0x544703 + 1, 255, true); // Change blue colour in credits

// Fix drawn text's shadow disappearance (CFont::SetDropShadowPosition)
Memory.WriteU8(0x55b11c, 2, true); // When subtitles are displayed
Memory.WriteU8(0x55b5a5, 2, true); // When help text is displayed
Memory.WriteU8(0x5522d3, 2, true); // Change shadow in CFont::InitPerFrame

const DEFAULT_COLOUR: [int, int, int, int] = [91, 181, 232, 255];
const DEFAULT_SCALE: [float, float] = [0.7, 2.1];
const DEFAULT_FONT: int = Font.Heading;
const START_X: float = 605;
const START_Y: float = 95;
const ROW_GAP: float = 22;

export interface DrawOptions {
    colour?: [int, int, int, int];
    font?: int;
}

export interface ExtendedDrawOptions {
    colour?: [int, int, int, int];
    font?: int;
    scale?: [float, float];
    scaleMultiplier?: float;
    alignment?: "left" | "centre" | "right";
    wrapX?: float;
}

export interface QueuedText {
    text: DrawnText;
    position: [float, float];
    startSec: float;
    endSec: float;
    onEnter?: Function;
    onExit?: Function;
}

class Drawable {
    text: string;
    colour: [int, int, int, int];
    scale: [float, float];
    font: int;

    constructor(text: string, options: DrawOptions = undefined) {
        this.text = text ? `${text}: ` : "";
        this.font = options?.font ?? DEFAULT_FONT;

        if (options?.colour && options.colour.length === 4) {
            this.colour = options.colour;
            this.colour.forEach((c) => (c = clamp(0, c, 255)));
        } else {
            this.colour = DEFAULT_COLOUR;
        }
    }

    applySettings() {
        Text.UseCommands(true);
        Text.SetFont(this.font);
        Text.SetColor(...this.colour);
        Text.SetRightJustify(true);
        Text.SetScale(...DEFAULT_SCALE);
    }
}

export class DrawnText {
    text: string;
    colour?: [int, int, int, int];
    font?: int;
    scale?: [float, float];
    scaleMultiplier?: float;
    alignment: "left" | "centre" | "right";
    wrapX: float;

    constructor(text: string, options: ExtendedDrawOptions = undefined) {
        this.text = text;
        this.wrapX = options?.wrapX ?? undefined;
        this.font = options?.font ?? DEFAULT_FONT;
        this.alignment = options?.alignment ?? "left";
        this.scaleMultiplier = options?.scaleMultiplier ?? 1;

        // Colour
        if (options?.colour && options.colour.length === 4) {
            this.colour = options.colour;
            this.colour.forEach((c) => (c = clamp(0, c, 255)));
        } else {
            this.colour = DEFAULT_COLOUR;
        }

        // Scale
        if (options?.scale && options.scale.length === 2) {
            this.scale[0] = options.scale[0] * this.scaleMultiplier;
            this.scale[1] = options.scale[1] * this.scaleMultiplier;
        } else {
            this.scale = [
                DEFAULT_SCALE[0] * this.scaleMultiplier,
                DEFAULT_SCALE[1] * this.scaleMultiplier,
            ];
        }
    }

    draw(x: float, y: float) {
        Text.UseCommands(true);
        Text.SetFont(this.font);
        Text.SetColor(...this.colour);
        Text.SetScale(...this.scale);
        Text.SetWrapX(this.wrapX ?? getScreenSize().x);

        switch (this.alignment) {
            case "centre":
                Text.SetCenter(true);
                break;
            case "right":
                Text.SetRightJustify(true);
                break;
            default:
                break;
        }

        Text.DisplayString(x, y, this.text);
        Text.UseCommands(false);
    }
}

export class TextQueue {
    private items: QueuedText[];
    private timer: float;
    private end: float;

    constructor(texts: QueuedText[]) {
        this.items = texts;
        this.end = Math.max(0, ...texts.map((t) => t.endSec));
        this.restart();
    }

    restart() {
        this.timer = 0;
        this.items.forEach((i) => {
            if (i.onEnter) i["onEnterCalled"] = false;
            if (i.onExit) i["onExitCalled"] = false;
        });
    }

    process(): boolean {
        if (this.timer >= this.end) return false;

        let deltaSec: float = getTimeStep() / 50;
        this.timer += deltaSec;

        this.items.forEach((i) => {
            // Continue if the text is empty
            if (!i.text) return;

            // Draw thet text
            if (this.timer >= i.startSec && this.timer < i.endSec) {
                i.text.draw(...i.position);
            }

            // Call onEnter
            if (i.onEnter && !i["onEnterCalled"] && this.timer >= i.startSec) {
                i.onEnter();
                i["onEnterCalled"] = true;
            }

            // Call onExit
            if (i.onExit && !i["onExitCalled"] && this.timer >= i.endSec) {
                i.onExit();
                i["onExitCalled"] = true;
            }
        });

        return true;
    }
}

export class Counter extends Drawable {
    constructor(text: string, options: DrawOptions = undefined) {
        super(text, options);
    }

    draw(row: int, value: number | string) {
        this.applySettings();
        Text.DisplayString(
            START_X,
            START_Y + row * ROW_GAP,
            `${this.text}${value}`,
        );
        Text.UseCommands(false);
    }
}

export class Percent extends Drawable {
    private range: number;
    private min: number;
    private max: number;

    constructor(
        text: string,
        min: number,
        max: number,
        options: DrawOptions = undefined,
    ) {
        super(text, options);
        this.range = max - min;
        this.min = min;
        this.max = max;
    }

    /**
     * @returns Calculated percent: [0-100]
     */
    draw(row: int, value: number): int {
        let percent: int = clamp(
            0,
            Math.round((value / this.range) * 100),
            100,
        );

        this.applySettings();
        Text.DisplayString(
            START_X,
            START_Y + row * ROW_GAP,
            `${this.text}${percent}%`,
        );
        Text.UseCommands(false);
        return percent;
    }
}

export class Timer extends Drawable {
    private oneSecCounter: float = 0; // Shows if at least 1 second has passed

    direction: TimerDirection;
    tickSound: ScriptSound;
    totalSec: float;
    min: int;
    sec: int;

    constructor(
        text: string,
        direction: TimerDirection,
        minutes: int,
        seconds: int,
        tickSound: ScriptSound = undefined,
        options: DrawOptions = undefined,
    ) {
        super(text, options);
        this.direction = direction;
        this.totalSec = Math.floor(minutes * 60 + seconds);
        this.min = Math.floor(this.totalSec / 60);
        this.sec = Math.floor(this.totalSec - this.min * 60);
        this.tickSound = tickSound;
    }

    update() {
        // Read time step from memory and turn it into seconds
        let deltaSec: float = getTimeStep() / 50;
        if (this.oneSecCounter < 1) this.oneSecCounter += deltaSec;

        // Add or subtract seconds since the last frame
        if (this.direction === TimerDirection.Up) {
            this.totalSec += deltaSec;
        } else if (this.totalSec > 0) {
            this.totalSec -= deltaSec;
            if (this.totalSec < 0) this.totalSec = 0;
        }

        // Calculate minutes and seconds from total seconds
        this.min = Math.floor(this.totalSec / 60);
        this.sec = Math.floor(this.totalSec - this.min * 60);
    }

    draw(row: int) {
        // Prepare displayed values with leading zeros
        let displayedMin: string =
            this.min > 9 ? `${this.min}` : `0${this.min}`;
        let displayedSec: string =
            this.sec > 9 ? `${this.sec}` : `0${this.sec}`;

        // Play tick sound if 10 seconds or less are left
        if (
            this.direction === TimerDirection.Down &&
            this.tickSound &&
            this.sec < 11 &&
            this.sec > 0 &&
            this.oneSecCounter >= 1
        ) {
            this.oneSecCounter = 0;
            let { x, y, z } = PLAYER.getCoordinates();
            Sound.AddOneOffSound(x, y, z, this.tickSound);
        }

        // Draw the timer
        this.applySettings();
        Text.DisplayString(
            START_X,
            START_Y + row * ROW_GAP,
            `${this.text}${displayedMin}:${displayedSec}`,
        );
        Text.UseCommands(false);
    }
}
