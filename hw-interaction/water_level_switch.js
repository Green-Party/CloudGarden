/**
 * Creation Date: February 10, 2020
 * Author: Logan McDonald
 * Class to represent the water level switch
 * Wrapper for the johnny-five Switch class
 * See https://github.com/rwaldron/johnny-five/wiki/Switch for more documentation
 */

const five = require("johnny-five");

module.exports = class WaterLevelSwitch {
  /**
   *
   * @param {*} options pin, type, slave
   */
  constructor(options) {
    const DEFAULT_PIN = 7;
    const DEFAULT_TYPE = "NC";

    let opts = options || {};
    let pin = opts.hasOwnProperty("pin") ? opts.pin : DEFAULT_PIN;
    let type = opts.hasOwnProperty("type") ? opts.type : DEFAULT_TYPE;

    this.slave = opts.hasOwnProperty("slave") ? opts.slave : null;
    this.sensor = new five.Switch({
      pin: pin,
      type: type
    });

    // Events:
    // "open"  - emitted when circuit opens
    // "close" - emitted when circuit closes
    this.sensor.on("open", this.openCallback);
    this.sensor.on("close", this.closeCallback);
  }

  openCallback() {
    console.log("Switch is open");
    if (this.slave) {
      this.slave.disable();
    }
  }

  closeCallback() {
    console.log("Switch is closed");
    if (this.slave) {
      this.slave.enable();
    }
  }
};
