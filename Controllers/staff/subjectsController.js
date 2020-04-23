const subjectModel = require("../../Models/subject");
const consultationModel = require("../../Models/consultation");

const createSubject = async (req, res, next) => {
	try {
		const { body } = req;
		const { subjectCode, subjectName } = body;

		//Duplicate detection.
		if (
			await subjectModel.findOne({
				subjectCode: subjectCode,
			})
		) {
			//Response error when subject already exist.
			return res
				.status(400)
				.json({ message: "Error! subject already exist." });
		}

		//Save the new subject.
		const subject = new subjectModel({
			subjectCode: subjectCode,
			subjectName: subjectName,
			staffs: [req.user.id],
		});
		const newSubject = await subject.save();

		//Add the subject code under this account.
		req.staff.subjects.push(subjectCode);
		req.staff.save();

		//Subject successfully created.
		res.status(201).json({ success: true, newSubject });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const deleteSubject = async (req, res, next) => {
	try {
		const { subjectCode } = req.body;

		// find the subject to be deleted
		subject = await subjectModel.findOne({
			subjectCode: subjectCode,
		});
		if (!subject) {
			res.status(400).json({
				error: "deleting a subject that does not exist.",
			});
		}

		//Delete all of the consultations under the subject.
		for (id of subject.consultations) {
			const consultation = await consultationModel.findById(id);
			if (consultation) {
				consultation.remove();
			}
		}

		//Delete the subject.
		const deletedSubject = await subject.remove();
		res.status(200).json({ success: true, deleted: deletedSubject });
	} catch (error) {
		res.json({ message: error.message });
	}
};

const joinSubject = async (req, res, next) => {
	try {
		const { subjectCode } = req.body;
		const { subjects } = req.staff;

		//Validate subjectCode.
		const subject = await subjectModel.findOne({
			subjectCode: subjectCode,
		});
		if (!subject) {
			return res.status(400).json({
				success: false,
				error: "Subject code invalid.",
			});
		}

		//Duplicate detection.
		if (subjects.filter((subject) => subject === subjectCode).length > 0) {
			return res.status(200).json({
				success: false,
				error: "This subject is already in your account.",
			});
		}

		//Update the subjects list in this account.
		subjects.push(subjectCode);
		const staffChangedTo = await req.staff.save();

		//Add this account under subject collection.
		subject.staffs.push(req.user.id);
		subject.save();

		res.status(200).json({ success: true, staffChangedTo });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const leaveSubject = async (req, res, next) => {
	try {
		const { subjectCode } = req.body;
		const { subjects } = req.staff;

		//Validate the subject code.
		const subject = await subjectModel.findOne({
			subjectCode: subjectCode,
		});
		if (!subject) {
			return res.status(400).json({
				success: false,
				error: "Subject code invalid.",
			});
		}

		//Delete the subjectCode in this account.
		req.staff.subjects = subjects.filter((each) => each != subjectCode);
		req.staff.save();

		//Delete the user id under this subject.
		subject.staffs = subject.staffs.filter((each) => each != req.user.id);
		subject.save();
		res.status(200).json({ success: true, userInfo: req.staff, subject });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getAll = async (req, res, next) => {
	try {
		const { subjects } = req.staff;
		const subjectsInfo = [];

		for (subjectCode of subjects) {
			const subject = await subjectModel.findOne({
				subjectCode: subjectCode,
			});
			if (subject) {
				subjectsInfo.push(subject);
			}
		}

		res.status(200).json({ success: true, subjectsInfo });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	createSubject,
	deleteSubject,
	joinSubject,
	leaveSubject,
	getAll,
};
