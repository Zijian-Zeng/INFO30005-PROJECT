express = require("express");
const router = express.Router();
const verify = require("../../../Controllers/verify");
const identify = require("../../../Controllers/student/identify");

const {
	viewAllConsult,
	bookConsult,
	cancelConsult,
	viewRegistConsult,
} = require("../../../Controllers/student/consultationController");

//View all consultations by subject
router.get("/viewAll", verify, identify, viewAllConsult);

//View all registered consultations of current account
router.get("/viewRegistered", verify, identify, viewRegistConsult);

//Book a consultation
router.post("/book", verify, identify, bookConsult);

//Cancel a consultation booking
router.post("/cancel", verify, identify, cancelConsult);

module.exports = router;
