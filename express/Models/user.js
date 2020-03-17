const mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
	firstName: { required: true, type: String },
	lastName: { required: true, type: String }
});

module.exports = mongoose.model("users", PostSchema); //将该Schema发布为Model,user就是集合名称
