const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var StudentSchema = new mongoose.Schema({
    firstName: { default: "", type: String, max: 255 },
    lastName: { default: "", type: String, max: 255 },
    email: { required: true, type: String, min: 6 },
    password: { required: true, type: String, min: 6 },
    subjects: { type: Array },
});

StudentSchema.methods.hash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

StudentSchema.methods.validatePassword = (input, password) => {
    return bcrypt.compareSync(input, password);
};

module.exports = mongoose.model("student", StudentSchema);
