const express = require("express");
const app = express();

//APIs without token or authentication.
app.use("/shared", require("./shared/index"));

//APIs for students.
app.use("/student", require("./student/index"));

//APIs for staffs.
app.use("/staff", require("./staff/index"));

module.exports = app;
