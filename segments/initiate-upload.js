'use strict';
const s3 = require('./s3');
const uuid = require('uuid');

const validSegments = ['top', 'middle', 'bottom'];

module.exports.initiate = (event, context, callback) => {
    const segment = event.pathParameters.segment;

    if (!validSegments.includes(segment)) {
        const error = `Invalid segment for drawing. Valid values are: ${validSegments.join(', ')}`;
        console.error(error);
        callback(null, {
            statusCode: 400,
            headers: {'Content-Type': 'text/plain'},
            body: error,
        });

        return;
    }

    const drawingId = event.pathParameters.id;

    const body = JSON.parse(event.body);

    const metadata = {
        drawingId: drawingId,
        segment: segment,
        createdBy: body.createdBy,
    };

    let filename = uuid();

    const s3Params = {
        Bucket: process.env.S3_SEGMENT_BUCKET,
        Key: `${filename}.${body.ext}`,
        ContentType: body.contentType,
        Expires: 60 * 10, // 10 minutes.
        ACL: 'public-read',
        Metadata: metadata
    };

    let url;
    try {
        url = s3.getSignedUrl('putObject', s3Params);
    } catch (e) {
        console.error(e);

        const error = "Unable to generate signed url";

        callback(null, {
            statusCode: 500,
            headers: {'Content-Type': 'text/plain'},
            body: error,
        });

        return;
    }

    const responseBody = {
        preSignedUrl: url,
    }

    // create a response
    const response = {
        statusCode: 200,
        body: JSON.stringify(responseBody),
    };

    callback(null, response);

    return true;
};
