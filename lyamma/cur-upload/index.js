import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({ region: "us-east-1" });

const BUCKET_NAME = "kalpa-cur-reports";

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
    const { fileContent, roleARN } = event.body;
    const fileName = getAccountIdFromArn(roleARN) + ".parquet";
    if (!fileContent || !fileName) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Missing fileContent or roleARN"
        })
      };
    }

    const buffer = Buffer.from(fileContent, "base64");
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: "application/vnd.apache.parquet"
    };

    await s3.send(new PutObjectCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "File uploaded successfully", fileName })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error uploading file",
        error: error.message
      })
    };
  }
};
