const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
	subjectCode: { required: true, default: "", type: String },
	subjectName: { default: "", type: String },

	// each subject includes staff, students, study hubs, question boards and consultations
	staffs: { type: Array },
	students: { type: Array },
	hubs: { type: Array },
	questions: { type: Array },
	consultations: { type: Array },
});

module.exports = mongoose.model("subject", SubjectSchema);
