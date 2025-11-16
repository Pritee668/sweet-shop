import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { setupRoutes } from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Register routes
setupRoutes(app);

// Global error handler (must be last)
app.use(errorHandler);

export default app;
