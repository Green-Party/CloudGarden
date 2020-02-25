import React, { useState, useContext, createContext } from "react";
import * as signalR from "@microsoft/signalr";
import axios from "axios";

type SensorState = {
  sensorData: SensorData[];
};

type SensorData = {
  _id: number;
  visible: number;
  ir: number;
  uvIdx: number;
  waterLevel: number;
  temp: number[];
  soilHumidity: number[];
  pumpsEnabled: boolean;
};
type SensorDataProviderProps = { children: React.ReactNode };
const SensorStateContext = createContext<SensorState | undefined>(undefined);

// axios configs
const apiBaseUrl = "https://db-to-signalr-service.azurewebsites.net/";
const axiosConfig = {};

function getConnectionInfo() {
  return axios
    .post(`${apiBaseUrl}/api/negotiate`, null, axiosConfig)
    .then(resp => {
      return resp.data;
    })
    .catch(() => {
      return {};
    });
}

function startConnection(connection: signalR.HubConnection) {
  console.log("connecting...");
  connection
    .start()
    .then(() => {
      console.log("connected!");
    })
    .catch(err => {
      console.error(err);
      setTimeout(() => {
        startConnection(connection);
      }, 2000);
    });
}

function SensorDataProvider({ children }: SensorDataProviderProps) {
  const [sensorState, updateSensorState]: [SensorState, Function] = useState({
    sensorData: []
  });

  function sensorsUpdated(updatedSensor: SensorData) {
    let sensor = sensorState.sensorData.find(
      (s: SensorData) => s._id === updatedSensor._id
    );
    if (sensor) {
      Object.assign(sensor, updatedSensor);
    } else {
      sensorState.sensorData.push(updatedSensor);
    }
    updateSensorState(sensorState);
  }

  getConnectionInfo()
    .then(info => {
      let accessToken = info.accessToken;
      const options = {
        accessTokenFactory: () => {
          if (accessToken) {
            const _accessToken = accessToken;
            accessToken = null;
            return _accessToken;
          } else {
            return getConnectionInfo().then(info => {
              return info.accessToken;
            });
          }
        }
      };
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(info.url, options)
        .configureLogging(signalR.LogLevel.Information)
        .build();

      connection.on("sensorsUpdated", sensorsUpdated);

      connection.onclose(() => {
        console.log("disconnected");
        setTimeout(() => {
          startConnection(connection);
        }, 2000);
      });
      startConnection(connection);
    })
    .catch(console.error);

  return (
    <SensorStateContext.Provider value={sensorState}>
      {children}
    </SensorStateContext.Provider>
  );
}
function useSensorState() {
  const context = useContext(SensorStateContext);
  if (context === undefined) {
    throw new Error("useSensorState must be used within a SensorDataProvider");
  }
  return context;
}

export { SensorDataProvider, useSensorState };
