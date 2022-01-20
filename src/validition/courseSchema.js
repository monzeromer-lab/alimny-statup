const Joi = require("joi")

let student_learn_valid = Joi.object().keys({
    id: Joi.number().required(),
    body: Joi.string().required()
})
let requirements_valid = Joi.object().keys({
    id: Joi.number().required(),
    body: Joi.string().required()
})
let cupon_valid = Joi.object({
    code: Joi.string().max(10).required(),
    discount_per: Joi.number().max(3).required(),
    exp: Joi.number().max(3).required()
})
module.exports.courseInfo_Schema = Joi.object({
    category: Joi.number().required(),
    sub_category: Joi.number().required(),
    course_name: Joi.string().required(),
    student_learn: Joi.array().items(student_learn_valid).required(),
    requirements: Joi.array().items(requirements_valid).required(),
    price: Joi.number().positive().required(),
    level: Joi.string().valid("bigenner", "master", "interminate").required(),
    salutatory_msg: Joi.string().max(270).required(),
    congratulate_msg: Joi.string().max(270).required(),
    cupon: Joi.valid(cupon_valid)
})