const Joi = require("joi")

let student_learn_valid = Joi.object().keys({
    body: Joi.string().max(101).required()
})
let requirements_valid = Joi.object().keys({
    body: Joi.string().max(101).required()
})

// TODO: "ValidationError: \"badge\" is required. \"coupon\" must be [[object Object]]"
module.exports.courseInfo_Schema = Joi.object({
    category: Joi.number().required(),
    sub_category: Joi.number().required(),
    course_name: Joi.string().max(200).required(),
    description: Joi.string().max(500).required(),
    student_learn: Joi.array().items(student_learn_valid).required(),
    requirements: Joi.array().items(requirements_valid).required(),
    price: Joi.number().positive().required(),
    level: Joi.string().valid("bigenner", "master", "interminate").required(),
    salutatory_msg: Joi.string().max(270).required(),
    congratulate_msg: Joi.string().max(270).required(),
    badge: Joi.string().max(45).required(),
    coupon: Joi.object({
        code: Joi.string().max(20).optional(),
        discount_per: Joi.number().max(3).optional(),
        exp: Joi.number().max(3).optional()
    })
})

module.exports.courseReview = Joi.object({
    rate: Joi.number()
        .min(1)
        .max(5)
        .required(),
    feedback: Joi.string()
        .min(1)
        .max(101)
        .required()
})