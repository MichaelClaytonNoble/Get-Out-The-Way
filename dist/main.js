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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RADIUS\": () => /* binding */ RADIUS,\n/* harmony export */   \"COLOR\": () => /* binding */ COLOR,\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\n \n \nconst RADIUS = 10; \nconst COLOR = \"#676767\";\n\n\nclass Alien extends _moving_object__WEBPACK_IMPORTED_MODULE_1__.default{\n  constructor(options){\n    super({color: COLOR, radius: RADIUS, pos: options['pos'], vel: _util__WEBPACK_IMPORTED_MODULE_2__.default.random45Vec(1), type: 'alien'});\n  }\n\n  move(){\n    super.move();\n    this.reflect();\n  }\n  reflect(){\n    let x = this.pos[0];\n    let y = this.pos[1]; \n    const dim_x = _game__WEBPACK_IMPORTED_MODULE_0__.default.prototype.dim_x;\n    const dim_y = _game__WEBPACK_IMPORTED_MODULE_0__.default.prototype.dim_y; \n\n    if(x>=dim_x || x<=0){\n      this.vel=[this.vel[0]*-1,this.vel[1]];\n    }\n    if(y>= dim_y || y<=0){\n      this.vel=[this.vel[0],this.vel[1]*-1];\n    }\n  }\n  draw(){\n  \n    ctx.strokeStyle = \"#00eb23\";\n    ctx.beginPath(); \n    ctx.arc(\n      this.pos[0],\n      this.pos[1],\n      this.radius,\n      0,\n      2*Math.PI,\n      true\n    );\n    ctx.closePath(); \n    ctx.arc(\n      this.pos[0],\n      this.pos[1],\n      this.radius/2,\n      0,\n      2*Math.PI,\n      true\n    );\n\n    ctx.stroke(); \n    this.drawTriangleAt(this.pos, this.vel);\n  }\n  drawTriangleAt(pos, vel){\n    let radians = {\n      'upright': 0.785398,\n      'downleft': 3.75246, \n      'downright':  2.35619,\n      'upleft': 5.49779\n    }\n    let cRadians = radians['upright'];\n    let [vx,vy] = this.vel;\n    if (vx >= 0 && vy>0){\n      cRadians = radians['downright'];\n    }\n    if(vx>=0 && vy<0){\n      cRadians = radians['upright'];\n    }\n    if(vx<=0 && vy<0){\n      cRadians = radians['upleft'];\n    }\n    if(vx<=0 && vy>0){\n      cRadians = radians['downleft'];\n    }\n\n    let start = [this.pos[0]-this.radius, this.pos[1]];\n    let stroke1 = [this.pos[0]+this.radius, this.pos[1]];\n    let stroke2 = [this.pos[0], this.pos[1]-this.radius/2];\n    \n    let x = [start[0],stroke1[0],stroke2[0]];\n    let y=[start[1], stroke1[1], stroke2[1]];\n    ctx.strokeStyle = \"#0ddddd\";\n    let rotated = _game__WEBPACK_IMPORTED_MODULE_0__.default.rotatePoints(x,y,this.pos[0],this.pos[1], cRadians)\n    ctx.beginPath();\n    start = [rotated['x'][0], rotated['y'][0]];\n    stroke1=[rotated['x'][1], rotated['y'][1]];\n    stroke2=[rotated['x'][2], rotated['y'][2]]; \n\n    ctx.moveTo(start[0], start[1]);\n    ctx.lineTo(stroke1[0], stroke1[1]);\n    ctx.lineTo(stroke2[0], stroke2[1]);\n    ctx.lineTo(start[0], start[1]);\n\n    ctx.stroke()\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Alien);\n\n//# sourceURL=webpack:///./src/alien.js?");

/***/ }),

