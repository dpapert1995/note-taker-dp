// Require Dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3001;

// Setup listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});  