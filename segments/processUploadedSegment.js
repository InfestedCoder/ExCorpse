'use strict';
const s3 = require('./s3');
const sqs = require('./sqs');

async function process(event, context, callback) {
    console.log('42 L.U.E. Received event:', JSON.stringify(event, null, 2));

    const s3Record = event.Records[0].s3;

    const s3Object = await s3.headObject({Bucket: s3Record.bucket.name, Key: s3Record.object.key}).promise();

    if (!s3Object.Metadata) {
        // Shouldn't get here
        const errorMessage = 'Cannot process segment as no metadata is set for it';
        console.error(errorMessage, {s3Object, event});
        throw new Error(errorMessage);
    }

    // TODO - persist segment to DynamoDB
    console.log(s3Object.Metadata);

    const queueUrl = await sqs.QueueUrl;

    console.log(queueUrl.QueueUrl);

    const sendMessageParams = {
        MessageBody: JSON.stringify(s3Object.Metadata),
        QueueUrl: queueUrl.QueueUrl
    }

    console.log(sendMessageParams);

    // TODO - if drawing has all 3 segments, post drawing object to queue for segment processing
    try {
        console.log('sending message');
        sqs.sendMessage(sendMessageParams, (err, res) => {
            if (err) {
                console.error(err);
                console.error("message error")
            } else {
                console.log(res);
                console.log('message sent')
            }
        })
    } catch (error) {
        console.error(error);
    }
}

module.exports.process = process;