const Pump = require("./pump");

module.exports = class Pumps {
  constructor(pins, type) {
    const DEFAULT_PINS = [3, 4, 5];
    const DEFAULT_TYPE = "NC";

    if (!pins) {
      pins = DEFAULT_PINS;
    }

    if (!type) {
      type = DEFAULT_TYPE;
    }

    this.controls = pins.map((pin, idx, arr) => {
      return new Pump(pin, type, idx + 1);
    });
  }

  turnOn(idx) {}

  turnOff(idx) {}
};
