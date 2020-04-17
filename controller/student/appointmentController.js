const appointmentModel = require("../../model/appointment");

//Request an appointment.
const requestAppointment = (req, res, next) => {
	const { student } = req;
	res.send(student);
	const id = student._id;
};

//Delete a request of appointment.
const deleteAppointment = (req, res, next) => {
	const { student } = req;
	res.send(student);
};

//Get all requests of appointment.
const getAll = (req, res, next) => {
	const { student } = req;
	res.send(student);
};

module.exports = { requestAppointment, deleteAppointment, getAll };
