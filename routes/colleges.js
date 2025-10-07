const express = require("express");
const collegesRouter = express.Router();
const connection = require("../index"); // require connection

// Common HTTP Requests
// 200 - OK
// 201 - Created
// 401 - Unauthorized
// 500 - Internal Server Error

// ROUTE: /api/colleges

// GET College Program
collegesRouter.get("/", (req, res) => {
  connection.query("SELECT * FROM colleges", (err, rows) => {
    if (err)
      return res
        .status(500)
        .json({ message: `An error has occurred: ${err.sqlMessage}` });

    res.status(200).json(rows);
  });
});

// CREATE College Program
collegesRouter.post("/", (req, res) => {
  const { college_name } = req.body;

  connection.query(
    `INSERT INTO colleges (college_name) VALUES (?)`,
    [college_name],

    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: `An error has occurred: ${err.sqlMessage}` });

      res.status(201).json({
        message: `College successfully inserted with Id: ${result.insertId}`,
      });
    }
  );
});

// UPDATE College Program
collegesRouter.put("/:college_id", (req, res) => {
  const { college_id } = req.params; // request from params
  const { college_name } = req.body; // request from body

  connection.query(
    `UPDATE colleges SET college_name = ? WHERE college_id = ?`,
    [college_name, college_id],

    (err, result) => {
      if (err)
        return res.status(500).json({
          message: `Error: ${err.sqlMessage}`,
        });

      if (result.affectedRows === 0) {
        // check if there are affected rows
        return res.status(404).json({ message: `College not found` });
      }

      res.status(200).json({
        message: `College with Id: ${college_id} has been updated successfully`,
      });
    }
  );
});

// DELETE College Program
collegesRouter.delete("/:college_id", (req, res) => {
  const { college_id } = req.params;

  connection.query(
    `DELETE FROM colleges WHERE college_id = ?`,
    [college_id],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: `An error has occurred: ${err.sqlMessage}` });

      if (result.affectedRows === 0)
        return res.status(404).json({ message: `College not found` });

      res.status(200).json({
        message: `College Id: ${college_id} has been successfully deleted`,
      });
    }
  );
});

module.exports = collegesRouter;

// Trash bin -- commented -- might comeback later

// LOOK UP a College Program with the College name
// collegesRouter.get("/:college_name", (req, res) => {
//   const { college_name } = req.params; // destructured variable

//   connection.query(
//     `SELECT * FROM colleges WHERE college_name = ?`, // Prevents SQL Injection
//     [college_name],

//     (err, rows) => {
//       if (err)
//         return res
//           .status(500)
//           .json({ message: `An error has occurred: ${err.sqlMessage}` });

//       if (rows.length === 0)
//         return res
//           .status(400)
//           .json({ message: `College name: ${college_name} not found` });

//       res.status(200).json(rows);
//     }
//   );
// });
