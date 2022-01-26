const {
    createCourse,
    createCoupon,
    studentWill_learn,
    course_req,
    postIntro,
    getCourseIntro,
    getCourseCover,
    updateCourseCover,
    saveReview
} = require("../service/courseService.db"),
{
    deleteCourseCover
} = require("../service/courseServices.fs"),
    path = require("path"),
    uploadPath = path.join("./public/videos")

function renameFile(rename) {
    return `VID-${Date.now()}${path.extname(rename)}`
}

function getFilePath(file) {
    return `/public/videos/${file}`
}

function fileExtname(file) {
    return path.extname(file)
}

function haveIntro(current) {
    let test = /public/

    return test.test(current)
}

module.exports.newCourse_controller = async (req, res, next) => {
    let {
        coupon,
        student_learn,
        requirements
    } = req.body

    let {
        id
    } = req.user

    await createCourse(req.body, id).then(async (success) => {
        if (coupon.code)
            await createCoupon({
                course_id: success.insertId,
                code: coupon.code,
                discount_per: coupon.discount_per,
                exp: coupon.exp
            })

        await studentWill_learn(student_learn, success.insertId)
        await course_req(requirements, success.insertId)

        res.status(200).json({
            error: {
                state: false
            },
            message: "success",
            data: []
        })
    })

}


module.exports.courseIntro_controller = async (req, res, next) => {

    let {
        course_intro
    } = req.files,
    newFilename = renameFile(course_intro.name)
        filePath = uploadPath + `/${newFilename}`,
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
                    await postIntro(getFilePath(newFilename), req.params.courseId).then((success) => {
                        res.status(200).json({
                            error: false,
                            message: "success",
                            data: []
                        })
                    })

                })
            }

        })

    }
}


module.exports.courseCover_controller = async (req, res) => {

    // get current user image path
    await getCourseCover(req.user.id).then(async (data) => {

        // if there's no image add the new one
        if (data.length < 1) {
            // update the image path in the profile
            await updateCourseCover(req.file.path, req.params.courseId)

            res.status(403).json({
                error: {
                    state: false
                },
                message: "success",
                data: []
            })

            // if there's one delete the previous one and add the new one
        } else {
            // delete the previous image
            deleteCourseCover(data[0].profile).then(async (success) => {
                // update the image path in the profile
                await updateCourseCover(req.file.path, req.params.courseId)

                res.status(200).json({
                    error: {
                        state: false
                    },
                    message: "success",
                    data: []
                })
            }).catch((error) => {
                throw new Error(error)
            })
        }

    })

}

module.exports.postReview = async (req, res) => {
    // get the body date
    let {
        rate,
        feedback
    } = req.body

    // get the user id
    let {
        id
    } = req.user

        await saveReview(rate, feedback, req.params.courseId, id).then((success) => {
            res.status(200).json({
                error: {
                    state: false
                },
                message: "success",
                data: []
            })
        })
}