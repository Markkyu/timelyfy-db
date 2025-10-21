const express = require("express");
const scheduleRouter = express.Router();
const connection = require("../config/db");

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

//
scheduleRouter.post("/", (req, res) => {
  const schedules = req.body;

  if (!Array.isArray(schedules)) {
    return res.status(400).json({ message: "Expected an array of schedules" });
  }

  const values = schedules.map((s) => [
    s.time_start,
    s.course_id,
    s.teacher_id,
    s.college_id,
    s.year_level,
    s.semester,
  ]);

  connection.query(
    `INSERT IGNORE INTO schedules (time_start, course_id, teacher_id, college_id, year_level, semester)
     VALUES ?`,
    [values],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: `An error has occurred: ${err.sqlMessage}`,
        });
      }

      // Get all unique course_ids from the inserted schedules
      const courseIds = [...new Set(values.map((v) => v[1]))];

      // For each course, check if it's fully plotted
      courseIds.forEach((courseId) => {
        const checkQuery = `
          SELECT 
            c.course_id,
            c.hours_week,
            COUNT(s.time_start) AS scheduled_hours
          FROM courses c
          LEFT JOIN schedules s ON c.course_id = s.course_id
          WHERE c.course_id = ?
          GROUP BY c.course_id
        `;

        connection.query(checkQuery, [courseId], (err, rows) => {
          if (err) {
            console.error("Error checking plotted status:", err);
            return;
          }

          if (rows.length > 0) {
            const { hours_week, scheduled_hours } = rows[0];

            if (scheduled_hours >= hours_week) {
              connection.query(
                `UPDATE courses SET is_plotted = 1 WHERE course_id = ?`,
                [courseId],
                (err) => {
                  if (err)
                    console.error(
                      `Error updating is_plotted for course ${courseId}:`,
                      err
                    );
                }
              );
            }
          }
        });
      });

      res.status(201).json({
        message: "Insert successful",
        inserted: results.affectedRows,
      });
    }
  );
});

module.exports = scheduleRouter;
