const mongoose = require("mongoose");

//Describe the appointments in the system.
const appointSchema = new mongoose.Schema({
	subjectCode: { required: true, default: "", type: String },
	staff: { type: String },
	student: { type: String },
	startDate: { required: true, type: Date },
	endDate: { required: true, type: Date },
	location: { required: true, type: String },
	summary: { type: String },
	status: {
		type: String,

		enum: ["PENDING", "APPROVED", "DECLINED"],

		default: "PENDING",
	},
	comment: { type: String },
});

module.exports = mongoose.model("appointments", appointSchema);
