import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from parent directory
dotenv.config({ path: resolve(__dirname, "../../.env") });

export interface Config {
  watsonxProjectId: string;
  ibmCloudApiKey: string;
  defaultModelId: string;
}

export function getConfig(): Config {
  const watsonxProjectId = process.env.WATSONX_PROJECT_ID;
  if (!watsonxProjectId) {
    throw new Error(
      "WATSONX_PROJECT_ID environment variable not set. " +
        "Please ensure .env file exists in the parent directory.",
    );
  }

  const ibmCloudApiKey = process.env.IBMCLOUD_SERVICE_ID_API_KEY;
  if (!ibmCloudApiKey) {
    throw new Error(
      "IBMCLOUD_SERVICE_ID_API_KEY environment variable not set. " +
        "Please ensure .env file exists in the parent directory.",
    );
  }

  return {
    watsonxProjectId,
    ibmCloudApiKey,
    defaultModelId: "ibm/granite-13b-instruct-v2",
  };
}
