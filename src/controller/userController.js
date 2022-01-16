const {
    registerSchema,
    loginSchema,
    updateSchema
} = require("../validition/userSchema"),
    bcrypt = require("bcrypt"), {
        generateAccessToken
    } = require("../auth/accessToken"),
    crypto = require("crypto"), {
        verificationEmail,
        resetMail
    } = require("../service/mailVerification"), {
        getUserEmail,
        saveUserProfile,
        getUserByEmail,
        updateUser,
        activeAccount,
        updatePassword,
        getUserProfile,
        updateUserProfile,
        getVerificationCode
    } = require("../service/userServices.db"),
    hash_password = require("../auth/hashPassword"), {
        storeResetCode
    } = require("../helpers/cacheManagment"), {
        deleteUserProfile
    } = require("../service/userServices.fs")


// ===========================================================
//              register new user
// ===========================================================

module.exports.register = async (req, res) => {
    //get the body data
    let {
        name,
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
    })

    // if there's issuse with the body response with 403
    if (validationTest.error) {
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
        let rows = await getUserEmail(email)

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

                // send the verification code to the user if there's error response with 403 to change the email later
                verificationEmail(email, verficationCode).then(async (success) => {
                    // save the user profile
                    await saveUserProfile({
                        name,
                        phoneNumber,
                        hashedPassword,
                        email,
                        state,
                        age
                    }, verficationCode)

                    res.status(403).json({
                        error: {
                            state: false
                        },
                        message: "successfully registered!",
                        data: []
                    })
                }).catch((error) => {
                    throw new Error(error)
                })
            }).catch((error) => {
                throw new Error(error)
            })
        }

    }
}


// ===========================================================
//              login user
// ===========================================================

module.exports.login = async (req, res) => {
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
        let user_email = await getUserEmail(email)

        // if the email is correct
        if (user_email.length >= 1) {

            // if valid get the user data and compare the stored password with the entered one
            let user = await getUserByEmail(email)

            // compare the password with the stored one
            let compareResult = await bcrypt.compare(password, user[0].password).catch((error) => {
                throw new Error(error)
            })

            // if correct then login the user
            if (compareResult) {

                // generate new token
                let token = generateAccessToken({
                    id: user[0].id,
                    email: user[0].email
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


// ===========================================================
//              update basic info in account
// ===========================================================

module.exports.update = async (req, res) => {
    // get the body values
    let {
        state = undefined,
            age = undefined,
            phoneNumber = undefined,
            name = undefined,
            bio = undefined

    } = req.body

    // get url params
    let {
        id
    } = req.params

    //valedate the body
    updateSchema.validate({
        state,
        age,
        phoneNumber,
        name,
        bio
    }, {
        abortEarly: false
    })

    // save the new data
    let updateState = await updateUser({
        state,
        age,
        phoneNumber,
        name,
        bio
    }, id)

    res.status(201).json({
        error: {
            state: false
        },
        message: "successfully updated!",
        data: [updateState]
    })

}

// ===========================================================
//              active account
// ===========================================================

module.exports.active_account = async (req, res) => {
    // get verification code
    let {
        code
    } = req.params

    // get the code from the database
    let verificationCode = await getVerificationCode(code)

    if (verificationCode >= 1) {
        
        let active_account = await activeAccount(verificationCode[0].id)

        if (active_account >= 1) {
            res.status(200).json({
                error: {
                    state: false
                },
                message: "account activated successfully",
                data: active_account
            })
        }
    } else {
        res.status(403).json({
            error: {
                state: true,
                errorCode: 404,
                errorMessage: "Code isn't correct or not valid",
                errors: [{
                    atParam: "code"
                }]
            },
            message: "please check your email for a valid code",
            data: verificationCode
        })
    }
}

// ===========================================================
//              get user profile
// ===========================================================

module.exports.signup_page_info = (req, res) => {
    // TODO: this endpoint isn't finished yet
    let {
        id,
        email,
        name,
        age
    } = req.user

    res.status(200).json({
        error: {
            state: false
        },
        message: "successfully registered!",
        data: [{
            name: name,
            email,
            age
        }]
    })
}


// ===========================================================
//              reset password request
// ===========================================================


module.exports.reset_code_controller = async (req, res) => {

    // get the body
    let {
        email
    } = req.body

    // get the user using his email
    let user_email = await getUserEmail(email)

    // generate reset code
    let resetCode = crypto.randomBytes(6).toString("hex")

    if (user_email.length >= 1) {
        resetMail(email, resetCode).then((success) => {
            // save the generated code in cache
            storeResetCode(user_email.id, email, resetCode)

            // response with 200 in case successed
            res.status(200).json({
                error: {
                    state: false
                },
                message: "check your email we sent you a verification code",
                data: resetCode
            })
        }).catch((error) => {
            res.status(403).json({
                error: {
                    state: true,
                    errorCode: 403,
                    errorMessage: error,
                    errors: []
                },
                message: "couldn't send the email to the user",
                data: []
            })
        })
    } else {
        res.status(403).json({
            error: {
                state: true,
                errorCode: 403,
                errors: []
            },
            message: "email isn't avaliable",
            data: []
        })
    }
}

// ===========================================================
//              reset password
// ===========================================================

module.exports.reset_pass = async (req, res) => {

    // get the body
    let {
        new_pass
    } = req.body

    // bcrypt the password and save it
    hash_password(new_pass).then(async (password) => {
        let passwordState = await updatePassword(password)

        res.status(403).json({
            error: {
                state: false
            },
            message: "success",
            data: []
        })

    }).catch((error) => {
        throw new Error(error)
    })

}

// ===========================================================
//              update profile picture
// ===========================================================

module.exports.updateProfile = async (req, res) => {

    // get current user image path
    await getUserProfile(req.user.id, req.user.email).then(async (data) => {

        // if there's no image add the new one
        if (data.length < 1) {
            // update the image path in the profile
            await updateUserProfile(req.file.path, req.user.id, req.user.email)

            res.status(403).json({
                error: {
                    state: false
                },
                message: "success",
                data: []
            })

            // if there's one delete the previous one and add the new one
        } else {
            // delete the previous image
            deleteUserProfile(data[0].profile).then(async (success) => {
                // update the image path in the profile
                await updateUserProfile(req.file.path, req.user.id, req.user.email)

                res.status(403).json({
                    error: {
                        state: false
                    },
                    message: "success",
                    data: []
                })
            }).catch((error) => {
                throw new Error(error)
            })
        }

    })

}