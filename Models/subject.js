const mongoose = require("mongoose");

var SubjectSchema = new mongoose.Schema({
	code: { default: "", type: String },
	name: { default: "", type: String },
	staffid: { type: Array },
});

module.exports = mongoose.model("subject", SubjectSchema); //将该Schema发布为Model,user就是集合名称
