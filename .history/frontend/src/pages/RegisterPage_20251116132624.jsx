import React, { useState } from "react";
import axios from "axios";
import "./AuthPage.css";

const RegisterPage = ({ onRegisterSuccess, onSwitchToLogin }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);

	const API_URL = import.meta.env.VITE_API_URL;

	const handleRegister = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		const trimmedEmail = email.trim();
		const trimmedPassword = password.trim();

		// Email validation
		const emailRegex =
			/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		if (!emailRegex.test(trimmedEmail)) {
			setError("Please enter a valid email address");
			return;
		}

		// Passwords match?
		if (trimmedPassword !== confirmPassword.trim()) {
			setError("Passwords do not match");
			return;
		}

		// Length check
		if (trimmedPassword.length < 6) {
			setError("Password must be at least 6 characters");
			return;
		}

		setLoading(true);

		try {
			await axios.post(`${API_URL}/auth/register`, {
				email: trimmedEmail,
				password: trimmedPassword,
			});

			setSuccess("Registration successful! Redirecting to login...");

			// Delay & redirect
			setTimeout(() => onRegisterSuccess(), 2000);
		} catch (err) {
			setError(err.response?.data?.message || "Registration failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="auth-container">
			<div className="auth-box">
				<h1>🍬 Sweet Shop</h1>
				<h2>Register</h2>

				{error && <div className="error-message">{error}</div>}
				{success && <div className="success-message">{success}</div>}

				<form onSubmit={handleRegister}>
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

					<input
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>

					<button
						type="submit"
						disabled={loading}>
						{loading ? "Registering..." : "Register"}
					</button>
				</form>

				<p className="switch-text">
					Already have an account?{" "}
					<button
						className="switch-link"
						onClick={onSwitchToLogin}>
						Login here
					</button>
				</p>
			</div>
		</div>
	);
};

export default RegisterPage;
