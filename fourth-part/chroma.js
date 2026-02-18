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
    ids: ["3"],
    documents: ["lion"],
    embeddings: [embedding]
  });

  
}

//main();
async function findSimilarity() {
  const animals = await client.getCollection({
    name: "animals"
  });

  const queryEmbedding = await embedData("get me animals");

//   console.log(queryEmbedding);        
//   console.log(queryEmbedding.length); 

  const results = await animals.query({
    queryEmbeddings: [queryEmbedding],
    nResults: 3,
  });

  console.log(results);
}

findSimilarity();
