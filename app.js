const express = require('express')
const app = express()
const {
    getUsers,
    deleteUser,
    editUser,
    updateUser,
    createUser
} = require("./userService")

app.use(express.static('public'))
app.use(express.json());

const port = process.env.PORT

app.get("/", (req, res) => {
    res.render("index.pug")
})

// Get Users
app.get("/users", async (req, res) => {
    try {
        const data = await getUsers(req.query)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Create a User
app.post("/users", async (req, res) => {
    try {
        await createUser(req.body)
        res.status(201).send()
    } catch (error) {
        res.status(500).send(error)
    }
})

// Get a specific User for Editing
app.get("/users/:id", async (req, res) => {
    try {
        const user = await editUser(req.params.id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Update the User
app.patch("/users/:id", async (req, res) => {
    try {
        await updateUser(req.body)
        res.status(200).send()
    } catch (error) {
        res.status(500).send(error)
    }
})

// Delete a User
app.delete("/users/:id", async (req, res) => {
    try {
        await deleteUser(req.params.id)
        res.status(200).send()
    } catch (error) {
        res.status(500).send(error)
    }
})

app.listen(port, (req, res) => {
    console.log(`App listening on port ${port}`)
})
