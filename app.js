"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ball_1 = require("./Ball");
var Player_1 = require("./Player");
var canvas = document.getElementById('pongCanvas');
var ctx = canvas.getContext('2d');
var scorePlayer1 = 0;
var scorePlayer2 = 0;
var gameStarted = false;
var player1 = new Player_1.Player();
var player2 = new Player_1.Player();
var ball = new Ball_1.Ball();
player1.createPlayer(10);
player2.createPlayer(canvas.width - 10);
ball.createBall();
console.log(ball);
var scoreElement = null;
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
window.addEventListener('keydown', function (event) {
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
    var headingText = 'press space to play!<br><br>controls: w + s / ↑ + ↓';
    var heading = createHeading(headingText);
    document.body.appendChild(heading);
    // Blink every 0.5 seconds
    setInterval(function () {
        heading.style.visibility =
            heading.style.visibility === 'hidden' ? 'visible' : 'hidden';
    }, 500);
}
function createHeading(text) {
    var heading = document.createElement('h2');
    heading.innerHTML = text;
    heading.style.position = 'absolute';
    heading.style.top = '6rem';
    heading.style.color = '#FFF';
    heading.style.fontFamily = 'Monospace';
    heading.style.textAlign = 'center';
    return heading;
}
function removeStartGameHeading() {
    var heading = document.querySelector('h2');
    if (heading) {
        var parent_1 = heading.parentNode;
        if (parent_1) {
            parent_1.removeChild(heading);
        }
    }
}
function drawRectangle(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}
function draw() {
    // draw Playfield
    drawRectangle(0, 0, canvas.width, canvas.height, '#000');
    // draw Players
    drawRectangle(this.player1.x, this.player1.y, this.player1.width, this.player1.height, this.player1.color);
    drawRectangle(this.player2.x - this.player2.width, this.player2.y, this.player2.width, this.player2.height, this.player2.color);
    // draw Ball
    drawRectangle(this.ball.x, this.ball.y, this.ball.width, this.ball.height, this.ball.color);
}
function checkPaddleHit() {
    // Check if this.player1 hits ball
    if (this.ball.x <= this.player1.x + this.player1.width &&
        this.ball.y >= this.player1.y &&
        this.ball.y <= this.player1.y + this.player1.height) {
        this.ball.xSpeed *= -1.3;
        this.ball.ySpeed *= 1.3;
    }
    // Check if this.player2 hits this.ball
    else if (this.ball.x + this.ball.width + 10 >= this.player2.x &&
        this.ball.y >= this.player2.y &&
        this.ball.y <= this.player2.y + this.player2.height) {
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
