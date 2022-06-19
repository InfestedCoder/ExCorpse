from PIL import Image
import io
import logging
import json
import requests
import boto3
import os

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def receive(event, context):
    logger.info(event)
    logger.info("Python message received!")
    logger.info("event")

    for record in event['Records']:
        process_record(record)


def process_record(record):
    body = json.loads(record['body'])

    drawingid = body['id']

    topImageUrl = body['top']['image']['url']
    middleImageUrl = body['middle']['image']['url']
    bottomImageUrl = body['bottom']['image']['url']

    imTop = Image.open(requests.get(topImageUrl, stream=True).raw)
    imMiddle = Image.open(requests.get(middleImageUrl, stream=True).raw)
    imBottom = Image.open(requests.get(bottomImageUrl, stream=True).raw)

    img = Image.new("RGBA", (500, 1500), "white")
    img.paste(imTop, (0, 0))
    img.paste(imMiddle, (0, 500))
    img.paste(imBottom, (0, 1000))

    # encode the picture to a base64 response
    buffered = io.BytesIO()
    img.save(buffered, "PNG")
#     img.save("combined.png", "png")
    buffered.seek(0)

    upload_to_s3(buffered, drawingid)


def upload_to_s3(image, drawingid):
    session = boto3.session.Session()

    s3_client = None
    if os.environ.get('IS_OFFLINE'):
        s3_client = session.client(
            service_name='s3',
            aws_access_key_id='S3RVER',
            aws_secret_access_key='S3RVER',
            endpoint_url='http://localhost:4569',
        )
    else:
        s3_client = session.client(
            service_name='s3'
        )

    s3_client.upload_fileobj(image, os.environ.get('S3_DRAWING_BUCKET'), drawingid + ".png",
                             ExtraArgs={'Metadata': {'drawingid': drawingid},
                                        'ACL': 'public-read'})


