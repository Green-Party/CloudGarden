const Light = require("./light");

module.exports = class Lights {
  constructor(pins, type) {
    const DEFAULT_PINS = [6];
    const DEFAULT_TYPE = "NO";

    if (!pins) {
      pins = DEFAULT_PINS;
    }

    if (!type) {
      type = DEFAULT_TYPE;
    }

    this.controls = pins.map((pin, idx, arr) => {
      return new Light({
        pin: pin,
        type: type,
        number: idx + 1
      });
    });
  }

  turnOn(idx) {
    this.controls[idx].turnOn();
  }

  turnOff(idx) {
    this.controls[idx].turnOff();
  }
};
