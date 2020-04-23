const express = require("express");
const app = express();

app.use(require("../verify"));

app.use(require("./identify"));

app.use("/subjects", require("./subjectsApi"));

app.use("/appointment", require("./appointmentApi"));

app.use("/consult", require("./consultationApi"));

app.use("/hub", require("./studyHubApi"));

app.use("/analytic", require("./analyticApi"));

module.exports = app;
