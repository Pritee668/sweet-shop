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
			minlength: [6, "Password must be at least 6 characters"],
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
	// `this` refers to the current document
	const user = this;

	// Skip hashing if password was NOT changed
	if (!user.isModified("password")) return next();

	try {
		user.password = await bcrypt.hash(user.password, 10);
		next();
	} catch (err) {
		next(err);
	}
});

/**
 * 🧪 Method to compare password during login
 */
userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
