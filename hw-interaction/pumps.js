const Pump = require("./pump");

module.exports = class Pumps {
  /**
   *
   * @param {*} options pins, type, enabled
   */
  constructor(options) {
    const DEFAULT_PINS = [3, 4, 5];
    const DEFAULT_TYPE = "NO";

    let opts = options || {};

    let pins = opts.hasOwnProperty("pins") ? opts.pins : DEFAULT_PINS;
    let type = opts.hasOwnProperty("type") ? opts.type : DEFAULT_TYPE;
    this.enabled = opts.hasOwnProperty("enabled") ? opts.enabled : true;

    this.controls = pins.map((pin, idx, arr) => {
      return new Pump({
        pin: pin,
        type: type,
        number: idx + 1,
        enabled: enabled
      });
    });

    // this.turnOn = idx => {
    //   if (this.enabled && idx < this.controls.length) {
    //     this.controls[idx].turnOn();
    //   }
    // };
  }

  turnOn(idx) {
    if (this.enabled && idx < this.controls.length) {
      this.controls[idx].turnOn();
    }
  }

  turnOff(idx) {
    if (idx < this.controls.length) {
      this.controls[idx].turnOff();
    }
  }

  enable() {
    this.enabled = true;
    this.controls.map(pump => {
      pump.enable();
    });
  }

  disable() {
    this.enabled = false;
    this.controls.map(pump => {
      pump.disable();
    });
  }

  isEnabled() {
    return this.enabled;
  }
};
