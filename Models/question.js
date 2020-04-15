const mongoose = require("mongoose");

var questionSchema = new mongoose.Schema({
    subjectCode: { required: true, default: "", type: String },
    subjName: { default: "", type: String },
    student: { type: String },
    content: { required: true, type: String },
    accessibility: {
        required: true,
        enum: ["public", "instructorOnly", "studyHubOnly"],
        default: "public",
    },

    // for students to like each question, more popular question will be listed on the top
    popularity: { required: true, default: 0 },
});

module.exports = mongoose.model("question", questionSchema);

pub;
