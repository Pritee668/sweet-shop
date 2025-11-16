import React, { useState, useEffect, useCallback, useMemo } from "react";
import api from "../../src/api/api"; // <-- centralized axios instance
import SweetsList from "../components/SweetsList";
import AddSweetForm from "../components/AddSweetForm";
import "./Dashboard.css";

const Dashboard = ({ userRole, onLogout }) => {
	const [sweets, setSweets] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [showAddForm, setShowAddForm] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	// Fetch sweets
	const fetchSweets = useCallback(async () => {
		try {
			setLoading(true);
			const res = await api.get("/sweets");
			setSweets(res.data);
			setError("");
		} catch (err) {
			setError("Failed to fetch sweets");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchSweets();
	}, [fetchSweets]);

	// Search sweets
	const handleSearch = async (e) => {
		e.preventDefault();
		try {
			const res = await api.get(`/sweets/search?query=${searchQuery}`);
			setSweets(res.data);
		} catch (err) {
			setError("Search failed");
		}
	};

	// Add new sweet
	const handleAddSweet = async (sweetData) => {
		try {
			await api.post("/sweets", sweetData);
			setSuccess("Sweet added successfully!");
			setShowAddForm(false);
			setTimeout(() => setSuccess(""), 2000);
			fetchSweets();
		} catch (err) {
			setError(err.response?.data?.message || "Failed to add sweet");
		}
	};

	// Purchase sweet
	const handlePurchase = async (sweetId) => {
		try {
			await api.post(`/sweets/${sweetId}/purchase`, { quantity: 1 });
			setSuccess("Purchase successful!");
			setTimeout(() => setSuccess(""), 2000);
			fetchSweets();
		} catch (err) {
			setError(err.response?.data?.message || "Purchase failed");
		}
	};

	// Delete sweet
	const handleDelete = async (sweetId) => {
		if (!window.confirm("Delete this sweet?")) return;
		try {
			await api.delete(`/sweets/${sweetId}`);
			setSuccess("Sweet deleted successfully!");
			setTimeout(() => setSuccess(""), 2000);
			fetchSweets();
		} catch (err) {
			setError("Delete failed");
		}
	};

	// Restock sweet
	const handleRestock = async (sweetId, quantity) => {
		try {
			await api.post(`/sweets/${sweetId}/restock`, { quantity });
			setSuccess("Restock successful!");
			setTimeout(() => setSuccess(""), 2000);
			fetchSweets();
		} catch (err) {
			setError("Restock failed");
		}
	};

	return (
		<div className="dashboard">
			<header className="dashboard-header">
				<div>
					<h1>🍬 Sweet Shop Dashboard</h1>
					<p className="role-badge">
						Role: <strong>{userRole.toUpperCase()}</strong>
					</p>
				</div>

				<button
					className="logout-btn"
					onClick={onLogout}>
					Logout
				</button>
			</header>

			{error && <div className="error-message">{error}</div>}
			{success && <div className="success-message">{success}</div>}

			{/* SEARCH */}
			<div className="search-section">
				<form onSubmit={handleSearch}>
					<input
						type="text"
						placeholder="Search sweets..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<button type="submit">Search</button>
					<button
						type="button"
						onClick={() => {
							setSearchQuery("");
							fetchSweets();
						}}>
						Clear
					</button>
				</form>
			</div>

			{/* ADMIN: ADD SWEET */}
			{userRole === "admin" && (
				<div className="admin-section">
					<button
						className="add-btn"
						onClick={() => setShowAddForm(!showAddForm)}>
						{showAddForm ? "Cancel" : "+ Add Sweet"}
					</button>

					{showAddForm && <AddSweetForm onAdd={handleAddSweet} />}
				</div>
			)}

			{/* SWEETS LIST */}
			{loading ? (
				<p className="loading">Loading sweets...</p>
			) : (
				<SweetsList
					sweets={sweets}
					userRole={userRole}
					onPurchase={handlePurchase}
					onDelete={handleDelete}
					onRestock={handleRestock}
				/>
			)}
		</div>
	);
};

export default Dashboard;
