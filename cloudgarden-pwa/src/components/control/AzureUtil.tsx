const Client = require("azure-iot-device").Client;

export const getClient = () => {
  console.log(`con string ${process.env.REACT_APP_CONNECTION_STRING}`);
  return Client.fromConnectionString(
    process.env.REACT_APP_CONNECTION_STRING || ""
  );
};
