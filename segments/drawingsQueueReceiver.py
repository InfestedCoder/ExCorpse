from PIL import Image
import base64
import io
import logging
import json

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def receive(event, context):
    logger.info(event)
    logger.info("Python message received!")
    logger.info("event")


    body = json.loads(event['Records'][0]['body']);
    drawingid = body['drawingid']
    logger.info("drawing id")
    logger.info(drawingid)

    # logger.info(event['Records'][0]['body']['drawingid'])
    #
    # for record in event['Records']:
    #     logger.info(f'Message body: {record["body"]}')
    #     logger.info(
    #         f'Message attribute: {record["messageAttributes"]["drawingid"]["stringValue"]}'
    #     )
    #
    # imTop = Image.open('top.png')
    # imMiddle = Image.open('middle.png')
    # imBottom = Image.open("bottom.png")
    #
    # img = Image.new("RGB", (100, 300), "white")
    #
    # img.paste(imTop, (0,0))
    # img.paste(imMiddle, (0,100))
    # img.paste(imBottom, (0,200))
    #
    # # encode the picture to a base64 response
    # buffered = io.BytesIO()
    # img.save(buffered, "JPEG")
#     img_str = base64.b64encode(buffered.getvalue()).decode('ascii')
#
#     # add some headers to the response such that a browser knows what's going on
#     response = {
#         'isBase64Encoded': True,
#         'statusCode': 200,
#         'headers': {'Content-Type': 'image/jpg'},
#         'body': img_str,
#     }
#     return response
