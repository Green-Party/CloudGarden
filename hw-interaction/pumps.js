/**
 * Creation Date: February 5, 2020
 * Author: Logan McDonald
 * Class to extend the functionality of the Pump class to multiple objects
 */

const Pump = require("./pump");

module.exports = class Pumps {
  /**
   *
   * @param {*} options pins, type, enabled
   */
  constructor(options) {
    // const DEFAULT_PINS = [3, 4, 5];
    const DEFAULT_PINS = [53, 51, 49];
    const DEFAULT_TYPE = "NO";

    let opts = options || {};

    let pins = opts.hasOwnProperty("pins") ? opts.pins : DEFAULT_PINS;
    let type = opts.hasOwnProperty("type") ? opts.type : DEFAULT_TYPE;
    this.enabled = opts.hasOwnProperty("enabled") ? opts.enabled : true;

    this.controls = pins.map((pin, idx, arr) => {
      return new Pump({
        pin: pin,
        type: type,
        number: idx + 1,
        enabled: this.enabled
      });
    });
  }

  turnOn(idx) {
    if (this.enabled) {
      if (idx == null) {
        this.controls.map(pump => {
          pump.turnOn();
        });
      } else if (idx < this.controls.length) {
        this.controls[idx].turnOn();
      }
    }
  }

  turnOff(idx) {
    if (this.enabled) {
      if (idx == null) {
        this.controls.map(pump => {
          pump.turnOff();
        });
      } else if (idx < this.controls.length) {
        this.controls[idx].turnOff();
      }
    }
  }

  enable() {
    this.enabled = true;
    this.controls.map(pump => {
      pump.enable();
    });
  }

  disable() {
    this.enabled = false;
    this.controls.map(pump => {
      pump.disable();
    });
  }

  isEnabled() {
    return this.enabled;
  }
};
