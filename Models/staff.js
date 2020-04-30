const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Describe the staff details in the database.
var StaffSchema = new mongoose.Schema({
    firstName: { default: "", type: String, max: 255 },
    lastName: { default: "", type: String, max: 255 },
    email: { required: true, type: String, min: 6 },
    password: { required: true, type: String, min: 6 },
    subjects: { type: Array },
    consultations: { type: Array },
    appointments: { type: Array },
});

//When system stores a password, it will be encoded for privacy and safety issues.
StaffSchema.methods.hash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

//Verify the password.
StaffSchema.methods.validatePassword = (input, password) => {
    return bcrypt.compareSync(input, password);
};

module.exports = mongoose.model("Staff", StaffSchema);
