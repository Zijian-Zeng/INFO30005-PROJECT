const express = require("express");
const app = express();

app.use((req, res, next) => {
    next();
});

//for users to log in or sign up
app.use("/users", require("./userApi"));

module.exports = app;
