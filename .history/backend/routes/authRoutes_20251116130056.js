import { Router } from "express";
import authController from "../controllers/authController.js";

const router = Router();

// User registration
router.post("/register", (req, res) => authController.register(req, res));

// User login
router.post("/login", (req, res) => authController.login(req, res));

export default router;
