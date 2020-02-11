const five = require("johnny-five");

module.exports = class ThermoSensor {
  constructor(address, options) {
    const DEFAULT_NUMBER = 1;

    const DEFAULT_PIN = 22;
    const DEFAULT_CONTROLLER = "DS18B20";
    const DEFAULT_FREQ = 1000;

    let opts = options || {};

    let pin = opts.hasOwnProperty("pin") ? opts.pin : DEFAULT_PIN;
    let controller = opts.hasOwnProperty("controller")
      ? opts.controller
      : DEFAULT_CONTROLLER;
    let freq = opts.hasOwnProperty("freq") ? opts.freq : DEFAULT_FREQ;

    this.sensor = new five.Thermometer({
      address: address,
      pin: pin,
      controller: controller,
      freq: freq
    });

    this.reading = NaN;
    this.number = opts.hasOwnProperty("number") ? opts.number : DEFAULT_NUMBER;

    // available events are
    //"data"  : emitted on freq interval
    //"change": emitted when temperature changes
    this.sensor.on("data", this.defaultEventCallback);
    // this.sensor.on("change", this.defaultEventCallback);
  }

  defaultEventCallback() {
    let address = this.sensor.address;
    let celsius = this.sensor.celsius;
    this.reading = celsius;
    console.log(`Thermometer number: ${this.number.toString(16)}`);
    console.log(`Thermometer data at address: 0x${address.toString(16)}`);
    console.log("Celsius: %d", celsius);
  }

  getReading() {
    return this.reading;
  }

  getNumber() {
    return this.number;
  }
};
