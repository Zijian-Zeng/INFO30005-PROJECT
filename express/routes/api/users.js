express = require("express");
const router = express.Router();
const userModel = require("../../Models/user");

router.post("/signup", async (req, res, next) => {
	try {
		const { body } = req;
		const { firstName, lastName, email, password } = body;

		// Verify the request.
		if (!firstName) {
			return res.json({ message: "Error! FirstName cannot be blank" });
		}
		if (!lastName) {
			return res.json({ message: "Error! lastName cannot be blank" });
		}
		if (!email) {
			return res.json({ message: "Error! email cannot be blank" });
		}
		if (!password) {
			return res.json({ message: "Error! password cannot be blank" });
		}

		// Verify the email does not exist.
		occupiedEmail = await userModel.find({ email: email });
		if (occupiedEmail.length > 0) {
			return res.json({ message: "Error! email already exist" });
		} else {
			//Save the new user
			const newUser = new userModel({
				firstName: firstName,
				lastName: lastName,
				email: email
			});
			newUser.password = newUser.hash(password);

			const savedUser = await newUser.save();
			res.status(201).json({ success: true, message: savedUser });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.post("/login", async (req, res, next) => {
	try {
		const { body } = req;
		const { email, password } = body;

		// Verify the request.
		if (!email) {
			return res.json({ message: "Error! email cannot be blank" });
		}
		if (!password) {
			return res.json({ message: "Error! password cannot be blank" });
		}

		// Verify the email.
		users = await userModel.find({ email: email });
		if (users.length != 1) {
			return res.json({ message: "Error! email invalid" });
		} else {
			//

			if (users[0].validatePassword(password, users[0].password)) {
				return res.json({ success: true });
			}
			res.json({ sucess: false, message: "Incorrect password" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
