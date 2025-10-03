# Info to help working with WatsonX
This repo contains scripts and information to help other developers get started with [WatsonX](https://dataplatform.cloud.ibm.com/wx/home?context=wx) API access.

## Requirements
- You need to have an IBM Cloud account
- You need an API Key to a Service ID that is a collaborator to an existing WatsonX project

### Setup initial IBM Cloud and WatsonX environment
1. Create a [Cloud Object Storage](https://cloud.ibm.com/objectstorage/overview) instance which you can use with WatsonX
1. Create a [WatsonX Project](https://dataplatform.cloud.ibm.com/wx/home?context=wx) with the Cloud Object Storage instance
1. Create a [Service ID](https://cloud.ibm.com/iam/serviceids) and API Key
1. Associate the Service ID as a collaborator in the WatsonX Project

## Usage
1. `cp sample.env .env`
1. Edit .env with your `IBMCLOUD_SERVICE_ID_API_KEY` and `WATSONX_PROJECT_ID`
  * Note that `.env` is set in `.gitignore` to prevent accidental checkin of sensitive information
1. Obtain an IAM Token using the API Key by running: `./get_access_token.sh`
  * Upon successful execution, the token will be written to `./access_token.txt`
  * This is a short lived JWT we will use to authenticate with WatsonX API
  * Related info: https://cloud.ibm.com/docs/account?topic=account-iamtoken_from_apikey#iamtoken_from_apikey
1. Use the JWT with bearer auth in a curl example to prove API access is working
  * Run: `./test_watsonx_api.sh`
    * Note: this will use the token from `./access_token.txt` which is good for ~1 hour, then needs to be refreshed.
