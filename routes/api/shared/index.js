const express = require("express");
const app = express();

app.use((req, res, next) => {
    console.log("testing!");
    next();
});

app.use("/users", require("./userApi"));

module.exports = app;
