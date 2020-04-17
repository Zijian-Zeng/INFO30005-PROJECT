const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
	subjectCode: { required: true, default: "", type: String },
	staff: { type: String },
	student: { type: String },

	startDate: { required: true, type: Date },
	endDate: { required: true, type: Date },

	location: { required: true, type: String },
	summary: { type: String },

	status: { type: String },
});

module.exports = mongoose.model("request", requestSchema);
