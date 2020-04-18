/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _utility = __webpack_require__(/*! ./utility */ \"./src/utility.js\");\n\nvar H = _interopRequireWildcard(_utility);\n\nvar _settings = __webpack_require__(/*! ./settings */ \"./src/settings.js\");\n\nvar Settings = _interopRequireWildcard(_settings);\n\nvar _tile = __webpack_require__(/*! ./tile */ \"./src/tile.js\");\n\nvar _tile2 = _interopRequireDefault(_tile);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nmodule.exports = {\n  // canvas\n  canvas: undefined,\n\n  // context ( 2D )\n  ctx: undefined,\n\n  // img\n  image: undefined,\n\n  // comparison image holder\n  trueImg: undefined,\n\n  // tiles array\n  tilesArr: undefined,\n\n  // tiles\n  tiles: [],\n\n  // shuffled tiles\n  shuffledTiles: [],\n\n  // tiles map\n  // coordinates between tiles position before and after swap\n  tilesMap: [],\n\n  // state for tile clicking events\n  state: {\n    selectedTile: undefined,\n    mouseX: undefined,\n    mouseY: undefined,\n    isMoving: false\n  },\n\n  /**\r\n   * select canvas\r\n   */\n  set: function set() {\n    // select canvas & context\n    this.canvas = H.ele('#game-canvas');\n    this.ctx = this.canvas.getContext('2d');\n\n    // select comparison image\n    this.trueImg = H.ele('#true-image');\n\n    // set settings\n    var d = Settings.selected_difficulty;\n    this.tilesArr = Settings.difficulties[d];\n  },\n\n\n  /**\r\n   * @param {image} img\r\n   * draw a shuffled image to canvas\r\n   * append comparison image to true image\r\n   */\n  drawImg: function drawImg(img) {\n    // cache image for global use ( global mean the canvas obj)\n    this.image = img;\n\n    // set canvas dimensions\n    this.setDimensions(img);\n\n    // cache this ref\n    var self = this;\n\n    // generate tiles\n    this.generateTiles(img);\n\n    // generate shuffled tiles\n    var a = this.tiles.slice();\n    this.shuffledTiles = this.shuffle(a);\n    console.log(this.shuffledTiles, this.tilesMap);\n\n    // append image to comparison block\n    this.appendImg(img);\n\n    // attach event listener\n    this.canvas.addEventListener('mousedown', self.handleMouseDown.bind(this));\n\n    // render canvas\n    this.render();\n  },\n\n\n  /**\r\n   * @param {integer} width\r\n   * @param {integer} height\r\n   * set canvas width and height\r\n   */\n  setDimensions: function setDimensions(img) {\n    // compute image ratio\n    var ratio = this.getImageRatio(img);\n\n    switch (true) {\n      case ratio > 1:\n        // wide image\n        this.canvas.width = 610;\n        this.canvas.height = 610 / ratio;\n        break;\n\n      case ratio < 1:\n        // tall image\n        this.canvas.width = 610 / ratio;\n        this.canvas.height = 610;\n        break;\n\n      case ratio === 1:\n        // square image\n        this.canvas.width = 610;\n        this.canvas.height = 610;\n        break;\n      default:\n        console.error('undefined image ration', ratio);\n        break;\n    }\n  },\n\n\n  /**\r\n   * @param {img} image\r\n   * @return {integer} ratio\r\n   * compute and return image ratio\r\n   */\n  getImageRatio: function getImageRatio(img) {\n    var w = img.width; // image width\n    var h = img.height; // image height\n\n    // compute and return ratio\n    return w / h;\n  },\n\n\n  /**\r\n   * @param {image} img\r\n   * append an image to the true image element\r\n   */\n  appendImg: function appendImg(img) {\n    // get source\n    var source = img.src;\n\n    // create an img element\n    // eslint-disable-next-line no-undef\n    var e = document.createElement('img');\n\n    // set attributes and source\n    e.setAttribute('src', source);\n    e.width = this.canvas.width;\n    e.height = this.canvas.height;\n\n    // append image\n    this.trueImg.appendChild(e);\n  },\n\n\n  /**\r\n   * generate shuffled tiles array\r\n   */\n  generateTiles: function generateTiles(img) {\n    // cache this for extra scope use\n    var self = this;\n\n    // columns and rows array\n    var a = this.tilesArr;\n\n    // tiles width\n    var w = this.canvas.width / a[0];\n\n    // tiles height\n    var h = this.canvas.height / a[1];\n\n    // create pointRelativePosition() alias\n    var prp = this.pointRelativePosition.bind(this);\n\n    // populate tiles\n    for (var y = 0; y < a[1]; y++) {\n      for (var x = 0; x < a[0]; x++) {\n        this.tiles.push(new _tile2.default(self.ctx, img, {\n          positionX: w * x,\n          positionY: h * y,\n          width: w,\n          height: h,\n          XClipPoint: img.width * prp(w * x, 'x') / 100,\n          XClipPointEnd: img.width * prp(w * x + w, 'x') / 100 - img.width * prp(w * x, 'x') / 100,\n          YClipPoint: img.height * prp(h * y, 'y') / 100,\n          YClipPointEnd: img.height * prp(h * y + h, 'y') / 100 - img.height * prp(h * y, 'y') / 100,\n          drawPosX: w * x,\n          drawPosY: h * y\n        }));\n\n        // populate tiles map with original positions\n        this.tilesMap.push(y * a[0] + x);\n      }\n    }\n  },\n\n\n  /**\r\n   * @param {array} a\r\n   * shuffle tiles & tiles map\r\n   */\n  shuffle: function shuffle(a) {\n    for (var i = a.length - 1; i >= 0; i--) {\n      var j = Math.floor(Math.random() * a.length);\n\n      // swap\n      var x = a[i];\n      a[i] = a[j];\n      a[j] = x;\n\n      // swap tiles map\n      var q = this.tilesMap[i];\n      this.tilesMap[i] = this.tilesMap[j];\n      this.tilesMap[j] = q;\n    }\n\n    return a;\n  },\n\n\n  /**\r\n   * draw separation lines to canvas\r\n   */\n  drawSeparations: function drawSeparations() {\n    var a = this.tilesArr;\n\n    // set x step and y step\n    var stepX = this.canvas.width / a[0];\n    var stepY = this.canvas.height / a[1];\n\n    // draw vertical separations\n    for (var i = 1; i <= a[0]; i++) {\n      this.ctx.beginPath();\n      this.ctx.moveTo(stepX * i, 0);\n      this.ctx.lineTo(stepX * i, this.canvas.height);\n      this.ctx.stroke();\n    }\n\n    // draw horizontal separations\n    for (var _i = 1; _i <= a[1]; _i++) {\n      this.ctx.beginPath();\n      this.ctx.moveTo(0, stepY * _i);\n      this.ctx.lineTo(this.canvas.width, stepY * _i);\n      this.ctx.stroke();\n    }\n  },\n\n\n  /**\r\n   * return point relative position to canvas\r\n   * ex: canvas of 100px / 100px and a point in 40px / 66px yields 40 / 66\r\n   * @param {int} c\r\n   * @param {string} x : 'x' or 'y'\r\n   * @return {mixed}\r\n   */\n  pointRelativePosition: function pointRelativePosition(c, xoy) {\n    var r = void 0;\n    // calculate c relativeness\n    switch (xoy) {\n      case 'x':\n        r = c * 100 / this.canvas.width;\n        break;\n      case 'y':\n        r = c * 100 / this.canvas.height;\n        break;\n      default:\n        console.log('please specify point');\n        break;\n    }\n\n    return r;\n  },\n  handleMouseDown: function handleMouseDown(evt) {\n    var self = this;\n\n    var mousePos = this.mouseCoords(evt);\n\n    var clickedTile = this.tilesMap.indexOf(this.mouseOn(mousePos));\n\n    // set selected tile\n    this.state.selectedTile = clickedTile;\n    this.state.mouseX = mousePos.x;\n    this.state.mouseY = mousePos.y;\n\n    // attach mouse move event listener\n    this.canvas.addEventListener('mousemove', self.handleMouseMove.bind(self), false);\n\n    // attach mouse move event listener\n    this.canvas.addEventListener('mouseup', self.handleMouseUp.bind(self), false);\n\n    this.state.isMoving = true;\n  },\n  handleMouseMove: function handleMouseMove(evt) {\n    evt.stopPropagation();\n\n    if (this.state.isMoving) {\n      console.log('moving..');\n\n      // cache selected tile index\n      var index = this.state.selectedTile;\n\n      // cache selected tile\n      var tile = this.shuffledTiles[index];\n\n      // get mouse pos\n      var mouseCoords = this.mouseCoords(evt);\n\n      // calc mouse movement\n      var distX = mouseCoords.x - this.state.mouseX;\n      var distY = mouseCoords.y - this.state.mouseY;\n\n      // set new mouse state\n      this.state.mouseX = mouseCoords.x;\n      this.state.mouseY = mouseCoords.y;\n\n      // move tile\n      tile.move(distX, distY);\n    }\n  },\n  handleMouseUp: function handleMouseUp(evt) {\n    evt.stopPropagation();\n\n    if (this.state.isMoving) {\n      // cache this\n      var self = this;\n\n      // cache selected tile index\n      var index = this.state.selectedTile;\n\n      // selected tile\n      var tile = this.shuffledTiles[index];\n\n      // get target tile\n      var mousePos = this.mouseCoords(evt);\n      var targetTileIndex = this.tilesMap.indexOf(this.mouseOn(mousePos));\n      var targetTile = this.shuffledTiles[targetTileIndex];\n\n      // swap tiles\n      var tempTilePos = {\n        x: tile.dockedPosX,\n        y: tile.dockedPosY\n      };\n      tile.dock(targetTile.dockedPosX, targetTile.dockedPosY);\n      targetTile.dock(tempTilePos.x, tempTilePos.y);\n\n      // save the swap to tiles map\n      var tempTileIndex = this.tilesMap[index];\n      this.tilesMap[index] = this.tilesMap[targetTileIndex];\n      this.tilesMap[targetTileIndex] = tempTileIndex;\n\n      // reset state\n      this.state.mouseX = undefined;\n      this.state.mouseY = undefined;\n      this.state.selectedTile = undefined;\n\n      // detach events\n      this.canvas.removeEventListener('mousemove', self.handleMouseMove.bind(self), false);\n      this.canvas.removeEventListener('mouseup', self.handleMouseUp.bind(self), false);\n\n      this.state.isMoving = false;\n    }\n  },\n  mouseCoords: function mouseCoords(evt) {\n    var rect = this.canvas.getBoundingClientRect();\n    return {\n      x: evt.clientX - rect.left,\n      y: evt.clientY - rect.top\n    };\n  },\n\n\n  /**\r\n   * return the number of tile which contain the mc\r\n   * @param {object} mc: mouse coordinates\r\n   * @return {integer}\r\n   */\n  mouseOn: function mouseOn(mc) {\n    // note: add 6 pxs to witdth and height\n    // to make up for canvas border thickness\n    var w = this.canvas.width + 6;\n    var h = this.canvas.height + 6;\n    var cols = this.tilesArr[0];\n    var rows = this.tilesArr[1];\n\n    // calc x,y coordinates from mouse click.\n    var x = Math.floor(mc.x / w * cols);\n    var y = Math.floor(mc.y / h * rows);\n\n    // calc tile index from x,y coordinates\n    var index = y * cols + x;\n    console.log(index);\n\n    return index;\n  },\n  render: function render() {\n    // cache selected tile\n    var index = this.state.selectedTile;\n\n    var render = this.render.bind(this);\n\n    // loop the render\n    // eslint-disable-next-line no-undef\n    requestAnimationFrame(render);\n\n    // reset canvas\n    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n\n    // draw selected tile\n    if (index) {\n      this.shuffledTiles[index].draw();\n    }\n\n    // draw behind selected tile\n    this.ctx.globalCompositeOperation = 'destination-over';\n\n    // draw separation lines\n    this.drawSeparations();\n\n    // draw tiles\n    // eslint-disable-next-line array-callback-return\n    this.shuffledTiles.map(function (tile, i) {\n      if (index && index !== i) {\n        tile.draw();\n      } else if (index === undefined) {\n        tile.draw();\n      }\n    });\n  }\n}; /* eslint-disable no-param-reassign */\n/* eslint-disable no-plusplus */\n/**\r\n * canvas manipulation\r\n */\n\n//# sourceURL=webpack:///./src/canvas.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable no-undef */\n/* eslint-disable import/no-cycle */\n\n/**\r\n * @name game\r\n * @package utility.js\r\n * @author Arab Faycel\r\n */\n\n\nvar _screen = __webpack_require__(/*! ./screen */ \"./src/screen.js\");\n\nvar _screen2 = _interopRequireDefault(_screen);\n\nvar _state = __webpack_require__(/*! ./state */ \"./src/state.js\");\n\nvar State = _interopRequireWildcard(_state);\n\nvar _settings = __webpack_require__(/*! ./settings */ \"./src/settings.js\");\n\nvar Settings = _interopRequireWildcard(_settings);\n\nvar _canvas = __webpack_require__(/*! ./canvas */ \"./src/canvas.js\");\n\nvar Canvas = _interopRequireWildcard(_canvas);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Game = function () {\n  /**\r\n   * Creates an instance of game.\r\n   * @memberof game\r\n   */\n  function Game() {\n    _classCallCheck(this, Game);\n\n    this.home = document.querySelector('#home-game');\n    this.game = document.querySelector('#game-game');\n  }\n\n  /**\r\n   * @memberof game\r\n   * @description starts the game\r\n   */\n\n\n  _createClass(Game, null, [{\n    key: 'start',\n    value: function start() {\n      // set the game state\n      State.set();\n\n      // set the canvas\n      Canvas.set();\n\n      // load lvl image\n      var image = new Image();\n      image.onload = function () {\n        // draw image to canvas\n        Canvas.drawImg(image);\n\n        // display game screen\n        _screen2.default.showGame();\n\n        // start level timer\n        State.Timer.startLvlTimer();\n      };\n\n      image.src = Settings.images[State.level - 1];\n    }\n  }]);\n\n  return Game;\n}();\n\nexports.default = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _screen = __webpack_require__(/*! ./screen */ \"./src/screen.js\");\n\nvar _screen2 = _interopRequireDefault(_screen);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n_screen2.default.showEntry(); // bootstrap and init app\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/screen.js":
/*!***********************!*\
  !*** ./src/screen.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable no-undef */\n/* eslint-disable import/no-cycle */\n/**\r\n * @name screen\r\n * @package utility.js\r\n * @author Arab Faycel\r\n */\n\nvar _utility = __webpack_require__(/*! ./utility */ \"./src/utility.js\");\n\nvar H = _interopRequireWildcard(_utility);\n\nvar _game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\nvar _game2 = _interopRequireDefault(_game);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Screen = function () {\n  /**\r\n   * Creates an instance of screen.\r\n   * @memberof screen\r\n   */\n  function Screen() {\n    _classCallCheck(this, Screen);\n\n    this.home = document.querySelector('#home-screen');\n    this.game = document.querySelector('#game-screen');\n  }\n\n  /**\r\n   * @memberof screen\r\n   * @description display home screen\r\n   */\n\n\n  _createClass(Screen, null, [{\n    key: 'showHome',\n    value: function showHome() {\n      // hide game screen\n      var game = H.ele('#game-screen');\n      H.hide(game);\n\n      // display home screen\n      var home = H.ele('#home-screen');\n      H.display(home);\n    }\n\n    /**\r\n     * @memberof screen\r\n     * @description display entry screen\r\n     */\n\n  }, {\n    key: 'showEntry',\n    value: function showEntry() {\n      // display home first\n      this.showHome();\n\n      var entry = document.querySelector('#entry');\n      H.display(entry);\n\n      // selecting buttons\n      var startBtn = H.ele('#game-start');\n      /* const settingsBtn = H.ele('#show-settings');\r\n      const creditsBtn = H.ele('#show-credits'); */\n\n      // attach events\n      startBtn.addEventListener('click', function () {\n        _game2.default.start();\n      });\n    }\n\n    /**\r\n     * @memberof screen\r\n     * @description display game screen\r\n     */\n\n  }, {\n    key: 'showGame',\n    value: function showGame() {\n      // hide home screen\n      var home = H.ele('#home-screen');\n      H.hide(home);\n\n      // display game screen\n      var game = H.ele('#game-screen');\n      H.display(game);\n    }\n\n    /**\r\n     * @memberof screen\r\n     * @param {integer} val\r\n     * @description level timer view update\r\n     */\n\n  }, {\n    key: 'updateLvlTimer',\n    value: function updateLvlTimer(val) {\n      var lvlTimer = H.ele('#timer');\n      lvlTimer.innerHTML = 'Level Timer : ' + H.makeTime(val);\n    }\n\n    /**\r\n     * @memberof screen\r\n     * @param {integer} val\r\n     * @description total timer view update\r\n     */\n\n  }, {\n    key: 'updateTotalTimer',\n    value: function updateTotalTimer(val) {\n      var totalTimer = H.ele('#total');\n      totalTimer.innerHTML = 'Game Timer : ' + H.makeTime(val);\n    }\n\n    /**\r\n     * @memberof screen\r\n     * @param {integer} val\r\n     * @description level number view update\r\n     */\n\n  }, {\n    key: 'updateLvlNumber',\n    value: function updateLvlNumber(val) {\n      var lvlNumber = H.ele('#level-number');\n      lvlNumber.innerHTML = 'Level : ' + val;\n    }\n  }]);\n\n  return Screen;\n}();\n\nexports.default = Screen;\n\n//# sourceURL=webpack:///./src/screen.js?");

/***/ }),

