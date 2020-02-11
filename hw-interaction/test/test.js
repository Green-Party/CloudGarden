// const sensors = require("../sensors");
const five = require("johnny-five");

// sensors.initialize();

let controls = {};

let board = new five.Board();

board.on("ready", () => {
  // NC.on() will send a high control signal
  // NO.on() will send a low control signal
  let pump = new five.Relay({
    pin: 3,
    type: "NC"
  });
  pump.off();

  let led = new five.Relay({
    pin: 4,
    type: "NC"
  });
  led.off();

  let button = new five.Button({
    pin: 7
  });

  //   let led13 = new five.Led(13);
  //   led13.blink(500);

  // led.on() == led.close()
  button.on("press", () => {
    console.log("press");
    led.on();
    pump.on();
    console.log(led.isOn);
    console.log(pump.isOn);
  });

  button.on("release", () => {
    console.log("release");
    led.off();
    pump.off();
    console.log(led.isOn);
    console.log(pump.isOn);
  });

  //   setInterval(() => {
  //     console.log(button.upValue);
  //   }, 500);
});
