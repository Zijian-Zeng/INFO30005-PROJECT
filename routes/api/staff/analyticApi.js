express = require("express");
const router = express.Router();

const {
	getConsultData,
} = require("../../../Controllers/staff/analyticController");

//Analyse consultation sign up data, visualizations will be implemented by front-end.
router.get("/consult", getConsultData);

module.exports = router;
