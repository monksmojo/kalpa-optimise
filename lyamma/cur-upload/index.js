import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(client);

function getAccountIdFromArn(arn) {
  const regex = /arn:aws:iam::(\d+):/;
  const match = arn.match(regex);
  return match ? match[1] : null;
}

export const handler = async (event) => {
  try {
    // Check if event.body exists and is a string
    if (!event.body || typeof event.body !== 'string') {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Request body is missing or invalid" })
      };
    }

    const body = JSON.parse(event.body);
    
    // Validate presence and type of roleArn
    const roleARN = body.roleArn;
    if (!roleARN || typeof roleARN !== 'string') {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing or invalid roleArn" })
      };
    }

    const accountId = getAccountIdFromArn(roleARN);
    if (!accountId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid ARN format" })
      };
    }

    const command = new PutCommand({
      TableName: "accounts",
      Item: { account_id: accountId, roleARN: roleARN }
    });

    await docClient.send(command);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Account added successfully",
        accountId: accountId
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error adding account",
        error: error.message
      })
    };
  }
};