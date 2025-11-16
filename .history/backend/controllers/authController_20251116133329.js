import { AuthService } from "../services/authService.js";

const authService = new AuthService();

const authController = {
	/**
	 * REGISTER USER
	 */
	async register(req, res) {
		try {
			const { email, password, role, adminKey } = req.body;

			// Admin signup locked behind secret key
			if (role === "admin") {
				if (!adminKey || adminKey !== process.env.ADMIN_SECRET_KEY) {
					return res.status(403).json({ message: "Invalid admin secret key" });
				}
			}

			// Create new user
			const user = await authService.register(
				email,
				password,
				role || "customer"
			);

			return res.status(201).json({
				message: "User registered successfully",
				user,
			});
		} catch (err) {
			console.error("REGISTER ERROR:", err.message);
			return res.status(400).json({ message: err.message });
		}
	},

	/**
	 * LOGIN USER
	 */
	async login(req, res) {
		try {
			const { email, password } = req.body;

			const result = await authService.login(email, password);

			return res.status(200).json({
				message: "Login successful",
				token: result.token,
				user: result.user,
			});
		} catch (err) {
			console.error("LOGIN ERROR:", err.message);
			return res.status(400).json({ message: err.message });
		}
	},
};

export default authController;
