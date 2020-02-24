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

  isOn() {
    return !this.control.isOn;
  }

  turnOn() {
    let returnState = undefined;
    switch (this.control.type) {
      case "NO":
        this.control.open();
        console.log(this.isOn());
        returnState = this.isOn();
        break;
      case "NC":
        this.control.close();
        console.log(this.isOn());
        returnState = this.isOn();
        break;
      default:
        console.log(`Unsupported relay type: ${this.control.type}`);
    }
    return returnState;
  }

  turnOff() {
    let returnState = undefined;
    switch (this.control.type) {
      case "NO":
        this.control.close();
        returnState = !this.isOn();
        break;
      case "NC":
        this.control.open();
        returnState = !this.isOn();
        break;
      default:
        console.log(`Unsupported relay type: ${this.control.type}`);
    }
    return returnState;
  }
};
