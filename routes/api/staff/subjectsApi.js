express = require("express");
const router = express.Router();
const verify = require("../../../Controllers/verify");
const identify = require("../../../Controllers/staff/identify");

const {
	createSubject,
	deleteSubject,
	joinSubject,
	leaveSubject,
	getAll,
} = require("../../../Controllers/staff/subjectsController");

//Create a new subjects in database (staff only)
router.post("/create", verify, identify, createSubject);

//Delete a subject from database.
router.delete("/delete", verify, identify, deleteSubject);

//Join a subject.
router.post("/join", verify, identify, joinSubject);

//Leave a subject.
router.post("/leave", verify, identify, leaveSubject);

//Get all enrolled subjects.
router.get("/all", verify, identify, getAll);

module.exports = router;
