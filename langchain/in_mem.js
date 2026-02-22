import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from "langchain/document";
import { Embeddings } from "@langchain/core/embeddings";

dotenv.config();

/* -----------------------------
   Initialize Gemini
------------------------------ */
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/* -----------------------------
   Custom Gemini Embeddings
------------------------------ */
class GeminiEmbeddings extends Embeddings {
  
  // Embed a single query
  async embedQuery(text) {
    const response = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: text, // IMPORTANT: plain string
    });

    return response.embeddings[0].values;
  }

  // Embed multiple documents
  async embedDocuments(texts) {
    const response = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: texts, // array of strings
    });

    return response.embeddings.map(e => e.values);
  }
}

/* -----------------------------
   Main Function
------------------------------ */
async function main() {
  const embeddings = new GeminiEmbeddings();

  const docs = [
    new Document({ pageContent: "My name is Smriti" }),
    new Document({ pageContent: "My age is 20 years old" }),
    new Document({ pageContent: "I live in Gurgaon" }),
    new Document({ pageContent: "I am working in dholakpur" }),
  ];

  console.log("Creating vector store...");

  const vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    embeddings
  );

  console.log("Vector store created ✅");

  const result = await vectorStore.similaritySearch(
    "Where do I work?",
    2
  );

  console.log("\n🔎 Similarity Search Result:");
  console.log(result);
}

main();