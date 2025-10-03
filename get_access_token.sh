#!/bin/bash

# Check existence of .env file
if [ ! -f .env ]; then
    echo ".env file not found. Please cp sample.env to .env and update to match your environment."
    exit 1
fi

source .env

# Verify we have IBMCLOUD_SERVICE_ID_API_KEY env set or exit
if [ -z "${IBMCLOUD_SERVICE_ID_API_KEY}" ]; then
    echo "IBMCLOUD_SERVICE_ID_API_KEY environment variable not set."
    echo "Please cp sample.env to .env and update to match your environment."
    exit 1
fi

curl -s -X POST 'https://iam.cloud.ibm.com/identity/token' \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -d "grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${IBMCLOUD_SERVICE_ID_API_KEY}" \
    | grep -o '"access_token":"[^"]*"' \
    | sed 's/"access_token":"\(.*\)"/\1/' > access_token.txt

echo "Token saved to access_token.txt"
