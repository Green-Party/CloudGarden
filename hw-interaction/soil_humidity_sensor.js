const five = require("johnny-five");

module.exports = class SoilHumiditySensor {
  constructor(pin, number, options) {
    const DEFAULT_FREQ = 1000;
    const DEFAULT_THRESHOLD = 10;

    this.number = number;

    let opts = options || {};

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
    this.sensor.on("data", this.defaultCallback);
  }

  defaultCallback() {
    let reading = this._convertReading(this.sensor.raw);
    console.log(`Soil sensor: ${this.number}`);
    console.log(`Reading: ${reading}`);
  }

  _convertReading(reading) {
    // TODO: implement conversion
    return reading;
  }
};
