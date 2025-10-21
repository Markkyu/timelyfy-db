const express = require("express");
const testRouter = express.Router();
const connection = require("../config/db");

// Common HTTP Requests
// 200 - OK
// 201 - Created
// 500 - Internal Server Error

// ROUTE: /api/test

// This is a test
testRouter.get("/", (req, res) => {
  const { year, sem } = req.query;

  connection.query(
    "SELECT * FROM courses WHERE course_year = ? AND semester = ?",
    [year, sem],
    (err, rows) => {
      if (err) return res.json({ message: "An error occurred" });

      res.json(rows);
    }
  );
});

module.exports = testRouter;
