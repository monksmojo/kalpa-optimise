import {
  CloudWatchClient,
  GetMetricDataCommand,
} from "@aws-sdk/client-cloudwatch";
import { fromIni } from "@aws-sdk/credential-provider-ini";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: "us-east-1",
  credentials: fromIni({ profile: "kalpa_account_profile" }),
});
const docClient = DynamoDBDocumentClient.from(client);

const cloudWatch = new CloudWatchClient({
  region: "us-west-2",
  credentials: fromIni({ profile: "client_account_profile" }),
});

const instanceId = "i-xxxxxxxxxxxxx";
const startTime = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
const endTime = new Date();

async function getMetrics() {
  const params = {
    MetricDataQueries: [
      {
        Id: "cpuUtilization",
        MetricStat: {
          Metric: {
            Namespace: "AWS/EC2",
            MetricName: "CPUUtilization",
            Dimensions: [{ Name: "InstanceId", Value: instanceId }],
          },
          Period: 3600,
          Stat: "Maximum",
        },
      },
    ],
    StartTime: startTime,
    EndTime: endTime,
  };

  try {
    const data = await cloudWatch.send(new GetMetricDataCommand(params));
    const hourlyData = transformMetricsDataByHour(data); // properly return value
    await insertToDb(instanceId, hourlyData[0].hourlyHistory); // insert to DynamoDB
  } catch (err) {
    console.error("Error fetching metrics:", err);
  }
}

function transformMetricsDataByHour(data) {
  const hourlyMetricsMap = {};

  data.MetricDataResults.forEach((metric) => {
    metric.Timestamps.forEach((timestamp, index) => {
      const hour = new Date(timestamp).getUTCHours();
      if (!hourlyMetricsMap[hour]) {
        hourlyMetricsMap[hour] = [];
      }
      hourlyMetricsMap[hour].push(metric.Values[index]);
    });
  });

  const hourlyData = [
    {
      instanceId: instanceId,
      hourlyHistory: Object.entries(hourlyMetricsMap).map(([hour, values]) => ({
        Hour: `${hour}:00`,
        MeanCPUUtilization:
          values.reduce((sum, value) => sum + value, 0) / values.length || null,
      })),
    },
  ];

  return hourlyData; // ✅ This was missing
}

async function insertToDb(instanceId, hourlyHistory) {
  const command = new PutCommand({
    TableName: "cloudwatch_util",
    Item: { instance_id: instanceId, data: JSON.stringify(hourlyHistory) },
  });

  await docClient.send(command);
  console.log("Data inserted successfully");
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Data inserted successfully",
    }),
  };
}

getMetrics();
