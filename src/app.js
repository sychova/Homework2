const express = require('express')
require('dotenv').config()
const userRouter = require('./routers/users')

const app = express()

app.use(express.static('public'))
app.use(express.json());
app.use(userRouter)

module.exports = app
