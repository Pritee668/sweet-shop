import express from "express";
import cors from "cors";
import { setupRoutes } from "./routes/setupRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Enable CORS for frontend (React)
app.use(
	cors({
		origin: "*", // or specific: "http://localhost:5173"
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
setupRoutes(app);

// Global Error Handler (must be last)
app.use(errorHandler);

export default app;
