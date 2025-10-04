export interface CLIOptions {
  question: string;
  model?: string;
}

export interface WatsonXGenerationRequest {
  input: string;
  model_id: string;
  project_id: string;
}

export interface WatsonXGenerationResponse {
  model_id: string;
  created_at: string;
  results: Array<{
    generated_text: string;
    generated_token_count: number;
    input_token_count: number;
    stop_reason: string;
  }>;
}

export interface GenerationResult {
  generatedText: string;
  tokenCount: number;
  stopReason: string;
}
