express = require("express");
const router = express.Router();

const {
	requestAppointment,
	deleteAppointment,
	getAll,
} = require("../../../Controllers/student/appointmentController");

//Request an appointment.
router.post("/request", requestAppointment);

//Delete a request of appointment.
router.delete("/delete", deleteAppointment);

//Get all requests of appointment.
router.get("/all", getAll);

module.exports = router;
