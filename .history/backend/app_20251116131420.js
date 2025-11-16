import express from "express";
import cors from "cors";
import { setupRoutes } from "./routes/setupRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // <-- FIX: use express.json()
app.use(express.urlencoded({ extended: true })); // optional but useful

// Register routes
setupRoutes(app);

// Global error handler (must be last)
app.use(errorHandler);

export default app;
