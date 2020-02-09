const five = require("johnny-five");

const relayPins = [3, 4, 5, 6];
const type = "NC";

module.exports = {
  initialize,
  turnOn,
  turnOff,
  getLightPins,
  getPumpPins
};

const pumpPins = relayPins.slice(0, 3);
const lightPins = relayPins.slice(3);

function initialize(pins) {
  if (pins == null) {
    pins = relayPins;
  }
  let relays = pins.map((pin, idx, arr) => {
    return new five.Relay({
      pin: pin,
      type: type
    });
  });

  return relays;
}

function turnOn(relay) {
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

function turnOff(relay) {
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

function getLightPins() {
  return lightPins;
}

function getPumpPins() {
  return pumpPins;
}
