
/**
 * @name game
 * @package utility.js
 * @author Arab Faycel
 */

import * as H from './utility';
import Screen from './screen';
import * as State from './state';
import * as Settings from './settings';
import * as Canvas from './canvas';

export default class Game{

    /**
     * Creates an instance of game.
     * @memberof game
     */
    constructor(){
        this.home = document.querySelector("#home-game");
        this.game = document.querySelector("#game-game");
    }

    /**
     * @memberof game
     * @description starts the game
     */
    static start(){

        // set the game state
        State.set();

        // set the canvas
        Canvas.set();

        // load lvl image
        let image = new Image();
        image.onload = () => {

            // draw image to canvas
            Canvas.drawImg( image );

            // display game screen
            Screen.showGame();

            // start level timer
            State.Timer.startLvlTimer();
        }

        image.src = Settings.images[ State.level - 1 ];
    }


}