'use strict';

const s3 = require('./s3');
const dynamodb = require("../drawings/dynamodb");

async function handler(event, context, callback) {
    const timestamp = new Date().getTime();
    console.log(event.Records);
    for (const record of event.Records)
        await processRecord(record.s3, timestamp);
}

async function processRecord(s3Record, timestamp) {
    console.log(s3Record);
    const s3Object = await s3.headObject({Bucket: s3Record.bucket.name, Key: s3Record.object.key}).promise();

    if (!s3Object.Metadata) {
        // Shouldn't get here
        const errorMessage = 'Cannot process drawing as no metadata is set for it';
        console.error(errorMessage, {s3Object});
        throw new Error(errorMessage);
    }

    console.log(s3Object.Metadata);

    const drawingId = s3Object.Metadata.drawingid;

    const image = {
        s3bucket: s3Record.bucket.name,
        s3key: s3Record.object.key,
        url: s3.endpoint.href + s3Record.bucket.name + '/' + s3Record.object.key
    }

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: drawingId,
        },
        ExpressionAttributeValues: {
            ':image': image,
            ':updatedAt': timestamp,
        },
        UpdateExpression: 'SET image = :image, updatedAt = :updatedAt',
        ReturnValues: 'ALL_NEW',
    };

    // update the drawing in the database
    await dynamodb.update(params).promise();
}

module.exports.handler = handler;