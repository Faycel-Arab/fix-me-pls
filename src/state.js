/**
 * Game state
 */

// eslint-disable-next-line import/no-cycle
import Screen from './screen';

module.exports = {
  // game current level
  level: null,

  // time records
  records: [],

  /* setters */

  // set state
  set() {
    // set level number
    this.level = 1;

    // update level view
    Screen.updateLvlNumber(this.level);
  },

  // next level
  nextLevel() {
    // set next level
    this.level = this.level + 1;

    // update level view
    Screen.updateLvlNumber(this.level);
  },

  // timer control
  Timer: {
    // level timer
    lvlTimer: 0,

    // total time
    totalTime: 0,

    // start level timer
    startLvlTimer() {
      const self = this;

      // eslint-disable-next-line no-unused-vars
      const loop = setInterval(() => {
        // add a tick
        self.lvlTimer += 1;

        // update lvl timer view
        Screen.updateLvlTimer(self.lvlTimer);
      }, 1000);
    },
  },
};
