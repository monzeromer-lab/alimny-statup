const {
    createCourse,
    createCoupon,
    studentWill_learn,
    course_req
} = require("../service/courseService.db")

module.exports.newCourse_controller = async (req, res, next) => {
    let {
        coupon,
        student_learn,
        requirements
    } = req.body

    let {
        id
    } = req.user

    await createCourse(req.body, id).then( async (success) => {
        if (coupon.code)
            await createCoupon({
                course_id: success.insertId,
                code: coupon.code,
                discount_per: coupon.discount_per,
                exp: coupon.exp
            })

        await studentWill_learn(student_learn, success.insertId)
        await course_req(requirements, success.insertId)

        res.status(200).json({
            error: {
                state: false
            },
            message: "success",
            data: []
        })
    })

}