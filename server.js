import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { streamGeminiToResponse } from "./gemini/geminiStreamClient.js";

const app = express();
const PORT = 3200;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.get("/stream", async (req, res) => {
  const prompt = req.query.prompt;

  if (!prompt) {
    res.status(400).send("Prompt required");
    return;
  }

 
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  await streamGeminiToResponse(prompt, res);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
