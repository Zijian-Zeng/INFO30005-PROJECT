const subjectModel = require("../../Models/subject");
const staffModel = require("../../Models/staff");

//For students to join a new subject
const joinSubject = async (req, res, next) => {
    try {
        const { subjectCode } = req.body;
        const { subjects } = req.student;

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
        const studentChangedTo = await req.student.save();

        //Add this account under subject collection.
        subject.students.push(req.user.id);
        subject.save();

        res.status(200).json({ success: true, studentChangedTo });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Leave an enrolled subject
const leaveSubject = async (req, res, next) => {
    try {
        const { subjectCode } = req.body;
        const { subjects } = req.student;

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
        req.student.subjects = subjects.filter((each) => each != subjectCode);
        req.student.save();

        //Delete the user id under this subject.
        subject.students = subject.students.filter(
            (each) => each != req.user.id
        );
        subject.save();
        res.status(200).json({ success: true, userInfo: req.student, subject });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Get all enrolled subjects for students
const getAllSubjects = async (req, res, next) => {
    try {
        const { subjects } = req.student;
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

//View all the teaching staff
const getAllStaffs = async (req, res, next) => {
    try {
        const subject = await subjectModel.findOne({
            subjectCode: req.body.subjectCode,
        });
        if (!subject) {
            res.status(400).json({ error: "Invalid subject code." });
        }

        const { staffs } = subject;
        const staffsInfo = [];
        for (staffId of staffs) {
            const staff = await staffModel.findById(staffId);
            if (staff) {
                staffsInfo.push(staff);
            }
        }

        res.status(200).json({ staffsInfo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { joinSubject, leaveSubject, getAllSubjects, getAllStaffs };
