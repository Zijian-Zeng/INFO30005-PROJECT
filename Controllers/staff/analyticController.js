express = require("express");
const subjectModel = require("../../Models/subject");
const consultModel = require("../../Models/consultation");

//Get all the consultation sign up numbers for all the subjects
const getConsultData = async (req, res, next) => {
    try {
        //Determine how many student register consultations for each subject.
        const { subjects } = req.staff;
        const consultTable = [];

        for (subjectCode of subjects) {
            const subject = await subjectModel.findOne({
                subjectCode: subjectCode,
            });
            let signupNum = 0;
            let consultNum = 0;
            for (consultationId of subject.consultations) {
                const consultation = await consultModel.findById(
                    consultationId
                );
                if (consultation) {
                    consultNum += 1;
                    signupNum += consultation.studentRegistered.length;
                }
            }
            consultTable.push({
                subjectCode: subjectCode,
                TotalRegisteredNum: signupNum,
                TotalConsultationNum: consultNum,
            });
        }
        res.status(200).json({
            consultTable,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getConsultData };
