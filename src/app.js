const express = require('express')
const app = express(),
    compression = require('compression'),
    helmet = require("helmet"),
    cors = require('cors'),
    fileupload = require('express-fileupload'),
    dotenv =  require('dotenv');

const database = require('./config/database');

// load dotenv
dotenv.config({ path: './config/config.env'});

// mount routes
const auth = require('./routes/auth');
const users = require('./routes/users');
const categories = require('./routes/categories');
const subCategories = require('./routes/subCategories');
const courses = require('./routes/courses');

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
    .use(express.urlencoded({extended: false}))

// File uplaoding
// app.use(fileupload())

// routes
app.use('/api/v1/auth',auth);
app.use('/api/v1/users',users);
app.use('/api/v1/categories',categories);
app.use('/api/v1/subCategories',subCategories);
app.use('/api/v1/courses',courses);


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

const PORT = process.env.PORT || 5000

// Run the server
database.sync()
    .then(result => {
        app.listen(PORT,console.log(`Server running in ${process.env.PORT}`))
    })
    .catch(err => console.log(err));
