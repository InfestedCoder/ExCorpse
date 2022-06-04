'use strict';
const validSegments =['top','middle','bottom'];

module.exports.initiate = (event, context, callback) => {
    console.log(event);

    var segment = event.pathParameters.segment;

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

    // create a response
    const response = {
        statusCode: 200,
        body: JSON.stringify({}),
    };
    callback(null, response);

    return true;
};
