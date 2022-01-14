const {
    deleteFile
} = require("../helpers/fileManagment")

module.exports.deleteUserProfile = async function (path) {
    try {
        await deleteFile(path)
    } catch (error) {
        throw new Error(error)
    }

}
