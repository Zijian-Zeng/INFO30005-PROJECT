const studentModel = require("../../../Models/student");

module.exports = async (req, res, next) => {
	try {
		//Identify the student by ID.
		req.student = await studentModel.findById(req.user.id);
		if (!req.student) {
			return res
				.status(401)
				.json({ error: "Invalid token ID, Access Denied." });
		}
		next();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
