from segments import drawingsQueueReceiver

class TestClassDemoInstance:
    event = {'Records': [{'messageId': '638ca34a-eb79-402b-81c3-a963696c79ce',
                          'receiptHandle': '638ca34a-eb79-402b-81c3-a963696c79ce#35fe0b73-a3fc-4315-bf00-27fabe19bdf7',
                          'body': '{"createdby":"Alberto","drawingid":"b794d585-aefb-460e-b618-9ed36df857e9","segment":"top"}',
                          'attributes': {'SentTimestamp': '1654863414423', 'ApproximateReceiveCount': '2',
                                         'ApproximateFirstReceiveTimestamp': '1654952655772', 'SenderId': '127.0.0.1'},
                          'messageAttributes': {}, 'md5OfBody': '31a358142a0136759ddb66b4f4c364f4',
                          'eventSource': 'aws:sqs',
                          'eventSourceARN': 'arn:aws:sqs:us-east-1:000000000000:drawings-dev'}]}

    def test_one(self):
        drawingsQueueReceiver.receive(self.event, {})
        self.value = 1
        assert self.value == 1

    def test_two(self):
        assert self.value == 0
