import { Ball } from './Ball';
import { Player } from './Player';

const canvas = document.getElementById('pongCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

let gameStarted = false;
let scorePlayer1 = 0;
let scorePlayer2 = 0;

let player1: Player = new Player();
let player2: Player = new Player();
let ball: Ball = new Ball();

player1.createPlayer(10);
player2.createPlayer(canvas.width - 10);
ball.createBall();
console.log(ball);

let scoreElement: HTMLHeadingElement | null = null;

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
        heading.remove();
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

function handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
        case 'w':
            if (this.player1.y > 0) {
                this.player1.y -= this.player1.speed;
            }
            break;
        case 's':
            if (this.player1.y < canvas.height - this.player1.height) {
                this.player1.y += this.player1.speed;
            }
            break;
        case 'ArrowUp':
            if (this.player2.y > 0) {
                this.player2.y -= this.player2.speed;
            }
            break;
        case 'ArrowDown':
            if (this.player2.y < canvas.height - this.player2.height) {
                this.player2.y += this.player2.speed;
            }
            break;
        default:
            break;
    }
}

function handleKeyUp(event: KeyboardEvent) {
    switch (event.key) {
        case 'w':
            if (this.player1.y > 0) {
                this.player1.y -= this.player1.speed;
            }
            break;
        case 's':
            if (this.player1.y < canvas.height - this.player1.height) {
                this.player1.y += this.player1.speed;
            }
            break;
        case 'ArrowUp':
            if (this.player2.y > 0) {
                this.player2.y -= this.player2.speed;
            }
            break;
        case 'ArrowDown':
            if (this.player2.y < canvas.height - this.player2.height) {
                this.player2.y += this.player2.speed;
            }
            break;
        default:
            break;
    }
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

function updateScore() {
    if (gameStarted) {
        if (!scoreElement) {
            scoreElement = createHeading('');
            document.body.appendChild(scoreElement);
        }
        scoreElement.textContent = scorePlayer1 + ' : ' + scorePlayer2;
    }
}

function gameLoop() {
    draw();
    // ball.moveBall(gameStarted, Ball);
    checkPaddleHit();
    updateScore();
}

// main program
createStartGameHeading();
gameLoop();

function f() {
    setInterval(gameLoop, 1000 / 120);
    window.addEventListener('keydown', handleKeyDown);
}

window.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !gameStarted) {
        gameStarted = true;
        removeStartGameHeading();
        f();
    }
});
