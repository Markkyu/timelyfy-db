const express = require("express");
const userRouter = express.Router();
const connection = require("../index");

// ROUTE: /api/users

// Get all users
userRouter.get("/", (req, res) => {
  connection.query("SELECT id, username, role FROM profiles", (err, rows) => {
    if (err) return res.status(500).json({ message: "Cannot fetch users" });

    res.status(200).json(rows);
  });
});

// ASSIGN ROLE to user
userRouter.put("/:user_id", (req, res) => {
  const { assignRole } = req.body;
  const { user_id } = req.params;

  connection.query(
    `UPDATE profiles SET role = ? WHERE id = ?`,
    [assignRole, user_id],
    (err, rows) => {
      if (err)
        return res
          .status(500)
          .json({ message: `An error has occurred: ${err.sqlMessage}` });

      res.status(200).json(`User Id ${user_id} role successfully updated.`);
    }
  );
});

module.exports = userRouter;
