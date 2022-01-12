const express = require("express"),
    user_router = express.Router(),
    {
        register,
        login,
        update,
        active_account,
        signup_page_info,
        reset_code_controller
    } = require("../controller/userController"),
    {
        authenticateToken
    } = require("../auth/accessToken"),
    {check_resetKey} = require("../middleware/userManamgment"),
    {
        updatePassword
    } = require("../service/userService")


user_router.post("/profile/login", login)
    .post("/profile/register", register)
    .put("/profile/update/:id", authenticateToken, update)
    .get("/profile/verify/:code", active_account)
    .get("/profile/signup", authenticateToken, signup_page_info)
    .post("/profile/reset", reset_code_controller)
    .get("/profile/reset/:code", check_resetKey, async (req, res, next) => {
        // get the code, user id and email from cache
        // generate a secret code
        // cache the secret key with the user id
        // send the secret code to the client and it will allow him to change the password once

    })
    .post("/profile/reset/:secret", (req, res, next) => {
        // get the request body
        let {
            password,
            confirm_password
        }
        // check if the secret code is available in cache
        // if available becrypt the new password
        // update the password in the database
    })

module.exports = user_router