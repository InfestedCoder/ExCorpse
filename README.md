
Exquisite Corpse is a 21st century version of a drawing game popularized by surrealist artists in the 1920s. Each player draws a portion of the 'corpse'. When an artist submits a segment it is delivered into a dynamoDB table. When all three segments of the corpse are present they are concatenated to a single image and stored in an s3 bucket. AWS Rekognition is used to tag each drawing. 

This repository contains the IaC that supports this process, Lambda in both Python and Node Runtime, and implements a AWS Serverless HTTP API with DynamoDB and offline support for local development. 

The infrastructure contained in this repository is deployed via AWS Amplify. 

To see it in action visit the Amplify hosted UI at :  https://amplify.d1kgy66goa03vv.amplifyapp.com/
Visit the drawing viewer to see your results at : https://main.d13cwcv20gn7pr.amplifyapp.com/


# Serverless-plugin used to test the drawing service locally:
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

### Start ElasticMQ
Open a new terminal, navigate to the project folder:

```bash
cd ./elasticMQ 
docker-compose up -d
```

### Start the Service

From the main project folder:

```bash
export AWS_ACCESS_KEY_ID="your_key_id"
export AWS_SECRET_ACCESS_KEY="your_secret_key"
serverless offline start
serverless dynamodb migrate
```

Note: For local testing, you do not need to use valid AWS credentials, but AWS credentials do need to be present which is why the dummy values are in the export statements above.

## Run service offline

```bash
serverless offline start
```

### Create a Drawing on your Local Machine

navigate to the UI Repository at https://github.com/bailey-mae/exquisiteCorpse
clone the repository and follow instructions to run locally


### List all Drawings

```bash
curl -H "Content-Type:application/json" http://localhost:3000/drawings
```

## Connecting to DynamoDB

The AWS NoSQL Workbench can be used to view the contents of DynamoDB

https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.html

Instructions for connecting to a local running DynamoDB instance are here

https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.querybuilder.connect.html

