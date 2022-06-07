'use strict';
const s3 = require('./s3');

module.exports.process = (event, context, callback) => {
    console.log('42 L.U.E. Received event:', JSON.stringify(event, null, 2));

    const s3Record = event.Records[0].s3;

    s3.headObject({ Bucket: s3Record.bucket.name, Key: s3Record.object.key }).promise().then((s3Object) =>{
        if (!s3Object.Metadata) {
            // Shouldn't get here
            const errorMessage = 'Cannot process segment as no metadata is set for it';
            console.error(errorMessage, { s3Object, event });
            throw new Error(errorMessage);
        }

        // TODO - persist segment to DynamoDB
        console.log(s3Object.Metadata);
    });
}