/***/ "./src/settings.js":
/*!*************************!*\
  !*** ./src/settings.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * game settings\r\n * images, tile switching mode, blind mode ...\r\n */\nmodule.exports = {\n  // images\n  images: ['assets/levels-images/lvl1-image.jpg', 'assets/levels-images/lvl2-image.jpg', 'assets/levels-images/lvl3-image.jpg'],\n\n  // tile switching mode\n  // default :drag & drop\n  // other modes : point and click\n  switch_mode: 'drag n drop',\n\n  // blind mode\n  // default: false\n  // turn true to disable comparison image\n  blind_mode: false,\n\n  // game difficulties\n  difficulties: {\n    easy: [5, 4],\n    normal: [8, 6],\n    hard: [12, 9]\n  },\n\n  // game selected difficulty\n  // default: easy\n  selected_difficulty: 'easy'\n};\n\n//# sourceURL=webpack:///./src/settings.js?");

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _screen = __webpack_require__(/*! ./screen */ \"./src/screen.js\");\n\nvar _screen2 = _interopRequireDefault(_screen);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nmodule.exports = {\n  // game current level\n  level: null,\n\n  // time records\n  records: [],\n\n  /* setters */\n\n  // set state\n  set: function set() {\n    // set level number\n    this.level = 1;\n\n    // update level view\n    _screen2.default.updateLvlNumber(this.level);\n  },\n\n\n  // next level\n  nextLevel: function nextLevel() {\n    // set next level\n    this.level = this.level + 1;\n\n    // update level view\n    _screen2.default.updateLvlNumber(this.level);\n  },\n\n\n  // timer control\n  Timer: {\n    // level timer\n    lvlTimer: 0,\n\n    // total time\n    totalTime: 0,\n\n    // start level timer\n    startLvlTimer: function startLvlTimer() {\n      var self = this;\n\n      // eslint-disable-next-line no-unused-vars\n      var loop = setInterval(function () {\n        // add a tick\n        self.lvlTimer += 1;\n\n        // update lvl timer view\n        _screen2.default.updateLvlTimer(self.lvlTimer);\n      }, 1000);\n    }\n  }\n}; /**\r\n    * Game state\r\n    */\n\n// eslint-disable-next-line import/no-cycle\n\n//# sourceURL=webpack:///./src/state.js?");

/***/ }),

