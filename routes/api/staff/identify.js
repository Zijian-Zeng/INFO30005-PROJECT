const staffModel = require("../../../Models/staff");

module.exports = async (req, res, next) => {
	try {
		//Identify the staff by ID.
		req.staff = await staffModel.findById(req.user.id);
		if (!req.staff) {
			return res
				.status(401)
				.json({ error: "Invalid token ID, Access Denied." });
		}
		next();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
