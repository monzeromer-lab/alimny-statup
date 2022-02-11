const {
    getCourseOwner,
    getReviewId
} = require("../service/courseService.db")

module.exports.isValidCourse = async (req, res, next) => {
    await getCourseOwner(req.params.courseId).then((success) => {
        if (success.length >= 1){
            next()
        } else {
            res.status(404).json({
                error: {
                    state: true,
                    errorMessage: "course doesn't exists",
                    errorCode: 404
                },
                message: "enter a valid course id",
                data: []
            })
        }
    })
}

module.exports.isValidReview = async (req, res, next) => {
    await getReviewId(req.params.reviewId, req.params.courseId).then((success) => {
        if (success.length >= 1){
            next()
        } else {
            res.status(404).json({
                error: {
                    state: true,
                    errorMessage: "review doesn't exists",
                    errorCode: 404
                },
                message: "enter a valid review id",
                data: []
            })
        }
    })
}