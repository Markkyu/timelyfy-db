const express = require("express");
const registerRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const connection = require("../config/db");

// REGISTER endpoint
registerRouter.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long." });
    }

    // Check if user exists
    connection.query(
      "SELECT * FROM profiles WHERE username = ?",
      [username],
      async (err, results) => {
        if (err) return res.status(500).json({ error: err });

        if (results.length > 0) {
          return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        connection.query(
          "INSERT INTO profiles (username, password) VALUES (?, ?)",
          [username, hashedPassword],
          (err, result) => {
            if (err) return res.status(500).json({ error: err });

            // Create JWT
            // const user = { id: result.insertId, name: username };
            // const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            //   expiresIn: "1h",
            // });

            // return res.status(201).json({ accessToken: token });
            return res.status(201).json({ message: `User Created` });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = registerRouter;
