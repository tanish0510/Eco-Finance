// uploadToS3.js using AWS SDK v3
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

// Initialize the S3 client
const s3 = new S3Client({
    region: 'your-region', // e.g. 'us-west-2'
    credentials: {
        accessKeyId: 'YOUR_ACCESS_KEY_ID',
        secretAccessKey: 'YOUR_SECRET_ACCESS_KEY'
    }
});

async function uploadToS3(bucketName, key, filePath) {
    try {
        const fileStream = fs.createReadStream(path.resolve(filePath));

        const uploadParams = {
            Bucket: bucketName,
            Key: key,
            Body: fileStream
        };

        const command = new PutObjectCommand(uploadParams);
        const response = await s3.send(command);
        console.log("Successfully uploaded data to", bucketName, key);
        return response;
    } catch (err) {
        console.error("Error uploading to S3:", err);
        throw err;
    }
}

module.exports = uploadToS3;