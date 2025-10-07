export interface CLIOptions {
  question: string;
  model?: string;
}

export interface WatsonXConfig {
  projectId: string;
  apiKey: string;
  defaultModel: string;
}
