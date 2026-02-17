import {CloudClient} from "chromadb";
import dotenv from "dotenv";
import { embedData } from "./embedData.js";

dotenv.config();

const client = new CloudClient({
    apiKey: process.env.CHROMA_API_KEY,
    tenant: process.env.CHROMA_TENANT,
    database: process.env.CHROMA_DATABASE,
});

// async function main() {
//     const collection = await client.getOrCreateCollection({
//         name: "food"
//     });
//     collection.add({
//         ids: ["2"],
//         documents: ["noodles"],
//         embeddings: [[0.1, 0.4, 0.3]]
//     });
// }
// main();
async function main() {
  const embedding = await embedData("dog");

  const collection = await client.getOrCreateCollection({
    name: "animals",
    embeddingFunction: null
  });

  await collection.add({
    ids: ["1"],
    documents: ["dog"],
    embeddings: [embedding]
  });

  
}

main();

