const {
    registerSchema,
    loginSchema
} = require("../validition/userSchema"),
    bcrypt = require("bcrypt"),
    database = require("../database/connection"), {
        generateAccessToken
    } = require("../auth/accessToken"),
    crypto = require("crypto"),
    mailService = require("../service/emailVervication"), {
        getUserEmail,
        saveUserProfile,
        getUserByEmail
    } = require("../service/userService"),
    hash_password = require("../auth/hashPassword")

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

    let verficationCode = crypto.randomBytes(6).toString("hex")

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

        // check if the email is already used
        let rows = await getUserEmail(email, next)

        console.log(rows, "user email");
        // if the email is used response with 403
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

            // if the email isn't used register the user
        } else {

            // hash the password
            hash_password(password).then(async (hashedPassword) => {
                console.log(hashedPassword);
                // save the user profile
                let insert = await saveUserProfile({
                    firstName,
                    lastName,
                    phoneNumber,
                    hashedPassword,
                    email,
                    state,
                    age
                }, verficationCode, next)
                console.log(insert, "user saved");
                let token = generateAccessToken({
                    email,
                    firstName,
                    lastName,
                    age
                })
                // send the verification code to the user if there's error response with 403 to change the email later
                mailService(email, verficationCode).then((success) => {
                    res.status(403).header("Authorization", `Bearer ${token}`).json({
                        error: {
                            state: false
                        },
                        message: "successfully registered!",
                        data: [insert]
                    })
                }).catch((error) => {
                    res.status(403).header("Authorization", `Bearer ${token}`).json({
                        error: {
                            state: true,
                            errorCode: 403,
                            errorMessage: "email verification code did't sent",
                            errors: [error]
                        },
                        message: "successfully registered but please check your email",
                        data: [insert]
                    })
                })
            }).catch((err) => {
                next(err)
            })


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
            message: "try again, request body isn't valid",
            data: []
        })
    } else {

        //if valid check if the email is available
        let rows = await getUserEmail(email, next)

        // if the email is correct
        if (rows.length >= 1) {

            // if valid get the user data and compare the stored password with the entered one
            let user = await getUserByEmail(email, next)

            // compare the password with the stored one
            let compareResult = await bcrypt.compare(password, user[0].password)

            // if correct then login the user
            if (compareResult) {

                // generate new token
                let token = generateAccessToken({
                    email: user[0].email,
                    first_name: user[0].first_name,
                    last_name: user[0].last_name,
                    age: user[0].age
                })

                // response with 200 and the token in header
                res.status(200).header("Authorization", `Bearer ${token}`).json({
                    error: {
                        state: false
                    },
                    message: "successfully logged in!",
                    data: []
                })

                // if the password is incorrect response with 403 and password error 
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

    }

}