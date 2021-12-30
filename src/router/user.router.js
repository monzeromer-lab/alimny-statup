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
        getVerificationCode
    } = require("../service/userService")

user_router.post("/profile/login", login)
    .post("/profile/register", register)
    .put("/profile/update/:id", authenticateToken, update)
    .get("/profile/verify/:code", active_account)
    .get("/profile/signup", authenticateToken, signup_page_info)

module.exports = user_router