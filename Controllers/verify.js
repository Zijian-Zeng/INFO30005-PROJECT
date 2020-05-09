const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	//Verify the meetute-token header in the request.
	const token = req.header("meetute-token");
	console.log(req.header("Content-Type"));

	if (!token) {
		console.log("Missing token header, Access Denied.");
		return res
			.status(401)
			.json({ error: "Missing token header, Access Denied." });
	}

	try {
		const verified = jwt.verify(token, "info30005");
		req.user = verified;
		next();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
