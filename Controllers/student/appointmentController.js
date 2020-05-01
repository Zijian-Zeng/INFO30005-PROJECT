const appointmentModel = require("../../Models/appointment");
const staffModel = require("../../Models/staff");

//Request an appointment.
const requestAppointment = async (req, res, next) => {
    try {
        const {
            subjectCode,
            startDate,
            endDate,
            staffId,
            location,
            comment,
        } = req.body;

        //Validate the staff id.
        const staff = await staffModel.findById(staffId);
        if (!staff) {
            return res.status(400).json({ error: "invalid staff id." });
        }

        //time clash detection in appoinment data base.
        for (appointmentID of req.student.appointments) {
            const appointment = await appointmentModel.findById(appointmentID);
            if (appointment) {
                if (
                    !(
                        new Date(startDate) >= appointment.endDate ||
                        new Date(endDate) <= appointment.startDate
                    )
                ) {
                    return res.status(400).json({
                        error:
                            "The time for your new appointment has a clash with your your current schedule.",
                    });
                }
            }
        }

        //Save the appointment
        const appointment = new appointmentModel({
            subjectCode: subjectCode,
            startDate: startDate,
            endDate: endDate,
            location: location,
            student: req.user.id,
            staff: staffId,
            comment: comment,
        });
        const newAppoint = await appointment.save();

        //Save the Appointment under this account.
        req.student.appointments.push(newAppoint._id);
        req.student.save();

        //Save the Appointment under the requested staff account.
        staff.appointments.push(appointment._id);
        staff.save();

        //Appointment successfully requested.
        res.status(201).json({
            success: true,
            newAppoint,
            student: req.student,
            staff,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Delete a request of appointment.
const deleteAppointment = async (req, res, next) => {
    try {
        //Validate the appointment id about to delete.
        const deletingAppointment = await appointmentModel.findById(
            req.body.id
        );
        if (!deletingAppointment) {
            return res.status(400).json({ error: "invalid appointment id." });
        }

        //Validate the authorization of the user to delete this appointment.
        if (req.user.id != deletingAppointment.student) {
            return res.status(400).json({
                error: "You are not authorized to pend this appointment.",
            });
        }

        //Delete the appointment.
        deletedAppointment = await deletingAppointment.remove();

        //Delete the appointment id under student.
        req.student.appointments = req.student.appointments.filter(
            (each) => each != req.body.id
        );
        req.student.save();

        //Delete the appointment id under staff.
        const staff = await staffModel.findById(deletedAppointment.staff);
        staff.appointments = staff.appointments.filter(
            (each) => each != req.body.id
        );
        staff.save();

        res.status(200).json({ success: true, deletedAppointment });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Update existing appointment details
const updateAppointment = async (req, res, next) => {
    try {
        const { id, comment, startDate, endDate, location } = req.body;

        //Validate the appointment id.
        appointment = await appointmentModel.findById(id);
        if (!appointment) {
            return res.status(400).json({ error: "Invalid appointment ID." });
        }

        //Validate the authorization of the user to pend this appointment.
        if (req.user.id != appointment.student) {
            return res.status(400).json({
                error: "You are not authorized to pend this appointment.",
            });
        }

        if (startDate) appointment.startDate = startDate;
        if (endDate) appointment.endDate = endDate;
        if (comment) appointment.comment = comment;
        if (location) appointment.location = location;
        appointment.status = "PENDING";
        appointment.save();

        res.status(200).json({
            success: true,
            appointment: appointment,
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

//Get all requests of appointment in this account.
const getAll = async (req, res, next) => {
    try {
        if (req.student.appointments.length == 0) {
            return res.status(201).json({
                success: true,
                message: "no appointment request in your account.",
            });
        }

        appointments = [];
        invalidIDs = [];
        for (appointmentId of req.student.appointments) {
            appointment = await appointmentModel.findById(appointmentId);
            if (appointment) {
                appointments.push(appointment);
            } else {
                //Determine if the appointment has been deleted.
                invalidIDs.push(appointmentId);
            }
        }
        //Delete all those invalid appointment id.
        for (invalidID of invalidIDs) {
            req.student.appointments = req.student.appointments.filter(
                (each) => each != invalidID
            );
        }
        req.student.save();

        res.json({ success: true, appointments: appointments });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    requestAppointment,
    deleteAppointment,
    getAll,
    updateAppointment,
};
