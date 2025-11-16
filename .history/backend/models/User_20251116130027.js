import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			lowercase: true,
			trim: true,
			match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
		},

		password: {
			type: String,
			required: [true, "Password is required"],
		},

		role: {
			type: String,
			enum: ["user", "admin", "customer"],
			default: "user",
		},
	},
	{ timestamps: true }
);

/**
 * 🔐 Hash password before saving
 */
userSchema.pre("save", async function (next) {
	const user = this;

	// Only hash if modified
	if (!user.isModified("password")) return next();

	if (!user.password) {
		return next(new Error("Password is missing"));
	}

	try {
		user.password = await bcrypt.hash(user.password, 10);
		next();
	} catch (err) {
		next(err);
	}
});

const User = mongoose.model("User", userSchema);

export default User;
