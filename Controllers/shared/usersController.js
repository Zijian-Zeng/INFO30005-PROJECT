express = require("express");
const studentModel = require("../../Models/student");
const staffModel = require("../../Models/staff");

const { signUpValidate, loginValidate, jwt } = require("./auth");

const signup = async (req, res, next) => {
	try {
		const { body } = req;
		const {
			firstName,
			lastName,
			email,
			password,
			subjects,
			userType,
		} = body;

		//Validate the sign up request.
		const { error } = await signUpValidate.validateAsync(req.body);
		if (error) {
			return res.send(error.details[0].message);
		}

		//Recognize and validate the user type.
		let userModel;
		if (userType == "student") {
			userModel = studentModel;
		} else if (userType == "staff") {
			userModel = staffModel;
		} else {
			return res.status(400).json({ error: "Error! invalid user type" });
		}

		//Duplicate detection
		const occupiedEmail = await userModel.findOne({ email: email });
		if (occupiedEmail) {
			return res
				.status(401)
				.json({ error: "Error! email already exist" });
		}

		//Save the new user.
		const newUser = new userModel({
			firstName: firstName,
			lastName: lastName,
			email: email,
			subjects: subjects,
		});

		//Encode user's password.
		newUser.password = newUser.hash(password);
		const savedUser = await newUser.save();

		//Sign up successful.
		res.status(200).json({ success: true, message: savedUser });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const login = async (req, res, next) => {
	try {
		const { body } = req;
		const { email, password, userType } = body;

		const { error } = loginValidate.validate(req.body);
		if (error) {
			return res.send(error.details[0].message);
		}

		//Recognize and validate the user type.
		let userModel;
		if (userType == "student") {
			userModel = studentModel;
		} else if (userType == "staff") {
			userModel = staffModel;
		} else {
			return res
				.status(401)
				.json({ message: "Error! invalid user type" });
		}

		// Verify the email.
		userExist = await userModel.findOne({ email: email });
		if (!userExist) {
			return res.status(401).json({ error: "Error! email invalid" });
		}

		//Verify the password.
		if (!userExist.validatePassword(password, userExist.password)) {
			res.status(401).json({ error: "Incorrect password" });
		}

		//Create and assign a token.
		const token = jwt.sign({ id: userExist._id }, "info30005");
		res.header("meetute-token", token).send(token);

		//Login successful.
		return res.status(200).json({ success: true });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = { login, signup };
