const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

//Validate the sign up request body
const signUpValidate = Joi.object({
    firstName: Joi.string().max(255).required(),
    lastName: Joi.string().max(255).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    userType: Joi.string().required(),
    subjects: Joi.array(),
});

//Validate the log in request body
const loginValidate = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    userType: Joi.string().required(),
});

module.exports = { signUpValidate, loginValidate, jwt };
