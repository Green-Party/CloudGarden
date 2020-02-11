/**
 * Creation Date: January 28, 2020
 * Author: Logan McDonald
 * Main sensor interaction methods
 */

const five = require("johnny-five");
const Si1145 = require("./si1145");
const ThermoSensors = require("./thermo_sensors");
const SoilHumiditySensors = require("./soil_humidity_sensors");
const Pumps = require("./pumps");
const Light = require("./light");
const WaterLevelSwitch = require("./water_level_switch");

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

const temp = {
  3: 0x11912c86a76
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

    const thermoSensors = new ThermoSensors();

    const soilHumiditySensors = new SoilHumiditySensors();

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

    // pumps - controlled through relays at pins 3,4,5
    controls.pumps = new Pumps({
      enabled: false
    });

    const waterLevelSwitch = new WaterLevelSwitch({
      slave: controls.pumps
    });

    // grow light - controlled through relay at pin 6
    controls.light = new Light({
      pin: 6,
      type: "NC",
      number: 1
    });

    configureLightTimeInterval();

    setInterval(() => {
      readings.temp = thermoSensors.getReadings();
      readings.soilHumidity = soilHumiditySensors.getReadings();
      if (si1145.deviceActive()) {
        si1145.getDataFromDevice(err => {
          if (!err) {
            readings.visible = si1145.device.parameters[0].value;
            readings.ir = si1145.device.parameters[1].value;
            readings.uvIdx = si1145.device.parameters[2].value;
          }
        });
      }
    }, 1000);
  });
}

// configure to run for 15 mins at the beginning of every hour
function configureLightTimeInterval() {
  let minutes = Date.now().getMinutes();
  if (minutes > 15) {
    // do something
    controls.light.turnOff();
    setTimeout(configureLightTimeInterval, Math.max(0, (45 - minutes) * 60000));
  } else {
    // do something
    controls.light.turnOn();
    setTimeout(configureLightTimeInterval, Math.max(0, (15 - minutes) * 60000));
  }
}

async function runPump(idx) {
  if (controls.pumpsEnabled) {
    controls.pumps[idx].turnOn();
    await utils.sleep(4000);
    controls.pumps[idx].turnOff();
  }
}

function toggleLight() {
  controls.light.control.toggle();
}
