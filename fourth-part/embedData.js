import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/**
 * Generates embedding for a single text
 * @param {string} text
 * @returns {Promise<number[]>} embedding vector
 */
export async function embedData(text) {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: [
      {
        role: "user",
        parts: [{ text }]
      }
    ]
  });

  const embedding = response.embeddings[0].values;

  return embedding;
}
