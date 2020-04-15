const express = require("express");
const app = express();

app.use(require("../verify"));

app.use(require("./identify"));

app.use("/subjects", require("./subjectsApi"));

module.exports = app;
