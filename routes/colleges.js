const express = require("express");
const collegesRouter = express.Router();
const connection = require("../index"); // require connection

// Common HTTP Requests
// 200 - OK
// 201 - Created
// 500 - Internal Server Error

// ROUTE: /api/colleges

// GET College Program
collegesRouter.get("/", (req, res) => {
  connection.query("SELECT * FROM colleges", (err, rows) => {
    try {
      if (err) throw err;

      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json({ message: "Error:" + err.sqlMessage });
    }
  });
});

// LOOK UP a College Program with the College name
collegesRouter.get("/:college_name", (req, res) => {
  const { college_name } = req.params; // destructured variable

  connection.query(
    `SELECT * FROM colleges WHERE college_name = ?`, // Prevents SQL Injection
    [college_name],

    (err, rows) => {
      try {
        if (err) throw err;

        if (rows.length > 0) {
          res.status(200).json(rows);
        } else {
          res
            .status(400)
            .json({ msg: `College Name: ${college_name} not found!` });
        }
      } catch (err) {
        res.status(500).json({ message: err.sqlMessage });
      }
    }
  );
});

// CREATE College Program
collegesRouter.post("/", (req, res) => {
  const { college_name } = req.body;

  connection.query(
    `INSERT INTO colleges (college_name) VALUES (?)`,
    [college_name],

    (err, result) => {
      try {
        if (err) throw err;
        res
          .status(201)
          // .json({ message: `${college_name} has been successfully inserted!` });
          .json({
            message: `College successfully inserted with Id: ${result.insertId}`,
          });
      } catch (err) {
        console.error("Internal Server Error");
        res.status(500).json({ message: err.sqlMessage });
      }
    }
  );
});

// UPDATE College Program
collegesRouter.put("/", (req, res) => {
  const { college_id, college_name } = req.body;

  connection.query(
    `UPDATE colleges SET college_name = ? WHERE college_id = ?`,
    [college_name, college_id],

    (err, result) => {
      try {
        if (err) throw err;

        res.status(200).json({ msg: `College Updated Successfully!` });
      } catch (err) {
        res.status(500).json({ messsage: `Error: ${err.sqlMessage}` });
      }
    }
  );
});

// DELETE College Program
collegesRouter.delete("/", (req, res) => {
  const { college_id } = req.body;

  connection.query(
    `DELETE FROM colleges WHERE college_id='${college_id}'`,
    (err, result) => {
      try {
        if (err) throw err;

        res.status(200).json({
          msg: `College ID: ${college_id} has been successfully deleted!`,
        });
      } catch (err) {
        res.status(500).json({ message: `Error: ${err.sqlMessage}` });
      }
    }
  );
});

module.exports = collegesRouter;
