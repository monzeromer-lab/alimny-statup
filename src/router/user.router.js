const express = require("express"),
    user_router = express.Router(),
    {
        register,
        login,
        update,
        active_account,
        signup_page_info,
        reset_code_controller,
        reset_pass,
        updateProfile,
        social_controller
    } = require("../controller/userController"),
    {
        authenticateToken
    } = require("../auth/accessToken"),
    {
        check_resetKey
    } = require("../middleware/userManamgment.mid"),
    {
        reset_bodyValidition,
        social_validitaion
    } = require("../validition/userValidetation"),
    {
        upload_image
    } = require("../helpers/fileManagment"),
    {

    } = require("../service/userServices.db")

user_router.post("/profile/login", login)
    .post("/profile/register", register)
    .put("/profile/update/:id", authenticateToken, update)
    .get("/profile/verify/:code", active_account)
    .get("/profile/:id", authenticateToken, signup_page_info)
    .post("/profile/reset", reset_code_controller)
    .post("/profile/reset/:code", check_resetKey, reset_bodyValidition, reset_pass)
    .put("/profile/image", authenticateToken, upload_image.single("profile"), updateProfile)
    .put("/profile/socials", authenticateToken, social_validitaion, social_controller)

module.exports = user_router