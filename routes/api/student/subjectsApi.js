express = require("express");
const router = express.Router();

const {
	joinSubject,
	leaveSubject,
	getAllSubjects,
	getAllStaffs,
} = require("../../../Controllers/student/subjectsController");

//Join a subject.
router.post("/join", joinSubject);

//Leave a subject.
router.post("/leave", leaveSubject);

//Get all of staff information in a subject.
router.get("/allStaff", getAllStaffs);

//GET all selected subjects
router.get("/all", getAllSubjects);

module.exports = router;
