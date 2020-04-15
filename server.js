const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
//const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

require("./Models/db");

app.use(morgan("common"));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    next();
});

app.use("/api/images", require("./routes/images/index"));

app.use("/api/shared", require("./routes/shared/index"));

//app.use("/api/staff", require("./routes/staff/index"));

//app.use("/api/student", require("./routes/student/index"));

process.env.NODE_ENV = "production";
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}

//port setup
app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), function () {
    console.log(
        "Express started on http://localhost:" +
            app.get("port") +
            "; press Ctrl-C to terminate."
    );
});

module.exports = app;
