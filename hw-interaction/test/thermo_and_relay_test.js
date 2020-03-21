/**
 * Creation Date: February 5, 2020
 * Author: Logan McDonald
 * Repeatedly tests each relay in turn, loopLimit number of times
 */

const Pumps = require("../pumps");
const Light = require("../light");
const ThermoSensors = require("../thermo_sensors");
const testHelper = require("./test_helper");
const utils = require("../utils");

const loopLimit = 10;

async function runRelayTest() {
  console.log("Initializing...");
  const DEFAULT_THERMO_ADDRESSES = [
    0x119129d8cf1,
    0x119129606db,
    0x11912c86a76
    // 0x11912da6e07
  ];

  let pumps = new Pumps();

  let light = new Light({
    pin: 6,
    type: "NO"
  });

  let thermoSensors = new ThermoSensors(DEFAULT_THERMO_ADDRESSES);
  setInterval(() => {
    thermoSensors.getReadings().map((reading, idx) => {
      console.log(`Thermometer ${idx + 1} reading: ${reading}`);
    });
    console.log();
  }, 1000);

  for (let i = 0; i < loopLimit; i++) {
    console.log(`Test run: ${i}`);

    for (let pump of pumps.controls) {
      await runRelay(pump);
    }
    await runRelay(light);
  }

  process.exit();
}

async function runRelay(relay) {
  await utils.sleep(3000);
  relay.turnOn();
  await utils.sleep(3000);
  relay.turnOff();
}

testHelper.runTest(runRelayTest);
