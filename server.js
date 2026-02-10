import express from "express";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import { streamGeminiToResponse } from "./gemini/geminiStreamClient.js";
import { understandImage } from "./gemini/geminiVisionClient.js";

const app = express();
const PORT = 3200;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const upload = multer({ dest: "uploads/" });

app.get("/stream", async (req, res) => {
  const prompt = req.query.prompt;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  await streamGeminiToResponse(prompt, res);
});


app.post("/analyze-image", upload.single("image"), async (req, res) => {
  try {
    const imagePath = req.file.path;
    const userPrompt = req.body.prompt;

    const result = await understandImage(imagePath, userPrompt);

    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
