express = require("express");
const router = express.Router();
const verify = require("../../../Controllers/verify");
const identify = require("../../../Controllers/student/identify");

const {
	joinSubject,
	leaveSubject,
	getAllSubjects,
	getAllStaffs,
} = require("../../../Controllers/student/subjectsController");

//Join a subject.
router.post("/join", verify, identify, joinSubject);

//Leave a subject.
router.post("/leave", verify, identify, leaveSubject);

//Get all of staff information in a subject.
router.post("/allStaff", verify, identify, getAllStaffs);

//GET all selected subjects
router.get("/all", verify, identify, getAllSubjects);

module.exports = router;
