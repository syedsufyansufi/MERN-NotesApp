import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import notesRoutes from "./routes/notesRoutes.js";

// Load environment variables from .env file
dotenv.config();
const app = express();
// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"], // Adjust this to your frontend's origin
  })
);
app.use(rateLimiter);

app.use((req, res, next) => {
  console.log(`request method is ${req.method} & request url is ${req.url}`);
  next();
});

app.use("/api/notes", notesRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
