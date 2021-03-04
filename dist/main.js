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

/***/ "./src/alien.js":
/*!**********************!*\
  !*** ./src/alien.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RADIUS\": () => /* binding */ RADIUS,\n/* harmony export */   \"COLOR\": () => /* binding */ COLOR,\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\n \n \nconst RADIUS = 10; \nconst COLOR = \"#676767\";\n\n\nclass Alien extends _moving_object__WEBPACK_IMPORTED_MODULE_1__.default{\n  constructor(options){\n    super({color: COLOR, radius: RADIUS, pos: options['pos'], vel: _util__WEBPACK_IMPORTED_MODULE_2__.default.random45Vec(1), type: 'alien'});\n  }\n\n  move(){\n    super.move();\n    this.reflect();\n  }\n  reflect(){\n    let x = this.pos[0];\n    let y = this.pos[1]; \n    const dim_x = _game__WEBPACK_IMPORTED_MODULE_0__.default.prototype.dim_x;\n    const dim_y = _game__WEBPACK_IMPORTED_MODULE_0__.default.prototype.dim_y; \n\n    if(x>=dim_x || x<=0){\n      this.vel=[this.vel[0]*-1,this.vel[1]];\n    }\n    if(y>= dim_y || y<=0){\n      this.vel=[this.vel[0],this.vel[1]*-1];\n    }\n  }\n  draw(){\n  \n    ctx.strokeStyle = \"#00eb23\";\n    ctx.beginPath(); \n    ctx.arc(\n      this.pos[0],\n      this.pos[1],\n      this.radius,\n      0,\n      2*Math.PI,\n      true\n    );\n    ctx.closePath(); \n    ctx.arc(\n      this.pos[0],\n      this.pos[1],\n      this.radius/2,\n      0,\n      2*Math.PI,\n      true\n    );\n\n    ctx.stroke(); \n    this.drawTriangleAt(this.pos, this.vel);\n  }\n  drawTriangleAt(pos, vel){\n    let radians = {\n      'upright': 0.785398,\n      'downleft': 3.75246, \n      'downright':  2.35619,\n      'upleft': 5.49779\n    }\n    let cRadians = radians['upright'];\n    let [vx,vy] = this.vel;\n    if (vx >= 0 && vy>0){\n      cRadians = radians['downright'];\n    }\n    if(vx>=0 && vy<0){\n      cRadians = radians['upright'];\n    }\n    if(vx<=0 && vy<0){\n      cRadians = radians['upleft'];\n    }\n    if(vx<=0 && vy>0){\n      cRadians = radians['downleft'];\n    }\n\n    let start = [this.pos[0]-this.radius, this.pos[1]];\n    let stroke1 = [this.pos[0]+this.radius, this.pos[1]];\n    let stroke2 = [this.pos[0], this.pos[1]-this.radius/2];\n    let x = [start[0],stroke1[0],stroke2[0]];\n    let y=[start[1], stroke1[1], stroke2[1]];\n    ctx.strokeStyle = \"#0ddddd\";\n    let rotated = _game__WEBPACK_IMPORTED_MODULE_0__.default.rotatePoints(x,y,this.pos[0],this.pos[1], cRadians)\n    ctx.beginPath();\n    start = [rotated['x'][0], rotated['y'][0]];\n    stroke1=[rotated['x'][1], rotated['y'][1]];\n    stroke2=[rotated['x'][2], rotated['y'][2]]; \n\n    ctx.moveTo(start[0], start[1]);\n    ctx.lineTo(stroke1[0], stroke1[1]);\n    ctx.lineTo(stroke2[0], stroke2[1]);\n    ctx.lineTo(start[0], start[1]);\n\n    ctx.stroke()\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Alien);\n\n//# sourceURL=webpack:///./src/alien.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _alien__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alien */ \"./src/alien.js\");\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n \n \n\nconst DIM_X = 600;\nconst DIM_Y = 600;\n\nclass Game {\n  constructor(ctx){\n    this.DIM_X = DIM_X;\n    this.DIM_Y = DIM_Y;\n    this.NUM_ALIENS = 6;\n    this.aliens = []; \n    this.ctx=ctx;\n    this.draw = this.draw.bind(this);\n    this.moveObjects = this.moveObjects.bind(this); \n    this.addAlien = this.addAlien.bind(this); \n    this.checkCollisions = this.checkCollisions.bind(this);\n    this.moveShip = this.moveShip.bind(this);\n    this.addAlien();\n    this.addAlien();\n    this.addAlien();\n    this.addAlien();\n    this.addAlien();\n    // this.ships = new Array(4).fill(Game.createShip());\n    this.ships = [Game.createShip()];\n    this.ship = this.ships[0];\n    this.shields = 5; \n  }\n  addAlien(){\n    const ast= new _alien__WEBPACK_IMPORTED_MODULE_0__.default({pos: Game.randomPosition()});\n    this.aliens.push(ast); \n  }\n  static createShip(){\n    return new _ship__WEBPACK_IMPORTED_MODULE_1__.default({pos: [300,300]}); \n  }\n  addShip(){\n    this.ships.push(Game.createShip());\n  }\n  \n  allObjects(){\n    return [].concat(this.aliens);\n  }\n\n  newLife(){\n    this.ships.push(Game.createShip());\n  }\n  get dim_x(){\n    return DIM_X;\n  }\n  get dim_y(){\n    return DIM_Y;\n  }\n\n  remove(objects){\n    if(objects === 'alien'){\n      this.aliens = this.aliens.filter( ast=> ast.collisionDetected===false);\n      this.shields -=1;\n    }\n  }\n  static randomPosition(){\n    return [Math.floor(Math.random() * Math.floor(DIM_X)), Math.floor(Math.random() * Math.floor(DIM_Y))];\n  }\n  checkCollisions(){\n    for(let i=0; i<this.aliens.length; i++){\n      for(let j=0; j<this.aliens.length; j++){\n        if(this.aliens[i].isCollidedWith(this.ships[0])){\n          this.aliens[i].collisionDetected = true;\n          this.remove('alien');\n        };\n      }\n    }\n  }\n  moveObjects(){\n    this.allObjects().forEach( obj => obj.move());\n  }\n  moveShip(){\n    this.ship.move();\n  }\n  draw(){\n    this.ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);\n    this.allObjects().forEach( obj=>{\n      obj.draw(this.ctx);\n    })\n    this.ship.draw(this.ctx);\n  }\n\n  static rotatePoints(x,y, cx,cy, radiansAngle){\n    let cos = Math.cos(radiansAngle);\n    let sin = Math.sin(radiansAngle);\n    let temp;\n    for( let n=0; n<x.length; n++ ){\n        temp = ((x[n]-cx)*cos - (y[n]-cy)*sin) + cx;  \n        y[n] = ((x[n]-cx)*sin + (y[n]-cy)*cos) + cy;\n        x[n] = temp;\n    }\n    return{x: x, y: y};\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game); \n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n \n// import key from '../dist/keymaster'; \n\n\nclass GameView {\n  constructor(ctx){\n    this.game = new _game__WEBPACK_IMPORTED_MODULE_0__.default(ctx); \n    this.ctx = ctx; \n\n    this.bindKeyHandlers = this.bindKeyHandlers.bind(this); \n    this.handleMovements = this.handleMovements.bind(this); \n  }\n\n  static MOVES(){\n    return {\n      up: [0, -1],\n      left: [-1, 0],\n      down: [0, 1],\n      right: [1, 0]\n    }\n  }\n  static GAME (){\n\n  }\n  \n  bindKeyHandlers(){\n    const ship = this.game.ship;\n    Object.keys(GameView.MOVES()).forEach( k=>{\n      const move = GameView.MOVES()[k];\n      key(k, function(){\n        window.keyFlags[k]=true;\n      })});\n  }\n  start(){\n\n    this.handleMovements();\n    this.bindKeyHandlers();\n    setInterval(this.game.draw, 20);\n    setInterval(this.game.moveObjects, 20); \n    setInterval(this.game.moveShip, 5);\n    setInterval(this.game.checkCollisions, 20);\n  }\n  handleMovements(){\n    window.keyFlags = { left: false, up: false, right: false, down: false}; \n\n    window.addEventListener(\"keyup\", (e)=>{       \n      if(e.keyCode == 37){window.keyFlags.left=false;}\n      if(e.keyCode == 38){window.keyFlags.up=false;}\n      if(e.keyCode == 39){window.keyFlags.right=false;}\n      if(e.keyCode == 40){window.keyFlags.down=false;}\n    })\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameView); \n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _alien__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alien */ \"./src/alien.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\"); \n\n \n \n \n\nconsole.log(\"Webpack is working!\"); \n\ndocument.addEventListener(\"DOMContentLoaded\", ()=>{\n  const ctx = document.getElementsByTagName(\"canvas\")[0].getContext('2d'); \n  window.canvas = document.getElementsByTagName(\"canvas\")[0]; \n  window.ctx = ctx;\n  window.MovingObject = MovingObject; \n  window.Alien = _alien__WEBPACK_IMPORTED_MODULE_0__.default; \n\n  window.Game=_game__WEBPACK_IMPORTED_MODULE_1__.default; \n  window.test = test; \n\n})\n\nfunction test(ctx){\n  let gv = new _game_view__WEBPACK_IMPORTED_MODULE_2__.default(ctx); \n  gv.start(); \n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n \n\n\nclass MovingObject{\n  constructor(options){\n    this.pos = options['pos']; \n    this.vel= options['vel']; \n    this.radius = options['radius']; \n    this.color = options['color']; \n    this.type=options['type'];\n    this.collisionDetected = false;\n  }\n\n  draw(ctx){\n    ctx.fillStyle = this.color; \n    ctx.beginPath(); \n    ctx.arc(\n      this.pos[0],\n      this.pos[1],\n      this.radius,\n      0,\n      2*Math.PI,\n      true\n    );\n    ctx.fill();\n  }\n\n  move(){ \n    this.pos[0] += this.vel[0];\n    this.pos[1]+=this.vel[1]; \n  }\n\n  isCollidedWith(otherObject){\n    let [x,y] = this.pos;\n    let [oX, oY] = otherObject.pos;\n    \n    if(Math.abs(x - oX)<(this.radius+otherObject.radius) && Math.abs(y-oY)<(this.radius+otherObject.radius)){\n      return true;\n    }\n    return false;\n  }\n\n\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MovingObject);\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RADIUS\": () => /* binding */ RADIUS,\n/* harmony export */   \"COLOR\": () => /* binding */ COLOR,\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\n\n \nconst RADIUS = 20;\nconst COLOR = \"#ffd700\";\n\nclass Ship extends _moving_object__WEBPACK_IMPORTED_MODULE_1__.default{\n  constructor(options){\n    super({color: COLOR, radius: RADIUS, pos: options['pos'], vel: [0,0], type: 'ship'});\n\n    this.outOfBounds = this.outOfBounds.bind(this); \n  }\n\n  power(){\n      let impulse = [0,0];\n      if(window.keyFlags['up']){\n        impulse[0]+= _game_view__WEBPACK_IMPORTED_MODULE_2__.default.MOVES().up[0]; \n        impulse[1]+= _game_view__WEBPACK_IMPORTED_MODULE_2__.default.MOVES().up[1]; \n      }\n      if(window.keyFlags['right']){\n        impulse[0]+= _game_view__WEBPACK_IMPORTED_MODULE_2__.default.MOVES().right[0]; \n        impulse[1]+= _game_view__WEBPACK_IMPORTED_MODULE_2__.default.MOVES().right[1]; \n      }\n      if(window.keyFlags['left']){\n        impulse[0]+= _game_view__WEBPACK_IMPORTED_MODULE_2__.default.MOVES().left[0]; \n        impulse[1]+= _game_view__WEBPACK_IMPORTED_MODULE_2__.default.MOVES().left[1]; \n      }\n      if(window.keyFlags['down']){\n        impulse[0]+= _game_view__WEBPACK_IMPORTED_MODULE_2__.default.MOVES().down[0]; \n        impulse[1]+= _game_view__WEBPACK_IMPORTED_MODULE_2__.default.MOVES().down[1]; \n      }\n      this.vel[0]+=impulse[0];\n      this.vel[1]+=impulse[1]; \n  }\n  move(){\n      this.power();\n      super.move();\n      this.vel = [this.vel[0]/8,this.vel[1]/8];\n      this.outOfBounds();\n    \n  }\n\n  outOfBounds(){\n    let [x,y] = this.pos; \n\n    if(x >= 600-this.radius){\n      this.pos[0] = 600-this.radius; \n    }\n    if(x<= 0+this.radius){\n      this.pos[0] = 0+this.radius;\n    }\n    if(y >= 600-this.radius){\n      this.pos[1] = 600-this.radius; \n    }\n    if(y<= 0+this.radius){\n      this.pos[1] = 0+this.radius;\n    }\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship); \n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n// Return a randomly oriented vector with the given length.\nconst Util = {\n  randomVec(length) {\n    const deg = 2 * Math.PI * Math.random();\n    return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n  },\n  random45Vec(length) {\n    const degs = [0.7853981634, 2.35619,3.92699,5.49779] \n    const deg = degs[Math.floor(Math.random()*degs.length)];\n    return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n  },\n  // Scale the length of a vector by the given amount.\n  scale(vec, m) {\n    return [vec[0] * m, vec[1] * m];\n  }\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Util); \n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;