const express = require("express");
const app = express();
const usersList = require("./usersTableServer");

app.use(express.static('public'));

app.get("/", usersList.getUsers);

app.get("/delete/:userID", function(req, res) {
    usersList.deleteUser(req.params.userID, res);
});

app.listen(3000, function() {
    console.log("Listening on port 3000");
});