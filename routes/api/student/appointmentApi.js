express = require("express");
const router = express.Router();
const verify = require("../../../Controllers/verify");
const identify = require("../../../Controllers/student/identify");

const {
	requestAppointment,
	deleteAppointment,
	updateAppointment,
	getAll,
} = require("../../../Controllers/student/appointmentController");

//Request an appointment.
router.post("/request", verify, identify, requestAppointment);

//Delete a request of appointment.
router.delete("/delete", verify, identify, deleteAppointment);

//Resubmit or update the information of an appointment.
router.patch("/update", verify, identify, updateAppointment);

//Get all requests of appointment.
router.get("/all", verify, identify, getAll);

module.exports = router;
