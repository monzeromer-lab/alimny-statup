const database = require("../database/connection")

function linksCompiner(links, user_id) {
    let temp = ""
    for (let index = 0; index < links.length; index++) {
        if (index < links.length-1)
            temp += `(${user_id}, "${links[index].platform}", "${links[index].link}"), `
        else
            temp += `(${user_id}, "${links[index].platform}", "${links[index].link}")`
    }
    console.log(temp);
    return temp
    
}

module.exports.getUserEmail = async function (email) {
    try {
        let [rows, fields] = await database.execute(`SELECT id, email FROM user WHERE email = "${email}"`)
        return rows
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.saveUserProfile = async function (user, verficationCode) {
    try {
        let [insert, issuse] = await database.execute(`INSERT INTO user (name, phone_number, password, email, state, age, verification_code) VALUES ("${user.firstName}", "${user.lastName}", "${user.phoneNumber}", "${user.hashedPassword}", "${user.email}", "${user.state}", "${user.age}", "${verficationCode}")`)
        return insert
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.getUserByEmail = async function (email) {
    try {
        let [user, errors] = await database.execute(`SELECT id, email, password, name, age  FROM user WHERE email = "${email}"`)
        return user
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.updateUser = async function (data, id) {
    try {
        let [insert, errors] = await database.execute(`UPDATE user SET  ? WHERE id = ${id}`, data)
        return insert
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.getVerificationCode = async function (verificationCode) {
    try {
        let [code, errors] = await database.execute(`SELECT verification_code, id FROM user WHERE verification_code = ${verificationCode}`)
        return code
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.activeAccount = async function (id) {
    try {
        let [state, errors] = await database.execute(`UPDATE user SET verified = 1 WHERE id = ${id}`)
        return state
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.updatePassword = async function (new_password) {
    try {
        let [state, errors] = await database.execute(`UPDATE user SET password = "${new_password}"`)
        return state
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.getUserProfile = async function (userId, email) {
    try {
        let [state, errors] = await database.execute(`SELECT profile FROM user WHERE id = ${userId} AND email = "${email}"`)
        return state
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.updateUserProfile = async function (path, userId, email) {
    try {
        let [state, errors] = await database.execute(`UPDATE user SET profile = "${path}" WHERE id = ${userId} AND email = "${email}"`)
        return state
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.insertSocialLinks = async function (links, userId) {
    let sql = `INSERT INTO sociallink (user_id, platform, link) VALUES ${linksCompiner(links, userId)}`
    try {
        let [state, errors] = await database.execute(sql)
        return state
    } catch (error) {
        throw new Error(error)
    }
}