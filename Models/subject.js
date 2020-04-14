const mongoose = require("mongoose");

var SubjectSchema = new mongoose.Schema({
	code: { required: true, default: "", type: String },
	subjectName: { default: "", type: String },
	staffID: { type: Array },
	studentID:{ type: Array},
	hubID: { type: Array },
	questionID:{ type: Array},
	consultationID: { type: Array },
});

module.exports = mongoose.model("question", SubjectSchema);
