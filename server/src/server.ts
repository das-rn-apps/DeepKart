import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cors from "cors"
import routes from "./routes";

dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request body

// API Routes
app.use("/api", routes);

// Start server and connect to MongoDB
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1); // Exit process with failure
  }
};

startServer();
