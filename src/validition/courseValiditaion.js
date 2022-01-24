const {
    courseInfo_Schema
} = require("./courseSchema")

module.exports.create_bodyValidition = (req, res, next) => {
    
    // get the body data
    let {
        category,
        sub_category,
        course_name,
        description,
        student_learn,
        requirements,
        price,
        level,
        salutatory_msg,
        congratulate_msg,
        coupon,
        badge
    } = req.body

    //validate the body
    let validationTest = courseInfo_Schema.validate({
        category,
        sub_category,
        course_name,
        description,
        student_learn,
        requirements,
        price,
        level,
        salutatory_msg,
        congratulate_msg,
        coupon,
        badge
    }, {
        abortEarly: false
    })

    if (validationTest.error) {
        throw new Error(validationTest.error)
    } else {
        next()
    }
}