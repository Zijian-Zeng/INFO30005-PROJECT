const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var StaffSchema = new mongoose.Schema({
	firstName: { default: "", type: String, max: 255 },
	lastName: { default: "", type: String, max: 255 },
	email: { required: true, type: String, min: 6 },
	password: { required: true, type: String, min: 6 },
	subjects: { type: Array },
	consultations: { type: Array },
	appointments: { type: Array },
});

StaffSchema.methods.hash = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

StaffSchema.methods.validatePassword = (input, password) => {
	return bcrypt.compareSync(input, password);
};

module.exports = mongoose.model("Staff", StaffSchema);
