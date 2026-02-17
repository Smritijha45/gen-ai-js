import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const texts = JSON.parse(fs.readFileSync("data.json"));

async function embedData() {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: texts.map(text => ({
      role: "user",
      parts: [{ text }]
    }))
  });

  const embeddings = response.embeddings.map((e, i) => ({
    text: texts[i],
    embedding: e.values
  }));

  fs.writeFileSync("embeddings.json", JSON.stringify(embeddings, null, 2));

  console.log("Embeddings stored successfully ✅");
}

embedData();
