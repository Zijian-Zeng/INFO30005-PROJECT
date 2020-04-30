const express = require("express");
const app = express();

//Verify the meetute-token header in requests.
app.use(require("../verify"));

//Identify the student of the request.
app.use(require("./identify"));

//APIs for subjects.
app.use("/subjects", require("./subjectsApi"));

//APIs for appointments.
app.use("/appointment", require("./appointmentApi"));

//APIs for consultations.
app.use("/consult", require("./consultationApi"));

//APIs for study hubs.
app.use("/hub", require("./studyHubApi"));

module.exports = app;
