/**
 * game settings
 * images, tile switching mode, blind mode ...
 */
module.exports = {

  // images
  images: [
    'assets/levels-images/lvl1-image.jpg',
    'assets/levels-images/lvl2-image.jpg',
    'assets/levels-images/lvl3-image.jpg',
  ],

  // tile switching mode
  // default :drag & drop
  // other modes : point and click
  switch_mode: 'drag n drop',

  // blind mode
  // default: false
  // turn true to disable comparison image
  blind_mode: false,

  // game difficulties
  difficulties: {
    easy: [5, 4],
    normal: [8, 6],
    hard: [12, 9],
  },

  // game selected difficulty
  // default: easy
  selected_difficulty: 'easy',
};
