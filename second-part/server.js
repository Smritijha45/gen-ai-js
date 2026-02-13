import app from "./app.js";

const PORT = process.env.PORT || 3200;

app.listen(PORT, () => {
  console.log(`Embedding service running on port ${PORT}`);
});
//no of dimensions = 1536
