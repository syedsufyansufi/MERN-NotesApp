import express from "express";

const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Test server working!" });
});

app.get("/test/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `Test route with ID: ${id}` });
});

app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
});