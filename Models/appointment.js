const mongoose = require("mongoose");

//Describe the appointment details in the database.
const appointSchema = new mongoose.Schema({
    subjectCode: { required: true, default: "", type: String },
    staff: { type: String },
    student: { type: String },
    startDate: { required: true, type: Date },
    endDate: { required: true, type: Date },
    location: { required: true, type: String },
    summary: { type: String },
    status: {
        type: String,

        enum: ["PENDING", "APPROVED", "DECLINED"],

        default: "PENDING",
    },
    comment: { type: String },
});

module.exports = mongoose.model("appointments", appointSchema);
