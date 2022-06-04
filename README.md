<!--
title: 'AWS Serverless HTTP API with DynamoDB and offline support example in NodeJS'
description: 'This example demonstrates how to run a service locally, using the ''serverless-offline'' plugin. It provides an HTTP API to manage Todos stored in DynamoDB.'
layout: Doc
framework: v1
platform: AWS
language: nodeJS
authorLink: 'https://github.com/adambrgmn'
authorName: 'Adam Bergman'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13746650?v=4&s=140'
-->
# Serverless HTTP API with DynamoDB and offline support

Example taken form Adam Bergman https://github.com/adambrgmn

https://www.serverless.com/examples/aws-node-rest-api-with-dynamodb-and-offline

This example demonstrates how to run a service locally, using the
[serverless-offline](https://github.com/dherault/serverless-offline) plugin. It
provides an HTTP API to manage Todos stored in a DynamoDB, similar to the
[aws-node-http-api-dynamodb](https://github.com/serverless/examples/tree/master/aws-node-http-api-dynamodb)
example. A local DynamoDB instance is provided by the
[serverless-dynamodb-local](https://github.com/99xt/serverless-dynamodb-local)
plugin.

## Use-case

Test your service locally, without having to deploy it first.

## Prereqs (for Mac)

### Homebrew

https://brew.sh/

### npm

```bash
brew install npm
```

### Docker

```bash
brew install --cask docker
brew install docker-compose
```
After install is complete, run Docker.app to start Docker Desktop and the daemon

### Serverless

```bash
brew install serverless
```

## Setup

### npm
```bash
npm install
```

### Start DynamoDB
Open a new terminal, navigate to the project folder:

```bash
cd ./dynamodb_local 
docker-compose up -d
```

### Start the Service

From the main project folder:

```bash
export AWS_ACCESS_KEY_ID="your_key_id"
export AWS_SECRET_ACCESS_KEY="your_secret_key"
serverless offline start
serverless dynamodb migrate (this imports schema)
```

Note: For local testing, you do not need to use valid AWS credentials, but AWS credentials do need to be present which is why the dummy values are in the export statements above.

## Run service offline

```bash
serverless offline start
```

## Usage

You can create, retrieve, update, or delete todos with the following commands:

### Create a Todo

```bash
curl -X POST -H "Content-Type:application/json" http://localhost:3000/todos --data '{ "text": "Learn Serverless" }'
```

Example Result:
```bash
{"text":"Learn Serverless","id":"ee6490d0-aa11e6-9ede-afdfa051af86","createdAt":1479138570824,"checked":false,"updatedAt":1479138570824}%
```

### List all Todos

```bash
curl -H "Content-Type:application/json" http://localhost:3000/todos
```

Example output:
```bash
[{"text":"Deploy my first service","id":"ac90feaa11e6-9ede-afdfa051af86","checked":true,"updatedAt":1479139961304},{"text":"Learn Serverless","id":"206793aa11e6-9ede-afdfa051af86","createdAt":1479139943241,"checked":false,"updatedAt":1479139943241}]%
```

### Get one Todo

```bash
# Replace the <id> part with a real id from your todos table
curl -H "Content-Type:application/json" http://localhost:3000/todos/<id>
```

Example Result:
```bash
{"text":"Learn Serverless","id":"ee6490d0-aa11e6-9ede-afdfa051af86","createdAt":1479138570824,"checked":false,"updatedAt":1479138570824}%
```

### Update a Todo

```bash
# Replace the <id> part with a real id from your todos table
curl -X PUT -H "Content-Type:application/json" http://localhost:3000/todos/<id> --data '{ "text": "Learn Serverless", "checked": true }'
```

Example Result:
```bash
{"text":"Learn Serverless","id":"ee6490d0-aa11e6-9ede-afdfa051af86","createdAt":1479138570824,"checked":true,"updatedAt":1479138570824}%
```

### Delete a Todo

```bash
# Replace the <id> part with a real id from your todos table
curl -X DELETE -H "Content-Type:application/json" http://localhost:3000/todos/<id>
```

No output

## Connecting to DynamoDB

The AWS NoSQL Workbench can be used to view the contents of DynamoDB

https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.html

Instructions for connecting to a local running DynamoDB instance are here

https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.querybuilder.connect.html
