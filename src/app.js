const express = require('express')
const app = express(),
    compression = require('compression'),
    helmet = require("helmet"),
    cors = require('cors')

// cors     
app.use(cors())

// active helmet header attacks security package
app.use(helmet());

// static files
app.use("/public", express.static("./public"))

// compress public data
app.use(compression())

// handle json body
// encode url
app.use(express.json())
    .use(express.urlencoded({
        extended: false
    }))

// setup the routers
// user routers
app.use("/", require("./router/user.router"))
    .use("/", require("./router/course.router"))

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