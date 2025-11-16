import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useNavigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

import "./App.css";

// 🛡️ Protected Route
const ProtectedRoute = ({ children }) => {
	const token = localStorage.getItem("token");
	return token ? (
		children
	) : (
		<Navigate
			to="/login"
			replace
		/>
	);
};

function App() {
	const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");

	// ✔ Save user details on login
	const handleLoginSuccess = (token, role) => {
		localStorage.setItem("token", token);
		localStorage.setItem("role", role);
		setUserRole(role);
	};

	// ✔ Logout logic
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		setUserRole("");
	};

	// 🔐 Wrapper for Login Page
	const LoginWrapper = () => {
		const navigate = useNavigate();

		return (
			<LoginPage
				onLoginSuccess={(token, role) => {
					handleLoginSuccess(token, role);
					navigate("/dashboard");
				}}
				onSwitchToRegister={() => navigate("/register")}
			/>
		);
	};

	// 🔐 Wrapper for Register Page
	const RegisterWrapper = () => {
		const navigate = useNavigate();

		return (
			<RegisterPage
				onRegisterSuccess={() => navigate("/login")}
				onSwitchToLogin={() => navigate("/login")}
			/>
		);
	};

	return (
		<Router>
			<Routes>
				{/* Home Page */}
				<Route
					path="/"
					element={<Home />}
				/>

				{/* Login */}
				<Route
					path="/login"
					element={<LoginWrapper />}
				/>

				{/* Register */}
				<Route
					path="/register"
					element={<RegisterWrapper />}
				/>

				{/* Protected Dashboard */}
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard
								userRole={userRole}
								onLogout={handleLogout}
							/>
						</ProtectedRoute>
					}
				/>

				{/* Fallback */}
				<Route
					path="*"
					element={
						<Navigate
							to="/"
							replace
						/>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
