const webPush = require("web-push");
const Azure = require("./communication");

function sendNotification(payload) {
  if (pushSubscription) {
    console.log(`Can I has access pls ${pushSubscription}`);
    //  Send notification to client
    webPush
      .sendNotification(pushSubscription, JSON.stringify(payload))
      .then(result => console.log(result))
      .catch(e => console.log(e.stack));

    // update the database
    Azure.sendNotification(payload);
  } else {
    console.log("NO SUBSCRIPTION");
  }
}

module.exports = {
  sendNotification
};
