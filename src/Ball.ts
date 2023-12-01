export class Ball {
    private x: number;
    private y: number;
    private width: number = 20;
    private height: number = 20;
    private color: String = '#FFF';
    private xSpeed: number = 1.25;
    private ySpeed: number = 1.25;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public moveBall(gameCanvasHeight: number) {
        // if ball hits bottom edge change y-direction
        if (this.y >= gameCanvasHeight - this.height || this.y <= 0) {
            this.ySpeed *= -1;
        }
        this.y += this.ySpeed;
        this.x += this.xSpeed;
    }

    public getPosition() {
        let x = this.x;
        let y = this.y;
        return {
            x,
            y,
        };
    }

    //     public resetBall(ball) {
    //         ball.x = this.canvas.width / 2;
    //         ball.y = this.canvas.height / 2;
    //         ball.xSpeed = 2.5;
    //         ball.ySpeed = 2.5;
    //     }
}
