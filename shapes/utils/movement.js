import { Validator } from "./validator.js";

export class Movement {
    constructor(shape, cells) {
        this.shape = shape;
        this.cells = cells;
        this.validator = new Validator(this.shape, this.cells);
        this.canMove = true;
    }

    rotateTest() {
        const row = this.shape.row;
        const column = this.shape.column;
        this.shape.clear();
        const nextTemplate = this.shape.getNextTemplate();
        console.log(nextTemplate);

        const nextNotAvailableRight = this.validator.rotateCheck(nextTemplate, row, column + 1);
        const nextNotAvailableLeft = this.validator.rotateCheck(nextTemplate, row, column - 1);
        const nextNotAvailableDown = this.validator.rotateCheck(nextTemplate, row + 1, column);

        console.log(nextNotAvailableRight);
        console.log(nextNotAvailableLeft);
        console.log(nextNotAvailableDown);

        if (!nextNotAvailableLeft && !nextNotAvailableRight && !nextNotAvailableDown) {
            this.shape.rotate();
            this.shape.draw();
        }
        if (nextNotAvailableLeft && nextNotAvailableRight && nextNotAvailableDown) {
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