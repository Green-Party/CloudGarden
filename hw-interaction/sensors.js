/**
 * Creation Date: January 28, 2020
 * Author: Logan McDonald
 * Main sensor interaction methods
 */

const five = require("johnny-five");
const Si1145 = require("./si1145");
const utils = require("./utils");

module.exports = {
  initialize,
  runPump,
  toggleLight
};

let readings = {
  visible: 0,
  ir: 0,
  uvIdx: 0,
  soilHumidity: [0, 0, 0],
  temp: [0, 0, 0]
};

let controls = {
  pumps: null,
  light: null,
  pumpsEnabled: false
};

function initialize() {
  let board = new five.Board();

  board.on("ready", async function() {
    // light sensor
    // code adapted from Arduino Adafruit_SI1145_Library library
    const si1145 = new Si1145({
      opts: {
        board: this
      }
    });

    setInterval(() => {
      if (si1145.deviceActive()) {
        si1145.getDataFromDevice(err => {
          if (!err) {
            readings.visible = si1145.device.parameters[0].value;
            readings.ir = si1145.device.parameters[1].value;
            readings.uvIdx = si1145.device.parameters[2].value;
          }
        });
      }
    }, 500);

    // temperature sensor * 3
    const addresses = [1, 2, 3];
    let tempSensors = addresses.map((addr, idx, arr) => {
      return new five.Thermometer({
        controller: "DS18B20",
        pin: 2,
        address: addr
        // freq: TBD
      });
    });

    tempSensors.map((temp, idx, arr) => {
      temp.on("data", () => {
        const { address, celsius, fahrenheit, kelvin } = temp;
        console.log(`Thermometer data at address: 0x${address.toString(16)}`);
        readings.temp[idx] = celsius;
      });
      // temp2.on("change", () => {
      //   const { address, celsius, fahrenheit, kelvin } = temp2;
      //   console.log(`Thermometer change at address: 0x${address.toString(16)}`);
      // });
    });

    // soil humidity sensor
    const soilMoisturePins = ["A0", "A1", "A2"];
    let soilSensors = soilMoisturePins.map((pin, idx, arr) => {
      return new five.Sensor({
        pin: pin,
        freq: 1000
        // threshold: TBD,
      });
    });

    // emits two events:
    // change: occurs when reading is >= threshold
    // data: occurs at 'freq' interval
    soilSensors.map((sensor, idx, arr) => {
      sensor.on("data", () => {
        let reading = this.raw;
        readings.soilHumidity[idx] = reading;
        console.log(`Soil data at index 0: ${reading}`);
      });
      // sensor.on("change", () => {
      //   let reading = this.raw;
      //   console.log(`Soil data at index 0: ${reading}`);
      // });
    });

    // eTape water level sensor
    waterLevelRuler = new five.Sensor({
      pin: "A3",
      freq: 500
      // threshold: TBD,
    });

    waterLevelRuler.on("data", () => {
      let reading = this.raw;
      console.log(`Water level reading: ${reading}`);
    });

    // switch based water level sensor
    // NO switch
    // output HIGH when closed, indicates sufficient liquid
    // output LOW when open, indicates low liquid
    waterLevelSwitch = new five.Switch(7);
    waterLevelSwitch.on("open", () => {
      controls.pumpsEnabled = false;
    });

    waterLevelSwitch.on("close", () => {
      controls.pumpsEnabled = true;
    });

    // pumps - controlled through relays at pins 3,4,5
    // relays configured to be NO
    controls.pumps = new five.Relays([3, 4, 5]);

    // grow light - controlled through relay at pin 6
    // relay configured to be NO
    controls.light = new five.Relay(6);
  });
}

async function runPump(idx) {
  if (controls.pumpsEnabled) {
    controls.pumps[idx].on();
    await utils.sleep(4000);
    controls.pumps[idx].off();
  }
}
function toggleLight() {
  controls.light.toggle();
}
