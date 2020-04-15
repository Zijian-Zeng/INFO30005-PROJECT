const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
	subjectCode: { required: true, default: "", type: String },
	subjectName: { default: "", type: String },

	// each subject includes staff, students, study hubs, question boards and consultations
	staffID: { type: Array },
	studentID: { type: Array },
	hubID: { type: Array },
	questionID: { type: Array },
	consultationID: { type: Array },
});

module.exports = mongoose.model("subject", SubjectSchema);
