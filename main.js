import { Grid } from './grid.js';
import { Movement } from './shapes/utils/movement.js';
import { generateNewShape, getRandomInt } from './shapes/utils/shape-generator.js';

const rows = 20;
const columns = 10;
let score = 0;
$("#score").html(score);

const grid = new Grid(rows, columns);
grid.create();
grid.draw();

let shape = generateNewShape(grid.cells);
let movement = new Movement(shape, grid.cells);
const animateInterval = 600;//intervalul in milisec
var id = setInterval(animate, animateInterval);

document.addEventListener("keydown", event => {
    switch (event.key) {
        case 'ArrowUp':
            canRotate();
            break;
        case 'ArrowDown':
            movement.down();
            break;
        case 'ArrowLeft':
            canMoveLeft();
            break;
        case 'ArrowRight':
            canMoveRight();
            break;
        case 'Enter':
            // completeLine();
            const colors = ['blue', 'green', 'red'];
            console.log(getRandomInt(colors.length - 1));
            shape.color = colors[getRandomInt(colors.length - 1)];
            shape.draw();

            break;
    }
});

const canMoveRight = () => {
    if (movement.canMove) {
        movement.right();
    }
}

const canMoveLeft = () => {
    if (movement.canMove) {
        movement.left();
    }
}

const canRotate = () => {
    if (movement.canMove) {
        movement.rotate();
    }
}

function animate() {
    if (!movement.canMove) {
        completeLine();
        clearInterval(id);
        shape = generateNewShape(grid.cells);
        movement = new Movement(shape, grid.cells);
        id = setInterval(animate, animateInterval);
    } else {
        movement.down();
    }
}

function completeLine() {
    let count = 0;
    let row, column;
    for (row = grid.cells.length - 1; row > 0; row--) {
        for (column = grid.cells[row].length - 1; column > 0; column--) {
            //console.log(grid.cells[row][column]);
            if (grid.cells[row][column].isEmpty == false) {
                count++;
            }
        }
        if (count == 9) {
            clearLine(row);
            score += 10;
            $("#score").html(score);
            count = 0;
        }
        count = 0;
    }

}

function clearLine(clearRow) {
    console.log("clear line");
    for (let column = 0; column < 10; column++) {
        grid.cells[clearRow][column].draw('#7facf5');
        grid.cells[clearRow][column].isEmpty = true;
    }
}


