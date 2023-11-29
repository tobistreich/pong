"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ball = void 0;
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
    Ball.prototype.moveBall = function (gameStarted, ball) {
        if (gameStarted) {
            // if ball hits bottom edge change y direction
            if (ball.y >= this.canvas.height - ball.height || ball.y <= 0) {
                ball.ySpeed *= -1;
            }
            ball.y += ball.ySpeed;
            ball.x += ball.xSpeed;
        }
    };
    Ball.prototype.resetBall = function (ball) {
        ball.x = this.canvas.width / 2;
        ball.y = this.canvas.height / 2;
        ball.xSpeed = 2.5;
        ball.ySpeed = 2.5;
    };
    return Ball;
}());
exports.Ball = Ball;
