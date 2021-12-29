const nodemailer = require("nodemailer"),
    database = require("../database/connection"),
    dotenv = require('dotenv');

// get config vars
dotenv.config();

const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

/**
 * 
 * @param {string} from 
 * @param {string} to 
 * @param {string} verficationCode 
 */
module.exports = function (to, verficationCode) {
    let mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: "Verify Your Email!",
        text: `please verify your account using this link: \n http://localhost:3023/verify/${verficationCode}`
    }
    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                reject(error)
            } else {
                console.log(info);
                resolve(info)
            }
        })
    });


}