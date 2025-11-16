import SweetsService from "../services/sweetsService.js";

class SweetsController {
	constructor() {
		this.sweetsService = new SweetsService();
	}

	/** Get all sweets */
	async getAllSweets(req, res) {
		try {
			const sweets = await this.sweetsService.getAllSweets();
			res.status(200).json(sweets);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Error retrieving sweets" });
		}
	}

	/** Get sweet by ID */
	async getSweetById(req, res) {
		try {
			const sweet = await this.sweetsService.getSweetById(req.params.id);
			if (!sweet) {
				return res.status(404).json({ message: "Sweet not found" });
			}
			res.status(200).json(sweet);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Error retrieving sweet" });
		}
	}

	/** Search sweets */
	async searchSweets(req, res) {
		try {
			const { query, category, minPrice, maxPrice } = req.query;

			const results = await this.sweetsService.searchSweets(
				query || "",
				category || "",
				minPrice ? Number(minPrice) : undefined,
				maxPrice ? Number(maxPrice) : undefined
			);

			res.status(200).json(results);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Error searching sweets" });
		}
	}

	/** Create new sweet */
	async createSweet(req, res) {
		try {
			const sweet = await this.sweetsService.createSweet(req.body);
			res.status(201).json(sweet);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Error creating sweet" });
		}
	}

	/** Update sweet */
	async updateSweet(req, res) {
		try {
			const sweet = await this.sweetsService.updateSweet(
				req.params.id,
				req.body
			);
			res.status(200).json(sweet);
		} catch (error) {
			if (error.message === "Sweet not found") {
				return res.status(404).json({ message: "Sweet not found" });
			}
			console.error(error);
			res.status(500).json({ message: "Error updating sweet" });
		}
	}

	/** Delete sweet */
	async deleteSweet(req, res) {
		try {
			const deleted = await this.sweetsService.deleteSweet(req.params.id);

			if (!deleted) {
				return res.status(404).json({ message: "Sweet not found" });
			}

			res.status(204).send();
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Error deleting sweet" });
		}
	}

	/** Purchase sweet */
	async purchaseSweet(req, res) {
		try {
			const qty = req.body.quantity || 1;

			const updated = await this.sweetsService.purchaseSweet(
				req.params.id,
				qty
			);

			res.status(200).json(updated);
		} catch (error) {
			if (error.message === "Sweet not found") {
				return res.status(404).json({ message: "Sweet not found" });
			}
			if (error.message === "Insufficient quantity") {
				return res.status(400).json({ message: "Insufficient quantity" });
			}
			console.error(error);
			res.status(500).json({ message: "Error purchasing sweet" });
		}
	}

	/** Restock sweet */
	async restockSweet(req, res) {
		try {
			const qty = req.body.quantity || 1;

			const updated = await this.sweetsService.restockSweet(req.params.id, qty);

			res.status(200).json(updated);
		} catch (error) {
			if (error.message === "Sweet not found") {
				return res.status(404).json({ message: "Sweet not found" });
			}
			console.error(error);
			res.status(500).json({ message: "Error restocking sweet" });
		}
	}
}

export default SweetsController;
