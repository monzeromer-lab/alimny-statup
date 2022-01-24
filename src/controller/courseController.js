const {
    createCourse,
    createCoupon,
    studentWill_learn,
    course_req,
    postIntro,
    getCourseIntro
} = require("../service/courseService.db"),
    path = require("path"),
    uploadPath = path.join("./public/videos")

function renameFile(rename) {
    return `VID-${Date.now()}${path.extname(rename)}`
}

function getFilePath(file) {
    return `/public/videos/${renameFile(file)}`
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
}