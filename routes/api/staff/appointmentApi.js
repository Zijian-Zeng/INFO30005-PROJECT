express = require("express");
const router = express.Router();
const verify = require("../../../Controllers/verify");
const identify = require("../../../Controllers/staff/identify");

const {
	pendAppointment,
	getAll,
} = require("../../../Controllers/staff/appointmentController");

//Request an appointment.
router.patch("/pend", verify, identify, pendAppointment);

//Get all requests of appointment.
router.get("/all", verify, identify, getAll);

module.exports = router;
