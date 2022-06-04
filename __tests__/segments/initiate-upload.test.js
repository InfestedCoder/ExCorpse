const initiate = require('../../segments/initiate-upload');

test('segment is validated correctly', () => {
    let event = {
        pathParameters: {
            segment: 'top'
        }
    };

    expect(initiate.initiate(event)).toBe(true);

    event = {
        pathParameters: {
            segment: 'ggooggf'
        }
    };

    expect(initiate.initiate(event)).toBe(false);
});