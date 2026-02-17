import {CloudClient} from "chromadb";
import dotenv from "dotenv";

dotenv.config();

const client = new CloudClient({
    apiKey: process.env.CHROMA_API_KEY,
    tenant: process.env.CHROMA_TENANT,
    database: process.env.CHROMA_DATABASE,
});

async function main() {
    await client.createCollection({
        name: "test_collection2"
    });
    await client.createEmbedding({
        collection: "test_collection2",
        text: "Hello, world!"
    });
}
main();