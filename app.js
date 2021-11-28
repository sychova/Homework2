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
var bodyParser = require('body-parser')
app.use(bodyParser.json())



 
// create application/json parser
var jsonParser = bodyParser.json()


const port = process.env.PORT

app.get("/", (req, res) => {
    res.render("index.pug");
});

// Get Users
app.get("/users", async (req, res) => {
    try {
        const data = await getUsers(req.query);
        res.status(201).send(data);
    } catch (error) {
        res.status(500).send(error)
    }
});

// Create a User
app.post("/users", jsonParser, async (req, res) => {
    try {
        await createUser(req.body);
        res.status(201).send();
    } catch (error) {
        res.status(500).send(error)
    }
});

// Get a specific User for Editing
app.get("/users/:id", async (req, res) => {
    try {
        const user = await editUser(req.params.id);
        if (!user) {
            return res.status(404).send()
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error)
    }
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
