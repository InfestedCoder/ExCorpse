import os

import boto3
from decimal import Decimal
import json
import urllib.request
import urllib.parse
import urllib.error

print('Loading function')

rekognition = boto3.client('rekognition')


def detect_labels(bucket, key):
    response = rekognition.detect_labels(Image={"S3Object": {"Bucket": bucket, "Name": key}})

    # Sample code to write response to DynamoDB table 'MyTable' with 'PK' as Primary Key.
    # Note: role used for executing this Lambda function should have write access to the table.
    # table = boto3.resource('dynamodb').Table('MyTable')
    # labels = [{'Confidence': Decimal(str(label_prediction['Confidence'])), 'Name': label_prediction['Name']} for label_prediction in response['Labels']]
    # table.put_item(Item={'PK': key, 'Labels': labels})
    return response


# --------------- Main handler ------------------


def handler(event, context):
    # print("Received event: " + json.dumps(event, indent=2))

    # Get the object from the event
    # bucket = event['Records'][0]['s3']['bucket']['name']
    bucket = 'exquisite-corpse-drawings'
    key = 'a19e2415-605a-4447-a6e2-cb35567d96f2.png'
    # key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'])
    try:
        # Calls rekognition DetectLabels API to detect labels in S3 object
        response = detect_labels(bucket, key)

        # Print response to console.

        print(response)
        print(key)

        return response
    except Exception as e:
        print(e)
        print("Error processing object {} from bucket {}. ".format(key, bucket) +
              "Make sure your object and bucket exist and your bucket is in the same region as this function.")
        raise e

