import dotenv from "dotenv";

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

dotenv.config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",  
  apiKey: process.env.GEMINI_API_KEY,
});

const response = await model.invoke("Explain closures in JavaScript in simple words.");

console.log(response.content);
