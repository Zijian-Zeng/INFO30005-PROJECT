express = require("express");
const router = express.Router();

const {
	createHub,
	getAll,
	joinHub,
	leaveHub,
	updateHub,
} = require("../../../Controllers/student/studyHubController");

//Create a study hub.
router.post("/create", createHub);

//Get all of the study hubs of a subject.
router.get("/all", getAll);

//Join a study hub.
router.post("/join", joinHub);

//Leave a study hub.
router.post("/leave", leaveHub);

//Update the information of a study hub.
router.patch("/update", updateHub);

module.exports = router;
