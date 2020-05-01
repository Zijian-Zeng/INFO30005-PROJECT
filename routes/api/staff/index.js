const express = require("express");
const app = express();

//Verify token.
app.use(require("../../../Controllers/verify"));

//Verify staff account identity.
app.use(require("../../../Controllers/staff/identify"));

//APIs for consultations.
app.use("/consult", require("./consultationApi"));

//APIs for subjects.
app.use("/subjects", require("./subjectsApi"));

//APIs for appointments.
app.use("/appointment", require("./appointmentApi"));

//APIs for data analytic.
app.use("/analytic", require("./analyticApi"));

module.exports = app;
