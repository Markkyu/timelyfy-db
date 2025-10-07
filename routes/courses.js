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
    (err, courseRows) => {
      if (err)
        return res
          .status(500)
          .json({ message: `An error has occurred: ${err.sqlMessage}` });

      res.status(200).json(courseRows);
    }
  );
});

// Assign teacher in a subject
courseRouter.put("/assign/:course_id", (req, res) => {
  const { teacher_id } = req.body;
  const { course_id } = req.params;

  connection.query(
    `UPDATE courses SET assigned_teacher = ? WHERE course_id = ?`,
    [teacher_id, course_id],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: `An error has occured ${err.sqlMessage}` });

      if (result.affectedRows === 0)
        return res
          .status(404)
          .json({ message: `Nothing found with subject Id ${course_id}` });

      res
        .status(200)
        .json({ message: `A teacher was assigned to this course` });
    }
  );
});

// GET Course with assigned teacher info where department Id is id
courseRouter.get("/:department", (req, res) => {
  const { department } = req.params;

  connection.query(
    "SELECT * FROM courses LEFT JOIN teachers ON courses.assigned_teacher = teachers.teacher_id WHERE course_college = ?",
    [department],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: `An error has occurred: ${err.sqlMessage}` });

      if (result.affectedRows === 0)
        return res.status(404).json({ message: `Cannot find college course` });

      res.status(200).json(result);
    }
  );
});

// Add a subject in a college program, year, and sem
courseRouter.post("/", (req, res) => {
  const {
    course_code,
    course_name,
    hours_week,
    course_year,
    course_college,
    semester,
    assigned_teacher,
  } = req.body;

  if (hours_week < 1 || hours_week > 6) {
    return res
      .status(400)
      .json({ message: "hours_week must be between 1 and 6" });
  }

  connection.query(
    `INSERT INTO courses (course_code, course_name, hours_week, course_year, course_college, semester, assigned_teacher) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      course_code,
      course_name,
      hours_week,
      course_year,
      course_college,
      semester,
      assigned_teacher,
    ],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: `An error has occurred: ${err.sqlMessage}` });

      res.status(201).json({
        message: `Subject successfully added with Id: ${result.insertId}`,
      });
    }
  );
});

// UPDATE Course
courseRouter.put("/:course_id", (req, res) => {
  const { course_id } = req.params;
  const {
    course_code,
    course_name,
    hours_week,
    course_year,
    course_college,
    semester,
    assigned_teacher,
  } = req.body;

  connection.query(
    `UPDATE courses SET course_code = ?, course_name = ?, hours_week = ?, assigned_teacher = ? WHERE course_id = ? AND course_year = ? AND semester = ? AND course_college = ?`,
    [
      course_code,
      course_name,
      hours_week,
      assigned_teacher,
      course_id,
      course_year,
      semester,
      course_college,
    ],

    (err, result) => {
      if (err)
        return res.status(500).json({
          message: `An error has occurred: ${err.sqlMessage}`,
        });

      if (result.affectedRows === 0)
        return res
          .status(404)
          .json({ message: `No Subject found with Id: ${course_id}` });

      res.status(200).json({
        message: `Subject Id: ${course_id} has been successfully updated`,
      });
    }
  );
});

// DELETE Course
courseRouter.delete("/:course_id", (req, res) => {
  const { course_id } = req.params;

  connection.query(
    `DELETE FROM courses WHERE course_id = ?`,
    [course_id],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: `An error has occurred: ${err.sqlMessage}` });

      if (result.affectedRows === 0)
        return res
          .status(404)
          .json({ message: `Cannot find subject of Id: ${course_id}` });

      res
        .status(200)
        .json({ message: `Successfully deleted subject Id ${course_id}` });
    }
  );
});

module.exports = courseRouter;
