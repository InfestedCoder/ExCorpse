'use strict';

const s3 = require('./s3');
const sqs = require('./sqs');
const dynamodb = require("../drawings/dynamodb");
const uuid = require("uuid");

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
        const errorMessage = 'Cannot process segment as no metadata is set for it';
        console.error(errorMessage, {s3Object});
        throw new Error(errorMessage);
    }

    console.log(s3Object.Metadata);

    const drawingId = s3Object.Metadata.drawingid;
    const segmentPlacement = s3Object.Metadata.segment;

    const segment = {
        id: uuid(),
        createdAt: timestamp,
        updatedAt: timestamp,
        createdBy: s3Object.Metadata.createdby,
        image: {
            s3bucket: s3Record.bucket.name,
            s3key: s3Record.object.key,
            url: s3.endpoint.href + s3Record.bucket.name + '/' + s3Record.object.key
        }
    }

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: drawingId,
        },
        ExpressionAttributeValues: {
            ':segment': segment,
        },
        UpdateExpression: 'SET ' + segmentPlacement + ' = :segment',
        ReturnValues: 'ALL_NEW',
    };

    // update the todo in the database
    const result = await dynamodb.update(params).promise();

    let drawing = result.Attributes;

    if (drawing.hasOwnProperty('top') &&
        drawing.hasOwnProperty('middle') &&
        drawing.hasOwnProperty('bottom')) {
        await postToQueue(drawing);
    }
}

async function postToQueue(drawing) {
    const queueUrl = await sqs.QueueUrl;

    console.log(queueUrl.QueueUrl);

    const sendMessageParams = {
        MessageBody: JSON.stringify(drawing),
        QueueUrl: queueUrl.QueueUrl
    }

    console.log(sendMessageParams);

    try {
        console.log('sending message');
        await sqs.sendMessage(sendMessageParams, (err, res) => {
            if (err) {
                console.error(err);
                console.error("message error")
            } else {
                console.log(res);
                console.log('message sent')
            }
        }).promise()
    } catch (error) {
        console.error(error);
    }
}

module.exports.handler = handler;