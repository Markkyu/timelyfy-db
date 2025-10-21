const express = require("express");
const roomRouter = express.Router();
const connection = require("../config/db");

// Common HTTP status codes:
// 200 - OK
// 201 - Created
// 404 - Not Found
// 500 - Internal Server Error

// ROUTE BASE: /api/rooms

// GET all rooms
roomRouter.get("/", (req, res) => {
  connection.query("SELECT * FROM rooms", (err, rows) => {
    if (err)
      return res
        .status(500)
        .json({ message: `An error has occurred: ${err.sqlMessage}` });

    res.status(200).json(rows);
  });
});

// GET room by ID
roomRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM rooms WHERE room_id = ?",
    [id],
    (err, rows) => {
      if (err)
        return res
          .status(500)
          .json({ message: `An error has occurred: ${err.sqlMessage}` });

      if (rows.length === 0)
        return res.status(404).json({ message: "Room not found" });

      res.status(200).json(rows[0]);
    }
  );
});

// CREATE new room
roomRouter.post("/", (req, res) => {
  const { room_name, capacity, room_type } = req.body;

  if (!room_name || !capacity || !room_type)
    return res.status(400).json({ message: "All fields are required" });

  connection.query(
    "INSERT INTO rooms (room_name, capacity, room_type) VALUES (?, ?, ?)",
    [room_name, capacity, room_type],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: `An error has occurred: ${err.sqlMessage}` });

      res.status(201).json({
        message: "Room created successfully",
        room_id: result.insertId,
      });
    }
  );
});

// UPDATE room by ID
roomRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const { room_name, capacity, room_type } = req.body;

  connection.query(
    "UPDATE rooms SET room_name = ?, capacity = ?, room_type = ? WHERE room_id = ?",
    [room_name, capacity, room_type, id],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: `An error has occurred: ${err.sqlMessage}` });

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Room not found" });

      res.status(200).json({ message: "Room updated successfully" });
    }
  );
});

// DELETE room by ID
roomRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM rooms WHERE room_id = ?",
    [id],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: `An error has occurred: ${err.sqlMessage}` });

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Room not found" });

      res.status(200).json({ message: "Room deleted successfully" });
    }
  );
});

module.exports = roomRouter;
