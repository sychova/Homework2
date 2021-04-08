const express = require("express");
const app = express();
const myfirstmodule = require("./myfirstmodule");

// Showing pages
app.get("/", function(req, res) {
    res.send("Hello world!");
})

app.get("/siski", function(req, res) {
    res.sendFile(__dirname + "/indexx.html");
})

myfirstmodule.log("pizdec");

app.listen(3000, function() {
    console.log("Listening on port 3000");
})