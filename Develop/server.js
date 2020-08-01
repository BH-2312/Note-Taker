// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
var { v4: uuidv4 } = require('uuid');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes 

// Routes to send user to correct pages in browser

app.get("/", function (req, res) {
    return res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    return res.sendFile(path.join(__dirname, "public/notes.html"));
});

//Routes to handle 

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"))

});

app.post("/api/notes", function (req, res) {
    var newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    }
    let prevNote = JSON.parse(fs.readFileSync(path.join(__dirname, "./db/db.json"), "utf-8"))
    //console.log(newNote);
    prevNote.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(prevNote));
    res.json(prevNote);
});

app.delete("/api/notes/:id", function (req, res) {
    var noteId = req.params.id;
    //console.log(uniqueId);
    var noteList = JSON.parse(fs.readFileSync(path.join(__dirname, "./db/db.json"), "utf-8"))
    var newNotes = noteList.filter(noteList =>  noteList.id != noteId );
    fs.writeFileSync("./db/db.json", JSON.stringify(newNotes));
    res.send(newNotes);
})


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});