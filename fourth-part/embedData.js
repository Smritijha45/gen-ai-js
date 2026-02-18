import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/**
 * Generates embeddings
 * Supports:
 *  - Single string → returns single embedding vector
 *  - Array of strings → returns array of embedding vectors
 *
 * @param {string | string[]} input
 * @returns {Promise<number[] | number[][]>}
 */
export async function embedData(input) {
  const texts = Array.isArray(input) ? input : [input];

  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: texts.map((text) => ({
      role: "user",
      parts: [{ text }],
    })),
  });

  const embeddings = response.embeddings.map((e) => e.values);

  // If original input was single string → return single vector
  if (!Array.isArray(input)) {
    return embeddings[0];
  }

  // If original input was array → return array of vectors
  return embeddings;
}
