export class Ball {
    public x: number;
    public y: number;
    public width: number = 20;
    public height: number = 20;
    public color: String = '#FFF';
    public xSpeed: number = 1.25;
    public ySpeed: number = 1.25;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    public createStartGameHeading() {
        
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

    public resetBall(gameCanvasHeight: number, gameCanvasWidth: number) {
        let x = gameCanvasWidth / 2;
        let y = gameCanvasHeight / 2;
        let xSpeed = 1.25;
        let ySpeed = 1.25;
        return {
            x, y, xSpeed, ySpeed
        };


    }
}
