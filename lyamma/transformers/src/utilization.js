import * as fs from "fs";

import { cpuData } from "./cpuData.js";

function transformMetricsData(data) {
  const metricsMap = {};

  // Iterate over each metric dataset
  data.forEach((metric) => {
    metric.Timestamps.forEach((timestamp, index) => {
      if (!metricsMap[timestamp]) {
        metricsMap[timestamp] = { Timestamp: timestamp };
      }
      metricsMap[timestamp][metric.Id] = metric.Values[index];
    });
  });

  // Convert the map to an array, ensure missing values are null, and sort in ascending order
  return Object.entries(metricsMap)
    .map(([timestamp, entry]) => ({
      Timestamp: timestamp,
      CPUUtilization: entry.cpuUtilization || null,
      MemoryUtilization: entry.memoryUtilization || null
    }))
    .sort(
      (a, b) =>
        new Date(a.Timestamp).getTime() - new Date(b.Timestamp).getTime()
    ); // Sort by oldest timestamp first
}

const transformedData = transformMetricsData(cpuData);

const computeCPUInOrder = (transformedData) => {
  const LOW = 33.33;
  const HIGH = 66.66;
  const metrics = {
    low: 0,
    medium: 0,
    high: 0
  };

  transformedData.forEach((entry) => {
    const value = entry.CPUUtilization;
    switch (true) {
      case value < LOW:
        metrics.low++;
        break;
      case value >= LOW && value <= HIGH:
        metrics.medium++;
        break;
      default:
        return metrics.high++;
    }
  });
  return metrics;
};

const cpuUtilizationInOrder = computeCPUInOrder(transformedData);
console.log("🚀 ~ cpuUtilizationInOrder:", cpuUtilizationInOrder);

console.log(
  "🚀 ~ cpuUtilizationInOrder ~ cpuUtilizationInOrder:",
  cpuUtilizationInOrder
);

fs.writeFileSync("output.json", JSON.stringify(transformedData, null, 2));
