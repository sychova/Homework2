const express = require("express");
const app = express();
const usersList = require("./usersTableServer");

app.use(express.static('public'));

app.get("/getUsers", usersList.getUsers);


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(3000, function() {
    console.log("Listening on port 3000");
});