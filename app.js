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

app.get("/", (req, res) => {
    res.render("index.pug");
});

// Get Users
app.get("/users", (req, res) => {
    getUsers(req.query, res);
});

// Create a User
app.post("/users", (req, res) => {
    req.on('data', (c) => {
        var objectUser = JSON.parse(c.toString());
        createUser(objectUser);
    });
    res.send(201);
});

// Get a specific User for Editing
app.get("/users/:id", async (req, res) => {
    const user = await editUser(req.params.id);
    res.send(user);
});

// Update the User
app.patch("/users/:id", (req, res) => {
    res.sendStatus(200);
    req.on('data', (c) => {
        var objectUser = JSON.parse(c.toString());
        updateUser(objectUser);
    });
});

// Delete a User
app.delete("/users/:id", (req, res) => {
    res.sendStatus(200);
    deleteUser(req.params.id, res);
});

app.listen(port, (req, res) => {
    console.log(`App listening on port ${port}`);
});
