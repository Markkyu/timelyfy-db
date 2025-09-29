const express = require("express");
const courseRouter = express.Router();
const connection = require("../index"); // require connection

// Common HTTP Requests
// 200 - OK
// 201 - Created
// 500 - Internal Server Error

// ROUTE: /api/courses

// GET Course along with the assgined Teacher info
courseRouter.get("/", (req, res) => {
  connection.query(
    "SELECT * FROM courses LEFT JOIN teachers ON courses.assigned_teacher = teachers.teacher_id",
    (err, rows, fields) => {
      try {
        if (err) throw err;

        res.status(200).json(rows);
      } catch (err) {
        res
          .status(500)
          .json({ message: `An Error Occurred: ${err.sqlMessage}` });
      }
    }
  );
});

// GET Course with assigned teacher info where department Id
courseRouter.get("/:department", (req, res) => {
  const { department } = req.params;
  connection.query(
    "SELECT * FROM courses LEFT JOIN teachers ON courses.assigned_teacher = teachers.teacher_id WHERE course_college = ?",
    [department],
    (err, rows, fields) => {
      try {
        if (err) throw err;

        res.status(200).json(rows);
      } catch (err) {
        res
          .status(500)
          .json({ message: `An Error Occurred: ${err.sqlMessage}` });
      }
    }
  );
});

// CREATE Course
courseRouter.post("/", (req, res) => {
  const {
    course_name,
    hours_week,
    course_year,
    course_college,
    semester,
    assigned_teacher,
  } = req.body;

  connection.query(
    `INSERT INTO courses (course_name, hours_week, course_year, course_college, semester, assigned_teacher) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      course_name,
      hours_week,
      course_year,
      course_college,
      semester,
      assigned_teacher,
    ],

    (err, result) => {
      try {
        if (err) throw err;

        res.status(201).json({
          msg: `Course successfully created with Id: ${result.insertId}`,
        });
      } catch (err) {
        res
          .status(500)
          .json({ message: `An Error Occurred: ${err.sqlMessage}` });
      }
    }
  );
});

// UPDATE Course
courseRouter.put("/", (req, res) => {
  const {
    course_id,
    course_name,
    hours_week,
    course_year,
    course_college,
    semester,
    assigned_teacher,
  } = req.body;

  connection.query(
    `UPDATE courses SET course_name = ?, hours_week = ?, assigned_teacher = ? WHERE course_id = ? AND course_year = ? AND semester = ? AND course_college = ?`,
    [
      course_name,
      hours_week,
      assigned_teacher,
      course_id,
      course_year,
      semester,
      course_college,
    ],

    (err, result) => {
      try {
        if (err) throw err;

        res.status(200).json({ msg: `Successfully updated!` });
      } catch (err) {
        res
          .status(500)
          .json({ message: `An Error Occurred: ${err.sqlMessage}` });
      }
    }
  );
});

// DELETE Course
courseRouter.delete("/:course_id", (req, res) => {
  const { course_id } = req.params;

  connection.query(
    `DELETE FROM courses WHERE course_id='${course_id}'`,
    (err, result) => {
      try {
        if (err) throw err;

        res.status(200).json({ msg: `Successfully deleted!` });
      } catch (err) {
        res
          .status(500)
          .json({ message: `An Error Occurred: ${err.sqlMessage}` });
      }
    }
  );
});

module.exports = courseRouter;
