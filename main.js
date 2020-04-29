import { Grid } from './grid.js';
import { Movement } from './shapes/utils/movement.js';
import { generateNewShape, getRandomInt } from './shapes/utils/shape-generator.js';

const rows = 20;
const columns = 10;

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
            console.log('left');
            canMoveLeft();
            break;
        case 'ArrowRight':
            console.log('right');
            canMoveRight();
            break;
        case 'Enter':
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
        movement.rotateTest();
    }
}

function animate() {
    if (!movement.canMove) {
        clearInterval(id);
        shape = generateNewShape(grid.cells);
        movement = new Movement(shape, grid.cells);
        // movement.canMove = true;
        id = setInterval(animate, animateInterval);
    } else {
        movement.down();
    }
}


