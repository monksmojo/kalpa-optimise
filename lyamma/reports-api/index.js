import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });

export const handler = async (event) => {
  const tableName = "final_report";
  const account_id = event.accountId; // Make sure to pass this in the event

  const params = {
    TableName: tableName,
    KeyConditionExpression: "account_id = :account_id",
    ExpressionAttributeValues: {
      ":account_id": account_id
    }
  };

  try {
    const command = new QueryCommand(params);
    const response = await client.send(command);

    // Map the response items to plain JavaScript objects
    const items = response.Items?.map((item) => ({
      accountId: item.account_id // Access the attribute directly
      // Add other attributes as needed
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(items) // Return the items as JSON
    };
  } catch (err) {
    console.error("DynamoDB query failed:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to query data" })
    };
  }
};
