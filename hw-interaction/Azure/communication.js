/**
 * Creation Date: February 3, 2020
 * Author: Luke Slevinsky
 * Communication with Azure
 * Adapted from: https://github.com/Azure-Samples/iot-hub-node-raspberrypi-client-app/blob/master/index.js
 */
"use strict";

const fs = require("fs");
const path = require("path");

const Client = require("azure-iot-device").Client;
const ConnectionString = require("azure-iot-device").ConnectionString;
const Message = require("azure-iot-device").Message;
const MqttProtocol = require("azure-iot-device-mqtt").MqttWs; //for websockets, Mqtt otherwise
const AmqpProtocol = require("azure-iot-device-amqp").Amqp;

const MessageProcessor = require("./messageProcessor.js");

require("dotenv").config({ path: "../../.env" });

let isMessageSendOn = true;
let messageId = 0;
let notificationId = 0;
let client, config, messageProcessor;

function sendSensorData() {
  if (!isMessageSendOn) {
    return;
  }

  messageId++;

  messageProcessor.getMessage(messageId, content => {
    let message = new Message(content.toString("utf-8"));
    message.contentEncoding = "utf-8";
    message.contentType = "application/json";

    console.log("[Device] Sending message: " + content);
    console.log(content);

    client.sendEvent(message, err => {
      if (err) {
        console.error(
          "[Device] Failed to send message to Azure IoT Hub due to:\n\t" +
            err.message
        );
      } else {
        console.log("[Device] Message sent to Azure IoT Hub");
      }

      setTimeout(sendSensorData, config.interval);
    });
  });
}

function sendNotification(content) {
  if (!isMessageSendOn) {
    return;
  }

  notificationId++;
  const connectionStringParam = process.env.DEVICE_CONNECTION_STRING;
  let deviceId;

  if (connectionStringParam) {
    const connectionString = ConnectionString.parse(connectionStringParam);
    deviceId = connectionString.DeviceId;
  } else {
    deviceId = "[Unknown device] node";
  }

  content = Object.assign(
    {
      deviceId: deviceId,
      messageId: notificationId,
      type: "Notification"
    },
    content
  );
  content = JSON.stringify(content);

  let message = new Message(content.toString("utf-8"));
  message.contentEncoding = "utf-8";
  message.contentType = "application/json";

  console.log("[Device] Sending notification: " + content);
  console.log(content);

  client.sendEvent(message, err => {
    if (err) {
      console.error(
        "[Device] Failed to send message to Azure IoT Hub due to:\n\t" +
          err.message
      );
    } else {
      console.log("[Device] Notification sent to Azure IoT Hub");
    }
  });
}

function onStart(request, response) {
  console.log(
    "[Device] Trying to invoke method start(" + request.payload || "" + ")"
  );

  isMessageSendOn = true;

  response.send(200, "Successully start sending message to cloud", err => {
    if (err) {
      console.error(
        "[IoT Hub Client] Failed sending a start method response due to:\n\t" +
          err.message
      );
    }
  });
}

function onStop(request, response) {
  console.log(
    "[Device] Trying to invoke method stop(" + request.payload || "" + ")"
  );

  isMessageSendOn = false;

  response.send(200, "Successully stop sending message to cloud", function(
    err
  ) {
    if (err) {
      console.error(
        "[IoT Hub Client] Failed sending a stop method response due to:\n\t" +
          err.message
      );
    }
  });
}

function receiveMessageCallback(msg) {
  let message = msg.getData().toString("utf-8");

  client.complete(msg, () => {
    console.log("Received message:\n\t" + message);
  });
}

function initClient(connectionStringParam, credentialPath) {
  const connectionString = ConnectionString.parse(connectionStringParam);
  const deviceId = connectionString.DeviceId;

  // select transport
  if (config.transport === "amqp") {
    console.log("[Device] Using AMQP transport protocol");
    // fromConnectionString must specify a transport constructor, coming from any transport package.
    client = Client.fromConnectionString(connectionStringParam, AmqpProtocol);
  } else {
    console.log("[Device] Using MQTT transport protocol");
    client = Client.fromConnectionString(connectionStringParam, MqttProtocol);
  }

  // Configure the client to use X509 authentication if required by the connection string.
  if (connectionString.x509) {
    // Read X.509 certificate and private key.
    // These files should be in the current folder and use the following naming convention:
    // [device name]-cert.pem and [device name]-key.pem, example: myraspberrypi-cert.pem
    const connectionOptions = {
      cert: fs
        .readFileSync(path.join(credentialPath, deviceId + "-cert.pem"))
        .toString(),
      key: fs
        .readFileSync(path.join(credentialPath, deviceId + "-key.pem"))
        .toString()
    };

    client.setOptions(connectionOptions);

    console.log("[Device] Using X.509 client certificate authentication");
  }

  if (connectionString.GatewayHostName && config.iotEdgeRootCertFilePath) {
    const deviceClientOptions = {
      sa: fs.readFileSync(config.iotEdgeRootCertFilePath, "utf-8")
    };

    client.setOptions(deviceClientOptions, err => {
      if (err) {
        console.error(
          "[Device] error specifying IoT Edge root certificate: " + err
        );
      }
    });

    console.log("[Device] Using IoT Edge private root certificate");
  }

  return client;
}

function setupClient(connectionString, sensorData) {
  // read in configuration in config.json
  try {
    config = require("./config.json");
  } catch (err) {
    console.error("Failed to load config.json:\n\t" + err.message);
    return;
  }

  config = Object.assign(sensorData, config);

  // set up wiring
  messageProcessor = new MessageProcessor(config);

  // create a client
  // read out the connectionString from process environment
  connectionString = connectionString || process.env.DEVICE_CONNECTION_STRING;
  client = initClient(connectionString, config);

  client.open(err => {
    if (err) {
      console.error("[IoT Hub Client] Connect error:\n\t" + err.message);
      return;
    }

    // set C2D and device method callback
    client.onDeviceMethod("start", onStart);
    client.onDeviceMethod("stop", onStop);
    client.on("message", receiveMessageCallback);
    setInterval(() => {
      client.getTwin((err, twin) => {
        if (err) {
          console.error(
            "[IoT Hub Client] Got twin message error:\n\t" + err.message
          );
          return;
        }
        config.interval = twin.properties.desired.interval || config.interval;
      });
    }, config.interval);
    sendSensorData();
  });
}

module.exports = {
  setupClient,
  sendNotification
};
