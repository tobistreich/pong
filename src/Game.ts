import {Ball} from './Ball';
import {Player} from './Player';

export class Game {
    private gameCanvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private scorePlayer1: Number = 0;
    private scorePlayer2: Number = 0;
    private gameStarted: boolean = false;
    private player1: Player = new Player();
    private player2: Player = new Player();
    private ball: Ball;

    constructor(gameCanvas: HTMLCanvasElement) {
        this.gameCanvas = gameCanvas;
        this.ctx = this.gameCanvas.getContext('2d') as CanvasRenderingContext2D;
        let x = gameCanvas.width / 2;
        let y = gameCanvas.height / 2;
        this.ball = new Ball(x, y);
        let interval = setInterval(this.gameLoop, 1000 / 60);
    }

    private gameLoop() {
        this.ball.moveBall(this.gameCanvas.height);
        let position = this.ball.getPosition();
        position.x;
    }
}
