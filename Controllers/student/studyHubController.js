const studyHubModel = require("../../Models/studyHub");
const subjectModel = require("../../Models/subject");
const studentModel = require("../../Models/student");

//Create a study hub.
const createHub = async (req, res, next) => {
    try {
        const { body } = req;
        const { subjectCode, startDate, endDate, location, summary } = body;

        //Check if the student has enrolled in the subject
        if (
            !req.student.subjects.some(
                (subjectCodeInStudent) => subjectCodeInStudent == subjectCode
            )
        ) {
            return res.status(400).json({
                success: false,
                error: "Subject not enrolled.",
            });
        }

        //Save the new study hub
        const newStudyHub = new studyHubModel({
            subjectCode: subjectCode,
            startDate: startDate,
            endDate: endDate,
            location: location,
            summary: summary,
            creator: req.student._id,
        });
        const savedStudyHub = await newStudyHub.save();

        //Save the study hub under the current subject
        const subject = await subjectModel.findOne({
            subjectCode: subjectCode,
        });
        subject.hubs.push(savedStudyHub._id);
        subject.save();

        //Save the study hub to the current student profile
        req.student.registeredHubs.push(savedStudyHub._id);
        req.student.save();

        //Update registered student list under the saved study hub
        savedStudyHub.studentRegistered.push(req.student._id);
        savedStudyHub.save();

        //Create study hub successful
        res.status(201).json({ success: true, details: savedStudyHub });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Get all of the study hubs of a subject.
const getAll = async (req, res, next) => {
    try {
        const { subjectCode } = req.body;
        subject = await subjectModel.findOne({ subjectCode: subjectCode });
        if (!subject) {
            return res.status(400).json({ error: "Invalid subject code." });
        }

        const hubsInfo = [];
        for (hubId of subject.hubs) {
            const studyHub = await studyHubModel.findById(hubId);
            if (studyHub) {
                hubsInfo.push(studyHub);
            }
        }

        if (hubsInfo == 0) {
            res.status(201).json({
                success: true,
                message: "no study hubs available",
                subjectHubs: hubsInfo,
            });
        } else {
            res.json({ success: true, subjectHubs: hubsInfo });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
};

//Get all the registered study hubs for the user
const getRegistered = async (req, res, next) => {
    try {
        const hubsInfo = [];
        for (hubId of req.student.registeredHubs) {
            const studyHub = await studyHubModel.findById(hubId);
            if (studyHub) {
                hubsInfo.push(studyHub);
            }
        }

        if (hubsInfo == 0) {
            res.status(201).json({
                success: true,
                message: "no study hubs available",
                subjectHubs: hubsInfo,
            });
        } else {
            res.json({ success: true, subjectHubs: hubsInfo });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
};

// Join a study hub.
const joinHub = async (req, res, next) => {
    try {
        const { id, subjectCode } = req.body;

        //Validate study hub
        studyHub = await studyHubModel.findById(id);
        if (!studyHub) {
            return res.status(400).json({ error: "Invalid study hub." });
        }

        //Check if the student has enrolled in the subject
        let subjectCodeMatch = req.student.subjects.filter(
            (subjectCodeInStudent) => {
                subjectCodeInStudent == subjectCode;
            }
        );
        if ((subjectCodeMatch.length = 0)) {
            return res.status(400).json({
                success: false,
                error: "Subject not enrolled.",
            });
        }

        //Duplication detection
        if (req.student.registeredHubs.some((studyHubId) => studyHubId == id)) {
            return res
                .status(400)
                .json({ error: "Already joined this study hub." });
        }

        //Update student hub records in the current student profile
        req.student.registeredHubs.push(id);
        req.student.save();

        //Update registered student list under the current study hub
        studyHub.studentRegistered.push(req.student._id);
        studyHub.save();

        //Join study hub successful
        res.status(200).json({
            success: true,
            studyHub: studyHub,
            userAccount: req.student,
        });
    } catch (error) {
        res.json({ error: error.message });
    }
};

//Leave a study hub, if the creator of the hub leaves, the hub will be dismissed
const leaveHub = async (req, res, next) => {
    try {
        const { id } = req.body;

        // Validate study hub
        leavingStudyHub = await studyHubModel.findById(id);
        if (!leavingStudyHub) {
            return res.status(400).json({ error: "Invalid study hub." });
        }
        if (!req.student.registeredHubs.some((hubJoined) => hubJoined == id)) {
            return res.status(400).json({
                success: false,
                error: "Study hub not joined.",
            });
        }

        // Remove the current student from the current study hub student list
        leavingStudyHub.studentRegistered = leavingStudyHub.studentRegistered.filter(
            (registeredStudentId) => registeredStudentId != req.user.id
        );
        leavingStudyHub.save();

        // Remove the study hub from the student profile
        req.student.registeredHubs = req.student.registeredHubs.filter(
            (hubJoined) => hubJoined != id
        );
        req.student.save();

        // If the student is the creator of the study hub, delete the study hub
        if (leavingStudyHub.creator == req.user.id) {
            const deletedStudyHub = await leavingStudyHub.remove();

            // Remove the deleted study hub from the subject
            const subject = await subjectModel.findOne({
                subjectCode: deletedStudyHub.subjectCode,
            });
            subject.hubs = subject.hubs.filter(
                (hubRecorded) => hubRecorded != id
            );
            subject.save();

            // Remove the deleted study hub from the hub members' profiles
            const { studentRegistered } = deletedStudyHub;
            for (memberId of studentRegistered) {
                const removingMember = await studentModel.findById(memberId);
                removingMember.registeredHubs = removingMember.registeredHubs.filter(
                    (hubJoined) => hubJoined != id
                );
                removingMember.save();
            }

            // Delete study hub successful
            res.status(200).json({
                success: true,
                message: "Deleted study hub.",
            });
        }

        // Leave study hub successful
        res.status(200).json({
            success: true,
            studyHubLeft: leavingStudyHub,
            message: "Left study hub.",
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Update the information of a study hub.
const updateHub = async (req, res, next) => {
    try {
        const { id, startDate, endDate, location, summary } = req.body;
        //const studyHub = await studyHubModel.findById(id);

        // Validate the study hub
        updatingStudyHub = await studyHubModel.findById(id);
        if (!updatingStudyHub) {
            return res.status(400).json({ error: "Invalid study hub." });
        }

        // Validate the creator [?]
        if (req.student._id != updatingStudyHub.creator) {
            return res
                .status(400)
                .json({ error: "Invalid creator. Access to update denied." });
        }

        // update the fields where the values passed in are not empty
        if (startDate) {
            updatingStudyHub.startDate = startDate;
        }
        if (endDate) {
            updatingStudyHub.endDate = endDate;
        }
        if (location) {
            updatingStudyHub.location = location;
        }
        if (summary) {
            updatingStudyHub.summary = summary;
        }
        const updatedStudyHub = await updatingStudyHub.save();

        // Update study hub successful
        return res.status(200).json({
            success: true,
            updatedStudyHub: updatedStudyHub,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createHub,
    getAll,
    getRegistered,
    joinHub,
    leaveHub,
    updateHub,
};
