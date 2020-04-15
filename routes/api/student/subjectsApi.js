express = require("express");
const router = express.Router();

const {
	addSubject,
	deleteSubject,
} = require("../../../Controllers/student/subjectsController");

// Add a new subjects to current subjects list.
router.post("/add", addSubject);

router.post("/delete", deleteSubject);

//GET all available subjects
//router.get("/allSubjects", getAllSubjects);
module.exports = router;
