import axios, { AxiosError } from 'axios';
import { getConfig } from './config.js';
import type {
  WatsonXGenerationRequest,
  WatsonXGenerationResponse,
  GenerationResult,
} from './types.js';

export async function generateText(
  question: string,
  modelId: string
): Promise<GenerationResult> {
  const config = getConfig();

  const requestPayload: WatsonXGenerationRequest = {
    input: question,
    model_id: modelId,
    project_id: config.watsonxProjectId,
  };

  const url = `${config.watsonxApiUrl}/ml/v1/text/generation?version=2024-05-31`;

  try {
    const response = await axios.post<WatsonXGenerationResponse>(
      url,
      requestPayload,
      {
        headers: {
          'Authorization': `Bearer ${config.accessToken}`,
          'Content-Type': 'application/json',
        },
        timeout: 60000, // 60 second timeout
      }
    );

    const result = response.data.results[0];

    return {
      generatedText: result.generated_text,
      tokenCount: result.generated_token_count,
      stopReason: result.stop_reason,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        // Server responded with error status
        throw new Error(
          `WatsonX API error (${axiosError.response.status}): ${
            JSON.stringify(axiosError.response.data)
          }`
        );
      } else if (axiosError.request) {
        // Request made but no response received
        throw new Error(
          'Network error: No response from WatsonX API. Please check your connection.'
        );
      }
    }

    // Re-throw other errors
    throw error;
  }
}
