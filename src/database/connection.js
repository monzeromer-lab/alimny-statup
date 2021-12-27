const mysql = require("mysql2/promise"),
    {
        host,
        user,
        password,
        database,
        connectionLimit
    } = require("../../config").database


// test database
const database = mysql.createPool({
    host,
    user,
    password,
    database,
    connectionLimit
})

// production database
// const database = mysql.createPool({
//     host,
//     user,
//     password,
//     database,
//     connectionLimit
// });

module.exports = database