const express = require("express"),
    course_router = express.Router(),
    {
        authenticateToken
    } = require("../auth/accessToken"),
    {
        create_bodyValidition
    } = require('../validition/courseValiditaion'),
    {
        newCourse_controller
    } = require("../controller/courseController")


course_router.post("/course/new", authenticateToken, create_bodyValidition, newCourse_controller)

module.exports = course_router