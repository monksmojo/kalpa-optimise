import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
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
    Key: {
      account_id: { S: account_id } // Primary key for the table
    }
  };

  try {
    const command = new GetItemCommand(params);
    const response = await client.send(command);

    if (!response.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Item not found" })
      };
    }

    const item = unmarshall(response.Item);

    return {
      statusCode: 200,
      body: item // Return the item as JSON
    };
  } catch (err) {
    console.error("DynamoDB get failed:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to retrieve data" })
    };
  }
};
