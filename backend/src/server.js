import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import notesRoutes from "./routes/notesRoutes.js";

// Load environment variables from .env file
dotenv.config();
const app = express();

const __dirname = path.resolve()
// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "http://localhost:5174", 
    "http://localhost:3000",
    "https://your-app-name.onrender.com" 
  ],
  credentials: true
}));
    
app.use(express.json());      
app.use(rateLimiter);

app.use((req, res, next) => {
  console.log(`request method is ${req.method} & request url is ${req.url}`);
  next();
});

app.use("/api/notes", notesRoutes);

const __dirname = path.resolve();

if(process.env.NODE_ENV === "production"){
  // Serve static files from the React app build directory
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
  // Catch all handler: send back React's index.html file for any non-api routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });  
}

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))
app.get("/*",(req,res)=>{
  res.sendFile(path.join(__dirname,"../frontend","dist","index.html"
  ))
})  
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
