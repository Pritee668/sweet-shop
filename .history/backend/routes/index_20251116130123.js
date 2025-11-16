import { Router } from "express";
import SweetsController from "../controllers/sweetsController.js";

const router = Router();
const sweetsController = new SweetsController();

// Create sweet
router.post("/sweets", (req, res) => sweetsController.createSweet(req, res));

// Get all sweets
router.get("/sweets", (req, res) => sweetsController.getAllSweets(req, res));

// Get sweet by ID
router.get("/sweets/:id", (req, res) =>
	sweetsController.getSweetById(req, res)
);

// Update sweet
router.put("/sweets/:id", (req, res) => sweetsController.updateSweet(req, res));

// Delete sweet
router.delete("/sweets/:id", (req, res) =>
	sweetsController.deleteSweet(req, res)
);

export default router;
