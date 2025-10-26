const express = require("express");
const scheduleRouter = express.Router();
const connection = require("../config/db");

// Common HTTP Requests
// 200 - OK
// 201 - Created
// 500 - Internal Server Error

// ROUTE: /api/schedules

// GET schedule from a specific class group, year, sem
scheduleRouter.get("/:college/filter", (req, res) => {
  const { college } = req.params;
  const { year, sem } = req.query;

  const sql = `
  SELECT ts.slot_course, ts.slot_day, ts.slot_time 
  FROM teacher_schedules ts 
  INNER JOIN courses c ON ts.slot_course = c.course_id 
  WHERE c.course_college = ? 
  AND c.course_year = ? 
  AND c.semester = ?
  `;

  connection.query(sql, [college, year, sem], (err, rows) => {
    if (err)
      return res
        .status(500)
        .json({ message: `An error occured ${err.sqlMessage}` });

    res.status(200).json(rows);
  });
});

module.exports = scheduleRouter;
