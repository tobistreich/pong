import * as _ from 'lodash';

import {Ball} from './Ball';
import {Game} from './Game';
import {Player} from './Player';

const canvas = document.getElementById('pongCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

let scorePlayer1 = 0;
let scorePlayer2 = 0;
let gameStarted = false;

let player1: Player = new Player();
let player2: Player = new Player();

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
    // ball.moveBall(gameStarted, Ball);
    checkPaddleHit();
    // updateScore();
}

// main program
createStartGameHeading();
gameLoop();
setInterval(gameLoop, 1000 / 60);

window.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !gameStarted) {
        removeStartGameHeading();
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

function createStartGameHeading() {
    const headingText = 'press space to play!<br><br>controls: w + s / ↑ + ↓';
    const heading = createHeading(headingText);
    document.body.appendChild(heading);

    // Blink every 0.5 seconds
    setInterval(() => {
        heading.style.visibility =
            heading.style.visibility === 'hidden' ? 'visible' : 'hidden';
    }, 500);
}

function createHeading(text: string) {
    const heading = document.createElement('h2');
    heading.innerHTML = text;
    heading.style.position = 'absolute';
    heading.style.top = '6rem';
    heading.style.color = '#FFF';
    heading.style.fontFamily = 'Monospace';
    heading.style.textAlign = 'center';
    return heading;
}

function removeStartGameHeading() {
    const heading = document.querySelector('h2');
    if (heading) {
        const parent = heading.parentNode;
        if (parent) {
            parent.removeChild(heading);
        }
    }
}

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

function checkPaddleHit() {
    // Check if this.player1 hits ball
    if (
        this.ball.x <= this.player1.x + this.player1.width &&
        this.ball.y >= this.player1.y &&
        this.ball.y <= this.player1.y + this.player1.height
    ) {
        this.ball.xSpeed *= -1.3;
        this.ball.ySpeed *= 1.3;
    }
    // Check if this.player2 hits this.ball
    else if (
        this.ball.x + this.ball.width + 10 >= this.player2.x &&
        this.ball.y >= this.player2.y &&
        this.ball.y <= this.player2.y + this.player2.height
    ) {
        this.ball.xSpeed *= -1;
        this.ball.ySpeed *= 1;
    }
    // Update Score if this.player 1 misses
    // bugfix: width of hitbox by mats-pichler
    if (this.ball.x <= 0 + 10 + this.player1.width / 2) {
        scorePlayer2 += 1;
        // ball.resetBall(gameStarted);
    }
    // Update Score if Player 2 misses
    // bugfix: width of hitbox by mats-pichler
    if (this.ball.x >= canvas.width - 10 - this.player2.width / 2) {
        scorePlayer1 += 1;
        // ball.resetBall(gameStarted);
    }
}

// function updateScore() {
//     if (gameStarted) {
//         if (!scoreElement) {
//             scoreElement = createHeading('');
//             document.body.appendChild(scoreElement);
//         }
//         scoreElement.textContent = scorePlayer1 + ' : ' + scorePlayer2;
//     }
// }
let gameCanvas = createCanvas();
document.body.appendChild(gameCanvas);
let game = new Game(gameCanvas);
