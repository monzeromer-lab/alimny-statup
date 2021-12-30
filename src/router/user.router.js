const express = require("express"),
    user_router = express.Router(),
    {
        register,
        login,
        update,
        activeAccount
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
    .get("/profile/verify/:code", activeAccount)

module.exports = user_router