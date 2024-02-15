const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const getProfilePicture = async (key, next) => {
    try {
        const Key = "profile-pictures/" + key || 'default.jpg';
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key
        });
        return await getSignedUrl(s3Client, command);
    } catch (error) {
        next(error);
    }
}

const putProfilePicture = async (filename, ContentType) => {
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: 'profile-pictures/' + filename,
        ContentType,
    });

    const url = await getSignedUrl(s3Client, command);
    return url;
}

module.exports = {
    getProfilePicture,putProfilePicture
}