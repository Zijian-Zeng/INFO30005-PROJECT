express = require("express");
const router = express.Router();
const subjectModel = require("../../Models/subject");

// CREATE a new post
router.post("/", async (req, res, next) => {
	try {
		const { body } = req;
		const { code, name, staff } = body;

		const subject = new subjectModel({
			code: code,
            name: name,
            staff: staff
		});

		const newSubject = await subject.save();
		res.status(201).json(newSubject);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
