const consultModel = require("../../Models/consultation");
const subjectModel = require("../../Models/subject");

//View all available consultations of a subject
const viewAllConsult = async (req, res, next) => {
	try {
		const { subjectCode } = req.body;

		subject = await subjectModel.findOne({ subjectCode: subjectCode });
		if (!subject) {
			return res.status(400).json({ error: "Invalid subject code." });
		}
		if (!req.student.subjects.some((each) => each == subjectCode)) {
			return res
				.status(400)
				.json({ error: "Subject not found in your managed account." });
		}

		//Extract all the consultation information under this subject.
		const allConsult = [];
		const invalidIds = [];
		for (consultationId of subject.consultations) {
			const consultation = await consultModel.findById(consultationId);
			if (consultation) {
				allConsult.push(consultation);
			} else {
				//Determine if the consultation has been deleted.
				invalidIds.push(consultationId);
			}
		}
		//Delete all those invalid consultation id.
		for (invalidId of invalidIds) {
			subject.consultations = subject.consultations.filter(
				(each) => each !== invalidId
			);
		}
		subject.save();

		if (allConsult.length > 0) {
			return res.status(200).json({
				success: true,
				consultations: allConsult,
			});
		}
		res.status(200).json({
			success: true,
			consultations: allConsult,
			message: "There is no consultation under this subject.",
		});
	} catch (error) {
		res.json({ message: error.message });
	}
};

//View all registered consultations
const viewRegistConsult = async (req, res, next) => {
	try {
		//Find out all registered consultations in this account.
		const consultations = [];
		const invalidIds = [];
		for (consultationId of req.student.registeredConsult) {
			const consultation = await consultModel.findById(consultationId);
			if (consultation) {
				consultations.push(consultation);
			} else {
				//Determine if the consultation has been deleted.
				invalidIds.push(consultationId);
			}
		}

		//Delete all those invalid consultation id.
		for (invalidId of invalidIds) {
			req.student.registeredConsult = req.student.registeredConsult.filter(
				(each) => each !== invalidId
			);
		}
		req.student.save();

		if (consultations.length > 0) {
			return res.status(200).json({
				success: true,
				consultations: consultations,
			});
		}
		res.status(200).json({
			success: true,
			consultations: consultations,
			userAccount: req.student,
			message: "There is no consultation under this subject.",
		});
	} catch (error) {
		res.json({ message: error.message });
	}
};

//Book an available consultation
const bookConsult = async (req, res, next) => {
	try {
		const { id } = req.body;

		//Validate consultation ID
		consultation = await consultModel.findById(id);
		if (!consultation) {
			return res.status(400).json({ error: "Invalid consultation ID." });
		}
		//Check if the consultation is in your enrolled subjects.
		if (
			!req.student.subjects.some(
				(subjectCode) => subjectCode == consultation.subjectCode
			)
		) {
			return res
				.status(400)
				.json({ error: "Consultation not in your enrolled subjects." });
		}

		//Duplication detection.
		if (
			req.student.registeredConsult.some(
				(consultationId) => consultationId == id
			)
		) {
			return res
				.status(400)
				.json({ error: "Already booked this consultation." });
		}

		//Checking slots available.
		if (consultation.slotsAvailable == 0) {
			return res.status(200).json({
				success: false,
				message: "Sorry, this consultation is fully booked.",
			});
		}

		//Update students registered for the consultation chosen
		consultation.studentRegistered.push(req.student._id);
		consultation.slotsAvailable = consultation.slotsAvailable - 1;
		consultation.save();

		//Update the consultation registered for the student
		req.student.registeredConsult.push(id);
		req.student.save();

		res.status(200).json({
			success: true,
			consultation: consultation,
			userAccount: req.student,
		});
	} catch (error) {
		res.json({ message: error.message });
	}
};

//Cancel the booking of a consultation
const cancelConsult = async (req, res, next) => {
	try {
		const { id } = req.body;
		//Validate consultation ID
		consultation = await consultModel.findById(id);
		if (!consultation) {
			return res.status(400).json({ error: "Invalid consultation ID." });
		}

		//Cancel the consultaion booking in this account.
		req.student.registeredConsult = req.student.registeredConsult.filter(
			(each) => each != id
		);
		req.student.save();

		//Remove the user from registered students in consultaition collection.
		consultation.studentRegistered = consultation.studentRegistered.filter(
			(each) => each != req.user.id
		);
		consultation.slotsAvailable = consultation.slotsAvailable + 1;
		consultation.save();

		res.status(200).json({
			success: true,
			consultation: consultation,
			userAccount: req.student,
		});
	} catch (error) {
		res.json({ message: error.message });
	}
};

module.exports = {
	viewAllConsult,
	viewRegistConsult,
	bookConsult,
	cancelConsult,
};
