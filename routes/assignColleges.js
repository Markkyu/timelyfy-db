const express = require("express");
const assignCollegesRouter = express.Router();
const connection = require("../index");

// /api/assign-colleges

// get users their assigned subjects
assignCollegesRouter.get("/:userId", (req, res) => {
  const { userId } = req.params;

  const query = `SELECT c.college_id, c.college_name
                FROM user_programs  up
                INNER JOIN colleges c
                ON c.college_id = up.program_id 
                WHERE user_id = ?`;

  connection.query(query, [userId], (err, rows) => {
    try {
      if (err) throw err;

      if (rows.length === 0) {
        return res.status(200).json([]);
      }

      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json({ message: `Error: ${err.sqlMessage}` });
    }
  });
});

// assign a college course to a user
assignCollegesRouter.post("/", (req, res) => {
  const { user_id, program_id } = req.body;

  connection.query(
    `INSERT INTO user_programs (user_id, program_id) VALUES (?, ?)`,
    [user_id, program_id],
    (err, result) => {
      //   if (result.affectedRows === 0)
      //     return res.status(404).json({ message: `Error duplicate keys` });

      if (err)
        return res.status(500).json({
          message: `An error has occurred: ${err.sqlMessage}`,
        });

      res.status(201).json({ message: `User assigned a college course` });
    }
  );
});

module.exports = assignCollegesRouter;
