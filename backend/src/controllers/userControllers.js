import { client } from "../../db.js";
import bcrypt from "bcrypt";

export async function createUser(req, res) {
    const { firstName, lastName, age, email, password } = req.body;

    try {
        // Input validation can be added here (e.g., check if email is valid, password strength, etc.)
        if (!firstName || !lastName || !age || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const parsedAge = parseInt(age);


        if (isNaN(parsedAge)) {
            return res.status(400).json({ error: "Invalid age" });
        }

        // Check if the email already exists in the database
        const existingUser = await client.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: "Email already in use" });
        }

        await client.query(
            "INSERT INTO users (first_name, last_name, age, email, password) VALUES ($1, $2, $3, $4, $5)",
            [firstName, lastName, parsedAge, email, hashedPassword]
        );

        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error creating user" }); 
    }
}