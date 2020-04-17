express = require("express");
const router = express.Router();

const {
	createSubject,
	deleteSubject,
} = require("../../../controller/staff/subjectsController");

//Create a new subjects in database (staff only)
router.post("/create", createSubject);

//Delete a subject from database.
router.delete("/delete", deleteSubject);

//

//router.get("/allSubjects", getAllSubjects);
module.exports = router;
