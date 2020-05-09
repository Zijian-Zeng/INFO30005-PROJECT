express = require("express");
const router = express.Router();
const verify = require("../../../Controllers/verify");
const identify = require("../../../Controllers/staff/identify");

const {
	createConsult,
	deleteConsult,
	updateConsult,
	viewCreatedConsult,
	viewAllConsult,
} = require("../../../Controllers/staff/consultationController");

//View the consultations created by this account.
router.get("/viewCreated", verify, identify, viewCreatedConsult);

//View all the consultations of a subject.
router.get("/viewAll", verify, identify, viewAllConsult);

//Create a consultation
router.post("/create", verify, identify, createConsult);

//Delete an existing consultation
router.delete("/delete", verify, identify, deleteConsult);

//Update a consultation
router.patch("/patch", verify, identify, updateConsult);

module.exports = router;
