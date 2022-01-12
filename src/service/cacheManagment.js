const NodeCache = require("node-cache")
const cache = new NodeCache()

/**
 * 
 * @param {number} userId 
 * @param {string} resetCode 
 */
module.exports.storeResetCode = function (userId, email, resetCode) {

    let state
    state = cache.set(`${resetCode}`, {
        userId,
        email
    }, 12000)

    return state
}

module.exports.getResetCode = function (resetCode) {

    let result
    result = cache.get(`${resetCode}`)

    return result
}

