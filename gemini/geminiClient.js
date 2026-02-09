import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { modelConfig } from "../config/modelConfig.js";
import { estimateTokens } from "../utils/tokenEstimator.js";
import { storeResponse } from "../utils/responseStore.js";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY not found in .env");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel(modelConfig);

export async function askGemini(prompt) {
  console.log(`\n Estimated input tokens: ${estimateTokens(prompt)}`);

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  console.log(`Estimated output tokens: ${estimateTokens(text)}`);

  const responseId = storeResponse(prompt, text);

  return {
    responseId,
    text,
  };
}
