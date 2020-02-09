const five = require("johnny-five");

const freq = 1000;
const thermoPin = 22;
const thermoAddresses = [0x119129d8cf1, 0x119129606db, 0x11912c86a76];
var addrToNum;

function setAddrToNum() {
  addrToNum = thermoAddresses.reduce((obj, addr, idx) => {
    obj[addr] = idx + 1;
    return obj;
  }, {});
}

function getThermoNum(addr) {
  if (!addrToNum) {
    return null;
  } else {
    return addrToNum[addr];
  }
}

module.exports = {
  initialize
};

function initialize(addresses) {
  if (addresses == null) {
    addresses = thermoAddresses;
  }
  setAddrToNum(addresses);

  let thermoSensors = addresses.map((addr, idx, arr) => {
    return new five.Thermometer({
      controller: "DS18B20",
      pin: thermoPin,
      address: addr,
      freq: freq
    });
  });

  thermoSensors.map((thermo, idx, arr) => {
    thermo.on("data", () => {
      const { address, celsius, fahrenheit, kelvin } = thermo;
      console.log(`Thermometer number: ${getThermoNum(address).toString(16)}`);
      console.log(`Thermometer data at address: 0x${address.toString(16)}`);
      console.log("celsius: %d", celsius);
    });
    // thermo.on("change", () => {
    //   const { address, celsius, fahrenheit, kelvin } = temp2;
    //   console.log(`Thermometer change at address: 0x${address.toString(16)}`);
    // });
  });
  return thermoSensors;
}
