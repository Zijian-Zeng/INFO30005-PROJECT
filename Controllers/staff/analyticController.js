express = require("express");

module.exports = (req, res, next) => {
	res.status(200).json({
		busy: "yes",
	});
};
