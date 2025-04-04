import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(client);

function getAccountIdFromArn(arn) {
  const regex = /arn:aws:iam::(\d+):/;
  const match = arn.match(regex);

  if (match) {
    return match[1]; // Captured account number
  }
  return null; // In case ARN format is incorrect or doesn't match
}

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const roleARN = body.roleArn;
    const accountId = getAccountIdFromArn(roleARN);
    if (!accountId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid ARN format"
        })
      };
    }

    const command = new PutCommand({
      TableName: "accounts",
      Item: {
        account_id: accountId,
        roleARN: roleARN,
      }
    });

    console.log("Command Created")

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
