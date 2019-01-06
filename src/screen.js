/**
 * @name screen
 * @package utility.js
 * @author Arab Faycel
 */

import * as H from './utility';
import Game from './game';

export default class Screen{

    /**
     * Creates an instance of screen.
     * @memberof screen
     */
    constructor(){
        this.home = document.querySelector("#home-screen");
        this.game = document.querySelector("#game-screen");
    }

    /**
     * @memberof screen
     * @description display home screen
     */
    static showHome(){

        // hide game screen
        const game = H.ele('#game-screen');
        H.hide( game );

        // display home screen
        const home = H.ele('#home-screen');
        H.display( home );
    }

    /**
     * @memberof screen
     * @description display entry screen
     */
    static showEntry(){

        // display home first
        this.showHome();

        const entry = document.querySelector('#entry');
        H.display( entry );

        // selecting buttons
        const start_btn = H.ele("#game-start");
        const settings_btn = H.ele("#show-settings");
        const credits_btn = H.ele("#show-credits");

        // attach events
        start_btn.addEventListener('click', () => {
            Game.start();
        });

    }

    /**
     * @memberof screen
     * @description display game screen
     */
    static showGame(){

        // hide home screen
        const home = H.ele('#home-screen');
        H.hide( home );

        // display game screen
        const game = H.ele('#game-screen');
        H.display( game );
    }

    /**
     * @memberof screen
     * @param {integer} val
     * @description level timer view update
     */
    static updateLvlTimer( val ){

        const lvlTimer = H.ele('#timer');
        lvlTimer.innerHTML = "Level Timer : " + H.makeTime( val );
    }

    /**
     * @memberof screen
     * @param {integer} val
     * @description total timer view update
     */
    static updateTotalTimer( val ){

        const totalTimer = H.ele('#total');
        totalTimer.innerHTML = "Game Timer : " + H.makeTime( val );
    }

    /**
     * @memberof screen
     * @param {integer} val
     * @description level number view update
     */
    static updateLvlNumber( val ){

        const lvlNumber = H.ele('#level-number');
        lvlNumber.innerHTML = "Level : " + val;
    }
}