/**
 * Creation Date: February 23, 2020
 * Author: Luke Slevinsky
 * Azure serverless function app that listens to telemetry sent to the event hub and then puts them into the CosmosDb instance
 * Based off of: https://github.com/Azure-Samples/functions-js-iot-hub-processing
 */

function validateSensorData(sensorData) {
  let isValid = false;
  if (sensorData && sensorData.temperature && sensorData.soil_moisture) {
    isValid = sensorData.temperature.reduce((acc, val) => {
      return acc && 0 <= val && val <= 100;
    }, true);
    isValid = sensorData.soil_moisture.reduce((acc, val) => {
      return acc && 0 <= val && val <= 10;
    }, isValid);
  }

  return isValid;
}

module.exports = function(context, IoTHubMessages) {
  context.log(
    `JavaScript eventhub trigger function called for message array: ${IoTHubMessages}`
  );
  if (IoTHubMessages && IoTHubMessages.type === "Sensor") {
    context.log(`Sensor data`);
    context.log(validateSensorData(IoTHubMessages));
    if (validateSensorData(IoTHubMessages)) {
      context.bindings.sensorDocument = IoTHubMessages;
    }
  } else if (IoTHubMessages && IoTHubMessages.type === "Notification") {
    context.log(`Notification data`);
    context.bindings.notificationDocument = IoTHubMessages;
  } else {
    context.log(`Invalid message type`);
  }

  context.log("Done called");
  context.done();
};
