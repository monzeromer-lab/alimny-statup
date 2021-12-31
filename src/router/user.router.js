const express = require("express"),
    user_router = express.Router(),
    {
        register,
        login,
        update,
        active_account,
        signup_page_info
    } = require("../controller/userController"),
    {
        authenticateToken
    } = require("../auth/accessToken"),
    {
        getUserByEmail
    } = require("../service/userService"),
    mailservice = require("../service/mailVerification")

user_router.post("/profile/login", login)
    .post("/profile/register", register)
    .put("/profile/update/:id", authenticateToken, update)
    .get("/profile/verify/:code", active_account)
    .get("/profile/signup", authenticateToken, signup_page_info)
    .post("/profile/reset", async (req, res, next) => {
        // get the body
        let {
            email
        } = req.body

        // get the user using his email
        let user_email = await getUserByEmail(email, next)

        // generate reset code
        let resetCode = crypto.randomBytes(6).toString("hex")

        if (user_email >= 1) {
            mailservice.resetMail(email, resetCode).then((success) => {
                // TODO: generate reset code to reset the password and cashe it with node cache module
                // TODO: send the code in the email
            }).catch((error) => {
                res.status(403).json({
                    error: {
                        state: true,
                        errorCode: 403,
                        errorMessage: error,
                        errors: []
                    },
                    message: "couldn't send the email to the user",
                    data: []
                })
            })
        }
    })

module.exports = user_router