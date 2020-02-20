/**
 * Creation Date: January 28, 2020
 * Author: Logan McDonald
 * Main sensor interaction methods for CloudGarden
 */

const five = require("johnny-five");

// Sensors
const Si1145 = require("./si1145");
const ThermoSensors = require("./thermo_sensors");
const SoilHumiditySensors = require("./soil_humidity_sensors");
const WaterLevelRuler = require("./water_level_ruler");

const WaterLevelSwitch = require("./water_level_switch");

// Controls
const Pumps = require("./pumps");
const Light = require("./light");

module.exports = {
  initialize
};

let readings = {
  visible: 0,
  ir: 0,
  uvIdx: 0,
  temp: [0, 0, 0],
  soilHumidity: [0, 0, 0],
  waterLevel: 0
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
    const si1145 = new Si1145({
      board: board
    });

    si1145.initialize(() => {
      if (si1145.deviceActive()) {
        setInterval(() => {
          if (si1145.deviceActive()) {
            console.log("Getting data...");
            si1145.getDataFromDevice(err => {
              if (!err) {
                console.log(`Visible: ${si1145.device.parameters[0].value}`);
                console.log(`IR: ${si1145.device.parameters[1].value}`);
                console.log(`UVIndex: ${si1145.device.parameters[2].value}`);
                readings.visible = si1145.device.parameters[0].value;
                readings.ir = si1145.device.parameters[1].value;
                readings.uvIdx = si1145.device.parameters[2].value;
              } else {
                console.error(`Error: ${err}`);
              }
            });
          } else {
            console.error("Error: Device not active.");
          }
        }, 1000);
      } else {
        console.error("Error: SI1145 device not found.");
      }
    });

    const thermoSensors = new ThermoSensors();

    const soilHumiditySensors = new SoilHumiditySensors();

    // eTape water level sensor
    const waterLevelRuler = new WaterLevelRuler();

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
      type: "NC"
    });

    configureLightTimeInterval();

    setInterval(() => {
      readings.temp = thermoSensors.getReadings();
      readings.soilHumidity = soilHumiditySensors.getReadings();
      readings.waterLevel = waterLevelRuler.getReading();
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
