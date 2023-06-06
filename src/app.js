const express = require("express");
require("dotenv").config();

const userRouter = require("./routes/users");

const app = express();

app.use(express.static("public"));
app.use(express.json());

router.get("/", (req, res) => {
  res.render("index.pug");
});

app.use("/users", userRouter);

module.exports = app;
