/**
 * Creation Date: February 23, 2020
 * Author: Luke Slevinsky
 * Azure serverless function app that listens to the CosmosDb change stream and sends database updates to
 *  our SignalR service which then publishes the message to all subscribed clients
 * Based off of: https://github.com/anthonychu/cosmosdb-signalr-realtime-updates
 */

module.exports = async function(context, updatedSensors) {
  if (!!updatedSensors && updatedSensors.length > 0) {
    context.log("Document Id: ", updatedSensors[0].id);
  }

  context.bindings.signalRMessages = updatedSensors.map(sensor => ({
    target: "sensorsUpdated",
    arguments: [sensor]
  }));
  context.done();
};
