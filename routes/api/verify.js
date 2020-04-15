const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.header("meetute-token");
	if (!token) {
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
