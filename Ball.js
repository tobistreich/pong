var Ball = /** @class */ (function () {
    function Ball() {
        this.canvas = document.getElementById('pongCanvas');
        this.ctx = this.canvas.getContext('2d');
    }
    Ball.prototype.createBall = function () {
        return {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            width: 20,
            height: 20,
            color: '#FFF',
            xSpeed: 1.25,
            ySpeed: 1.25,
        };
    };
    return Ball;
}());
