const five = require("johnny-five");

module.exports = class Relay {
  /**
   *
   * @param {*} options pin, type, number, enabled
   */
  constructor(options) {
    const DEFAULT_NUMBER = 1;
    const DEFAULT_PIN = 7;
    const DEFAULT_TYPE = "NO";

    let opts = options || {};

    let pin = opts.hasOwnProperty("pin") ? opts.pin : DEFAULT_PIN;
    let type = opts.hasOwnProperty("type") ? opts.type : DEFAULT_TYPE;

    this.number = opts.hasOwnProperty("number") ? opts.number : DEFAULT_NUMBER;
    this.enabled = opts.hasOwnProperty("enabled") ? opts.enabled : true;
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

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }
};
