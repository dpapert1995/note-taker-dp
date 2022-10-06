// Require Dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup global notes variable for back end
fs.readFile("./db/db.json","json",function(data) {
    var notes = data;
});

var noteCount = 0;

// Require routes files for HTML and API
require('./routes/htmlRoutes')(app);
require('./routes/apiRoutes')(app);

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3001;

// Setup listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});  