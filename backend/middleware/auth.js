import jwt from "jsonwebtoken";

/**
 * Middleware to verify JWT token
 */
export const authMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization;

	// Expect: Authorization: Bearer <token>
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({ message: "No token provided" });
	}

	const token = authHeader.split(" ")[1];

	try {
		if (!process.env.JWT_SECRET) {
			console.error("❌ ERROR: JWT_SECRET is missing in .env");
			return res.status(500).json({ message: "Server configuration error" });
		}

		// Decode JWT
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Attach user info to request object
		req.user = decoded;

		return next();
	} catch (err) {
		console.error("JWT ERROR:", err.message);
		return res.status(401).json({ message: "Invalid or expired token" });
	}
};

/**
 * Middleware to check if user is admin
 */
export const adminMiddleware = (req, res, next) => {
	if (!req.user) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	if (req.user.role !== "admin") {
		return res.status(403).json({ message: "Admin access required" });
	}

	return next();
};
