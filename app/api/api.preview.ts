// services/llmService.ts

import { API_VIBE_CODE_BASE_URL } from "../constants";

export interface BuildRequest {
  userId: string;
  prompt: string;
}

export async function buildOrUpdateApp(request: BuildRequest): Promise<string>  {
  const response = await fetch(`${API_VIBE_CODE_BASE_URL}/Preview/build-or-update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${errorText}`);
  }

  return response.text(); // This will return "Build or update initiated successfully."
};
