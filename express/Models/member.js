const mongoose = require("mongoose");

var MemberSchema = new mongoose.Schema({
  user_name: String, //定义一个属性content，类型为String
  password: String //定义一个属性updated_at，类型为Date
});

module.exports = mongoose.model("users", MemberSchema); //将该Schema发布为Model,user就是集合名称
