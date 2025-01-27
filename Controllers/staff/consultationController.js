const consultModel = require("../../Models/consultation");
const subjectModel = require("../../Models/subject");

//View the consultations created by this account.
const viewCreatedConsult = async (req, res, next) => {
    try {
        const consultations = [];
        const invalidIds = [];
        for (each of req.staff.consultations) {
            const consultation = await consultModel.findById(each);

            if (consultation) {
                consultations.push(consultation);
            } else {
                //Determine if the consultation has been deleted.
                invalidIds.push(each);
            }
        }
        //Delete all those invalid consultation id.
        for (invalidId of invalidIds) {
            req.staff.consultations = req.staff.consultations.filter(
                (each) => each !== invalidId
            );
        }
        req.staff.save();

        if (consultations.length > 0) {
            return res.status(200).json({
                success: true,
                consultations: consultations,
                staff: req.staff,
            });
        }
        res.status(200).json({
            success: true,
            consultations: consultations,
            message: "There is no consultation created by your account.",
            staff: req.staff,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//View all the consultations of a subject.
const viewAllConsult = async (req, res, next) => {
    try {
        //Validate subject code in request.
        const { subjectCode } = req.body;
        subject = await subjectModel.findOne({ subjectCode: subjectCode });
        if (!subject) {
            return res.status(400).json({ error: "Invalid subject code." });
        }

        //Extract all the consultation information under this subject.
        const consultations = [];
        const invalidIds = [];
        for (consultationId of subject.consultations) {
            const consultation = await consultModel.findById(consultationId);
            if (consultation) {
                consultations.push(consultation);
            } else {
                //Determine if the consultation has been deleted.
                invalidIds.push(consultationId);
            }
        }
        //Delete all those invalid consultation id.
        for (invalidId of invalidIds) {
            subject.consultations = subject.consultations.filter(
                (each) => each !== invalidId
            );
        }
        subject.save();

        //Response the consultations in this subject.
        if (consultations.length > 0) {
            return res.status(200).json({
                success: true,
                consultations: consultations,
            });
        }
        res.status(200).json({
            success: true,
            consultations: consultations,
            message: "There is no consultation under this subject.",
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Create a new weekly consultation for a subject.
const createConsult = async (req, res, next) => {
    try {
        const {
            subjectCode,
            startDate,
            endDate,
            location,
            slotsAvailable,
        } = req.body;

        let subjectInvalid = true;
        req.staff.subjects.map((subjectCodeInStaff) => {
            if (subjectCodeInStaff == subjectCode) {
                subjectInvalid = false;
            }
        });
        if (subjectInvalid) {
            return res.status(200).json({
                success: false,
                error: "Subject not found in your managed account.",
            });
        }
        //time clash detection in consultation data base.
        for (consultationID of req.staff.consultations) {
            const consultation = await consultModel.findById(consultationID);
            if (consultation) {
                if (
                    !(
                        new Date(startDate) >= consultation.endDate ||
                        new Date(endDate) <= consultation.startDate
                    )
                ) {
                    return res.status(400).json({
                        error:
                            "The time for your new consultation has a clash with your current schedule.",
                    });
                }
            }
        }

        //Save the new consultation.
        const consultation = new consultModel({
            subjectCode: subjectCode,
            startDate: startDate,
            endDate: endDate,
            location: location,
            creator: req.staff._id,
            slotsAvailable: slotsAvailable,
        });
        const newConsult = await consultation.save();

        //Save the consultation under the current subject
        const subject = await subjectModel.findOne({
            subjectCode: subjectCode,
        });
        subject.consultations.push(newConsult._id);
        subject.save();

        //Save the consultation under the current staff
        req.staff.consultations.push(newConsult._id);
        req.staff.save();

        //Consultation successfully created.
        res.status(201).json({ success: true, newConsult });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//delete an existing consultation time for a subject
const deleteConsult = async (req, res, next) => {
    try {
        const { consultations } = req.staff;
        const { id } = req.body;

        if (consultations.filter((each) => each == id).length < 1) {
            return res.status(400).json({ error: "Invalid consultation id" });
        }

        // find the consultation to be deleted
        const deletingConsult = await consultModel.findById(id);

        if (!deletingConsult) {
            return res.status(400).json({
                error: "deleting a consultation that does not exist.",
            });
        }

        const deletedConsultation = await deletingConsult.remove();

        // remove the consultation from the staff
        req.staff.consultations = req.staff.consultations.filter(
            (each) => each != id
        );
        req.staff.save();

        // remove the consultation from the subject
        const subject = await subjectModel.findOne({
            subjectCode: deletedConsultation.subjectCode,
        });
        subject.consultations = subject.consultations.filter(
            (each) => each != id
        );
        subject.save();

        return res
            .status(200)
            .json({ success: true, deleted: deletedConsultation });
    } catch (error) {
        res.json({ message: error.message });
    }
};

//update the information of an existing consultation session
const updateConsult = async (req, res, next) => {
    try {
        const { startDate, endDate, location, slotsAvailable, id } = req.body;
        const { consultations } = req.staff;

        if (consultations.filter((each) => each == id).length < 1) {
            return res.status(400).json({ error: "Invalid consultation id" });
        }

        const updatingConsult = await consultModel.findById(id);

        if (!updatingConsult) {
            return res.status(400).json({
                error: "Updating a consultation that does not exist.",
            });
        }
        // update the fields where the values passed in are not empty
        if (startDate) {
            updatingConsult.startDate = startDate;
        }
        if (endDate) {
            updatingConsult.endDate = endDate;
        }
        if (location) {
            updatingConsult.location = location;
        }
        if (slotsAvailable) {
            updatingConsult.slotsAvailable = slotsAvailable;
        }

        const updatedConsult = await updatingConsult.save();

        return res.status(200).json({ success: true, updated: updatedConsult });
    } catch (error) {
        res.json({ message: error.message });
    }
};

module.exports = {
    createConsult,
    deleteConsult,
    updateConsult,
    viewCreatedConsult,
    viewAllConsult,
};
