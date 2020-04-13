const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var UserSchema = new mongoose.Schema({
	firstName: { default: "", type: String },
	lastName: { default: "", type: String },
	email: { required: true, type: String },
	password: { required: true, type: String },
	subjects: { type: Array },
});

UserSchema.methods.hash = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.validatePassword = (input, password) => {
	return bcrypt.compareSync(input, password);
};

module.exports = mongoose.model("user", UserSchema); //将该Schema发布为Model,user就是集合名称
