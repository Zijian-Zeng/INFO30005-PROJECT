express = require("express");
const router = express.Router();

const {
	requestAppointment,
	deleteAppointment,
	updateAppointment,
	getAll,
} = require("../../../Controllers/student/appointmentController");

//Request an appointment.
router.post("/request", requestAppointment);

//Delete a request of appointment.
router.delete("/delete", deleteAppointment);

//Resubmit or update the information of an appointment.
router.patch("/update", updateAppointment);

//Get all requests of appointment.
router.get("/all", getAll);

module.exports = router;
