express = require("express");
const subjectModel = require("../../Models/subject");
const consultModel = require("../../Models/consultation");

module.exports = async (req, res, next) => {
	try {
		//Determine how many student register consultations for each subject.
		const registeredTable = [];
		for ({ subjectCode, consultations } of await subjectModel.find()) {
			let num = 0;
			for (consultationId of consultations) {
				num += (await consultModel.findById(consultationId))
					.studentRegistered.length;
			}
			registeredTable.push({
				subjectCode: subjectCode,
				TotalRegisteredNum: num,
			});
		}

		res.status(200).json({
			registeredTable,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
