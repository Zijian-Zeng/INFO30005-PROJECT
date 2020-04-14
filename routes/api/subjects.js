express = require("express");
const router = express.Router();
const subjectModel = require("../../Models/subject");

const subjectController = require("../../Controllers/subjects-controller");
const {createSubject, getAllSubjects} = subjectController;


// CREATE a new subjects
router.post("/", createSubject);

//GET all available subjects
router.get("/allsubjects", getAllSubjects);

//GET all questions


//GET questions by tag


//GET available consultations


//GET all Staffs


//GET all study hub


//GET students






module.exports = router;
