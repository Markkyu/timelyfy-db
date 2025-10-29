const express = require("express");
const courseRouter = express.Router();
const connection = require("../config/db");

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

// GET the 5 recently added courses
courseRouter.get("/recent", (req, res) => {
  connection.query(
    "SELECT * FROM courses ORDER BY course_id DESC LIMIT 5",
    (err, rows) => {
      if (err)
        return res
          .status(500)
          .json({ message: `An error has occurred: ${err.sqlMessage}` });

      res.status(200).json(rows);
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

// GET SPECIFIC COURSE FROM YEAR AND SEM
courseRouter.get("/:department/filter", (req, res) => {
  const { department } = req.params;
  const { year, sem } = req.query;

  const sql = `
    SELECT c.course_id, c.course_code, c.course_name, c.hours_week, c.is_plotted, c.created_by, c.assigned_teacher, c.assigned_room, t.first_name, t.last_name, r.room_name 
    FROM courses c 
    LEFT JOIN teachers t 
    ON c.assigned_teacher = t.teacher_id 
    LEFT JOIN rooms r 
    ON c.assigned_room = r.room_id 
    WHERE c.course_college = ? AND c.course_year = ? AND c.semester = ?
  `;

  connection.query(sql, [department, year, sem], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: `An error has occurred: ${err.sqlMessage}` });

    if (result.affectedRows === 0)
      return res.status(404).json({ message: `Cannot find college course` });

    res.status(200).json(result);
  });
});

// GET A SPECIFIC Course with YEAR and SEM
courseRouter.get("/:department/year/:year/sem/:sem", (req, res) => {
  const { department, year, sem } = req.params;

  connection.query(
    "SELECT * FROM courses LEFT JOIN teachers ON courses.assigned_teacher = teachers.teacher_id WHERE course_college = ? AND course_year = ? AND semester = ?",
    [department, year, sem],
    (err, rows) => {
      if (err)
        return res
          .status(500)
          .json({ message: `An error has occurred: ${err.sqlMessage}` });

      if (rows.affectedRows === 0)
        return res
          .status(404)
          .json({ message: `Cannot find college subjects` });

      res.status(200).json(rows);
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
    created_by,
  } = req.body;

  if (hours_week < 1 || hours_week > 6) {
    return res
      .status(400)
      .json({ message: "hours_week must be between 1 and 6" });
  }

  connection.query(
    `INSERT INTO courses (course_code, course_name, hours_week, course_year, course_college, semester, assigned_teacher, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      course_code,
      course_name,
      hours_week,
      course_year,
      course_college,
      semester,
      assigned_teacher,
      created_by,
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
