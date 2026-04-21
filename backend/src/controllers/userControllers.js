import { client } from "../../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { generateToken } from "../utils.js/TokenGenerator.js"
import crypto from 'crypto';

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

        const result = await client.query(
            "INSERT INTO users (first_name, last_name, age, email, password) VALUES ($1, $2, $3, $4, $5)",
            [firstName, lastName, parsedAge, email, hashedPassword]
        );

        // If all is correct
        const user = result.rows[0];

        // generate token for login
        const token = generateToken(user);

        res.status(201).json({ message: "User created successfully", token })

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error creating user" });
    }
}

export async function forgotPassword(req, res) {
    // try block
    try {

        // get the user by id
        const { email } = req.body;

        const userResult = await client.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );

        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // generate random token 
        const resetToken = crypto.randomBytes(32).toString("hex");

        // hash the token
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        // tOKEN eXPIRATION
        const expiry = new Date(Date.now() + 20 * 60 * 1000); // 20 minutes

        // store in db
        await client.query(
            `UPDATE users
             SET reset_token = $1,
                 reset_token_expiry = $2
             WHERE email = $3`,
            [hashedToken, expiry, email]
        );

        //send to user email
        // Create reset link
        const resetLink = `http://localhost:5000/reset-password/${resetToken}`;

        console.log("Reset link:", resetLink); // for now

        res.json({ message: "Password reset link sent" });
    } catch (err) {
        console.log("The forgot password is not wworking now")
        console.error(err);
        res.status(500).json({ error: "Error now" });
    }
}

export async function resetPassword(req, res) {
    // get token and password
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        if (!newPassword) { // if nopassword in field
            return res.status(400).json({ error: "Password is required" });
        }

        // Hash incoming token (must match DB format)
        const hashedToken = crypto
            .createHash("sha256").update(token).digest("hex");

        //  Find user with valid token + check if not expired
        const result = await client.query(
            `SELECT * FROM users 
             WHERE reset_token = $1 
             AND reset_token_expiry > NOW()`,
            [hashedToken]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        const user = result.rows[0];

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the new password and reset tokens
        await client.query(
            `UPDATE users 
             SET password = $1,
                 reset_token = NULL,
                 reset_token_expiry = NULL
             WHERE id = $2`,
            [hashedPassword, user.id]
        );

        // reset password successful
        return res.json({message: "Reset Password Successful"});

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "NOT WORKING, SOMETHING IS WRONG" });
    }
}