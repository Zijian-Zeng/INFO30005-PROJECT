var mongoose = require("mongoose");

var StudyHubSchema = new mongoose.Schema({
	subjectCode: { required: true, type: String },
	time: { required: true, type: Date },
	location: { required: true, type: String },
	summary: { type: String },
	studentRegistered: { type: Array },
});

module.exports = mongoose.model("studyHub", StudyHubSchema);
