const Client = require("azure-iot-device").Client;
require("dotenv").config();

export const getClient = () => {
  console.log(`con string ${process.env.CONNECTION_STRING}`);
  return Client.fromConnectionString(process.env.CONNECTION_STRING || "");
};
