const consultModel = require("../../Models/consultation");

//view all available consultations of a subject
const viewConsult = async (req, res, next) => {
    const { staff } = req;
    res.send(staff);
};

//book an available consultation
const bookConsult = async (req, res, next) => {
    try {
        const { id } = req.body;
    } catch (error) {
        res.json({ message: error.message });
    }
};

//cancel the booking of a consultation
const cancelConsult = async (req, res, next) => {
    const { staff } = req;
    res.send(staff);
};

module.exports = { viewConsult, bookConsult, cancelConsult };
