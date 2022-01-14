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
    })

    if (validationTest.error) {
        throw new Error(validationTest.error)
    } else {
        next()
    }
}