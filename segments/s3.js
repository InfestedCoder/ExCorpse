'use strict';

const AWS = require('aws-sdk');

let options = {};

// connect to local S3 if running offline
if (process.env.IS_OFFLINE) {
    options = {
        s3ForcePathStyle: true,
        accessKeyId: "S3RVER", // This specific key is required when working offline
        secretAccessKey: "S3RVER",
        endpoint: new AWS.Endpoint("http://localhost:4569"),
    };
}

const client = new AWS.S3(options);

module.exports = client;