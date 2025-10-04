# WatsonX CLI Implementation Plan

## High-Level Overview

### Goals
- Create a TypeScript-based CLI tool that queries IBM WatsonX API for text generation
- Use React and Ink for rich terminal UI rendering
- Support command-line arguments for question input and optional model selection
- Provide a clean, user-friendly terminal experience with loading states and formatted output
- Handle authentication using existing environment variables and access token infrastructure

### Technology Stack
- **Language**: TypeScript
- **UI Framework**: React + Ink (for terminal rendering)
- **CLI Parsing**: commander or yargs
- **HTTP Client**: axios or node-fetch
- **Build Tool**: tsx or ts-node for development, esbuild/tsc for production builds
- **Package Manager**: npm or yarn

### Architecture Approach
1. Single-purpose CLI that accepts arguments and makes one API call
2. Modular structure separating concerns:
   - CLI argument parsing
   - WatsonX API client
   - React/Ink UI components
   - Configuration/environment management
3. TypeScript interfaces for API request/response types
4. Error handling for API failures, authentication issues, and network errors

---

## Implementation Tasks

### 1. Project Setup and Configuration
- [ ] Initialize npm/yarn project in `langchain.js` directory
- [ ] Configure TypeScript with `tsconfig.json`:
  - Target ES2020+ for modern Node.js
  - Enable strict mode
  - Set module resolution to Node16/NodeNext
- [ ] Install core dependencies:
  - `react` and `ink` for terminal UI
  - `commander` or `yargs` for CLI argument parsing
  - `axios` for HTTP requests
  - `dotenv` for environment variable loading
- [ ] Install dev dependencies:
  - `typescript`
  - `@types/node`, `@types/react`
  - `tsx` for development execution
  - `esbuild` or `tsc` for production builds
- [ ] Create `.gitignore` for `node_modules`, `dist`, `.env`
- [ ] Set up npm scripts for:
  - `dev`: Run with tsx for development
  - `build`: Compile TypeScript to JavaScript
  - `start`: Run compiled version

### 2. Environment and Configuration Management
- [ ] Create TypeScript module for environment configuration (`src/config.ts`):
  - Load `.env` file from parent directory
  - Validate required environment variables:
    - `WATSONX_PROJECT_ID`
    - `IBMCLOUD_SERVICE_ID_API_KEY`
  - Define WatsonX API base URL
  - Define default model ID
- [ ] Create function to read access token from `../access_token.txt`
- [ ] Add error handling for missing configuration

### 3. TypeScript Type Definitions
- [ ] Create `src/types.ts` with interfaces for:
  - `WatsonXGenerationRequest`:
    - `input: string`
    - `model_id: string`
    - `project_id: string`
  - `WatsonXGenerationResponse`:
    - `generated_text: string`
    - `token_count?: number`
    - `stop_reason?: string`
  - `CLIOptions`:
    - `question: string`
    - `model?: string`

### 4. WatsonX API Client
- [ ] Create `src/watsonx-client.ts` module:
  - Export async function `generateText(question: string, modelId: string)`
  - Implement authentication using Bearer token from `access_token.txt`
  - Construct request payload matching WatsonX API format
  - Make POST request to `/ml/v1/text/generation?version=2024-05-31`
  - Handle HTTP errors and network failures
  - Parse and return response data
  - Add TypeScript types for request/response

### 5. CLI Argument Parsing
- [ ] Create `src/cli.ts` module:
  - Configure commander/yargs to accept:
    - Required positional argument: `<question>`
    - Optional flag: `--model <model-id>` or `-m <model-id>`
    - Default model: `ibm/granite-13b-instruct-v2`
  - Add `--help` documentation
  - Add `--version` flag
  - Export parsed options

### 6. React/Ink UI Components
- [ ] Create `src/components/App.tsx`:
  - Main React component that orchestrates the CLI flow
  - Accept props: `question` and `modelId`
  - Manage state:
    - Loading status
    - Response data
    - Error state
  - Use `useEffect` to trigger API call on mount
  - Render different UI states:
    - Loading spinner with message
    - Success state with formatted response
    - Error state with error details

