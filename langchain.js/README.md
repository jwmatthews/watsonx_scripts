# WatsonX CLI

A TypeScript-based CLI tool for querying IBM WatsonX API using React and Ink for beautiful terminal output.

## Features

- 🚀 Simple CLI interface for WatsonX text generation
- 🎨 Rich terminal UI with loading states and formatted output
- ⚙️ Configurable model selection
- 🔐 Secure authentication using environment variables and access tokens
- 📦 Built with TypeScript, React, and Ink

## Prerequisites

- Node.js >= 18.0.0
- Valid WatsonX credentials configured in parent directory's `.env` file
- Access token generated via `get_access_token.sh`

## Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

## Configuration

Ensure the following files exist in the parent directory:

### `.env` file
```bash
WATSONX_PROJECT_ID="your-project-id"
IBMCLOUD_SERVICE_ID_API_KEY="your-api-key"
```

### Access Token
Generate an access token by running:
```bash
../get_access_token.sh
```

This creates `access_token.txt` in the parent directory.

## Usage

### Development Mode
```bash
npm run dev -- "<your question>"
```

### With Custom Model
```bash
npm run dev -- "<your question>" --model "ibm/granite-13b-instruct-v2"
# or short form
npm run dev -- "<your question>" -m "ibm/granite-13b-instruct-v2"
```

### Production Mode
```bash
# Build first
npm run build

# Run the compiled version
npm start "<your question>"
```

### Examples

```bash
# Simple question with default model
npm run dev -- "What is TypeScript?"

# Question with specific model
npm run dev -- "Tell me a haiku about coding" -m "ibm/granite-13b-instruct-v2"

# Complex question
npm run dev -- "Explain the difference between REST and GraphQL APIs"
```

## Help

```bash
npm run dev -- --help
```

## Project Structure

```
langchain.js/
├── src/
│   ├── index.ts              # Main entry point
│   ├── cli.ts                # CLI argument parsing
│   ├── config.ts             # Environment configuration
│   ├── types.ts              # TypeScript type definitions
│   ├── watsonx-client.ts     # WatsonX API client
│   └── components/
│       ├── App.tsx           # Main React component
│       ├── LoadingSpinner.tsx
│       ├── ResponseDisplay.tsx
│       └── ErrorDisplay.tsx
├── dist/                     # Compiled output
├── package.json
├── tsconfig.json
└── README.md
```

## Output Format

The CLI displays:
- ✓ **Response**: The generated text from WatsonX
- **Model**: The model ID used
- **Tokens**: Number of tokens generated
- **Stop reason**: Why the generation stopped

## Error Handling

The CLI provides helpful error messages for common issues:
- Missing or invalid access token
- Missing environment variables
- Network errors
- API errors

## Development

```bash
# Run in development mode with watch
npm run dev -- "test question"

# Build TypeScript
npm run build

# Run production build
npm start "test question"
```

## Troubleshooting

### "Cannot read access_token.txt"
Run `../get_access_token.sh` to generate a fresh access token.

### "WATSONX_PROJECT_ID environment variable not set"
Ensure `.env` file exists in the parent directory with required variables.

### Network errors
Check your internet connection and verify the WatsonX API endpoint is accessible.

## License

ISC
