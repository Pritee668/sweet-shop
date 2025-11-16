import SweetsService from "../services/sweetsService.js";

class SweetsController {
	constructor() {
		// ALWAYS create an instance (your previous code was half mixing instance & static)
		this.sweetsService = new SweetsService();
	}

	/** Get all sweets */
	async getAllSweets(req, res) {
		try {
			const sweets = await this.sweetsService.getAllSweets();
			return res.status(200).json(sweets);
		} catch (error) {
			console.error("GET_ALL_SWEETS_ERROR:", error);
			return res.status(500).json({ message: "Error retrieving sweets" });
		}
	}

	/** Get sweet by ID */
	async getSweetById(req, res) {
		try {
			const sweet = await this.sweetsService.getSweetById(req.params.id);

			if (!sweet) {
				return res.status(404).json({ message: "Sweet not found" });
			}

			return res.status(200).json(sweet);
		} catch (error) {
			console.error("GET_SWEET_BY_ID_ERROR:", error);
			return res.status(500).json({ message: "Error retrieving sweet" });
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

			return res.status(200).json(results);
		} catch (error) {
			console.error("SEARCH_SWEETS_ERROR:", error);
			return res.status(500).json({ message: "Error searching sweets" });
		}
	}

	/** Create sweet */
	async createSweet(req, res) {
		try {
			const sweet = await this.sweetsService.createSweet(req.body);
			return res.status(201).json(sweet);
		} catch (error) {
			console.error("CREATE_SWEET_ERROR:", error);
			return res.status(500).json({ message: "Error creating sweet" });
		}
	}

	/** Update sweet */
	async updateSweet(req, res) {
		try {
			const updated = await this.sweetsService.updateSweet(
				req.params.id,
				req.body
			);

			return res.status(200).json(updated);
		} catch (error) {
			if (error.message === "Sweet not found") {
				return res.status(404).json({ message: "Sweet not found" });
			}
			console.error("UPDATE_SWEET_ERROR:", error);
			return res.status(500).json({ message: "Error updating sweet" });
		}
	}

	/** Delete sweet */
	async deleteSweet(req, res) {
		try {
			const deleted = await this.sweetsService.deleteSweet(req.params.id);

			if (!deleted) {
				return res.status(404).json({ message: "Sweet not found" });
			}

			return res.status(204).send();
		} catch (error) {
			console.error("DELETE_SWEET_ERROR:", error);
			return res.status(500).json({ message: "Error deleting sweet" });
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

			return res.status(200).json(updated);
		} catch (error) {
			if (error.message === "Sweet not found") {
				return res.status(404).json({ message: "Sweet not found" });
			}

			if (error.message === "Insufficient quantity") {
				return res.status(400).json({ message: "Insufficient quantity" });
			}

			console.error("PURCHASE_SWEET_ERROR:", error);
			return res.status(500).json({ message: "Error purchasing sweet" });
		}
	}

	/** Restock sweet */
	async restockSweet(req, res) {
		try {
			const qty = req.body.quantity || 1;

			const updated = await this.sweetsService.restockSweet(req.params.id, qty);

			return res.status(200).json(updated);
		} catch (error) {
			if (error.message === "Sweet not found") {
				return res.status(404).json({ message: "Sweet not found" });
			}

			console.error("RESTOCK_SWEET_ERROR:", error);
			return res.status(500).json({ message: "Error restocking sweet" });
		}
	}
}

export default SweetsController;
