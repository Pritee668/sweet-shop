import Sweet from "../models/Sweet.js";

class SweetsService {
	/**
	 * Create a new sweet — ignore accidental _id
	 */
	async createSweet(data) {
		const { _id, ...cleanData } = data;

		const sweet = new Sweet(cleanData);
		await sweet.save();

		return this.formatResponse(sweet);
	}

	/**
	 * Get all sweets
	 */
	async getAllSweets() {
		const sweets = await Sweet.find().sort({ createdAt: -1 });
		return sweets.map((item) => this.formatResponse(item));
	}

	/**
	 * Get sweet by ID
	 */
	async getSweetById(id) {
		const sweet = await Sweet.findById(id);
		return sweet ? this.formatResponse(sweet) : null;
	}

	/**
	 * Search sweets
	 */
	async searchSweets(query, category, minPrice, maxPrice) {
		const filter = {};

		if (query) filter.name = { $regex: query, $options: "i" };
		if (category) filter.category = { $regex: category, $options: "i" };

		if (minPrice !== undefined || maxPrice !== undefined) {
			filter.price = {};
			if (minPrice !== undefined) filter.price.$gte = minPrice;
			if (maxPrice !== undefined) filter.price.$lte = maxPrice;
		}

		const sweets = await Sweet.find(filter);
		return sweets.map((item) => this.formatResponse(item));
	}

	/**
	 * Update a sweet
	 */
	async updateSweet(id, data) {
		const { _id, ...cleanData } = data;

		const sweet = await Sweet.findByIdAndUpdate(id, cleanData, { new: true });

		if (!sweet) {
			throw new Error("Sweet not found");
		}

		return this.formatResponse(sweet);
	}

	/**
	 * Delete a sweet
	 */
	async deleteSweet(id) {
		const deleted = await Sweet.findByIdAndDelete(id);
		return deleted !== null;
	}

	/**
	 * Purchase a sweet
	 */
	async purchaseSweet(id, qty) {
		const sweet = await Sweet.findById(id);

		if (!sweet) throw new Error("Sweet not found");
		if (sweet.quantity < qty) throw new Error("Insufficient quantity");

		sweet.quantity -= qty;
		await sweet.save();

		return this.formatResponse(sweet);
	}

	/**
	 * Restock sweet
	 */
	async restockSweet(id, qty) {
		const sweet = await Sweet.findById(id);
		if (!sweet) throw new Error("Sweet not found");

		sweet.quantity += qty;
		await sweet.save();

		return this.formatResponse(sweet);
	}

	/**
	 * Format JSON response
	 */
	formatResponse(sweet) {
		return {
			_id: sweet._id.toString(),
			name: sweet.name,
			category: sweet.category,
			price: sweet.price,
			quantity: sweet.quantity,
			description: sweet.description || "",
			createdAt: sweet.createdAt,
			updatedAt: sweet.updatedAt,
		};
	}
}

export default SweetsService; // ✔ Correct Export
