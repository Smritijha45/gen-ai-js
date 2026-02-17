import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import { cosineSimilarity } from "./similarity.js";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function search(query) {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: [{
      role: "user",
      parts: [{ text: query }]
    }]
  });

  const queryEmbedding = response.embeddings[0].values;

  const storedData = JSON.parse(fs.readFileSync("embeddings.json"));

  let bestMatch = null;
  let highestScore = -1;

  for (const item of storedData) {
    const score = cosineSimilarity(queryEmbedding, item.embedding);

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item.text;
    }
  }

  console.log(`\nBest Match: ${bestMatch}`);
  console.log(`Similarity Score: ${highestScore.toFixed(4)}\n`);
}

search("What is the purpose of existence?");
