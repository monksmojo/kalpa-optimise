import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });

export const handler = async (event) => {
  const tableName = "final_report";
  const account_id = event.queryStringParameters.accountId; // Make sure to pass this in the event
  if (!account_id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing accountId in event" })
    };
  }
  const params = {
    TableName: tableName,
    KeyConditionExpression: "#account_id = :account_id",
    ExpressionAttributeNames: {
      "#account_id": "account_id"
    },
    ExpressionAttributeValues: {
      ":account_id": { S: account_id }
    }
  };

  try {
    const command = new QueryCommand(params);
    const response = await client.send(command);
    const items = response.Items?.map((item) => unmarshall(item));

    return {
      statusCode: 200,
      body: items // Return the items as JSON
    };
  } catch (err) {
    console.error("DynamoDB query failed:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to query data" })
    };
  }
};
