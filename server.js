const http = require("http"),
    app = require("./src/app"),
    {port} = require("./config"),
dotenv = require('dotenv');

// get config vars
dotenv.config();

const server = http.createServer(app)

server.listen(port)