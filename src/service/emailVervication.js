const nodemailer = require("nodemailer"),
    database = require("../database/connection")

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
module.exports = function (from, to, verficationCode) {
    let mailOptions = {
        from: from,
        to: to,
        subject: "Verify Your Email!",
        text: `please verify your account using this link: \n http://localhost:3023/verify/${verficationCode}`
    }

        smtpTransport.sendMail(mailOptions, function (error, info) {
            if (error) {
                
            } else {
                
            }
        })

}