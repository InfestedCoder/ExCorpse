from drawings import drawingsTagger


class TestClassDemoInstance:
    event = {'Records': [{'messageId': 'd796f788-f630-4ab0-b59c-fb8351fae083',
                          'receiptHandle': 'd796f788-f630-4ab0-b59c-fb8351fae083#9f94cbdd-32b8-42f5-bcad-c94a4e58b083',
                          'body': '{"createdAt":1655593626336,"middle":{"createdAt":1655593682158,"image":{"s3bucket":"exquisite-corpse-segments","s3key":"fbdce12a-3d42-4e81-8ec9-82257422d88e.png","url":"http://localhost:4569/exquisite-corpse-segments/fbdce12a-3d42-4e81-8ec9-82257422d88e.png"},"id":"73dab11d-592f-4ce4-807b-d07639f3f390","createdBy":"Sam Segment","updatedAt":1655593682158},"top":{"createdAt":1655593669091,"image":{"s3bucket":"exquisite-corpse-segments","s3key":"c4312311-f0d6-4bdc-971d-5a9359280eac.png","url":"http://localhost:4569/exquisite-corpse-segments/c4312311-f0d6-4bdc-971d-5a9359280eac.png"},"id":"eca1f55c-e0d7-48c6-93fb-8b76ad28da85","createdBy":"Sam Segment","updatedAt":1655593669091},"bottom":{"createdAt":1655593773209,"image":{"s3bucket":"exquisite-corpse-segments","s3key":"eeaece16-63af-4b4e-ba75-8eebf8bd7d8f.png","url":"http://localhost:4569/exquisite-corpse-segments/eeaece16-63af-4b4e-ba75-8eebf8bd7d8f.png"},"id":"3ebe1af5-ec84-4689-a0e6-e1065850364f","createdBy":"Sam Segment","updatedAt":1655593773209},"checked":false,"id":"1c655033-3896-413a-b47a-8a5d1cb70d43","updatedAt":1655593626336}',
                          'attributes': {'SentTimestamp': '1655593773354', 'ApproximateReceiveCount': '1',
                                         'ApproximateFirstReceiveTimestamp': '1655593792749', 'SenderId': '127.0.0.1'},
                          'messageAttributes': {}, 'md5OfBody': 'a33dc381fe2448d25b1bab2fbd58307a',
                          'eventSource': 'aws:sqs',
                          'eventSourceARN': 'arn:aws:sqs:us-east-1:000000000000:drawings-dev'}]}
    drawingsTagger.handler(event, {})
    assert 1 == 1
