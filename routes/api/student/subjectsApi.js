express = require("express");
const router = express.Router();

const {
	joinSubject,
	leaveSubject,
	getAllSubjects,
} = require("../../../controllers/student/subjectsController");

// Add a new subjects to current subjects list.
router.post("/join", joinSubject);

router.post("/leave", leaveSubject);

//GET all selected subjects
router.get("/all", getAllSubjects);

module.exports = router;
