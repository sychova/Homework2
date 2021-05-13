const express = require("express");
const app = express();
const usersList = require("./userService");

app.use(express.static('public'));

// Load page
app.get("/", usersList.loadUsersPage);

// Get all the Users
app.get("/users/:id?", function(req, res) {
    if (req.params.id) {
        console.log("editUsers");
        usersList.editUser(req.params.id, res);
    } else if (req.query.FirstName) {
        console.log("Search");
        usersList.getUsers(req.query.FirstName, res);
    } else {
        console.log("getUsers all");
        usersList.getUsers(req, res);
    }

});

// Create a User
app.post("/users", function(req, res) {
    res.sendStatus(200);
    req.on('data', function(c) {
        var objectUser = JSON.parse(c.toString());
        usersList.createUser(objectUser);
    });
});

// Get a specific User for Editing
// app.get("/user/:id", function(req, res) {
//     usersList.editUser(req.params.id, res);
// });

// Update the User
app.post("/users/:id", function(req, res) {
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

app.listen(3000, function() {
    console.log("Listening on port 3000");
});