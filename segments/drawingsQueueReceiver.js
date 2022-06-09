"use strict";

async function handler(event) {
    // TODO - implement segment processing
    console.log("Message received!", JSON.stringify(event, null, 4));
}

module.exports.handler = handler;
