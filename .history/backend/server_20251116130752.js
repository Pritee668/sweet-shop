import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("✅ MongoDB Connected");
		app.listen(PORT, () => {
			console.log(`🚀 Server running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.error("❌ MongoDB connection error:", err);
	});
