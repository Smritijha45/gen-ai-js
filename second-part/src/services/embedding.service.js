import { embeddingModel } from "../config/gemini.js";

export async function generateEmbedding(text) {
  const result = await embeddingModel.embedContent(text);
  return result.embedding.values;
}
