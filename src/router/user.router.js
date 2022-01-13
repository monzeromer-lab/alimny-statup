const express = require("express"),
    user_router = express.Router(),
    {
        register,
        login,
        update,
        active_account,
        signup_page_info,
        reset_code_controller,
        reset_pass
    } = require("../controller/userController"),
    {
        authenticateToken
    } = require("../auth/accessToken"),
    {
        check_resetKey
    } = require("../middleware/userManamgment.mid"),
    {
        reset_bodyValidition
    } = require("../validition/userValidetation"),
    {
        getUserProfile,
        updateUserProfile
    } = require("../service/userServices.db"),
    {
        user_profile
    } = require("../helpers/fileManagment"),
    {
        deleteUserProfile
    } = require("../service/userServices.fs")

user_router.post("/profile/login", login)
    .post("/profile/register", register)
    .put("/profile/update/:id", authenticateToken, update)
    .get("/profile/verify/:code", active_account)
    .get("/profile/signup", authenticateToken, signup_page_info)
    .post("/profile/reset", reset_code_controller)
    .post("/profile/reset/:code", check_resetKey, reset_bodyValidition, reset_pass)
    .put("/profile/image", authenticateToken, user_profile.single("profile"), async (req, res, next) => {
        // first validate the request
        // get current user image path
        let current_profile = await getUserProfile(req.user.id, req.user.email, next)
        // delete the previous image
        deleteUserProfile(current_profile[0].profile, next).then( async (success) => {
            // update the image path in the profile
            await updateUserProfile(req.file.path, req.user.id, req.user.email, next)
        }).catch((err) => {

        })


        // response with 200
    })

module.exports = user_router