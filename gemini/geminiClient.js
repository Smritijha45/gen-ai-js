import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { estimateTokens } from "../utils/tokenEstimator.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function askGemini(prompt) {
  console.log("Estimated input tokens:", estimateTokens(prompt));

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  console.log("Estimated output tokens:", estimateTokens(text));

  return text;
}
