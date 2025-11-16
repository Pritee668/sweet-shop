import authRoutes from "./authRoutes.js";
import sweetsRoutes from "./sweetsRoutes.js";

export const setupRoutes = (app) => {
	app.use("/api/auth", authRoutes);
	app.use("/api/sweets", sweetsRoutes);

	app.get("/api/health", (req, res) => {
		res.json({ status: "OK" });
	});
};
