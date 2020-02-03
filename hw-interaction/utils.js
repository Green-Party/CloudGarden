/**
 * Creation Date: February 3, 2020
 * Author: Luke Slevinsky
 * Module for utility functions
 */

module.exports = {
  sleep
};

function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}
