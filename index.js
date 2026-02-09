import { askGemini } from "./gemini/geminiClient.js";

const prompt = "Explain tokens in Gemini API";

const answer = await askGemini(prompt);
console.log("\nGemini Response:\n", answer);
