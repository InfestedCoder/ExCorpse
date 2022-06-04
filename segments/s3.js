'use strict';

const AWS = require('aws-sdk');

const client = new AWS.S3;

module.exports.client = client;

module.exports.S3Config = {
    segmentBucket: 'exquisite-corpse-segments',
    region: "us-east-1"
}
