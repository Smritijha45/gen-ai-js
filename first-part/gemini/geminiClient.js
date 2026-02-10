import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { modelConfig } from "../config/modelConfig.js";
import { estimateTokens } from "../utils/tokenEstimator.js";
import { storeResponse } from "../utils/responseStore.js";
import {
  addUserMessage,
  addGeminiMessage,
  getContextPrompt,
} from "../utils/chatContext.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel(modelConfig);

export async function askGemini(userInput) {

  addUserMessage(userInput);

 
  const promptWithContext = getContextPrompt();

  console.log(
    ` Estimated tokens: ${estimateTokens(promptWithContext)}`
  );

  const result = await model.generateContent(promptWithContext);
  const reply = result.response.text();

  addGeminiMessage(reply);


  const responseId = storeResponse(userInput, reply);

  return {
    responseId,
    text: reply,
  };
}
