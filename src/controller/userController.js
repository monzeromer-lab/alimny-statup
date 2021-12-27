const 
{
    registerSchema
} = require("../validition/userSchema"),
bcrypt = require("bcrypt"),
database = require("../database/connection")

module.exports.register =  async (req, res, next) => {
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

                        await database.query(`INSERT INTO user (first_name, last_name, phone_number, password, email, state, age) VALUES ("${firstName}", "${lastName}", "${phoneNumber}", "${password}", "${email}", "${state}", "${age}")`).then((result) => {
                            res.status(200).json({
                                error: {
                                    state: false
                                },
                                message: "success",
                                data: [result]
                            })
                        }).catch((err) => {
                            next(err)
                        })
                    })
                })

            }

        } catch (error) {
            next(error)
        }
    }


}