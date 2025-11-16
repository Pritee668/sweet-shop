/**
 * Global Express error handling middleware
 */
export const errorHandler = (err, req, res, next) => {
	console.error("❌ Error:", err);

	let status = err.status || 500;
	let message = err.message || "Internal server error";

	/** 🔥 MongoDB Duplicate Key Error (e.g., email already exists) */
	if (err.code === 11000) {
		status = 400;
		message = "Duplicate field value — already exists";
	}

	/** 🔥 JWT Errors */
	if (err.name === "JsonWebTokenError") {
		status = 401;
		message = "Invalid token";
	}

	if (err.name === "TokenExpiredError") {
		status = 401;
		message = "Token expired — please login again";
	}

	const isProd = process.env.NODE_ENV === "production";

	/** 🔥 Send formatted error response */
	return res.status(status).json({
		success: false,
		message: isProd && status === 500 ? "Internal server error" : message,
		...(isProd ? {} : { stack: err.stack }), // stack trace ONLY in development
	});
};
