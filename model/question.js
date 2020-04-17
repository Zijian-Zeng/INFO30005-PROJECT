const mongoose = require("mongoose");

var questionSchema = new mongoose.Schema({
	subjectCode: { required: true, default: "", type: String },
	student: { type: String },
	title: { type: String },
	content: { required: true, type: String },
	image: { type: File },
	like: { default: 0, min: 0 },

	accessibility: {
		required: true,
		enum: ["public", "instructorOnly", "studyHubOnly"],
		default: "public",
	},

	//For students to like each question, more popular question will be listed on the top
	popularity: { required: true, default: 0 },
});

module.exports = mongoose.model("question", questionSchema);
