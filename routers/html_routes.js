const path = require("path");
const express = require("express");
const router = express.Router();

// GET request for homepage
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// GET request for the notes page
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "notes.html"));
});

module.exports = router;
