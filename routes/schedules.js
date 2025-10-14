const express = require("express");
const scheduleRouter = express.Router();
const connection = require("../index"); // require connection

// Common HTTP Requests
// 200 - OK
// 201 - Created
// 500 - Internal Server Error

// ROUTE: /api/schedules

// GET Schedules
scheduleRouter.get("/", (req, res) => {
  connection.query(
    `SELECT * FROM schedules s
    INNER JOIN courses c ON c.course_id = s.course_id
    LEFT JOIN teachers t ON t.teacher_id = s.teacher_id
    `,
    (err, rows) => {
      if (err)
        return res
          .status(500)
          .json({ message: `An error has occurred: ${err.sqlMessage}` });

      res.status(200).json(rows);
    }
  );
});

scheduleRouter.post("/", (req, res) => {
  const schedules = req.body; // <-- This is an array

  if (!Array.isArray(schedules)) {
    return res.status(400).json({ message: "Expected an array of schedules" });
  }

  // Loop through and insert each schedule
  const values = schedules.map((s) => [
    s.time_start,
    s.time_end,
    s.course_id,
    s.duration,
    s.teacher_id,
    s.college_id,
    s.year_level,
    s.semester,
  ]);

  connection.query(
    `INSERT INTO schedules (time_start, time_end, course_id, duration, teacher_id, college_id, year_level, semester)
     VALUES ?`,
    [values],
    (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ message: `An error has occurred: ${err.sqlMessage}` });

      res
        .status(201)
        .json({ message: "Insert successful", inserted: results.affectedRows });
    }
  );
});

module.exports = scheduleRouter;
