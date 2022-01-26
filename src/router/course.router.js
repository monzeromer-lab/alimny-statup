const express = require("express"),
    course_router = express.Router(),
    {
        authenticateToken
    } = require("../auth/accessToken"),
    {
        create_bodyValidition,
        courseReview_bodyValidition
    } = require('../validition/courseValiditaion'),
    {
        newCourse_controller,
        courseIntro_controller,
        courseCover_controller,
        postReview
    } = require("../controller/courseController"),
    path = require("path"),
    tmpPath = path.join("./public/videos/tmp"),
    fileUpload = require("express-fileupload"),
    {
        courseOwner_auth
    } = require("../auth/courseOwner.auth"),
    {
        upload_image
    } = require("../helpers/fileManagment"),
    {
        isValidCourse
    } = require("../middleware/course_valid.mid")

// course_router.use()

course_router.post("/course/new", authenticateToken, create_bodyValidition, newCourse_controller)
    .post("/course/:courseId/intro", authenticateToken, isValidCourse, fileUpload({
        limits: {
            fileSize: 2 * 1024 * 1024 * 1024
        },
        useTempFiles: true,
        tempFileDir: tmpPath,
        createParentPath: true
    }), authenticateToken, courseOwner_auth, courseIntro_controller)
    .put("/course/:courseId/cover", authenticateToken, isValidCourse, courseOwner_auth, upload_image.single("cover"), courseCover_controller)
    // review endpoint's

    // GET /course/{course id}/reviews
    // incase the user need more add a query {from} to the url and give it the last review id
    // header: Token
    // let reviewsRes = [{
    //     id: Number,
    //     rate: Number,
    //     feedback: String
    // }]

    // POST /course/{course id}/review
    // Header: Token
    // let reviewsBody = [{
    //     rate: Number,
    //     feedback: String
    // }]

    // PUT /course/{course id}/review/{review id}
    // Header: Token
    // let reviewsBody = [{
    //     rate: Number,
    //     feedback: String
    // }]

    .post("/course/:courseId/review", authenticateToken, isValidCourse, courseReview_bodyValidition, postReview)


// DELETE /course/{course id}/review/{review id}
// Header: Token
module.exports = course_router