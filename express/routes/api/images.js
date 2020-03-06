express = require("express");
const router = express.Router();
const path = require("path");

//  GET all members
router.get("/loginBackground", async (req, res, next) => {
	res.sendFile(path.join(__dirname, "/languages.png"));
});

module.exports = router;
