/**
 * Creation Date: February 23, 2020
 * Author: Luke Slevinsky
 * Azure serverless function app that listen to HTTP GET/POST requests and returns all documents from our Azure CosmosDb collection
 * Based off of: https://github.com/anthonychu/cosmosdb-signalr-realtime-updates
 */

module.exports = async function(context, req, inputDocument) {
  context.log("JavaScript HTTP trigger function processed a request.");

  if (inputDocument != null) {
    context.log(`Documents returned ${inputDocument.length}`);
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: inputDocument
    };
  } else {
    context.res = {
      status: 404,
      body: "No documents found"
    };
  }
};
