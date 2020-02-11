/**
 * Creation Date: February 3, 2020
 * Author: Luke Slevinsky
 * Module for utility functions
 * Adapeted from: https://stackoverflow.com/a/49813472
 */

module.exports = {
  sleep
};

function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

function setExactInterval(interval, callback) {
  var expected = Date.now() + interval;
  setTimeout(step, interval);
  function step() {
    var dt = Date.now() - expected;
    if (dt > interval) {
      // something really bad happened
    }
    callback();
    expected += interval;
    setTimeout(step, Math.max(0, interval - dt));
  }
}
