import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
	return (
		<div className="home-container">
			<h1 className="home-title">🍬 Sweet Shop Management System</h1>

			<p className="home-subtitle">
				Manage inventory, purchase sweets, and control everything from one
				powerful dashboard.
			</p>

			<div className="home-actions">
				<Link
					to="/login"
					className="home-btn primary-btn">
					Login
				</Link>

				<Link
					to="/register"
					className="home-btn secondary-btn">
					Register
				</Link>
			</div>
		</div>
	);
};

export default Home;
