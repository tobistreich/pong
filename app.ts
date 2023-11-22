const canvas = document.getElementById('pongCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

let gameStarted = false;
let scorePlayer1 = 0;
let scorePlayer2 = 0;

const player1 = createPlayer(10);
const player2 = createPlayer(canvas.width - 10);
const ball = createBall();

let scoreElement: HTMLHeadingElement | null = null;

function createPlayer(x: number) {
    return {
        x,
        y: canvas.height / 2 - 60,
        width: 20,
        height: 120,
        color: '#FFF',
        speed: 15,
    };
}

function createBall() {
    return {
        x: canvas.width / 2,
        y: canvas.height / 2,
        width: 20,
        height: 20,
        color: '#FFF',
        xSpeed: 2.5,
        ySpeed: 2.5,
    };
}

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
        player1.x,
        player1.y,
        player1.width,
        player1.height,
        player1.color,
    );
    drawRectangle(
        player2.x - player2.width,
        player2.y,
        player2.width,
        player2.height,
        player2.color,
    );

    // draw Ball
    drawRectangle(ball.x, ball.y, ball.width, ball.height, ball.color);
}

function movePlayers() {
    if (gameStarted) {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
    }
}

function handleKeyDown(event: KeyboardEvent) {
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

function handleKeyUp(event: KeyboardEvent) {
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
    if (
        ball.x <= player1.x + player1.width &&
        ball.y >= player1.y &&
        ball.y <= player1.y + player1.height
    ) {
        ball.xSpeed *= -1.3;
        ball.ySpeed *= 1.3;
    }
    // Check if player2 hits ball
    else if (
        ball.x + ball.width + 10 >= player2.x &&
        ball.y >= player2.y &&
        ball.y <= player2.y + player2.height
    ) {
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
    movePlayers();
    moveBall();
    checkPaddleHit();
    updateScore();
}

// main program
createStartGameHeading();
window.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !gameStarted) {
        gameStarted = true;
        removeStartGameHeading();
    }
});
setInterval(gameLoop, 1000 / 60);
