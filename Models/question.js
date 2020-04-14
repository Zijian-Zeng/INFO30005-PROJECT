const mongoose = require("mongoose");

var questionSchema = new mongoose.Schema({
	code: { required: true, default: "", type: String },
	subjName: { default: "", type: String },
	staffID: { type: Array },
	studentID:{ type: Array},
	hubID: { type: Array },
	questionID:{ type: Array},
	consultationID: { type: Array },
});

module.exports = mongoose.model("subject", questionSchema);