import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import dotenv from "dotenv";
import { modelConfig } from "../config/modelConfig.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "models/gemini-2.5-flash",
});

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: fs.readFileSync(path).toString("base64"),
      mimeType,
    },
  };
}

export async function understandImage(imagePath, prompt) {
  const imagePart = fileToGenerativePart(imagePath, "image/jpeg");

  const result = await model.generateContent([
    prompt || "Describe this image in detail",
    imagePart,
  ]);

  return result.response.text();
}
