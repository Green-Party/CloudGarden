/**
 * Creation Date: February 23, 2020
 * Author: Luke Slevinsky
 * Azure serverless function app that listens to telemetry sent to the event hub and then puts them into the CosmosDb instance
 * Based off of: https://github.com/Azure-Samples/functions-js-iot-hub-processing
 */

module.exports = function(context, IoTHubMessages) {
  context.log(
    `JavaScript eventhub trigger function called for message array: ${IoTHubMessages}`
  );

  context.bindings.outputDocument = IoTHubMessages;
  context.log("Done called");
  context.done();
};
