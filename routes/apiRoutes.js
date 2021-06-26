// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.

//const noteData = require('../db/noteData');
const { v4: uuidv4 } = require('uuid');

// ROUTING
const fs = require("fs");

module.exports = (app) => {

  app.get('/api/notes', (req, res) => {
    fs.readFile("db/db.json", "utf8", (err, notes) => {
      if (err) throw err;
      res.json(JSON.parse(notes))
    })
  });

  app.post('/api/notes', (req, res) => {
    return fs.readFile("db/db.json", "utf8", (err, notes) => {
      if (err) throw err;

      const newNote = req.body;
      newNote.id = uuidv4();

      const allNotes = JSON.parse(notes);

      allNotes.push(newNote);

      fs.writeFile("db/db.json", JSON.stringify(allNotes), () => {
        res.json(newNote);
      });
    })
  });

  app.delete('/api/notes/:id', (req, res) => {
    return fs.readFile("db/db.json", "utf8", (err, notes) => {
      if (err) throw err;

      const allNotes = JSON.parse(notes);

      const targetId = req.params.id;

      const filteredNotes = allNotes.filter((note) => note.id !== targetId);

      fs.writeFile("db/db.json", JSON.stringify(filteredNotes), () => {
        res.json(filteredNotes);
      });
    })
  });
};