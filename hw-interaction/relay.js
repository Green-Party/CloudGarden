const five = require("johnny-five");

module.exports = class Relay {
  constructor(pin, type, number) {
    this.number = number;
    
    this.control = new five.Relay({
      pin: pin,
      type: type
    });
  }

  turnOn() {
    let relay = this.control;
    switch (relay.type) {
      case "NO":
        relay.open();
        break;
      case "NC":
        relay.close();
        break;
      default:
        console.log(`Unsupported relay type: ${relay.type}`);
    }
  }

  turnOff() {
    let relay = this.control;
    switch (relay.type) {
      case "NO":
        relay.close();
        break;
      case "NC":
        relay.open();
        break;
      default:
        console.log(`Unsupported relay type: ${relay.type}`);
    }
  }
};
