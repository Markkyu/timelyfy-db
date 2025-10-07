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
  connection.query("SELECT * FROM schedules", (err, rows) => {
    if (err)
      return res
        .status(500)
        .json({ message: `An error has occurred: ${err.sqlMessage}` });

    res.status(200).json(rows);
  });
});

module.exports = scheduleRouter;
