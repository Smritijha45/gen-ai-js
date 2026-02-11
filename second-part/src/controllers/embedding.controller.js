import { generateEmbedding } from "../services/embedding.service.js";

export async function createEmbedding(req, res) {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const embedding = await generateEmbedding(text);
    res.json({ embedding });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
