const express = require("express");
const app = express();

// verify token.
app.use(require("../verify"));

// verify staff account identity.
app.use(require("./identify"));

// routes for consultation
app.use("/consult", require("./consultationApi"));

// routes for subject
app.use("/subjects", require("./subjectsApi"));

//routes for appointment
app.use("/appointment", require("./appointmentApi"));

app.use("/analytic", require("./analyticApi"));

module.exports = app;
