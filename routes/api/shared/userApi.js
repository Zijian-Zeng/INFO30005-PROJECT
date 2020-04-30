express = require("express");
const router = express.Router();

const {
	signup,
	login,
	getAllSubjects,
} = require("../../../Controllers/shared/usersController");

router.post("/signup", signup);

router.post("/login", login);

router.get("/allSubjects", getAllSubjects);

module.exports = router;
