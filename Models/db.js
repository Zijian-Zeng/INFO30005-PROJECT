const mongoose = require("mongoose");

//Connect to the database.
mongoose.connect(
	process.env.MONGODB_URI ||
		"mongodb+srv://meetute:info30005@meetute-wxtad.mongodb.net/test?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

const db = mongoose.connection;

db.on("error", (error) => console.log("Connection error"));

db.once("open", () => console.log("connected!"));

module.exports = mongoose;
