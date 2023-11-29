/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Ball.js":
/*!*****************!*\
  !*** ./Ball.js ***!
  \*****************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Ball = void 0;\nvar Ball = /** @class */ (function () {\n    function Ball() {\n        this.canvas = document.getElementById('pongCanvas');\n        this.ctx = this.canvas.getContext('2d');\n    }\n    Ball.prototype.createBall = function () {\n        return {\n            x: this.canvas.width / 2,\n            y: this.canvas.height / 2,\n            width: 20,\n            height: 20,\n            color: '#FFF',\n            xSpeed: 1.25,\n            ySpeed: 1.25,\n        };\n    };\n    return Ball;\n}());\nexports.Ball = Ball;\n\n\n//# sourceURL=webpack:///./Ball.js?");

/***/ }),

/***/ "./Player.js":
/*!*******************!*\
  !*** ./Player.js ***!
  \*******************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Player = void 0;\nvar Player = /** @class */ (function () {\n    function Player() {\n        this.canvas = document.getElementById('pongCanvas');\n        this.ctx = this.canvas.getContext('2d');\n    }\n    Player.prototype.createPlayer = function (x) {\n        return {\n            x: x,\n            y: this.canvas.height / 2 - 60,\n            width: 20,\n            height: 120,\n            color: '#FFF',\n            speed: 5,\n        };\n    };\n    return Player;\n}());\nexports.Player = Player;\n\n\n//# sourceURL=webpack:///./Player.js?");

/***/ }),

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar Ball_1 = __webpack_require__(/*! ./Ball */ \"./Ball.js\");\nvar Player_1 = __webpack_require__(/*! ./Player */ \"./Player.js\");\nvar canvas = document.getElementById('pongCanvas');\nvar ctx = canvas.getContext('2d');\nvar gameStarted = false;\nvar scorePlayer1 = 0;\nvar scorePlayer2 = 0;\nvar player1 = new Player_1.Player();\nvar player2 = new Player_1.Player();\nvar ball = new Ball_1.Ball();\nplayer1.createPlayer(10);\nplayer2.createPlayer(canvas.width - 10);\nball.createBall();\nconsole.log(ball);\nvar scoreElement = null;\nfunction createStartGameHeading() {\n    var headingText = 'press space to play!<br><br>controls: w + s / ↑ + ↓';\n    var heading = createHeading(headingText);\n    document.body.appendChild(heading);\n    // Blink every 0.5 seconds\n    setInterval(function () {\n        heading.style.visibility =\n            heading.style.visibility === 'hidden' ? 'visible' : 'hidden';\n    }, 500);\n}\nfunction createHeading(text) {\n    var heading = document.createElement('h2');\n    heading.innerHTML = text;\n    heading.style.position = 'absolute';\n    heading.style.top = '6rem';\n    heading.style.color = '#FFF';\n    heading.style.fontFamily = 'Monospace';\n    heading.style.textAlign = 'center';\n    return heading;\n}\nfunction removeStartGameHeading() {\n    var heading = document.querySelector('h2');\n    if (heading) {\n        heading.remove();\n    }\n}\nfunction drawRectangle(x, y, width, height, color) {\n    ctx.fillStyle = color;\n    ctx.fillRect(x, y, width, height);\n}\nfunction draw() {\n    // draw Playfield\n    drawRectangle(0, 0, canvas.width, canvas.height, '#000');\n    // draw Players\n    drawRectangle(this.player1.x, this.player1.y, this.player1.width, this.player1.height, this.player1.color);\n    drawRectangle(this.player2.x - this.player2.width, this.player2.y, this.player2.width, this.player2.height, this.player2.color);\n    // draw Ball\n    drawRectangle(this.ball.x, this.ball.y, this.ball.width, this.ball.height, this.ball.color);\n}\nfunction handleKeyDown(event) {\n    switch (event.key) {\n        case 'w':\n            if (this.player1.y > 0) {\n                this.player1.y -= this.player1.speed;\n            }\n            break;\n        case 's':\n            if (this.player1.y < canvas.height - this.player1.height) {\n                this.player1.y += this.player1.speed;\n            }\n            break;\n        case 'ArrowUp':\n            if (this.player2.y > 0) {\n                this.player2.y -= this.player2.speed;\n            }\n            break;\n        case 'ArrowDown':\n            if (this.player2.y < canvas.height - this.player2.height) {\n                this.player2.y += this.player2.speed;\n            }\n            break;\n        default:\n            break;\n    }\n}\nfunction handleKeyUp(event) {\n    switch (event.key) {\n        case 'w':\n            if (this.player1.y > 0) {\n                this.player1.y -= this.player1.speed;\n            }\n            break;\n        case 's':\n            if (this.player1.y < canvas.height - this.player1.height) {\n                this.player1.y += this.player1.speed;\n            }\n            break;\n        case 'ArrowUp':\n            if (this.player2.y > 0) {\n                this.player2.y -= this.player2.speed;\n            }\n            break;\n        case 'ArrowDown':\n            if (this.player2.y < canvas.height - this.player2.height) {\n                this.player2.y += this.player2.speed;\n            }\n            break;\n        default:\n            break;\n    }\n}\nfunction checkPaddleHit() {\n    // Check if this.player1 hits ball\n    if (this.ball.x <= this.player1.x + this.player1.width &&\n        this.ball.y >= this.player1.y &&\n        this.ball.y <= this.player1.y + this.player1.height) {\n        this.ball.xSpeed *= -1.3;\n        this.ball.ySpeed *= 1.3;\n    }\n    // Check if this.player2 hits this.ball\n    else if (this.ball.x + this.ball.width + 10 >= this.player2.x &&\n        this.ball.y >= this.player2.y &&\n        this.ball.y <= this.player2.y + this.player2.height) {\n        this.ball.xSpeed *= -1;\n        this.ball.ySpeed *= 1;\n    }\n    // Update Score if this.player 1 misses\n    // bugfix: width of hitbox by mats-pichler\n    if (this.ball.x <= 0 + 10 + this.player1.width / 2) {\n        scorePlayer2 += 1;\n        // ball.resetBall(gameStarted);\n    }\n    // Update Score if Player 2 misses\n    // bugfix: width of hitbox by mats-pichler\n    if (this.ball.x >= canvas.width - 10 - this.player2.width / 2) {\n        scorePlayer1 += 1;\n        // ball.resetBall(gameStarted);\n    }\n}\nfunction updateScore() {\n    if (gameStarted) {\n        if (!scoreElement) {\n            scoreElement = createHeading('');\n            document.body.appendChild(scoreElement);\n        }\n        scoreElement.textContent = scorePlayer1 + ' : ' + scorePlayer2;\n    }\n}\nfunction gameLoop() {\n    draw();\n    // ball.moveBall(gameStarted, Ball);\n    checkPaddleHit();\n    updateScore();\n}\n// main program\ncreateStartGameHeading();\ngameLoop();\nfunction f() {\n    setInterval(gameLoop, 1000 / 120);\n    window.addEventListener('keydown', handleKeyDown);\n}\nwindow.addEventListener('keydown', function (event) {\n    if (event.code === 'Space' && !gameStarted) {\n        gameStarted = true;\n        removeStartGameHeading();\n        f();\n    }\n});\n\n\n//# sourceURL=webpack:///./app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app.js");
/******/ 	
/******/ })()
;