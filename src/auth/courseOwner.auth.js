const {
    getCourseOwner
} = require("../service/courseService.db")

module.exports.courseOwner_auth = async (req, res, next) => {
    let {
        id
    } = req.user

    await getCourseOwner(req.params.courseId).then((success) => {
        if (success[0].user_id === id){
            next()
        } else {
            res.status(401).json({
                error: {
                    state: true,
                    errorMessage: "you're not the course owner",
                    errorCode: 401
                },
                message: "only course owner can edit this",
                data: []
            })
        }
    })
}