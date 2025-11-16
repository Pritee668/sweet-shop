import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3001;

// Safety: Check if MongoDB URI exists
if (!process.env.MONGODB_URI) {
	console.error("❌ MONGODB_URI missing in .env");
	process.exit(1);
}

mongoose
	.connect(process.env.MONGODB_URI, {
		serverSelectionTimeoutMS: 5000,
	})
	.then(() => {
		console.log("✅ MongoDB Connected");

		app.listen(PORT, () => {
			console.log(`🚀 Server running on port ${PORT}`);
			console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
		});
	})
	.catch((err) => {
		console.error("❌ MongoDB connection error:", err.message);
		process.exit(1);
	});
