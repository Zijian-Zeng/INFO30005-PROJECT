express = require("express");
const router = express.Router();

const {
	pendAppointment,
	getAll,
} = require("../../../Controllers/staff/appointmentController");

//Request an appointment.
router.patch("/pend", pendAppointment);

//Get all requests of appointment.
router.get("/all", getAll);

module.exports = router;
