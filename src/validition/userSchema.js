const Joi = require("joi");

module.exports.registerSchema = Joi.object({
    name: Joi.string()
        .max(15)
        .required(),

    phoneNumber: Joi.number()
        .integer()
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .alphanum()
        .required(),

    age: Joi.number()
        .integer()
        .min(3)
        .required(),

    state: Joi.string()
        .required()
})

module.exports.loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .alphanum()
        .min(8)
        .max(15)
        .required()
})

module.exports.updateSchema = Joi.object({
    name: Joi.string()
        .max(15)
        .optional(),

    phoneNumber: Joi.number()
        .integer()
        .optional(),

    age: Joi.number()
        .integer()
        .min(3)
        .optional(),
    state: Joi.string()
        .optional(),

    bio: Joi.string()
        .max(101)
        .optional()
})

module.exports.resetSchema = Joi.object({
    new_pass: Joi.string()
    .alphanum()
    .min(8)
    .max(15)
    .required(),

    confirm_pass: Joi.string()
    .valid(Joi.ref("new_pass"))
    .required()
})