const appointmentModel = require("../../Models/appointment");

//Pending a request of appointments.
const pendAppointment = (req, res, next) => {
	const { staff } = req;
	res.send(staff);
};

//Get all of the requests of appointments from students.
const getAll = (req, res, next) => {
	const { staff } = req;
	res.send(staff);
};

module.exports = { pendAppointment, getAll };
