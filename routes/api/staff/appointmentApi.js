express = require("express");
const router = express.Router();

const {
	pendAppointment,
	getAll,
} = require("../../../controller/staff/appointmentController");

//Request an appointment.
router.post("/pend", pendAppointment);

//Get all requests of appointment.
router.get("/all", getAll);

module.exports = router;
