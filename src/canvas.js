/** 
 * canvas manipulation
 */

import * as H from './utility'; 
import * as Settings from './settings';

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
    // coordinates between tiles position before and afteer swap
    tilesMap: [], 

    /**
     * select canvas
     */
    set: function(){

        // select canvas & context
        this.canvas = H.ele("#game-canvas");
        this.ctx = this.canvas.getContext('2d');

        // select comparison image 
        this.trueImg = H.ele("#true-image");

        // set settings
        const d = Settings.selected_difficulty;
        this.tilesArr = Settings.difficulties[ d ];
    },

    /**
     * @param {image} img
     * draw a shuffled image to canvas
     * append comparison image to true image
     */
    drawImg: function( img ){

        // cache image for global use ( global mean the canvas obj)
        this.image = img;

        // set canvas dimensions
        this.setDimensions( img );

        // cache this ref
        let self = this;

        // generate tiles
        this.generateTiles();

        // generate shuffled tiles
        let a = this.tiles.slice();
        this.shuffledTiles = this.shuffle( a );

        // add drawing coords to shuffled tiles
        this.setDrawingCoords();

        // append image 
        this.appendImg( img );

        // attach event listener 
        this.canvas.addEventListener('mousedown', function() {
             self.handleMouseDown();
        });

        // render canvas 
        this.render();
    },

    /**
     * @param {integer} width
     * @param {integer} height
     * set canvas width and height
     */
    setDimensions: function( img ){

        // compute image ratio
        let ratio = this.getImageRatio( img );

        switch( true ){

            case ratio > 1 : // wide image
                this.canvas.width = 610;
                this.canvas.height = 610 / ratio;
                break;
                
            case ratio < 1 : // tall image
                this.canvas.width = 610 / ratio;
                this.canvas.height = 610;
                break;
            
            case ratio == 1 : // square image
                this.canvas.width = 610;
                this.canvas.height = 610;
                break;

        }
    },

    /**
     * @param {img} image
     * @return {integer} ratio
     * compute and return image ratio 
     */
    getImageRatio: function( img ){

        const w = img.width; // image width
        const h = img.height; // image height

        // compute and return ratio
        return w/h;
    },

    /**
     * @param {image} img
     * append an image to the true image element
     */
    appendImg: function ( img ){

        // get source
        const source = img.src;

        // create an img element
        let e = document.createElement('img');

        // set attributes and source
        e.setAttribute( 'src', source );
        e.width = this.canvas.width;
        e.height = this.canvas.height;

        // append image
        this.trueImg.appendChild( e );
    },

    /**
     * generate shuffled tiles array 
     */
    generateTiles: function(){

        // cache this
        let self = this;

        // columns and rows array
        let a = this.tilesArr;

        // populate tiles 
        for( let x=0; x<a[0]; x++ ){

            for( let y=0; y<a[1]; y++ ){

                this.tiles.push(
                    {
                        sx: (self.canvas.width / a[0]) * x,
                        ex: (self.canvas.width / a[0]) * (x + 1),
                        sy: (self.canvas.height / a[1]) * y,
                        ey: (self.canvas.height / a[1]) * (y + 1),
                    }
                );
                
                // populate tiles map with original positions
                this.tilesMap.push((x + 1) * (y+1) - 1);
            }
        } 

        console.log(' shuffled tiles : ', this.tiles);

    },

    /**
     * @param {array} a
     * shuffle tiles & tiles map
     */
    shuffle: function( a ){

        for( let i = a.length - 1; i >= 0; i--){

            const j = Math.floor(Math.random() * a.length);

            // swap
            let x = a[i];
            a[i] = a[j];
            a[j] = x;

            // swap tiles map 
            let q = i; 
            this.tilesMap[i] = j;
            this.tilesMap[j] = q;
        }

        return a;
    },

    /** 
     * add drawing coords to ,shuffled tiles
     */
    setDrawingCoords: function(){

        // canvas selection to draw on
        const tile_w = this.canvas.width / this.tilesArr[0]; // tile width
        const tile_h = this.canvas.height / this.tilesArr[1]; // tile height

        this.shuffledTiles.map( (tile, i) => {

            // add drawing coords
            this.shuffledTiles[i].dx = (i % this.tilesArr[0]) * tile_w;
            this.shuffledTiles[i].dy = (i % this.tilesArr[1]) * tile_h;
        });
    },

    /**
     * draw separation lines to canvas
     */
    drawSeparations: function(){

        let a = this.tilesArr;

        // set x step and y step
        const stepX = this.canvas.width / a[0];
        const stepY = this.canvas.height / a[1];

        // draw vertical separations
        for ( let i=1; i <= a[0]; i++){

            this.ctx.beginPath();
            this.ctx.moveTo( stepX * i, 0);
            this.ctx.lineTo( stepX * i, this.canvas.height);
            this.ctx.stroke();
        }

        // draw horizontal separations
        for ( let i=1; i <= a[1]; i++){

            this.ctx.beginPath();
            this.ctx.moveTo( 0, stepY * i);
            this.ctx.lineTo( this.canvas.width, stepY * i);
            this.ctx.stroke();
        }
    },

    /**
     * draw a tile number n with args
     * @param {int} n
     * @param {image} img 'not really sure about type'
     */
    drawTile: function( n, img ){

        // create pointRelativePosition() alias
        let prp = this.pointRelativePosition.bind(this);

        // set up drawing arguments
        const t        = this.shuffledTiles[n];                                            // select tile

        // img selection
        const img_x    = img.width*prp(t.sx, 'x')/100;                                     // x clipping point
        const length_x = img.width*prp(t.ex, 'x')/100 - (img.width*prp(t.sx, 'x'))/100;    // img width from clipping point
        const img_y    = img.height*prp(t.sy, 'y')/100;                                    // y clipping point
        const length_y = img.height*prp(t.ey, 'y')/100 - (img.height*prp(t.sy, 'y'))/100;  // img height from clipping point

        // canvas selection to draw on
        const tile_w = this.canvas.width / this.tilesArr[0]; // tile width
        const tile_h = this.canvas.height / this.tilesArr[1]; // tile height

        this.ctx.drawImage( img,
            img_x, img_y, length_x, length_y,
            t.dx, t.dy, t.ex-t.sx, t.ey-t.sy); 
    },

    /**
     * return point relative position to canvas
     * ex: canvas of 100px / 100px and a point in 40px / 66px yields 40 / 66
     * @param {int} c
     * @param {string} x : 'x' or 'y'
     * @return {mixed}
     */
    pointRelativePosition: function( c, xoy ){
        
        // calculate c relativeness
        switch( xoy ){
            case 'x' : return c*100/this.canvas.width;break;
            case 'y' : return c*100/this.canvas.height;break;
            default : console.log('please specify point');break;
        }
    },

    handleMouseDown: function(){

        let self = this;
        
        // attach mouse move event
        this.canvas.addEventListener( 'mousemove', self.handleMouseMove);

        let clickedTile = undefined;

        console.log( this.mouseOn( this.mouseCoords()));

    },

    handleMouseMove: function(){


    },

    handleMouseUp: function(){

    },

    mouseCoords: function( evt ){

        let rect = this.canvas.getBoundingClientRect();
        return {
            x: window.clientX - rect.left,
            y: window.clientY - rect.top
        }
    },

    /**
     * return the number of tile which contain the mc
     * @param {object} mc: mouse coordinates 
     * @return {integer}
     */
    mouseOn: function( mc ){

        const w = this.canvas.width / this.tilesArr[0]; // tile width
        const h = this.canvas.height / this.tilesArr[1]; // tile height

        // coordinates for
        let mouseOn = -1;


        this.shuffledTiles.map( ( tile, i ) => {

            if( mc.x >= tile.dx &&
                mc.x <= tile.dx + w &&
                mc.y >= tile.dy &&
                mc.y <= tile.dy + h ){

                    mouseOn = i;
                }
        });

        return mouseOn;
    },

    render: function(){

        let render = this.render.bind( this );

        // loop the render
        requestAnimationFrame( render );

        // draw tiles
        this.shuffledTiles.map( ( t, i ) => {
            this.drawTile( i, this.image);
        });

        // draw separation lines
        this.drawSeparations();
    }
}