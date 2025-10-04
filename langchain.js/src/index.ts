#!/usr/bin/env node

import React from 'react';
import { render } from 'ink';
import { parseArguments } from './cli.js';
import { App } from './components/App.js';
import { getConfig } from './config.js';

async function main() {
  try {
    // Validate configuration first
    getConfig();

    // Parse CLI arguments
    const options = parseArguments();

    // Use provided model or default
    const modelId = options.model || 'ibm/granite-13b-instruct-v2';

    // Render the Ink app
    const { waitUntilExit } = render(
      React.createElement(App, {
        question: options.question,
        modelId,
      })
    );

    // Wait for the app to finish
    await waitUntilExit();

    process.exit(0);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('An unknown error occurred');
    }
    process.exit(1);
  }
}

main();
