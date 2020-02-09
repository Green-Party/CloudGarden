const five = require("johnny-five");
const relays = require("../relays");
const utils = require("../utils");

const waitTime = 2000;

let board = new five.Board();

board.on("ready", async () => {
  console.log("Initializing...");
  let relayOutputs = relays.initialize();
  console.log("Beginning test...");

  for (let relayOutput of relayOutputs) {
    await utils.sleep(waitTime);
    relays.turnOn(relayOutput);
    await utils.sleep(waitTime);
    relays.turnOff(relayOutput);
  }

  console.log("End of test");
});
