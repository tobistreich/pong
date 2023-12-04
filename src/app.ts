import * as _ from 'lodash';

import {Ball} from './Ball';
import {Game} from './Game';
import {Player} from './Player';
import {Heading} from './Heading';

const canvas = document.getElementById('pongCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

let scorePlayer1 = 0;
let scorePlayer2 = 0;
let gameStarted = false;
let message = 'press space to play!<br><br>controls: w + s / ↑ + ↓';

let player1: Player = new Player();
let player2: Player = new Player();
let ball: Ball;
let heading = new Heading(message);

player1.createPlayer(10);
player2.createPlayer(canvas.width - 10);

let scoreElement: HTMLHeadingElement | null = null;

function createCanvas() {
    const element = document.createElement('canvas');
    element.id = 'gameCanvas';
    return element;
}

function gameLoop() {
    draw();
    ball.moveBall(gameCanvas.height)
    game.checkPaddleHit();
    // game.updateScore();
}

// main program
heading.createStartGameHeading(message);
gameLoop();
setInterval(gameLoop, 1000 / 60);

window.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !gameStarted) {
        heading.removeStartGameHeading();
        gameStarted = true;
    }

    if (gameStarted) {
        switch (event.key) {
            case 'w':
                if (player1.y > 0) {
                    player1.y -= player1.speed;
                }
                break;
            case 's':
                if (player1.y < canvas.height - player1.height) {
                    player1.y += player1.speed;
                }
                break;
            case 'ArrowUp':
                if (player2.y > 0) {
                    player2.y -= player2.speed;
                }
                break;
            case 'ArrowDown':
                if (player2.y < canvas.height - player2.height) {
                    player2.y += player2.speed;
                }
                break;
            default:
                break;
        }
    }
});


function drawRectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function draw() {
    // draw Playfield
    drawRectangle(0, 0, canvas.width, canvas.height, '#000');

    // draw Players
    drawRectangle(
        this.player1.x,
        this.player1.y,
        this.player1.width,
        this.player1.height,
        this.player1.color,
    );
    drawRectangle(
        this.player2.x - this.player2.width,
        this.player2.y,
        this.player2.width,
        this.player2.height,
        this.player2.color,
    );

    // draw Ball
    drawRectangle(
        this.ball.x,
        this.ball.y,
        this.ball.width,
        this.ball.height,
        this.ball.color,
    );
}
let gameCanvas = createCanvas();
document.body.appendChild(gameCanvas);
let game = new Game(gameCanvas);
