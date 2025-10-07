const express = require("express");
const loginRouter = express.Router();
const connection = require("../index");
const bcrypt = require("bcrypt");

// ROUTE: /

// Register user with hashed password
// REGISTER endpoint
loginRouter.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
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
            try {
              if (err) throw err;

              res.status(201).json({
                message: `User Id ${result.insertId} has been successfully added`,
              });
            } catch (err) {
              res
                .status(500)
                .json({ message: `An error has occurred: ${err.sqlMessage}` });
            }
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Login user
loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ message: "Username and password are required" });
  }

  try {
    connection.query(
      `SELECT * FROM profiles WHERE username = '${username}'`,
      async (err, results) => {
        try {
          if (results.length === 0) {
            return res.json({ message: "User not found" });
          }

          const [user] = results; // destructure: get the first item in the array

          // Compare password in DB
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            const { password, ...theRest } = user; // like, get the rest of info but expect for the password
            res.json({ message: "Login successful", user: theRest });
          } else {
            res.json({ message: "Invalid credentials" });
          }
        } catch (err) {
          console.error("Error fetching user:", err);
          res.status(500).json({ message: "Error during login" });
        }
      }
    );
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Error during login" });
  }
});

module.exports = loginRouter;
