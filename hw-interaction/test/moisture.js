let five = require("johnny-five");

let board = new five.Board();

board.on("ready", () => {
  // soil humidity sensor
  const soilMoisturePins = ["A0"];
  // const soilMoisturePins = ["A0", "A1", "A2"];
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
      let reading = sensor.raw;
      console.log(`Soil data at index 0: ${reading}`);
    });
    // sensor.on("change", () => {
    //   let reading = this.raw;
    //   console.log(`Soil data at index 0: ${reading}`);
    // });
  });
});
