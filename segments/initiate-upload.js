'use strict';
const s3 = require('./s3');
const uuid = require('uuid');

const validSegments =['top','middle','bottom'];

module.exports.initiate = (event, context, callback) => {
    const segment = event.pathParameters.segment;

    if( !validSegments.includes(segment)) {
        const error = `Invalid segment for drawing. Valid values are: ${validSegments.join(', ')}`;
        console.error(error);
        callback(null, {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body: error,
        });

        return;
    }

    const body = JSON.parse(event.body);

    let filename = uuid();

    const s3Params = {
        Bucket: s3.S3Config.segmentBucket,
        Key: `${filename}.${body.ext}`,
        ContentType: body.contentType,
        Expires: 60 * 10 // 10 minutes
    };

    const url = s3.client.getSignedUrl('putObject', s3Params);

    const responseBody = {
        preSignedUrl: url,
        fileName: `https://${s3.S3Config.segmentBucket}.s3.${s3.S3Config.region}.amazonaws.com/${filename}.${body.ext}`
    }

    // create a response
    const response = {
        statusCode: 200,
        body: JSON.stringify(responseBody),
    };

    callback(null, response);

    return true;
};
