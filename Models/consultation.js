const mongoose = require("mongoose");

// this schema is for consultation, where we have the subject code, time, location
// tutor, slots available and number of students signed up for that consultation
const ConsultationSchema = new mongoose.Schema({
	subjectCode: { required: true, type: String },

	startDate: { required: true, type: Date },
	endDate: { required: true, type: Date },

	location: { required: true, type: String },

	tutor: { required: true, type: String },

	//How many remaining slots are available for students.
	slotsAvailable: { required: true, max: 100, min: 0 },

	studentRegistered: { type: Array },

	reference: { type: String },

	week: { max: 13, min: 0 },

	questions: { type: Array },
});

module.exports = mongoose.model("consultation", ConsultationSchema);
