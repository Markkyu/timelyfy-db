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
      if (err)
        return res
          .status(500)
          .json({ message: `An error has occurred: ${err.sqlMessage}` });

      res.status(200).json(rows);
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
      if (err)
        return res
          .status(500)
          .json({ message: `An error has occured: ${err.sqlMessage}` });

      if (rows == 0)
        return res.status(404).json({
          message: `Teacher first name ${teacher_name} cannot be found`,
        });

      res.status(200).json(rows);
    }
  );
});

// CREATE Teacher
teacherRouter.post("/", (req, res) => {
  const { first_name, last_name, department, teacher_availability } = req.body;

  const firstNameClean = first_name?.trim();
  const lastNameClean = last_name?.trim();

  if (!firstNameClean || !lastNameClean || !department) {
    return res.status(404).json({ message: `Fields cannot be empty` });
  }

  connection.query(
    `INSERT INTO teachers (first_name, last_name, department, teacher_availability) VALUES (?, ?, ?, ?)`,
    [firstNameClean, lastNameClean, department, teacher_availability],

    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: `An error has occured: ${err.sqlMessage}` });

      res.status(200).json({
        message: `Teacher successfully created with Id: ${result.insertId}`,
      });
    }
  );
});

// UPDATE Teacher
teacherRouter.put("/:teacher_id", (req, res) => {
  const { teacher_id } = req.params;
  const { first_name, last_name, department, teacher_availability } = req.body;

  const firstNameClean = first_name?.trim();
  const lastNameClean = last_name?.trim();

  if (!firstNameClean || !lastNameClean || !department) {
    return res.status(404).json({ message: `Fields cannot be empty` });
  }

  connection.query(
    `UPDATE teachers SET first_name = ?, last_name = ?, department = ?, teacher_availability = ? WHERE teacher_id = ?`,
    [
      firstNameClean,
      lastNameClean,
      department,
      teacher_availability,
      teacher_id,
    ],

    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: `An error has occured: ${err.sqlMessage}` });

      if (result.affectedRows === 0)
        return res.status(404).json({ message: `Cannot find teacher` });

      res
        .status(200)
        .json({ message: `Teacher Id: ${teacher_id} successfully updated` });
    }
  );
});

// DELETE Teacher
teacherRouter.delete("/:teacher_id", (req, res) => {
  const { teacher_id } = req.params;

  connection.query(
    "DELETE FROM teachers WHERE teacher_id = ?",
    [teacher_id],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: `An error has occurred: ${err.sqlMessage}` });

      if (result.affectedRows === 0)
        return res.status(404).json({ message: `Cannot find teacher` });

      res
        .status(200)
        .json({ message: `Teacher Id: ${teacher_id} successfully updated` });
    }
  );
});

module.exports = teacherRouter;
