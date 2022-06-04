'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const client = new AWS.S3;

module.exports.client = client;

module.exports.S3Config = {
    segmentBucket: 'excorpsesegments',
    region: "us-east-2"
}
