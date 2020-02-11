const five = require("johnny-five");

module.exports = class SoilHumiditySensor {
  constructor(options) {
    const DEFAULT_NUMBER = 1;
    const DEFAULT_PIN = 7;
    const DEFAULT_FREQ = 1000;
    const DEFAULT_THRESHOLD = 10;

    let opts = options || {};

    this.reading = NaN;
    this.number = opts.hasOwnProperty("number") ? opts.number : DEFAULT_NUMBER;

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

    // emits two events:
    // "change": occurs when change in reading is >= threshold
    // "data"  : occurs at 'freq' interval
    this.sensor.on("data", this.defaultEventCallback);
  }

  defaultEventCallback() {
    let reading = this._convertReading(this.sensor.raw);
    this.reading = reading;
    console.log(`Soil sensor: ${this.number}`);
    console.log(`Reading: ${reading}`);
  }

  getReading() {
    return this.reading;
  }

  _convertReading(reading) {
    // TODO: implement conversion
    return reading;
  }
};
