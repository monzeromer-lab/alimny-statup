module.exports = {
    port: process.env.PORT || 3022,
    database: {
        host: "localhost",
        password: "",
        user: "root",
        database: "alimny",
        connectionLimit: 10
    }
}