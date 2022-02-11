const {
    deleteFile
} = require("../helpers/fileManagment")

module.exports.deleteCourseCover = async function (path) {
    try {
        await deleteFile(path)
    } catch (error) {
        throw new Error(error)
    }

}