/***/ "./src/box_object.js":
/*!***************************!*\
  !*** ./src/box_object.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SIZE\": () => /* binding */ SIZE,\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _box_shapes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./box_shapes */ \"./src/box_shapes.js\");\n\nconst SIZE = 20;\n\nclass BoxObject{\n  constructor(options){\n    this.type = options['type'];\n    this.pos = options['pos']; \n    if(this.type === 'shield'){\n      this.color = \"#FFFF00\";\n    }\n    if(this.type ==='energy'){\n      this.color = \"#FF1111\";\n    } \n    this.size = SIZE;\n    this.radius = SIZE/2;\n    this.collisionDetected = false; \n    this.isCollidedWith= this.isCollidedWith.bind(this);\n  }\n\n  draw(ctx){\n   (0,_box_shapes__WEBPACK_IMPORTED_MODULE_0__.regular)(ctx, this.pos, this.color);\n  }\n  drawBoundary(){\n    ctx.strokeStyle = this.color; \n    ctx.beginPath(); \n    ctx.arc(\n      this.pos[0]+SIZE/8,\n      this.pos[1]+SIZE/8,\n      10,\n      0,\n      2*Math.PI,\n      true\n    );\n    ctx.stroke();\n  }\n    \n isCollidedWith(otherObject){\n    let [x,y] = this.pos;\n    let [oX, oY] = otherObject.pos;\n    x+=SIZE/8;\n    y+=SIZE/8;\n    if(Math.abs(x - oX)<(this.radius+otherObject.radius) && Math.abs(y-oY)<(this.radius+otherObject.radius)){\n      return true;\n    }\n    return false;\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BoxObject); \n\n//# sourceURL=webpack:///./src/box_object.js?");

/***/ }),

