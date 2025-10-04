import React from 'react';
import { Box, Text } from 'ink';
import type { GenerationResult } from '../types.js';

interface ResponseDisplayProps {
  result: GenerationResult;
  modelId: string;
}

export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({
  result,
  modelId,
}) => {
  return (
    <Box flexDirection="column" paddingY={1}>
      <Box marginBottom={1}>
        <Text color="green" bold>
          ✓ Response:
        </Text>
      </Box>

      <Box marginBottom={1} paddingLeft={2}>
        <Text>{result.generatedText}</Text>
      </Box>

      <Box flexDirection="column" paddingLeft={2}>
        <Text color="gray">
          Model: <Text color="yellow">{modelId}</Text>
        </Text>
        <Text color="gray">
          Tokens: <Text color="cyan">{result.tokenCount}</Text>
        </Text>
        <Text color="gray">
          Stop reason: <Text color="magenta">{result.stopReason}</Text>
        </Text>
      </Box>
    </Box>
  );
};
