const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../config/db");
const loginRouter = express.Router();

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

// Login endpoint /api/login
loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  connection.query(
    `SELECT * FROM profiles WHERE username = ?`,
    [username],
    async (err, results) => {
      try {
        if (err) throw err;
        if (results.length === 0)
          return res.status(404).json({ message: "User not found" });

        const user = results[0];

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch)
          return res.status(401).json({ message: "Invalid credentials" });

        // Create JWT
        const token = jwt.sign(
          {
            id: user.id,
            role: user.role,
          },
          JWT_SECRET,
          { expiresIn: "1d" }
        );

        // Send user info + token
        const { password: _, ...safeUser } = user;
        res.json({
          message: "Login successful",
          user: safeUser,
          token,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error during login" });
      }
    }
  );
});

// Login user
// loginRouter.post("/", async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.json({ message: "Username and password are required" });
//   }

//   try {
//     connection.query(
//       `SELECT * FROM profiles WHERE username = '${username}'`,
//       async (err, results) => {
//         try {
//           if (results.length === 0) {
//             return res.json({ message: "User not found" });
//           }

//           const [user] = results; // destructure: get the first item in the array

//           // Compare password in DB
//           const passwordMatch = await bcrypt.compare(password, user.password);

//           if (passwordMatch) {
//             const { password, ...theRest } = user; // like, get the rest of info but expect for the password
//             res.json({ message: "Login successful", user: theRest }); // then pass the rest to the user
//           } else {
//             res.json({ message: "Invalid credentials" });
//           }
//         } catch (err) {
//           console.error("Error fetching user:", err);
//           res.status(500).json({ message: "Error during login" });
//         }
//       }
//     );
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({ message: "Error during login" });
//   }
// });

module.exports = loginRouter;
