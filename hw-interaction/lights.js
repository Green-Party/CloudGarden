const Light = require("./light");

module.exports = class Lights {
  constructor(pins, type) {
    const DEFAULT_PINS = [6];
    const DEFAULT_TYPE = "NC";

    if (!pins) {
      pins = DEFAULT_PINS;
    }

    if (!type) {
      type = DEFAULT_TYPE;
    }

    this.controls = pins.map((pin, idx, arr) => {
      return new Light(pin, type, idx + 1);
    });
  }
};
