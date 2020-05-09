express = require("express");
const router = express.Router();

const {
	signup,
	login,
	getAllSubjects,
	getInfo,
} = require("../../../Controllers/shared/usersController");

//Sign up
router.post("/signup", signup);

//Log in
router.post("/login", login);

//Get all subjects in the system.
router.get("/allSubjects", getAllSubjects);

//Get user information in the system.
router.get("/info", require("../../../Controllers/verify"), getInfo);

module.exports = router;
