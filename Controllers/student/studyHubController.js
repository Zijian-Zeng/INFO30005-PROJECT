const appointmentModel = require("../../models/studyHub");

//Create a study hub.
const createHub = (req, res, next) => {
	const { student } = req;
	res.send(student);
};

//Get all of the study hubs of a subject.
const getAll = (req, res, next) => {
	const { student } = req;
	res.send(student);
};

//Join a study hub.
const joinHub = (req, res, next) => {
	const { student } = req;
	res.send(student);
};

//Leave a study hub.
const leaveHub = (req, res, next) => {
	const { student } = req;
	res.send(student);
};

//Update the information of a study hub.
const updateHub = (req, res, next) => {
	const { student } = req;
	res.send(student);
};

module.exports = { createHub, getAll, joinHub, leaveHub, updateHub };
