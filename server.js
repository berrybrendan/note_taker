// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//I'm using an object instead of the database file because I couldn't get it to function as smoothly
//I'd like to figure out how to use the file successfully because I have a feeling it will make it easier to delete objects
var noteObj = []

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("/api/notes", function (req, res) {
    return res.json(noteObj);
});
app.post("/api/notes", function (req, res) {
    var note = req.body;
    noteObj.push(note);
    res.json(note);
});

app.get("/api/notes/:id", function (req, res) {

    var request = parseInt(req.params.id)
    console.log(request)
    console.log(noteObj.id)
    //noteObj.id isn't returning anything for some reason
    //I'm still trying to figure out why
    if (noteObj.id === request) {
        var index = noteObj.indexOf(request);
        if (index > -1) {
            array.splice(index, 1);
        }
        return res.json(noteObj)
    }
    else 
        res.send("Please enter the ID of the note you would like to delete.")
});



app.listen(process.env.PORT || PORT, function () {
    console.log("App listening on PORT " + PORT);
});
