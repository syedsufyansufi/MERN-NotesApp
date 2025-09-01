import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import notesRoutes from "./routes/notesRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ CORS setup
const allowedOrigins = [
  "http://localhost:5173", // Vite default
  "http://localhost:3000", // CRA default
  process.env.FRONTEND_URL, // Render frontend (if deployed separately)
].filter(Boolean); // remove undefined

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow Postman/CLI
      if (allowedOrigins.some((allowed) => origin.startsWith(allowed))) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use(express.json());
app.use(rateLimiter);

// Debug log
app.use((req, res, next) => {
  console.log(`request method: ${req.method} | url: ${req.url}`);
  next();
});

// API Routes
app.use("/api/notes", notesRoutes);

// ✅ Serve frontend build (if same service on Render)
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.resolve(__dirname, "../../frontend/dist");
  app.use(express.static(frontendPath));

  // Catch-all for React Router / SPA
  app.get("*", (req, res) => {
    res.sendFile(join(frontendPath, "index.html"));
  });
}
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
