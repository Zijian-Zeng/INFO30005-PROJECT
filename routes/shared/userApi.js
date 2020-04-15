express = require("express");
const router = express.Router();
const studentModel = require("../../Models/student");
const staffModel = require("../../Models/staff");

const {
    signup,
    login,
    getAllSubjects,
} = require("../../Controllers/shared/usersController");

router.post("/signup", signup);

router.post("/login", login);

//router.post("/subjects", getAllSubjects);

module.exports = router;
