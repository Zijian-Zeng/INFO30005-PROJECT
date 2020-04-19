const consultModel = require("../../Models/consultation");

//view all available consultations of a subject
const viewConsult = (req, res, next) => {
    const { staff } = req;
    res.send(staff);
};

//book an available consultation
const bookConsult = (req, res, next) => {
    const { staff } = req;
    res.send(staff);
};

//cancel the booking of a consultation
const cancelConsult = (req, res, next) => {
    const { staff } = req;
    res.send(staff);
};

module.exports = { viewConsult, bookConsult, cancelConsult };
