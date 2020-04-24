express = require("express");
const router = express.Router();

const {
    createSubject,
    deleteSubject,
    joinSubject,
    leaveSubject,
    getAll,
} = require("../../../Controllers/staff/subjectsController");

//Create a new subjects in database (staff only)
router.post("/create", createSubject);

//Delete a subject from database.
router.delete("/delete", deleteSubject);

//Join a subject.
router.post("/join", joinSubject);

//Leave a subject.
router.post("/leave", leaveSubject);

//Get all enrolled subjects.
router.get("/all", getAll);

module.exports = router;
