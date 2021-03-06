/**
 * Creation Date: February 5, 2020
 * Author: Logan McDonald
 * Class to extend the functionality of the Light class to multiple objects
 */

const Light = require("./light");

module.exports = class Lights {
  /**
   *
   * @param {*} options pins, type
   */
  constructor(options) {
    const DEFAULT_PINS = [47];
    const DEFAULT_TYPE = "NO";

    let opts = options || {};

    let pins = opts.hasOwnProperty("pins") ? opts.pins : DEFAULT_PINS;
    let type = opts.hasOwnProperty("type") ? opts.type : DEFAULT_TYPE;

    this.controls = pins.map((pin, idx, arr) => {
      return new Light({
        pin: pin,
        type: type,
        number: idx + 1
      });
    });
  }

  turnOn(idx) {
    if (idx < this.controls.length) {
      this.controls[idx].turnOn();
    }
  }

  turnOff(idx) {
    if (idx < this.controls.length) {
      this.controls[idx].turnOff();
    }
  }
};
