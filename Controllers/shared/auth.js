const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

const signUpValidate = Joi.object({
    firstName: Joi.string().max(255).required(),
    lastName: Joi.string().max(255).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    userType: Joi.string().required(),
    subjects: Joi.array(),
});

const loginValidate = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    userType: Joi.string().required(),
});

module.exports = { signUpValidate, loginValidate, jwt };
