const five = require("johnny-five");
const Pumps = require("../pumps");
const Light = require("../light");
const utils = require("../utils");

const waitTime = 1000;

let board = new five.Board();

board.on("ready", async () => {
  console.log("Initializing...");
  let pumps = new Pumps();

  let light = new Light({
    pin: 6,
    type: "NC"
  });

  console.log("Beginning test...");

  for (let pump of pumps.controls) {
    await runRelay(pump);
  }
  await runRelay(light);

  pumps.disable();
  light.disable();

  for (let pump of pumps.controls) {
    await runRelay(pump);
  }
  await runRelay(light);

  console.log("End of test");
});

async function runRelay(relay) {
  await utils.sleep(waitTime);
  relay.turnOn();
  await utils.sleep(waitTime);
  relay.turnOff();
}
