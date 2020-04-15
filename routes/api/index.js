const express = require("express");
const app = express();

app.use("/images", require("./images/index"));

app.use("/shared", require("./shared/index"));

app.use("/student", require("./student/index"));

app.use("/staff", require("./staff/index"));

module.exports = app;
