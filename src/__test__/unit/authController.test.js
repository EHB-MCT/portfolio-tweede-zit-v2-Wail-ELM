const { register, login } = require("../../controllers/authController");
const knex = require("config/knex");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jest.mock("config/knex");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("authController", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {},
      user: {},
      params: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe("register", () => {
    it("should register a user successfully", async () => {
      req.body = {
        name: "John Doe",
        email: "john@example.com",
        password: "password",
        role: "user",
      };
      bcrypt.hash.mockResolvedValue("hashedPassword");
      knex.mockReturnValue({
        insert: jest.fn().mockResolvedValue([1]),
      });

      await register(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith("password", 10);
      expect(knex("users").insert).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        password: "hashedPassword",
        role: "user",
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        message: "User registered successfully",
      });
    });

    it("should handle errors during user registration", async () => {
      req.body = {
        name: "John Doe",
        email: "john@example.com",
        password: "password",
        role: "user",
      };
      const errorMessage = "Database error";
      bcrypt.hash.mockResolvedValue("hashedPassword");
      knex.mockReturnValue({
        insert: jest.fn().mockRejectedValue(new Error(errorMessage)),
      });

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("login", () => {
    it("should login a user successfully", async () => {
      req.body = { email: "john@example.com", password: "password" };
      const user = {
        id: 1,
        email: "john@example.com",
        password: "hashedPassword",
      };
      knex.mockReturnValue({
        where: jest.fn().mockReturnValue({
          first: jest.fn().mockResolvedValue(user),
        }),
      });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("token");

      await login(req, res);

      expect(knex("users").where).toHaveBeenCalledWith({
        email: "john@example.com",
      });
      expect(bcrypt.compare).toHaveBeenCalledWith("password", "hashedPassword");
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: 1 },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      expect(res.json).toHaveBeenCalledWith({ token: "token" });
    });

    it("should return 401 if credentials are invalid", async () => {
      req.body = { email: "john@example.com", password: "password" };
      knex.mockReturnValue({
        where: jest.fn().mockReturnValue({
          first: jest.fn().mockResolvedValue(null),
        }),
      });

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
    });

    it("should handle errors during login", async () => {
      req.body = { email: "john@example.com", password: "password" };
      const errorMessage = "Database error";
      knex.mockReturnValue({
        where: jest.fn().mockReturnValue({
          first: jest.fn().mockRejectedValue(new Error(errorMessage)),
        }),
      });

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
