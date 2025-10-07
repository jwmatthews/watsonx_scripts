import React, { useState, useEffect } from "react";
import { Box } from "ink";
import { generateText } from "../watsonx-client.js";
import { LoadingSpinner } from "./LoadingSpinner.js";
import { ResponseDisplay } from "./ResponseDisplay.js";
import { ErrorDisplay } from "./ErrorDisplay.js";

interface AppProps {
  question: string;
  modelId: string;
}

export const App: React.FC<AppProps> = ({ question, modelId }) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await generateText(question, modelId);
        setResult(response);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Unknown error occurred"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResponse();
  }, [question, modelId]);

  if (loading) {
    return <LoadingSpinner modelId={modelId} />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (result) {
    return <ResponseDisplay result={result} modelId={modelId} />;
  }

  return <Box />;
};
