/**
 * Creation Date: February 5, 2020
 * Author: Logan McDonald
 * Tests each relay in turn, then disables pumps and tests again
 */

const five = require("johnny-five");
const Pumps = require("../pumps");
const Light = require("../light");
const testHelper = require("./test_helper");
const utils = require("../utils");

const waitTime = 1000;

async function runRelayTest() {
  console.log("Initializing...");
  let pumps = new Pumps();

  let light = new Light({
    pin: 47,
    type: "NO"
  });

  console.log("Beginning test...");

  for (let pump of pumps.controls) {
    await runRelay(pump);
  }
  await runRelay(light);

  await runRelay(pumps);

  pumps.disable();

  await runRelay(pumps);
  await runRelay(light);

  console.log("End of test");
  process.exit();
}

async function runRelay(relay) {
  await utils.sleep(waitTime);
  relay.turnOn();
  await utils.sleep(waitTime);
  relay.turnOff();
}

testHelper.runTest(runRelayTest);
