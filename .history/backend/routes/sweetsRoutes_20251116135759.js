import { Router } from "express";
import SweetsController from "../controllers/sweetsController.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";

const router = Router();
const controller = new SweetsController();

// 🔍 Search sweets
router.get("/search", authMiddleware, (req, res) =>
	controller.searchSweets(req, res)
);

// 📋 Get all sweets
router.get("/", authMiddleware, (req, res) =>
	controller.getAllSweets(req, res)
);

// 📌 Get sweet by ID
router.get("/:id", authMiddleware, (req, res) =>
	controller.getSweetById(req, res)
);

// ➕ Create sweet (Admin only)
router.post("/sweet", authMiddleware, adminMiddleware, (req, res) =>
	controller.createSweet(req, res)
);

// ✏️ Update sweet (Admin only)
router.put("/:id", authMiddleware, adminMiddleware, (req, res) =>
	controller.updateSweet(req, res)
);

// 🗑️ Delete sweet (Admin only)
router.delete("/:id", authMiddleware, adminMiddleware, (req, res) =>
	controller.deleteSweet(req, res)
);

// 🛒 Purchase sweet
router.post("/:id/purchase", authMiddleware, (req, res) =>
	controller.purchaseSweet(req, res)
);

// 📦 Restock sweet (Admin only)
router.post("/:id/restock", authMiddleware, adminMiddleware, (req, res) =>
	controller.restockSweet(req, res)
);

export default router;
