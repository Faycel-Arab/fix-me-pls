/* eslint-disable no-underscore-dangle */
/* eslint-disable no-multi-spaces */
export default class Tile {
  constructor(_2D_CTX, img, params) {
    // set tile params
    this.positionX = params.positionX;
    this.positionY = params.positionY;
    this.width = params.width;
    this.height = params.height;
    this.XClipPoint = params.XClipPoint;
    this.XClipPointEnd = params.XClipPointEnd;
    this.YClipPoint = params.YClipPoint;
    this.YClipPointEnd = params.YClipPointEnd;

    // draw positions
    this.drawPosX = params.drawPosX;
    this.drawPosY = params.drawPosY;
    this.dockedPosX = params.drawPosX;
    this.dockedPosY = params.drawPosY;

    // set tile image for drawing and 2D Context
    this.img = img;
    this._2D_CTX = _2D_CTX;
  }

  move(x, y) {
    this.drawPosX += x;
    this.drawPosY += y;
  }

  dock(x, y) {
    this.drawPosX = x;
    this.drawPosY = y;
    this.dockedPosX = x;
    this.dockedPosY = y;
  }

  draw() {
    this._2D_CTX.drawImage(
      this.img,
      this.XClipPoint,
      this.YClipPoint,
      this.XClipPointEnd,
      this.YClipPointEnd,
      this.drawPosX,
      this.drawPosY,
      this.width,
      this.height
    );
  }
}