/***/ "./src/tile.js":
/*!*********************!*\
  !*** ./src/tile.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/* eslint-disable no-underscore-dangle */\n/* eslint-disable no-multi-spaces */\nvar Tile = function () {\n  function Tile(_2D_CTX, img, params) {\n    _classCallCheck(this, Tile);\n\n    // set tile params\n    this.positionX = params.positionX;\n    this.positionY = params.positionY;\n    this.width = params.width;\n    this.height = params.height;\n    this.XClipPoint = params.XClipPoint;\n    this.XClipPointEnd = params.XClipPointEnd;\n    this.YClipPoint = params.YClipPoint;\n    this.YClipPointEnd = params.YClipPointEnd;\n\n    // draw positions\n    this.drawPosX = params.drawPosX;\n    this.drawPosY = params.drawPosY;\n    this.dockedPosX = params.drawPosX;\n    this.dockedPosY = params.drawPosY;\n\n    // set tile image for drawing and 2D Context\n    this.img = img;\n    this._2D_CTX = _2D_CTX;\n  }\n\n  _createClass(Tile, [{\n    key: \"move\",\n    value: function move(x, y) {\n      this.drawPosX += x;\n      this.drawPosY += y;\n    }\n  }, {\n    key: \"dock\",\n    value: function dock(x, y) {\n      this.drawPosX = x;\n      this.drawPosY = y;\n      this.dockedPosX = x;\n      this.dockedPosY = y;\n    }\n  }, {\n    key: \"draw\",\n    value: function draw() {\n      this._2D_CTX.drawImage(this.img, this.XClipPoint, this.YClipPoint, this.XClipPointEnd, this.YClipPointEnd, this.drawPosX, this.drawPosY, this.width, this.height);\n    }\n  }]);\n\n  return Tile;\n}();\n\nexports.default = Tile;\n\n//# sourceURL=webpack:///./src/tile.js?");

/***/ }),

