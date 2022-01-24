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
    } = require("../controller/courseController"),
    path = require("path"),
    uploadPath = path.join("./public/videos"),
    tmpPath = path.join("./public/videos/tmp"),
    fileUpload = require("express-fileupload"),
    {
        postIntro,
        getCourseIntro
    } = require("../service/courseService.db")

course_router.use(fileUpload({
    limits: {
        fileSize: 2 * 1024 * 1024 * 1024
    },
    useTempFiles: true,
    tempFileDir: tmpPath,
    createParentPath: true
}))

function renameFile(rename) {
    return `VID-${Date.now()}${path.extname(rename)}`
}

function getFilePath(file) {
    return `/public/videos/${renameFile(file)}`
}

function fileExtname(file) {
    return path.extname(file)
}

function haveIntro(current){
    let test = /public/

    return test.test(current)
}

course_router.post("/course/new", authenticateToken, create_bodyValidition, newCourse_controller)
    .post("/course/:courseId/intro", authenticateToken, async (req, res, next) => {

        let {
            course_intro
        } = req.files,
            filePath = uploadPath + `/${renameFile(course_intro.name)}`,
            exts = [".mp4", ".mov", ".mkv", ".avi"]


        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).json({
                error: {
                    state: true,
                    errorMessage: "No files were uploaded",
                    errorCode: 400
                },
                message: "no files",
                data: []
            })
        } else if (!exts.includes(fileExtname(course_intro.name))) {
            res.status(400).json({
                error: {
                    state: true,
                    errorMessage: "the only supported types is .mp4 .mov .mkv or .avi",
                    errorCode: 400
                },
                message: "not supported file",
                data: []
            })

        } else {

            await getCourseIntro(req.params.courseId).then((success) => {
                if (haveIntro(success[0].intro)) {
                    res.status(400).json({
                        error: {
                            state: true,
                            errorMessage: "this endpoint only post for the first time",
                            errorCode: 400
                        },
                        message: "update use put method",
                        data: []
                    })
                } else {
                    course_intro.mv(filePath, async (err) => {
                        if (err) throw new Error("err")
                        await postIntro(getFilePath(course_intro.name), req.params.courseId).then((success) => {
                            res.status(200).json({
                                error: false,
                                message: "success",
                                data: {
                                    fileName: renameFile(course_intro.name),
                                    fileMimeType: course_intro.mimetype,
                                    fileSize: course_intro.size,
                                    isOverSize: course_intro.truncated,
                                    filePublicUrl: getFilePath(course_intro.name)
                                }
                            })
                        })

                    })
                }

            })

        }
    })

module.exports = course_router