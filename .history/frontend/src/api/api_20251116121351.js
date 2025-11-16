import axios from "axios";

// Base URL from .env
const API_URL = process.env.REACT_APP_API_URL;

// Create reusable axios instance
const api = axios.create({
	baseURL: API_URL,
});

// Attach token to every request
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Handle unauthorized responses
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			localStorage.removeItem("token");
			localStorage.removeItem("role");
			window.location.href = "/login"; // redirect to login page
		}
		return Promise.reject(error);
	}
);

export default api;
