import React from "react";
import { Box, Text } from "ink";

interface ResponseDisplayProps {
  result: string;
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
        <Text>{result}</Text>
      </Box>
      <Box flexDirection="column" paddingLeft={2}>
        <Text color="gray">
          Model: <Text color="yellow">{modelId}</Text>
        </Text>
      </Box>
    </Box>
  );
};
