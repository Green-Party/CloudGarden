/**
 * Creation Date: March 11, 2020
 * Author: Luke Slevinsky
 * Azure serverless function app that listen to HTTP GET/POST requests and returns all documents from our Azure CosmosDb notification collection
 * Based off of: https://github.com/anthonychu/cosmosdb-signalr-realtime-updates
 */

module.exports = async function(context, req, notificationsDocument) {
  context.log("JavaScript HTTP trigger function processed a request.");

  if (notificationsDocument != null) {
    context.log(`Notifications returned ${notificationsDocument.length}`);
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: notificationsDocument
    };
  } else {
    context.res = {
      status: 404,
      body: "No documents found"
    };
  }
};
