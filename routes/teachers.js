const express = require("express");
const teacherRouter = express.Router();
const connection = require("../index"); // require connection

// Common HTTP Requests
// 200 - OK
// 201 - Created
// 500 - Internal Server Error

// ROUTE: /api/teachers

// GET Teachers
teacherRouter.get("/", (req, res) => {
  connection.query(
    "SELECT * FROM teachers JOIN colleges ON teachers.department = colleges.college_id",
    (err, rows) => {
      try {
        if (err) throw err;

        res.status(200).json(rows);
      } catch (err) {
        res
          .status(500)
          .json({ message: `An Error has occurred: ${err.sqlMessage}` });
      }
    }
  );
});

// SEARCH Teacher
teacherRouter.get("/:teacher_name", (req, res) => {
  const { teacher_name } = req.params;

  connection.query(
    "SELECT * FROM teachers WHERE first_name = ?",
    [teacher_name],
    (err, rows) => {
      try {
        if (err) throw err;

        if (rows.length > 0) {
          res.status(200).json(rows);
        } else {
          res
            .status(400)
            .json({ msg: `Teacher Name: ${teacher_name} not found!` });
        }
      } catch (err) {
        res
          .status(500)
          .json({ message: `An Error has occurred: ${err.sqlMessage}` });
      }
    }
  );
});

// CREATE Teacher
teacherRouter.post("/", (req, res) => {
  const { first_name, last_name, department, teacher_availability } = req.body;

  connection.query(
    `INSERT INTO teachers (first_name, last_name, department, teacher_availability) VALUES (?, ?, ?, ?)`,
    [first_name, last_name, department, teacher_availability],

    (err, result) => {
      try {
        if (err) throw err;

        res.status(200).json({
          msg: `Teacher successfully created with Id: ${result.insertId}`,
        });
      } catch (err) {
        res
          .status(500)
          .json({ message: `An Error has occurred: ${err.sqlMessage}` });
      }
    }
  );
});

// UPDATE Teacher
teacherRouter.put("/", (req, res) => {
  const {
    first_name,
    last_name,
    department,
    teacher_availability,
    teacher_id,
  } = req.body;

  connection.query(
    `UPDATE teachers SET first_name = ?, last_name = ?, department = ?, teacher_availability = ? WHERE teacher_id = ?`,
    [first_name, last_name, department, teacher_availability, teacher_id],

    (err, result) => {
      try {
        if (err) throw err;

        res.status(200).json({ msg: `Successfully updated!` });
      } catch (err) {
        res
          .status(500)
          .json({ message: `An Error has occurred: ${err.sqlMessage}` });
      }
    }
  );
});

// DELETE Teacher
teacherRouter.delete("/", (req, res) => {
  const { teacher_id } = req.body;

  connection.query(
    "DELETE FROM teachers WHERE teacher_id = ?",
    [teacher_id],
    (err, fields) => {
      try {
        if (err) throw err;

        res.json({ msg: `Successfully deleted!` });
      } catch (err) {
        res
          .status(500)
          .json({ message: `An Error has occurred: ${err.sqlMessage}` });
      }
    }
  );
});

module.exports = teacherRouter;
