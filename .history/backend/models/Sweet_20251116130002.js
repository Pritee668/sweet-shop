import mongoose from "mongoose";

const sweetSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Sweet name is required"],
			trim: true,
			index: true, // improves search performance
		},

		category: {
			type: String,
			required: [true, "Category is required"],
			trim: true,
		},

		price: {
			type: Number,
			required: true,
			min: [0, "Price cannot be negative"],
		},

		quantity: {
			type: Number,
			required: true,
			min: [0, "Quantity cannot be negative"],
		},

		description: {
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

// Enable text search
sweetSchema.index({ name: "text", description: "text" });

const Sweet = mongoose.model("Sweet", sweetSchema);

export default Sweet;
