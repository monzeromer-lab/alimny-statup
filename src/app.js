const express = require('express')
const app = express()

// handle json body
// encode url
app.use(express.json())
    .use(express.urlencoded({
        extended: false
    }))

// setup the routers
// user routers
app.use("/", require("./router/user.router"))

//error handeler
app.use((err, req, res, next) => {
        res.status(500).json({
            error: {
                state: true,
                errorCode: 500,
                message: err.message
            },
            message: "server error",
            data: []
        })
})

module.exports = app