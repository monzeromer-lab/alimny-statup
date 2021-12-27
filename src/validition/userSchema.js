const Joi = require("joi");

module.exports.registerSchema = Joi.object({
    firstName: Joi.string()
        .max(15)
        .required(),
    lastName: Joi.string()
        .max(15)
        .required(),
    phoneNumber: Joi.number()
        .integer()
        .required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().integer().min(3).required(),
    state: Joi.string().required()
})