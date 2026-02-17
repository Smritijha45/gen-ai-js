import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: [
      {
        role: "user",
        parts: [{ text: "What is the meaning of life?" }],
      },
    ],
    outputDimensionality: 768,
  });

  const embeddingLength = response.embeddings[0].values.length;

  console.log(`Length of embedding: ${embeddingLength}`);
}

main();
