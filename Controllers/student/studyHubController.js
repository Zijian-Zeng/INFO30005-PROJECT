const studyHubModel = require("../../Models/studyHub");
const subjectModel = require("../../Models/subject");
const studentModel = require("../../Models/student");

//Create a study hub.
const createHub = async (req, res, next) => {
	try{
		const { body } = req;
		const {
			subjectCode,
			time,
			location,
			summary,
			//creator,
		} = body;

		// check if the student has enrolled in the subject
        /*let subjectCodeMatch = req.student.subjects.filter(subjectCodeInStudent => {
            subjectCodeInStudent == subjectCode 
		});
		console.log(req.student.subjects);
		console.log(subjectCode);
		console.log(subjectCodeMatch);
		console.log(subjectCodeMatch.length);
		if (subjectCodeMatch.length == 0) {
			return res.status(400).json({
                success: false,
                error: "Subject not enrolled.",
            });
		}*/
		if (
			!req.student.subjects.some(
				subjectCodeInStudent => subjectCodeInStudent ==subjectCode
			)
		) {
			return res.status(400).json({
                success: false,
                error: "Subject not enrolled."});
		};

		// save the new study hub
		const newStudyHub = new studyHubModel({
			subjectCode: subjectCode,
			time: time,
			location: location,
			summary: summary,
			creator: req.student._id,
			//creator: creator,
		});
		const savedStudyHub = await newStudyHub.save();

		// save the study hub under the current subject
		const subject = await subjectModel.findOne({
            subjectCode: subjectCode,
        });
        subject.hubs.push(savedStudyHub._id);
        subject.save();

		// save the study hub to the current student profile
		req.student.studyHubs.push(savedStudyHub._id);
		req.student.save();
		
		// Update registed student list under the saved study hub
		savedStudyHub.studentRegistered.push(req.student._id);
		savedStudyHub.save();
		
		// create study hub successful
		res.status(201).json({ success: true, details: savedStudyHub });
	} catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Get all of the study hubs of a subject.
const getAll = async (req, res, next) => {
	try {
		//console.log(req.body);

		const { subjectCode } = req.body;
		subject = await subjectModel.findOne({ subjectCode: subjectCode });
		if(!subject) {
			return res.status(400).json({ error: "Invalid subject code." });
		}
		//console.log(subject.students);
		//console.log(subject.hubs);
		const { hubs } = subject;
		if (hubs.length == 0) {
			res.status(201).json({
				success: true,
				message: "no study hubs available",
				subject,
			});
		} else {
			res.json({ success: true, hubs: hubs });
		}
	} catch (error) {
        res.json({ error: error.message });
    }
};

// Join a study hub.
const joinHub = async (req, res, next) => {
	try{
		const { id, subjectCode } = req.body;
	
		// Validate study hub
		studyHub = await studyHubModel.findById(id);
		if (!studyHub) {
			return res.status(400).json({ error: "Invalid study hub." });
		}

		// check if the student has enrolled in the subject
        let subjectCodeMatch = req.student.subjects.filter(subjectCodeInStudent => {
            subjectCodeInStudent == subjectCode 
		});
		if (subjectCodeMatch.length = 0) {
			return res.status(400).json({
                success: false,
                error: "Subject not enrolled.",
            });
		}

		// Duplication detection
		if (
			req.student.studyHubs.some(studyHubId => 
			studyHubId == id
			)
		) {
			return res.status(400).json({ error: "Already joined this study hub." });
		}

		// Update student hub records in the current student profile
		req.student.studyHubs.push(id);
		req.student.save();
		
		// Update registed student list under the current study hub
		studyHub.studentRegistered.push(req.student._id);
		studyHub.save();

		// join study hub successful
		res.status(200).json({ 
			success: true, 
			studyHub: studyHub, 
			userAccount: req.student
		});
	} catch (error) {
		res.json({ error: error.message });
	}
};

//Leave a study hub.
const leaveHub = async (req, res, next) => {
	try {
		const { id } = req.body;

		// Validate study hub
		leavingStudyHub = await studyHubModel.findById(id);
		if (!leavingStudyHub) {
			return res.status(400).json({ error: "Invalid study hub." });
		}

		// check if the current student has joined the current study hub
		if (!req.student.studyHubs.some(
				(hubJoined) => hubJoined == id)
		) {
			return res.status(400).json({
                success: false,
                error: "Study hub not joined."});
		} 

		// Remove the current student from the current study hub student list
		leavingStudyHub.studentRegistered = leavingStudyHub.filter(
			registeredStudentId => registeredStudentId != req.student._id
		);
		leavingStudyHub.save();

		// Remove the study hub from the student profile
		req.student.studyHubs = req.student.studyHubs.filter(
			hubJoined => hubJoined != id
		);
		req.student.save();

		// If the student is the creator of the study hub, delete the study hub
		if (leavingStudyHub.creator == req.student) {
			const deletedStudyHub = await leavingStudyHub.remove();

			// Remove the deleted study hub from the subject
			const subject = await subjectModel.findOne({
				subjectCode: deletedStudyHub.subjectCode
			});
			subject.hubs = subject.hubs.filter(
				hubRecorded => hubRecord != id
			);
			subject.save();

			// Remove the deleted study hub from the hub members' profiles
			const { studentRegistered } = deletedStudyHub;
			for (memberId of studentRegistered) {
				const removingMember = await studentModel.findOne({
					_id: memberId
				});
				removingMember.studyHubs = removingMember.studyHubs.filter(
					hubJoined => hubJoined != id
				);
				removingMember.save();
			};

			// Delete study hub successful
			res.status(200).json({
				success: true,
				message: "Deleted study hub."
			})
		};

		// Leave study hub successful
		res.status(200).json({
			success: true,
			studyHubLeft: leavingStudyHub,
			message: "Left study hub."
        });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

//Update the information of a study hub.
const updateHub = async (req, res, next) => {
	try {
		const {
			id,
			time,
			location,
			summary,
		} = req.body;
		//const studyHub = await studyHubModel.findById(id);

		// Validate the study hub
		updatingStudyHub = await studyHubModel.findById(id);
		if (!updatingStudyHub) {
			return res.status(400).json({ error: "Invalid study hub." });
		};

		// Validate the creator [?]
		if (req.student._id != updatingStudyHub.creator) {
			return res.status(400).json({ error: "Invalid creator. Access to update denied." });
		};

		// update the fields where the values passed in are not empty
		if (time) {
			updatingStudyHub.time = time;
		};
		if (location) {
			updatingStudyHub.location = location;
		};
		if (summary) {
			updatingStudyHub.summary = summary;
		};
		const updatedStudyHub = await updatingStudyHub.save();

		// Update study hub successful
		return res.status(200).json({
			success: true,
			updatedStudyHub: updatedStudyHub
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

module.exports = { createHub, getAll, joinHub, leaveHub, updateHub };
