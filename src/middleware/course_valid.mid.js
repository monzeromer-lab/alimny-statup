const {
    getCourseOwner
} = require("../service/courseService.db")

module.exports.isValidCourse = async (req, res, next) => {
    await getCourseOwner(req.params.courseId).then((success) => {
        if (success.length >= 1){
            next()
        } else {
            res.status(404).json({
                error: {
                    state: true,
                    errorMessage: "course isn't available",
                    errorCode: 404
                },
                message: "enter a valid course id",
                data: []
            })
        }
    })
}