import React from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';

interface LoadingSpinnerProps {
  modelId: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ modelId }) => {
  return (
    <Box>
      <Text>
        <Text color="cyan">
          <Spinner type="dots" />
        </Text>
        {' '}
        <Text color="gray">Querying WatsonX with model </Text>
        <Text color="yellow">{modelId}</Text>
        <Text color="gray">...</Text>
      </Text>
    </Box>
  );
};
