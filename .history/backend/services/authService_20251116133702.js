import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
	/**
	 * Register new user with role
	 */
	async register(email, password, role = "customer") {
		const existing = await User.findOne({ email });
		if (existing) {
			throw new Error("User already exists");
		}

		// Password hashing happens in User.js pre-save hook
		const user = new User({ email, password, role });
		await user.save();

		return {
			_id: user._id.toString(),
			email: user.email,
			role: user.role,
		};
	}

	/**
	 * Login user
	 */
	async login(email, password) {
		const user = await User.findOne({ email });

		if (!user) {
			throw new Error("Invalid email or password");
		}

		// Compare hashed password
		const isMatch = await bcrypt.compare(password, user.password || "");
		if (!isMatch) {
			throw new Error("Invalid email or password");
		}

		if (!process.env.JWT_SECRET) {
			throw new Error("Missing JWT_SECRET in environment");
		}

		// JWT payload
		const payload = {
			id: user._id.toString(),
			email: user.email,
			role: user.role,
		};

		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});

		return {
			token,
			user: {
				_id: user._id.toString(),
				email: user.email,
				role: user.role,
			},
		};
	}
}
