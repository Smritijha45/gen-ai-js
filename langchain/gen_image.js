import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateImages() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: [
      {
        role: "user",
        parts: [
          { text: "cat jumping on bed" }
        ]
      }
    ],
    generationConfig: {
      responseModalities: ["IMAGE"]
    }
  });

  // Extract base64 image
  const imagePart = response.candidates[0].content.parts.find(
    (part) => part.inlineData
  );

  const imageBase64 = imagePart.inlineData.data;

  // Save image locally
  fs.writeFileSync("output.png", Buffer.from(imageBase64, "base64"));

  console.log("Image saved as output.png");
}

generateImages();