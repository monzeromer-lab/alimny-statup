/**
 * all the the info in this file should be written in uml lang
 * anyway...
 * 
 * here we have all the end points as we agreed
 * 
 * to Hamdi!
 */

/**
 * first of all
 * to clearfy one thing that all the response will be like the next object
 * 
 * the data proberty will contain the response that you'll need
 */
let G_res = {
    error: {
        state: Boolean,
        errorCode: Number,
        message: "error message"
    },
    message: "summary about the issue",
    data: "the response that we agreed about"
}

// starting with completly random one that should actully be after the register endpoint..

// GET /profile/signup
// Headers: Token

// response is
let res1 = [{
    fullname: "user full name",
    email: "user email of course!"
}]


// GET /profile/verification/{id}
// Headers: Token 

let res2 = [{
    status: Boolean
}]

// and if there's error the error object will set to true

// now let's get into reset the password BUT! //without the user being logged in

// POST /profile/reset

// Body: email
// this endpoint will send an email to the user contain a link to reset his password
// if the email is wrong will response with 404 code and email isn't valid message

// now the link will be sent to the user will be like the next endpoint

// GET /profile/reset/{reset code}
// Body: new password and a verification of it (and yes send it to the server-side and it's requierd! remember don't trust the user inputs! AT ALL)

// this will response with 200 code no data




// the landing page
// GET /home

let res3 = [{
    //Nice ;-)
    cataloge: [{
        id: Number,
        name: String
    }, {
        id: 17,
        name: "Back-end Development"
    }],
    top_courses: [{
            course_id: Number,
            course_name: String,
            instrucre: "will be he's name",
            course_rate: "Number from 0.0 to 5 like 0.0 , 0.5 , 1 , 1.5 , 2 , 2.5 , 3 , ..etc or what do you think??",
            enrolled_count: "the total number of the student in the course",
            price: "course price",
            level: "begginer or whatever"
        },
        {
            course_id: 182,
            course_name: "Nodejs Back-end Development",
            instrucre: "Musab Khunijer",
            course_rate: 3.5,
            enrolled_count: 12000,
            price: 1700,
            level: "begginer"
        }
    ]
}]

/**
 * okay it's happining
 * it time for the biggest response ever!
 * course page ;-(
 */

// GET /course/details/{course id}

let res4 = [{
    category: {
        id: Number,
        name: String,
        sub_category: {
            id: Number,
            name: String
        }
    },
    top_instructre: Boolean,
    rate: Number + "will be genrated for all the rate's in the database",
    student_enrolled: Number,
    instrucre: String,
    price: Number,
    profile: URL,
    about: String,
    lectures: Number,
    downloadable_res: Number,
    certificate: Boolean,
    what_will_learn: [{
        id: Number,
        body: String
    }],
    requirements: [{
        id: Number,
        body: String
    }],
    instrucre: {
        id: Number,
        name: String,
        postion: String,
        total_learners: Number,
        courses_count: Number
    },
    reviews:[{
        id: Number,
        rate: Number,
        user_name: String,
        review_date: Date,
        body: String
    }],
    intersted: [{
        course_id: Number,
        Profile: URL,
        name: String,
        instrucre: String,
        rate: Number + "will be genrated for all the rate's in the database",
        enrolled: Number,
        price: Number,
        level: String
    }]
}]

// now the same response but as an example
let ex_res4 = [{
    category: {
        id: 19,
        name: "AI",
        sub_category: {
            id: 4,
            name: "ML"
        }
    },
    top_instructre: true,
    rate: 4.5,
    student_enrolled: 9124242,
    instrucre: "Mohammed Ali",
    price: 4300,
    media: "/public/images/IMG-8923752389.png",
    about: "Just an example of a desreption ",
    lectures: 17,
    downloadable_res: 219,
    certificate: true,
    what_will_learn: [{
        id: 1,
        body: "AI"
    },{
        id: 2,
        body: "something"
    }],
    requirements: [{
        id: 1,
        body: "Iv'e no idea"
    },{
        id: 2,
        body: "Iv'e no idea 2"
    }],
    instrucre: {
        id: 1312,
        name: "Mohammed Ali",
        postion: "Senior Blah Blah Blah",
        total_learners: 2342345,
        courses_count: 21
    },
    reviews:[{
        id: 2452,
        rate: 5,
        user_name: "Khlalid al3ajeeb",
        review_date: "2000-10-26",
        body: "just a review"
    }],
    intersted: [{
        course_id: 1242424,
        Profile: "/public/images/IMG-2389572348.jpg",
        name: "ML API's",
        instrucre: "Ali Ammar",
        rate: 4.5,
        enrolled: 9349302,
        price: 12000,
        level: "Begginer"
    }]
}]

// my learning page

// GET /profile/mylearning
// headers: token

let res5 = [{
    course_id: Number,
    course_photo: URL,
    course_intructre: String,
    total_lectures: Number,
    finished_lec: "ummm didn't know how to solve this but maybe with counting all the rows? no this is bad then how..? maybe with create a m to m table shows me this.."
}]


// lesson page

// GET /course/lesson?les_id={lesson id}&section={section id}

// headers: Token Is Optional

let res6 = [{
    course_id: Number,
    course_name: String,
    lesson_name: String,
    lesson_media: URL,
    lesson_description: String,
    course_sections: [{
        id: Number,
        name: String,
        lessons: [{
            id: Number,
            name: String
        }]
    }],
    files: [{
        id: Number,
        path: URL,
        name: String
    }]
}]

// add note (show all the lists maybe)

// GET /course/lesson/{lesson id}/notes
// headers: Token

let res6 = [{
    notes: [{
        id: Number,
        name: String
    }]
}]

// get one note

// GET /course/lesson/{lesson id}/notes/{note id}
// headers: Token

let res7 = [{
    note: {
        id:Number,
        name: String,
        body: String
    }
}]


// search page

// GET /courses/list?f={the latest course id if there is}
// header: Token

let res8 = [{
    course_id: Number,
    profile: URL,
    course_name: String,
    course_intructre: String,
    course_rate: Number,
    enrolled_count: Number,
    course_level: String,
    course_price: Number
}]


// teacher dashboard

// GET /profile/{user id}/dashboard
// headers: Token

let res9 = [{
    total_student: Number,
    rate_range: Number,
    total_yield: Number,
    courses: Number,
    monthe_yield: Number,
    uncomplete_courses: [{
        course_id: Number,
        course_name: String,
        course_level: String,
        course_category: String
    }],
    completed_courses: [{
        course_id: Number,
        profile: URL,
        course_name: String,
        course_rate: Number,
        course_level: String,
        course_price: Number,
        course_month_yields: Number,
        student_enrolled: Number
    }]
}]

// Q & A is in a json file we sent before
// GET /course/q&a/{course id}
// header: Token

// res is in the file

// quastion is also in a json file 
// GET /course/q&a/quation/{quation id}
// header: Token

// res in json file we have

// waiting for your review..
// and you can add how you will send the data to me and i'll edit it as i think it could be better..