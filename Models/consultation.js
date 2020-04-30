const mongoose = require("mongoose");

//Describe the consultations in the system.
const ConsultationSchema = new mongoose.Schema({
	subjectCode: { required: true, type: String },
	startDate: { required: true, type: Date },
	endDate: { required: true, type: Date },
	location: { required: true, type: String },
	creator: { required: true, type: String },
	studentRegistered: { type: Array },

	//How many remaining slots are available for students.
	slotsAvailable: { required: true, type: Number, min: 0 },

	//Option to refer to a question on discussion forum
	references: { type: Array },

	//Option to refer to a particular week's content
	week: { default: 1, type: Number },
});

module.exports = mongoose.model("consultation", ConsultationSchema);
