const subjectModel = require("../../model/subject");

const joinSubject = async (req, res, next) => {
	try {
		const { body, student } = req;
		const { subjectCode } = body;
		const { subjects } = student;

		//Validate subjectCode.
		let subjectInvalid = true;
		if (subjectCode) {
			const subjects = await subjectModel.find();
			subjects.map((subject) => {
				if (subject.subjectCode == subjectCode) {
					subjectInvalid = false;
				}
			});
		}
		if (subjectInvalid) {
			return res.status(200).json({
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

		//Update the subjects list for this users.
		subjects.push(subjectCode);
		const studentChanged = await student.save();
		res.status(200).json({ success: true, ChangedTo: studentChanged });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const leaveSubject = async (req, res, next) => {
	try {
		const { body, student } = req;
		const { subjectCode } = body;
		const { subjects } = student;

		//Verify the subjectCode that is about to be deleted.
		const subjectsAfterDelete = subjects.filter(
			(subject) => subject != subjectCode
		);
		if (subjects.length == subjectsAfterDelete.length) {
			return res.status(200).json({
				success: false,
				error:
					"You are deleting a subjects that do not exist in your account.",
			});
		}

		student.subjects = subjectsAfterDelete;
		const studentChanged = await student.save();
		res.status(200).json({ success: true, ChangedTo: studentChanged });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getAllSubjects = async (req, res, next) => {
	try {
		console.log(req.student);

		const { subjects } = req.student;
		if (subjects.length == 0) {
			res.status(201).json({
				success: true,
				message: "no subjects available",
				subjects,
			});
		} else {
			res.json({ success: true, subjects: subjects });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = { joinSubject, leaveSubject, getAllSubjects };
