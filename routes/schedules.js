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
  connection.query("SELECT * FROM schedules", (err, rows, fields) => {
    try {
      if (err) throw err;

      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json({ message: `An Error Occurred: ${err.sqlMessage}` });
    }
  });
});

module.exports = scheduleRouter;