/***/ "./src/utility.js":
/*!************************!*\
  !*** ./src/utility.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\n/* eslint-disable no-param-reassign */\n/**\r\n * helper functions\r\n */\nmodule.exports = {\n  /**\r\n   * select a dom\r\n   */\n\n  ele: function ele(_ele) {\n    // eslint-disable-next-line no-undef\n    return document.querySelector(_ele);\n  },\n\n\n  /**\r\n   * display provided dom element\r\n   */\n  display: function display(ele) {\n    // make sure ele is a DOM element\n    if (this.isDOM(ele)) {\n      ele.style.display = 'block';\n    } else {\n      console.error('Error while trying to display a non DOM object');\n    }\n  },\n\n\n  /**\r\n   * hide provided dom element\r\n   */\n  hide: function hide(ele) {\n    // make sure ele is a DOM element\n    // we do this by checking if it has a display style property\n    if (ele && typeof ele.style.display === 'string') {\n      ele.style.display = 'none';\n    } else {\n      console.error('Error while trying to hide a non DOM object');\n    }\n  },\n\n\n  /**\r\n   * check if a var is a DOM\r\n   */\n  isDOM: function isDOM(a) {\n    if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' && a.nodeType !== undefined) {\n      return true;\n    }\n\n    return false;\n  },\n\n\n  /**\r\n   * @param {integer} a\r\n   */\n  makeTime: function makeTime(a) {\n    // calculate minutes\n    var mm = Math.floor(a / 60);\n    // add a leading zero if a single digit\n    if (mm.toString().length === 1) {\n      mm = '0' + mm;\n    }\n\n    // calculate seconds\n    var ss = a % 60;\n    // add a leading zero if a single digit\n    if (ss.toString().length === 1) {\n      ss = '0' + ss;\n    }\n    var time = mm + ':' + ss;\n\n    return time;\n  },\n  mouseCoords: function mouseCoords(evt, canvas) {\n    var rect = canvas.getBoundingClientRect();\n    return {\n      x: evt.clientX - rect.left,\n      y: evt.clientY - rect.top\n    };\n  }\n};\n\n//# sourceURL=webpack:///./src/utility.js?");

/***/ })

/******/ });