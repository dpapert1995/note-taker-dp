const fs = require('fs');
const util = require('util');
const path = require('path');
const moment = require("moment");

module.exports = app => {

    var readFileAsync = util.promisify(fs.readFile);
    var writeFileAsync = util.promisify(fs.writeFile);

    // Setup notes variable
    readFileAsync("db/db.json", "utf8").then(function (data) {
        var notes = JSON.parse(data);

        // Read the db.json file and return all saved notes as JSON.
        app.get("/api/notes", function (req, res) {
            res.json(notes);
        });

        // Receives a new note, adds it to db.json, then returns the new note
        app.post("/api/notes", function (req, res) {
            let noteNew = req.body;
            noteNew.id = notes[notes.length - 1].id + 1;
            notes.push(noteNew);
            writeFileAsync("db/db.json", JSON.stringify(notes)).then(function (err) {
                if (err) return console.log(err);
                res.json(200);
            });
        });

        // Retrieves a note with specific id
        app.get("/api/notes/:id", function (req, res) {
            res.json(notes[req.params.id]);
        });

        // Deletes a note at a specific index
        app.delete("/api/notes/:id", function (req, res) {
            notes = notes.filter((note) => note.id != req.params.id);
            writeFileAsync("db/db.json", JSON.stringify(notes)).then(function (err) {
                if (err) return console.log(err);
                res.json(200);
            });
        });

        // Sends note to note.html
        app.get('/notes', function (req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        // Sends updated notes to index.html
        app.get('*', function (req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });
    })
}
