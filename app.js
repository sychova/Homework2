const express = require("express");
const app = express();
const usersList = require("./usersTableServer");

app.use(express.static('public'));

app.get("/", usersList.loadUsersPage);

app.get("/users/", function(req, res) {
    var rrr = usersList.getUsers;
    console.log(rrr);
});

app.get("/users/:id", function(req, res) {
    usersList.editUser(req.params.id, res);
});

app.delete("/users/:id", function(req, res) {
    res.sendStatus(200);
    usersList.deleteUser(req.params.id, res);
});

app.listen(3000, function() {
    console.log("Listening on port 3000");
});