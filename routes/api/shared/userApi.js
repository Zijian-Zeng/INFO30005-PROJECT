express = require("express");
const router = express.Router();

const {
	signup,
	login,
	getAllSubjects,
} = require("../../../controllers/shared/usersController");

router.post("/signup", signup);

router.post("/login", login);

router.get("/allSubjects", getAllSubjects);

//router.post("/subjects", getAllSubjects);

module.exports = router;
