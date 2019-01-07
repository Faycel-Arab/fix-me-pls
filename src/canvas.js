/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/**
 * canvas manipulation
 */
import * as H from './utility';
import * as Settings from './settings';
import Tile from './tile';

module.exports = {

  // canvas
  canvas: undefined,

  // context ( 2D )
  ctx: undefined,

  // img
  image: undefined,

  // comparison image holder
  trueImg: undefined,

  // tiles array
  tilesArr: undefined,

  // tiles
  tiles: [],

  // shuffled tiles
  shuffledTiles: [],

  // tiles map
  // coordinates between tiles position before and after swap
  tilesMap: [],

  // state for tile clicking events
  state: {
    selectedTile: undefined,
    mouseX: undefined,
    mouseY: undefined,
  },

  /**
     * select canvas
     */
  set() {
    // select canvas & context
    this.canvas = H.ele('#game-canvas');
    this.ctx = this.canvas.getContext('2d');

    // select comparison image
    this.trueImg = H.ele('#true-image');

    // set settings
    const d = Settings.selected_difficulty;
    this.tilesArr = Settings.difficulties[d];
  },

  /**
     * @param {image} img
     * draw a shuffled image to canvas
     * append comparison image to true image
     */
  drawImg(img) {
    // cache image for global use ( global mean the canvas obj)
    this.image = img;

    // set canvas dimensions
    this.setDimensions(img);

    // cache this ref
    const self = this;

    // generate tiles
    this.generateTiles(img);

    // generate shuffled tiles
    const a = this.tiles.slice();
    this.shuffledTiles = this.shuffle(a);
    console.log(this.shuffledTiles, this.tilesMap);

    // append image to comparison block
    this.appendImg(img);

    // attach event listener
    this.canvas.addEventListener('mousedown', self.handleMouseDown.bind(this));

    // render canvas
    this.render();
  },

  /**
     * @param {integer} width
     * @param {integer} height
     * set canvas width and height
     */
  setDimensions(img) {
    // compute image ratio
    const ratio = this.getImageRatio(img);

    switch (true) {
      case ratio > 1: // wide image
        this.canvas.width = 610;
        this.canvas.height = 610 / ratio;
        break;

      case ratio < 1: // tall image
        this.canvas.width = 610 / ratio;
        this.canvas.height = 610;
        break;

      case ratio === 1: // square image
        this.canvas.width = 610;
        this.canvas.height = 610;
        break;
      default:
        console.error('undefined image ration', ratio);
        break;
    }
  },

  /**
     * @param {img} image
     * @return {integer} ratio
     * compute and return image ratio
     */
  getImageRatio(img) {
    const w = img.width; // image width
    const h = img.height; // image height

    // compute and return ratio
    return w / h;
  },

  /**
     * @param {image} img
     * append an image to the true image element
     */
  appendImg(img) {
    // get source
    const source = img.src;

    // create an img element
    // eslint-disable-next-line no-undef
    const e = document.createElement('img');

    // set attributes and source
    e.setAttribute('src', source);
    e.width = this.canvas.width;
    e.height = this.canvas.height;

    // append image
    this.trueImg.appendChild(e);
  },

  /**
     * generate shuffled tiles array
     */
  generateTiles(img) {
    // cache this for extra scope use
    const self = this;

    // columns and rows array
    const a = this.tilesArr;

    // tiles width
    const w = this.canvas.width / a[0];

    // tiles height
    const h = this.canvas.height / a[1];

    // create pointRelativePosition() alias
    const prp = this.pointRelativePosition.bind(this);

    // populate tiles
    for (let y = 0; y < a[1]; y++) {
      for (let x = 0; x < a[0]; x++) {
        this.tiles.push(new Tile(self.ctx, img, {
          positionX: w * x,
          positionY: h * y,
          width: w,
          height: h,
          XClipPoint: img.width * prp(w * x, 'x') / 100,
          XClipPointEnd: img.width * prp(w * x + w, 'x') / 100 - img.width * prp(w * x, 'x') / 100,
          YClipPoint: img.height * prp(h * y, 'y') / 100,
          YClipPointEnd: img.height * prp(h * y + h, 'y') / 100 - img.height * prp(h * y, 'y') / 100,
          drawPosX: w * x,
          drawPosY: h * y,
        }));

        // populate tiles map with original positions
        this.tilesMap.push(y * a[0] + x);
      }
    }
  },

  /**
     * @param {array} a
     * shuffle tiles & tiles map
     */
  shuffle(a) {
    for (let i = a.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * a.length);

      // swap
      const x = a[i];
      a[i] = a[j];
      a[j] = x;

      // swap tiles map
      const q = this.tilesMap[i];
      this.tilesMap[i] = this.tilesMap[j];
      this.tilesMap[j] = q;
    }

    return a;
  },

  /**
     * draw separation lines to canvas
     */
  drawSeparations() {
    const a = this.tilesArr;

    // set x step and y step
    const stepX = this.canvas.width / a[0];
    const stepY = this.canvas.height / a[1];

    // draw vertical separations
    for (let i = 1; i <= a[0]; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(stepX * i, 0);
      this.ctx.lineTo(stepX * i, this.canvas.height);
      this.ctx.stroke();
    }

    // draw horizontal separations
    for (let i = 1; i <= a[1]; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, stepY * i);
      this.ctx.lineTo(this.canvas.width, stepY * i);
      this.ctx.stroke();
    }
  },

  /**
     * return point relative position to canvas
     * ex: canvas of 100px / 100px and a point in 40px / 66px yields 40 / 66
     * @param {int} c
     * @param {string} x : 'x' or 'y'
     * @return {mixed}
     */
  pointRelativePosition(c, xoy) {
    let r;
    // calculate c relativeness
    switch (xoy) {
      case 'x': r = c * 100 / this.canvas.width; break;
      case 'y': r = c * 100 / this.canvas.height; break;
      default: console.log('please specify point'); break;
    }

    return r;
  },

  handleMouseDown(evt) {
    const self = this;

    const mousePos = this.mouseCoords(evt);

    const clickedTile = this.tilesMap.indexOf(this.mouseOn(mousePos));

    // set selected tile
    this.state.selectedTile = clickedTile;
    this.state.mouseX = mousePos.x;
    this.state.mouseY = mousePos.y;

    // attck mouse move event listener
    this.canvas.addEventListener('mousemove', self.handleMouseMove.bind(this), false);

    // attck mouse move event listener
    this.canvas.addEventListener('mouseup', self.handleMouseUp.bind(this), false);
  },

  handleMouseMove(evt) {
    evt.stopPropagation();

    console.log('moving..');

    // cache selected tile index
    const index = this.state.selectedTile;

    // cache selected tile
    const tile = this.shuffledTiles[index];

    // get mouse pos
    const mouseCoords = this.mouseCoords(evt);

    // calc mouse movement
    const distX = mouseCoords.x - this.state.mouseX;
    const distY = mouseCoords.y - this.state.mouseY;

    // set new mouse state
    this.state.mouseX = mouseCoords.x;
    this.state.mouseY = mouseCoords.y;

    // move tile
    tile.move(distX, distY);
  },

  handleMouseUp(evt) {
    evt.stopPropagation();

    console.log('stopped moving!');

    // cache this
    const self = this;

    // reset state
    this.state.mouseX = undefined;
    this.state.mouseY = undefined;
    this.state.selectedTile = undefined;

    // detach events
    this.canvas.removeEventListener('mousemove', self.handleMouseMove.bind(this), false);
    this.canvas.removeEventListener('mouseup', self.handleMouseUp.bind(this), false);
  },

  mouseCoords(evt) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  },

  /**
     * return the number of tile which contain the mc
     * @param {object} mc: mouse coordinates
     * @return {integer}
     */
  mouseOn(mc) {
    // note: add 6 pxs to witdth and height
    // to make up for canvas border thickness
    const w = this.canvas.width + 6;
    const h = this.canvas.height + 6;
    const cols = this.tilesArr[0];
    const rows = this.tilesArr[1];

    // calc x,y coordinates from mouse click.
    const x = Math.floor(mc.x / w * cols);
    const y = Math.floor(mc.y / h * rows);

    // calc tile index from x,y coordinates
    const index = y * cols + x;
    console.log(index);

    return index;
  },

  render() {
    // cache selected tile
    const index = this.state.selectedTile;

    const render = this.render.bind(this);

    // loop the render
    // eslint-disable-next-line no-undef
    requestAnimationFrame(render);

    // reset canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // draw selected tile
    if (index) { this.shuffledTiles[index].draw(); }

    // draw behind selected tile
    this.ctx.globalCompositeOperation = 'destination-over';

    // draw separation lines
    this.drawSeparations();

    // draw tiles
    // eslint-disable-next-line array-callback-return
    this.shuffledTiles.map((tile, i) => {
      if (index && index !== i) { tile.draw(); } else if (index === undefined) { tile.draw(); }
    });
  },
};
