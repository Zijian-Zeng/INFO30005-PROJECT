var mongoose = require("mongoose");

// this schema is for consultation, where we have the subject code, time, location
// tutor, slots available and number of students signed up for that consultation
const ConsultationSchema = new mongoose.Schema({
    subjectCode : {required: true, type: String},
    time: {required: true, type: Date},
    location: {required: true, type: String},
    tutor: {required: true, type: String},
    slotsAvailable:{type: String},
    studentRegistered:{type: Array},
    // an array to store all the topics students want to discuss 
    topic: {type: Array},
});

module.exports = mongoose.model("consultation", ConsultationSchema);