- [ ] Create `src/components/LoadingSpinner.tsx`:
  - Display spinner using Ink's `<Spinner>` component
  - Show "Querying WatsonX..." message
  - Display model being used

- [ ] Create `src/components/ResponseDisplay.tsx`:
  - Format and display the generated text response
  - Show metadata (token count, model used, etc.)
  - Use Ink's `<Box>` and `<Text>` for styling

- [ ] Create `src/components/ErrorDisplay.tsx`:
  - Display error messages in red
  - Provide helpful troubleshooting hints
  - Handle different error types (auth, network, API errors)

### 7. Main Entry Point
- [ ] Create `src/index.ts`:
  - Import and parse CLI arguments
  - Validate configuration and environment
  - Render React/Ink app using `render()` from Ink
  - Pass question and model to App component
  - Handle process exit codes:
    - 0 for success
    - 1 for errors
  - Add shebang: `#!/usr/bin/env node`

### 8. Build and Distribution Setup
- [ ] Configure build output to `dist/` directory
- [ ] Update `package.json`:
  - Set `"bin"` field to point to compiled entry point
  - Configure `"files"` to include only necessary files
  - Set appropriate `"engines"` for Node.js version
- [ ] Create executable script or use `chmod +x` on compiled output
- [ ] Test local installation with `npm link`

### 9. Error Handling and Validation
- [ ] Add comprehensive error handling:
  - Missing or invalid access token
  - Missing environment variables
  - Network errors/timeouts
  - API errors (4xx, 5xx responses)
  - Invalid CLI arguments
- [ ] Add user-friendly error messages
- [ ] Add validation for empty questions
- [ ] Handle edge cases (very long questions, special characters)

### 10. Testing and Documentation
- [ ] Test CLI with various questions and models:
  - Short questions
  - Long questions
  - Questions with special characters
  - Different model IDs
- [ ] Test error scenarios:
  - Missing access token
  - Invalid credentials
  - Network failures
- [ ] Create `README.md` with:
  - Installation instructions
  - Usage examples
  - Configuration requirements
  - Troubleshooting guide
- [ ] Add inline code documentation/JSDoc comments

### 11. Polish and Optimization
- [ ] Add color coding to terminal output
- [ ] Implement graceful shutdown on Ctrl+C
- [ ] Add request timeout configuration
- [ ] Consider adding a `--verbose` flag for debugging
- [ ] Optimize bundle size for faster startup
- [ ] Add progress indicators for long-running requests

---

## Project Structure

```
langchain.js/
├── package.json
├── tsconfig.json
├── README.md
├── .gitignore
├── src/
│   ├── index.ts              # Main entry point
│   ├── cli.ts                # CLI argument parsing
│   ├── config.ts             # Environment/configuration
│   ├── types.ts              # TypeScript type definitions
│   ├── watsonx-client.ts     # WatsonX API client
│   └── components/
│       ├── App.tsx           # Main React component
│       ├── LoadingSpinner.tsx
│       ├── ResponseDisplay.tsx
│       └── ErrorDisplay.tsx
└── dist/                     # Compiled output (git-ignored)
```

---

## Example Usage

```bash
# Install dependencies
npm install

# Development mode
npm run dev -- "What is TypeScript?" --model ibm/granite-13b-instruct-v2

# Build for production
npm run build

# Run compiled version
npm start "Tell me about AI" -m ibm/granite-13b-instruct-v2

# With default model
npm start "What is the weather like?"
```

---

## Success Criteria

1. CLI successfully accepts question as required argument
2. CLI accepts optional model parameter with correct default
3. Successfully authenticates with WatsonX API using existing token infrastructure
4. Makes correct API request with proper payload format
5. Displays loading state while waiting for response
6. Formats and displays API response in readable terminal format
7. Handles errors gracefully with helpful messages
8. TypeScript compiles without errors
9. Code is modular and maintainable
10. Documentation is clear and complete
