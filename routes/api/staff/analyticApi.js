express = require("express");
const router = express.Router();
const verify = require("../../../Controllers/verify");
const identify = require("../../../Controllers/staff/identify");

const {
	getConsultData,
} = require("../../../Controllers/staff/analyticController");

//Analyse consultation sign up data, visualizations will be implemented by front-end.
router.get("/consult", verify, identify, getConsultData);

module.exports = router;
