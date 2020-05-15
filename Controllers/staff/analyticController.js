express = require("express");
const subjectModel = require("../../Models/subject");
const consultModel = require("../../Models/consultation");

//Get all the consultation sign up numbers for all the subjects
const getConsultData = async (req, res, next) => {
	try {
		//Determine how many student register consultations for each subject.
		const { subjects } = req.staff;
		const consultTable = [];

		const invalidSubjectCodes = [];
		for (subjectCode of subjects) {
			const subject = await subjectModel.findOne({
				subjectCode: subjectCode,
			});
			if (!subject) {
				//Determine the invalid subject code in this account.
				invalidSubjectCodes.push(subjectCode);
			} else {
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
		}
		//Delete the invalid subject code in this account.
		for (invalidSubjectCode of invalidSubjectCodes) {
			req.staff.subjects = req.staff.subjects.filter(
				(each) => each != invalidSubjectCode
			);
		}
		req.staff.save();
		res.status(200).json({
			consultTable,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = { getConsultData };
