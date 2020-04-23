const mongoose = require("mongoose");

/* 
this schema is for consultation, where we have the subject code, time, 
location tutor, slots available and number of students signed up for that
consultation.
 */
const ConsultationSchema = new mongoose.Schema({
	subjectCode: { required: true, type: String },

	startDate: { required: true, type: Date },
	endDate: { required: true, type: Date },

	location: { required: true, type: String },

	creator: { required: true, type: String },

	//How many remaining slots are available for students.
	slotsAvailable: { required: true, type: Number, min: 0 },

	studentRegistered: { type: Array },

	// option to refer to a question on discussion forum
	references: { type: Array },

	// option to refer to a particular week's content
	week: { default: 1, type: Number },
});

module.exports = mongoose.model("consultation", ConsultationSchema);
