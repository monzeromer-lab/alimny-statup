const express = require("express"),
    course_router = express.Router(),
    {
        authenticateToken
    } = require("../auth/accessToken"),
    {
        create_bodyValidition
    } = require('../validition/courseValiditaion'),
    {
        createCourse
    } = require("../service/courseService.db")

course_router.post("/course/new", authenticateToken, create_bodyValidition, async (req, res, next) => {

    // TODO: save to the database
    await createCourse(req.body).then((success) => {
        res.status(200).json({
            error: {
                state: false
            },
            message: "success",
            data: []
        })
    })

})