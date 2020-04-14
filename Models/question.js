const mongoose = require("mongoose");

var questionSchema = new mongoose.Schema({
	subjectCode: { required: true, default: "", type: String },
	subjName: { default: "", type: String },
	student: {type: String},
	content: {required = true, type: String},
});

module.exports = mongoose.model("question", questionSchema);