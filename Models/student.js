const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Describe the student details in the database
var StudentSchema = new mongoose.Schema({
    firstName: { default: "", type: String, max: 255 },
    lastName: { default: "", type: String, max: 255 },
    email: { required: true, type: String, min: 6 },
    password: { required: true, type: String, min: 6 },
    subjects: { type: Array },
    registeredHubs: { type: Array },
    appointments: { type: Array },
    registeredConsult: { type: Array },
});

//When system stores a password, it will be encoded for privacy and safety issues.
StudentSchema.methods.hash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

//Verify the password.
StudentSchema.methods.validatePassword = (input, password) => {
    return bcrypt.compareSync(input, password);
};

module.exports = mongoose.model("student", StudentSchema);
