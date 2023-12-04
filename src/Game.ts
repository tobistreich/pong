import {Ball} from './Ball';
import {Player} from './Player';
import {Heading} from './Heading';

export class Game {
    private gameCanvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private scorePlayer1: number = 0;
    private scorePlayer2: number = 0;
    private gameStarted: boolean = false;
    private player1: Player = new Player();
    private player2: Player = new Player();
    private ball: Ball;
    private heading: Heading;
    private scoreElement: Heading;
    private message: string = this.scorePlayer1.toString() + ' : ' + this.scorePlayer2.toString();

    constructor(gameCanvas: HTMLCanvasElement) {
        this.gameCanvas = gameCanvas;
        this.ctx = this.gameCanvas.getContext('2d') as CanvasRenderingContext2D;
        let x = gameCanvas.width / 2;
        let y = gameCanvas.height / 2;
        this.heading = new Heading(this.message);
        let scoreElement: HTMLHeadingElement | null = null;
        this.ball = new Ball(x, y);
        let interval = setInterval(this.gameLoop, 1000 / 60);
    }
    
    

    private gameLoop() {
        this.ball.moveBall(this.gameCanvas.height);
        let position = this.ball.getPosition();
        position.x;
    }

    public checkPaddleHit() {
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
    if (this.ball.x <= 0 + 10 + this.player1.width / 2) {
        this.scorePlayer2 += 1;
        this.ball.resetBall(this.gameCanvas.height, this.gameCanvas.width);
    }
    // Update Score if Player 2 misses
    if (this.ball.x >= this.gameCanvas.width - 10 - this.player2.width / 2) {
        this.scorePlayer1 += 1;
        this.ball.resetBall(this.gameCanvas.height, this.gameCanvas.width);
    }

    // public updateScore() {
    //     if (!this.scoreElement) {
    //         this.scoreElement = this.heading.createHeading('')
    //     }

    // }

    // function updateScore() {
    //     if (gameStarted) {
    //         if (!scoreElement) {
    //             scoreElement = createHeading('');
    //             document.body.appendChild(scoreElement);
    //         }
    //         scoreElement.textContent = scorePlayer1 + ' : ' + scorePlayer2;
    //     }
    // }
    }
}
