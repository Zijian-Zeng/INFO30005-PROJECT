const appointmentModel = require("../../Models/appointment");
const studentModel = require("../../Models/student");

//Review a request of appointments and change its status.
const pendAppointment = async (req, res, next) => {
	try {
		const { id, status, comment } = req.body;

		//Validate the appointment id.
		appointment = await appointmentModel.findById(id);
		if (!appointment) {
			return res.status(400).json({ error: "Invalid appointment ID." });
		}

		//Validate the authorization of the user to pend this appointment.
		if (req.user.id != appointment.staff) {
			return res.status(400).json({
				error: "You are not authorized to pend this appointment.",
			});
		}

		//Validate the pending status.
		if (!(status == "DECLINED" || status == "APPROVED")) {
			return res.status(400).json({ error: "Invalid pending status." });
		}

		//Save this pending.
		appointment.comment = comment;
		appointment.status = status;
		appointment.save();

		res.status(200).json({
			success: true,
			appointment: appointment,
			userAccount: req.staff,
		});
	} catch (error) {
		res.json({ message: error.message });
	}
};

//Get all of the requests of appointments from students.
const getAll = async (req, res, next) => {
	try {
		if (req.staff.appointments.length == 0) {
			return res.status(201).json({
				success: true,
				message: "no appointment request in your account.",
			});
		}
		appointments = [];
		invalidIDs = [];
		for (appointmentId of req.staff.appointments) {
			const appointment = await appointmentModel.findById(appointmentId);
			if (appointment) {
				const studentInfo = await studentModel.findById(
					appointment.student
				);

				const myAppoint = {
					subjectCode: appointment.subjectCode,
					status: appointment.status,
					_id: appointment._id,
					startDate: appointment.startDate,
					endDate: appointment.endDate,
					location: appointment.location,
					comment: appointment.comment,
					student: {
						firstName: studentInfo.firstName,
						lastName: studentInfo.lastName,
						mail: studentInfo.email,
					},
				};
				appointments.push(myAppoint);
			} else {
				//Determine if the appointment has been deleted.
				invalidIDs.push(appointmentId);
			}
		}

		//Delete all those invalid appointment id.
		for (invalidID of invalidIDs) {
			req.staff.appointments = req.staff.appointments.filter(
				(each) => each != invalidID
			);
		}
		req.staff.save();

		res.json({ success: true, appointments: appointments });
	} catch (error) {
		res.json({ error: error.message });
	}
};

module.exports = { pendAppointment, getAll };
