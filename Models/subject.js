const mongoose = require("mongoose");

//Describe the subject details in the database
const SubjectSchema = new mongoose.Schema({
    subjectCode: { required: true, default: "", type: String },
    subjectName: { default: "", type: String },

    //Each subject includes staffs, students, consultations, studyHubs, and appointment.
    staffs: { type: Array },
    students: { type: Array },
    consultations: { type: Array },
    hubs: { type: Array },
    appointments: { type: Array },
});

module.exports = mongoose.model("subject", SubjectSchema);
