/**
 * Creation Date: January 28, 2020
 * Author: Logan McDonald
 * Main sensor interaction methods for CloudGarden
 */

const five = require("johnny-five");
const utils = require("./utils");

// Sensors
const Si1145 = require("./si1145");
const ThermoSensors = require("./thermo_sensors");
const SoilHumiditySensors = require("./soil_humidity_sensors");
const WaterLevelRuler = require("./water_level_ruler");

const WaterLevelSwitch = require("./water_level_switch");

// Controls
const Pumps = require("./pumps");
const Light = require("./light");

let readings = {
  visible: 0,
  ir: 0,
  uv_index: 0,
  water_level: 0,
  temperature: [-40, -40, -40],
  soil_moisture: [0, 0, 0],
  pump_senabled: false
};

let controls = {
  pumps: null,
  light: null
};

const interval = 5000;
const pumpTime = 2000;

function initialize(state) {
  let board = new five.Board();

  state.sensorData = readings;

  board.on("ready", async function() {
    // light sensor
    const si1145 = new Si1145({
      board: board
    });

    si1145.initialize(() => {
      if (si1145.deviceActive()) {
        setInterval(() => {
          if (si1145.deviceActive()) {
            si1145.getDataFromDevice(err => {
              if (!err) {
                readings.visible = si1145.device.parameters[0].value;
                readings.ir = si1145.device.parameters[1].value;
                readings.uv_index = si1145.device.parameters[2].value;
                console.log(`Visible: ${si1145.device.parameters[0].value}`);
                console.log(`IR: ${si1145.device.parameters[1].value}`);
                console.log(`UVIndex: ${si1145.device.parameters[2].value}`);
              } else {
                console.error(`Error: ${err}`);
              }
            });
          } else {
            console.error("Error: Device not active.");
          }
        }, interval);
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

    const _waterLevelSwitch = new WaterLevelSwitch({
      slave: controls.pumps
    });

    // grow light - controlled through relay at pin 6
    controls.light = new Light({
      pin: 47,
      type: "NO"
    });

    configureLightTimeInterval();

    setInterval(() => {
      readings.temperature = thermoSensors.getReadings();
      console.log(`Temperature: ${readings.temperature}`);
      readings.soil_moisture = soilHumiditySensors.getReadings();
      console.log(`Soil humidity: ${readings.soil_moisture}`);
      readings.water_level = waterLevelRuler.getReading();
      console.log(`Water level: ${readings.water_level}`);
      readings.pumps_enabled = controls.pumps.isEnabled();
      console.log(`Pumps enabled: ${readings.pumps_enabled}`);
    }, interval);
  });
}

// configure to run for 15 mins at the beginning of every hour
function configureLightTimeInterval() {
  let date = new Date(Date.now());
  let minutes = date.getMinutes();
  if (minutes > 15) {
    controls.light.turnOff();
    setTimeout(configureLightTimeInterval, Math.max(0, (45 - minutes) * 60000));
  } else {
    controls.light.turnOn();
    setTimeout(configureLightTimeInterval, Math.max(0, (15 - minutes) * 60000));
  }
}

function toggleLight() {
  if (controls.light.isOn()) {
    return controls.light.turnOff();
  } else {
    return controls.light.turnOn();
  }
}

async function runPump(idx) {
  controls.pumps.turnOn(idx);
  await utils.sleep(pumpTime);
  controls.pumps.turnOff(idx);
}

// To test sensor initialization
// initialize({});

module.exports = {
  initialize,
  runPump,
  toggleLight
};
