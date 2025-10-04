import { Command } from 'commander';
import type { CLIOptions } from './types.js';

export function parseArguments(): CLIOptions {
  const program = new Command();

  program
    .name('watsonx-cli')
    .description('CLI tool for querying IBM WatsonX API')
    .version('1.0.0')
    .argument('<question>', 'The question to ask WatsonX')
    .option(
      '-m, --model <model-id>',
      'Model ID to use for generation',
      'ibm/granite-13b-instruct-v2'
    )
    .parse();

  const args = program.args;
  const options = program.opts();

  return {
    question: args[0],
    model: options.model,
  };
}
