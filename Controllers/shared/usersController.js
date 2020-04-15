express = require("express");
const studentModel = require("../../Models/student");
const staffModel = require("../../Models/staff");
const Joi = require("@hapi/joi");

const signUpValidtate = Joi.object({
    firstName: Joi.string().max(255).required(),
    lasttName: Joi.string().max(255).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    userType: Joi.string().required(),
});

const loginValidate = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    userType: Joi.string().required(),
});

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

        const { error } = signUpValidtate.validate(req.body);
        if (error) {
            return res.send(error.details[0].message);
        }

        let userModel;
        if (userType == "student") {
            userModel = studentModel;
        } else if (userType == "staff") {
            userModel = staffModel;
        } else {
            return res.status(400).json({ error: "Error! invalid user type" });
        }

        // Verify the email does not exist.
        const occupiedEmail = await userModel.find({ email: email });
        if (occupiedEmail.length > 0) {
            return res
                .status(401)
                .json({ message: "Error! email already exist" });
        } else {
            //Save the new user
            const newUser = new userModel({
                firstName: firstName,
                lastName: lastName,
                email: email,
                subjects: subjects,
            });
            newUser.password = newUser.hash(password);
            const savedUser = await newUser.save();
            res.status(200).json({ success: true, message: savedUser });
        }
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
        users = await userModel.find({ email: email });
        if (users.length != 1) {
            return res.json({ message: "Error! email invalid" });
        } else {
            if (users[0].validatePassword(password, users[0].password)) {
                return res.status(401).json({ success: true });
            }
            res.status(401).json({
                sucess: false,
                message: "Incorrect password",
            });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { login, signup };
