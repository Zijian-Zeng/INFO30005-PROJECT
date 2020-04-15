const subjectModel = require("../../Models/subject");

const createSubject = async (req, res, next) => {
	try {
		const { body } = req;
		const { subjectCode, subjectName, staff } = body;

		//Duplicate detection.
		occupiedSubject = await subjectModel.findOne({
			subjectCode: subjectCode,
		});

		if (occupiedSubject) {
			//Response error when subject already exist.
			return res
				.status(400)
				.json({ message: "Error! subject already exist" });
		} else {
			//Save the new subject.
			const subject = new subjectModel({
				subjectCode: subjectCode,
				subjectName: subjectName,
				staff: staff,
			});
			const newSubject = await subject.save();

			//Subject successfully created.
			res.status(201).json({ success: true, newSubject });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getAllSubjects = async (req, res, next) => {
	try {
		const subjects = await subjectModel.find();

		if (subjects.length == 0) {
			res.status(201).json({
				success: true,
				message: "no subjects available",
				subjects,
			});
		} else {
			res.json({ success: true, subjects });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getQuestionByTag = async (req, res, next) => {};

module.exports = { createSubject, getAllSubjects };
