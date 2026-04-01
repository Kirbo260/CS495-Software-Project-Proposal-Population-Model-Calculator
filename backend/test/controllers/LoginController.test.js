import { loginUser, logoutUser } from "../../src/controllers/LoginController.js";
import { client } from "../../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Mock dependencies
jest.mock("../../db.js", () => ({
  client: {
    query: jest.fn()
  }
}));

jest.mock("bcrypt", () => ({
  compare: jest.fn()
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn()
}));

describe("Auth Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.clearAllMocks();
  });

  test("should return 400 if email or password missing", async () => {
    req.body = { email: "", password: "" };

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Email and password are required"
    });
  });

  test("should return 400 if user not found", async () => {
    req.body = { email: "test@test.com", password: "123456" };

    client.query.mockResolvedValue({ rows: [] });

    await loginUser(req, res);

    expect(client.query).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid email or password"
    });
  });

  test("should return 400 if password does not match", async () => {
    req.body = { email: "test@test.com", password: "wrongpass" };

    client.query.mockResolvedValue({
      rows: [{ id: 1, email: "test@test.com", password: "hashed" }]
    });

    bcrypt.compare.mockResolvedValue(false);

    await loginUser(req, res);

    expect(bcrypt.compare).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid email or password"
    });
  });

  test("should login successfully and return token", async () => {
    req.body = { email: "test@test.com", password: "correctpass" };

    client.query.mockResolvedValue({
      rows: [{ id: 1, email: "test@test.com", password: "hashed" }]
    });

    bcrypt.compare.mockResolvedValue(true);

    jwt.sign.mockReturnValue("mocked_token");

    process.env.JWT_SECRET = "testsecret";

    await loginUser(req, res);

    expect(jwt.sign).toHaveBeenCalledWith(
      {
        userId: 1,
        email: "test@test.com"
      },
      "testsecret",
      { expiresIn: "30m" }
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Login successful",
      token: "mocked_token"
    });
  });

  test("should return 500 on server error", async () => {
    req.body = { email: "test@test.com", password: "123456" };

    client.query.mockRejectedValue(new Error("DB error"));

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error logging in user"
    });
  });

  test("should logout successfully", async () => {
    await logoutUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Logout successful"
    });
  });
});