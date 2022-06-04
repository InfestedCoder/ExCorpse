'use strict';

const validSegments =['top','middle','bottom'];

module.exports.initiate = (event, context, callback) => {
    console.log(event);

    var segment = event.pathParameters.segment;

    if( !validSegments.includes(segment))
        return false;

    return true;
};
