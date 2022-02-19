const express = require('express')
const app = express()
const compression = require('compression')
const helmet = require("helmet")
const cors = require('cors')
const dotenv = require('dotenv')

const database = require('./config/database');

// load dotenv
dotenv.config({
    path: './config/config.env'
});

// mount routes
const auth = require('./routes/auth');
const users = require('./routes/users');
const categories = require('./routes/categories');
const subCategories = require('./routes/subCategories');
const courses = require('./routes/courses');
const sections = require('./routes/sections');
const coupons = require('./routes/coupons');
const reviews = require('./routes/reviews');
const lectures = require('./routes/lectures');
const lectureFiles = require('./routes/lectureFiles');
const studentWillLearn = require('./routes/studentWillLearn');
const notes = require('./routes/notes');
const completeLectures = require('./routes/completeLectures');
const practiceTests = require('./routes/practiceTests');
const answers = require('./routes/answers');
const socialLinks = require('./routes/socialLinks');
const questions = require('./routes/question');
const answer = require('./routes/answer');
const subscriptions = require('./routes/subscriptions');
const notifications = require('./routes/notifications');

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
app.use(express.urlencoded({
    extended: false
}))


// routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/categories', categories);
app.use('/api/v1/subCategories', subCategories);
app.use('/api/v1/courses', courses);
app.use('/api/v1/sections', sections);
app.use('/api/v1/coupons', coupons);
app.use('/api/v1/reviews', reviews);
app.use('/api/v1/lectures', lectures);
app.use('/api/v1/lectureFiles', lectureFiles);
app.use('/api/v1/studentWillLearn', studentWillLearn);
app.use('/api/v1/notes', notes);
app.use('/api/v1/completeLectures', completeLectures);
app.use('/api/v1/practiceTests', practiceTests);
app.use('/api/v1/practiceAnswers', answers);
app.use('/api/v1/socialLinks', socialLinks);
app.use('/api/v1/questions', questions);
app.use('/api/v1/answer', answer);
app.use('/api/v1/subscriptions', subscriptions);
app.use('/api/v1/notifications', notifications);


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
        app.listen(PORT, console.log(`Server running in ${process.env.PORT}`))
    })
    .catch(err => console.log(err));