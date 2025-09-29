const express = require("express");
const phaseRouter = express.Router();
const connection = require("../index");

// How phase control works
// GETS phase control

// Phases and Stages
// Phase 1 Stage 1 - Master Scheduler, Year 1, Sem 1

// Phase only edits 1 row because of phase control

phaseRouter.get("/", (req, res) => {
  connection.query(
    `SELECT * FROM phase_control WHERE phase_id = 1`,
    (err, rows) => {
      try {
        if (err) throw err;

        res.status(200).json(rows);
      } catch (err) {
        res.status(500).json({ message: "Cannot get current phase" });
      }
    }
  );
});

module.exports = phaseRouter;
