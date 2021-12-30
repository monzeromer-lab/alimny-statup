const express = require("express"),
    user_router = express.Router(),
    {
        register,
        login,
        update
    } = require("../controller/userController"),
    {
        authenticateToken
    } = require("../auth/accessToken")

user_router.post("/profile/login", login)
    .post("/profile/register", register)
    .put("/profile/update/:id", authenticateToken, update)

module.exports = user_router