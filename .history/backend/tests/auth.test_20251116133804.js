// Mock User model properly for ES modules
jest.mock("../src/models/User.js", () => {
	return {
		__esModule: true,
		default: jest.fn(function () {
			return {
				save: jest.fn(),
			};
		}),
		findOne: jest.fn(),
	};
});

import { AuthService } from "../src/services/authService.js";
import User from "../src/models/User.js";
import bcryptjs from "bcryptjs";

describe("AuthService", () => {
	let authService;

	beforeEach(() => {
		authService = new AuthService();
		jest.clearAllMocks();
		process.env.JWT_SECRET = "testsecret"; // important
	});

	// -----------------------------
	// REGISTER TESTS
	// -----------------------------
	describe("register", () => {
		it("should register a new user successfully", async () => {
			const mockUserInstance = {
				_id: "1",
				email: "test@example.com",
				role: "user",
				save: jest.fn(),
			};

			// Mock static User.findOne()
			User.findOne.mockResolvedValueOnce(null);

			// Mock new User()
			User.mockImplementationOnce(() => mockUserInstance);

			const result = await authService.register(
				"test@example.com",
				"password123"
			);

			expect(result.email).toBe("test@example.com");
			expect(mockUserInstance.save).toHaveBeenCalled();
		});

		it("should throw error if user already exists", async () => {
			User.findOne.mockResolvedValueOnce({ email: "test@example.com" });

			await expect(
				authService.register("test@example.com", "password123")
			).rejects.toThrow("User already exists");
		});
	});

	// -----------------------------
	// LOGIN TESTS
	// -----------------------------
	describe("login", () => {
		it("should login and return token", async () => {
			const hashedPassword = await bcryptjs.hash("password123", 10);

			const mockUser = {
				_id: "1",
				email: "test@example.com",
				password: hashedPassword,
				role: "user",
			};

			User.findOne.mockResolvedValueOnce(mockUser);

			const result = await authService.login("test@example.com", "password123");

			expect(result.token).toBeDefined();
			expect(result.user.email).toBe("test@example.com");
			expect(result.user.role).toBe("user");
		});

		it("should throw error for invalid email", async () => {
			User.findOne.mockResolvedValueOnce(null);

			await expect(
				authService.login("invalid@example.com", "password123")
			).rejects.toThrow("Invalid email or password");
		});
	});
});
