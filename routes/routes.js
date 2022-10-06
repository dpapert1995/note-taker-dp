const moment = require("moment");
module.exports = app => {
    // Read the db.json file and return all saved notes as JSON.
    app.get("/api/notes", function(req, res) {
        res.json(notes);
    });

    // Receives a new note, adds it to db.json, then returns the new note
    app.post("/api/notes", function(req, res) {
        let noteNew = req.body;
        notes[noteCount++] = noteNew;
        updateDataBase();
        return console.log("Added new note: "+ noteNew.title);
    });

    // Retrieves a note with specific id
    app.get("/api/notes/:id", function(req,res) {
        res.json(notes[req.params.id]);
    });

    // Updates database with new note
    function updateDataBase() {
        fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
            if (err) return console.log(err);
            return true;
        });
    }
}