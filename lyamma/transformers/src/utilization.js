import * as fs from "fs";

import { cpuData } from "./cloudwatch_metrics.js";

function transformMetricsDataByHour(data) {
  const hourlyMetricsMap = {};

  // Group data by hour across all days
  data.forEach((metric) => {
    metric.Timestamps.forEach((timestamp, index) => {
      const hour = new Date(timestamp).getUTCHours(); // Extract hour (0-23)

      if (!hourlyMetricsMap[hour]) {
        hourlyMetricsMap[hour] = [];
      }
      hourlyMetricsMap[hour].push(metric.Values[index]);
    });
  });

  // Calculate mean for each hour
  const hourlyData = Object.entries(hourlyMetricsMap).map(([hour, values]) => ({
    Hour: `${hour}:00`,
    MeanCPUUtilization:
      values.reduce((sum, value) => sum + value, 0) / values.length || null
  }));

  return hourlyData;
}

const hourlyData = transformMetricsDataByHour(cpuData);

// Write hourly data to a JSON file
fs.writeFileSync("hourly_output.json", JSON.stringify(hourlyData, null, 2));
