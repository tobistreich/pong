var canvas = document.getElementById('pongCanvas');
var ctx = canvas.getContext('2d');
var gameStarted = false;
var scorePlayer1 = 0;
var scorePlayer2 = 0;
var player1 = createPlayer(10);
var player2 = createPlayer(canvas.width - 10);
var ball = createBall();
var scoreElement = null;
function createPlayer(x) {
    return {
        x: x,
        y: canvas.height / 2 - 60,
        width: 20,
        height: 120,
        color: '#FFF',
        speed: 5,
    };
}
function createBall() {
    return {
        x: canvas.width / 2,
        y: canvas.height / 2,
        width: 20,
        height: 20,
        color: '#FFF',
        xSpeed: 1.25,
        ySpeed: 1.25,
    };
}
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
        heading.remove();
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
    drawRectangle(player1.x, player1.y, player1.width, player1.height, player1.color);
    drawRectangle(player2.x - player2.width, player2.y, player2.width, player2.height, player2.color);
    // draw Ball
    drawRectangle(ball.x, ball.y, ball.width, ball.height, ball.color);
}
function handleKeyDown(event) {
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
function handleKeyUp(event) {
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
function moveBall() {
    if (gameStarted) {
        // if ball hits bottom edge change y direction
        if (ball.y >= canvas.height - ball.height || ball.y <= 0) {
            ball.ySpeed *= -1;
        }
        ball.y += ball.ySpeed;
        ball.x += ball.xSpeed;
    }
}
function checkPaddleHit() {
    // Check if player1 hits ball
    if (ball.x <= player1.x + player1.width &&
        ball.y >= player1.y &&
        ball.y <= player1.y + player1.height) {
        ball.xSpeed *= -1.3;
        ball.ySpeed *= 1.3;
    }
    // Check if player2 hits ball
    else if (ball.x + ball.width + 10 >= player2.x &&
        ball.y >= player2.y &&
        ball.y <= player2.y + player2.height) {
        ball.xSpeed *= -1;
        ball.ySpeed *= 1;
    }
    // Update Score if Player 1 misses
    // bugfix: width of hitbox by mats-pichler
    if (ball.x <= 0 + 10 + player1.width / 2) {
        scorePlayer2 += 1;
        resetBall();
    }
    // Update Score if Player 2 misses
    // bugfix: width of hitbox by mats-pichler
    if (ball.x >= canvas.width - 10 - player2.width / 2) {
        scorePlayer1 += 1;
        resetBall();
    }
}
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.xSpeed = 2.5;
    ball.ySpeed = 2.5;
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
    moveBall();
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
window.addEventListener('keydown', function (event) {
    if (event.code === 'Space' && !gameStarted) {
        gameStarted = true;
        removeStartGameHeading();
        f();
    }
});
