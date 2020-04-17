const subjectModel = require("../../models/subject");

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

//  delete subject from database
const deleteSubject = async (req, res, next) => {
	try {
		const { subjectCode, subjectName, staff } = req.body;
		// find the subject to be deleted
		subject = await subjectModel.findOne({
			subjectCode: subjectCode,
		});
		if (!subject) {
			res.status(400).json({
				error: "deleting a subject that does not exist.",
			});
		}

		const deletedSubject = await subject.remove();
		res.status(200).json({ success: true, deleted: deletedSubject });
	} catch (error) {
		res.json({ message: error.message });
	}
};

module.exports = { createSubject, deleteSubject };
