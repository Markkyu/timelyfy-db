const express = require("express");
const teacherDepartmentRouter = express.Router();
const connection = require("../index"); // require connection

// Common HTTP Requests
// 200 - OK
// 201 - Created
// 500 - Internal Server Error

// ROUTE: /api/teachers/departments/:id

// GET Teachers in certain department
teacherDepartmentRouter.get("/:department", (req, res) => {
  const { department } = req.params;

  try {
    // First, check if department exists
    connection.query(
      "SELECT college_id FROM colleges WHERE college_id = ?", // or department_name = ?
      [department],
      (err, deptResults) => {
        if (err) throw err;

        // Department doesn't exist
        if (deptResults.length === 0) {
          return res.status(404).json({
            message: `Department with ID ${department} does not exist`,
          });
        }

        // Department exists, now get teachers
        connection.query(
          "SELECT * FROM teachers WHERE department = ?",
          [department],
          (err, rows) => {
            try {
              if (err) throw err;

              res.status(200).json(rows);
            } catch (err) {
              res
                .status(500)
                .json({ message: `Database error: ${err.sqlMessage}` });
            }

            // Department exists but no teachers
            // if (rows.length === 0) {
            //   return res.status(200).json({
            //     message: "Department exists but has no teachers",
            //     teachers: [],
            //   });
            // }
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// ADD Teacher in certain department
teacherDepartmentRouter.post("/:department", (req, res) => {
  const { department } = req.params;
  const { first_name, last_name } = req.body;

  connection.query(
    "INSERT INTO teachers (first_name, last_name, department) VALUES (?, ?, ?)",
    [first_name, last_name, department],
    (err, results) => {
      try {
        if (err) throw err;

        res
          .status(201)
          .json({ message: `Teacher created with Id of: ${results.insertId}` });
      } catch (err) {
        res
          .status(500)
          .json({ message: `An error has occurred: ${err.sqlMessage}` });
      }
    }
  );
});

// UPDATE Teacher in certain department
teacherDepartmentRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const { first_name, last_name } = req.body;

  connection.query(
    "UPDATE teachers SET first_name = ?, last_name = ? WHERE teacher_id = ?",
    [first_name, last_name, id],
    (err, results) => {
      try {
        if (err) throw err;

        res.status(201).json({ message: `Teacher updated` });
      } catch (err) {
        res
          .status(500)
          .json({ message: `An Error has occurred: ${err.sqlMessage}` });
      }
    }
  );
});

// DELETE Teacher in certain department
teacherDepartmentRouter.delete("/:id", (req, res) => {
  const { id } = req.params;

  connection.query(
    "DELETE FROM teachers WHERE teacher_id = ?",
    [id],
    (err, results) => {
      try {
        if (err) throw err;

        res.status(201).json({ message: `Teacher deleted` });
      } catch (err) {
        res
          .status(500)
          .json({ message: `An Error has occurred: ${err.sqlMessage}` });
      }
    }
  );
});

module.exports = teacherDepartmentRouter;
