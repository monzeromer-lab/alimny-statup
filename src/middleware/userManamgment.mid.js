const {
    getResetCode
} = require("../service/cacheManagment")

module.exports.check_resetKey = (req, res, next) => {
    // get url params
    let {
        code
    } = req.params

    // reset code
    let stored_code

    // get the reset code from the cache
    stored_code = getResetCode(code)

    // if there's no code response with 403
    if (stored_code == undefined) {
        res.status(403).json({
            error: {
                state: true,
                errorCode: 403,
                errorMessage: "code is not valid"
            },
            message: "code is not valid",
            data: []
        })
    } else {
        next()
    }
}