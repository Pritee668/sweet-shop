import React, { useState } from "react";
import axios from "axios";
import "./AuthPage.css";

const LoginPage = ({ onLoginSuccess, onSwitchToRegister }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const API_URL = process.env.VITE_API_URL;

	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");

		if (!email.trim() || !password.trim()) {
			setError("Please fill in all fields.");
			return;
		}

		setLoading(true);

		try {
			const response = await axios.post(`${API_URL}/auth/login`, {
				email,
				password,
			});

			const { token, user } = response.data;

			// Store credentials
			localStorage.setItem("token", token);
			localStorage.setItem("role", user.role);
			localStorage.setItem("email", user.email);

			// Notify parent (App.js)
			onLoginSuccess(token, user.role);
		} catch (err) {
			setError(err.response?.data?.message || "Login failed. Try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="auth-container">
			<div className="auth-box">
				<h1>🍬 Sweet Shop</h1>
				<h2>Login</h2>

				{error && <div className="error-message">{error}</div>}

				<form onSubmit={handleLogin}>
					<input
						type="email"
						placeholder="Email Address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>

					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<button
						type="submit"
						disabled={loading}>
						{loading ? "Logging in..." : "Login"}
					</button>
				</form>

				<p className="switch-text">
					Don’t have an account?{" "}
					<button
						className="switch-link"
						onClick={onSwitchToRegister}>
						Register here
					</button>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
