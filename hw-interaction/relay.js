/**
 * Creation Date: February 5, 2020
 * Author: Logan McDonald
 * Wrapper class for the johnny-five Relay class
 * See https://github.com/rwaldron/johnny-five/wiki/Relay for documentation
 */

const five = require("johnny-five");

module.exports = class Relay {
  /**
   *
   * @param {*} options pin, type, number
   */
  constructor(options) {
    const DEFAULT_NUMBER = 1;
    const DEFAULT_PIN = 7;
    const DEFAULT_TYPE = "NO";

    let opts = options || {};

    let pin = opts.hasOwnProperty("pin") ? opts.pin : DEFAULT_PIN;
    let type = opts.hasOwnProperty("type") ? opts.type : DEFAULT_TYPE;
    this.number = opts.hasOwnProperty("number") ? opts.number : DEFAULT_NUMBER;

    this.control = new five.Relay({
      pin: pin,
      type: type
    });
    this.turnOff();
  }

  turnOn() {
    if (this.enabled) {
      let relay = this.control;
      switch (relay.type) {
        case "NO":
          relay.open();
          break;
        case "NC":
          relay.close();
          break;
        default:
          console.log(`Unsupported relay type: ${relay.type}`);
      }
    }
  }

  turnOff() {
    let relay = this.control;
    switch (relay.type) {
      case "NO":
        relay.close();
        break;
      case "NC":
        relay.open();
        break;
      default:
        console.log(`Unsupported relay type: ${relay.type}`);
    }
  }
};
