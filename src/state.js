/**
 * Game state 
 */

import Screen from './screen';

module.exports = {

    // game current level
    level: null,

    // time records
    records: [],

    /* setters */

    // set state 
    set: function(){

        // set level number
        this.level = 1;

        // update level view
        Screen.updateLvlNumber( this.level );
    },

    // next level 
    nextLevel: function(){

        // set next level
        this.level++;

        // update level view
        Screen.updateLvlNumber( this.level );
    },

    // timer control
    Timer: {

        // level timer
        lvlTimer: 0,

        // total time
        totalTime: 0,

        // start level timer
        startLvlTimer: function() {

            let self = this;

            let loop = setInterval( () => {
                
                // add a tick
                self.lvlTimer++;
                
                // update lvl timer view
                Screen.updateLvlTimer( self.lvlTimer );
            }, 1000);
        }
    }  
    
};