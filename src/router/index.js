const express = require("express"),
    router = express()

router.use(express.json())
    .use(express.urlencoded({extended: false}))
    .use("/*", express.static(__dirname + "/public/index.html"))

router.get("/", (req, res, next) => {
    res.sendFile("../../public/index.html")
})

module.exports = router