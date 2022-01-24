const express = require("express"),
    course_router = express.Router(),
    {
        authenticateToken
    } = require("../auth/accessToken"),
    {
        create_bodyValidition
    } = require('../validition/courseValiditaion'),
    {
        newCourse_controller,
        courseIntro_controller
    } = require("../controller/courseController"),
    path = require("path"),
    tmpPath = path.join("./public/videos/tmp"),
    fileUpload = require("express-fileupload")

course_router.use(fileUpload({
    limits: {
        fileSize: 2 * 1024 * 1024 * 1024
    },
    useTempFiles: true,
    tempFileDir: tmpPath,
    createParentPath: true
}))

course_router.post("/course/new", authenticateToken, create_bodyValidition, newCourse_controller)
    .post("/course/:courseId/intro", authenticateToken, courseIntro_controller)

module.exports = course_router