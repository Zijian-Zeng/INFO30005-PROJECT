var mongoose = require("mongoose");

//Describe the study hub details in the database.
var StudyHubSchema = new mongoose.Schema({
    subjectCode: { required: true, type: String },
    startDate: { required: true, type: Date },
    endDate: { required: true, type: Date },
    location: { required: true, type: String },
    summary: { type: String },
    creator: { type: String },
    studentRegistered: { type: Array },
});

module.exports = mongoose.model("studyHub", StudyHubSchema);
