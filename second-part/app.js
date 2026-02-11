import express from "express";
import embeddingRoutes from "./routes/embedding.routes.js";

const app = express();

app.use(express.json());
app.use("/api/embeddings", embeddingRoutes);

export default app;
