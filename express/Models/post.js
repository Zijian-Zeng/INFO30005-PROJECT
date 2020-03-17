const mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
	title: String, //定义一个属性content，类型为String
	content: String //定义一个属性updated_at，类型为Date
});

module.exports = mongoose.model("users", PostSchema); //将该Schema发布为Model,user就是集合名称
