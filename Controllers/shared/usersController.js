express = require("express");
const studentModel = require("../../Models/student");
const staffModel = require("../../Models/staff");
const subjectModel = require("../../Models/subject");

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
            return res.status(400).json({ error: error.details[0].message });
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
                .status(400)
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

        //Assign this user to the selected subject database.
        const invalidSubject = false;
        for (subjectCode of subjects) {
            subject = await subjectModel.findOne({
                subjectCode: subjectCode,
            });
            if (!subject) {
                invalidSubject = true;
                continue;
            }

            if (userType == "student") {
                subject.students.push(newUser._id);
            } else {
                subject.staffs.push(newUser._id);
            }
            subject.save();
        }

        //If adding subjects that have not been created yet, response warning.
        if (invalidSubject) {
            return res.status(200).json({
                success: true,
                details: savedUser,
                warning:
                    "you are selecting unavailable subjects, please confirm your subject code and try it later.",
            });
        }

        //Create a token for the account.
        const token = jwt.sign({ id: savedUser._id }, "info30005");

        //Sign up successful.
        res.status(201).json({
            success: true,
            details: savedUser,
            token: token,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res, next) => {
    try {
        const { body } = req;
        const { email, password, userType } = body;

        const { error } = loginValidate.validate(req.body);
        loginValidate.v;
        if (error) {
            return res.status(401).json({ error: error.details[0].message });
        }

        //Recognize and validate the user type.
        let userModel;
        if (userType == "student") {
            userModel = studentModel;
        } else if (userType == "staff") {
            userModel = staffModel;
        } else {
            return res.status(401).json({ error: "Error! invalid user type" });
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

        //Login successful.
        return res
            .status(200)
            .header("meetute-token", token)
            .json({ success: true, token: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Get all the available subjects in database.
const getAllSubjects = async (req, res, next) => {
    try {
        const subjects = await subjectModel.find();

        const subjectsList = [];
        subjects.map(({ subjectCode }) => {
            subjectsList.push(subjectCode);
        });
        res.status(200).json({
            success: true,
            subjectList: subjectsList,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getInfo = async (req, res, next) => {
    try {
        const staff = await staffModel.findById(req.user.id);
        const student = await studentModel.findById(req.user.id);

        if (staff) {
            return res
                .status(200)
                .json({ success: true, userInfo: staff, type: "staff" });
        }
        if (student) {
            return res.status(200).json({
                success: true,
                userInfo: student,
                type: "student",
            });
        }
        return res
            .status(400)
            .json({ success: false, error: "Invalid Token ID." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { login, signup, getAllSubjects, getInfo };
