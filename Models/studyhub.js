var mongoose = require("mongoose");

var StudyhubSchema = new mongoose.Schema({
    subjectCode: { required: true, type: String },
    time: { required: true, type: Date },
    location: { required: true, type: String },
    summary: { type: String },
    studentRegistered: { type: Array },
});

module.exports = mongoose.model("studyhub", StudyhubSchema);
