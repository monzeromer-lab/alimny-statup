const express = require("express"),
    user_router = express.Router(),
    {
        register,
        login
    } = require("../controller/userController"),
    {
        authenticateToken
    } = require("../auth/accessToken"),
    {
        updateSchema
    } = require("../validition/userSchema"),
    {
        updateUser
    } = require("../service/userService")

user_router.post("/profile/login", login)
    .post("/profile/register", register)

    /*
    {
  id: 23,
  first_name: 'monzer',
  last_name: 'omer',
  age: 21,
  phone_number: 249121601505,
  password: '$2b$10$FlGButO6o7E3qxUnOl1omezlSsVvVBonFX4UfW41fR0ziovVqvcHK',
  email: 'nezonru87@yahoo.com',
  verification_code: '221e740b2e9d',
  verified: 0,
  profile_pic: '',
  state: 'krt',
  teaching_techniq: '',
  editing_experience: 'basic',
  celebrity: 'no',
  bio: '',
  facebook_link: '',
  linkedin_link: '',
  twitter_link: '',
  website: '',
  income: 0
}
    */
    .put("/profile/update/:id", authenticateToken, async (req, res, next) => {
        // get the body values
        let {
            state = undefined,
                age = undefined,
                phoneNumber = undefined,
                lastName = undefined,
                firstName = undefined,
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
            lastName,
            firstName,
            bio
        }, {
            abortEarly: false
        })

        // save the new data
        let updateState = await updateUser({
            state,
            age,
            phoneNumber,
            lastName,
            firstName,
            bio
        }, next, id)

        res.status(201).json({
            error: {
                state: false
            },
            message: "successfully updated!",
            data: [updateState]
        })

    })

module.exports = user_router