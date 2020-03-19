//载入所需要的各种包
const createError = require("./node_modules/http-errors");
const express = require("./node_modules/express");
const path = require("path");
const cookieParser = require("./node_modules/cookie-parser");
const bodyParser = require("./node_modules/body-parser");
const morgan = require("./node_modules/morgan");

const app = express();

//use function 用于使用中间件(middleware)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//载入数据库
require("./Models/db");

//载入日志
app.use(morgan("common"));

//载入路由
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
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/images", require("./routes/images/index"));
app.use("/api/users", require("./routes/api/users"));

//port setup
app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), function() {
	console.log(
		"Express started on http://localhost:" +
			app.get("port") +
			"; press Ctrl-C to terminate."
	);
});

module.exports = app;
