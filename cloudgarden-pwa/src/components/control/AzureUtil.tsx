var Client = require("azure-iothub").Client;

export const getClient = () => {
  console.log(`con string ${process.env.REACT_APP_SERVICE_CONNECTION_STRING}`);
  return Client.fromConnectionString(
    process.env.REACT_APP_SERVICE_CONNECTION_STRING || ""
  );
};
