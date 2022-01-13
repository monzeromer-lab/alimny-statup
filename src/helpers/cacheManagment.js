const NodeCache = require("node-cache")
const cache = new NodeCache()

/**
 * 
 * @param {number} userId 
 * @param {string} resetCode 
 */
module.exports.storeResetCode = function (userId, email, resetCode) {

    let state
    console.log(`before save is: ${resetCode};`);
    state = cache.set(`${resetCode}`, {
        userId,
        email
    }, 12000)
    console.log("on save ", state);

    return state
}

module.exports.getResetCode = function (resetCode) {

    let result
    
    result = cache.get(`${resetCode}`)
    console.log(`result is: ${result};`);
    return result
}

