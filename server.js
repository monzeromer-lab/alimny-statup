const http = require("http"),
    app = require("./src/app"),
    {port} = require("./config")

const server = http.createServer(app)

server.listen(port)