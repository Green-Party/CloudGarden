/**
 * Creation Date: February 23, 2020
 * Author: Luke Slevinsky
 * Azure serverless function app that listen to HTTP post requests and resturns a connection token for our SignalR service
 * Based off of: https://github.com/anthonychu/cosmosdb-signalr-realtime-updates
 */

module.exports = async function(context, req, connectionInfo) {
  context.log(connectionInfo);
  context.res.body = connectionInfo;
};
