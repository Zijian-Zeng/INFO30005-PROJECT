express = require("express");
const router = express.Router();
const verify = require("../../../Controllers/verify");
const identify = require("../../../Controllers/student/identify");

const {
    createHub,
    getAll,
    joinHub,
    leaveHub,
    updateHub,
    getRegistered,
} = require("../../../Controllers/student/studyHubController");

//Create a study hub.
router.post("/create", verify, identify, createHub);

//Get all of the study hubs of a subject.
router.post("/all", verify, identify, getAll);

//Get all of the study hubs of a subject.
router.get("/registered", verify, identify, getRegistered);

//Join a study hub.
router.post("/join", verify, identify, joinHub);

//Leave a study hub.
router.post("/leave", verify, identify, leaveHub);

//Update the information of a study hub.
router.patch("/update", verify, identify, updateHub);

module.exports = router;
