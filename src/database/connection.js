const mysql = require("mysql2/promise"),
    {
        host,
        user,
        password,
        database,
        connectionLimit
    } = require("../../config").database,
    http = require("http")


// test database
const db = mysql.createPool({
    host,
    user,
    password,
    database,
    connectionLimit
})

db.getConnection().then((success) => {
   //  console.log(success.threadId);
   return;
}).catch((error) => {
    throw new Error(error)
})

// production database
// const database = mysql.createPool({
//     host,
//     user,
//     password,
//     database,
//     connectionLimit
// });

module.exports = db
