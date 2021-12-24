const database = require("./connection")

module.exports = {
    createProfile = async () => {
        return new Promise((resolve, reject) => {

            try {
                let [result, fields] = await database.execute("")
                resolve(result)

            } catch (error) {
                reject(error)

            }
        });
    },
    updateProfile = async () => {
        return new Promise((resolve, reject) => {
            try {
                
            } catch (error) {
                
            }
        });
    }
}