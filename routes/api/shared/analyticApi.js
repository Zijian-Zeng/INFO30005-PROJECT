express = require("express");
const router = express.Router();

//Grab some useful data from database, Charts are displayed by front-end.
router.get("/", require("../../../Controllers/shared/analyticController"));

module.exports = router;
