const express = require('express')
const app = express()

// handle json body
// encode url
app.use(express.json())
    .use(express.urlencoded({
        extended: false
    }))

//error handeler
app.use((err, req, res, next) => {
    if (err) {
        res.status(500).json({
            error: {
                state: true,
                errorCode: err.code,
                message: err
            },
            message: err.message,
            data: []
        })
    }
})

module.exports = app