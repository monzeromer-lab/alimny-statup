const {
    resetSchema
} = require("../validition/userSchema")

module.exports.reset_bodyValidition = (req, res, next) => {

    // get the body data
    let {
        new_pass,
        confirm_pass
    } = req.body
    //validate the body
    let validationTest = resetSchema.validate({
        new_pass,
        confirm_pass
    }, {
        abortEarly: false
    }).error

    if (validationTest) {
        res.status(403).json({
            error: {
                state: true,
                errorCode: 403,
                errorMessage: "body errors",
                errors: validationTest
            },
            message: "try again, request body isn't valid",
            data: []
        })
    } else {
        next()
    }
}