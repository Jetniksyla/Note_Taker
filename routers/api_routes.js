const fs = require("fs");
const path = require("path");
const express = require("express");
const { v4: uuid } = require("uuid");

const router = express.Router();
const dbFilePath = path.join(__dirname, "../db/db.json");

// Middleware to parse JSON requests
router.use(express.json());

// Read existing notes from the database file
let db = require(dbFilePath);

// API routes
router.get("/api/notes", (req, res) => {
  res.json(db);
});

router.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uuid();
  db.push(newNote);

  // Write updated notes back to the database file
  fs.writeFile(dbFilePath, JSON.stringify(db), (err) => {
    if (err) throw err;
    res.json(db);
  });
});

router.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;
  const noteIndex = db.findIndex((note) => note.id === noteId);

  if (noteIndex !== -1) {
    db.splice(noteIndex, 1);

    // Write updated notes back to the database file
    fs.writeFile(dbFilePath, JSON.stringify(db), (err) => {
      if (err) throw err;
      res.json(db);
    });
  } else {
    return res.status(404).send("No note with the given ID");
  }
});

module.exports = router;
