const mongoose = require("mongoose");

var SubjectSchema = new mongoose.Schema({
	code: { required: true, default: "", type: String },
	subjName: { default: "", type: String },
	staff: { type: Array }
});

module.exports = mongoose.model("subject", SubjectSchema); //将该Schema发布为Model,user就是集合名称
