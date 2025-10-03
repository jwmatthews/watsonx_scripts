#!/bin/sh

source .env
# Check existence of .env file
if [ ! -f .env ]; then
    echo ".env file not found. Please cp sample.env to .env and update to match your environment."
    exit 1
fi

# Verify we have PROJECT_ID env set or exit
if [ -z "${WATSONX_PROJECT_ID}" ]; then
    echo "WATSONX_PROJECT_ID environment variable not set."
    echo "Please cp sample.env to .env and update to match your environment."
    exit 1
fi

if [ ! -f access_token.txt ]; then
    echo "Can't find access_token.txt, please run get_access_token.sh"
    exit 1
fi
TOKEN=$(cat access_token.txt)
WATSONX_AI_URL="https://us-south.ml.cloud.ibm.com"
MODEL_ID="ibm/granite-13b-instruct-v2"
INPUT_QUESTION="Tell me a poem about Dobermanns."

# Build JSON payload with variable interpolation
JSON_PAYLOAD=$(cat <<EOF
{
   "input": "${INPUT_QUESTION}",
   "model_id": "${MODEL_ID}",
   "project_id": "${WATSONX_PROJECT_ID}"
}
EOF
)

curl -X POST \
-H "Authorization: Bearer ${TOKEN}" \
-H "Content-Type: application/json" \
"${WATSONX_AI_URL}/ml/v1/text/generation?version=2024-05-31" \
--data-raw "${JSON_PAYLOAD}"
