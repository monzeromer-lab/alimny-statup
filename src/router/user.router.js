const express = require("express"),
    user_router = express.Router(),
    {
        register
    } = require("../controller/userController"),
    database = require("../database/connection"),
    {
        authenticateToken
    } = require("../auth/accessToken"),
    {
        registerSchema
    } = require("../validition/userSchema"),
    bcrypt = require("bcrypt")

user_router.post("/profile/login", (req, res, next) => {


    })
    .post("/profile/register", register)
    .put("/profile/update", authenticateToken, (req, res, next) => {

    })

module.exports = user_router