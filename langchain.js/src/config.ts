import dotenv from "dotenv";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from parent directory
dotenv.config({ path: resolve(__dirname, "../../.env") });

export interface Config {
  watsonxProjectId: string;
  watsonxApiUrl: string;
  defaultModelId: string;
  accessToken: string;
}

export function getConfig(): Config {
  const watsonxProjectId = process.env.WATSONX_PROJECT_ID;

  if (!watsonxProjectId) {
    throw new Error(
      "WATSONX_PROJECT_ID environment variable not set. " +
        "Please ensure .env file exists in the parent directory.",
    );
  }

  // Read access token from parent directory
  let accessToken: string;
  try {
    const tokenPath = resolve(__dirname, "../../access_token.txt");
    accessToken = readFileSync(tokenPath, "utf-8").trim();
  } catch (error) {
    throw new Error(
      "Cannot read access_token.txt. Please run get_access_token.sh first.",
    );
  }

  if (!accessToken) {
    throw new Error(
      "Access token is empty. Please run get_access_token.sh first.",
    );
  }

  return {
    watsonxProjectId,
    watsonxApiUrl: "https://us-south.ml.cloud.ibm.com",
    defaultModelId: "ibm/granite-13b-instruct-v2",
    accessToken,
  };
}
