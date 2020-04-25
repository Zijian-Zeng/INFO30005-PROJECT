express = require("express");
const router = express.Router();

const {
    getConsultData,
} = require("../../../Controllers/staff/analyticController");

//Request an appointment.
router.get("/consult", getConsultData);

module.exports = router;
