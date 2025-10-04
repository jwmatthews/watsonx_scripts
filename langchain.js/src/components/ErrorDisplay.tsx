import React from 'react';
import { Box, Text } from 'ink';

interface ErrorDisplayProps {
  error: Error;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  return (
    <Box flexDirection="column" paddingY={1}>
      <Box marginBottom={1}>
        <Text color="red" bold>
          ✗ Error:
        </Text>
      </Box>

      <Box paddingLeft={2}>
        <Text color="red">{error.message}</Text>
      </Box>

      <Box marginTop={1} paddingLeft={2}>
        <Text color="gray" dimColor>
          Troubleshooting tips:
        </Text>
      </Box>
      <Box paddingLeft={2}>
        <Text color="gray" dimColor>
          • Ensure .env file exists with WATSONX_PROJECT_ID
        </Text>
      </Box>
      <Box paddingLeft={2}>
        <Text color="gray" dimColor>
          • Run get_access_token.sh to refresh your token
        </Text>
      </Box>
      <Box paddingLeft={2}>
        <Text color="gray" dimColor>
          • Check your network connection
        </Text>
      </Box>
    </Box>
  );
};
