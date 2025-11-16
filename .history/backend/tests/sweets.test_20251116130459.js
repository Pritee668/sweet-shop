import SweetsService from "../services/sweetsService.js";
import Sweet from "../models/Sweet.js";

jest.mock("../models/Sweet.js");

describe("SweetsService", () => {
	let sweetsService;

	beforeEach(() => {
		sweetsService = new SweetsService();
		jest.clearAllMocks();
	});

	// -----------------------------------------------
	// CREATE SWEET
	// -----------------------------------------------
	describe("createSweet", () => {
		it("should create a sweet successfully", async () => {
			const sweetData = {
				name: "Chocolate",
				category: "Candy",
				price: 5,
				quantity: 10,
			};

			const mockSweet = {
				...sweetData,
				_id: "1",
				save: jest.fn(),
			};

			// Mock the constructor: new Sweet(...)
			Sweet.mockImplementationOnce(() => mockSweet);

			const result = await sweetsService.createSweet(sweetData);

			expect(result.name).toBe("Chocolate");
			expect(mockSweet.save).toHaveBeenCalled();
		});
	});

	// -----------------------------------------------
	// GET ALL SWEETS
	// -----------------------------------------------
	describe("getAllSweets", () => {
		it("should return all sweets", async () => {
			const mockSweets = [
				{
					_id: "1",
					name: "Chocolate",
					category: "Candy",
					price: 5,
					quantity: 10,
				},
				{
					_id: "2",
					name: "Lollipop",
					category: "Candy",
					price: 2,
					quantity: 20,
				},
			];

			Sweet.find.mockResolvedValueOnce(mockSweets);

			const result = await sweetsService.getAllSweets();

			expect(result.length).toBe(2);
			expect(result[0].name).toBe("Chocolate");
		});
	});

	// -----------------------------------------------
	// PURCHASE SWEET
	// -----------------------------------------------
	describe("purchaseSweet", () => {
		it("should purchase a sweet successfully", async () => {
			const mockSweet = {
				_id: "1",
				name: "Chocolate",
				category: "Candy",
				price: 5,
				quantity: 10,
				save: jest.fn(),
			};

			Sweet.findById.mockResolvedValueOnce(mockSweet);

			const result = await sweetsService.purchaseSweet("1", 2);

			expect(result.quantity).toBe(8); // 10 - 2
			expect(mockSweet.save).toHaveBeenCalled();
		});

		it("should throw error if insufficient quantity", async () => {
			const mockSweet = {
				_id: "1",
				quantity: 1,
			};

			Sweet.findById.mockResolvedValueOnce(mockSweet);

			await expect(sweetsService.purchaseSweet("1", 5)).rejects.toThrow(
				"Insufficient quantity"
			);
		});
	});
});
