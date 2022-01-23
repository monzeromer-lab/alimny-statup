const {
    createCourse
} = require("../service/courseService.db")

module.exports.newCourse_controller = async (req, res, next) => {

    await createCourse(req.body).then((success) => {
        res.status(200).json({
            error: {
                state: false
            },
            message: "success",
            data: []
        })
    })

}