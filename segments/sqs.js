'use strict';

const AWS = require('aws-sdk');

const client = new AWS.SQS();

let QueueUrl;

if( process.env.IS_OFFLINE){
    QueueUrl = new Promise(function (resolve){
        return resolve(`http://localhost:9324/queues/${process.env.SQS_DRAWING_QUEUE}`);
    })
}
else {
    const params = {
        QueueName: process.env.SQS_DRAWING_QUEUE
    };
    QueueUrl =  client.getQueueUrl(params).promise();
}

client.QueueUrl = QueueUrl;

module.exports = client;
