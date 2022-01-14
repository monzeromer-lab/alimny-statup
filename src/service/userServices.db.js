const database = require("../database/connection")

module.exports.getUserEmail = async function (email, next) {
    try {
        let [rows, fields] = await database.query(`SELECT id, email FROM user WHERE email = "${email}"`)
        return rows
    } catch (error) {
        return next(error)
    }
}

module.exports.saveUserProfile = async function (user, verficationCode, next) {
    try {
        let [insert, issuse] = await database.query(`INSERT INTO user (name, phone_number, password, email, state, age, verification_code) VALUES ("${user.firstName}", "${user.lastName}", "${user.phoneNumber}", "${user.hashedPassword}", "${user.email}", "${user.state}", "${user.age}", "${verficationCode}")`)
        return insert
    } catch (error) {
        return next(error)
    }
}

module.exports.getUserByEmail = async function (email, next) {
    try {
        let [user, errors] = await database.query(`SELECT id, email, password, name, age  FROM user WHERE email = "${email}"`)
        return user
    } catch (error) {
        return next(error)
    }
}

module.exports.updateUser = async function (data, next, id) {
    try {
        let [insert, errors] = await database.query(`UPDATE user SET  ? WHERE id = ${id}`, data)
        return insert
    } catch (error) {
        return next(error)
    }
}

module.exports.getVerificationCode = async function(verificationCode, next) {
    try {
        let [code, errors] = await database.query(`SELECT verification_code, id FROM user WHERE verification_code = ${verificationCode}`)
        return code
    } catch (error) {
        return next(error)
    }
}

module.exports.activeAccount = async function(id, next){
    try {
        let [state, errors] = await database.query(`UPDATE user SET verified = 1 WHERE id = ${id}`)
        return state
    } catch (error) {
        return next(error)
    }
}

module.exports.updatePassword = async function(new_password, next){
    try {
        let [state, errors] = await database.query(`UPDATE user SET password = "${new_password}"`)
        return state
    } catch (error) {
        return next(error)
    }
}

module.exports.getUserProfile = async function(userId, email, next){
    try {
        let [state, errors] = await database.query(`SELECT profile FROM user WHERE id = ${userId} AND email = "${email}"`)
        return state
    } catch (error) {
        return next(error)
    }
}

module.exports.updateUserProfile = async function(path, userId, email, next){
    try {
        let [state, errors] = await database.query(`UPDATE user SET profile = "${path}" WHERE id = ${userId} AND email = "${email}"`)
        return state
    } catch (error) {
        return next(error)
    }
}