import { Router } from "express";
import SweetsController from "../controllers/sweetsController.js";

const router = Router();
const controller = new SweetsController();

// CREATE
router.post("/", controller.createSweet.bind(controller));

// GET ALL
router.get("/", controller.getAllSweets.bind(controller));

// GET BY ID
router.get("/:id", controller.getSweetById.bind(controller));

// UPDATE
router.put("/:id", controller.updateSweet.bind(controller));

// DELETE
router.delete("/:id", controller.deleteSweet.bind(controller));

export default router;