/***/ "./src/box_shapes.js":
/*!***************************!*\
  !*** ./src/box_shapes.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"regular\": () => /* binding */ regular\n/* harmony export */ });\n/* harmony import */ var _box_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./box_object */ \"./src/box_object.js\");\n \n\nfunction regular(ctx, pos, color){\n  ctx.strokeStyle = color; \n    ctx.beginPath(); \n    ctx.strokeRect(pos[0], pos[1], _box_object__WEBPACK_IMPORTED_MODULE_0__.SIZE/2, _box_object__WEBPACK_IMPORTED_MODULE_0__.SIZE/2);\n    ctx.closePath(); \n    ctx.beginPath();\n    ctx.strokeRect(pos[0]-_box_object__WEBPACK_IMPORTED_MODULE_0__.SIZE/4, pos[1]-_box_object__WEBPACK_IMPORTED_MODULE_0__.SIZE/4, _box_object__WEBPACK_IMPORTED_MODULE_0__.SIZE/2, _box_object__WEBPACK_IMPORTED_MODULE_0__.SIZE/2);\n    ctx.closePath();\n\n    ctx.beginPath();\n    ctx.moveTo(pos[0]+_box_object__WEBPACK_IMPORTED_MODULE_0__.SIZE/4,pos[1]-_box_object__WEBPACK_IMPORTED_MODULE_0__.SIZE/4);\n    ctx.lineTo(pos[0]+_box_object__WEBPACK_IMPORTED_MODULE_0__.SIZE/2,pos[1]);\n    ctx.closePath(); \n    ctx.stroke(); \n    ctx.beginPath();\n    ctx.moveTo(pos[0]-_box_object__WEBPACK_IMPORTED_MODULE_0__.SIZE/4,pos[1]-_box_object__WEBPACK_IMPORTED_MODULE_0__.SIZE/4);\n    ctx.lineTo(pos[0],pos[1]);\n    ctx.closePath(); \n    ctx.stroke();\n    ctx.beginPath();\n    ctx.moveTo(pos[0]-_box_object__WEBPACK_IMPORTED_MODULE_0__.SIZE/4,pos[1]+_box_object__WEBPACK_IMPORTED_MODULE_0__.SIZE/4);\n    ctx.lineTo(pos[0],pos[1]+_box_object__WEBPACK_IMPORTED_MODULE_0__.SIZE/2);\n    ctx.closePath(); \n    ctx.stroke();\n    ctx.beginPath();\n    ctx.moveTo(pos[0]+_box_object__WEBPACK_IMPORTED_MODULE_0__.SIZE/4,pos[1]+_box_object__WEBPACK_IMPORTED_MODULE_0__.SIZE/4);\n    ctx.lineTo(pos[0]+_box_object__WEBPACK_IMPORTED_MODULE_0__.SIZE/2,pos[1]+_box_object__WEBPACK_IMPORTED_MODULE_0__.SIZE/2);\n    ctx.closePath(); \n    ctx.stroke();\n  }\n\n//# sourceURL=webpack:///./src/box_shapes.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _alien__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alien */ \"./src/alien.js\");\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n/* harmony import */ var _box_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./box_object */ \"./src/box_object.js\");\n/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\n \n \n\n\n\nconst DIM_X = 600;\nconst DIM_Y = 450;\nconst NUM_ALIENS = 6;\nconst BOX_POINTS = 100; \n\nclass Game {\n  constructor(ctx){\n    //canvas and setup variables \n    this.ctx=ctx;\n    \n    //shieldBoxes, energyBoxes, aliens, ships\n    this.aliens = []; \n    this.shieldBoxes = [];\n    this.energyBoxes = [];\n    this.addShieldBox(); \n    this.addEnergyBox(); \n    this.addAlien();\n\n    this.ships = [Game.createShip()];\n    this.ship = this.ships[0];\n\n    //shields & points\n    this.score = 0;\n    this.shields = 5;\n\n    //bindings\n    this.bindMethods = this.bindMethods.bind(this); \n    this.bindMethods(this);\n \n  }\n\n  //add objects to the game \n  addAlien(){\n    const ast= new _alien__WEBPACK_IMPORTED_MODULE_0__.default({pos: Game.randomPosition()});\n    this.aliens.push(ast); \n  }\n  addShieldBox(){\n    const shieldBox = new _box_object__WEBPACK_IMPORTED_MODULE_2__.default({\n      type: 'shield',\n      pos: Game.randomPosition()\n    });\n    this.shieldBoxes.push(shieldBox);\n    setTimeout(()=>this.shieldBoxes.pop(), 8000);\n  }\n  addEnergyBox(){\n    this.energyBoxes.pop();\n    const energyBox = new _box_object__WEBPACK_IMPORTED_MODULE_2__.default({\n      type: 'energy',\n      pos: Game.randomPosition()\n    });\n    this.energyBoxes.push(energyBox);\n\n  }\n  addShip(){\n    this.ships.push(Game.createShip());\n  }\n  \n  getAllObjects(){\n    return [].concat(this.aliens, this.shieldBoxes, this.energyBoxes);\n  }\n  getAllMoveObjects(){\n    return [].concat(this.aliens);\n  }\n  \n  //points & lives management \n  newLife(){\n    this.ships.push(Game.createShip());\n  }\n  addShield(){\n    this.shields+=1;\n    _game_view__WEBPACK_IMPORTED_MODULE_3__.default.updateStats('shields', this.shields); \n  }\n \n  removeShield(){\n    this.shields-=1;\n    _game_view__WEBPACK_IMPORTED_MODULE_3__.default.updateStats('shields', this.shields); \n  }\n  addPoint(){\n    this.score += 1;\n    _game_view__WEBPACK_IMPORTED_MODULE_3__.default.updateStats('total', this.shields); \n  }\n\n  setPoints(){\n    this.box_points = BOX_POINTS;\n  }\n  reducePoints(){\n    if(this.box_points !== 0){\n      this.box_points -= 1\n    }\n  }\n  printScore(){\n    console.log(\"Score: \", this.score);\n    console.log(\"Shields: \", this.shields)\n  }\n\n  //game maintenance \n  static createShip(){\n    return new _ship__WEBPACK_IMPORTED_MODULE_1__.default({pos: [300,300]}); \n  }\n  static randomPosition(){\n    return [Math.floor(Math.random() * Math.floor(DIM_X)), Math.floor(Math.random() * Math.floor(DIM_Y))];\n  }\n  get dim_x(){\n    return DIM_X;\n  }\n  get dim_y(){\n    return DIM_Y;\n  }\n\n  //game play \n  remove(objType){\n    if(objType === 'alien'){\n      this.aliens = this.aliens.filter( ast=> ast.collisionDetected===false);\n    }\n    if( objType ==='shield'){\n      this.shieldBoxes = this.shieldBoxes.filter(shields => shields.collisionDetected===false);\n    }\n  }\n  moveObjects(){\n    this.getAllMoveObjects().forEach( obj => obj.move());\n  }\n\n  action(object){\n    this.remove(object.type);\n    switch(object.type){\n      case 'alien':\n        this.removeShield();\n        break;\n      case 'shield':\n        this.addShield();\n        break;\n      case 'energy':\n        this.addPoint();\n        this.addEnergyBox();\n        this.addAlien();\n        break;\n      default: break; \n    }\n  }\n  checkCollisions(){\n\n    const allObjects = this.getAllObjects();\n    for(let i=0; i<allObjects.length; i++){\n      if(allObjects[i] !== undefined){\n        if(allObjects[i].isCollidedWith(this.ships[0])){\n            allObjects[i].collisionDetected = true;\n            this.action(allObjects[i]); \n        };\n      }\n    }\n  }\n  moveShip(){\n    this.ship.move();\n  }\n\n  //rendering and drawing \n  draw(){\n    this.ctx.clearRect(0,0,DIM_X, DIM_Y);\n    this.getAllObjects().forEach( obj=>{\n      obj.draw(this.ctx);\n    })\n    this.ship.draw(this.ctx);\n  }\n\n  static rotatePoints(x,y, cx,cy, radiansAngle){\n    let _cos = Math.cos(radiansAngle);\n    let _sin = Math.sin(radiansAngle);\n    let t;\n    for( let i=0; i<x.length; i++ ){\n        t = ( ( x[i]-cx )* _cos - ( y[i]-cy)* _sin ) + cx;  \n        y[i] = ( ( x[i]-cx )* _sin + ( y[i]-cy )* _cos ) + cy;\n        x[i] = t;\n    }\n    return{x, y};\n  }\n\n  bindMethods(that){\n    that.draw = that.draw.bind(that); \n    that.moveShip = that.moveShip.bind(that);\n    that.moveObjects = that.moveObjects.bind(that); \n    that.addAlien = that.addAlien.bind(that); \n    that.addShieldBox = that.addShieldBox.bind(that); \n    that.checkCollisions = that.checkCollisions.bind(that);\n    that.getAllObjects = that.getAllObjects.bind(that);\n    that.getAllMoveObjects = that.getAllMoveObjects.bind(that);\n    that.addShield = that.addShield.bind(that); \n    that.printScore = that.printScore.bind(that); \n    that.addShield = that.addShield.bind(that); \n    that.removeShield = that.removeShield.bind(that); \n\n    setTimeout(that.addShield, 300);\n    setTimeout(that.addPoints, 300);\n    setTimeout(that.removeShield, 300);\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game); \n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n \n// import key from '../dist/keymaster'; \n\n\nclass GameView {\n  constructor(ctx){\n    this.game = new _game__WEBPACK_IMPORTED_MODULE_0__.default(ctx); \n    this.ctx = ctx; \n\n    this.bindKeyHandlers = this.bindKeyHandlers.bind(this); \n    this.handleMovements = this.handleMovements.bind(this); \n  }\n\n  static MOVES(){\n    return {\n      up: [0, -1],\n      left: [-1, 0],\n      down: [0, 1],\n      right: [1, 0]\n    }\n  }\n \n  bindKeyHandlers(){\n    const ship = this.game.ship;\n    Object.keys(GameView.MOVES()).forEach( k=>{\n      const move = GameView.MOVES()[k];\n      key(k, function(){\n        window.keyFlags[k]=true;\n      })});\n  }\n\n  start(){\n    this.handleMovements();\n    this.bindKeyHandlers();\n    setInterval(this.game.draw, 20);\n    setInterval(this.game.moveObjects, 20); \n    setInterval(this.game.moveShip, 5);\n    setInterval(this.game.checkCollisions, 20);\n    // setInterval(this.game.printScore, 2000);\n    setInterval(this.game.addShieldBox, 20000);\n    setInterval(this.game.addShieldBox, 60000);\n  }\n\n  handleMovements(){\n    window.keyFlags = { left: false, up: false, right: false, down: false}; \n\n    window.addEventListener(\"keyup\", (e)=>{       \n      if(e.keyCode == 37){window.keyFlags.left=false;}\n      if(e.keyCode == 38){window.keyFlags.up=false;}\n      if(e.keyCode == 39){window.keyFlags.right=false;}\n      if(e.keyCode == 40){window.keyFlags.down=false;}\n    })\n  }\n\n  static updateStats( stat, value){ \n    const shieldView = document.getElementById(\"stats-shields-number\");\n    const totalScoreView = document.getElementById(\"stats-score\"); \n    const points = document.getElementById(\"stats-points\");\n\n    switch( stat ){\n      case 'shields': \n        shieldView.textContent = value;\n        break;\n      case 'total':\n        totalScoreView.textContent = value;\n        break; \n      case 'points': \n        points.textContent = value;\n        break; \n\n      default: break; \n    }\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameView); \n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _alien__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alien */ \"./src/alien.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\"); \n\n \n \n \n\nconsole.log(\"Webpack is working!\"); \n\ndocument.addEventListener(\"DOMContentLoaded\", ()=>{\n  const ctx = document.getElementsByTagName(\"canvas\")[0].getContext('2d'); \n  window.canvas = document.getElementsByTagName(\"canvas\")[0]; \n  window.ctx = ctx;\n\n  window.Game=_game__WEBPACK_IMPORTED_MODULE_1__.default; \n  window.test = test; \n\n  //create a new game. \n})\n\nfunction test(ctx){\n  let gv = new _game_view__WEBPACK_IMPORTED_MODULE_2__.default(ctx); \n  gv.start(); \n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n \n\n\nclass MovingObject{\n  constructor(options){\n    this.pos = options['pos']; \n    this.vel= options['vel']; \n    this.radius = options['radius']; \n    this.color = options['color']; \n    this.type=options['type'];\n    this.collisionDetected = false;\n    this.posi = this.posi.bind(this);\n  }\n\n  draw(ctx){\n    ctx.fillStyle = this.color; \n    ctx.beginPath(); \n    ctx.arc(\n      this.pos[0],\n      this.pos[1],\n      this.radius,\n      0,\n      2*Math.PI,\n      true\n    );\n    ctx.fill();\n  }\n  posi(){\n    return this.pos;\n  }\n\n\n  move(){ \n    this.pos[0] += this.vel[0];\n    this.pos[1]+=this.vel[1]; \n  }\n\n  isCollidedWith(otherObject){\n    let [x,y] = this.pos;\n    let [oX, oY] = otherObject.pos;\n    \n    if(Math.abs(x - oX)<(this.radius+otherObject.radius) && Math.abs(y-oY)<(this.radius+otherObject.radius)){\n      return true;\n    }\n    return false;\n  }\n\n\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MovingObject);\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RADIUS\": () => /* binding */ RADIUS,\n/* harmony export */   \"COLOR\": () => /* binding */ COLOR,\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\n\n \nconst RADIUS = 10;\nconst COLOR = \"#ffd700\";\n\nconst DIM_X = 600;\nconst DIM_Y = 450;\nclass Ship extends _moving_object__WEBPACK_IMPORTED_MODULE_1__.default{\n  constructor(options){\n    super({color: COLOR, radius: RADIUS, pos: options['pos'], vel: [0,0], type: 'ship'});\n\n    this.outOfBounds = this.outOfBounds.bind(this); \n  }\n\n  power(){\n      let impulse = [0,0];\n      if(window.keyFlags['up']){\n        impulse[0]+= _game_view__WEBPACK_IMPORTED_MODULE_2__.default.MOVES().up[0]; \n        impulse[1]+= _game_view__WEBPACK_IMPORTED_MODULE_2__.default.MOVES().up[1]; \n      }\n      if(window.keyFlags['right']){\n        impulse[0]+= _game_view__WEBPACK_IMPORTED_MODULE_2__.default.MOVES().right[0]; \n        impulse[1]+= _game_view__WEBPACK_IMPORTED_MODULE_2__.default.MOVES().right[1]; \n      }\n      if(window.keyFlags['left']){\n        impulse[0]+= _game_view__WEBPACK_IMPORTED_MODULE_2__.default.MOVES().left[0]; \n        impulse[1]+= _game_view__WEBPACK_IMPORTED_MODULE_2__.default.MOVES().left[1]; \n      }\n      if(window.keyFlags['down']){\n        impulse[0]+= _game_view__WEBPACK_IMPORTED_MODULE_2__.default.MOVES().down[0]; \n        impulse[1]+= _game_view__WEBPACK_IMPORTED_MODULE_2__.default.MOVES().down[1]; \n      }\n      this.vel[0]+=impulse[0];\n      this.vel[1]+=impulse[1]; \n  }\n  move(){\n      this.power();\n      super.move();\n      this.vel = [this.vel[0]/8,this.vel[1]/8];\n      this.outOfBounds();\n    \n  }\n\n  outOfBounds(){\n    let [x,y] = this.pos; \n\n    if(x >= DIM_X-this.radius){\n      this.pos[0] = DIM_X-this.radius; \n    }\n    if(x<= 0+this.radius){\n      this.pos[0] = 0+this.radius;\n    }\n    if(y >= DIM_Y-this.radius){\n      this.pos[1] = DIM_Y-this.radius; \n    }\n    if(y<= 0+this.radius){\n      this.pos[1] = 0+this.radius;\n    }\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship); \n\n//# sourceURL=webpack:///./src/ship.js?");

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