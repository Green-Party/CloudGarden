/**
 * Creation Date: February 3, 2020
 * Author: Luke Slevinsky
 * Module for utility functions
 */

module.exports = {
  sleep,
  setExactInterval
};

/**
 * Adapted from: https://stackoverflow.com/a/49813472
 * @param {*} millis
 */
function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

/**
 * Adapted from: https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript
 * @param {*} interval
 * @param {*} callback
 */
function setExactInterval(interval, callback) {
  let timer = { id: null };
  let expected = Date.now() + interval;
  timer.id = setTimeout(step, interval);
  function step() {
    var dt = Date.now() - expected;
    if (dt > interval) {
    }
    callback();
    expected += interval;
    timer.id = setTimeout(step, Math.max(0, interval - dt));
  }
  return timer;
}
