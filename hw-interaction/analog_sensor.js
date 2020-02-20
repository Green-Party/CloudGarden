const five = require("johnny-five");

module.exports = class AnalogSensor {
  constructor(options) {
    const DEFAULT_PIN = "A3";
    const DEFAULT_FREQ = 1000;
    const DEFAULT_THRESHOLD = 10;

    let opts = options || {};

    this.reading = NaN;

    let pin = opts.hasOwnProperty("pin") ? opts.pin : DEFAULT_PIN;
    let freq = opts.hasOwnProperty("freq") ? opts.freq : DEFAULT_FREQ;
    let threshold = opts.hasOwnProperty("threshold")
      ? opts.threshold
      : DEFAULT_THRESHOLD;

    this.sensor = new five.Sensor({
      pin: pin,
      freq: freq,
      threshold: threshold
    });
  }

  getReading() {
    return this.reading;
  }
};
