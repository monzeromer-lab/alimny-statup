const {
    registerSchema,
    loginSchema
} = require("../validition/userSchema"),
    bcrypt = require("bcrypt"),
    database = require("../database/connection"), {
        generateAccessToken
    } = require("../auth/accessToken")

module.exports.register = async (req, res, next) => {
    //get the body data
    let {
        firstName,
        lastName,
        phoneNumber,
        password,
        email,
        state,
        age
    } = req.body

    //validate the body
    let validationTest = registerSchema.validate(req.body, {
        abortEarly: false
    }).error

    // if there's issuse with the body response with 403
    if (validationTest) {
        res.status(403).json({
            error: {
                state: true,
                errorCode: 403,
                errorMessage: "body errors",
                errors: validationTest
            },
            message: "try request isn't valid",
            data: []
        })
    } else {
        try {
            // check if the email is already used
            let [rows, fields] = await database.query(`SELECT email FROM user WHERE email = "${email}"`)

            if (rows.length >= 1) {
                res.status(403).json({
                    error: {
                        state: true,
                        errorCode: 403,
                        errorMessage: "email already used",
                        errors: []
                    },
                    message: "use another email",
                    data: []
                })
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err)
                        next(err)

                    bcrypt.hash(password, salt, async (err, hashed) => {
                        if (err)
                            next(err)
                        try {
                            let [insert, issuse] = await database.query(`INSERT INTO user (first_name, last_name, phone_number, password, email, state, age) VALUES ("${firstName}", "${lastName}", "${phoneNumber}", "${hashed}", "${email}", "${state}", "${age}")`)
                            res.status(200).json({
                                error: {
                                    state: false
                                },
                                message: "success",
                                data: [insert]
                            })
                        } catch (error) {
                            next(err)
                        }


                    })
                })

            }

        } catch (error) {
            next(error)
        }
    }


}

module.exports.login = async (req, res, next) => {
    //get the body data
    let {
        email,
        password
    } = req.body

    //validate the body
    let validationTest = loginSchema.validate({
        email,
        password
    }, {
        abortEarly: false
    }).error

    // if not valid response with 403
    if (validationTest) {
        res.status(403).json({
            error: {
                state: true,
                errorCode: 403,
                errorMessage: "body errors",
                errors: validationTest
            },
            message: "try request isn't valid",
            data: []
        })
    } else {
        try {
            //if valid check if the email is available
            let [rows, fields] = await database.query(`SELECT email FROM user WHERE email = "${email}"`)

            if (rows.length >= 1) {

                // if valid get the user data and compare the stored password with the entered one
                let [user, errors] = await database.query(`SELECT email, password, first_name, last_name, age  FROM user WHERE email = "${email}"`)

                if (user) {
                    let compareResult = await bcrypt.compare(password, user[0].password)

                    // if correct then login the user
                    if (compareResult) {

                        // generate new token
                        let token = generateAccessToken(user[0])

                        // response with 200 and the token in header
                        res.status(200).header("Authorization", `Bearer ${token}`).json({
                            error: {
                                state: false
                            },
                            message: "successfully logged in!",
                            data: []
                        })

                        // if not correct response with 403 and password error 
                    } else {
                        res.status(403).json({
                            error: {
                                state: true,
                                errorCode: 403,
                                errorMessage: "password is wrong!",
                                errors: [{
                                    atField: "password"
                                }]
                            },
                            message: "try again",
                            data: []
                        })
                    }
                }




            } else {

                // if the email isn't available response with 403 and email error
                res.status(403).json({
                    error: {
                        state: true,
                        errorCode: 403,
                        errorMessage: "email is wrong!",
                        errors: [{
                            atField: "email"
                        }]
                    },
                    message: "try again",
                    data: []
                })
            }
        } catch (error) {
            next(error)
        }


    }

}