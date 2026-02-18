import { CloudClient } from "chromadb";
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
  const smritiData = await embedData([
    "Smriti is a student of btech in computer science.",
    "She is interested in learning about artificial intelligence.",
    "she is 20 years old.",
    "She has a pet dog.",
  ]);

  const collection = await client.getOrCreateCollection({
    name: "usersData",
    embeddingFunction: null,
  });

  await collection.add({
    ids: ["1", "2", "3", "4"],
    documents: [
      "Smriti is a student of btech in computer science.",
      "She is interested in learning about artificial intelligence.",
      "she is 20 years old.",
      "She has a pet dog.",
    ],
    embeddings: smritiData,
  });
}

//main();
async function findSimilarity() {
  const usersData = await client.getCollection({
    name: "usersData",
  });

  const queryEmbedding = await embedData("what is her age?");

  //   console.log(queryEmbedding);
  //   console.log(queryEmbedding.length);

  const results = await usersData.query({
    queryEmbeddings: [queryEmbedding],
    nResults: 1,
  });

  console.log(results);
}

findSimilarity();
