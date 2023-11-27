"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var Player = /** @class */ (function () {
    function Player() {
        this.canvas = document.getElementById('pongCanvas');
        this.ctx = this.canvas.getContext('2d');
    }
    Player.prototype.createPlayer = function (x) {
        return {
            x: x,
            y: this.canvas.height / 2 - 60,
            width: 20,
            height: 120,
            color: '#FFF',
            speed: 5,
        };
    };
    return Player;
}());
exports.Player = Player;
