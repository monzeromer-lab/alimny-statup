const database = require("../database/connection")

module.exports.getUserEmail = async function(email, next){
    try {
        let [rows, fields] = await database.query(`SELECT email FROM user WHERE email = "${email}"`)
        return rows
    } catch (error) {
        return next(error)
    }
}

module.exports.saveUserProfile = async function(user, verficationCode, next){
    try {
        let [insert, issuse] = await database.query(`INSERT INTO user (first_name, last_name, phone_number, password, email, state, age, verification_code) VALUES ("${user.firstName}", "${user.lastName}", "${user.phoneNumber}", "${user.hashedPassword}", "${user.email}", "${user.state}", "${user.age}", "${verficationCode}")`)
        return insert
    } catch (error) {
       return next(error)
    }
}

module.exports.getUserByEmail = async function(email, next){
    try {
        let [user, errors] = await database.query(`SELECT email, password, first_name, last_name, age  FROM user WHERE email = "${email}"`)
        return user
    } catch (error) {
        return next(error)
    }
}