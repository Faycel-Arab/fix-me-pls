/* eslint-disable no-param-reassign */
/**
 * helper functions
 */
module.exports = {
  /**
   * select a dom
   */

  ele(ele) {
    // eslint-disable-next-line no-undef
    return document.querySelector(ele);
  },

  /**
   * display provided dom element
   */
  display(ele) {
    // make sure ele is a DOM element
    if (this.isDOM(ele)) {
      ele.style.display = 'block';
    } else {
      console.error('Error while trying to display a non DOM object');
    }
  },

  /**
   * hide provided dom element
   */
  hide(ele) {
    // make sure ele is a DOM element
    // we do this by checking if it has a display style property
    if (ele && typeof ele.style.display === 'string') {
      ele.style.display = 'none';
    } else {
      console.error('Error while trying to hide a non DOM object');
    }
  },

  /**
   * check if a var is a DOM
   */
  isDOM(a) {
    if (typeof a === 'object' && a.nodeType !== undefined) {
      return true;
    }

    return false;
  },

  /**
   * @param {integer} a
   */
  makeTime(a) {
    // calculate minutes
    let mm = Math.floor(a / 60);
    // add a leading zero if a single digit
    if (mm.toString().length === 1) {
      mm = `0${mm}`;
    }

    // calculate seconds
    let ss = a % 60;
    // add a leading zero if a single digit
    if (ss.toString().length === 1) {
      ss = `0${ss}`;
    }
    const time = `${mm}:${ss}`;

    return time;
  },

  mouseCoords(evt, canvas) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  },
};
