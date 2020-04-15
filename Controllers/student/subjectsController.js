const studentModel = require("../../Models/student");

const addSubject = async (req, res, next) => {
	try {
		const { body, student } = req;
		const { subjectCode } = body;
		const { subjects } = student;

		//Duplicate detection.
		console.log(student);
		console.log(subjects);
		console.log(subjectCode);
		if (subjects.filter((subject) => subject === subjectCode).length > 0) {
			return res.status(200).json({
				success: false,
				error: "you have already selected the subjects.",
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

const deleteSubject = async (req, res, next) => {
	try {
		const { body, student } = req;
		const { subjectCode } = body;

		const { subjects } = student;

		//Verify the subjectCode that is about to be deleted.
		const subjectsAfterDelete = subjects.filter(
			(subject) => subject != subjectCode
		);
		if (subjects.length == subjectsAfterDelete) {
			return res.status(200).json({
				success: false,
				error:
					"You are deleting a subjects that do not exist in your account.",
			});
		}

		subjects = subjectsAfterDelete;
		const studentChanged = await student.save();
		res.status(200).json({ success: true, ChangedTo: studentChanged });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getAllSubjects = async (req, res, next) => {
	try {
		const student = await studentModel.findById(req.user.id);

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

module.exports = { addSubject, deleteSubject };
