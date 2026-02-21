import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from "langchain/document";
import { Embeddings } from "langchain/embeddings/base";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

class GeminiEmbeddings extends Embeddings {
  async embedQuery(text) {
    const res = await ai.models.embedContent({
      model: "text-embedding-004",
      content: text,   
    });

    return res.embedding.values;
  }

  async embedDocuments(texts) {
    const embeddings = [];

    for (const text of texts) {
      const res = await ai.models.embedContent({
        model: "text-embedding-004",
        content: text,   
      });

      embeddings.push(res.embedding.values);
    }

    return embeddings;
  }
}

async function main() {
  const embeddings = new GeminiEmbeddings();

  const docs = [
    new Document({ pageContent: "My name is Smriti" }),
    new Document({ pageContent: "My age is 20 years old" }),
    new Document({ pageContent: "I live in Gurgaon" }),
    new Document({ pageContent: "I am working in Oracle" }),
  ];

  const vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    embeddings
  );

  console.log("Vector store created");

  const result = await vectorStore.similaritySearch(
    "Where do I work?",
    1
  );

  console.log(result);
}

main();