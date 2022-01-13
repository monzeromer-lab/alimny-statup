const {
    deleteFile
} = require("../helpers/fileManagment")

module.exports.deleteUserProfile = async function (path, next) {
    try {
        deleteFile(path)
    } catch (error) {
        return next(err)
    }

}
