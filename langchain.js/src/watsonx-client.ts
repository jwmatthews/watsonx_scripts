import { WatsonxAI } from "@langchain/community/llms/watsonx_ai";
import { getConfig } from "./config.js";

export async function generateText(
  question: string,
  modelId: string,
): Promise<string> {
  const config = getConfig();

  const watsonxAI = new WatsonxAI({
    modelId: modelId,
    version: "2024-05-31",
    projectId: config.watsonxProjectId,
    ibmCloudApiKey: config.ibmCloudApiKey,
  });

  try {
    const result = await watsonxAI.invoke(question);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`WatsonX API error: ${error.message}`);
    }
    throw error;
  }
}
