import React, { useState } from "react";
import "./SweetsList.css";

function SweetsList({ sweets, userRole, onPurchase, onDelete, onRestock }) {
	const [restockId, setRestockId] = useState(null);
	const [restockQty, setRestockQty] = useState(1);

	if (sweets.length === 0) {
		return <p className="no-sweets">No sweets available</p>;
	}

	const handleRestockSubmit = (id) => {
		if (!onRestock || restockQty <= 0) return;

		onRestock(id, restockQty);
		setRestockId(null);
		setRestockQty(1);
	};

	return (
		<div className="sweets-grid">
			{sweets.map((sweet) => (
				<div
					key={sweet._id}
					className="sweet-card">
					<div className="sweet-header">
						<h3>{sweet.name}</h3>
						<span className="category">{sweet.category}</span>
					</div>

					{/* Description */}
					{sweet.description && (
						<p className="description">{sweet.description}</p>
					)}

					{/* Price & Stock */}
					<div className="sweet-details">
						<div>
							<strong>Price: </strong>₹{sweet.price.toFixed(2)}
						</div>
						<div>
							<strong>Stock: </strong>
							<span className={sweet.quantity === 0 ? "out-stock" : ""}>
								{sweet.quantity}
							</span>
						</div>
					</div>

					{/* Buttons */}
					<div className="sweet-actions">
						<button
							onClick={() => onPurchase(sweet._id)}
							disabled={sweet.quantity === 0}
							className="purchase-btn">
							{sweet.quantity === 0 ? "Out of Stock" : "🛒 Purchase"}
						</button>

						{/* Admin options */}
						{userRole === "admin" && (
							<>
								<button
									onClick={() => onDelete(sweet._id)}
									className="delete-btn">
									🗑️ Delete
								</button>

								<button
									onClick={() =>
										setRestockId(restockId === sweet._id ? null : sweet._id)
									}
									className="restock-btn">
									📦 Restock
								</button>
							</>
						)}
					</div>

					{/* Restock Box */}
					{restockId === sweet._id && (
						<div className="restock-form">
							<input
								type="number"
								min="1"
								value={restockQty}
								onChange={(e) => setRestockQty(Number(e.target.value))}
								placeholder="Quantity"
							/>
							<button
								onClick={() => handleRestockSubmit(sweet._id)}
								className="confirm-btn">
								Confirm
							</button>
						</div>
					)}
				</div>
			))}
		</div>
	);
}

export default SweetsList;
