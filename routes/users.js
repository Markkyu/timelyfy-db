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

userRouter.delete("/:user_id", (req, res) => {
  const { user_id } = req.params;
  connection.query(
    `DELETE FROM profiles WHERE id = ?`,
    [user_id],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: `An error has occurred: ${err.sqlMessage}` });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: `User not found` });
      res.status(200).json({ message: `User Id: ${user_id} has been deleted` });
    }
  );
});

module.exports = userRouter;
