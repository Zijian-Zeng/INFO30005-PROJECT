express = require("express");
const router = express.Router();

//Grab some useful data in this account, Charts are displayed by front-end.
router.get("/", require("../../../Controllers/student/analyticController"));

module.exports = router;
