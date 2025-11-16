import authRoutes from "./authRoutes.js";
import sweetsRoutes from "./sweetsRoutes.js";

export const setupRoutes = (app) => {
	// Auth routes → /api/auth/*
	app.use("/api/auth", authRoutes);

	// Sweets routes → /api/sweets/*
	app.use("/api/sweets", sweetsRoutes);

	// Health check
	app.get("/api/health", (req, res) => {
		res.json({ status: "OK" });
	});
};
