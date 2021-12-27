const express = require("express"),
    user_router = express.Router(),
    {
        register,
        login
    } = require("../controller/userController"),
    database = require("../database/connection"),
    {
        authenticateToken
    } = require("../auth/accessToken")

user_router.post("/profile/login", login)
    .post("/profile/register", register)
    .put("/profile/update/:id", authenticateToken, (req, res, next) => {

    })

module.exports = user_router