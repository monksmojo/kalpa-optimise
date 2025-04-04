const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({ region: "us-east-1" });

exports.handler = async (event) => {
  try {
    const { fileContent, fileName, bucketName } = JSON.parse(event.body);

    if (!fileContent || !fileName || !bucketName) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Missing fileContent, fileName, or bucketName"
        })
      };
    }

    const buffer = Buffer.from(fileContent, "base64");
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: "application/octet-stream" // Adjust as needed
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
