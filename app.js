const express = require("express");
const app = express();
const usersList = require("./usersTableServer");
const pug = require("pug");

app.use(express.static('public'));

app.get("/getUsers", function(req, res) {
    var users = usersList.getUsers;
    res.render("index.pug");
});


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(3000, function() {
    console.log("Listening on port 3000");
});