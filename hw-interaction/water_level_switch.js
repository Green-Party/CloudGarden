/**
 * Creation Date: February 10, 2020
 * Author: Logan McDonald
 * Class to represent the water level switch
 * Wrapper for the johnny-five Switch class
 * See https://github.com/rwaldron/johnny-five/wiki/Switch for more documentation
 */

const five = require("johnny-five");
const Notification = require("./Azure/notification");

module.exports = class WaterLevelSwitch {
  /**
   *
   * @param {*} options pin, type, slave
   */
  constructor(options) {
    const DEFAULT_PIN = 23;
    const DEFAULT_TYPE = "NC";

    let opts = options || {};
    let pin = opts.hasOwnProperty("pin") ? opts.pin : DEFAULT_PIN;
    let type = opts.hasOwnProperty("type") ? opts.type : DEFAULT_TYPE;

    this.canSendNotification = true;
    this.slave = opts.hasOwnProperty("slave") ? opts.slave : null;
    this.sensor = new five.Switch({
      pin: pin,
      type: type
    });

    // Events:
    // "open"  - emitted when circuit opens
    // "close" - emitted when circuit closes
    this.sensor.on("open", this.openCallback.bind(this));
    this.sensor.on("close", this.closeCallback.bind(this));
  }

  openCallback() {
    console.log("Switch is open");
    if (this.slave) {
      this.slave.turnOff();
      this.slave.disable();

      const payload = {
        title: "Water Level Warning!",
        body:
          "Water resevoir levels have fallen below usable levels. Please refill."
      };
      if (this.canSendNotification) {
        Notification.sendNotification(payload);
        this.canSendNotification = false;
      }
    } else {
      console.log("Can't notify, no subscription yet.");
    }
  }

  closeCallback() {
    console.log("Switch is closed");
    if (this.slave) {
      this.slave.enable();
      this.canSendNotification = true;
    }
  }
};
