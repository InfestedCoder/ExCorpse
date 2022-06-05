const initiate = require('../../segments/initiate-upload');

test('valid segment returns 200 error code', () => {
    const mockCallback = jest.fn();
    let event = {
        pathParameters: {
            segment: 'top',
            drawingId: 12345
        },
        body: {
            ext: '.png',
            contentType: 'image',
            createdBy: 'Alberto'

        }
    };

    event.body = JSON.stringify(event.body);

   initiate.initiate(event,{},mockCallback);
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][1]).toBeDefined();
    expect(mockCallback.mock.calls[0][1].statusCode).toBe(200);
});

test('invalid segment returns 400 error code', () => {
    const mockCallback = jest.fn();
    let event = {
        pathParameters: {
            segment: 'invalid',
            drawingId: 12345
        },
        body: {
            ext: '.png',
            contentType: 'image',
            createdBy: 'Alberto'

        }
    };

    event.body = JSON.stringify(event.body);

    initiate.initiate(event,{},mockCallback);
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][1]).toBeDefined();
    expect(mockCallback.mock.calls[0][1].statusCode).toBe(400);
});