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
      if (err)
        return res
          .status(500)
          .json({ message: `An error has occurred: ${err.sqlMessage}` });

      res.status(200).json(rows);
    }
  );
});

phaseRouter.put("/:phase_id", (req, res) => {
  const { phase_id } = req.params;
  const { phase_year, phase_sem, phase_supervisor } = req.body;

  connection.query(
    `UPDATE phase_control SET phase_year = ?, phase_sem = ?, phase_supervisor = ? WHERE phase_id = ?`,
    [phase_year, phase_sem, phase_supervisor, phase_id],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: `An error has occurred: ${err.sqlMessage}` });

      if (result.affectedRows === 0)
        return res.status(404).json({ message: `Phase_id cannot be found` });

      res.status(200).json({
        message: `Phase Updated to ${phase_supervisor} yr: ${phase_year} sem: ${phase_sem}`,
      });
    }
  );
});

module.exports = phaseRouter;
