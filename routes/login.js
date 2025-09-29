const express = require("express");
const loginRouter = express.Router();
const connection = require("../index");
const bcrypt = require("bcrypt");

// ROUTE: /

// Register user with hashed password
loginRouter.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ message: "Username and password are required" });
  }

  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);

  connection.query(
    `INSERT INTO profiles (username, password) VALUES (?, ?)`,
    [username, hashedPassword],

    (err, results) => {
      try {
        res
          .status(201)
          .json({ message: `Account added with id of ${results.insertId}` });
      } catch (err) {
        res
          .status(500)
          .json({ message: `An Error has occurred: ${err.sqlMessage}` });
      }
    }
  );
});

// Login user
loginRouter.post("/login", async (req, res) => {
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
