const fs = require('fs');
const util = require('util');
const path = require('path');
const moment = require("moment");

module.exports = app => {

    var readFileAsync = util.promisify(fs.readFile);

    // Setup notes variable
    readFileAsync("db/db.json","utf8").then(function(data) {
        var notes = JSON.parse(data);
        var noteCount = notes.length;

    // Read the db.json file and return all saved notes as JSON.
    app.get("/api/notes", function(req, res) {
        res.json(notes);
    });

    // Receives a new note, adds it to db.json, then returns the new note
    app.post("/api/notes", function(req, res) {
        let noteNew = req.body;
        notes.push(noteNew);
        updateDataBase();
        return console.log("Added new note: "+ noteNew.title);
    });

    // Retrieves a note with specific id
    app.get("/api/notes/:id", function(req,res) {
        res.json(notes[req.params.id]);
    });

     // Deletes a note at a specific index
     app.delete("/api/notes/:id", function(req, res) {
        notes.splice(req.params.id, 1);
        updateDataBase();
        console.log("Deleting note at index "+req.params.id);
    });

    // Sends note to note.html
    app.get('/notes', function(req,res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // Sends updated notes to index.html
    app.get('*', function(req,res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // Updates database with new note
    function updateDataBase() {
        fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
            if (err) return console.log(err);
            return true;
        });
        }
    })
}
