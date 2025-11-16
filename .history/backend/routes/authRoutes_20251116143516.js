import { Router } from "express";
import authController from "../controllers/authController.js";

const router = Router();

router.post("/auth/register", async (req, res) => {
	try {
		await authController.register(req, res);
	} catch (err) {
		console.error("Register route error:", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

router.post("/login", async (req, res) => {
	try {
		await authController.login(req, res);
	} catch (err) {
		console.error("Login route error:", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

export default router;
