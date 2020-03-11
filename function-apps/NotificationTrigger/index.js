/**
 * Creation Date: March 11, 2020
 * Author: Luke Slevinsky
 * Azure serverless function app that listens to the CosmosDb change stream and sends database updates to
 *  our SignalR service which then publishes the message to all subscribed clients
 * Based off of: https://github.com/anthonychu/cosmosdb-signalr-realtime-updates
 */

module.exports = async function(context, updatedNotifications) {
  if (!!updatedNotifications && updatedNotifications.length > 0) {
    context.log("Document Id: ", updatedNotifications[0].id);
  }

  context.bindings.signalRMessages = updatedNotifications.map(notification => ({
    target: "notificationsUpdated",
    arguments: [notification]
  }));
  context.done();
};
