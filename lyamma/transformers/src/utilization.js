import * as fs from "fs";

import { cpuData } from "./cloudwatch_metrics.js";

function transformMetricsData(data) {
  const metricsMap = {};

  data.forEach((metric) => {
    metric.Timestamps.forEach((timestamp, index) => {
      if (!metricsMap[timestamp]) {
        metricsMap[timestamp] = { Timestamp: timestamp };
      }
      metricsMap[timestamp][metric.Id] = metric.Values[index];
    });
  });

  return Object.entries(metricsMap).map(([timestamp, entry]) => ({
    Timestamp: timestamp,
    CPUUtilization: entry.cpuUtilization || null,
    MemoryUtilization: entry.memoryUtilization || null
  }));
}

const transformedData = transformMetricsData(cpuData);

fs.writeFileSync("output.json", JSON.stringify(transformedData, null, 2));
