import { AuthService } from "../services/authService.js";

const authService = new AuthService();

const authController = {
	async register(req, res) {
		try {
			const { email, password, role, adminKey } = req.body;

			// Admin signup protection
			if (role === "admin") {
				if (!adminKey || adminKey !== process.env.ADMIN_SECRET_KEY) {
					return res.status(403).json({ message: "Invalid admin secret key" });
				}
			}

			const result = await authService.register(
				email,
				password,
				role || "customer"
			);

			res.status(201).json({
				message: "User registered successfully",
				user: result,
			});
		} catch (err) {
			console.error("REGISTER ERROR:", err.message);
			res.status(400).json({ message: err.message });
		}
	},

	async login(req, res) {
		try {
			const { email, password } = req.body;

			const result = await authService.login(email, password);

			res.status(200).json({
				message: "Login successful",
				token: result.token,
				user: result.user,
			});
		} catch (err) {
			console.error("LOGIN ERROR:", err.message);
			res.status(400).json({ message: err.message });
		}
	},
};

export default authController;
