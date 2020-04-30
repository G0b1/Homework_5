import { Validator } from "./validator.js";

export class Movement {
    constructor(shape, cells) {
        this.shape = shape;
        this.cells = cells;
        this.validator = new Validator(this.shape, this.cells);
        this.canMove = true;
    }

    rotate() {
        const row = this.shape.row;
        const column = this.shape.column;
        this.shape.clear();
        const nextTemplate = this.shape.getNextTemplate();
        const nextNotAvailable = this.validator.rotateCheck(nextTemplate, row, column);

        if (!nextNotAvailable) {
            this.shape.rotateTemplate();
            this.shape.draw();
        }
        if (nextNotAvailable) {
            this.shape.draw();
        }
    }

    down() {
        const row = this.shape.row;
        const column = this.shape.column;
        this.shape.clear();
        const nextNotAvailable = this.validator.checkNext(row + 1, column);
        if (nextNotAvailable) {
            console.log("can move down not available");
            this.shape.draw();
            this.canMove = false;
            return;
        }

        this.shape.row++;
        this.shape.draw();
    }

    left() {
        const row = this.shape.row;
        const column = this.shape.column;
        this.shape.clear();
        const nextNotAvailable = this.validator.checkNext(row, column - 1);

        if (!nextNotAvailable) {
            this.shape.column--;
            this.shape.draw();
        }
        if (nextNotAvailable) {
            this.shape.draw();
        }
    }

    right() {
        const row = this.shape.row;
        const column = this.shape.column;
        this.shape.clear();
        const nextNotAvailable = this.validator.checkNext(row, column + 1);

        if (!nextNotAvailable) {
            this.shape.column++;
            this.shape.draw();
        }
        if (nextNotAvailable) {
            this.shape.draw();
        }
    }
}