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

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", function (err, data) {
        if (err) throw err;

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
    });
});
app.post("/api/notes", function (req, res) {
    var note = res.body
    fs.readFile(__dirname + "/db/db.json", function (err, data) {
        if (err) throw err;
        JSON.parse(data).db.push(note)
    });
    res.json(note);
});
app.post("/api/notes/:id", function (req, res) {

});



app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
