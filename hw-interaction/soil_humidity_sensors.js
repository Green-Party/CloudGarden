const SoilHumiditySensor = require("./soil_humidity_sensor");

module.exports = class SoilHumiditySensors {
  constructor(pins) {
    const DEFAULT_PINS = ["A0", "A1", "A2"];

    if (!pins) {
      pins = DEFAULT_PINS;
    }

    this.sensors = pins.map((pin, idx, arr) => {
      return new SoilHumiditySensor(pin, idx + 1);
    });
  }
};
