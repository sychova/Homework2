const express = require('express');
const app = express();
const {
    getUsers,
    deleteUser,
    editUser,
    updateUser,
    createUser,
    paginateUsers
} = require("./userService");

app.use(express.static('public'));

const port = process.env.PORT

app.get("/", function(req, res) {
    res.render("index.pug");
});

// Get Users
app.get("/users", function(req, res) {
    getUsers(req.query, res);
});

// Create a User
app.post("/users", function(req, res) {
    res.sendStatus(201);
    req.on('data', function(c) {
        var objectUser = JSON.parse(c.toString());
        createUser(objectUser);
    });
});

// Get a specific User for Editing
app.get("/users/:id", function(req, res) {
    editUser(req.params.id, res);
});

// Update the User
app.patch("/users/:id", function(req, res) {
    res.sendStatus(200);
    req.on('data', function(c) {
        var objectUser = JSON.parse(c.toString());
        updateUser(objectUser);
    });
});

// Delete a User
app.delete("/users/:id", function(req, res) {
    res.sendStatus(200);
    deleteUser(req.params.id, res);
});

app.listen(port, function() {
    console.log(`App listening on port ${port}`);
});