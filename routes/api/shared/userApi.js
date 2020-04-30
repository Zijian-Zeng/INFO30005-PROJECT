express = require("express");
const router = express.Router();

const {
    signup,
    login,
    getAllSubjects,
} = require("../../../Controllers/shared/usersController");

//Sign up
router.post("/signup", signup);

//Log in
router.post("/login", login);

//Get all subjects in the system
router.get("/allSubjects", getAllSubjects);

module.exports = router;
