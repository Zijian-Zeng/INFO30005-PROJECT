const express = require("express");
const app = express();

// verify token.
app.use(require("../verify"));

// verify staff account identity.
app.use(require("./identify"));

// routes for subject
app.use("/subjects", require("./subjectsApi"));

//routes for appointment
app.use("/appointment", require("./appointmentApi"));

module.exports = app;
