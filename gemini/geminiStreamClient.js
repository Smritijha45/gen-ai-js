import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { modelConfig } from "../config/modelConfig.js";
import {
  addUserMessage,
  addGeminiMessage,
  getContextPrompt,
} from "../utils/chatContext.js";
import { storeResponse } from "../utils/responseStore.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel(modelConfig);

export async function streamGemini(userInput) {
  
  addUserMessage(userInput);


  const prompt = getContextPrompt();

 
  const stream = await model.generateContentStream(prompt);

  let fullResponse = "";

  for await (const chunk of stream.stream) {
    const text = chunk.text();
    fullResponse += text;
    process.stdout.write(text); 
  }


  addGeminiMessage(fullResponse);

  
  storeResponse(userInput, fullResponse);

  return fullResponse;
}
