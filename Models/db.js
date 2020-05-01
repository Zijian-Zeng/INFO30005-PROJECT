const mongoose = require("mongoose");

//Connect to the database.
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => console.log("Connection error"));

db.once("open", () => console.log("connected!"));

module.exports = mongoose;
