express = require("express");
const router = express.Router();

const {
	createSubject,
	getAllSubjects,
} = require("../../../Controllers/shared/subjectsController");

// CREATE a new subjects
router.post("/", createSubject);

//GET all available subjects
router.get("/allSubjects", getAllSubjects);

//GET all Staffs

//GET students

module.exports = router;
