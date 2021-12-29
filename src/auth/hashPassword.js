const bcrypt = require("bcrypt"),
    salt_rounds = 10

module.exports = async (password) => {
    let hash2 = await bcrypt.hash(password, salt_rounds)
    return hash2
}