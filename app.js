const express = require('express');
const app = express();
const usersList = require("./userService");

app.use(express.static('public'));

const port = process.env.PORT

app.get("/", function(req, res) {
    res.render("index.pug");
});

// Load page
app.get("/users-center", function(req, res) {
    res.render("usersCenter.pug");
});

// Get Users
app.get("/users", function(req, res) {
    usersList.getUsers(req.query, res);
});

// Create a User
app.post("/users", function(req, res) {
    res.sendStatus(201);
    req.on('data', function(c) {
        var objectUser = JSON.parse(c.toString());
        usersList.createUser(objectUser);
    });
});

// Get a specific User for Editing
app.get("/users/:id", function(req, res) {
    usersList.editUser(req.params.id, res);
});

// Update the User
app.patch("/users/:id", function(req, res) {
    res.sendStatus(200);
    req.on('data', function(c) {
        var objectUser = JSON.parse(c.toString());
        usersList.updateUser(objectUser);
    });
});

// Delete a User
app.delete("/users/:id", function(req, res) {
    res.sendStatus(200);
    usersList.deleteUser(req.params.id, res);
});

app.listen(port, function() {
    console.log(`App listening on port ${port}`);
});