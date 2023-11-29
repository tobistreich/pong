export class Ball {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor() {
        this.canvas = document.getElementById(
            'pongCanvas',
        ) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    }
    
    public createBall() {
        return {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            width: 20,
            height: 20,
            color: '#FFF',
            xSpeed: 1.25,
            ySpeed: 1.25,
        };
    }

    public moveBall(gameStarted: boolean, ball) {
        if (gameStarted) {
            // if ball hits bottom edge change y direction
            if (ball.y >= this.canvas.height - ball.height || ball.y <= 0) {
                ball.ySpeed *= -1;
            }
            ball.y += ball.ySpeed;
            ball.x += ball.xSpeed;
        }
    }

    public resetBall(ball) {
        ball.x = this.canvas.width / 2;
        ball.y = this.canvas.height / 2;
        ball.xSpeed = 2.5;
        ball.ySpeed = 2.5;
    }
}
