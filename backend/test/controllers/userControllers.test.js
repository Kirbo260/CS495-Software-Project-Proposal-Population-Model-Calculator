import { createUser } from "../../src/controllers/userControllers.js";
import { client } from "../../db.js";
import bcrypt from "bcrypt";

jest.mock("../../db.js", () => ({
    client: {
        query: jest.fn(),
    },
}));

jest.mock("bcrypt", () => ({
    hash: jest.fn(),
}));

describe("createUser Controller", () => {

    let req;
    let res;

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

    // Missing fields
    test("returns 400 if fields are missing", async () => {
        req.body = {
            firstName: "John",
            lastName: "",
            age: 25,
            email: "john@test.com",
            password: "123"
        };

        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "All fields are required"
        });
    });

    // Invalid age
    test("returns 400 if age is invalid", async () => {
        req.body = {
            firstName: "John",
            lastName: "Doe",
            age: "abc",
            email: "john@test.com",
            password: "123"
        };

        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Invalid age"
        });
    });

    // 3. Email already exists
    test("returns 400 if email already exists", async () => {
        req.body = {
            firstName: "John",
            lastName: "Doe",
            age: 25,
            email: "john@test.com",
            password: "123"
        };

        client.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

        await createUser(req, res);

        expect(client.query).toHaveBeenCalledWith(
            "SELECT * FROM users WHERE email = $1",
            ["john@test.com"]
        );

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Email already in use"
        });
    });

    // Successful creation
    test("creates user successfully", async () => {
        req.body = {
            firstName: "John",
            lastName: "Doe",
            age: 25,
            email: "john@test.com",
            password: "123"
        };

        client.query.mockResolvedValueOnce({ rows: [] }); // email check
        bcrypt.hash.mockResolvedValue("hashedPassword");

        client.query.mockResolvedValueOnce({}); // insert

        await createUser(req, res);

        expect(bcrypt.hash).toHaveBeenCalledWith("123", 10);

        expect(client.query).toHaveBeenCalledWith(
            "INSERT INTO users (first_name, last_name, age, email, password) VALUES ($1, $2, $3, $4, $5)",
            ["John", "Doe", 25, "john@test.com", "hashedPassword"]
        );

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: "User created successfully"
        });
    });

    // Database error
    test("returns 500 on database error", async () => {
        req.body = {
            firstName: "John",
            lastName: "Doe",
            age: 25,
            email: "john@test.com",
            password: "123"
        };

        client.query.mockRejectedValue(new Error("DB failure"));

        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: "Error creating user"
        });
    });
});