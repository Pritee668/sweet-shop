import React, { useState } from "react";
import "./AddSweetForm.css";

function AddSweetForm({ onAdd }) {
	const [formData, setFormData] = useState({
		name: "",
		category: "",
		price: 0,
		quantity: 0,
		description: "",
	});

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const API_URL = import.meta.env.VITE_API_URL; // ✅ FIXED

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]:
				name === "price" || name === "quantity" ? Number(value) || 0 : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (!formData.name.trim()) return setError("Sweet name is required");
		if (!formData.category.trim()) return setError("Category is required");
		if (formData.price <= 0) return setError("Price must be greater than 0");
		if (formData.quantity < 0) return setError("Quantity cannot be negative");

		setLoading(true);

		try {
			const token = localStorage.getItem("token");
			if (!token) {
				setError("Unauthorized — please login again.");
				setLoading(false);
				return;
			}

			const response = await fetch(`${API_URL}/sweets`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				const err = await response.json();
				setError(err.message || "Failed to add sweet");
				setLoading(false);
				return;
			}

			const data = await response.json();
			onAdd(data);

			setFormData({
				name: "",
				category: "",
				price: 0,
				quantity: 0,
				description: "",
			});
		} catch (error) {
			setError("Network error — please try again");
		}

		setLoading(false);
	};

	return (
		<form
			className="add-sweet-form"
			onSubmit={handleSubmit}>
			{error && <div className="error-message">{error}</div>}

			<input
				type="text"
				name="name"
				placeholder="Sweet Name *"
				value={formData.name}
				onChange={handleChange}
				required
			/>

			<input
				type="text"
				name="category"
				placeholder="Category *"
				value={formData.category}
				onChange={handleChange}
				required
			/>

			<input
				type="number"
				name="price"
				placeholder="Price *"
				value={formData.price === 0 ? "" : formData.price}
				onChange={handleChange}
				step="0.01"
				min="0"
				required
			/>

			<input
				type="number"
				name="quantity"
				placeholder="Quantity *"
				value={formData.quantity === 0 ? "" : formData.quantity}
				onChange={handleChange}
				min="0"
				required
			/>

			<textarea
				name="description"
				placeholder="Description"
				value={formData.description}
				onChange={handleChange}
			/>

			<button
				type="submit"
				disabled={loading}>
				{loading ? "Adding..." : "Add Sweet"}
			</button>
		</form>
	);
}

export default AddSweetForm;
