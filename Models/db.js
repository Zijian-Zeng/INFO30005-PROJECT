var mongoose = require("mongoose");

const testEnv =
	"mongodb+srv://meetute:info30005@meetute-wxtad.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(process.env.MONGODB_URI || testEnv, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on("error", (error) => console.log("Connection error"));

db.once("open", () => console.log("connected!"));

module.exports = mongoose;
