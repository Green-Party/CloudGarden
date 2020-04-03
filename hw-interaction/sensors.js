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
  automated_moisture: false,
  moisture_threshold: 4,
  automated_lighting: false,
  light_on_start: null,
  light_on_end: null,
  pumps_enabled: false
};

let controls = {
  pumps: null,
  light: null
};

const interval = 5000;
const PUMP_TIME = 1000;
const ONE_MINUTE = 60000;
const LIGHT_CHECK_INTERVAL = ONE_MINUTE;

function initialize(state) {
  let board = new five.Board({ timeout: 20000 });

  state.sensorData = readings;

  board.on("ready", async function() {
    // light sensor
    const si1145 = new Si1145({
      board: board
    });

    await si1145.initialize(() => {
      if (si1145.deviceActive()) {
        setInterval(() => {
          if (si1145.deviceActive()) {
            si1145.getDataFromDevice(err => {
              if (!err) {
                readings.visible = si1145.device.parameters[0].value;
                readings.ir = si1145.device.parameters[1].value;
                readings.uv_index = si1145.device.parameters[2].value;
                console.log(
                  `Visible: ${readings.visible} = ${si1145.device.parameters[0].value}`
                );
                console.log(
                  `IR: ${readings.ir} = ${si1145.device.parameters[1].value}`
                );
                console.log(
                  `UVIndex: ${readings.uv_index} = ${si1145.device.parameters[2].value}`
                );
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

    setInterval(() => {
      readings.temperature = thermoSensors.getReadings();
      console.log(`Temperature: ${readings.temperature}`);
      readings.soil_moisture = soilHumiditySensors.getReadings();
      console.log(`Soil humidity: ${readings.soil_moisture}`);
      if (readings.automated_moisture) {
        readings.soil_moisture.forEach((reading, i) => {
          if (reading < readings.moisture_threshold) {
            runPump(i);
          }
        });
      }
      console.log(`Soil humidity: ${readings.soil_moisture}`);
      readings.water_level = waterLevelRuler.getReading();
      console.log(`Water level: ${readings.water_level}`);
      readings.pumps_enabled = controls.pumps.isEnabled();
      console.log(`Pumps enabled: ${readings.pumps_enabled}`);
    }, interval);
  });
}

function configureLightAutomation(useAutomation, startTime, endTime) {
  console.log(
    `Updating use of light automation to: ${useAutomation}, start: ${startTime}, duration: ${endTime}`
  );
  readings.automated_lighting = useAutomation;
  readings.light_on_start = new Date(startTime);
  readings.light_on_end = new Date(endTime);
  if (useAutomation) {
    controls.light_timer = utils.setExactInterval(
      LIGHT_CHECK_INTERVAL,
      checkLightAutomation
    );
  } else {
    clearTimeout(controls.light_timer.id);
  }
}

function configureSoilMoistureAutomation(useAutomation, threshold) {
  console.log(
    `Updating use of soil moisture automation to: ${useAutomation}, threshold: ${threshold}`
  );
  readings.automated_moisture = useAutomation;
  readings.moisture_threshold = threshold;
}

function checkLightAutomation() {
  let date = new Date(Date.now());

  if (
    date.getTime() > readings.light_on_start.getTime() &&
    date.getTime() < readings.light_on_end.getTime()
  ) {
    controls.light.turnOn();
  } else if (
    date.getTime() < readings.light_on_start.getTime() &&
    readings.light_on_start.getTime() - date.getTime() < LIGHT_CHECK_INTERVAL
  ) {
    setTimeout(
      checkLightAutomation,
      readings.light_on_start.getTime() - date.getTime() + 1
    );
  } else {
    controls.light.turnOff();
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
  if (controls.pumps) {
    controls.pumps.turnOn(idx);
    await utils.sleep(PUMP_TIME);
    controls.pumps.turnOff(idx);
  } else {
    console.log("Pumps not initialized");
    controls.pumps = new Pumps({
      enabled: false
    });
  }
}

// To test sensor initialization
// initialize({});

module.exports = {
  initialize,
  configureLightAutomation,
  configureSoilMoistureAutomation,
  runPump,
  toggleLight
};
