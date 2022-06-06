'use strict';

module.exports.process = (event, context, callback) => {
    console.log('42 L.U.E. Received event:', JSON.stringify(event, null, 2));
}