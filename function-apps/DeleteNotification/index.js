/**
 * Creation Date: March 11, 2020
 * Author: Luke Slevinsky
 * Azure serverless function app that listen to HTTP POST requests and deletes a document from our Azure CosmosDb collection
 *  specified through the id query param
 */

module.exports = async function(context, req, notification) {
  context.log("JavaScript HTTP trigger function processed a request.");
  context.log(context.bindings.notification);
  context.log(req.query);

  if (notification) {
    // This is the magic that does the deletion
    //   We set the time to live to one second
    //   so the record gets deleted right after the update
    notification.ttl = 1;
    notification.deleted = true;
    context.bindings.outputDocument = notification;

    return {
      // status: 200, /* Defaults to 200 */
      body: notification
    };
  } else {
    return {
      status: 400,
      body: "Please pass a valid id on the query string"
    };
  }
  context.done();
};
