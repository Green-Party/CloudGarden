/**
 * Creation Date: March 4, 2020
 * Author: Luke Slevinsky
 * Utility methods for the dashboards
 */
import { SensorData } from "../types";
import { SensorType } from "./charts/Units";

export const sensorDataToChartData = (
  sensorData: SensorData[],
  sensorType: SensorType
) => {
  return sensorData.map(sensor => {
    return {
      timestamp: sensor._ts,
      value: sensor[sensorType.toLowerCase()]
    };
  });
};
